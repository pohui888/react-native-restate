import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import images from '@/constants/images';
import icons from '@/constants/icons';
import { login } from '@/lib/appwrite';
import { useGlobalContext } from '@/lib/global-provider';
import { Redirect } from 'expo-router';

const SignIn = () => {
  const { refetch, loading, isLoggedIn } = useGlobalContext();

  if (!loading && isLoggedIn) return <Redirect href="/" />;

  const handleLogin = async () => {
    const result = await login();

    if (result) {
      refetch();
      console.log('Login Successfully');
    } else {
      console.log('Failed to login');
      Alert.alert('Error', 'Failed to login');
    }
  };

  return (
    // SafeAreaView -> ensure the content is below the border of the screen
    <SafeAreaView className="bg-white h-full  ">
      {/* ScrollView -> allow the user to scroll if the device height is too small */}
      <ScrollView contentContainerClassName="h-full">
        <Image
          // source != src
          source={images.onboarding}
          className="w-full h-4/6"
          resizeMode="contain"
        />
        {/* View = div */}
        <View className="px-10">
          <Text className="font-rubik-semibold text-base text-center uppercase text-black-200">
            Welcome to ReState
          </Text>

          <Text className="font-rubik-bold text-3xl  text-black-300 text-center mt-2">
            Let's Get Closer Your to {'\n'}{' '}
            <Text className="text-primary-300">Your Ideal Home</Text>
          </Text>

          <Text className="font-rubik-semibold text-lg text-black-200 text-center mt-12">
            Login to ReState with Google
          </Text>

          <TouchableOpacity
            onPress={handleLogin}
            activeOpacity={0.5} // opacity when animated
            className="bg-white shadow-md shadow-zinc-300 rounded-3xl w-full py-4 mt-5"
          >
            <View className="flex flex-row items-center justify-center">
              <Image
                source={icons.google}
                className="w-5 h-5"
                resizeMode="contain"
              />
              <Text className="text-lg font-rubik-medium text-black-300 ml-2">
                Continue with Google
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
