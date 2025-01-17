import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function ProtectedRoute() {
  const currentUser = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if there's no current user or if the user role is not "authenticated"
    if (currentUser && currentUser?.role !== "authenticated") {
      navigate("/signin");
    }
  }, [currentUser, navigate]);

  if (!currentUser) return <div>Loading...</div>;

  return <Outlet />; // Render child routes if the user is authenticated
}

export default ProtectedRoute;
