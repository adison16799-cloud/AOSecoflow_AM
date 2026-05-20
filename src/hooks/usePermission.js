cat > src/hooks/usePermission.js << 'EOF'
import { useAuth } from '../contexts/AuthContext';
import { hasPermission, hasAnyPermission, hasAllPermissions } from '../utils/roles';

export const usePermission = () => {
  const { user } = useAuth();

  // Map email to role for testing
  const getUserRole = () => {
    if (user?.email === 'admin@aosecoflow.com') return 'admin';
    if (user?.email === 'seller@aosecoflow.com') return 'seller';
    if (user?.email === 'viewer@aosecoflow.com') return 'viewer';
    return 'viewer'; // default for demo accounts
  };

  const userRole = getUserRole();

  const can = (permission) => {
    return hasPermission(userRole, permission);
  };

  const canAny = (permissions) => {
    return hasAnyPermission(userRole, permissions);
  };

  const canAll = (permissions) => {
    return hasAllPermissions(userRole, permissions);
  };

  return {
    userRole,
    can,
    canAny,
    canAll,
  };
};

export default usePermission;
EOF