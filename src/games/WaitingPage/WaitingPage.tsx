
import { Link } from "react-router-dom";
import {
  FaRainbow,
  FaStar,
  FaGift,
  FaHandPaper,
  FaSyncAlt,
  FaCloud,
  FaHeart,
  FaSmile,
  FaHandSparkles,
} from "react-icons/fa";

export default function WaitingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center p-4">

      {/* BACKGROUND */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{
          backgroundImage: "url('/images/background2.png')",
        }}
      />

      {/* OVERLAY */}
      <div className="fixed inset-0" />

      {/* DEKORASI BACKGROUND */}
      <div className="absolute top-[8%] left-[5%] text-white/80 animate-float">
        <FaCloud size={75} />
      </div>

      <div className="absolute top-[15%] right-[8%] text-white/80 animate-bounce">
        <FaCloud size={95} />
      </div>

      <FaStar className="absolute top-[25%] left-[12%] text-yellow-300 text-4xl animate-pulse" />
      <FaStar className="absolute bottom-[20%] right-[10%] text-yellow-300 text-5xl animate-spin-slow" />
      <FaHeart className="absolute bottom-[15%] left-[8%] text-pink-400 text-4xl animate-bounce" />
      <FaHandSparkles className="absolute top-[12%] right-[30%] text-yellow-300 text-4xl animate-pulse" />

      {/* KONTEN UTAMA */}
      <div className="relative z-10 w-full max-w-4xl text-center">

        {/* IKON ATAS */}
        <div className="flex justify-center items-center gap-6 md:gap-10 mb-[-30px] relative z-20">

          <FaRainbow
            className="text-pink-500 drop-shadow-lg animate-bounce"
            size={65}
          />

          <FaGift
            className="text-purple-500 drop-shadow-lg animate-bounce"
            size={75}
            style={{ animationDelay: "200ms" }}
          />

          <FaStar
            className="text-yellow-400 drop-shadow-lg animate-pulse"
            size={65}
          />

        </div>

        {/* CARD UTAMA */}
        <div className="relative bg-white/40 backdrop-blur-l rounded-[35px] md:rounded-[50px] shadow-[0_20px_60px_rgba(59,130,246,0.3)] px-6 py-12 md:px-14 md:py-14 overflow-hidden">

          {/* HIASAN CARD */}
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-pink-200/50 rounded-full blur-2xl" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-blue-200/60 rounded-full blur-2xl" />

          <div className="relative z-10">

            {/* JUDUL */}
            <h1 className="text-5xl md:text-7xl font-black tracking-wide bg-gradient-to-r text-white bg-clip-text text-transparent drop-shadow-sm">
              TUNGGU YA!
            </h1>

            {/* IKON TANGAN */}
            <div className="flex justify-center items-center gap-5 md:gap-10 my-10">

              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="relative bg-gradient-to-br from-yellow-100 to-orange-100 rounded-3xl p-4 md:p-5 shadow-lg border-4 border-white animate-bounce"
                  style={{
                    animationDelay: `${item * 180}ms`,
                  }}
                >
                  <FaHandPaper
                    className="text-yellow-500 drop-shadow-md"
                    size={55}
                  />
                </div>
              ))}

            </div>

            {/* PESAN */}
            <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-3xl px-5 py-6 shadow-xl border-2 border-white">

              <p className="text-white text-2xl md:text-4xl font-black leading-snug drop-shadow-md">
                MENUNGGU PERINTAH
              </p>

              <p className="text-white text-3xl md:text-5xl font-black mt-2 drop-shadow-md">
                BU NIA
              </p>

            </div>

            {/* ANIMASI TITIK */}
            <div className="flex justify-center gap-3 mt-7">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="w-4 h-4 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 animate-bounce"
                  style={{
                    animationDelay: `${item * 200}ms`,
                  }}
                />
              ))}
            </div>

          </div>
        </div>

        {/* TOMBOL KEMBALI */}
        <Link
          to="/"
          className="group inline-flex items-center justify-center gap-3 mt-9 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600 hover:from-blue-600 hover:to-purple-600 text-white text-xl md:text-2xl font-black px-9 md:px-12 py-5 rounded-full border-4 border-white shadow-[0_8px_0_#1e40af] hover:shadow-[0_4px_0_#1e40af] hover:translate-y-1 active:translate-y-2 active:shadow-none transition-all duration-200"
        >
          <FaSyncAlt className="group-hover:rotate-180 transition-transform duration-500" />
          Kembali!
          <FaSmile className="group-hover:scale-125 transition-transform" />
        </Link>

        {/* FOOTER */}
        <p className="text-white font-bold text-sm md:text-lg mt-7 drop-shadow-lg">
          🌈 Tetap Semangat dan Ceria! 🌈
        </p>

      </div>
    </div>
  );
}
