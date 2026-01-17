import type React from "react"
import { EmptyState } from "../components/common/EmptyState"

interface WithEmptyStateProps {
  isEmpty: boolean
  emptyStateConfig: {
    icon?: string
    title: string
    description: string
    actionText?: string
    onActionPress?: () => void
  }
  children: React.ReactNode
}

export function withEmptyState<P extends object>(WrappedComponent: React.ComponentType<P>) {
  return function WithEmptyStateComponent(props: P & WithEmptyStateProps) {
    const { isEmpty, emptyStateConfig, children, ...restProps } = props

    if (isEmpty) {
      return <EmptyState {...emptyStateConfig} />
    }

    return <WrappedComponent {...(restProps as P)} />
  }
}
