import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'

export default function Home() {
  const { user, signOut } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      await signOut()
    } catch (error: any) {
      Alert.alert('Error', error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View className="flex-1 justify-center items-center p-6">
      <Text className="text-xl mb-2">Welcome, {user?.email}</Text>
      <Text className="text-gray-600 mb-6">You're successfully logged in!</Text>

      <TouchableOpacity
        className={`bg-red-500 px-6 py-3 rounded-lg ${isLoading ? 'opacity-70' : ''}`}
        onPress={handleSignOut}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-semibold">Sign Out</Text>
        )}
      </TouchableOpacity>
    </View>
  )
} 