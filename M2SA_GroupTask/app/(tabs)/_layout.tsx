import { Tabs } from 'expo-router';

const COLORS = {
  green: '#24382B',
  cream: '#F7F0E4',
  muted: '#8A7D68',
};

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.green,
        tabBarInactiveTintColor: COLORS.muted,
        tabBarStyle: {
          backgroundColor: COLORS.cream,
          borderTopColor: '#D8CDB8',
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Menu',
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: 'Cart',
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
        }}
      />

      <Tabs.Screen
        name="detail"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}