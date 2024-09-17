import { useEffect, useState } from "react";
import useUser from "../features/Auth/useUser";
import { useUpdateUser } from "../features/user/useUpdateUser";
import { useGetUser } from "../features/user/useGetUser";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user: loggedInUser } = useUser();
  const [name, setName] = useState("");
  const { mutate, isLoading, error } = useUpdateUser();
  const { user: userData } = useGetUser(loggedInUser?.id);

  const navigate = useNavigate();
  function handleUpdate() {
    if (!name) return;
    const newName = {
      name: name,
      id: loggedInUser?.id,
    };
    mutate(newName);
  }

  return (
    <div className="flex flex-col  space-y-4 bg-slate-100 mx-auto justify-center max-w-fit p-10 m-8 rounded-md items-center h-72 ">
      {/* <h1 className="font-semibold">Hi {loggedInUser?.email}</h1> */}
      <h1 className="font-semibold">
        Hi {userData?.fullname || loggedInUser?.email}
      </h1>
      <input
        type="text"
        className="p-2 rounded-md"
        placeholder="Update name"
        // value={fullname ? fullname : ""}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div>
        <button
          className="bg-slate-600 rounded-md p-2 hover:bg-slate-700 text-slate-50"
          onClick={handleUpdate}
        >
          Update
        </button>{" "}
        <button
          className="bg-slate-600 rounded-md p-2 hover:bg-slate-700 text-slate-50"
          onClick={() => navigate("/")}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default Profile;
