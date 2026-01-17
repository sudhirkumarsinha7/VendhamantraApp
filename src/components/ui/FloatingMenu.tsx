import React from "react";
import { View, StyleSheet } from "react-native";
import { Menu, MenuItem } from "react-native-material-menu";
import { useAppContext } from "../../context/AppContext";
import { fonts } from "../../assets/localImage";


interface MenuItemType {
    label: string;
    onPress: () => void;
}

interface FloatingMenuProps {
    visible: boolean;
    onClose: () => void;
    menuItems: MenuItemType[];
}

const FloatingMenu: React.FC<FloatingMenuProps> = ({
    visible,
    onClose,
    menuItems,
}) => {
    const { state } = useAppContext();
    const { theme } = state;

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
        menuText: {
            fontSize: theme.fontSize.medium,
            color: theme.colors.shadow,
            fontWeight: '400',
            fontFamily: fonts.REGULAR
        },
    });

    if (!visible) return null;

    return (
        <Menu
            visible={visible}
            onRequestClose={onClose}
            style={styles.menuWrapper}

        >
            {menuItems.map((item, index) => (
                <MenuItem
                    key={index}
                    onPress={() => {
                        item?.onPress();
                        onClose();
                    }}
                    textStyle={styles.menuText}
                    style={styles.menuItem}
                >
                    {item.label}
                </MenuItem>
            ))}
        </Menu>
    );
};

export default FloatingMenu;
