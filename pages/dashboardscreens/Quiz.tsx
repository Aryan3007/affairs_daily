import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
} from 'react-native';
import { XMarkIcon, AcademicCapIcon, QuestionMarkCircleIcon, ClockIcon } from 'react-native-heroicons/outline';

interface Quiz {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  questions: QuizQuestion[];
  totalQuestions: number;
  timeAllotted: string;
  category: string;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

const quizzes: Quiz[] = [
  {
    id: 1,
    title: 'World Geography Quiz',
    description: 'Test your knowledge of world geography with this exciting quiz!',
    totalQuestions: 5,
    timeAllotted: "15 Minutes",
    difficulty: 'Medium',
    category: 'Geography',
    questions: [
      {
        id: 1,
        question: 'What is the capital of France?',
        options: ['London', 'Berlin', 'Paris', 'Madrid'],
        correctAnswer: 2,
      },
      {
        id: 2,
        question: 'Which of these countries is NOT in Africa?',
        options: ['Nigeria', 'Kenya', 'Bangladesh', 'Morocco'],
        correctAnswer: 2,
      },
      {
        id: 3,
        question: 'What is the largest ocean on Earth?',
        options: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
        correctAnswer: 3,
      },
      {
        id: 4,
        question: 'Which mountain range runs along the border between France and Spain?',
        options: ['Alps', 'Pyrenees', 'Carpathians', 'Apennines'],
        correctAnswer: 1,
      },
      {
        id: 5,
        question: 'What is the capital city of Australia?',
        options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: 2,
    title: 'Science and Space Quiz',
    description: 'Explore the wonders of science and space in this challenging quiz!',
    totalQuestions: 5,
    timeAllotted: "15 Minutes",
    difficulty: 'Hard',
    category: 'Science',
    questions: [
      {
        id: 1,
        question: 'What is the chemical symbol for water?',
        options: ['H2O', 'CO2', 'NaCl', 'CH4'],
        correctAnswer: 0,
      },
      {
        id: 2,
        question: 'Which planet is known as the "Gas Giant"?',
        options: ['Venus', 'Jupiter', 'Mars', 'Saturn'],
        correctAnswer: 1,
      },
      {
        id: 3,
        question: 'What is the smallest unit of matter?',
        options: ['Atom', 'Molecule', 'Cell', 'Electron'],
        correctAnswer: 0,
      },
      {
        id: 4,
        question: 'What is the speed of light in vacuum?',
        options: ['299,792 km/s', '300,000 km/s', '199,792 km/s', '250,000 km/s'],
        correctAnswer: 0,
      },
      {
        id: 5,
        question: 'Which of these is NOT a type of elementary particle?',
        options: ['Quark', 'Lepton', 'Boson', 'Neutron'],
        correctAnswer: 3,
      },
    ],
  },
  {
    id: 3,
    title: 'World History Quiz',
    description: 'Journey through time with this engaging world history quiz!',
    totalQuestions: 5,
    timeAllotted: "15 Minutes",
    difficulty: 'Medium',
    category: 'History',
    questions: [
      {
        id: 1,
        question: 'In which year did World War II end?',
        options: ['1943', '1945', '1947', '1950'],
        correctAnswer: 1,
      },
      {
        id: 2,
        question: 'Who was the first President of the United States?',
        options: ['Thomas Jefferson', 'John Adams', 'George Washington', 'Benjamin Franklin'],
        correctAnswer: 2,
      },
      {
        id: 3,
        question: 'Which ancient wonder was located in Alexandria, Egypt?',
        options: ['Hanging Gardens', 'Colossus of Rhodes', 'Lighthouse of Alexandria', 'Temple of Artemis'],
        correctAnswer: 2,
      },
      {
        id: 4,
        question: 'Who wrote "The Communist Manifesto"?',
        options: ['Vladimir Lenin', 'Joseph Stalin', 'Karl Marx', 'Mao Zedong'],
        correctAnswer: 2,
      },
      {
        id: 5,
        question: 'In which year did the Berlin Wall fall?',
        options: ['1987', '1989', '1991', '1993'],
        correctAnswer: 1,
      },
    ],
  },
];

interface ProgressIndicatorProps {
  totalQuestions: number;
  currentQuestion: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  totalQuestions,
  currentQuestion,
}) => (
  <View className="flex-row justify-between mt-6 mb-12">
    {[...Array(totalQuestions)].map((_, index) => (
      <View
        key={index}
        className={`flex-1 h-1 mx-0.5 ${index <= currentQuestion ? 'bg-white' : 'bg-blue-400'}`}
      />
    ))}
  </View>
);

const QuizInterface: React.FC<{
  quiz: Quiz;
  onExit: () => void;
}> = ({ quiz, onExit }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(900); // 15 minutes in seconds
  const [showResults, setShowResults] = useState(false);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(Array(quiz.questions.length).fill(null));

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerRef.current!);
          handleSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleExitConfirmation = () => {
    Alert.alert(
      "Exit Quiz",
      "Are you sure you want to exit the quiz? Your progress will be lost.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Exit", style: "destructive", onPress: onExit }
      ]
    );
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const calculateScore = () => {
    return userAnswers.reduce((score, answer, index) => {
      return score + (answer === quiz.questions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <SafeAreaView className="flex-1 bg-[#006af6]">
        <StatusBar barStyle="light-content" />
        <View className="flex-1 bg-blue-500 p-6">
          <Text className="text-white text-3xl font-bold mb-6">Quiz Results</Text>
          <Text className="text-white text-xl mb-4">
            Your Score: {score} / {quiz.questions.length}
          </Text>
          <TouchableOpacity
            className="bg-white p-4 rounded-lg"
            onPress={onExit}
          >
            <Text className="text-blue-500 text-center font-bold">Exit to Dashboard</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#006af6]">
      <StatusBar barStyle="light-content" />
      <View className="flex-1 bg-blue-500">
        <View className="flex-row justify-between items-center p-4">
          <TouchableOpacity onPress={handleExitConfirmation}>
            <XMarkIcon size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-lg font-bold">{quiz.title}</Text>
          <TouchableOpacity>
            <AcademicCapIcon size={24} color="white" />
          </TouchableOpacity>
        </View>

        <ProgressIndicator
          totalQuestions={quiz.questions.length}
          currentQuestion={currentQuestion}
        />

        <Text className="text-white text-center text-xl mb-4">
          Time Remaining: {formatTime(timeRemaining)}
        </Text>

        <View className="flex-1 bg-gray-100 rounded-t-3xl p-6">
          <ScrollView className="h-96">
            <View className="mb-4">
              <Text className="text-gray-500 text-sm">
                Question {currentQuestion + 1} of {quiz.questions.length}
              </Text>
            </View>

            <Text className="text-2xl font-bold mb-6">
              {quiz.questions[currentQuestion].question}
            </Text>

            {quiz.questions[currentQuestion].options.map((option, index) => (
              <TouchableOpacity
                key={index}
                className={`p-4 rounded-lg mb-4 ${userAnswers[currentQuestion] === index ? 'bg-blue-500' : 'bg-white'}`}
                onPress={() => {
                  const newAnswers = [...userAnswers];
                  newAnswers[currentQuestion] = index;
                  setUserAnswers(newAnswers);
                  setSelectedAnswer(index);
                }}
              >
                <Text className={`${userAnswers[currentQuestion] === index ? 'text-white' : 'text-black'}`}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <View className="flex-row justify-between mt-6">
            <TouchableOpacity
              className="flex-1 p-4 rounded-lg bg-yellow-500 mr-2"
              onPress={handlePrevious}
              disabled={currentQuestion === 0}
            >
              <Text className="text-white text-center font-bold">Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 p-4 rounded-lg bg-blue-500 ml-2"
              onPress={handleNext}
            >
              <Text className="text-white text-center font-bold">
                {currentQuestion === quiz.questions.length - 1 ? 'Submit' : 'Next'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const QuizSelector: React.FC<{ onSelectQuiz: (quiz: Quiz) => void }> = ({
  onSelectQuiz,
}) => (
  <SafeAreaView className="flex-1 bg-gray-100">
    <ScrollView className="flex-1 px-4 py-6">
      <Text className="text-gray-800 text-3xl font-bold mb-6">Select a Quiz</Text>
      <View className="space-y-4">
        {quizzes.map((quiz) => (
          <TouchableOpacity
            key={quiz.id}
            className="bg-white p-4 rounded-xl border border-gray-200 shadow-md"
            onPress={() => onSelectQuiz(quiz)}
          >
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-gray-800 text-xl font-semibold flex-1">{quiz.title}</Text>
            </View>
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center">
                <ClockIcon size={20} color="#6B7280" />
                <Text className="text-gray-600 ml-2">{quiz.timeAllotted}</Text>
              </View>
              <View className="flex-row items-center">
                <QuestionMarkCircleIcon size={20} color="#6B7280" />
                <Text className="text-gray-600 ml-2">{quiz.totalQuestions} Questions</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  </SafeAreaView>
);

export default function QuizApp() {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);

  return selectedQuiz ? (
    <QuizInterface quiz={selectedQuiz} onExit={() => setSelectedQuiz(null)} />
  ) : (
    <QuizSelector onSelectQuiz={setSelectedQuiz} />
  );
}