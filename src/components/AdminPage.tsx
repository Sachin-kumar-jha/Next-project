"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";
import toast from "react-hot-toast";
import { Spinner } from "@/components/Spinner";
interface User {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    role: string;
    otp: {
      verified: boolean;
    } | null;
  }
  
export default function AdminPage() {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState([]);
  const [blockLoadingId, setBlockLoadingId] = useState<string | null>(null);
  const [deleteLoadingId, setDeleteLoadingId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user.role !== "ADMIN") {
      router.push("/");
    } else {
      fetchUsers();
    }
  }, [status, session, router]);

  const fetchUsers = async () => {
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    setUsers(data);
  };

  const deleteUser = async (userId: string) => {
    setDeleteLoadingId(userId);
    await axios.delete("/api/admin/users", { data: { userId } });
    toast.success("User deleted");
    await fetchUsers();
    setDeleteLoadingId(null);
  };

  const toggleBlockUser = async (userId: string, currentlyBlocked: boolean) => {
    setBlockLoadingId(userId);
    await axios.patch("/api/admin/users", {
      userId,
      block: !currentlyBlocked,
    });
    toast.success(currentlyBlocked ? "User unblocked" : "User blocked");
    await fetchUsers();
    setBlockLoadingId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#141E30] to-[#243B55] text-white">
      {/* Admin Navbar */}
      <nav className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 border-b border-white/10">
        <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        {session?.user && (
          <div className="flex items-center gap-3">
            <span className="text-sm md:text-base cursor-pointer hover:text-purple-400" onClick={()=>redirect("/user")}>{session.user.name}</span>
            <Image
              src={session.user.image || "/fallback-image.png"}
              alt="admin-avatar"
              width={36}
              height={36}
              className="rounded-full"
            />
          </div>
        )}
      </nav>

      <div className="p-4 sm:p-6 md:p-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-6">Manage Users</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user:User) => (
            <div
              key={user.id}
              className="bg-white/10 p-4 rounded shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={user.image ?? "/fallback-image.png"}
                  alt="avatar"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium text-sm sm:text-base">{user.name ?? "No name"}</p>
                  <p className="text-xs sm:text-sm text-gray-300 break-all">{user.email}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleBlockUser(user.id, !user.otp?.verified)}
                  className="bg-yellow-500 px-3 py-1 rounded text-xs sm:text-sm"
                >
                  {blockLoadingId === user.id ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : user.otp?.verified ? "Block" : "Unblock"}
                </button>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="bg-red-600 px-3 py-1 rounded text-xs sm:text-sm"
                >
                  {deleteLoadingId === user.id ? <Spinner /> : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
