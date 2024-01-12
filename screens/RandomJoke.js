import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Share,
} from "react-native";
import NextButton from "../components/NextButton";

const RandomJoke = () => {
  const [joke, setJoke] = useState("");
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true);
    const res = await fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json",
      },
    });
    const data = await res.json();
    setJoke(data.joke);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: joke,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          alert("Shared via " + result.activityType);
        }
      } else if (result.action === Share.dismissedAction) {
        alert("Dismissed");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#F4C724" />
      ) : (
        <TouchableOpacity onPress={onShare}>
          <Text style={styles.text}>{joke}</Text>
        </TouchableOpacity>
      )}
      <NextButton getJoke={getData} />
      <StatusBar style="auto" />
    </View>
  );
};

export default RandomJoke;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  text: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    color: "black",
  },
});
