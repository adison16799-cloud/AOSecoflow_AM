import { usePermission } from '../hooks/usePermission';

export const PermissionGuard = ({
  permission,
  permissions,
  requireAll = false,
  fallback = null,
  children,
}) => {
  const { canAny, canAll } = usePermission();

  let hasAccess = false;

  if (permission) {
    hasAccess = usePermission().can(permission);
  } else if (permissions) {
    hasAccess = requireAll ? canAll(permissions) : canAny(permissions);
  }

  return hasAccess ? children : fallback;
};

export default PermissionGuard;
