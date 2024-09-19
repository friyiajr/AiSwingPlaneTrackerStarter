import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useState } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';

import { Button } from '../components/Button';
import { RootStackParamList } from '../navigation';

type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Overview'>;

export default function Overview() {
  const navigation = useNavigation<OverviewScreenNavigationProps>();
  const [isLoading, setIsLoading] = useState(false);

  const startProcessing = () => {
    navigation.navigate('Details');
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <Text style={styles.messageText}>
          {isLoading ? 'Processing...' : 'Choose A Video Below'}
        </Text>
        {isLoading && <ActivityIndicator size="large" />}
      </View>
      <Button onPress={startProcessing} title="Show Details" />
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  messageText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});
