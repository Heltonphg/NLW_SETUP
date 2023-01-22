import React, { useEffect } from 'react'
import { View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
interface iProgressBarProps {
  progress?: number
}

export const ProgressBar: React.FC<iProgressBarProps> = ({ progress = 0 }) => {
  const sharedProgress = useSharedValue(progress)

  useEffect(() => {
    sharedProgress.value = withTiming(progress)
  }, [progress])

  const styles = useAnimatedStyle(() => {
    return {
      width: `${sharedProgress.value}%`
    }
  })

  return (
    <View className="w-full h-3 rounded-xl bg-zinc-700 mt-4">
      <Animated.View className="h-3 rounded-xl bg-violet-600" style={styles}></Animated.View>
    </View>
  )
}
