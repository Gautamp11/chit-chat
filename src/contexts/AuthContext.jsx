import { createContext, useEffect, useState } from "react";
import supabase from "../../supabase";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(function () {
    async function getCurrentUser() {
      try {
        const { data: session, error } = await supabase.auth.getSession();

        if (error) {
          console.error("Error fetching session:", error.message);
          return;
        }

        if (session && session.session && session.session.user) {
          setCurrentUser(session.session.user);
          console.log("User is authenticated");
        } else {
          setCurrentUser(null); // No authenticated user
          console.log("No authenticated user");
        }
      } catch (error) {
        console.error("Error in getCurrentUser:", error.message);
        setCurrentUser(null);
      }
    }

    getCurrentUser();
  }, []);
  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };
