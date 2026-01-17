import type React from "react"
import { View, StyleSheet,Text } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Header } from "../components/common/Header"
import { useAppContext } from "../context/AppContext"
import { useAuth } from "../context/AuthContext"

interface HeaderAction {
  icon: string
  onPress: () => void
}

interface WithHeaderProps {
  title: string
  showBack?: boolean
  rightActions?: HeaderAction[]
  subtitle?: string
  backgroundColor?: string
}

export function withHeader<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  defaultHeaderProps: { title: string; showBack: boolean }
) {
  return function WithHeaderComponent(props: P & Partial<WithHeaderProps>) {
    const { state } = useAppContext()
    const { theme } = state
    const navigation = useNavigation()
    // Merge default header props with incoming props (props override defaults)
    const {
      title,
      showBack,
      rightActions = [],
      subtitle,
      backgroundColor,
      ...restProps
    } = { ...defaultHeaderProps, ...props }

    const handleBackPress = () => {
      navigation.goBack()
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: theme.colors.background,
      },
      content: {
        flex: 1,
      },
    })

    return (
      <View style={styles.container}>
        <Header
          title={title}
          showBack={showBack}
          onBackPress={handleBackPress}
          rightActions={rightActions}
          subtitle={subtitle}
          backgroundColor={backgroundColor}
        />
        <View style={styles.content}>
          <WrappedComponent {...(restProps as P)} />
        </View>
      </View>
    )
  }
}
export type WithHeaderComponentType<P> = React.ComponentType<P & Partial<WithHeaderProps>>
export type WithHeaderPropsType = WithHeaderProps & {
  title: string
  showBack?: boolean
  rightActions?: HeaderAction[]
  subtitle?: string
  backgroundColor?: string
}
export type HeaderActionType = HeaderAction & {
  icon: string
  onPress: () => void
} 
