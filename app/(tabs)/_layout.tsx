import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="(home)" />
      <Tabs.Screen name="(search)" />
      <Tabs.Screen name="settings" /> //este diseño aplica para todos los tabs
    </Tabs>
  );
}
