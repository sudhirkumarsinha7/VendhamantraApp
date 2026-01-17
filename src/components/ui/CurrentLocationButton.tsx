import React from "react"
import {
    TouchableOpacity,
    View,
    Text,
    ActivityIndicator,
    ViewStyle,
} from "react-native"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { useAppContext } from "../../context/AppContext"
import { createGlobalStyles } from "../../styles/globalStyles"
import { createComponentStyles } from "../../styles/componentStyles"
import { scale } from "../scale"


interface Props {
    label?: string
    mandatory?: boolean
    onPress: () => void
    value?: string | number
    error?: string | undefined
    isLoading?: boolean
    containerStyle?: ViewStyle
}

const CurrentLocationButton: React.FC<Props> = ({
    label = "Get Current Location",
    onPress,
    value,
    error,
    isLoading = false,
    containerStyle,
    mandatory = false,
}) => {
    const { state } = useAppContext()
    const { theme } = state
    const globalStyles = createGlobalStyles(theme)
    const componentStyles = createComponentStyles(theme)

    return (
        <View style={[{ width: "100%" }, containerStyle]}>
            {/* Button */}
            <TouchableOpacity
                onPress={onPress}
                style={[
                    componentStyles.button,
                    {
                        borderColor: theme.colors.primary,
                        backgroundColor: theme.colors.teamCard,
                        height: scale(45)
                    },
                ]}
            >
                <MaterialIcons
                    name="my-location"
                    color={theme.colors.locationIcon}
                    size={22}
                />
                <Text style={[componentStyles.LocationLabel, { color: theme.colors.locationColor }]}>
                    {label}          {mandatory && <Text style={{ color: theme.colors.error }}> *</Text>}
                    
                </Text>


            </TouchableOpacity>

            {/* Show value */}
            {value ? <Text style={componentStyles.valueText}>{value}</Text> : null}

            {/* Error */}
            {error && <Text style={globalStyles.errorText}>{error}</Text>}

            {/* Loading */}
            {isLoading && (
                <ActivityIndicator
                    size="small"
                    color={theme.colors.primary}
                    style={{ marginTop: scale(5) }}
                />
            )}
        </View>
    )
}
export default CurrentLocationButton;
