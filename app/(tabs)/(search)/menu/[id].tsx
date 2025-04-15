import { useLocalSearchParams  } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function MenuScreen() {
  const { id } = useLocalSearchParams ();

  return (
    <View style={styles.container}>
      <Text>Menú dinámico</Text>
      <Text>Estás viendo el menú con ID: {id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});