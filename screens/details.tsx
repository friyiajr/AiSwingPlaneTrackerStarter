import { StyleSheet, View, Text } from 'react-native';

export default function Details() {
  return (
    <View style={styles.container}>
      <Text>Hello World</Text>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
});
