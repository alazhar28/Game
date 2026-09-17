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

function ButterflyColoring({ onBack }: Props) {
  const [color, setColor] = useState("#EF4444")

  const [parts, setParts] = useState({
    leftWing: "#FFFFFF",
    rightWing: "#FFFFFF",
    leftBottom: "#FFFFFF",
    rightBottom: "#FFFFFF",
    body: "#FFFFFF",
  })

  const paint = (part: keyof typeof parts) => {
    setParts({
      ...parts,
      [part]: color,
    })
  }

  const reset = () => {
    setParts({
      leftWing: "#FFFFFF",
      rightWing: "#FFFFFF",
      leftBottom: "#FFFFFF",
      rightBottom: "#FFFFFF",
      body: "#FFFFFF",
    })
  }

  return (
    <div className="min-h-screen bg-yellow-100 p-5">

      <Header title="🦋 Mewarnai Kupu-kupu" onBack={onBack} />

      <ColorPicker color={color} setColor={setColor} />

      <div className="flex justify-center mt-6">

        <div className="bg-white rounded-3xl shadow-xl p-5">

          <svg
            width="350"
            height="350"
            viewBox="0 0 350 350"
            className="max-w-full"
          >

            {/* SAYAP KIRI ATAS */}
            <path
              d="M170 165
                 C145 70 55 55 45 125
                 C38 175 95 190 165 185 Z"
              fill={parts.leftWing}
              stroke="black"
              strokeWidth="6"
              onClick={() => paint("leftWing")}
            />

            {/* SAYAP KANAN ATAS */}
            <path
              d="M180 165
                 C205 70 295 55 305 125
                 C312 175 255 190 185 185 Z"
              fill={parts.rightWing}
              stroke="black"
              strokeWidth="6"
              onClick={() => paint("rightWing")}
            />

            {/* SAYAP KIRI BAWAH */}
            <path
              d="M165 180
                 C105 175 60 195 75 245
                 C90 285 140 250 170 200 Z"
              fill={parts.leftBottom}
              stroke="black"
              strokeWidth="6"
              onClick={() => paint("leftBottom")}
            />

            {/* SAYAP KANAN BAWAH */}
            <path
              d="M185 180
                 C245 175 290 195 275 245
                 C260 285 210 250 180 200 Z"
              fill={parts.rightBottom}
              stroke="black"
              strokeWidth="6"
              onClick={() => paint("rightBottom")}
            />

            {/* BADAN */}
            <ellipse
              cx="175"
              cy="190"
              rx="18"
              ry="70"
              fill={parts.body}
              stroke="black"
              strokeWidth="6"
              onClick={() => paint("body")}
            />

            {/* KEPALA */}
            <circle
              cx="175"
              cy="115"
              r="22"
              fill={parts.body}
              stroke="black"
              strokeWidth="5"
            />

            {/* MATA */}
            <circle cx="168" cy="110" r="3" />
            <circle cx="182" cy="110" r="3" />

            {/* ANTENA */}
            <path
              d="M168 98 Q145 65 130 75"
              fill="none"
              stroke="black"
              strokeWidth="5"
            />

            <path
              d="M182 98 Q205 65 220 75"
              fill="none"
              stroke="black"
              strokeWidth="5"
            />

            <circle cx="128" cy="74" r="5" />
            <circle cx="222" cy="74" r="5" />

          </svg>

        </div>

      </div>

      <BottomButtons reset={reset} onBack={onBack} />

    </div>
  )
}

export default ButterflyColoring


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