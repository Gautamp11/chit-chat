import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signIn as signInApi } from "../../services/authAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function useSignIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signIn, isLoading } = useMutation({
    mutationFn: ({ email, password }) => signInApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user);
      navigate("/chat", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { signIn, isLoading };
}
