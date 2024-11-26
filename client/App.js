import { StatusBar } from 'expo-status-bar';
import * as Font from 'expo-font';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import egg from './assets/images/egg.png';
import loading_icon from './assets/images/splash/Routie_splash_icon.png';
import { setCustomText } from 'react-native-global-props';

export default function App() {
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
          fontFamily: 'Pretendard',
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
    <View style={{ flex: 1, backgroundColor: '#FF622A' }}>
      <View style={{ flex: 1.8, padding: 22 }}>
        <Text style={styles.text1}>
          내 루틴과 학교일정{"\n"}
          루티에서 원클릭으로!
        </Text>
        <Text style={styles.text2}>
          루틴을 이루고{"\n"}
          캐릭터를 성장시키세요
        </Text>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1 }}></View>
          <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
            <Image source={egg} style={{ width: 170, height: 197, alignItems: 'flex-end' }} />
          </View>
        </View>
      </View>

      <View style={styles.login_container}>
        <View style={styles.login_label}>
          <TextInput
            style={styles.input}
            placeholder="아이디"
            placeholderTextColor="#B8B8B8"
          />
        </View>
        <View style={styles.login_label}>
          <TextInput
            style={styles.input}
            placeholder="비밀번호"
            placeholderTextColor="#B8B8B8"
          />
        </View>
        <TouchableOpacity style={styles.login_button} onPress={() => {}}>
          <Text style={{ color: "#FFFFFF", fontSize: 16 }}>로그인</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', justifyContent:'center'}}>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.login_etc}>아이디 찾기</Text>
          </TouchableOpacity>
          <Text style={styles.login_etc}>  l  </Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.login_etc}>비밀번호 찾기</Text>
          </TouchableOpacity>
          <Text style={styles.login_etc}>  l  </Text>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.login_etc}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
  text1: {
    fontSize: 28,
    color: '#FFFFFF',
    marginTop: 84,
    marginBottom: 15,
    lineHeight: 34,
    fontFamily: 'Pretendard_Bold', // 추가
  },
  text2: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 20,
    fontFamily: 'Pretendard_Medium', // 추가
  },
  login_container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 19,
    borderTopLeftRadius: 19,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 50,
  },
  login_label: {
    flex: 1,
    backgroundColor: '#F5F1E9',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Pretendard_Medium', // 추가
  },
  login_button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#FF622A',
    fontFamily: 'Pretendard_Medium', // 추가
  },
  login_etc: {
    color: "#B8B8B8", 
    fontSize: 14, 
    textAlign: 'center', 
    fontFamily: 'Pretendard_Medium'  },
});
