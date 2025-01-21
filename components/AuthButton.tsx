import { TouchableOpacity, Text, ActivityIndicator } from 'react-native'

type Props = {
  onPress: () => void
  isLoading: boolean
  title: string
}

export default function AuthButton({ onPress, isLoading, title }: Props) {
  return (
    <TouchableOpacity
      className={`bg-blue-500 py-4 rounded-2xl ${isLoading ? 'opacity-70' : ''}`}
      onPress={onPress}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text className="text-white text-center font-bold text-lg">
          {title}
        </Text>
      )}
    </TouchableOpacity>
  )
} 