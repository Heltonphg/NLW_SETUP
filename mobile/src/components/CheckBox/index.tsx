import React from 'react'
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated'
import clsx from 'clsx'
import colors from 'tailwindcss/colors'
import { Feather } from '@expo/vector-icons'
interface ICheckBoxProps extends TouchableOpacityProps {
  title: string
  checked?: boolean
}

export const CheckBox: React.FC<ICheckBoxProps> = ({ checked = false, title, ...rest }) => {
  return (
    <TouchableOpacity className="flex-row mb-2 items-center" {...rest}>
      <Animated.View
        className={clsx('h-8 w-8 bg-green-500 rounded-lg items-center justify-center', {
          'bg-zinc-900 rounded-lg': !checked
        })}
        entering={ZoomIn}
        exiting={ZoomOut}>
        {checked && <Feather name="check" size={20} color={colors.white} />}
      </Animated.View>

      <Text className="text-white text-base ml-3 font-semibold">{title}</Text>
    </TouchableOpacity>
  )
}
