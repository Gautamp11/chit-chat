import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import useUser from "./useUser";

function ProtectedRoute() {
  // const currentUser = useContext(AuthContext);
  const { user: currentUser } = useUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate an async check for user authentication
    if (currentUser === undefined) {
      // Current user is still loading, do nothing
      return;
    }

    if (!currentUser || currentUser.role !== "authenticated") {
      navigate("/signin");
    }

    setIsLoading(false);
  }, [currentUser, navigate]);

  if (isLoading) {
    return <div>Loading...</div>; // Show loading while checking auth state
  }

  return <Outlet />; // Render child routes if the user is authenticated
}

export default ProtectedRoute;
