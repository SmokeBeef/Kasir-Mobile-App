import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import MainRoute from "./src/router/MainRoute";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect } from "react";
import 'react-native-gesture-handler';

export default function App() {
  const landscape = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    );
  };

  useEffect(() => {
    landscape();
  }, []);
  return (
    <GluestackUIProvider config={config} >
      <MainRoute />
    </GluestackUIProvider>
  );
}
