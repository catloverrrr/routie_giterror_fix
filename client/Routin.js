import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
//import "react-native-gesture-handler";
//import { NavigationContainer } from "@react-navigation/native";
//import { createStackNavigator } from "@react-navigation/stack";
import megaphone from './assets/images/megaphone.png';
import logo from './assets/images/logo.png';
import list from './assets/images/program_list.png';
import clock from './assets/images/clock.png';
import dot from './assets/images/3dot.png';
import loading_icon from './assets/images/splash/Routie_splash_icon.png';
import { setCustomText } from 'react-native-global-props';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function Routin() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Pretendard_Thin: require('./assets/fonts/Pretendard-Thin.otf'),
        Pretendard_ExtraLight: require('./assets/fonts/Pretendard-ExtraLight.otf'),
        Pretendard_Light: require('./assets/fonts/Pretendard-Light.otf'),
        Pretendard_Regular: require('./assets/fonts/Pretendard-Regular.otf'),
        Pretendard_Medium: require('./assets/fonts/Pretendard-Medium.otf'),
        Pretendard_SemiBold: require('./assets/fonts/Pretendard-SemiBold.otf'),
        Pretendard_Bold: require('./assets/fonts/Pretendard-Bold.otf'),
        Pretendard_ExtraBold: require('./assets/fonts/Pretendard-ExtraBold.otf'),
        Pretendard_Black: require('./assets/fonts/Pretendard-Black.otf'),
      });
      setFontsLoaded(true);

      // 폰트 로드 이후 전역 스타일 설정
      const customTextProps = {
        style: {
          fontFamily: 'Pretendard_Regular',
        },
      };
      setCustomText(customTextProps);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FF622A' }}>
        <Image source={loading_icon} style={{width: 200, height: 200, resizeMode:"contain"}} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={[ 'top', 'bottom']} style={{ flex: 1, backgroundColor: '#F5F1E9'}}>
        <View style={{ flex: 1}}>
          <View style={{flex: 2, paddingHorizontal: 22, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <Image source={logo} style={{width:118, height: 30}} />
            <TouchableOpacity onPress={()=> {}}>
              <Image source={list} style={{ width: 28, height: 26.5}} />
            </TouchableOpacity>
          </View>
          <View style={{flex: 3, paddingHorizontal: 22}}>
            <TouchableOpacity style={styles.notice_banner} onPress={() => {}}>
              <Image source={megaphone} style={{ width: 24, height: 24, marginRight: 12}} />
              <Text style={{ color: "#61605E", fontSize: 14, width: "90%"}}>이번주 추천활동:</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 2, paddingHorizontal: 22, flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex:1, alignItems: 'center'}}>
              <TouchableOpacity onPress={()=> {}}>
                <Text style={styles.tab}>루틴</Text>
              </TouchableOpacity>
            </View>
            <View style={{flex:1, alignItems: 'center'}}>
              <TouchableOpacity onPress={()=> {}}>
                <Text style={styles.tab}>일정</Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 4}}></View>
          </View>
        </View>
        <View style={{ flex:3, backgroundColor: '#FFFFFF', paddingHorizontal: 22}}>
          <Image source={clock} style={{width: '100%', marginVertical: 24}} />
          <View style={[styles.box, {backgroundColor: '#FF622A',}]}>
            <Text style={{flex:4, fontSize: 18, fontFamily: 'Pretendard_Bold', color: '#FFFFFF'}}>루틴 이름</Text>
            <TouchableOpacity onPress={()=> {}} style={{width:40, height:40, justifyContent: 'center', alignItems: 'center'}}>
              <Image source={dot} style={{width: 25.5, height: 6}} />
            </TouchableOpacity>

          </View>
        </View>

        <StatusBar style="auto"/>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  notice_banner: {
    flex: 1,
    flexDirection: 'row',
    padding: 18,
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    fontFamily: 'Pretendard_Regular', // 추가
  },
  tab: {
    fontSize: 16,
    fontFamily: 'Pretendard_SemiBold'
  },
  box: {
    flexDirection: 'row',
    padding: 18,
    alignItems: 'center',
    marginVertical: 10,
    height: 80,
    borderRadius: 15,
    fontFamily: 'Pretendard_Bold', // 추가
  },
});
