import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  ToastAndroid,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { AirbnbRating } from "react-native-ratings";
import colors from "../constants/colors";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import ImagePicker from "react-native-image-picker";
import { useForm, Controller } from "react-hook-form";
import storage from "@react-native-firebase/storage";
import firestore from "@react-native-firebase/firestore";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { PERMISSIONS, requestMultiple } from "react-native-permissions";

const AddReviewScreen = (props) => {
  const user = useSelector((state) => state.user.user);

  const [formerrors, setFormErrors] = useState({});
  const [uploading, setUploading] = useState(false);
  const [rating, setRating] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [transfered, setTransferred] = useState(0);
  const { control, handleSubmit, errors } = useForm();

  const uploadImage = async () => {
    if (photo === null) {
      setFormErrors({ ...formerrors, photo: "Review Photo is required" });
      return;
    }
    if (rating === null) {
      setFormErrors({
        ...formerrors,
        rating: "Review photo is Required",
      });
      return;
    }
    const { uri } = photo;
    const filename = uri.substring(uri.lastIndexOf("/") + 1);
    const uploadUri = Platform.OS === "ios" ? uri.replace("file://", "") : uri;
    setUploading(true);
    setTransferred(0);
    const task = storage()
      .ref(filename)
      .putFile(uploadUri);
    task.on("state_changed", (snapshot) => {
      setTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
      );
    });
    try {
      await task;
    } catch (e) {
      console.error(e);
    }
    setUploading(false);
    const photoUrl = await storage()
      .ref(filename)
      .getDownloadURL();
    setUploadedPhoto(photoUrl);
    console.log("Your photo has been uploaded", photoUrl);
    return photoUrl;
  };

  const onSubmit = async (data) => {
    if (photo === null) {
      setFormErrors({ ...formerrors, photo: "Review Photo is required" });
      return;
    }
    if (rating === null) {
      setFormErrors({
        ...formerrors,
        rating: "Review photo is Required",
      });
      return;
    }
    const photoUrl = await uploadImage();
    if (photoUrl !== null) {
      const formData = {
        id: (Math.random() / 0.2) * 12220.0,
        user: user,
        userId: user.id,
        reviewTitle: data.reviewTitle,
        reviewDescription: data.reviewDescription,
        rating: rating,
        photo: photoUrl,
        timeStamp: new Date().toISOString(),
      };
      firestore()
        .collection("Reviews")
        .add(formData)
        .then(() => {
          props.navigation.navigate("Home");
        })
        .catch((error) => console.log(error));
    } else {
      throw new Error("Please Choose image");
    }
  };

  const onChange = (args) => {
    return {
      value: args[0].nativeEvent.text,
    };
  };

  const selectImage = () => {
    requestMultiple([
      PERMISSIONS.ANDROID.CAMERA,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    ])
      .then((statuses) => {
        console.log("Camera", statuses[PERMISSIONS.ANDROID.CAMERA]);
        console.log(
          "Storage",
          statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE]
        );
      })
      .then((res) => {
        console.log(res);
        const options = {
          title: "Select Photo for the Review",
          storageOptions: {
            skipBackup: true,
            path: "images",
          },
        };
        ImagePicker.showImagePicker(options, (response) => {
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
            setFormErrors({
              ...formerrors,
              photo: null,
            });
            console.log(source);
          }
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
      <ScrollView showsVerticalScrollIndicator={false}>
        {uploading ? (
          <View
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundColor: "black",
              zIndex: 1,
              opacity: 0.8,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color={colors.primary} />
            <Text
              style={{
                color: colors.blueGrey,
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              Publishing your review...
            </Text>
          </View>
        ) : null}
        <Text style={styles.heading}>Add new review</Text>
        <View style={styles.formField}>
          <Text style={styles.title}>Review Title</Text>
          <Controller
            as={
              <TextInput
                style={styles.input}
                placeholder="Enter Title here"
                placeholderTextColor={colors.blueGrey}
              />
            }
            control={control}
            name="reviewTitle"
            onChange={onChange}
            rules={{ required: true }}
          />
          {errors.reviewTitle && (
            <Text
              style={{
                fontSize: 17,
                color: "#ff443b",
                marginLeft: 20,
                marginTop: 5,
              }}
            >
              THIS IS REQUIRED
            </Text>
          )}
        </View>
        <View style={styles.formField}>
          <Text style={styles.title}>What's your rating</Text>
          <View
            style={{
              width: "100%",
              alignItems: "flex-start",
              justifyContent: "center",
              marginLeft: 20,
            }}
          >
            <AirbnbRating
              defaultRating={0}
              showRating={false}
              size={24}
              onFinishRating={(value) => {
                setRating(value);
                setFormErrors({ ...formerrors, rating: null });
              }}
            />
            {formerrors.rating && (
              <Text
                style={{
                  fontSize: 17,
                  color: "#ff443b",
                  marginTop: 5,
                }}
              >
                THIS IS REQUIRED
              </Text>
            )}
          </View>
        </View>
        <View style={styles.formField}>
          <Text style={styles.title}>Your comment</Text>
          <Controller
            as={
              <TextInput
                multiline={true}
                style={styles.textArea}
                placeholder="Enter your comment"
                placeholderTextColor={colors.blueGrey}
              />
            }
            control={control}
            name="reviewDescription"
            onChange={onChange}
            rules={{ required: true }}
          />
          {errors.reviewDescription && (
            <Text
              style={{
                fontSize: 17,
                color: "#ff443b",
                marginLeft: 20,
                marginTop: 5,
              }}
            >
              THIS IS REQUIRED
            </Text>
          )}
        </View>
        <TouchableOpacity style={styles.selectButton} onPress={selectImage}>
          {photo ? (
            <View
              style={{
                alignItems: "flex-start",
                flex: 1,
                width: "100%",
                overflow: "hidden",
              }}
            >
              <Image
                style={{
                  width: 60,
                  height: 50,
                  resizeMode: "center",
                  borderRadius: 10,
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
                  fontSize: 16,
                }}
              >
                Press to choose photo
              </Text>
            </View>
          )}
        </TouchableOpacity>
        {formerrors.photo && (
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                fontSize: 17,
                color: "#ff443b",
              }}
            >
              THIS IS REQUIRED
            </Text>
          </View>
        )}
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleSubmit(onSubmit)}
        >
          <Text
            style={{
              color: colors.white,
              fontSize: 16,
              fontWeight: "600",
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
    justifyContent: "flex-start",
  },
  formField: {
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 5,
    marginLeft: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
    margin: 20,
  },
  input: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
    marginHorizontal: 20,
    borderBottomColor: colors.blueGrey,
    borderBottomWidth: 1,
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
    borderRadius: 10,
    padding: 10,
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
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
});

export default AddReviewScreen;
