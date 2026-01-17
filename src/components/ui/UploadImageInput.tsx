import React from "react"
import {
    View,
    Text,
    TouchableOpacity,
    Image,
} from "react-native"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { scale } from "../scale"
import { useAppContext } from "../../context/AppContext"
import { createGlobalStyles } from "../../styles/globalStyles"
import { createComponentStyles } from "../../styles/componentStyles"

interface Props {
    label?: string
    name: string
    mandatory?: boolean
    onPress: () => void
    selectedImage?: any
    imageUrl?: string
    required?: boolean
    error?: string
}

const UploadImageInput: React.FC<Props> = ({
    label,
    name,
    mandatory = false,
    onPress,
    selectedImage,
    imageUrl,
    required = false,
    error,
}) => {
    const { state } = useAppContext()
    const { theme } = state
    const componentStyles = createComponentStyles(theme)
    const globalStyles = createGlobalStyles(theme)
    return (
        <View style={{ marginVertical: scale(10) }}>

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: scale(10),
                }}
            >
                <Text style={componentStyles.label}>
                    {label}
                    {mandatory && <Text style={{ color: theme.colors.error }}> *</Text>}
                    {selectedImage?.fileSize && (
                        <Text style={{ color: theme.colors.textSecondary }}>
                            {"  (" + (selectedImage.fileSize / (1024 * 1024)).toFixed(2) + " MB)"}
                        </Text>
                    )}
                </Text>
            </View>

            <TouchableOpacity
                onPress={onPress}
                style={[
                    componentStyles.uploadBox,
                    { borderColor: theme.colors.cardBorder },
                ]}
            >
                <Text
                    style={{
                        color: selectedImage?.uri
                            ? theme.colors.textSecondary
                            : theme.colors.textSecondary,
                        fontSize: scale(12),
                        fontWeight: '400'
                    }}
                >
                    {selectedImage?.uri ? "Image Selected" : "Click to upload"}
                </Text>

                <MaterialIcons
                    name="attachment"
                    size={20}
                    color={theme.colors.placeholder}
                />
            </TouchableOpacity>

            {selectedImage?.uri ? (
                <View style={{ marginTop: scale(10), marginBottom: scale(6) }}>
                    <Image
                        source={{ uri: selectedImage.uri }}
                        style={{
                            width: "100%",
                            height: scale(200),
                            borderRadius: 8,
                        }}
                        resizeMode="cover"
                    />
                </View>
            ) : imageUrl ? (<View style={{ marginTop: scale(10), marginBottom: scale(6) }}>
                <Image
                    source={{ uri: imageUrl }}
                    style={{
                        width: "100%",
                        height: scale(200),
                        borderRadius: 8,
                    }}
                    resizeMode="cover"
                />
            </View>) : null}
            {error && required && <Text style={globalStyles.textError}>{error}</Text>}

        </View>
    )
}

export default UploadImageInput
