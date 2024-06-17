import { Stack } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  Camera,
  PhotoFile,
  TakePhotoOptions,
  VideoFile,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
  useMicrophonePermission,
} from "react-native-vision-camera";
import { Video } from "expo-av";

const CameraScreen = () => {
  const device = useCameraDevice("back");
  const { hasPermission, requestPermission } = useCameraPermission();
  const {
    hasPermission: microphonePermission,
    requestPermission: requestMicrophonePermission,
  } = useMicrophonePermission();

  const camera = useRef<Camera>(null);
  const [photo, setPhoto] = useState<PhotoFile>();
  const [video, setVideo] = useState<VideoFile>();
  const [flash, setFlash] = useState<TakePhotoOptions["flash"]>("off");
  const [isRecording, setIsRecording] = useState(false);
  const [modes, setModes] = useState<"camera" | "qr">("camera");

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }

    if (!microphonePermission) {
      requestMicrophonePermission();
    }
  }, [hasPermission, microphonePermission]);

  const uploadPhoto = async () => {
    if (!photo) return;

    const result = await fetch(`file://${photo.path}`);
    const data = await result.blob();
    const url = URL.createObjectURL(data);

    console.log(url);
    // do something with url here
  };

  const onTakePicturePressed = async () => {
    if (isRecording) {
      camera.current?.stopRecording();
      setIsRecording(false);
      return;
    }

    // if not then run this
    const photo = await camera.current?.takePhoto({
      flash,
    });
    setPhoto(photo);
  };

  const onRecordVideoPressed = async () => {
    camera.current?.startRecording({
      flash: flash === "on" ? "on" : "off",
      onRecordingFinished: (video) => {
        console.log(video);
        setIsRecording(false);
        setVideo(video);
      },
      onRecordingError: (error) => {
        console.error(error);
        setIsRecording(false);
      },
    });
  };

  const codeScanner = useCodeScanner({
    codeTypes: ["qr", "ean-13"],
    onCodeScanned: (codes) => {
      console.log(`Scanned ${codes.length} codes!`);
      console.log(codes[0]);
      // do something swith codes here
    },
  });

  if (!hasPermission || !microphonePermission) return <ActivityIndicator />;
  if (!device) return <Text>Camera device not found</Text>;

  return (
    <View>
      <Stack.Screen options={{ headerShown: false }} />

      {video && (
        <>
          <Video
            style={StyleSheet.absoluteFill}
            source={{
              uri: video.path,
            }}
            useNativeControls
            isLooping
          />

          <Pressable
            onPress={() => setVideo(undefined)}
            style={{ position: "absolute", top: 50, left: 30 }}
          >
            <Text>CLose!</Text>
          </Pressable>
        </>
      )}

      {photo && (
        <>
          <Image source={{ uri: photo.path }} style={{ flex: 1 }} />
          <Pressable
            onPress={() => setPhoto(undefined)}
            style={{ position: "absolute", top: 50, left: 30 }}
          >
            <Text>CLose!</Text>
          </Pressable>
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              paddingBottom: 50,
              backgroundColor: "rgba(0, 0, 0, 0.40)",
            }}
          >
            <Button title="Upload" onPress={uploadPhoto} />
          </View>
        </>
      )}

      {!photo && !video && (
        <>
          {modes === "qr" ? (
            <Camera
              ref={camera}
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={true}
              codeScanner={codeScanner}
            />
          ) : (
            <Camera
              ref={camera}
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={true && !photo && !video}
              photo
              video
              audio
            />
          )}

          <Pressable
            onPress={onTakePicturePressed}
            onLongPress={onRecordVideoPressed}
            style={{
              position: "absolute",
              alignSelf: "center",
              bottom: 50,
              width: 75,
              height: 75,
              borderRadius: 75,
              backgroundColor: isRecording ? "red" : "white",
            }}
          />

          <Pressable
            onPress={() => setFlash(flash === "off" ? "on" : "off")}
            style={{ position: "absolute", top: 50, left: 30 }}
          >
            <Text>{flash === "off" ? "FLASH ON" : "FLASH OFF"}</Text>
          </Pressable>

          <Pressable
            onPress={() => setModes(modes === "camera" ? "qr" : "camera")}
            style={{ position: "absolute", top: 100, right: 30 }}
          >
            <Text>{modes === "camera" ? "QR CODE" : "CAMERA"}</Text>
          </Pressable>
        </>
      )}
    </View>
  );
};

export default CameraScreen;
