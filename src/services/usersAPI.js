import supabase from "../../supabase";

export async function getAllUsers() {
  let { data: users, error } = await supabase.from("users").select("*");

  if (error) console.log(error.message);

  return users;
}
