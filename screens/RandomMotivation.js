import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Share,
} from "react-native";
import React, { useEffect, useState } from "react";
import NextButton from "../components/NextButton";
// import FastImage from "react-native-fast-image";
import { Image } from "expo-image";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";

const RandomMotivation = () => {
  const [motivation, setMotivation] = useState("");
  const [loading, setLoading] = useState(false);
  const [imgBlur, setImgBlur] = useState(false);

  const getMotivation = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://inspirobot.me/api?generate=true");
      const imageUrl = await res.text();
      setMotivation(imageUrl);
    } catch (error) {
      console.error("Error fetching motivation:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMotivation();
  }, []);

  // const onShare = async () => {
  //   try {
  //     // Request permission to read from the media library
  //     const { status } = await MediaLibrary.requestPermissionsAsync();

  //     if (status === "granted") {
  //       // Download the image to the app's cache directory
  //       const { uri } = await MediaLibrary.createAssetAsync(motivation);
  //       const cacheDirectory = `${FileSystem.cacheDirectory}motivation.jpg`;

  //       // Log the paths for debugging
  //       console.log("Original URI:", uri);
  //       console.log("Cache Directory:", cacheDirectory);

  //       await FileSystem.copyAsync({
  //         from: uri,
  //         to: cacheDirectory,
  //       });

  //       // Share the downloaded image from the cache
  //       const result = await Sharing.shareAsync(cacheDirectory);

  //       if (result.action === Sharing.sharedAction) {
  //         if (result.activityType) {
  //           alert("Shared via " + result.activityType);
  //         }
  //       } else if (result.action === Sharing.dismissedAction) {
  //         alert("Dismissed");
  //       }
  //     } else {
  //       alert("Permission to read from the media library not granted.");
  //     }
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: motivation,
        title: "It's time for motivation",
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
        <TouchableOpacity
          onPress={() => {
            setImgBlur(!imgBlur);
          }}
          onLongPress={() => onShare()}
        >
          <Image
            source={motivation}
            style={{
              width: 300,
              height: 300,
              borderRadius: 10,
            }}
            blurRadius={imgBlur ? 30 : 0}
            contentFit="cover"
            transition={1000}
            priority="high"
          />
        </TouchableOpacity>
      )}
      <NextButton getMotivation={getMotivation} />
    </View>
  );
};

export default RandomMotivation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
});
