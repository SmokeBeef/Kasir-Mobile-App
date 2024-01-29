import AsyncStorage from "@react-native-async-storage/async-storage";

export const setItem = async (
  key: string,
  value: object | Array<any> | string | number
) => {
  try {
    if (typeof value === "object" || Array.isArray(value)) {
      value = JSON.stringify(value);
    }
    if(typeof value === "number"){
      value = value.toString()
    }
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log(error);
  }
};

export const getItem = async (key: string) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data;
  } catch (error) {}
};
