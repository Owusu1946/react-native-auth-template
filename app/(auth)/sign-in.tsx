import { View, Text, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native'
import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Link, router } from 'expo-router'
import AuthHeader from '@/components/AuthHeader'
import AuthInput from '@/components/AuthInput'
import AuthButton from '@/components/AuthButton'
import SocialAuth from '@/components/SocialAuth'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { signIn } = useAuth()

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields')
      return
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address')
      return
    }

    setIsLoading(true)
    try {
      await signIn(email, password)
      router.replace('/home')
    } catch (error: any) {
      Alert.alert('Error', error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        className="px-6"
      >
        <AuthHeader 
          title="Welcome Back!"
          subtitle="We're excited to see you again"
        />

        <View className="space-y-6">
          <AuthInput
            label="Email Address"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            icon="mail-outline"
            keyboardType="email-address"
            editable={!isLoading}
          />

          <AuthInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            icon="lock-closed-outline"
            secureTextEntry
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
            editable={!isLoading}
          />

          <Link 
            href="/forgot-password" 
            className="text-right text-blue-500 font-medium"
          >
            Forgot Password?
          </Link>

          <AuthButton
            onPress={handleSignIn}
            isLoading={isLoading}
            title="Sign In"
          />

          <SocialAuth text="or continue with" />

          <View className="flex-row justify-center items-center mt-6">
            <Text className="text-gray-600">Don't have an account? </Text>
            <Link href="/sign-up" className="text-blue-500 font-semibold">
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
} 