import supabase from "../../supabase";

export async function getAllUsers() {
  let { data: users, error } = await supabase.from("users").select("*");

  if (error) console.log(error.message);

  return users;
}

export async function getUser(id) {
  let { data: user, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (error) console.log(error.message);

  return user;
}

export async function updateUser(name, id) {
  console.log("Updating user with ID:", id);

  if (!id) return;
  try {
    const { data, error } = await supabase
      .from("users")
      .update({ fullname: name })
      .eq("id", id)
      .select();

    if (error) {
      throw new Error(error.message); // Throw the error for better handling
    }

    return data; // Return the updated data
  } catch (error) {
    console.error("Update failed:", error.message); // Log the error in a clearer way
    return null; // Return null or handle as needed
  }
}
