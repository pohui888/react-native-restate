import { Client, Avatars, Account, OAuthProvider } from 'react-native-appwrite';
import * as Linking from 'expo-linking';
import { openAuthSessionAsync } from 'expo-web-browser';

export const config = {
  platform: 'com.reactnative.restate',
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
};

export const client = new Client();

client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform!);

export const avatar = new Avatars(client);
export const account = new Account(client); // Manages user authentication

export async function login() {
  try {
    // identify the callback URL after user login successfully
    const redirectUri = Linking.createURL('/');

    const response = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri // tells Google where to send the user after login.
    );

    if (!response) throw new Error('Failed to login');

    const browserResult = await openAuthSessionAsync(
      response.toString(),
      redirectUri // After login, the browser redirects back to redirectUri.
    );

    if (browserResult.type !== 'success') throw new Error('Failed to login');

    const url = new URL(browserResult.url);

    //auth?userId=12345&secret=xyz
    const secret = url.searchParams.get('secret')?.toString();
    const userId = url.searchParams.get('userId')?.toString();

    if (!secret || !userId) throw new Error('Failed to login');

    const session = await account.createSession(userId, secret);

    if (!session) throw new Error('Failed to create a session.');

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function logout() {
  try {
    await account.deleteSession('current');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getUser() {
  try {
    const response = await account.get();

    if (response.$id) {
      const userAvatar = avatar.getInitials(response.name);
      return {
        ...response, // spread operator
        avatar: userAvatar.toString(),
      };
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
