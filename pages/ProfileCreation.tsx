import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { styled } from 'nativewind';
const StyledTouchableOpacity = styled(TouchableOpacity);
type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

export default function ProfileCreation() {

  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [examPreference, setExamPreference] = useState('');
  const navigation = useNavigation<WelcomeScreenNavigationProp>();


  const handleEmailPasswordLogin = () => {
    navigation.navigate('Dashboard');
    // Here you would typically call an API to authenticate the user
    console.log('Login with Email and Password');
  };



  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold  text-center text-gray-800">
        Profile Creation
      </Text> 
      <Text className="text-base font-bold mb-12 text-center text-gray-800">
        Let us know about you
      </Text>

      <View className="mb-4">
        <Text className="text-sm font-medium text-gray-700 mb-1">Name</Text>
        <TextInput
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
          placeholder="Enter your name"
        />
      </View>

      <View className="mb-4">
        <Text className="text-sm font-medium text-gray-700 mb-1">Educational Background</Text>
        <TextInput
          className="w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
          placeholder="Enter your educational background"
        />
      </View>

      <View className="mb-4">
        <Text className="text-sm font-medium text-gray-700 mb-1">Exam Preference</Text>
        <View className="relative">
          <Picker
            selectedValue={examPreference}
            onValueChange={(itemValue) => setExamPreference(itemValue)}
            className="w-full bg-white border border-gray-300 rounded-md"
          >
            <Picker.Item label="Select your exam preference" value="" />
            <Picker.Item label="Bank & Insurance" value="bank" />
            <Picker.Item label="SSC" value="ssc" />
            <Picker.Item label="Railways" value="railways" />
            <Picker.Item label="UPSC" value="upsc" />
            <Picker.Item label="State Exams" value="state" />
            <Picker.Item label="Other Exams" value="other" />
          </Picker>
        </View>
        {examPreference && (
          <Text className="mt-2 text-xl text-blue-600">
            Selected: {examPreference.charAt(0).toUpperCase() + examPreference.slice(1)}
          </Text>
        )}
      </View>
      <View className="mb-4">
        <Text className="text-lg font-semibold mb-2 text-gray-800">Notification Preferences:</Text>
        {['dailyUpdates', 'mockTestReminders', 'currentAffairs'].map((notificationType) => (
          <View key={notificationType} className="flex-row items-center justify-between mb-2">
            <Text className="text-gray-700">
              {notificationType.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </Text>
            <Switch />
          </View>
        ))}
      </View>

      <View className="mb-4">
        <Text className="text-lg font-semibold mb-2 text-gray-800">Language Preference:</Text>
        <View className="flex-row">
          <TouchableOpacity
            onPress={() => setSelectedLanguage('english')}
            className={`flex-1 py-2 ${selectedLanguage === 'english' ? 'bg-blue-400' : 'bg-white'} border border-gray-300 rounded-l-md`}
          >
            <Text className={`text-center ${selectedLanguage === 'english' ? 'text-white' : 'text-gray-700'}`}>English</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedLanguage('hindi')}
            className={`flex-1 py-2 ${selectedLanguage === 'hindi' ? 'bg-blue-400' : 'bg-white'} border border-gray-300 rounded-r-md`}
          >
            <Text className={`text-center ${selectedLanguage === 'hindi' ? 'text-white' : 'text-gray-700'}`}>Hindi</Text>
          </TouchableOpacity>
        </View>
      </View>

      <StyledTouchableOpacity
       onPress={handleEmailPasswordLogin}
        className="bg-blue-500 py-3 px-4 rounded-md"
      >
        <Text className="text-white text-center font-semibold">Save & Continue</Text>
      </StyledTouchableOpacity>
    </ScrollView>
  );
}