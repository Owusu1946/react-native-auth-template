import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

type Props = {
  text: string
}

export default function SocialAuth({ text }: Props) {
  return (
    <View className="mt-6">
      <View className="flex-row items-center mb-6">
        <View className="flex-1 h-[1px] bg-gray-300" />
        <Text className="mx-4 text-gray-500">{text}</Text>
        <View className="flex-1 h-[1px] bg-gray-300" />
      </View>

      <View className="flex-row justify-center space-x-4">
        {['google', 'apple', 'facebook'].map((provider) => (
          <TouchableOpacity
            key={provider}
            className="w-14 h-14 rounded-full bg-gray-50 items-center justify-center border border-gray-200"
          >
            <Ionicons 
              name={`logo-${provider}` as any} 
              size={24} 
              color="#374151" 
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
} 