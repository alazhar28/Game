
import { useState } from "react"
import { BackHomeButton } from "../../components/BackButton"

type Category = "darat" | "air" | "udara"

type Animal = {
  id: number
  name: string
  image: string
  category: Category
}

const animalData: Animal[] = [
  { id: 1, name: "Singa", image: "singa.png", category: "darat" },
  { id: 2, name: "Gajah", image: "gajah.png", category: "darat" },
  { id: 3, name: "Monyet", image: "monyet.png", category: "darat" },
  { id: 4, name: "Sapi", image: "sapi.png", category: "darat" },
  { id: 5, name: "Jerapah", image: "jerapah.png", category: "darat" },

  { id: 6, name: "Ikan", image: "ikan.png", category: "air" },
  { id: 7, name: "Lumba-lumba", image: "lumba.png", category: "air" },
  { id: 8, name: "Hiu", image: "hiu.png", category: "air" },
  { id: 9, name: "Gurita", image: "gurita.png", category: "air" },
  { id: 10, name: "Penyu", image: "penyu.png", category: "air" },

  { id: 11, name: "Capung", image: "capung.png", category: "udara" },
  { id: 12, name: "Kupu-kupu", image: "kupu.png", category: "udara" },
  { id: 13, name: "Burung", image: "burung.png", category: "udara" },
  { id: 14, name: "Burung Hantu", image: "bhantu.png", category: "udara" },
  { id: 15, name: "Lebah", image: "lebah.png", category: "udara" },
]

const imagePath = "/images/animal-grouping/"

const categories = [
  {
    category: "darat" as Category,
    title: "DARAT",
    image: "darat.png",
    color: "border-green-400",
  },
  {
    category: "air" as Category,
    title: "LAUT",
    image: "air.png",
    color: "border-blue-400",
  },
  {
    category: "udara" as Category,
    title: "UDARA",
    image: "udara.png",
    color: "border-yellow-400",
  },
]

export default function AnimalGroupingGame() {
  const [selectedCategory, setSelectedCategory] =
    useState<Category | null>(null)

  const [placed, setPlaced] = useState<number[]>([])
  const [feedback, setFeedback] = useState("")
  const [finished, setFinished] = useState(false)

  const selectedZone = categories.find(
    (item) => item.category === selectedCategory
  )

  const targetAnimals = animalData.filter(
    (animal) => animal.category === selectedCategory
  )

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    animalId: number
  ) => {
    e.dataTransfer.setData("animalId", animalId.toString())
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()

    const animalId = Number(e.dataTransfer.getData("animalId"))
    const animal = animalData.find((item) => item.id === animalId)

    if (!animal || placed.includes(animalId)) return

    if (animal.category === selectedCategory) {
      const newPlaced = [...placed, animalId]

      setPlaced(newPlaced)
      setFeedback("benar")

      if (newPlaced.length === targetAnimals.length) {
        setFinished(true)
      }
    } else {
      setFeedback("salah")
    }

    setTimeout(() => setFeedback(""), 1200)
  }

  const chooseCategory = (category: Category) => {
    setSelectedCategory(category)
    setPlaced([])
    setFeedback("")
    setFinished(false)
  }

  const backToCategories = () => {
    setSelectedCategory(null)
    setPlaced([])
    setFeedback("")
    setFinished(false)
  }

  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* BACKGROUND */}
      <div
        className="fixed inset-0 bg-cover bg-center blur-[1px] scale-105"
        style={{
          backgroundImage: "url('/images/background2.png')",
        }}
      />

      <div className="fixed inset-0 bg-white/40" />

      <div className="relative z-10 min-h-screen p-4 md:p-6">

        <div className="max-w-7xl mx-auto pt-16">
                
                
        {/* HOME */}
        <BackHomeButton />

          {/* HALAMAN PILIHAN */}
            {!selectedCategory && (
            <div className="text-center">

                <h1 className="text-3xl md:text-5xl font-extrabold text-blue-600 mb-10">
                🦖 Dimana ya tinggalnya? 🦕
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">

                {categories.map((item) => (
                    <button
                    key={item.category}
                    onClick={() => chooseCategory(item.category)}
                    className="relative overflow-hidden rounded-3xl shadow-xl
                     h-100 md:h-80
                    hover:scale-105 transition group"
                    >

                    {/* GAMBAR MEMENUHI KARTU */}
                    <img
                        src={imagePath + item.image}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover
                        group-hover:scale-110 transition duration-500"
                    />

                    {/* LAPISAN AGAR TULISAN JELAS */}
                    <div className="absolute inset-0 bg-black/10" />

                    {/* NAMA TEMPAT */}
                    <div className="absolute bottom-0 left-0 right-0
                    bg-black/30 py-4">
                        <h2 className="text-3xl font-extrabold text-white drop-shadow-lg">
                        {item.title}
                        </h2>
                    </div>

                    </button>
                ))}

                </div>
            </div>
            )}

          {/* HALAMAN PERMAINAN */}
          {selectedCategory && selectedZone && !finished && (
            <div>

              <div className="flex justify-center mb-4">
                <h1 className="bg-white/30 rounded-full px-8 py-3 text-2xl md:text-4xl font-extrabold text-blue-600 shadow">
                  🐾 {selectedZone.title}
                </h1>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* KUMPULAN HEWAN */}
                <div className="bg-white/30 rounded-3xl shadow-xl p-5 min-h-[450px] h-[450px]">
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 min-h-full content-start">

                    {animalData
                      .filter((animal) => !placed.includes(animal.id))
                      .map((animal) => (
                        <div
                          key={animal.id}
                          draggable
                          onDragStart={(e) =>
                            handleDragStart(e, animal.id)
                          }
                          className="bg-blue-50  rounded-2xl p-2 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing hover:scale-105 transition min-h-[110px]"
                        >
                          <img
                            src={imagePath + animal.image}
                            alt={animal.name}
                            draggable={false}
                            className="w-16 h-16 md:w-20 md:h-20 object-contain pointer-events-none"
                          />

                          <p className="font-bold text-gray-700 text-sm text-center mt-1">
                            {animal.name}
                          </p>
                        </div>
                      ))}

                  </div>
                </div>

                {/* GAMBAR TEMPAT TINGGAL */}
                <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className={`relative group overflow-hidden rounded-3xl shadow-xl h-[450px] min-h-[450px] ${selectedCategory === "darat"
                ? "bg-green-100"
                : selectedCategory === "air"
                ? "bg-blue-100"
                : "bg-yellow-100"
                }`}
                    >

                  {/* GAMBAR LATAR */}
                 <img
                    src={imagePath + selectedZone.image}
                    alt={selectedZone.title}
                    className="absolute inset-0 w-full h-full object-cover
                    group-hover:scale-110 transition-transform duration-500"
                    />
                  {/* HEWAN YANG BERHASIL DILETAKKAN */}
                  <div className="relative z-10 grid grid-cols-3 gap-3 p-5 h-full content-end">

                    {animalData
                      .filter((animal) => placed.includes(animal.id))
                      .map((animal) => (
                        <div
                            key={animal.id}
                            className="flex flex-col items-center justify-center"
                            >
                            <img
                                src={imagePath + animal.image}
                                alt={animal.name}
                                className="w-20 h-20 md:w-28 md:h-28 object-contain drop-shadow-lg"
                            />
                            </div>
                      ))}

                    {placed.length === 0 && (
                      <div className="col-span-3 flex items-center justify-center">
                        <div className="bg-white/80 rounded-2xl px-6 py-4 text-5xl">
                          👇
                        </div>
                      </div>
                    )}

                  </div>
                </div>

              </div>

              {/* FEEDBACK */}
              {feedback && (
                <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none">
                  <div
                    className={`rounded-3xl px-10 py-8 text-7xl shadow-2xl ${
                      feedback === "benar"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-red-100 text-red-500"
                    }`}
                  >
                    {feedback === "benar" ? "✓ ⭐" : "✕ 😢"}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* HALAMAN SELESAI */}
          {finished && (
            <div className="max-w-xl mx-auto bg-white/95 rounded-3xl shadow-xl p-8 text-center mt-12">

              <div className="text-8xl mb-5">🎉</div>

              <h2 className="text-4xl font-extrabold text-blue-600">
                Hebat Sekali!
              </h2>

              <div className="text-7xl mt-6">
                ⭐⭐⭐⭐⭐
              </div>

              <button
                onClick={backToCategories}
                className="mt-8 bg-green-500 hover:bg-green-600 text-white text-xl font-bold px-10 py-4 rounded-2xl shadow-lg"
              >
                🔄 Main Lagi
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  )
}
