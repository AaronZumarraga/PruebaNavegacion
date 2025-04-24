import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import auth from '@/firebaseConfig';

export default function HomeScreen() {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email); // Guarda el email del usuario autenticado
      } else {
        setUserEmail(null); // Limpia el email si no hay usuario
      }
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Text>Inicio</Text>
      {userEmail && <Text>Bienvenido, {userEmail}</Text>} {/* Muestra el email si está disponible */}
      <Link href="/details">Pagina de detalles de la pagina de inicio - Navegacion Stack</Link>
      <Link href="/details2">Pagina de detalles 2 de la pagina de inicio - Navegacion Stack</Link>
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
