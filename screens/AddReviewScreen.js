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
  Alert
} from "react-native";
import { AirbnbRating } from "react-native-ratings";
import colors from "../constants/colors";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Ionicons";
import ImagePicker from "react-native-image-picker";
import { useForm, Controller } from "react-hook-form";

const AddReviewScreen = props => {
  const [formerrors, setFormErrors] = useState({});
  const [progress, setprogress] = useState(0);
  const [rating, setRating] = useState(null);
  const [photo, setPhoto] = useState(null);
  const { control, handleSubmit, errors } = useForm();

  const onSubmit = data => {
    if (photo === null) {
      setFormErrors({ ...formerrors, photo: "Review Photo is required" });
      return;
    }
    if (rating === null) {
      setFormErrors({
        ...formerrors,
        rating: "Review photo is Required"
      });
      return;
    }

    const formData = {
      reviewTitle: data.reviewTitle,
      reviewDescription: data.reviewDescription,
      rating: rating,
      photo: photo
    };
    console.log(formData);
  };
  const onChange = args => {
    return {
      value: args[0].nativeEvent.text
    };
  };

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
        setFormErrors({
          ...formerrors,
          photo: null
        });
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
                marginTop: 5
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
              marginLeft: 20
            }}
          >
            <AirbnbRating
              defaultRating={0}
              showRating={false}
              size={24}
              onFinishRating={value => {
                setRating(value);
                setFormErrors({ ...formerrors, rating: null });
              }}
            />
            {formerrors.rating && (
              <Text
                style={{
                  fontSize: 17,
                  color: "#ff443b",
                  marginTop: 5
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
                marginTop: 5
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
        {formerrors.photo && (
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 10
            }}
          >
            <Text
              style={{
                fontSize: 17,
                color: "#ff443b"
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
