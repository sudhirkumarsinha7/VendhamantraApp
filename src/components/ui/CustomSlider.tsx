import React, { useState } from "react"
import { View, Text } from "react-native"
import Slider from "@react-native-community/slider"
import { scale } from "../scale"
import { useAppContext } from "../../context/AppContext"
import { createGlobalStyles } from "../../styles/globalStyles"
import { createComponentStyles } from "../../styles/componentStyles"

interface SliderProps {
    label?: string
    name: string
    mandatory?: boolean
    minValue: number
    maxValue: number
    step?: number
    initialValue?: number
    onValueChange: (value: number) => void
    required?: boolean
    error?: string
}

const CustomSlider: React.FC<SliderProps> = ({
    label,
    name,
    mandatory = false,
    minValue,
    maxValue,
    step = 1,
    initialValue,
    onValueChange,
    required = false,
    error,
}) => {
    const { state } = useAppContext()
    const { theme } = state
    const componentStyles = createComponentStyles(theme)
    const globalStyles = createGlobalStyles(theme)

    const [value, setValue] = useState(initialValue || minValue)

    const handleValueChange = (val: number) => {
        setValue(val)
        onValueChange(val)
    }

    return (
        <View style={{ marginVertical: scale(10) }}>
            {label && (
                <Text style={componentStyles.label}>
                    {label}
                    {mandatory && <Text style={{ color: theme.colors.error }}> *</Text>}
                </Text>
            )}

            <Slider
                style={{ width: "100%", height: scale(40) }}
                minimumValue={minValue}
                maximumValue={maxValue}
                step={step}
                value={value}
                onValueChange={handleValueChange}
                minimumTrackTintColor={theme.colors.primary}
                maximumTrackTintColor={theme.colors.textSecondary}
                thumbTintColor={theme.colors.primary}
            />

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ color: theme.colors.textSecondary }}>{minValue}</Text>
                <Text style={{ color: theme.colors.textSecondary }}>{value.toFixed(0)}</Text>
                <Text style={{ color: theme.colors.textSecondary }}>{maxValue}</Text>
            </View>

            {error && required && <Text style={globalStyles.textError}>{error}</Text>}
        </View>
    )
}

export default CustomSlider
