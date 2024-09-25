import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Details from '../screens/details';
import Overview from '../screens/overview';
import { XContextProvider } from 'screens/context';

export type RootStackParamList = {
  Overview: undefined;
  Details: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <XContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Overview">
          <Stack.Screen name="Overview" component={Overview} />
          <Stack.Screen name="Details" component={Details} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </XContextProvider>
  );
}
