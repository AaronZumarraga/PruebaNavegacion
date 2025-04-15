import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ title: 'Toda la aplicacion' }}/> //este diseño aplica para toda la aplicacion
    </Stack>
  );
}
