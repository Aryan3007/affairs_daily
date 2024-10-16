import React, { useEffect, useState } from 'react';
import 'react-native-url-polyfill/auto';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Linking, View, ActivityIndicator } from 'react-native';
import WelcomeScreen from './pages/WelcomeScreen';
import ProfileCreation from './pages/ProfileCreation';
import Dashboard from './pages/Dashboard';
import { supabase } from './supabaseClient';
import Signup from './pages/Signup';
import LoginScreen from './pages/Login';
import { Session } from '@supabase/supabase-js';

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Signup: undefined;
  ProfileCreation: undefined;
  Dashboard: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AuthWrapper = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList>('Welcome');

  const linking = {
    prefixes: ['affairs_daily://'],
    config: {
      screens: {
        Welcome: 'welcome',
        Login: 'login',
        Signup: 'signup',
        ProfileCreation: 'profile-creation',
        Dashboard: 'dashboard',
      },
    },
  };

  useEffect(() => {
    const handleDeepLink = async (event: { url: string }) => {
      const { url } = event;
      console.log('Deep link URL:', url);

      if (url && url.includes('affairs_daily://login-callback')) {
        const params = new URLSearchParams(url.split('#')[1]);
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');

        if (accessToken && refreshToken) {
          try {
            const { data, error } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });

            if (error) throw error;

            console.log('User signed in:', data.user);
            setSession(data.session);
            setInitialRoute('Dashboard');
          } catch (error) {
            console.error('Error setting session:', error);
            setInitialRoute('Login');
          }
        }
      }
    };

    // Handle the case where the app is opened through the deep link
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink({ url });
      }
    });

    // Listen for deep link events while the app is running
    const unsubscribe = Linking.addEventListener('url', handleDeepLink);

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      if (session) {
        setInitialRoute('Dashboard');
      }
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        setInitialRoute('Dashboard');
      } else {
        setInitialRoute('Welcome');
      }
    });

    return () => {
      unsubscribe.remove();
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator initialRouteName={initialRoute}>
        {session ? (
          <>
            <Stack.Screen
              name="Dashboard"
              component={Dashboard}
              options={{
                headerShown: false,
                headerLeft: () => null
              }}
            />
            <Stack.Screen name="ProfileCreation" component={ProfileCreation} options={{ headerShown: true }} />
          </>
        ) : (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: true }} />
            <Stack.Screen name="Signup" component={Signup} options={{ headerShown: true }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: true }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return <AuthWrapper />;
};

export default App;