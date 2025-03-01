import { Link } from 'expo-router';
import { View } from 'react-native';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Link href="/sign-in">Sign In</Link>
      <Link href="/root/(tabs)/explore">Explore</Link>
      <Link href="/root/(tabs)/profile">Profile</Link>
      <Link href="/root/properties/1">Property</Link>
    </View>
  );
}
