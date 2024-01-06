import { useMutation } from "@tanstack/react-query";
import { logout } from "../http/apis/api";
import { useAuthStore } from "../store";

const useLogout = () => {
  const { logout: logoutFromStore } = useAuthStore();
  const { mutate: logoutMutation } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: () => {
      logoutFromStore();
      return;
    },
  });

  const logoutUser = () => {
    logoutMutation();
  };

  return { logoutUser };
};

export default useLogout;
