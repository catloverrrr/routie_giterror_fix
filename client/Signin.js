import * as Font from 'expo-font';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { setCustomText } from 'react-native-global-props';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import left from './assets/images/left.png';

export default function SignIn() {
  const navigation = useNavigation();
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [password_re, setPassword_re] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const handleSignUp = async () => {
    if (!username || !userid || !password || !password_re || !email || !phoneNumber || !birthDate) {
      alert("모든 필드를 입력해주세요.");
      return;
    }
  
    if (password !== password_re) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
  
    try {
      const response = await fetch('http://<YOUR_BACKEND_URL>/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          userid,
          password,
          email,
          phone_number: phoneNumber,
          birth_date: birthDate,
        }),
      });
  
      const data = await response.json();
  
      if (response.status === 201) {
        alert("회원가입 성공!");
        navigation.navigate('Login'); // 회원가입 후 로그인 페이지로 이동
      } else {
        alert(data.error || "회원가입에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("서버에 연결할 수 없습니다.");
    }
  };
  
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

  return (
    <SafeAreaProvider>
        <SafeAreaView edges={[ 'top', 'bottom']} style={{ flex: 1, backgroundColor: '#F5F1E9', paddingHorizontal: 20, paddingBottom: 20}}>
            <KeyboardAwareScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                enableOnAndroid={true}
                showsVerticalScrollIndicator={false}
                stickyHeaderIndices={[0]}
            >
                <View>
                    <View style={{paddingVertical: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F5F1E9'}}>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Image source={left} style={{width: 24, height: 24}}/>
                        </TouchableOpacity>
                        <Text style={styles.text_header}>회원가입</Text>
                        <View style={{width: 24, height: 24}}></View>
                    </View>
                </View>
                <Text style={styles.text_title}>
                    기본 정보를{"\n"}
                    입력해주세요
                </Text>
                <View style={styles.inputBox}>
                    <Text style={styles.text}>이름</Text>
                    <TextInput
                        value={username}
                        onChangeText={setUsername}
                        style={styles.text_input}
                        placeholder='홍길동'
                        placeholderTextColor='#B8B8B8'/>
                </View>
                <View style={styles.inputBox}>
                    <Text style={styles.text}>아이디</Text>
                    <TextInput
                        value={userid}
                        onChangeText={setUserid}
                        autoCapitalize="none"
                        style={styles.text_input}
                        placeholder='아이디'
                        placeholderTextColor='#B8B8B8'/>
                </View>
                <View style={styles.inputBox}>
                    <Text style={styles.text}>비밀번호</Text>
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        autoCapitalize="none"
                        style={styles.text_input}
                        placeholder='비밀번호'
                        placeholderTextColor='#B8B8B8'/>
                </View>
                <View style={styles.inputBox}>
                    <Text style={styles.text}>비밀번호 확인</Text>
                    <TextInput
                        value={password_re}
                        onChangeText={setPassword_re}
                        secureTextEntry
                        autoCapitalize="none"
                        style={styles.text_input}
                        placeholder='비밀번호 확인'
                        placeholderTextColor='#B8B8B8'/>
                </View>
                <View style={styles.inputBox}>
                    <Text style={styles.text}>이메일</Text>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={styles.text_input}
                        placeholder='abc1234@routie.com'
                        placeholderTextColor='#B8B8B8'/>
                </View>
                <View style={styles.inputBox}>
                    <Text style={styles.text}>전화번호</Text>
                    <TextInput
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        keyboardType="phone-pad"
                        style={styles.text_input}
                        placeholder='01012345678'
                        placeholderTextColor='#B8B8B8'/>
                </View>
                <View style={styles.inputBox}>
                    <Text style={styles.text}>생년월일</Text>
                    <TextInput
                        value={birthDate}
                        onChangeText={setBirthDate}
                        keyboardType="phone-pad"
                        style={styles.text_input}
                        placeholder='20000101'
                        placeholderTextColor='#B8B8B8'/>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                    <Text style={{color: "#FFFFFF", fontSize: 16 }}>회원가입</Text>
                </TouchableOpacity>
                
            </KeyboardAwareScrollView>
        </SafeAreaView>
    </SafeAreaProvider>
  );
}
//안드로이드에서 키보드 입력시에 비율이 이상해지는 문제
//아이폰에선 키보드가 올라오고 다시 안내려가는 문제&입력 폼 안보임
const styles = StyleSheet.create({
    text_header: {
        fontSize: 16,
        color: '#2B2927',
        fontFamily: 'Pretendard_Bold',
    },
    text_title: {
        marginVertical: 28,
        //marginTop: 28,
        //marginBottom: 43,
        fontSize: 24,
        color: '#2B2927',
        fontFamily: 'Pretendard_Bold',
        lineHeight: 30,
        letterSpacing: -1
    },
    text: {
        fontSize: 16,
        color: '#2B2927',
        fontFamily: 'Pretendard_Regular',
    },
    text_input: {
        fontSize: 20,
        color: '#2B2927',
        fontFamily: 'Pretendard_Regular',
    },
    inputBox: {
        flex:1,
        marginVertical: 14,
        borderBottomWidth: 1, 
        borderBottomColor: '#B8B8B8'
    },
    button: {
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 12,
        backgroundColor: '#FF622A',
        borderRadius: 10,
    
        fontFamily: 'Pretendard_Medium', // 추가
      },
    
});
