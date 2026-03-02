import React, { useState } from 'react';
import { Alert, Button, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';

export default function HomeScreen() {
  const [phone, setPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Hàm format số điện thoại giữ nguyên
  const formatPhoneNumber = (text: string) => {
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

  // TẦNG 1 (SLIDE 1): Xử lý khi bấm nút "Tiếp Tục"
  const validatePhoneNumber = () => {
    const cleanedPhone = phone.replace(/\s/g, ''); 
    const phoneRegex = /^0[0-9]{9}$/;
    
    // Nếu rỗng hoặc không đúng format 10 số -> Bắn Alert
    if (cleanedPhone === "" || !phoneRegex.test(cleanedPhone)) { 
        Alert.alert("", "Số điện thoại không đúng định dạng. Vui lòng nhập lại");
        return false;
    }
    return true;
  };

  const handlePress = () => {
    if (validatePhoneNumber()) {
      Alert.alert("Thành công", "Số điện thoại hợp lệ: " + phone);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
      <Text style={styles.title}>Đăng Nhập</Text>
      
      <Text style={styles.label}>Nhập Số Điện Thoại:</Text>
      <Text style={styles.label}>Dùng Số Điện Thoại Để Đăng Nhập Hoặc Đăng Ký Tài Khoản Trên Redmi Turbo 4:</Text>

      <TextInput 
        // 💡 Bonus: Nếu có lỗi (errorMsg khác rỗng), viền của khung TextInput sẽ đỏ lên cho đúng chuẩn UX!
        style={[styles.input, errorMsg !== '' ? styles.inputError : null]}
        placeholder="Nhập số điện thoại của bạn..."
        keyboardType="numeric"
        value={phone}
        maxLength={13}
        onChangeText={(text) => {
            const formattedText = formatPhoneNumber(text);
            setPhone(formattedText);
            
            // TẦNG 2 (SLIDE 2): Xử lý Validation ngay khi đang nhập
            const cleanedPhone = formattedText.replace(/\s/g, '');
            const phoneRegex = /^0[0-9]{9}$/;
            
            // Nếu người dùng đã gõ chữ (length > 0) NHƯNG chưa đúng chuẩn 10 số -> Hiện chữ đỏ
            if (cleanedPhone.length > 0 && !phoneRegex.test(cleanedPhone)) {
                setErrorMsg('Số điện thoại không đúng định dạng. Vui lòng nhập lại');
            } else {
                // Nếu xóa hết trắng trơn, hoặc gõ đủ 10 số chuẩn -> Tắt chữ đỏ đi
                setErrorMsg('');
            }
        }} 
      />
      {errorMsg !== '' && <Text style={styles.errorText}>{errorMsg}</Text>}
      
      <Button 
        title="Tiếp Tục" 
        onPress={handlePress} 
      />
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1, 
    backgroundColor: '#fff', 
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 200,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    marginBottom: 20,
    alignSelf: 'flex-start' 
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    width: '100%', 
    padding: 15,
    marginBottom: 10, 
    fontSize: 18
  },
  inputError: {
    borderColor: 'red', // Viền đỏ khi có lỗi
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
    fontSize: 14,
  }
});