"use client";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
const Signin = () => {
  const session = useSession();
  const router = useRouter();

  const [loadingProvider, setLoadingProvider] = useState<"google" | "github" | null>(null);

  useEffect(() => {
    if (session.data?.user) {
      router.push("/user");
    }
  }, [session, router]);

  const handleSignIn = async (provider: "google" | "github") => {
    setLoadingProvider(provider);
    await signIn(provider, {
      callbackUrl: provider === "google" ? "/verifyOtp" : "/user",
    });
  };
  useEffect(() => {
    const error = new URLSearchParams(window.location.search).get("error");
    if (error === "OAuthAccountNotLinked") {
      toast.error("Account already exists with another provider. Please use the original method to log in.");
    }
  }, []);
  
  return (
    <div className="flex h-screen justify-center items-center bg-[#0f172a]">
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
          type: "spring",
          damping: 10,
        }}
        className="flex flex-col gap-12 justify-between bg-white/5 p-8 rounded-2xl border border-blue-500 shadow-xl min-w-[30vw] backdrop-blur-md"
      >
        <div className="flex flex-col gap-12">
          <div className="flex flex-col text-center">
            <h2 className="font-semibold text-3xl md:text-4xl tracking-tighter text-white">
              Welcome to{" "}
              <span className="font-bold bg-gradient-to-b from-pink-400 to-blue-700 bg-clip-text text-transparent tracking-tighter">
               RoleXbase
              </span>
            </h2>
            <p className="text-blue-200 font-medium tracking-tight text-lg md:text-xl">
              Log in to access this website!
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Google Sign-In */}
            <button
              disabled={loadingProvider !== null}
              onClick={() => handleSignIn("google")}
              className="w-full flex gap-3 p-4 font-medium text-lg rounded-xl bg-gradient-to-r from-blue-500 to-indigo-700 hover:from-blue-600 hover:to-indigo-800 transition-all duration-300 cursor-pointer text-white justify-center items-center shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loadingProvider === "google" ? (
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 30 30"
                    fill="currentColor"
                    className="size-6 md:size-7 text-white"
                  >
                    <path d="M15.003906 3C8.3749062 3 3 8.373 3 15C3 21.627 8.3749062 27 15.003906 27C25.013906 27 27.269078 17.707 26.330078 13H25H22.732422H15V17H22.738281C21.848702 20.448251 18.725955 23 15 23C10.582 23 7 19.418 7 15C7 10.582 10.582 7 15 7C17.009 7 18.839141 7.74575 20.244141 8.96875L23.085938 6.1289062C20.951937 4.1849063 18.116906 3 15.003906 3Z" />
                  </svg>
                  <span>Continue with Google</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <div className="w-full my-2" />
          <Link href={"/"} className="flex items-center gap-2 cursor-pointer mx-auto">
            <Image
              src="/images/profile.png"
              alt="Logo"
              width={300}
              height={200}
              className="rounded-full size-16"
            />
            <div className="flex flex-col">
              <span className="font-bold bg-gradient-to-b from-pink-400 to-blue-700 bg-clip-text text-transparent text-4xl tracking-tighter">
               RoleXbase
              </span>
              <p className="text-blue-200 tracking-tight text-lg leading-none">
                because 10x ain&apos;t enough.
              </p>
            </div>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Signin;
