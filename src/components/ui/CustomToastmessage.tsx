// src/components/CustomToast.tsx
import React from "react"
import { StyleSheet } from "react-native"
import Toast, {
  BaseToast,
  ErrorToast,
  ToastConfig,
  BaseToastProps
} from "react-native-toast-message"
import { fonts } from "../../assets/localImage"
import { scale } from "../scale"
import { View, Text } from 'react-native';
interface CustomToastProps extends BaseToastProps {
  text1?: string;
  text2?: string;
}
const toastConfig: ToastConfig = {
  // success: (props) => (
  //   <BaseToast
  //     {...props}
  //     style={[styles.base, styles.successBackground]}
  //     contentContainerStyle={styles.content}
  //     text1Style={[styles.text, styles.whiteText]}
  //     text2Style={[styles.subText, styles.whiteText]}
  //     text2NumberOfLines={0} // Allow multi-line message
  //   />
  // ),
 
     
  success: ({ text1, text2 }: CustomToastProps) => (
    <View style={[styles.base, styles.successBackground, styles.content]}>
      <Text style={[styles.text, styles.whiteText]}>
          {text1}
        </Text>
    
      {text2 && <Text style={{ color: 'white' }}>{text2}</Text>}
    </View>
  ),
    error: ({ text1, text2 }: CustomToastProps) => (
    <View style={[styles.base, styles.errorBackground, styles.content]}>
      <Text style={[styles.text, styles.whiteText]}>
          {text1}
        </Text>
    
      {text2 && <Text style={{ color: 'white' }}>{text2}</Text>}
    </View>
  ),
  // error: (props) => (
  //   <ErrorToast
  //     {...props}
  //     style={[styles.base, styles.errorBackground]}
  //     contentContainerStyle={styles.content}
  //     text1Style={[styles.text, styles.whiteText]}
  //     text2Style={[styles.subText, styles.whiteText]}
  //     text2NumberOfLines={5}
  //   />
  // ),
  // info: (props) => (
  //   <BaseToast
  //     {...props}
  //     style={[styles.base, styles.infoBackground]}
  //     contentContainerStyle={styles.content}
  //     text1Style={[styles.text, styles.whiteText]}
  //     text2Style={[styles.subText, styles.whiteText]}
  //     text2NumberOfLines={5}
  //   />
  // ),


    info: ({ text1, text2 }: CustomToastProps) => (
    <View style={[styles.base, styles.infoBackground, styles.content]}>
      <Text style={[styles.text, styles.whiteText]}>
          {text1}
        </Text>
    
      {text2 && <Text style={{ color: 'white' }}>{text2}</Text>}
    </View>
  ),
}

export const CustomToast = () => {
  return <Toast config={toastConfig} topOffset={50} />
}

const styles = StyleSheet.create({
  base: {
    borderLeftWidth: 0,
    borderRadius: 8,
    paddingVertical: 12,
    minHeight: undefined,
    minWidth: '90%',
    alignSelf: "center",
  },
  content: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    margin:10
  },
  successBackground: {
    backgroundColor: "#4CAF50",
  },
  errorBackground: {
    backgroundColor: "#F44336",
  },
  infoBackground: {
    backgroundColor: "#2196F3",
  },
  text: {
    fontSize: scale(12),
    fontWeight: "600",
    fontFamily: fonts.REGULAR,
    lineHeight: 22,
  },
  subText: {
    fontSize: scale(10),
    fontFamily: fonts.REGULAR,
    lineHeight: 20,
    marginTop: scale(5),
    fontWeight: "400",

  },
  whiteText: {
    color: "#FFFFFF",
  },
})
