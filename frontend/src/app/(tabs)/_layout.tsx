import { colors } from "@/styles/global";
import { Tabs } from "expo-router";
import { SymbolView } from "expo-symbols";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.surface,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <SymbolView
              name={{
                ios: "house.fill",
                android: "home",
              }}
              size={size}
              tintColor={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="tasks-screen"
        options={{
          title: "Tasks",
          tabBarIcon: ({ color, size }) => (
            <SymbolView
              name={{ ios: "checklist", android: "checklist" }}
              tintColor={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="pet-screen"
        options={{
          title: "Pet",
          tabBarIcon: ({ color, size }) => (
            <SymbolView
              name={{ ios: "pawprint.fill", android: "pets" }}
              tintColor={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="stats-screen"
        options={{
          title: "Stats",
          tabBarIcon: ({ color, size }) => (
            <SymbolView
              name={{ ios: "chart.bar.fill", android: "bar_chart" }}
              tintColor={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile-screen"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <SymbolView
              name={{
                ios: "person.crop.circle.fill",
                android: "account_circle",
              }}
              tintColor={color}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}
