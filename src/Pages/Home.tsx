import { Link } from "react-router-dom"

// function Home() {
//   return (
//     <div className="min-h-screen bg-sky-100 p-6">

//       <div className="max-w-5xl mx-auto">

//         <h1 className="text-5xl font-bold text-center text-blue-600 mt-8">
//           🎮 Dunia Bermain
//         </h1>

//         <p className="text-center text-xl text-gray-600 mt-3">
//           Yuk belajar sambil bermain! 🌈
//         </p>

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-12">

//           <Link
//             to="/game/matching"
//             className="bg-white rounded-3xl p-6 shadow-lg
//                        text-center hover:scale-105 transition"
//           >
//             <div className="text-6xl">
//               🧩
//             </div>

//             <h2 className="text-xl font-bold mt-4">
//               Cari Pasangan
//             </h2>
//           </Link>

//           <Link
//             to="/game/coloring"
//             className="bg-white rounded-3xl p-6 shadow-lg
//                        text-center hover:scale-105 transition"
//           >
//             <div className="text-6xl">
//               🎨
//             </div>

//             <h2 className="text-xl font-bold mt-4">
//               Mewarnai
//             </h2>
//           </Link>

//           <Link
//             to="/game/number"
//             className="bg-white rounded-3xl p-6 shadow-lg
//                        text-center hover:scale-105 transition"
//           >
//             <div className="text-6xl">
//               🔢
//             </div>

//             <h2 className="text-xl font-bold mt-4">
//               Mengenal Angka
//             </h2>
//           </Link>

//           <Link
//             to="/game/puzzle"
//             className="bg-white rounded-3xl p-6 shadow-lg
//                        text-center hover:scale-105 transition"
//           >
//             <div className="text-6xl">
//               🧠
//             </div>

//             <h2 className="text-xl font-bold mt-4">
//               Puzzle
//             </h2>
//           </Link>

//         </div>

//       </div>

//     </div>
//   )
// }

// export default Home


function Home() {
  return (
    <div className="min-h-screen bg-sky-100 p-6">

      <div className="max-w-5xl mx-auto">

        <h1 className="
          text-5xl
          font-bold
          text-center
          text-blue-600
          mt-8
        ">
          🎮 Dunia Bermain
        </h1>

        <p className="
          text-center
          text-xl
          text-gray-600
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
              bg-white
              rounded-3xl
              p-6
              shadow-lg
              text-center
              hover:scale-105
              transition
            "
          >
            <div className="text-6xl">
              🧩
            </div>

            <h2 className="
              text-xl
              font-bold
              mt-4
            ">
              Cari Pasangan
            </h2>
          </Link>


          {/* MEWARNAI */}

          <Link
            to="/game/coloring"
            className="
              bg-white
              rounded-3xl
              p-6
              shadow-lg
              text-center
              hover:scale-105
              transition
            "
          >
            <div className="text-6xl">
              🎨
            </div>

            <h2 className="
              text-xl
              font-bold
              mt-4
            ">
              Mewarnai
            </h2>
          </Link>


          {/* MENGENAL ANGKA */}

          <Link
            to="/game/number"
            className="
              bg-white
              rounded-3xl
              p-6
              shadow-lg
              text-center
              hover:scale-105
              transition
            "
          >
            <div className="text-6xl">
              🔢
            </div>

            <h2 className="
              text-xl
              font-bold
              mt-4
            ">
              Mengenal Angka
            </h2>
          </Link>


          {/* MENCOCOKKAN GAMBAR */}

          <Link
            to="/game/number-matching"
            className="
              bg-white
              rounded-3xl
              p-6
              shadow-lg
              text-center
              hover:scale-105
              transition
            "
          >
            <div className="text-6xl">
              🌾
            </div>

            <h2 className="
              text-xl
              font-bold
              mt-4
            ">
              Mencocokkan Gambar
            </h2>
          </Link>


          {/* PUZZLE */}

          <Link
            to="/game/puzzle"
            className="
              bg-white
              rounded-3xl
              p-6
              shadow-lg
              text-center
              hover:scale-105
              transition
            "
          >
            <div className="text-6xl">
              🧠
            </div>

            <h2 className="
              text-xl
              font-bold
              mt-4
            ">
              Puzzle
            </h2>
          </Link>

        </div>

      </div>

    </div>
  )
}

export default Home

