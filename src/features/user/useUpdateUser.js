import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "../../services/usersAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isLoading, error } = useMutation({
    mutationFn: ({ name, id }) => {
      updateUser(name, id);
    },
    onSuccess: () => {
      toast.success("Name Updated success");
      navigate("/");
      queryClient.invalidateQueries();
    },
  });

  return { mutate, isLoading, error };
}
