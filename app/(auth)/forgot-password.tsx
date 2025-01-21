import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Link, router } from 'expo-router'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const { forgotPassword } = useAuth()

  const handleResetPassword = async () => {
    try {
      await forgotPassword(email)
      Alert.alert(
        'Success',
        'Password reset instructions have been sent to your email.',
        [{ text: 'OK', onPress: () => router.push('/sign-in') }]
      )
    } catch (error: any) {
      Alert.alert('Error', error.message)
    }
  }

  return (
    <View className="flex-1 justify-center p-6">
      <Text className="text-3xl font-bold mb-6 text-center">Reset Password</Text>
      
      <View className="space-y-4">
        <TextInput
          className="bg-gray-100 p-4 rounded-lg"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        
        <TouchableOpacity
          className="bg-blue-500 p-4 rounded-lg"
          onPress={handleResetPassword}
        >
          <Text className="text-white text-center font-semibold">
            Send Reset Instructions
          </Text>
        </TouchableOpacity>

        <Link href="/sign-in" className="text-center text-blue-500 mt-4">
          Back to Sign In
        </Link>
      </View>
    </View>
  )
} 