import { Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import auth from '@/firebaseConfig'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { router } from 'expo-router'

const index = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true); // Estado para manejar la carga inicial
  const [userEmail, setUserEmail] = useState<string | null>(null); // Estado para almacenar el email del usuario

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email); // Guarda el email del usuario autenticado
        router.replace('/(tabs)/(login)/usuario'); // Redirige a la pantalla de usuario si ya está autenticado
      } else {
        setUserEmail(null); // Limpia el email si no hay usuario
        setLoading(false); // Deja de mostrar el indicador de carga si no hay usuario
      }
    });
    return unsubscribe; // Limpia el listener al desmontar el componente
  }, []);

  const signIn = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      if (user) router.replace('/(tabs)/(login)/usuario');
    } catch (error: any) {
      console.log(error);
      alert('Sign in failed: ' + error.message);
    }
  };

  const signUp = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      if (user) router.replace('/(tabs)/(login)/usuario');
    } catch (error: any) {
      console.log(error);
      alert('Sign up failed: ' + error.message);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#5C6BC0" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput style={styles.textInput} placeholder="email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.textInput} placeholder="password" value={password} onChangeText={setPassword} secureTextEntry/>
      <TouchableOpacity style={styles.button} onPress={signIn}>
        <Text style={styles.text}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/registro')}>
        <Text style={styles.text}>Make Account</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/reset-password')}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA', // A softer white for a modern, minimalist background
  },
  title: {
    fontSize: 28, // A bit larger for a more striking appearance
    fontWeight: '800', // Extra bold for emphasis
    marginBottom: 40, // Increased space for a more airy, open feel
    color: '#1A237E', // A deep indigo for a sophisticated, modern look
  },
  textInput: {
    height: 50, // Standard height for elegance and simplicity
    width: '90%', // Full width for a more expansive feel
    backgroundColor: '#FFFFFF', // Pure white for contrast against the container
    borderColor: '#E8EAF6', // A very light indigo border for subtle contrast
    borderWidth: 2,
    borderRadius: 15, // Softly rounded corners for a modern, friendly touch
    marginVertical: 15,
    paddingHorizontal: 25, // Generous padding for ease of text entry
    fontSize: 16, // Comfortable reading size
    color: '#3C4858', // A dark gray for readability with a hint of warmth
    shadowColor: '#9E9E9E', // A medium gray shadow for depth
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4, // Slightly elevated for a subtle 3D effect
  },
  button: {
    width: '90%',
    marginVertical: 15,
    backgroundColor: '#5C6BC0', // A lighter indigo to complement the title color
    padding: 20,
    borderRadius: 15, // Matching rounded corners for consistency
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#5C6BC0', // Shadow color to match the button for a cohesive look
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
  },
  text: {
    color: '#FFFFFF', // Maintained white for clear visibility
    fontSize: 18, // Slightly larger for emphasis
    fontWeight: '600', // Semi-bold for a balanced weight
  },
  forgotPassword: {
    marginTop: 20,
    fontSize: 16,
    color: '#5C6BC0', // Matches the button color for consistency
    textDecorationLine: 'underline', // Underline for emphasis
  },
});