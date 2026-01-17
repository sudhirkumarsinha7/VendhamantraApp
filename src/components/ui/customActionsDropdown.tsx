import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useAuth } from '../../context/AuthContext';
import { useAppContext } from '../../context/AppContext';
import { fonts } from '../../assets/localImage';
import { bulkEnquiryActions, bulkLeadActions } from "../../utils/FilterData"
import { createComponentStyles } from '../../styles/componentStyles';
import { scale } from '../scale';

type Props = {
    onSelect: (action: string) => void;
    disabled?: boolean;
    module_id?: 'enquiries' | 'leads';
};
type ModulePermission = { module_operation_title_id: string };
type ModulePermissionInput = ModulePermission[] | string | null | undefined | any;

/**
 * Safely extract allowed module operations from dynamic input.
 * - Returns ['*'] if input is 'all' or '*'
 * - Returns array of IDs if valid array
 * - Returns empty array otherwise
 */
export function getAllowedOperations(
    module_operation_permissions: ModulePermissionInput
): string[] {
    if (typeof module_operation_permissions === 'string') {
        const normalized = module_operation_permissions.trim().toLowerCase();
        if (normalized === 'all' || normalized === '*') {
            return ['*']; // wildcard for full access
        }
        return []; // unknown string
    }

    if (Array.isArray(module_operation_permissions)) {
        return module_operation_permissions
            .filter(
                (p) =>
                    p &&
                    typeof p === 'object' &&
                    typeof p.module_operation_title_id === 'string' &&
                    p.module_operation_title_id.trim() !== ''
            )
            .map((p) => p.module_operation_title_id);
    }

    return []; // invalid input
}

const CustomActionsDropdown = ({ onSelect, disabled, module_id }: Props) => {
    const [visible, setVisible] = useState(false);
    const navigation = useNavigation<any>(); // 
    const { state } = useAppContext()
    const { theme } = state
    const componentStyles = createComponentStyles(theme)
    const { state: authState, orgId, divisionId, } = useAuth()
    const { clientAssets = {} } = authState
    const { module_operation_permissions = [] } = clientAssets

    const {

        activeTab: enquiriesActiveTab,
        selectedEnquiries,

    } = useSelector((state: RootState) => state.enquiries)
    const {

        activeTab: leadsActiveTab,
        selectedLeads,

    } = useSelector((state: RootState) => state.leads)


    //    const allowedOperations = module_operation_permissions.map(
    //      (p: { module_operation_title_id: any }) => p.module_operation_title_id
    //    );
    const allowedOperations = getAllowedOperations(module_operation_permissions);

    //    const filterActions = (actionsList: typeof bulkEnquiryActions.pending) =>
    //      actionsList.filter((action) =>
    //        allowedOperations.includes(action.module_operation_title_id)
    //      );

    const filterActions = (actionsList: typeof bulkEnquiryActions.pending) => {
        // If full access, return the entire list
        if (allowedOperations.includes('*')) {
            return actionsList;
        }

        // Otherwise, filter by allowed operation IDs
        return actionsList.filter((action) =>
            allowedOperations.includes(action.module_operation_title_id)
        );
    };

    const getActionsByModuleAndStatus = () => {
        const status = module_id === "enquiries" ? enquiriesActiveTab.toLowerCase().trim() : leadsActiveTab.toLowerCase().trim() || "interested";

        const actionsMap = module_id === "enquiries" ? bulkEnquiryActions : bulkLeadActions;
        //    console.log('getActionsByModuleAndStatus actionsMap ',actionsMap)
        //   console.log('getActionsByModuleAndStatus status ',status)

        if (module_id === "enquiries") {
            if (status === "resolved") return filterActions(actionsMap?.resolved);
            if (
                ["follows up", "followups", "followuping up", "following up"].includes(status)
            ) return filterActions(actionsMap?.following_up);
            return filterActions(actionsMap?.pending);
        }
        else if (module_id === "leads") {
            // Leads status keys may differ, map accordingly
            if (status === "interested") {
                return filterActions(actionsMap?.interested);
            }
            if (status === "following up") { return filterActions(actionsMap?.following_up); }
            if (status === "booked") { return filterActions(actionsMap?.booked); }
            if (status === "purchased") { return filterActions(actionsMap?.purchased); }
            if (status === "lost") { return filterActions(actionsMap?.lost); }
            // default to interested if status unknown
            { return filterActions(actionsMap?.interested || []); }
        }

        return [];
    };

    const availableActions = getActionsByModuleAndStatus();
    //    console.log('availableActions ',availableActions)
    const handleSelect = (action: string) => {
        setVisible(false);
        onSelect(action);

        const isEnquiryModule = module_id === 'enquiries';

        const selectedItems = isEnquiryModule ? selectedEnquiries : selectedLeads;
        const activeTab = isEnquiryModule ? enquiriesActiveTab : leadsActiveTab;

        switch (action) {
            case 'Assign Enquiry':
            case 'Assign Leads':
                navigation.navigate('AssignEnquiry', {
                    enquiryIds: selectedItems,
                    module_id: module_id,
                });
                break;
            case 'Close Leads':
            case 'Close Enquiry':
                navigation.navigate('CloseEnquiry', {
                    enquiryIds: selectedItems,
                    module_id: module_id,
                    e_stage: activeTab,
                    e_testride: null
                });
                break;
            case "Assign to Dealer":
                navigation.navigate('AssignDealer', {
                    enquiryIds: selectedItems,
                    module_id: module_id,
                    e_stage: activeTab,
                });
                break;
                break
            default:
                break;
        }
    };
    // console.log('CustomActionsDropdown rendered',selectedLeads,leadsActiveTab);
    return (
        <View style={componentStyles.container}>
            <TouchableOpacity
                disabled={disabled}
                style={[
                    componentStyles.dropdownButton,
                    { backgroundColor: disabled ? '#ddd' : '#fff' }, // grayed out when disabled
                ]}
                onPress={() => !disabled && setVisible(!visible)}
            >
                <Text style={[componentStyles.buttonText1, { color: disabled ? '#777777' : '#333' }]}>
                    Actions
                </Text>
                <Ionicons name="chevron-down" size={16} color={disabled ? '#8E8E8E' : 'grey'} />
            </TouchableOpacity>

            <Modal
                visible={visible}
                transparent
                animationType="fade"
                onRequestClose={() => setVisible(false)}
            >
                <TouchableOpacity
                    style={componentStyles.modalBackground}
                    onPress={() => setVisible(false)}
                    activeOpacity={1}
                >
                    <View style={componentStyles.dropdownMenu}>
                        {availableActions.map((action: any, index: number) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleSelect(action?.label)}
                                style={componentStyles.menuItem}
                            >
                                <Text style={componentStyles.menuText}>{action?.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};



export default CustomActionsDropdown;