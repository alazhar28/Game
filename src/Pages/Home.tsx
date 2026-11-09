
import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* BACKGROUND GAMBAR BLUR */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat scale-110 blur-[1px]"
        style={{
          backgroundImage: "url('/images/background2.png')",
        }}
      />

      {/* LAPISAN AGAR BACKGROUND TIDAK TERLALU MENCOLok */}
      <div className="fixed inset-0 bg-white/40" />

      {/* KONTEN UTAMA */}
      <div className="relative z-10 min-h-screen p-6">

        <div className="max-w-5xl mx-auto">

          <h1 className="
            text-5xl
            font-bold
            text-center
            text-blue-600
            mt-8
          ">
            🎮 KB-TK IA Game
          </h1>

          <p className="
            text-center
            text-xl
            text-gray-700
            mt-3
          ">
            Yuk belajar sambil bermain! 🌈
          </p>

          <div className="
            grid
            grid-cols-2
            md:grid-cols-4
            gap-5
            mt-12
          ">

            {/* CARI PASANGAN */}
            <Link
              to="/game/matching"
              className="
                bg-white/90
                rounded-3xl
                p-6
                shadow-lg
                text-center
                hover:scale-105
                transition
              "
            >
              <div className="text-6xl">🧩</div>
              <h2 className="text-xl font-bold mt-4">
                Cari Pasangan
              </h2>
            </Link>

            {/* MEWARNAI */}
            <Link
              to="/game/coloring"
              className="
                bg-white/90
                rounded-3xl
                p-6
                shadow-lg
                text-center
                hover:scale-105
                transition
              "
            >
              <div className="text-6xl">🎨</div>
              <h2 className="text-xl font-bold mt-4">
                Mewarnai
              </h2>
            </Link>

            {/* MENGENAL ANGKA */}
            <Link
              to="/game/number"
              className="
                bg-white/90
                rounded-3xl
                p-6
                shadow-lg
                text-center
                hover:scale-105
                transition
              "
            >
              <div className="text-6xl">🔢</div>
              <h2 className="text-xl font-bold mt-4">
                Mengenal Angka
              </h2>
            </Link>

            {/* MENCOCOKKAN GAMBAR */}
            <Link
              to="/game/number-matching"
              className="
                bg-white/90
                rounded-3xl
                p-6
                shadow-lg
                text-center
                hover:scale-105
                transition
              "
            >
              <div className="text-6xl">🌾</div>
              <h2 className="text-xl font-bold mt-4">
                Mencocokkan Gambar
              </h2>
            </Link>

            {/* VOCAL GAME */}
            <Link
              to="/game/vocal"
              className="
                bg-white/90
                rounded-3xl
                p-6
                shadow-lg
                text-center
                hover:scale-105
                transition
              "
            >
              <div className="text-6xl">🧠</div>
              <h2 className="text-xl font-bold mt-4">
                Melengkapi Huruf
              </h2>
            </Link>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
