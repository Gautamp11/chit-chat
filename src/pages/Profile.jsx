import { useEffect, useState } from "react";
import useUser from "../features/Auth/useUser";
import { useUpdateUser } from "../features/user/useUpdateUser";
import { useGetUser } from "../features/user/useGetUser";

function Profile() {
  const { user: loggedInUser } = useUser();
  const [name, setName] = useState("");
  const { mutate, isLoading, error } = useUpdateUser();
  const { user: userData } = useGetUser(loggedInUser?.id);

  function handleUpdate() {
    if (!name) return;
    const newName = {
      name: name,
      id: loggedInUser?.id,
    };
    mutate(newName);
  }

  return (
    <div className="flex flex-col  space-y-4 bg-slate-200 mx-auto justify-center max-w-fit p-10 m-8 rounded-md items-center h-72 ">
      <h1 className="font-semibold">Hi {loggedInUser?.email}</h1>
      <h1 className="font-semibold">Hi {userData?.fullname}</h1>

      <input
        type="text"
        className="p-2 rounded-md"
        placeholder="Update name"
        // value={fullname ? fullname : ""}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        className="bg-slate-50 rounded-md p-2 hover:bg-slate-300"
        onClick={handleUpdate}
      >
        Update
      </button>
    </div>
  );
}

export default Profile;
