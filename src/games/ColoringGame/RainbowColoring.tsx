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

function RainbowColoring({ onBack }: Props) {
  const [color, setColor] = useState("#EF4444")

  const [parts, setParts] = useState({
    arc1: "#FFFFFF",
    arc2: "#FFFFFF",
    arc3: "#FFFFFF",
    arc4: "#FFFFFF",
    arc5: "#FFFFFF",
  })

  const paint = (part: keyof typeof parts) => {
    setParts({
      ...parts,
      [part]: color,
    })
  }

  const reset = () => {
    setParts({
      arc1: "#FFFFFF",
      arc2: "#FFFFFF",
      arc3: "#FFFFFF",
      arc4: "#FFFFFF",
      arc5: "#FFFFFF",
    })
  }

  return (
    <div className="min-h-screen bg-yellow-100 p-5">

      <Header title="🌈 Mewarnai Pelangi" onBack={onBack} />

      <ColorPicker color={color} setColor={setColor} />

      <div className="flex justify-center mt-6">

        <div className="bg-white rounded-3xl shadow-xl p-5">

          <svg
            width="350"
            height="350"
            viewBox="0 0 350 350"
            className="max-w-full"
          >

            {/* PELANGI LUAR */}
            <path
              d="M45 250
                 A130 130 0 0 1 305 250"
              fill="none"
              stroke={parts.arc1}
              strokeWidth="35"
              onClick={() => paint("arc1")}
            />

            {/* PELANGI 2 */}
            <path
              d="M70 250
                 A105 105 0 0 1 280 250"
              fill="none"
              stroke={parts.arc2}
              strokeWidth="35"
              onClick={() => paint("arc2")}
            />

            {/* PELANGI 3 */}
            <path
              d="M95 250
                 A80 80 0 0 1 255 250"
              fill="none"
              stroke={parts.arc3}
              strokeWidth="35"
              onClick={() => paint("arc3")}
            />

            {/* PELANGI 4 */}
            <path
              d="M120 250
                 A55 55 0 0 1 230 250"
              fill="none"
              stroke={parts.arc4}
              strokeWidth="35"
              onClick={() => paint("arc4")}
            />

            {/* PELANGI 5 */}
            <path
              d="M145 250
                 A30 30 0 0 1 205 250"
              fill="none"
              stroke={parts.arc5}
              strokeWidth="25"
              onClick={() => paint("arc5")}
            />

            {/* AWAN */}
            <path
              d="M35 255
                 C30 230 65 220 80 240
                 C90 210 135 215 140 245
                 C155 225 190 235 185 260
                 L35 260 Z"
              fill="white"
              stroke="black"
              strokeWidth="5"
            />

            <path
              d="M165 260
                 C160 235 195 225 210 245
                 C220 215 265 220 270 250
                 C285 230 320 240 315 265
                 L165 265 Z"
              fill="white"
              stroke="black"
              strokeWidth="5"
            />

          </svg>

        </div>

      </div>

      <BottomButtons reset={reset} onBack={onBack} />

    </div>
  )
}

export default RainbowColoring


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