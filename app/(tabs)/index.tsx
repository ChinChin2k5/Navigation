import { router } from 'expo-router'; // DÙNG LA BÀN XỊN CỦA EXPO ROUTER
import React, { useState } from 'react';
import { Alert, Button, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';

export default function LoginScreen() {
  const [phone, setPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const formatPhoneNumber = (text) => {
    const cleaned = text.replace(/\D/g, '');
    let formatted = cleaned;
    if (cleaned.length > 3 && cleaned.length <= 6) {
      formatted = cleaned.slice(0,3) + ' ' + cleaned.slice(3);
    } else if (cleaned.length > 6 && cleaned.length <= 8) {
      formatted = cleaned.slice(0,3) + ' ' + cleaned.slice(3,6) + ' ' + cleaned.slice(6);
    } else if (cleaned.length > 8) {
      formatted = cleaned.slice(0, 3) + ' ' + cleaned.slice(3, 6) + ' ' + cleaned.slice(6, 8) + ' ' + cleaned.slice(8, 10);
    }
    return formatted;
  }

  const validatePhoneNumber = () => {
    const cleanedPhone = phone.replace(/\s/g, ''); 
    const phoneRegex = /^0[0-9]{9}$/;
    
    if (cleanedPhone === "" || !phoneRegex.test(cleanedPhone)) { 
        Alert.alert("Lỗi", "Số điện thoại không đúng định dạng. Vui lòng nhập lại");
        return false;
    }
    return true;
  };

  const handlePress = () => {
    if (validatePhoneNumber()) {
      // BẮN SANG FILE home.tsx VÀ MANG THEO DỮ LIỆU SỐ ĐIỆN THOẠI
      router.replace({ pathname: '/home', params: { phoneNumber: phone } });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Đăng Nhập</Text>
        <Text style={styles.label}>Nhập Số Điện Thoại:</Text>
        <Text style={styles.label}>Dùng Số Điện Thoại Để Đăng Nhập Hoặc Đăng Ký Tài Khoản Trên Redmi Turbo 4:</Text>

        <TextInput 
          style={[styles.input, errorMsg !== '' ? styles.inputError : null]}
          placeholder="Nhập số điện thoại của bạn..."
          keyboardType="numeric"
          value={phone}
          maxLength={13}
          onChangeText={(text) => {
              const formattedText = formatPhoneNumber(text);
              setPhone(formattedText);
              
              const cleanedPhone = formattedText.replace(/\s/g, '');
              const phoneRegex = /^0[0-9]{9}$/;
              
              if (cleanedPhone.length > 0 && !phoneRegex.test(cleanedPhone)) {
                  setErrorMsg('Số điện thoại không đúng định dạng. Vui lòng nhập lại');
              } else {
                  setErrorMsg('');
              }
          }} 
        />
        {errorMsg !== '' && <Text style={styles.errorText}>{errorMsg}</Text>}
        
        <Button title="Tiếp Tục" onPress={handlePress} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff', paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 },
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 24, marginBottom: 50, fontWeight: 'bold' },
  label: { fontSize: 16, marginBottom: 20, alignSelf: 'flex-start' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, width: '100%', padding: 15, marginBottom: 10, fontSize: 18 },
  inputError: { borderColor: 'red' },
  errorText: { color: 'red', marginBottom: 20, fontSize: 14 }
});