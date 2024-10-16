import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type TabType =
  | 'CurrentAffairs'
  | 'EditorialAnalysis'
  | 'InteractiveInfographics';

const TabButton = ({ title, isActive, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    className={`flex-1 py-2 ${isActive ? 'border-b-2 border-blue-600' : ''}`}>
    <Text
      className={`text-center ${isActive ? 'text-blue-600 font-semibold' : 'text-gray-600'
        }`}>
      {title}
    </Text>
  </TouchableOpacity>
);

const CurrentAffairsContent = () => (
  <>
    <View className="bg-white rounded-lg p-1 flex flex-row gap-2 shadow-md">
      <Image
        source={{
          uri: 'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1rZVKb.img?w=768&h=432&m=6&x=725&y=224&s=133&d=133',
        }}
        className="w-36 h-28 rounded-lg mb-2"
        resizeMode="cover"
      />
      <View className="flex">
        <Text className="text-lg text-black font-serif font-bold">
          Current Affairs Latest
        </Text>
        <Text className="text-base text-black">Date : 12/11/24</Text>
        <Text className="text-base text-black">Created By - Affairs Daily</Text>
        <View className="flex flex-row justify-between">
          <TouchableOpacity className="my-2 rounded-md bg-blue-500 px-3 py-0.5 w-fit">
            <Text className="text-white">Read Now</Text>
          </TouchableOpacity>

          <TouchableOpacity className="my-2 rounded-md bg-blue-500 px-3 py-0.5 w-fit">
            <Text className="text-white">Download</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    <View className="border-b border-zinc-400" />
  </>
);

const EditorialAnalysisContent = () => (
  <View className="bg-white grid grid-rows-2 gap-4 rounded-lg p-4">

    <View className=" rounded-xl border h-32"></View>
    <View className=" rounded-xl border h-32"></View>
    <View className=" rounded-xl border h-32"></View>
   

  </View>
  

);

const InteractiveInfographicsContent = () => (
  <View className="bg-white rounded-lg p-4 shadow-md">
    <Text className="mb-2">Visual representation of important data:</Text>
    {[
      'Budget breakdown',
      'Economic Survey highlights',
      'Major international summits',
    ].map((topic, index) => (
      <TouchableOpacity key={index} className="mb-2">
        <Text className="text-blue-600">{topic}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const StudyMaterials = () => {
  const [activeTab, setActiveTab] = useState<TabType>('CurrentAffairs');

  const renderContent = () => {
    switch (activeTab) {
      case 'CurrentAffairs':
        return <CurrentAffairsContent />;
      case 'EditorialAnalysis':
        return <EditorialAnalysisContent />;
      case 'InteractiveInfographics':
        return <InteractiveInfographicsContent />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row mt-6 border-gray-200 bg-white">
        <TabButton
          title="Current Affairs"
          isActive={activeTab === 'CurrentAffairs'}
          onPress={() => setActiveTab('CurrentAffairs')}
        />
        <TabButton
          title="Editorial Analysis"
          isActive={activeTab === 'EditorialAnalysis'}
          onPress={() => setActiveTab('EditorialAnalysis')}
        />
        <TabButton
          title="Infographics"
          isActive={activeTab === 'InteractiveInfographics'}
          onPress={() => setActiveTab('InteractiveInfographics')}
        />
      </View>
      <ScrollView className="flex-1">
        <View className="p-4">{renderContent()}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StudyMaterials;
