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

function TreeColoring({ onBack }: Props) {
  const [color, setColor] = useState("#22C55E")

  const [parts, setParts] = useState({
    leaf1: "#FFFFFF",
    leaf2: "#FFFFFF",
    leaf3: "#FFFFFF",
    trunk: "#FFFFFF",
    grass: "#FFFFFF",
    apple: "#FFFFFF",
  })

  const paint = (part: keyof typeof parts) => {
    setParts({
      ...parts,
      [part]: color,
    })
  }

  const reset = () => {
    setParts({
      leaf1: "#FFFFFF",
      leaf2: "#FFFFFF",
      leaf3: "#FFFFFF",
      trunk: "#FFFFFF",
      grass: "#FFFFFF",
      apple: "#FFFFFF",
    })
  }

  return (
    <div className="min-h-screen bg-yellow-100 p-5">

      <Header title="🌳 Mewarnai Pohon" onBack={onBack} />

      <ColorPicker color={color} setColor={setColor} />

      <div className="flex justify-center mt-6">

        <div className="bg-white rounded-3xl shadow-xl p-5">

          <svg
            width="350"
            height="350"
            viewBox="0 0 350 350"
            className="max-w-full"
          >

            {/* DAUN KIRI */}
            <circle
              cx="115"
              cy="115"
              r="60"
              fill={parts.leaf1}
              stroke="black"
              strokeWidth="6"
              onClick={() => paint("leaf1")}
            />

            {/* DAUN TENGAH */}
            <circle
              cx="175"
              cy="80"
              r="65"
              fill={parts.leaf2}
              stroke="black"
              strokeWidth="6"
              onClick={() => paint("leaf2")}
            />

            {/* DAUN KANAN */}
            <circle
              cx="235"
              cy="115"
              r="60"
              fill={parts.leaf3}
              stroke="black"
              strokeWidth="6"
              onClick={() => paint("leaf3")}
            />

            {/* BATANG */}
            <path
              d="M145 155 L205 155 L215 290 L135 290 Z"
              fill={parts.trunk}
              stroke="black"
              strokeWidth="6"
              onClick={() => paint("trunk")}
            />

            {/* APEL */}
            <circle
              cx="115"
              cy="120"
              r="14"
              fill={parts.apple}
              stroke="black"
              strokeWidth="4"
              onClick={() => paint("apple")}
            />

            <circle
              cx="245"
              cy="140"
              r="14"
              fill={parts.apple}
              stroke="black"
              strokeWidth="4"
              onClick={() => paint("apple")}
            />

            {/* RUMPUT */}
            <path
              d="M55 290 Q175 270 295 290 L300 320 L50 320 Z"
              fill={parts.grass}
              stroke="black"
              strokeWidth="6"
              onClick={() => paint("grass")}
            />

          </svg>

        </div>

      </div>

      <BottomButtons reset={reset} onBack={onBack} />

    </div>
  )
}

export default TreeColoring


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