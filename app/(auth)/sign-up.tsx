import { View, Text, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native'
import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Link, router } from 'expo-router'
import AuthHeader from '@/components/AuthHeader'
import AuthInput from '@/components/AuthInput'
import AuthButton from '@/components/AuthButton'
import SocialAuth from '@/components/SocialAuth'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { signUp } = useAuth()

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields')
      return
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address')
      return
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters')
      return
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match')
      return
    }

    setIsLoading(true)
    try {
      await signUp(email, password)
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
          title="Create Account"
          subtitle="Join us and start your journey"
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
            placeholder="Create a password"
            icon="lock-closed-outline"
            secureTextEntry
            showPassword={showPassword}
            onTogglePassword={() => setShowPassword(!showPassword)}
            editable={!isLoading}
          />

          <AuthInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm your password"
            icon="lock-closed-outline"
            secureTextEntry
            showPassword={showConfirmPassword}
            onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
            editable={!isLoading}
          />

          <AuthButton
            onPress={handleSignUp}
            isLoading={isLoading}
            title="Create Account"
          />

          <SocialAuth text="or sign up with" />

          <View className="flex-row justify-center items-center mt-6">
            <Text className="text-gray-600">Already have an account? </Text>
            <Link href="/sign-in" className="text-blue-500 font-semibold">
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
} 