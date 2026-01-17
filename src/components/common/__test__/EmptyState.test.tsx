import React from 'react'
import { render } from '@testing-library/react-native'
import { EmptyState } from '../EmptyState'
import { lightTheme } from '../../../styles/themes'

// Wrap your component or provide lightTheme context if needed:
test('renders EmptyState with light theme', () => {
  // You can mock your app context to return lightTheme
  const mockState = { theme: lightTheme }
  
  jest.mock('../../../context/AppContext', () => ({
    useAppContext: () => ({ state: mockState }),
  }))
  
  const { getByText } = render(
    <EmptyState
      title="No Data"
      description="There is no data to display."
      actionText="Reload"
      onActionPress={() => {}}
    />
  )

  expect(getByText('No Data')).toBeTruthy()
  expect(getByText('There is no data to display.')).toBeTruthy()
  expect(getByText('Reload')).toBeTruthy()
})
