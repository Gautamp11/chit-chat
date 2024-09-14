import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../services/usersAPI";

export default function useContacts() {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  return { users, error, isLoading };
}
