import { Outlet, useNavigate } from "react-router-dom";
import useUser from "../Auth/useUser";

function ProtectedRoute() {
  const { user, error, isLoading } = useUser();

  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error("Error fetching user:", error.message);
    navigate("/signin");
  }

  if (!user || user.role !== "authenticated") {
    navigate("/signin");
  }

  return <Outlet />;
}

export default ProtectedRoute;
