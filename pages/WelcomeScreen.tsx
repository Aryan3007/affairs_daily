import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { styled } from 'nativewind';
import { UserCircle, MessageCircle, ActivitySquare } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

// Define types for the FeatureItem props
interface FeatureItemProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

// Styling the components with nativewind
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);

// Define the navigation type for WelcomeScreen
type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

// FeatureItem component with typed props
const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description }) => (
    <StyledView className="flex-row items-center mb-6">
        <StyledView className="w-10 h-10 mr-4 items-center justify-center">
            {icon}
        </StyledView>
        <StyledView className="flex-1">
            <StyledText className="text-base font-semibold text-gray-800">{title}</StyledText>
            <StyledText className="text-sm text-gray-600">{description}</StyledText>
        </StyledView>
    </StyledView>
);

const WelcomeScreen: React.FC = () => {
    const features = [
        {
            icon: <UserCircle size={24} color="#3b82f6" />,
            title: 'Profile Management',
            description: 'Setup, update, and manage your personal information, settings, and preferences',
        },
        {
            icon: <MessageCircle size={24} color="#3b82f6" />,
            title: 'Secure Messaging',
            description: 'Chat securely with friends and family in real-time',
        },
        {
            icon: <ActivitySquare size={24} color="#3b82f6" />,
            title: 'Activity Tracking',
            description: 'Monitor your daily activities and track your progress over time',
        },
    ];

    // Use the typed navigation
    const navigation = useNavigation<WelcomeScreenNavigationProp>();

    const handleContinue = () => {
        navigation.navigate('Signup');  // Correctly typed navigation to Login screen
    };

    return (
        <StyledView className="flex-1 bg-white">
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <StyledScrollView className="flex-1">
                <StyledView className="flex-1 px-6 pt-12 pb-6">
                    {/* Header Section */}
                    <StyledView className="items-center mb-12">
                        <StyledText className="text-4xl font-bold text-gray-800">Welcome to</StyledText>
                        <StyledText className="text-4xl font-bold capitalize text-blue-500">Affairs Daily</StyledText>
                    </StyledView>

                    {/* Features List */}
                    <StyledView className="mb-12">
                        {features.map((feature, index) => (
                            <FeatureItem key={index} {...feature} />
                        ))}
                    </StyledView>

                    {/* Footer Section */}
                    <StyledView className="mt-auto">
                        <StyledText className="text-xs text-center text-gray-500 mb-6">
                            By clicking continue, you agree to our Terms of Service and that you have read our Privacy Policy
                        </StyledText>
                        <StyledTouchableOpacity
                            className="bg-blue-500 py-4 px-6 rounded-full"
                            onPress={handleContinue}
                        >
                            <StyledText className="text-white text-center text-lg font-semibold">Continue</StyledText>
                        </StyledTouchableOpacity>
                    </StyledView>
                </StyledView>
            </StyledScrollView>
        </StyledView>
    );
};

export default WelcomeScreen;