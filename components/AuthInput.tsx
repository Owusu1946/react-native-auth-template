import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

type Props = {
  label: string
  value: string
  onChangeText: (text: string) => void
  placeholder: string
  icon: keyof typeof Ionicons.glyphMap
  secureTextEntry?: boolean
  showPassword?: boolean
  onTogglePassword?: () => void
  keyboardType?: 'email-address' | 'default'
  editable?: boolean
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
}

export default function AuthInput({
  label,
  value,
  onChangeText,
  placeholder,
  icon,
  secureTextEntry,
  showPassword,
  onTogglePassword,
  keyboardType = 'default',
  editable = true,
  autoCapitalize = 'none'
}: Props) {
  return (
    <View>
      <Text className="text-gray-700 text-base mb-2 font-medium">
        {label}
      </Text>
      <View className="flex-row items-center bg-gray-50 rounded-2xl px-4 border border-gray-200">
        <Ionicons name={icon} size={20} color="#6B7280" />
        <TextInput
          className="flex-1 py-4 px-3 text-gray-800"
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          editable={editable}
          autoCapitalize={autoCapitalize}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={onTogglePassword}>
            <Ionicons 
              name={showPassword ? "eye-off-outline" : "eye-outline"} 
              size={20} 
              color="#6B7280" 
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
} 