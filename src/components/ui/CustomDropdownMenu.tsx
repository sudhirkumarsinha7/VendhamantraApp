import React, { useRef } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { Menu, MenuItem } from 'react-native-material-menu';
import { useAppContext } from '../../context/AppContext';
import { createGlobalStyles } from '../../styles/globalStyles';
import { fonts } from '../../assets/localImage';

// Define the shape of each menu option
export interface MenuOption {
  label: string;
  onPress: () => void;
}

// Define the props for the CustomDropdownMenu component
interface CustomDropdownMenuProps {
  visible: boolean;
  onClose: () => void;
  options: MenuOption[];
}

const CustomDropdownMenu: React.FC<CustomDropdownMenuProps> = ({
  visible,
  onClose,
  options,
}) => {
  const { state } = useAppContext();
  const { theme } = state;
  const globalStyles = createGlobalStyles(theme);

  const menuRef = useRef<Menu>(null);

  // Show/hide handlers for internal control
  const showMenu = () => menuRef.current?.show();
  const hideMenu = () => {
    menuRef.current?.hide();
    onClose();
  };

  const styles = StyleSheet.create({
     menuWrapper: {
            backgroundColor: theme.colors.actionBackground,
          borderRadius: theme.borderRadius,
        },
        menuItem: {
          fontSize: theme.fontSize.small,
          fontFamily: fonts.REGULAR,
          color: theme.colors.shadow,
          paddingVertical: 8,
        },
  });

  return (
    <Menu
      ref={menuRef}
      visible={visible}
      onRequestClose={hideMenu}
      style={styles.menuWrapper}
    >
      {options.map((option, index) => (
        <MenuItem
          key={index}
          onPress={() => {
            hideMenu();
            option.onPress();
          }}
          style={styles.menuItem}
        >
          {option.label}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default CustomDropdownMenu;
