import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import {
  UserCircleIcon,
  BellIcon,
  XMarkIcon,
} from 'react-native-heroicons/outline';

const {width} = Dimensions.get('window');

export default function Header() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationMenuOpen, setIsNotificationMenuOpen] = useState(false);
  const profileMenuAnimation = useRef(new Animated.Value(-width)).current;
  const notificationMenuAnimation = useRef(new Animated.Value(width)).current;

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
    Animated.timing(profileMenuAnimation, {
      toValue: isProfileMenuOpen ? -width : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const toggleNotificationMenu = () => {
    setIsNotificationMenuOpen(!isNotificationMenuOpen);
    Animated.timing(notificationMenuAnimation, {
      toValue: isNotificationMenuOpen ? width : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View className="relative">
      <View className="h-16 flex w-full flex-row justify-between items-center px-4 bg-zinc-800 shadow-md">
        <TouchableOpacity
          onPress={toggleProfileMenu}
          accessibilityLabel="Open profile menu">
          <UserCircleIcon size={36} color="white" />
        </TouchableOpacity>
        <Text className="text-xl text-white font-semibold">
          Bank & Insurance
        </Text>
        <TouchableOpacity
          onPress={toggleNotificationMenu}
          accessibilityLabel="Open notifications">
          <BellIcon size={36} color="white" />
        </TouchableOpacity>
      </View>

      {/* Profile Menu */}
      <Animated.View
        className="absolute h-screen z-50"
        style={{
          transform: [{translateX: profileMenuAnimation}],
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: width * 0.8,
          backgroundColor: 'white',
          zIndex: 10,
        }}>
        <ScrollView className="flex-1">
          <View className="flex-row justify-between p-4 items-center mb-4">
            <Text className="text-2xl font-bold">Profile</Text>
            <TouchableOpacity
              onPress={toggleProfileMenu}
              accessibilityLabel="Close profile menu">
              <XMarkIcon size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View className="h-full bg-blue-500 justify-center gap-1 items-center flex">
            <View className="h-24 w-24 bg-white rounded-full"/>
            <Text className="text-xl text-white font-semnibold">John Doe</Text>
            <Text className="text-gray-100">john.doe@example.com</Text>
          </View>
          {/* Add more profile menu items here */}

          <TouchableOpacity>
            
          </TouchableOpacity>
        </ScrollView>
      </Animated.View>

      {/* Notification Menu */}
      <Animated.View
        className="absolute h-screen z-50"
        style={{
          transform: [{translateX: notificationMenuAnimation}],
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: width * 1,
          backgroundColor: 'white',
          zIndex: 10,
        }}>
        <ScrollView className="flex-1 gap-2 p-2">
          <View className="flex-row justify-between px-4 items-center mb-4">
            <Text className="text-2xl font-bold pt-2">Notifications</Text>
            <TouchableOpacity
              onPress={toggleNotificationMenu}
              accessibilityLabel="Close notifications">
              <XMarkIcon size={24} color="black" />
            </TouchableOpacity>
          </View>
          {/* Add notification items here */}
          <View className="bg-green-300 rounded-lg shadow p-2">
            <Text className="text-lg font-bold text-black mb-1">
              New quiz available!
            </Text>
            <Text className="text-gray-600 mb-4">
              Check out the latest quiz on Banking Regulations.
            </Text>
          </View>
          <View className="bg-green-300 rounded-lg shadow p-2">
            <Text className="text-lg font-bold text-black mb-1">
              New quiz available!
            </Text>
            <Text className="text-gray-600 mb-4">
              Check out the latest quiz on Banking Regulations.
            </Text>
          </View>
          <View className="bg-green-300 rounded-lg shadow p-2">
            <Text className="text-lg font-bold text-black mb-1">
              New quiz available!
            </Text>
            <Text className="text-gray-600 mb-4">
              Check out the latest quiz on Banking Regulations.
            </Text>
          </View>
        </ScrollView>
      </Animated.View>
    </View>
  );
}
