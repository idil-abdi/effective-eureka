import { globalStyles } from "@/styles/global";
import { Text, ScrollView } from "react-native";

export default function StatsScreen() {
  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>Stats Screen</Text>
    </ScrollView>
  );
}
