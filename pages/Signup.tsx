import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { supabase } from '../supabaseClient';
import { useNavigation } from '@react-navigation/native';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation(); // Get the navigation object

  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert(
        'Success',
        'Signup successful!',
        [
          {
            text: 'OK',
            onPress: () => {
              // Navigate to the Login screen after successful signup
              navigation.navigate('Login'); // Replace 'Login' with your actual login screen name
            },
          },
        ],
      );
    }
    setLoading(false);
  }

  return (
    <View className="flex-1 justify-center p-6 bg-white">
      <Text className="text-3xl font-bold mb-6 text-center text-gray-800">
        Sign Up
      </Text>
      <TextInput
        className="h-12 border border-gray-300 rounded-md mb-4 px-4"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        className="h-12 border border-gray-300 rounded-md mb-6 px-4"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        className={`h-12 rounded-md flex items-center justify-center ${
          loading ? 'bg-blue-300' : 'bg-blue-500'
        }`}
        onPress={signUpWithEmail}
        disabled={loading}>
        <Text className="text-white font-semibold text-lg">
          {loading ? 'Loading...' : 'Sign Up'}
        </Text>
      </TouchableOpacity>

      <View className="flex-row justify-center mt-4">
        <Text className="text-center">
          Already have an account?{' '}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text className="font-bold text-blue-500">Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
