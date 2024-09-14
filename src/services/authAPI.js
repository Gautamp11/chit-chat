import supabase from "../../supabase";

export async function signUp(email, password) {
  // Sign up the user with Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) {
    console.error("Error signing up:", authError.message);
    return null;
  }
  console.log(authData.user);

  const userId = authData.user?.id;

  if (userId) {
    // Insert the user into the 'users' table with the ID from Auth
    const { data, error } = await supabase
      .from("users")
      .insert([{ user_id: userId, email }]) // Assuming you have 'id' and 'email' columns in your 'users' table
      .select();

    if (error) {
      console.error("Error inserting user into users table:", error.message);
    } else {
      console.log("User successfully added to users table!");
    }
  }

  return authData;
}

export async function signIn({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
