import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { UserIcon, HomeIcon, BookOpenIcon, CalendarIcon, AcademicCapIcon, UserGroupIcon, XMarkIcon } from 'react-native-heroicons/outline';
import Home from './dashboardscreens/Home';
import Calander from './dashboardscreens/Calander';
import Quiz from './dashboardscreens/Quiz';
import Community from './dashboardscreens/Community';
import Study from './dashboardscreens/Study';
import Header from '../components/Header';

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');
  const [animation] = useState(new Animated.Value(0));

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Home':
        return <Home />;
      case 'Study Materials':
        return <Study />;
      case 'Calendar':
        return <Calander />;
      case 'Quizzes':
        return <Quiz />;
      case 'Community':
        return <Community />;
      default:
        return null;
    }
  };

  const animateTab = (tabName) => {
    setActiveTab(tabName);
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
      friction: 5,
      tension: 40,
    }).start(() => {
      animation.setValue(0);
    });
  };

  const renderTabButton = (tabName, Icon) => {
    const isActive = activeTab === tabName;
    const scale = isActive ? animation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.1],
    }) : 1;

    return (
      <TouchableOpacity
        onPress={() => animateTab(tabName)}
        className={`items-center justify-center flex w-16 h-16 ${isActive ? 'bg-white rounded-full shadow-lg' : ''}`}
      >
        <Animated.View className="flex justify-center items-center" style={{ transform: [{ scale }] }}>
          <Icon size={24} color={isActive ? '#000000FF' : '#FFFFFF'} />
          <Text className={`text-xs mt-1 ${isActive ? 'text-[#000000] font-semibold' : 'text-white'}`}>
            {tabName === 'Study Materials' ? 'Study' : tabName}
          </Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-white">
      <Header/>
      <ScrollView className="flex-1">
        {renderContent()}
      </ScrollView>

      <View className="bg-[#000000] rounded-t-3xl shadow-lg flex-row justify-around items-center h-20 px-4">
        {renderTabButton('Study Materials', BookOpenIcon)}
        {renderTabButton('Calendar', CalendarIcon)}
        {renderTabButton('Home', HomeIcon)}
        {renderTabButton('Quizzes', AcademicCapIcon)}
        {renderTabButton('Community', UserGroupIcon)}
      </View>
    </View>
  );
}