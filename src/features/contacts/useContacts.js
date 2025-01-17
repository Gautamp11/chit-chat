import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../services/usersAPI";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function useContacts() {
  const {
    data: users,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  return { users, error, isLoading, refetch };
}
