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

function ChickenColoring({ onBack }: Props) {

  const [color, setColor] = useState("#EF4444")

  const [parts, setParts] = useState({
    body: "#FFFFFF",
    wing: "#FFFFFF",
    tail: "#FFFFFF",
    beak: "#FFFFFF",
    leg: "#FFFFFF",
  })

  const paint = (
    part: keyof typeof parts
  ) => {
    setParts({
      ...parts,
      [part]: color,
    })
  }

  const reset = () => {
    setParts({
      body: "#FFFFFF",
      wing: "#FFFFFF",
      tail: "#FFFFFF",
      beak: "#FFFFFF",
      leg: "#FFFFFF",
    })
  }

  return (
    <div className="min-h-screen bg-yellow-100 p-5">

      <Header
        title="🐔 Mewarnai Ayam"
        onBack={onBack}
      />

      <ColorPicker
        color={color}
        setColor={setColor}
      />

      <div className="
        flex
        justify-center
        mt-6
      ">

        <div className="
          bg-white
          rounded-3xl
          shadow-xl
          p-5
        ">

          <svg
            width="350"
            height="350"
            viewBox="0 0 350 350"
            className="max-w-full"
          >

            <ellipse
              cx="170"
              cy="205"
              rx="95"
              ry="75"
              fill={parts.body}
              stroke="black"
              strokeWidth="6"
              onClick={() => paint("body")}
            />

            <ellipse
              cx="135"
              cy="205"
              rx="45"
              ry="35"
              fill={parts.wing}
              stroke="black"
              strokeWidth="5"
              onClick={() => paint("wing")}
            />

            <path
              d="M75 180 Q25 130 55 105 Q95 125 100 165"
              fill={parts.tail}
              stroke="black"
              strokeWidth="6"
              onClick={() => paint("tail")}
            />

            <circle
              cx="245"
              cy="125"
              r="55"
              fill={parts.body}
              stroke="black"
              strokeWidth="6"
              onClick={() => paint("body")}
            />

            <circle
              cx="265"
              cy="115"
              r="7"
            />

            <path
              d="M220 75 Q225 45 240 65 Q250 35 260 65 Q280 50 275 85"
              fill="#EF4444"
              stroke="black"
              strokeWidth="5"
            />

            <path
              d="M292 125 L325 140 L292 150 Z"
              fill={parts.beak}
              stroke="black"
              strokeWidth="5"
              onClick={() => paint("beak")}
            />

            <path
              d="M145 270 L140 310 M190 270 L195 310"
              stroke={parts.leg}
              strokeWidth="10"
              strokeLinecap="round"
            />

          </svg>

        </div>

      </div>

      <BottomButtons
        reset={reset}
        onBack={onBack}
      />

    </div>
  )
}

export default ChickenColoring


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
        className="
          bg-white
          px-5
          py-2
          rounded-full
          shadow
          font-bold
        "
      >
        ← Pilih Gambar
      </button>

      <h1 className="
        text-3xl
        md:text-4xl
        text-center
        font-bold
        text-purple-600
        mt-5
      ">
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
    <div className="
      max-w-xl
      mx-auto
      bg-white
      rounded-3xl
      shadow
      p-4
      mt-5
    ">

      <p className="text-center font-bold mb-3">
        🌈 Pilih Warna
      </p>

      <div className="
        flex
        justify-center
        gap-3
        flex-wrap
      ">

        {colors.map((item) => (

          <button
            key={item}
            onClick={() => setColor(item)}
            className={`
              w-11
              h-11
              rounded-full
              border-4
              hover:scale-110
              transition
              ${
                color === item
                  ? "border-gray-800 scale-110"
                  : "border-white"
              }
            `}
            style={{
              backgroundColor: item,
            }}
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
    <div className="
      flex
      justify-center
      gap-3
      mt-6
    ">

      <button
        onClick={reset}
        className="
          bg-white
          px-6
          py-3
          rounded-full
          shadow
          font-bold
        "
      >
        🔄 Hapus Warna
      </button>

      <button
        onClick={onBack}
        className="
          bg-purple-500
          text-white
          px-6
          py-3
          rounded-full
          shadow
          font-bold
        "
      >
        🎨 Gambar Lain
      </button>

    </div>
  )
}