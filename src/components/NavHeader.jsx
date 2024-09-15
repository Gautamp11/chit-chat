import { AiOutlineUser, AiOutlineLogout } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function NavHeader({ logout, currentUserEmail }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between bg-slate-100  p-2 items-center">
      <h2 className="font-semibold flex gap-2 items-center">
        <img className="w-6 rounded-md" src="logo.png"></img>
        <span>ChitChat</span>
      </h2>
      <div className="flex gap-2">
        <h3 className="hidden lg:block">{currentUserEmail}</h3>
        <button
          className="rounded-md bg-white p-2 hover:bg-slate-300 transition-all "
          onClick={() => navigate("/profile")}
        >
          <AiOutlineUser />
        </button>
        <button
          className="rounded-md bg-white p-2  hover:bg-slate-300 transition-all "
          onClick={logout}
        >
          <AiOutlineLogout />
        </button>
      </div>
    </div>
  );
}

export default NavHeader;
