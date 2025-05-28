import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';

WebBrowser.maybeCompleteAuthSession();

export default function useGoogleAuth(navigation) {
  const dispatch = useDispatch();
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: '728529792005-ca2dqf4iho70mtd41td8da13iu207mkl.apps.googleusercontent.com',
    webClientId: '728529792005-oa3fd7r68e4lf7mvc8rppbklhkhvke02.apps.googleusercontent.com',
    expoClientId: '728529792005-oa3fd7r68e4lf7mvc8rppbklhkhvke02.apps.googleusercontent.com',
    // redirectUri: AuthSession.makeRedirectUri({
    // native: 'com.simple.suppers:/oauthredirect',
    // useProxy: true, // IMPORTANT for Expo
  // }),
    scopes: ['profile', 'email'],
  });

   useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${authentication.accessToken}` },
      })
        .then(res => res.json())
        .then(userInfo => {
          dispatch(setUser(userInfo));
          navigation.navigate('PlannerProfile');
        })
        .catch(error => console.error('Failed to fetch user info:', error));
    }
  }, [response]);

  return { promptAsync, request };
}