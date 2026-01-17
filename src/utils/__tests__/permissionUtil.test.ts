import { hasPermission, hasPermissionnew, UserPermission } from '../permissionUtil';

// Mock the imported viewDetailsAction from FilterData module
jest.mock('../FilterData', () => ({
  viewDetailsAction: {
    enquiries: {
      testRide: { module_operation_title_id: 'op_test_ride' },
      view: { module_operation_title_id: 'op_view' },
    },
    leads: {
      edit: { module_operation_title_id: 'op_edit' },
    },
  },
}));

describe('permissionUtil', () => {
  const mockPermissions: UserPermission[] = [
    {
      org_title_id: 'org1',
      module_title_id: 'enquiries',
      module_operation_title_id: 'op_test_ride',
    },
    {
      org_title_id: 'org1',
      module_title_id: 'leads',
      module_operation_title_id: 'op_edit',
    },
  ];

  // hasPermission base tests
  describe('hasPermission', () => {
    it('returns true if user has required permission', () => {
      expect(hasPermission('enquiries', 'testRide', mockPermissions)).toBe(true);
    });

    it('returns false if module does not exist', () => {
      expect(hasPermission('nonexistentModule', 'testRide', mockPermissions)).toBe(false);
    });

    it('returns false if action does not exist in module', () => {
      expect(hasPermission('enquiries', 'nonexistentAction', mockPermissions)).toBe(false);
    });

    it('returns false if user does not have required permission', () => {
      expect(hasPermission('enquiries', 'view', mockPermissions)).toBe(false);
    });
  });

  // hasPermissionnew base tests
  describe('hasPermissionnew', () => {
    it('returns true if user has a permission matching module_title_id', () => {
      expect(hasPermissionnew('enquiries', mockPermissions)).toBe(true);
    });

    it('returns false if no permissions match module_title_id', () => {
      expect(hasPermissionnew('nonexistentModule', mockPermissions)).toBe(false);
    });
  });

  // Edge cases for hasPermission
  describe('hasPermission - edge cases', () => {
    it('returns false if moduleName is empty', () => {
      expect(hasPermission('', 'testRide', mockPermissions)).toBe(false);
    });

    it('returns false if actionName is empty', () => {
      expect(hasPermission('enquiries', '', mockPermissions)).toBe(false);
    });

    it('returns false if moduleActions is not an object', () => {
      // Simulate incorrect structure
      const brokenMock = require('../FilterData');
      brokenMock.viewDetailsAction.brokenModule = null;
      expect(hasPermission('brokenModule', 'testRide', mockPermissions)).toBe(false);
    });

    it('returns false if action does not have valid module_operation_title_id', () => {
      const brokenMock = require('../FilterData');
      brokenMock.viewDetailsAction.brokenModule = {
        brokenAction: {},
      };
      expect(hasPermission('brokenModule', 'brokenAction', mockPermissions)).toBe(false);
    });

    it('returns true if userPermissions is string "all"', () => {
      expect(hasPermission('enquiries', 'testRide', 'all')).toBe(true);
    });

    it('returns true if userPermissions is string "*"', () => {
      expect(hasPermission('leads', 'edit', '*')).toBe(true);
    });

    it('returns false if userPermissions is any other string', () => {
      expect(hasPermission('enquiries', 'testRide', 'denied')).toBe(false);
    });

    it('returns false if userPermissions is undefined', () => {
      expect(hasPermission('enquiries', 'testRide', undefined as any)).toBe(false);
    });

    // it('returns false if userPermissions is null', () => {
    //   expect(hasPermission('enquiries', 'testRide', null as any)).toBe(false);
    // });

    it('returns false if userPermissions is an empty array', () => {
      expect(hasPermission('enquiries', 'testRide', [])).toBe(false);
    });

    it('returns false if userPermissions contains null/invalid entries', () => {
      const brokenPerms: any[] = [null, undefined, {}];
      expect(hasPermission('enquiries', 'testRide', brokenPerms as UserPermission[])).toBe(false);
    });
  });

  // Edge cases for hasPermissionnew
  describe('hasPermissionnew - edge cases', () => {
    it('returns false if actionName is empty', () => {
      expect(hasPermissionnew('', mockPermissions)).toBe(false);
    });

    it('returns true if userPermissions is string "all"', () => {
      expect(hasPermissionnew('enquiries', 'all')).toBe(true);
    });

    it('returns true if userPermissions is string "*"', () => {
      expect(hasPermissionnew('enquiries', '*')).toBe(true);
    });

    it('returns false if userPermissions is any other string', () => {
      expect(hasPermissionnew('enquiries', 'invalid')).toBe(false);
    });

    it('returns false if userPermissions is undefined', () => {
      expect(hasPermissionnew('enquiries', undefined as any)).toBe(false);
    });

    // it('returns false if userPermissions is null', () => {
    //   expect(hasPermissionnew('enquiries', null as any)).toBe(false);
    // });

    it('returns false if userPermissions is an empty array', () => {
      expect(hasPermissionnew('enquiries', [])).toBe(false);
    });

    it('returns false if userPermissions contains invalid entries', () => {
      const brokenPerms: any[] = [null, undefined, {}];
      expect(hasPermissionnew('enquiries', brokenPerms as UserPermission[])).toBe(false);
    });
  });
});
