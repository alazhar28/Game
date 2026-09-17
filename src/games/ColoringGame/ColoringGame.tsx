import { useState } from "react"
import ChickenColoring from "./ChickenColoring"
import ButterflyColoring from "./ButterflyColoring"
import CatColoring from "./CatColoring"
import RainbowColoring from "./RainbowColoring"
import TreeColoring from "./TreeColoring"
import CarColoring from "./CarColoring"



type Picture = {
  id: string
  emoji: string
  title: string
}

const pictures: Picture[] = [
  {
    id: "chicken",
    emoji: "🐔",
    title: "Ayam",
  },
  {
    id: "butterfly",
    emoji: "🦋",
    title: "Kupu-kupu",
  },
  {
    id: "cat",
    emoji: "🐱",
    title: "Kucing",
  },
  {
    id: "rainbow",
    emoji: "🌈",
    title: "Pelangi",
  },
  {
    id: "tree",
    emoji: "🌳",
    title: "Pohon",
  },
  {
    id: "car",
    emoji: "🚗",
    title: "Mobil",
  },
]

function ColoringGame() {

  const [selectedPicture, setSelectedPicture] =
    useState<string | null>(null)

  const backToPictures = () => {
    setSelectedPicture(null)
  }

  // Jika sudah memilih gambar
  if (selectedPicture === "chicken") {
    return (
      <ChickenColoring
        onBack={backToPictures}
      />
    )
  }

  if (selectedPicture === "butterfly") {
    return (
      <ButterflyColoring
        onBack={backToPictures}
      />
    )
  }

  if (selectedPicture === "cat") {
    return (
      <CatColoring
        onBack={backToPictures}
      />
    )
  }

  if (selectedPicture === "rainbow") {
    return (
      <RainbowColoring
        onBack={backToPictures}
      />
    )
  }

  if (selectedPicture === "tree") {
    return (
      <TreeColoring
        onBack={backToPictures}
      />
    )
  }

  if (selectedPicture === "car") {
    return (
      <CarColoring
        onBack={backToPictures}
      />
    )
  }

  // MENU PILIH GAMBAR
  return (
    <div className="min-h-screen bg-yellow-100 p-6">

      <div className="max-w-5xl mx-auto">

        <div className="text-center">

          <div className="text-6xl">
            🎨
          </div>

          <h1 className="
            text-4xl
            md:text-5xl
            font-bold
            text-purple-600
            mt-2
          ">
            Game Mewarnai
          </h1>

          <p className="
            text-lg
            md:text-xl
            text-gray-600
            mt-3
          ">
            Yuk pilih gambar yang mau diwarnai! 🌈
          </p>

        </div>

        <div className="
          grid
          grid-cols-2
          md:grid-cols-3
          gap-5
          mt-10
        ">

          {pictures.map((picture) => (

            <button
              key={picture.id}
              onClick={() =>
                setSelectedPicture(picture.id)
              }
              className="
                bg-white
                rounded-3xl
                p-6
                shadow-lg
                hover:scale-105
                active:scale-95
                transition
              "
            >

              <div className="text-7xl">
                {picture.emoji}
              </div>

              <h2 className="
                text-xl
                font-bold
                mt-4
                text-gray-700
              ">
                {picture.title}
              </h2>

              <div className="
                mt-3
                inline-block
                bg-purple-100
                text-purple-600
                px-4
                py-2
                rounded-full
                font-bold
              ">
                🎨 Warnai
              </div>

            </button>

          ))}

        </div>

      </div>

    </div>
  )
}

export default ColoringGame