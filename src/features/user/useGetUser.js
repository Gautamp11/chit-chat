import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/usersAPI";

export function useGetUser(id) {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["getUser"], // Add these to the query key
    queryFn: () => getUser(id),
  });

  return { user, isLoading, error };
}
