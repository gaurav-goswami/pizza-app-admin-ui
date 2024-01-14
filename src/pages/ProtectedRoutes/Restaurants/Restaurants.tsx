import { useQuery } from "@tanstack/react-query";
import { getTenants } from "../../../http/apis/api";
import { throwErrorMessage } from "../../../utils/methods";

const getAllTenants = async () => {
  try {
    const { data } = await getTenants();
    return data;
  } catch (error) {
    throwErrorMessage({ err: error });
    throw error;
  }
};

const Restaurants = () => {
  const { data: tenantsList, isLoading: tenantsLoading } = useQuery({
    queryKey: ["tenants"],
    queryFn: getAllTenants,
  });

  console.log(tenantsList);

  return (
    <>

    </>
  );
};

export default Restaurants;
