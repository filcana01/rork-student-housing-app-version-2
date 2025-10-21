import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppProvider, ListingsProvider } from "@/contexts/AppContext";
import { trpc, trpcClient } from "@/lib/trpc";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerBackTitle: "Indietro" }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="listing/[id]" 
        options={{ 
          title: "Dettagli",
          headerStyle: { backgroundColor: '#fff' },
          headerShadowVisible: false,
        }} 
      />
      <Stack.Screen 
        name="auth/login" 
        options={{ 
          presentation: "modal",
          title: "Accedi",
        }} 
      />
      <Stack.Screen 
        name="auth/register" 
        options={{ 
          presentation: "modal",
          title: "Registrati",
        }} 
      />
    </Stack>
  );
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <ListingsProvider>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <RootLayoutNav />
            </GestureHandlerRootView>
          </ListingsProvider>
        </AppProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
