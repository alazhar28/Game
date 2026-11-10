
import { Link } from "react-router-dom";
import {
  FaRainbow,
  FaStar,
  FaGift,
  FaHandPaper,
  FaSyncAlt
} from "react-icons/fa";

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

        {/* ICON ATAS */}
        <div className="flex justify-center items-center gap-8 mb-6">

          <FaRainbow
            className="text-pink-500 animate-bounce"
            size={65}
          />

          <FaStar
            className="text-yellow-400 animate-pulse"
            size={65}
          />

          <FaGift
            className="text-purple-500 animate-bounce"
            size={65}
          />

        </div>

        <div className="bg-white/90 rounded-[40px] border-8 border-white p-8 md:p-12 shadow-2xl">

          <h1 className="text-5xl md:text-7xl font-black text-blue-600 animate-pulse">
            TUNGGU YA!
          </h1>

          {/* ICON TANGAN */}
          <div className="flex justify-center items-center gap-6 my-8">

            {[1, 2, 3].map((item) => (
              <FaHandPaper
                key={item}
                className="text-yellow-500 animate-bounce"
                size={75}
                style={{
                  animationDelay: `${item * 150}ms`
                }}
              />
            ))}

          </div>

          <p className="text-4xl md:text-5xl font-black text-pink-500 leading-tight">
            MENUNGGU PERINTAH BU NIA
          </p>

        </div>

        {/* TOMBOL KEMBALI */}
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-3 mt-8 bg-blue-600 hover:bg-blue-700 text-white text-xl md:text-3xl font-black px-8 md:px-10 py-5 rounded-full shadow-xl hover:scale-110 transition-all duration-300"
        >
          <FaSyncAlt />
          Yuk Kembali
        </Link>

      </div>
    </div>
  );
}
