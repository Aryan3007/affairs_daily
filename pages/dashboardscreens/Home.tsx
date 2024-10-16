/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  ListRenderItem,
  TouchableOpacity,
} from 'react-native';

const {width} = Dimensions.get('window');

interface NewsItem {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
}

interface NewsCategory {
  id: string;
  title: string;
  news: NewsItem[];
}

const newsItems: NewsItem[] = [
  {
    id: '1',
    title: 'UPSC Exam Dates Announced',
    content: 'New schedule released for Civil Services Examination',
    imageUrl:
      'https://unsplash.com/photos/two-white-pumpkins-sitting-next-to-each-other-W7rz2Qff-wQ',
  },
  {
    id: '2',
    title: 'SSC Recruitment Policy Change',
    content: 'Staff Selection Commission updates eligibility criteria',
    imageUrl:
      'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1rZVKb.img?w=768&h=432&m=6&x=725&y=224&s=133&d=133',
  },
  {
    id: '3',
    title: 'Economic Survey Highlights',
    content: 'Key points from the latest economic survey relevant to exams',
    imageUrl:
      'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1rZVKb.img?w=768&h=432&m=6&x=725&y=224&s=133&d=133',
  },
  {
    id: '4',
    title: 'New Education Policy Implementation',
    content: 'Government announces timeline for NEP 2020 rollout',
    imageUrl:
      'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1rZVKb.img?w=768&h=432&m=6&x=725&y=224&s=133&d=133',
  },
  {
    id: '5',
    title: 'Banking Sector Reforms',
    content: 'RBI introduces new regulations affecting banking exams',
    imageUrl:
      'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1rZVKb.img?w=768&h=432&m=6&x=725&y=224&s=133&d=133',
  },
];

const newsCategories: NewsCategory[] = [
  {
    id: 'national',
    title: 'National Affairs',
    news: [
      {
        id: 'n1',
        title: 'New Education Policy',
        content: 'Government implements NEP 2020',
        imageUrl:
          'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1rZVKb.img?w=768&h=432&m=6&x=725&y=224&s=133&d=133',
      },
      {
        id: 'n2',
        title: 'Lok Sabha Elections',
        content: 'Election Commission announces dates',
        imageUrl:
          'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1rZVKb.img?w=768&h=432&m=6&x=725&y=224&s=133&d=133',
      },
    ],
  },
  {
    id: 'international',
    title: 'International Affairs',
    news: [
      {
        id: 'i1',
        title: 'G20 Summit',
        content: 'India hosts G20 summit in New Delhi',
        imageUrl:
          'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1rZVKb.img?w=768&h=432&m=6&x=725&y=224&s=133&d=133',
      },
      {
        id: 'i2',
        title: 'UN Climate Conference',
        content: 'Countries pledge to reduce emissions',
        imageUrl:
          'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1rZVKb.img?w=768&h=432&m=6&x=725&y=224&s=133&d=133',
      },
    ],
  },
  // ... (other categories)
];

const NewsItem: React.FC<NewsItem> = ({title, content, imageUrl}) => (
  <View className="w-screen px-4 py-2">
    <Image
      source={{uri: imageUrl}}
      className="w-full h-32 rounded-lg mb-2"
      resizeMode="cover"
    />
    <Text className="text-lg font-bold text-black">{title}</Text>
    <Text className="text-sm text-gray-600">{content}</Text>
  </View>
);

const CategoryNewsItem: React.FC<NewsItem> = ({title, content, imageUrl}) => (
  <TouchableOpacity className="w-64 mr-4">
    <Image
      source={{uri: imageUrl}}
      className="w-full h-32 rounded-lg mb-2"
      resizeMode="cover"
    />
    <Text className="text-base font-semibold text-gray-800" numberOfLines={2}>
      {title}
    </Text>
    <Text className="text-sm text-gray-600" numberOfLines={2}>
      {content}
    </Text>
  </TouchableOpacity>
);

const NewsCategory: React.FC<NewsCategory> = ({title, news}) => (
  <View className="mb-6">
    <Text className="text-xl font-bold mb-2 px-4">{title}</Text>
    <FlatList
      data={news}
      renderItem={({item}) => <CategoryNewsItem {...item} />}
      keyExtractor={item => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingHorizontal: 16}}
    />
  </View>
);

const Home: React.FC = () => {
  const flatListRef = useRef<FlatList<NewsItem>>(null);

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({
          offset: width * (Math.floor(Date.now() / 5000) % newsItems.length),
          animated: true,
        });
      }
    }, 5000);

    return () => clearInterval(scrollInterval);
  }, []);

  const renderNewsItem: ListRenderItem<NewsItem> = ({item}) => (
    <NewsItem
      title={item.title}
      content={item.content}
      imageUrl={item.imageUrl}
      id={item.id}
    />
  );

  return (
    <View className="flex-1 pt-4 bg-white">
      <View className="">
      
        <FlatList
          ref={flatListRef}
          data={newsItems}
          renderItem={renderNewsItem}
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToInterval={width}
          decelerationRate="fast"
        />
      </View>

      {newsCategories.map(category => (
        <NewsCategory key={category.id} {...category} />
      ))}
    </View>
  );
};

export default Home;
