import { Link, Stack } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { ScreenContent } from "@/components/ScreenContent";
import { useAuth } from "@/utils/auth";

export default function Home() {
  const { user, signOut } = useAuth();

  return (
    <View className={styles.container}>
      <Stack.Screen options={{ title: "Home" }} />
      <Container>
        <ScreenContent path="app/(app)/index.tsx" title="Home" />
        {user && (
          <Text className="text-slate-600 text-center mb-4">
            Signed in as {user.email}
          </Text>
        )}
        <Link href={{ pathname: "/details", params: { name: "Dan" } }} asChild>
          <Button title="Show Details" />
        </Link>
        <TouchableOpacity className="mt-4 py-3" onPress={signOut}>
          <Text className="text-red-500 text-center font-medium">Sign Out</Text>
        </TouchableOpacity>
      </Container>
    </View>
  );
}

const styles = {
  container: "flex flex-1 bg-white",
};
