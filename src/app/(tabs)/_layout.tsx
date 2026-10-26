import { Tabs } from 'expo-router';

import { Icon, type IconName } from '@/components/ui';
import { useTheme } from '@/theme';

const tabs: { name: string; title: string; icon: IconName; iconFocused: IconName }[] = [
  { name: 'index', title: 'Home', icon: 'home-outline', iconFocused: 'home' },
  { name: 'workout', title: 'Workout', icon: 'barbell-outline', iconFocused: 'barbell' },
  { name: 'exercises', title: 'Exercises', icon: 'search-outline', iconFocused: 'search' },
  { name: 'progress', title: 'Progress', icon: 'stats-chart-outline', iconFocused: 'stats-chart' },
  { name: 'coach', title: 'Coach', icon: 'chatbubbles-outline', iconFocused: 'chatbubbles' },
];

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSubtle,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
      }}>
      {tabs.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarButtonTestID: `tab-${tab.name}`,
            tabBarIcon: ({ focused, size }) => (
              <Icon
                name={focused ? tab.iconFocused : tab.icon}
                color={focused ? colors.primary : colors.textSubtle}
                size={size}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
