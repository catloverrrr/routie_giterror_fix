import * as Font from 'expo-font';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import egg from './assets/images/egg.png';
import loading_icon from './assets/images/splash/Routie_splash_icon.png';
import { setCustomText } from 'react-native-global-props';

export default function LogIn() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const navigation = useNavigation();
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');

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

  const handleLogin = async () => {
    if (!userid || !password) {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }
  
    try {
      const response = await fetch('http://<YOUR_BACKEND_URL>/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userid,
          password: password,
        }),
      });
  
      const data = await response.json();
  
      if (response.status === 200) {
        alert("로그인 성공!");
        navigation.navigate('Routin'); // 로그인 성공 후 이동
      } else {
        alert(data.error || "로그인 실패: 아이디 또는 비밀번호를 확인해주세요.");
      }
    } catch (error) {
      console.error(error);
      alert("서버에 연결할 수 없습니다.");
    }
  };
  

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FF622A' }}>
        <Image source={loading_icon} style={{width: 200, height: 200, resizeMode:"contain"}} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={[ 'top', 'bottom']} style={{ flex: 1, backgroundColor: '#FF622A'}}>
        <View style={{ flex: 3, paddingVertical: 36, paddingHorizontal: 20}}>
          <Text style={styles.text_title}>
            내 루틴과 학교일정{"\n"}
            루티에서 원클릭으로! 
          </Text>
          <Text style={styles.text_sub}>
            루틴을 이루고{"\n"}
            캐릭터를 성장시키세요
          </Text>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ flex: 1}}></View>
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
              <Image source={egg} style={{ width: 170, height: 197, alignItems: 'flex-end' }} />
            </View>
          </View>
        </View>
        <View style={styles.logincontainer}>
          <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid={true}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.login_label}>
              <TextInput
                value={userid}
                onChangeText={setUserid}
                autoCapitalize="none"
                style={styles.input}
                placeholder="아이디"
                placeholderTextColor="#B8B8B8"
              />
            </View>
            <View style={styles.login_label}>
              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                style={styles.input}
                placeholder="비밀번호"
                placeholderTextColor="#B8B8B8"
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={{ color: "#FFFFFF", fontSize: 16 }}>로그인</Text>
            </TouchableOpacity>
            <View style={{flex: 1, flexDirection: 'row', justifyContent:'center'}}>
              <TouchableOpacity onPress={() => {}}>
                <Text style={styles.login_etc}>아이디 찾기</Text>
              </TouchableOpacity>
              <Text style={styles.login_etc}>  l  </Text>
              <TouchableOpacity onPress={() => {}}>
                <Text style={styles.login_etc}>비밀번호 찾기</Text>
              </TouchableOpacity>
              <Text style={styles.login_etc}>  l  </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
                <Text style={styles.login_etc}>회원가입</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
//안드로이드에서 키보드 입력시에 비율이 이상해지는 문제
//아이폰에선 키보드가 올라오고 다시 안내려가는 문제&입력 폼 안보임
const styles = StyleSheet.create({
  text_title: {
    fontSize: 28,
    color: '#FFFFFF',
    marginTop: 40,
    marginBottom: 15,
    lineHeight: 34,
    fontFamily: 'Pretendard_Bold',
  },
  text_sub: {
    fontSize: 16,
    color: '#FFFFFF',
    lineHeight: 20,
    fontFamily: 'Pretendard_Medium'
  },
  logincontainer: {
    flex: 2,
    paddingHorizontal: 20,
    paddingTop: 36,
    paddingBottom: 20,
    borderTopLeftRadius: 19,
    borderTopRightRadius: 19,
    backgroundColor: '#FFFFFF'
  },
  login_label: {
    flex: 1,
    backgroundColor: '#F5F1E9',
    marginBottom: 10,
    borderRadius: 10
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Pretendard_Medium', // 추가
    paddingHorizontal: 10
  },
  button: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#FF622A',
    borderRadius: 10,

    fontFamily: 'Pretendard_Medium', // 추가
  },
  login_etc: {
    color: "#B8B8B8", 
    fontSize: 14, 
    textAlign: 'center', 
    fontFamily: 'Pretendard_Medium'
  },

});
