import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

const NextButton = ({ getJoke, getMotivation }) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => {
        getJoke ? getJoke() : getMotivation();
      }}
    >
      <Text style={styles.buttonText}>></Text>
    </TouchableOpacity>
  );
};

export default NextButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 16,
    marginTop: 20,
    backgroundColor: "#F4C724",
    position: "absolute",
    bottom: 25,
    right: 25,
    shadowColor: "black",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
