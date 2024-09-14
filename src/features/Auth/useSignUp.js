import { useMutation } from "@tanstack/react-query";
import { signUp as signUpApi } from "../../services/authAPI";

export default function useSignUp() {
  const { mutate: signUp, error } = useMutation({
    mutationFn: ({ email, password }) => signUpApi(email, password),
  });

  return { signUp, error };
}
