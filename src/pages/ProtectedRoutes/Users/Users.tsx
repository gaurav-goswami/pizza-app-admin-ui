import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../../http/apis/api";
import { throwErrorMessage } from "../../../utils/methods";
import { IUser } from "./types";

const getAllUsers = async () => {
  try {
    const { data } = await getUsers();
    return data;
  } catch (error) {
    throwErrorMessage({ err: error });
    throw error;
  }
};

const Users = () => {
  const { data: usersData, isLoading: usersLoading, isError: usersError } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  console.log("usersData", usersData);

  return (
    <>
      {usersLoading && <div>Loading...</div>}
      {usersError && <div>Error</div>}
      {
        usersData && usersData.map((data: IUser) => {
          return <li key={data.id}>{data.email}</li>
        })
      }
    </>
  );
};

export default Users;
