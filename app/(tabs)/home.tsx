import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  // Hứng số điện thoại từ trang Login (index.tsx) bắn sang
  const { phoneNumber } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#E8F5E9' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#28A745' }}>🎉 Đăng Nhập Thành Công!</Text>
      <Text style={{ fontSize: 18, marginTop: 10 }}>Xin chào thuê bao: {phoneNumber}</Text>
      
      <TouchableOpacity 
        style={{ marginTop: 30, backgroundColor: '#FF3B30', padding: 15, borderRadius: 8 }}
        // Nút này bấm 1 phát lùi về file gốc index.tsx (Trang Login)
        onPress={() => router.replace('/')} 
      >
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Đăng Xuất</Text>
      </TouchableOpacity>
    </View>
  );
}