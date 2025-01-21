import { View, Text, Image } from 'react-native'

type Props = {
  title: string
  subtitle: string
}

export default function AuthHeader({ title, subtitle }: Props) {
  return (
    <View className="mt-20 mb-10">
      <Image 
        source={require('@/assets/images/adaptive-icon.png')}
        className="w-20 h-20 self-center mb-4"
      />
      <Text className="text-3xl font-bold text-center text-gray-800">
        {title}
      </Text>
      <Text className="text-center text-gray-500 mt-2">
        {subtitle}
      </Text>
    </View>
  )
} 