import { globalStyles } from "@/styles/global";
import { Text, ScrollView } from "react-native";

export default function TaskScreen() {
  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>Tasks Screen</Text>
    </ScrollView>
  );
}
