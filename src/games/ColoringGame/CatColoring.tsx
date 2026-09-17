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

function CatColoring({ onBack }: Props) {
  const [color, setColor] = useState("#F97316")

  const [parts, setParts] = useState({
    body: "#FFFFFF",
    head: "#FFFFFF",
    earLeft: "#FFFFFF",
    earRight: "#FFFFFF",
    tail: "#FFFFFF",
    belly: "#FFFFFF",
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
      head: "#FFFFFF",
      earLeft: "#FFFFFF",
      earRight: "#FFFFFF",
      tail: "#FFFFFF",
      belly: "#FFFFFF",
    })
  }

  return (
    <div className="min-h-screen bg-yellow-100 p-5">

      <Header title="🐱 Mewarnai Kucing" onBack={onBack} />

      <ColorPicker color={color} setColor={setColor} />

      <div className="flex justify-center mt-6">

        <div className="bg-white rounded-3xl shadow-xl p-5">

          <svg
            width="350"
            height="350"
            viewBox="0 0 350 350"
            className="max-w-full"
          >

            {/* BADAN */}
            <ellipse
              cx="175"
              cy="220"
              rx="75"
              ry="85"
              fill={parts.body}
              stroke="black"
              strokeWidth="6"
              onClick={() => paint("body")}
            />

            {/* KEPALA */}
            <circle
              cx="175"
              cy="130"
              r="70"
              fill={parts.head}
              stroke="black"
              strokeWidth="6"
              onClick={() => paint("head")}
            />

            {/* TELINGA KIRI */}
            <path
              d="M120 90 L120 35 L160 75 Z"
              fill={parts.earLeft}
              stroke="black"
              strokeWidth="6"
              onClick={() => paint("earLeft")}
            />

            {/* TELINGA KANAN */}
            <path
              d="M230 90 L230 35 L190 75 Z"
              fill={parts.earRight}
              stroke="black"
              strokeWidth="6"
              onClick={() => paint("earRight")}
            />

            {/* MATA */}
            <circle cx="150" cy="125" r="7" />
            <circle cx="200" cy="125" r="7" />

            {/* HIDUNG */}
            <path
              d="M165 145 Q175 155 185 145 Q175 135 165 145"
              fill="#FCA5A5"
              stroke="black"
              strokeWidth="3"
            />

            {/* MULUT */}
            <path
              d="M175 155 L175 170 M175 165 Q160 180 150 170 M175 165 Q190 180 200 170"
              fill="none"
              stroke="black"
              strokeWidth="4"
            />

            {/* KUMIS */}
            <path
              d="M135 150 L85 140
                 M135 160 L80 165
                 M215 150 L265 140
                 M215 160 L270 165"
              fill="none"
              stroke="black"
              strokeWidth="3"
            />

            {/* PERUT */}
            <ellipse
              cx="175"
              cy="225"
              rx="40"
              ry="50"
              fill={parts.belly}
              stroke="black"
              strokeWidth="5"
              onClick={() => paint("belly")}
            />

            {/* EKOR */}
            <path
              d="M240 220
                 C315 190 310 280 260 270
                 C290 250 280 225 250 240"
              fill={parts.tail}
              stroke="black"
              strokeWidth="7"
              onClick={() => paint("tail")}
            />

          </svg>

        </div>

      </div>

      <BottomButtons reset={reset} onBack={onBack} />

    </div>
  )
}

export default CatColoring


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