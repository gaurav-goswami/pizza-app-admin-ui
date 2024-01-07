import { User } from "../store";
import { DASHBOARD_ALLOWED_ROLES } from "../utils/constants";

export const usePermission = () => {
  const allowedRoles = [DASHBOARD_ALLOWED_ROLES.ADMIN, DASHBOARD_ALLOWED_ROLES.MANAGER];

  const _hasPermission = (user: User | null) => {
    if (user) {
      return allowedRoles.includes(user.role);
    }
    return false;
  };

  return {
    isAllowed: _hasPermission,
  };
};
