"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";

interface User {
  email: string;
  name: string;
  image: string;
  role:string;

}

export default function UserPage() {
  const [user, setUser] = useState<User | null>(null);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (status === "loading"){
      return;
    };
    if (status === "unauthenticated") {
      router.push("/signin");
    } else if (session?.user) {
      setUser({
        email: session.user.email!,
        name: session.user.name ?? "Unknown",
        image: session.user.image ?? "/fallback-image.png",
        role:session.user.role ?? "Unknown"
      });
    }
  }, [status, session, router]);
console.log(session);
  return (
    <main className="relative min-h-screen bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white overflow-hidden">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-black/30 backdrop-blur-md">
        <div className="text-xl font-bold"><span className="hover:text-purple-400 transition duration-300 cursor-pointer" onClick={()=>redirect("/")}>RoleBase</span></div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-white text-sm">
        {user?.role === "ADMIN" ?
          <li className="hover:text-purple-400 transition duration-300 cursor-pointer" onClick={()=>redirect("/admin")}>Go to Admin Dashboard</li>:<li className="hover:text-white transition duration-300 cursor-pointer" onClick={()=>redirect("/")}>Go to homePage</li>}
        </ul>

        {/* Avatar */}
        {user && (
          <div className="hidden md:block">
            <Image src={user.image ?? "/fallback-image.png"} alt="User Avatar" width={40} height={40} className="rounded-full border-2 border-purple-500" />
          </div>
        )}

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white z-30"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed top-0 right-0 w-2/3 sm:w-1/2 h-full bg-[#1f1b3a] text-white py-8 px-6 flex flex-col gap-6 items-start md:hidden z-20 shadow-lg">
          <span className="cursor-pointer hover:text-purple-400" onClick={() => setMenuOpen(false)}>{}</span>
          <span className="cursor-pointer hover:text-purple-400" onClick={() => setMenuOpen(false)}>Features</span>
          <span className="cursor-pointer hover:text-purple-400" onClick={() => setMenuOpen(false)}>About</span>
          <span className="cursor-pointer hover:text-purple-400" onClick={() => setMenuOpen(false)}>Contact</span>
        </div>
      )}

      <section className="flex flex-col items-center justify-center py-20 text-center px-4">
        <h2 className="text-4xl font-bold mb-4">Welcome, {user?.name}</h2>
        {user ? (
          <div className="bg-white/10 rounded-lg p-6 shadow-xl text-white max-w-md w-full">
            <p className="mb-2"><strong>Name:</strong> {user.name}</p>
            <p className="mb-4"><strong>Email:</strong> {user.email}</p>
            <div className="flex justify-center">
              <Image src={user.image ?? "/fallback-image.png"} height={100} width={100} alt="gmail image" className="rounded-full border-4 border-purple-500" />
            </div>
          </div>
        ) : (
          <p className="text-white/60">Loading user data...</p>
        )}
      </section>
    </main>
  );
}
