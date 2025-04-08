
import Navbar from "@/components/Navbar";
export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white overflow-hidden">
      {/* Navbar */}
      <Navbar/>

      {/* Grid texture overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px] opacity-10" />

      {/* Spotlight Glow */}
      <div className="absolute w-[800px] h-[800px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-500 opacity-20 blur-3xl animate-pulse" />

      {/* Center content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl leading-[65px] md:px-10 md:text-6xl font-extrabold mb-6 md:leading-[80px]">
          BUILD A <span className="text-purple-400">ADMIN PANEL</span> WITH <span className="text-pink-400">MONGODB</span> AND <span className="text-purple-500">NEXT.JS</span>
        </h1>
        <p className="text-white/80 text-base md:text-lg">
          by <span className="font-semibold">Sachin Jha</span> — Write for the college Porjecgt
        </p>
      </div>

      {/* Footer logo and note */}
      <div className="absolute bottom-4 right-4 text-sm text-white/50 flex items-center gap-2">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 w-6 h-6 rounded-sm" />
        <span>Hey! — Project building by Own!</span>
       </div>
    </main>
  );
}
