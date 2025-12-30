import { makeRedirectUri } from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as Linking from "expo-linking";
import { Stack } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { supabase } from "@/utils/supabase";

const redirectTo = makeRedirectUri();

const createSessionFromUrl = async (url: string) => {
	const { params, errorCode } = QueryParams.getQueryParams(url);

	if (errorCode) throw new Error(errorCode);
	const { access_token, refresh_token } = params;

	if (!access_token) return null;

	const { data, error } = await supabase.auth.setSession({
		access_token,
		refresh_token,
	});
	if (error) throw error;
	return data.session;
};

export default function Login() {
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	// Handle deep link when app is opened from magic link
	const url = Linking.useURL();
	if (url) {
		createSessionFromUrl(url).catch(console.error);
	}

	const handleMagicLinkLogin = async () => {
		if (!email.trim()) {
			setError("Please enter your email");
			return;
		}

		setIsLoading(true);
		setError(null);

		try {
			const { error } = await supabase.auth.signInWithOtp({
				email: email.trim(),
				options: {
					emailRedirectTo: redirectTo,
				},
			});

			if (error) throw error;
			setSuccess(true);
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred");
		} finally {
			setIsLoading(false);
		}
	};

	if (success) {
		return (
			<View className="flex-1 bg-background">
				<Stack.Screen options={{ title: "Check Your Email" }} />
				<Container>
					<View className="flex-1 justify-center px-4">
						<Card className="w-full max-w-sm">
							<CardHeader>
								<CardTitle>Check your email</CardTitle>
								<CardDescription>
									We sent a magic link to{" "}
									<Text className="font-semibold">{email}</Text>
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Text className="text-sm text-muted-foreground">
									Click the link in your email to sign in. If you don't see it,
									check your spam folder.
								</Text>
							</CardContent>
							<CardFooter>
								<Button
									variant="outline"
									className="w-full"
									onPress={() => setSuccess(false)}
								>
									<Text>Use a different email</Text>
								</Button>
							</CardFooter>
						</Card>
					</View>
				</Container>
			</View>
		);
	}

	return (
		<View className="flex-1 bg-background">
			<Stack.Screen options={{ title: "Sign In" }} />
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				className="flex-1"
			>
				<Container>
					<View className="flex-1 justify-center px-4">
						<Card className="w-full max-w-sm">
							<CardHeader>
								<CardTitle>Welcome!</CardTitle>
								<CardDescription>
									Enter your email to sign in with a magic link
								</CardDescription>
							</CardHeader>
							<CardContent>
								<View className="w-full justify-center gap-4">
									<View className="gap-2">
										<Label>Email</Label>
										<Input
											placeholder="you@example.com"
											value={email}
											onChangeText={setEmail}
											keyboardType="email-address"
											autoCapitalize="none"
											autoCorrect={false}
											autoComplete="email"
										/>
									</View>
									{error && (
										<Text className="text-sm text-destructive">{error}</Text>
									)}
								</View>
							</CardContent>
							<CardFooter>
								<Button
									className="w-full"
									onPress={handleMagicLinkLogin}
									disabled={isLoading}
								>
									<Text>{isLoading ? "Sending..." : "Send magic link"}</Text>
								</Button>
							</CardFooter>
						</Card>
					</View>
				</Container>
			</KeyboardAvoidingView>
		</View>
	);
}
