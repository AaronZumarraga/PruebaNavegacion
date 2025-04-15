import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen() {
  // Simulando una lista de menús
  // En una aplicación real, esto podría venir de una API o base de datos
  const menus = [
    { id: '1', name: 'Menú 1' },
    { id: '2', name: 'Menú 2' },
    { id: '3', name: 'Menú 3' },
  ];

  return (
    <View style={styles.container}>
      <Text>Search</Text>
      {menus.map((menu) => (
        <Link key={menu.id} href={`/menu/${menu.id}`}>
          {menu.name}
        </Link>
      ))}
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
