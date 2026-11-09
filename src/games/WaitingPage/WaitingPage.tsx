
import { Link } from "react-router-dom";

export default function WaitingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center p-4">

      {/* BACKGROUND */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat scale-105 blur-[1px]"
        style={{
          backgroundImage: "url('/images/background2.png')",
        }}
      />

      {/* LAPISAN AGAR TULISAN LEBIH JELAS */}
      <div className="fixed inset-0 bg-white/20" />

      {/* KONTEN UTAMA */}
      <div className="relative z-10 text-center w-full max-w-5xl">

        <div className="text-7xl mb-6 animate-bounce">
          🌈 ⭐ 🎈
        </div>

        <div className="bg-white/90 rounded-[40px] border-8 border-white p-8 md:p-12 shadow-2xl">

          <h1 className="text-5xl md:text-7xl font-black text-blue-600 animate-pulse">
            TUNGGU YA! 😊
          </h1>

          <div className="my-8 text-7xl md:text-9xl animate-bounce">
            ✋ ✋ ✋
          </div>

          <p className="text-4xl md:text-5xl font-black text-pink-500 leading-tight">
            MENUNGGU PERINTAH BU NIA
          </p>

        </div>

        {/* TOMBOL KEMBALI */}
        <Link
          to="/"
          className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white text-xl md:text-3xl font-black px-8 md:px-10 py-5 rounded-full shadow-xl hover:scale-110 transition-all duration-300"
        >
          Yuk Kembali 🔄
        </Link>

      </div>
    </div>
  );
}
