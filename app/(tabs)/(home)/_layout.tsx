import { Stack } from 'expo-router';

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="index" options={{ title: 'Inicio' }}/>
      <Stack.Screen name="details" options={{ title: 'Detalles' }}/> //este diseño aplica para todos lo que este dentro de home
    </Stack>
  );
}
