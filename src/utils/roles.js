export const ROLES = {
  ADMIN: 'admin',
  SELLER: 'seller',        // ← ใหม่: ผู้บันทึกข้อมูลขายขยะ
  VIEWER: 'viewer',
};

export const PERMISSIONS = {
  // Dashboard
  VIEW_DASHBOARD: 'view_dashboard',
  
  // Waste Orders
  VIEW_WASTE_ORDERS: 'view_waste_orders',
  CREATE_WASTE_ORDER: 'create_waste_order',
  UPDATE_WASTE_ORDER: 'update_waste_order',      // ← ใหม่: อัพเดต status
  DELETE_WASTE_ORDER: 'delete_waste_order',
  EXPORT_WASTE_ORDERS: 'export_waste_orders',
  ADD_ORDER_DOCUMENT: 'add_order_document',      // ← ใหม่: เพิ่มเอกสาร
  VIEW_ORDER_DOCUMENTS: 'view_order_documents',  // ← ใหม่: ดูเอกสาร

  // Vendors
  VIEW_VENDORS: 'view_vendors',
  CREATE_VENDOR: 'create_vendor',
  EDIT_VENDOR: 'edit_vendor',
  DELETE_VENDOR: 'delete_vendor',

  // Billing
  VIEW_BILLING: 'view_billing',
  CREATE_INVOICE: 'create_invoice',
  EDIT_INVOICE: 'edit_invoice',
  DELETE_INVOICE: 'delete_invoice',
  EXPORT_BILLING: 'export_billing',

  // Pricing
  VIEW_PRICING: 'view_pricing',
  EDIT_PRICING: 'edit_pricing',                  // ← ใหม่: ปรับราคา (Admin only)

  // ESG
  VIEW_ESG: 'view_esg',
  EXPORT_ESG: 'export_esg',

  // Settings
  VIEW_SETTINGS: 'view_settings',
  EDIT_SETTINGS: 'edit_settings',
};

// Role-Permission Mapping
export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [
    // Admin has all permissions
    ...Object.values(PERMISSIONS),
  ],

  [ROLES.SELLER]: [
    // Seller can: view, create, update Orders + add documents
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_WASTE_ORDERS,
    PERMISSIONS.CREATE_WASTE_ORDER,
    PERMISSIONS.UPDATE_WASTE_ORDER,           // ← บันทึกข้อมูล
    PERMISSIONS.ADD_ORDER_DOCUMENT,           // ← เพิ่มเอกสาร
    PERMISSIONS.VIEW_ORDER_DOCUMENTS,
    PERMISSIONS.EXPORT_WASTE_ORDERS,
    PERMISSIONS.VIEW_VENDORS,
    PERMISSIONS.VIEW_BILLING,
    PERMISSIONS.VIEW_PRICING,
    PERMISSIONS.VIEW_ESG,
  ],

  [ROLES.VIEWER]: [
    // Viewer can only view
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_WASTE_ORDERS,
    PERMISSIONS.VIEW_ORDER_DOCUMENTS,
    PERMISSIONS.VIEW_VENDORS,
    PERMISSIONS.VIEW_BILLING,
    PERMISSIONS.VIEW_PRICING,
    PERMISSIONS.VIEW_ESG,
  ],
};

export const hasPermission = (userRole, permission) => {
  if (!userRole || !ROLE_PERMISSIONS[userRole]) {
    return false;
  }
  return ROLE_PERMISSIONS[userRole].includes(permission);
};

export const hasAnyPermission = (userRole, permissions) => {
  return permissions.some(permission => hasPermission(userRole, permission));
};

export const hasAllPermissions = (userRole, permissions) => {
  return permissions.every(permission => hasPermission(userRole, permission));
};

export default {
  ROLES,
  PERMISSIONS,
  ROLE_PERMISSIONS,
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
};
