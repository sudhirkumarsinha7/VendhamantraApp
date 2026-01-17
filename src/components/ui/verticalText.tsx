

import React from 'react';
import { View, Text, StyleSheet, TextStyle } from 'react-native';
import { createGlobalStyles } from '../../styles/globalStyles';
import { themes } from '../../styles/themes';
import { lightTheme } from '../../styles/themes';
import { fonts } from '../../assets/localImage';
import { useAppContext } from '../../context/AppContext';
import { createComponentStyles } from '../../styles/componentStyles';

interface VerticalTextProps {
  label: string;
  value: string;
  valueStyle?: TextStyle;
  labelStyle?: TextStyle;
}

const VerticalText: React.FC<VerticalTextProps> = ({ label, value, valueStyle }) => {
  const { state } = useAppContext()
  const { theme } = state
  const globalStyles = createGlobalStyles(theme)
  const componentStyles = createComponentStyles(theme)

  return (
    <View style={componentStyles.wrapper}>
      <Text style={componentStyles.label}>{label}</Text>
      <Text style={[globalStyles.textValue, valueStyle]}>{value || '-'}</Text>
    </View>
  );
};


export default VerticalText;
