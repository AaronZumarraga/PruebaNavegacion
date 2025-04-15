import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="(home)" options={{ title: 'Inicio pestaña' }}/>
      <Tabs.Screen name="(search)" options={{ title: 'Busqueda pestaña' }}/>
      <Tabs.Screen name="(login)" options={{ title: 'Inicio de sesion pestaña' }}/> //este diseño aplica para todos los tabs
    </Tabs>
  );
}
