"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function Appbar() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return null;

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    toast.success("Signed out successfully!");
    router.push("/signin"); // redirect to sign in if needed
  };

  return (
    <div className="flex w-screen justify-center fixed z-2 items-center top-5">
      <div className="flex w-100 justify-center items-center bg-black h-[40px] mx-10 rounded-md shadow-zinc-600 shadow-md">
        <div className="flex justify-center gap-10">
          <div>Home</div>
          <div>
            {!session ? (
              <button className="cursor-pointer" onClick={() => router.push("/signin")}>
                Sign In
              </button>
            ) : (
              <button className="cursor-pointer"   onClick={handleSignOut}>
                Sign Out
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appbar;
