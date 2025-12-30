import { makeRedirectUri } from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as Linking from "expo-linking";
import { Stack } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Container } from "@/components/Container";
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
      <View className="flex-1 bg-white">
        <Stack.Screen options={{ title: "Check Your Email" }} />
        <Container>
          <View className="flex-1 justify-center px-4">
            <View className="bg-slate-50 rounded-2xl p-6">
              <Text className="text-2xl font-bold text-slate-900 mb-2">
                Check your email
              </Text>
              <Text className="text-slate-600 mb-4">
                We sent a magic link to{" "}
                <Text className="font-semibold">{email}</Text>
              </Text>
              <Text className="text-sm text-slate-500 mb-6">
                Click the link in your email to sign in. If you don't see it,
                check your spam folder.
              </Text>
              <TouchableOpacity onPress={() => setSuccess(false)}>
                <Text className="text-indigo-600 font-medium">
                  Use a different email
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Container>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <Stack.Screen options={{ title: "Sign In" }} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <Container>
          <View className="flex-1 justify-center px-4">
            <View className="bg-slate-50 rounded-2xl p-6">
              <Text className="text-2xl font-bold text-slate-900 mb-2">
                Welcome!
              </Text>
              <Text className="text-slate-600 mb-6">
                Enter your email to sign in with a magic link
              </Text>

              <Text className="text-sm font-medium text-slate-700 mb-2">
                Email
              </Text>
              <TextInput
                className="bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-900 mb-4"
                placeholder="you@example.com"
                placeholderTextColor="#94a3b8"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
              />

              {error && (
                <Text className="text-red-500 text-sm mb-4">{error}</Text>
              )}

              <TouchableOpacity
                className={`rounded-lg py-4 ${
                  isLoading ? "bg-indigo-300" : "bg-indigo-500"
                }`}
                onPress={handleMagicLinkLogin}
                disabled={isLoading}
              >
                <Text className="text-white text-center font-semibold text-lg">
                  {isLoading ? "Sending..." : "Send magic link"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Container>
      </KeyboardAvoidingView>
    </View>
  );
}
