import { viewDetailsAction } from "./FilterData";

// Define the shape of permission objects the user passes
export interface UserPermission {
  org_title_id: string;
  module_title_id: string;
  module_operation_title_id: string;
}

// New union type for userPermissions
type UserPermissionInput = UserPermission[] | string;

/**
 * Safely checks if a value is neither null, undefined, nor an empty string.
 */
function isValid(value: any): boolean {
  return value !== null && value !== undefined && value !== '';
}

/**
 * Checks if the user has permission for a given module and action.
 *
 * @param moduleName - The module name (e.g., 'enquiries', 'leads')
 * @param actionName - The action name (e.g., 'testRide')
 * @param userPermissions - Array of user permission objects or string
 * @returns boolean - true if permission exists, otherwise false
 */
export function hasPermission(
  moduleName: string,
  actionName: string,
  userPermissions: UserPermissionInput = []
): boolean {
  if (typeof userPermissions === 'string') {
    const normalized = userPermissions.trim().toLowerCase();
    if (normalized === 'all' || normalized === '*') return true;
    return false;
  }

  if (!isValid(moduleName) || !isValid(actionName)) return false;

  const moduleActions = viewDetailsAction?.[moduleName];
  if (!moduleActions || typeof moduleActions !== 'object') return false;

  const action = moduleActions?.[actionName];
  if (!action || !isValid(action.module_operation_title_id)) return false;

  const requiredPermission = action.module_operation_title_id;

  return userPermissions.some(
    (perm) =>
      isValid(perm?.module_operation_title_id) &&
      perm.module_operation_title_id === requiredPermission
  );
}

/**
 * Checks if the user has permission based on module_title_id.
 *
 * @param actionName - The module title ID to check
 * @param userPermissions - Array of user permission objects or string
 * @returns boolean - true if permission exists, otherwise false
 */
export function hasPermissionnew(
  actionName: string,
  userPermissions: UserPermissionInput = []
): boolean {
  if (typeof userPermissions === 'string') {
    const normalized = userPermissions.trim().toLowerCase();
    if (normalized === 'all' || normalized === '*') return true;
    return false;
  }

  if (!isValid(actionName)) return false;

  return userPermissions.some(
    (perm) =>
      isValid(perm?.module_title_id) &&
      perm.module_title_id === actionName
  );
}
