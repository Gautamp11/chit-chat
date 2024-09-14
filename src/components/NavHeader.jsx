import { AiOutlineUser, AiOutlineLogout } from "react-icons/ai";

function NavHeader({ logout }) {
  return (
    <div className="flex justify-between bg-slate-100  p-2 items-center">
      <h2 className="font-semibold">ChitChat</h2>
      <div className="flex gap-2">
        <button className="rounded-md bg-white p-2 hover:bg-slate-300 transition-all ">
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
