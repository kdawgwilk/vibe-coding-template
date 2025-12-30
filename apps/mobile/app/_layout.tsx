import "../global.css";

import { ThemeProvider } from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import {
	ActivityIndicator,
	StatusBar,
	useColorScheme,
	View,
} from "react-native";
import { NAV_THEME } from "@/lib/theme";
import { AuthProvider, useAuth } from "@/utils/auth";

function RootLayoutNav() {
	const { user, isLoading } = useAuth();
	const segments = useSegments();
	const router = useRouter();

	useEffect(() => {
		if (isLoading) return;

		const inAuthGroup = segments[0] === "(auth)";

		if (!user && !inAuthGroup) {
			// Redirect to login if not authenticated
			router.replace("/(auth)/login");
		} else if (user && inAuthGroup) {
			// Redirect to home if authenticated and on auth screen
			router.replace("/(app)");
		}
	}, [user, isLoading, segments]);

	if (isLoading) {
		return (
			<View className="flex-1 items-center justify-center bg-white">
				<ActivityIndicator size="large" color="#6366f1" />
			</View>
		);
	}

	return <Slot />;
}

export default function RootLayout() {
	const colorScheme = useColorScheme() as "light" | "dark";
	return (
		<ThemeProvider value={NAV_THEME[colorScheme]}>
			<StatusBar
				barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
			/>
			<AuthProvider>
				<RootLayoutNav />
				<PortalHost />
			</AuthProvider>
		</ThemeProvider>
	);
}
