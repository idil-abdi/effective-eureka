import { Text, ScrollView } from "react-native";
import { globalStyles } from "@/styles/global";
import HomeHeader from "@/components/HomeHeader";

export default function HomeScreen() {
  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>Home Screen</Text>
      <HomeHeader />
    </ScrollView>
  );
}
