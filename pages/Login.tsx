import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Linking,
} from 'react-native';
import {styled} from 'nativewind';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../App';
import {supabase} from '../supabaseClient';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleGoogleLogin = async () => {
    try {
      const {data, error} = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'affairs_daily://login-callback',
        },
      });

      if (error) throw error;

      if (data?.url) {
        await Linking.openURL(data.url);
      }
    } catch (error) {
      console.error('Google Login Error:', error);
      Alert.alert('Login Error', error.message);
    }
  };

  const handleEmailPasswordLogin = async () => {
    if (!email || !password) {
      Alert.alert('Login Error', 'Please enter both email and password.');
      return;
    }

    setLoading(true);
    try {
      const {error} = await supabase.auth.signInWithPassword({email, password});
      if (error) throw error;

      Alert.alert('Login Success', 'You have successfully logged in!');
      navigation.navigate('ProfileCreation');
    } catch (error) {
      console.error('Email/Password Login Error:', error);
      Alert.alert('Login Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledView className="flex-1 bg-white">
      <StyledView className="flex-1 justify-center items-center px-5">
        <StyledText className="text-2xl font-bold text-gray-800 mb-2">
          Welcome!
        </StyledText>
        <StyledText className="text-base text-gray-600 text-center mb-5">
          Please sign in to continue.
        </StyledText>

        <StyledTouchableOpacity
          className="bg-blue-500 py-3 px-8 rounded-lg w-full mb-4"
          onPress={handleGoogleLogin}>
          <StyledText className="text-white text-base font-semibold text-center">
            Continue With Google
          </StyledText>
        </StyledTouchableOpacity>

        <StyledText className="text-center font-bold text-lg mb-4">
          OR
        </StyledText>

        <StyledView className="w-full mb-4">
          <StyledText className="text-sm font-semibold text-gray-700 mb-1">
            Email
          </StyledText>
          <StyledTextInput
            className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 text-base text-gray-700"
            placeholder="Enter your email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </StyledView>

        <StyledView className="w-full mb-5">
          <StyledText className="text-sm font-semibold text-gray-700 mb-1">
            Password
          </StyledText>
          <StyledTextInput
            className="w-full bg-white border border-gray-300 rounded-lg py-2 px-3 text-base text-gray-700"
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </StyledView>

        <StyledTouchableOpacity
          className="bg-blue-500 py-3 px-8 rounded-lg w-full mb-4"
          onPress={handleEmailPasswordLogin}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <StyledText className="text-white text-base font-semibold text-center">
              Login
            </StyledText>
          )}
        </StyledTouchableOpacity>

        <StyledText className="text-center">
          Don't have an account?{' '}
          <Text className="font-bold text-blue-500">Sign Up</Text>
        </StyledText>
      </StyledView>
    </StyledView>
  );
}
