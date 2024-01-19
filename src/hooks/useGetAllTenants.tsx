import { useQuery } from "@tanstack/react-query";
import { getTenants } from "../http/apis/api";
import { throwErrorMessage } from "../utils/methods";

const getAllTenants = async () => {
  try {
    const { data } = await getTenants();
    return data;
  } catch (error) {
    throwErrorMessage({ err: error });
    throw error;
  }
};

const useGetAllTenants = () => {
  const { data: tenantsList, isLoading: tenantsLoading } = useQuery({
    queryKey: ["tenants"],
    queryFn: getAllTenants,
  });

  return { tenantsList, tenantsLoading };
};

export default useGetAllTenants;
