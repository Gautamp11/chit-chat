import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../services/authAPI";

export default function useUser() {
  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  return { user, error, isLoading };
}
