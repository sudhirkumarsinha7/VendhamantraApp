import React from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType, TextStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAppContext } from '../../context/AppContext';
import { fonts } from '../../assets/localImage';
import { scale } from '../scale';
import { themes } from '../../styles/themes';
import { createComponentStyles } from '../../styles/componentStyles';

interface CustomEmptyComponentProps {
  iconName?: string;
  iconSize?: number;
  iconColor?: string;
  message?: string;
  messageStyle?: TextStyle;
  imageSource?: ImageSourcePropType;
}

const CustomEmptyComponent: React.FC<CustomEmptyComponentProps> = ({
  iconName = 'inbox',
  iconSize = 60,
  message = 'No data available',
  messageStyle = {},
  imageSource,
}) => {


  const { state } = useAppContext()
  const { theme } = state
  const componentStyle = createComponentStyles(theme)
  const iconColor = theme.colors.primary;

  return (
    <View style={componentStyle.customEmptyContainer}>
      {imageSource ? (
        <Image source={imageSource} style={componentStyle.image} resizeMode="contain" />
      ) : (
        <Icon name={iconName} size={iconSize} color={iconColor} />
      )}
      <Text style={[componentStyle.message, messageStyle]}>{message}</Text>
    </View>
  );
};

export default CustomEmptyComponent;

