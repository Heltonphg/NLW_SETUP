import React from 'react'
import { View } from 'react-native'

interface iProgressBarProps {
  progress?: number
}

export const ProgressBar: React.FC<iProgressBarProps> = ({ progress = 0 }) => {
  return (
    <View className="w-full h-3 rounded-xl bg-zinc-700 mt-4">
      <View
        className="h-3 rounded-xl bg-violet-600"
        style={{
          width: `${progress}%`
        }}></View>
    </View>
  )
}
