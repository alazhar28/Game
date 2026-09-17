import { useState } from "react"

type Props = {
  onBack: () => void
}

const colors = [
  "#EF4444",
  "#F97316",
  "#FACC15",
  "#22C55E",
  "#3B82F6",
  "#A855F7",
  "#EC4899",
  "#92400E",
]

function CarColoring({ onBack }: Props) {
  const [color, setColor] = useState("#3B82F6")

  const [parts, setParts] = useState({
    body: "#FFFFFF",
    roof: "#FFFFFF",
    window: "#FFFFFF",
    door: "#FFFFFF",
    wheel: "#FFFFFF",
    light: "#FFFFFF",
  })

  const paint = (part: keyof typeof parts) => {
    setParts({
      ...parts,
      [part]: color,
    })
  }

  const reset = () => {
    setParts({
      body: "#FFFFFF",
      roof: "#FFFFFF",
      window: "#FFFFFF",
      door: "#FFFFFF",
      wheel: "#FFFFFF",
      light: "#FFFFFF",
    })
  }

  return (
    <div className="min-h-screen bg-yellow-100 p-5">

      <Header title="🚗 Mewarnai Mobil" onBack={onBack} />

      <ColorPicker color={color} setColor={setColor} />

      <div className="flex justify-center mt-6">

        <div className="bg-white rounded-3xl shadow-xl p-5">

          <svg
            width="350"
            height="350"
            viewBox="0 0 350 350"
            className="max-w-full"
          >

            {/* BADAN MOBIL */}
            <path
              d="M45 220
                 L70 170
                 L125 170
                 L155 120
                 L230 120
                 L270 170
                 L300 180
                 L315 220
                 L315 255
                 L45 255 Z"
              fill={parts.body}
              stroke="black"
              strokeWidth="6"
              onClick={() => paint("body")}
            />

            {/* ATAP */}
            <path
              d="M125 170
                 L155 120
                 L230 120
                 L270 170 Z"
              fill={parts.roof}
              stroke="black"
              strokeWidth="6"
              onClick={() => paint("roof")}
            />

            {/* KACA KIRI */}
            <path
              d="M145 160 L160 130 L190 130 L190 165 Z"
              fill={parts.window}
              stroke="black"
              strokeWidth="5"
              onClick={() => paint("window")}
            />

            {/* KACA KANAN */}
            <path
              d="M200 130 L225 130 L255 165 L200 165 Z"
              fill={parts.window}
              stroke="black"
              strokeWidth="5"
              onClick={() => paint("window")}
            />

            {/* PINTU */}
            <path
              d="M195 175 L245 175 L245 235 L195 235 Z"
              fill={parts.door}
              stroke="black"
              strokeWidth="5"
              onClick={() => paint("door")}
            />

            {/* HANDLE */}
            <path
              d="M220 190 L235 190"
              stroke="black"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* LAMPU */}
            <ellipse
              cx="65"
              cy="205"
              rx="15"
              ry="12"
              fill={parts.light}
              stroke="black"
              strokeWidth="4"
              onClick={() => paint("light")}
            />

            <ellipse
              cx="295"
              cy="205"
              rx="15"
              ry="12"
              fill={parts.light}
              stroke="black"
              strokeWidth="4"
              onClick={() => paint("light")}
            />

            {/* RODA KIRI */}
            <circle
              cx="105"
              cy="255"
              r="35"
              fill={parts.wheel}
              stroke="black"
              strokeWidth="6"
              onClick={() => paint("wheel")}
            />

            <circle
              cx="105"
              cy="255"
              r="14"
              fill="white"
              stroke="black"
              strokeWidth="4"
            />

            {/* RODA KANAN */}
            <circle
              cx="265"
              cy="255"
              r="35"
              fill={parts.wheel}
              stroke="black"
              strokeWidth="6"
              onClick={() => paint("wheel")}
            />

            <circle
              cx="265"
              cy="255"
              r="14"
              fill="white"
              stroke="black"
              strokeWidth="4"
            />

            {/* JALAN */}
            <path
              d="M35 300 L315 300"
              stroke="black"
              strokeWidth="7"
              strokeLinecap="round"
            />

          </svg>

        </div>

      </div>

      <BottomButtons reset={reset} onBack={onBack} />

    </div>
  )
}

export default CarColoring


function Header({
  title,
  onBack,
}: {
  title: string
  onBack: () => void
}) {
  return (
    <div className="max-w-3xl mx-auto">

      <button
        onClick={onBack}
        className="bg-white px-5 py-2 rounded-full shadow font-bold"
      >
        ← Pilih Gambar
      </button>

      <h1 className="text-3xl md:text-4xl text-center font-bold text-purple-600 mt-5">
        {title}
      </h1>

    </div>
  )
}


function ColorPicker({
  color,
  setColor,
}: {
  color: string
  setColor: (color: string) => void
}) {
  return (
    <div className="max-w-xl mx-auto bg-white rounded-3xl shadow p-4 mt-5">

      <p className="text-center font-bold mb-3">
        🌈 Pilih Warna
      </p>

      <div className="flex justify-center gap-3 flex-wrap">

        {colors.map((item) => (
          <button
            key={item}
            onClick={() => setColor(item)}
            className={`
              w-11 h-11 rounded-full border-4
              hover:scale-110 transition
              ${
                color === item
                  ? "border-gray-800 scale-110"
                  : "border-white"
              }
            `}
            style={{ backgroundColor: item }}
          />
        ))}

      </div>

    </div>
  )
}


function BottomButtons({
  reset,
  onBack,
}: {
  reset: () => void
  onBack: () => void
}) {
  return (
    <div className="flex justify-center gap-3 mt-6 flex-wrap">

      <button
        onClick={reset}
        className="bg-white px-6 py-3 rounded-full shadow font-bold"
      >
        🔄 Hapus Warna
      </button>

      <button
        onClick={onBack}
        className="bg-purple-500 text-white px-6 py-3 rounded-full shadow font-bold"
      >
        🎨 Gambar Lain
      </button>

    </div>
  )
}