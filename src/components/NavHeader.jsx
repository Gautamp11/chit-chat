import { AiOutlineUser, AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function NavHeader({ logout, currentUserEmail }) {
  const navigate = useNavigate();
  return (
    <div className="flex gap-4 justify-between items-center p-2 mb-2">
      <h2 className="font-semibold flex gap-2 items-center">
        <img className="w-6 rounded-md" src="logo.png"></img>
        <span>ChitChat</span>
      </h2>
      <div className="flex gap-2">
        <button
          className="rounded-md  p-2 hover:bg-slate-800 transition-all "
          onClick={() => navigate("/profile")}
        >
          <AiOutlineUser />
        </button>
        <button
          className="rounded-md  p-2  hover:bg-slate-800 transition-all "
          onClick={logout}
        >
          <AiOutlineLogout />
        </button>
      </div>
    </div>
  );
}

export default NavHeader;
