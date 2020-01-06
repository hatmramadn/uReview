import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  ToastAndroid,
  Image
} from "react-native";
import { AirbnbRating } from "react-native-ratings";
import colors from "../constants/colors";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import ImagePicker from "react-native-image-picker";

const AddReviewScreen = props => {
  const [rating, setRating] = useState(null);
  const [photo, setPhoto] = useState(null);
  const selectImage = () => {
    const options = {
      title: "Select Photo for the Review",
      storageOptions: {
        skipBackup: true,
        path: "images"
      }
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        return;
      } else if (response.error) {
        ToastAndroid.showWithGravity(
          "Something went wrong",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM
        );
      } else {
        const source = { uri: response.uri };
        setPhoto(source);
        console.log(source);
      }
    });
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Add new review</Text>
        <View style={styles.formField}>
          <Text style={styles.title}>Review Title</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Title here"
            placeholderTextColor={colors.blueGrey}
          />
        </View>
        <View style={styles.formField}>
          <Text style={styles.title}>What's your rating</Text>
          <View style={{ marginLeft: 15, marginTop: 5 }}>
            <AirbnbRating
              defaultRating={0}
              showRating={false}
              size={24}
              onFinishRating={value => setRating(value)}
            />
          </View>
        </View>
        <View style={styles.formField}>
          <Text style={styles.title}>Review Title</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Enter Title here"
            placeholderTextColor={colors.blueGrey}
          />
        </View>
        <TouchableOpacity style={styles.selectButton} onPress={selectImage}>
          {photo ? (
            <View
              style={{
                alignItems: "flex-start",
                flex: 1,
                width: "100%",
                overflow: "hidden"
              }}
            >
              <Image
                style={{
                  width: 60,
                  height: 50,
                  resizeMode: "center",
                  borderRadius: 10
                }}
                source={photo}
              />
            </View>
          ) : (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Icon name="md-photos" color={colors.blueGrey} size={24} />
              <Text
                style={{
                  color: colors.blueGrey,
                  fontSize: 16
                }}
              >
                Press to choose photo
              </Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButton}>
          <Text
            style={{
              color: colors.white,
              fontSize: 16,
              fontWeight: "600"
            }}
          >
            Add Review
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.greyLight,
    justifyContent: "flex-start"
  },
  formField: {
    justifyContent: "flex-start",
    marginBottom: 20
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 5,
    marginLeft: 20
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
    margin: 20
  },
  input: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
    marginHorizontal: 20,
    borderBottomColor: colors.blueGrey,
    borderBottomWidth: 1
  },
  textArea: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
    marginHorizontal: 20,
    borderColor: colors.blueGrey,
    borderWidth: 1,
    paddingBottom: 80,
    paddingLeft: 10,
    backgroundColor: "#f0f3fa",
    borderRadius: 10
  },
  selectButton: {
    backgroundColor: "#f0f3fa",
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.blueGrey,
    borderWidth: 1,
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20
  },
  addButton: {
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20
  }
});

export default AddReviewScreen;
