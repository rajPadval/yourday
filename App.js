import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import RandomJoke from "./screens/RandomJoke";
import RandomMotivation from "./screens/RandomMotivation";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export default function App() {
  const [fontsLoaded] = useFonts({
    FiraSansCondensed: require("./assets/fonts/FiraSansCondensed-Regular.ttf"),
  });
  const Tab = createBottomTabNavigator();

  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarLabelPosition: "beside-icon",
            tabBarLabelStyle: {
              fontWeight: "700",
              fontSize: 15,
            },
            tabBarActiveTintColor: "#F4C724",
            tabBarIconStyle: { display: "none" },
            headerTitleAlign: "center",
            tabBarStyle: {
              backgroundColor: "black",
              borderTopColor: "black",
              borderTopWidth: 1,
            },
            headerStyle: {
              backgroundColor: "black",
            },
            headerShown: false,
            tabBarTransitionPreset: "fade",
            tabBarTranslucent: true,
            cardStyleInterpolator: ({ current, next, layouts }) => {
              return {
                cardStyle: {
                  opacity: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 1],
                  }),
                },
              };
            },
          }}
        >
          <Tab.Screen
            name="Joke"
            component={RandomJoke}
            listeners={{
              tabLongPress: (e) => {
                alert("You pressed the joke tab!");
              },
            }}
          />
          <Tab.Screen
            name="Motivation"
            component={RandomMotivation}
            listeners={{
              tabLongPress: (e) => {
                alert("You pressed the joke tab!");
              },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 24,
    fontFamily: "FiraSansCondensed",
    textAlign: "center",
  },
});
