
import { useState } from "react"
import { BackHomeButton } from "../../components/BackButton"

type ShapeType =
  | "segitiga"
  | "lingkaran"
  | "kotak"
  | "bintang"
  | "segilima"

type ShapeItem = {
  id: number
  type: ShapeType
  color: string
}

type Round = {
  target: ShapeType
  answer: number
  items: ShapeItem[]
}

type GoatOption = {
  id: number
  image: string
  name: string
}

const TOTAL_QUESTIONS = 10

// =====================================
// PILIHAN GAMBAR HEWAN
// =====================================

const imagePath = "/images/animal-grouping/"

const goatOptions: GoatOption[] = [
  {
    id: 1,
    image: imagePath + "kambing-a.png",
    name: "Kambing 1",
  },
  {
    id: 2,
    image: imagePath + "kambing-b.png",
    name: "Kambing 2",
  },
  {
    id: 3,
    image: imagePath + "kambing-c.png",
    name: "Kambing 3",
  },
]

// =====================================
// PILIHAN BANGUN DATAR
// =====================================

const shapes: { type: ShapeType; name: string }[] = [
  { type: "segitiga", name: "Segitiga" },
  { type: "lingkaran", name: "Lingkaran" },
  { type: "kotak", name: "Persegi" },
  { type: "bintang", name: "Bintang" },
  { type: "segilima", name: "Segi Lima" },
]

// WARNA ACAK
const colors = [
  "#FF6969",
  "#45B8E8",
  "#F8B83E",
  "#A879E8",
  "#58C98A",
  "#FF8BC2",
  "#FF9F43",
  "#36CFC9",
]

// =====================================
// ACAK ARRAY
// =====================================

function shuffle<T,>(array: T[]): T[] {
  const result = [...array]

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }

  return result
}

// =====================================
// ANGKA ACAK
// =====================================

function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// =====================================
// MEMBUAT SOAL
// =====================================

function createRound(): Round {
  const target = shuffle(shapes)[0].type
  const answer = randomNumber(3, 5)

  const items: ShapeItem[] = []
  let id = 0

  // Masukkan bentuk yang menjadi jawaban
  for (let i = 0; i < answer; i++) {
    items.push({
      id: id++,
      type: target,
      color: colors[randomNumber(0, colors.length - 1)],
    })
  }

  // Masukkan bentuk pengganggu
  shapes.forEach((shape) => {
    if (shape.type !== target) {
      const total = randomNumber(2, 4)

      for (let i = 0; i < total; i++) {
        items.push({
          id: id++,
          type: shape.type,
          color: colors[randomNumber(0, colors.length - 1)],
        })
      }
    }
  })

  return {
    target,
    answer,
    items: shuffle(items),
  }
}

// =====================================
// GAMBAR BANGUN DATAR
// =====================================

function ShapeDrawing({
  type,
  color,
}: {
  type: ShapeType
  color: string
}) {
  const starPoints = Array.from({ length: 10 }, (_, i) => {
    const angle = (Math.PI / 5) * i - Math.PI / 2
    const radius = i % 2 === 0 ? 25 : 12

    return `${30 + Math.cos(angle) * radius},${30 + Math.sin(angle) * radius}`
  }).join(" ")

  return (
    <svg viewBox="0 0 60 60" className="w-full h-full">
      <g
        fill={color}
        stroke="white"
        strokeWidth="2.5"
        strokeLinejoin="round"
      >
        {type === "segitiga" && (
          <polygon points="30,4 56,53 4,53" />
        )}

        {type === "lingkaran" && (
          <circle cx="30" cy="30" r="25" />
        )}

        {type === "kotak" && (
          <rect x="5" y="5" width="50" height="50" rx="5" />
        )}

        {type === "bintang" && (
          <polygon points={starPoints} />
        )}

        {type === "segilima" && (
          <polygon points="30,4 56,23 46,55 14,55 4,23" />
        )}
      </g>
    </svg>
  )
}

// =====================================
// KOMPONEN GAME
// =====================================

export default function GoatFeedingGame() {
  const [round, setRound] = useState<Round>(() => createRound())

  const [selectedGoat, setSelectedGoat] = useState<GoatOption>(
    goatOptions[0]
  )

  const [gameStarted, setGameStarted] = useState(false)

  const [questionNumber, setQuestionNumber] = useState(0)
  const [score, setScore] = useState(0)

  const [fedCount, setFedCount] = useState(0)

  const [availableItems, setAvailableItems] = useState<ShapeItem[]>(round.items)

  const [draggingItem, setDraggingItem] = useState<ShapeItem | null>(null)

  const [feedback, setFeedback] = useState("")
  const [finished, setFinished] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  // =====================================
  // MULAI SOAL BERIKUTNYA
  // =====================================

  const nextQuestion = () => {
    if (questionNumber + 1 >= TOTAL_QUESTIONS) {
      setFinished(true)
      setFeedback("")
      setIsProcessing(false)
      return
    }

    const newRound = createRound()

    setRound(newRound)
    setAvailableItems(newRound.items)
    setFedCount(0)
    setQuestionNumber((current) => current + 1)
    setFeedback("")
    setIsProcessing(false)
  }

  // =====================================
  // MULAI GAME
  // =====================================

  const startGame = () => {
    const newRound = createRound()

    setRound(newRound)
    setAvailableItems(newRound.items)

    setQuestionNumber(0)
    setScore(0)
    setFedCount(0)

    setDraggingItem(null)
    setFeedback("")
    setFinished(false)
    setIsProcessing(false)

    setGameStarted(true)
  }

  // =====================================
  // DRAG MULAI
  // =====================================

  const handleDragStart = (item: ShapeItem) => {
    if (isProcessing) return
    setDraggingItem(item)
  }

  // =====================================
  // DROP KE HEWAN
  // =====================================

  const handleDrop = () => {
    if (!draggingItem || isProcessing || finished) return

    const droppedItem = draggingItem

    setDraggingItem(null)

    // Jika bentuk tidak sesuai
    if (droppedItem.type !== round.target) {
      setFeedback("salah")

      setTimeout(() => {
        setFeedback("")
      }, 1000)

      return
    }

    // Bentuk benar, hapus dari kumpulan makanan
    const remainingItems = availableItems.filter(
      (item) => item.id !== droppedItem.id
    )

    setAvailableItems(remainingItems)

    const newFedCount = fedCount + 1
    setFedCount(newFedCount)

    // Jika jumlah makanan sudah sesuai
    if (newFedCount === round.answer) {
      setIsProcessing(true)
      setFeedback("benar")
      setScore((current) => current + 10)

      setTimeout(() => {
        nextQuestion()
      }, 1400)
    }
  }

  // =====================================
  // ULANGI GAME
  // =====================================

  const restartGame = () => {
    setGameStarted(false)
    setFinished(false)
    setFeedback("")
    setDraggingItem(null)
    setIsProcessing(false)
  }

  return (
    <div className="relative min-h-screen overflow-hidden font-judul">

      {/* BACKGROUND */}
      <div
        className="fixed inset-0 bg-cover bg-center blur-[1px] scale-105"
        style={{
          backgroundImage: "url('/images/background2.png')",
        }}
      />

      <div className="fixed inset-0 bg-white/40" />

      <div className="relative z-10 min-h-screen p-4 md:p-6">

        <BackHomeButton />

        <div className="max-w-7xl mx-auto pt-0">

          {/* ================================= */}
          {/* HALAMAN PILIH HEWAN */}
          {/* ================================= */}

          {!gameStarted && !finished && (
            <div className="max-w-5xl mx-auto text-center pt-8">

              <h1 className="inline-block bg-white/30 rounded-full px-8 py-4 text-3xl md:text-5xl font-extrabold text-blue-600 shadow-xl">
                🐐 PILIH KAMBINGMU!
              </h1>

              <p className="text-xl md:text-2xl font-bold text-purple-700 mt-5 mb-8">
                Kambing mana yang ingin kamu beri makan?
              </p>

              {/* PILIHAN KAMBING */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

                {goatOptions.map((goat) => (

                  <button
                    key={goat.id}
                    onClick={() => setSelectedGoat(goat)}
                    className={`relative bg-white/30 rounded-3xl p-5 shadow-xl border-4 transition hover:scale-105 ${
                      selectedGoat.id === goat.id
                        ? "border-blue-700 bg-blue-50"
                        : "border-white hover:border-blue-300"
                    }`}
                  >

                    {selectedGoat.id === goat.id && (
                      <div className="absolute top-3 right-3 bg-blue-500 text-white rounded-full w-9 h-9 flex items-center justify-center text-xl font-bold shadow">
                        ✓
                      </div>
                    )}

                    <img
                      src={goat.image}
                      alt={goat.name}
                      draggable={false}
                      className="w-full h-56 object-contain"
                    />

                    <p className="text-xl font-extrabold text-blue-600 mt-3">
                      {goat.name}
                    </p>

                    {selectedGoat.id === goat.id && (
                      <p className="text-orange-600 font-bold mt-2">
                        Dipilih!
                      </p>
                    )}

                  </button>

                ))}

              </div>

              {/* TOMBOL MULAI */}
              <button
                onClick={startGame}
                className="mt-10 bg-blue-500 hover:bg-blue-600 text-white text-2xl font-extrabold px-12 py-5 rounded-3xl shadow-xl transition hover:scale-105"
              >
                🎮 MULAI BERMAIN
              </button>

            </div>
          )}

          {/* ================================= */}
          {/* HALAMAN PERMAINAN */}
          {/* ================================= */}

          {gameStarted && !finished && (
            <div>

              {/* JUDUL */}
              <div className="text-center mb-5">

                <h1 className="inline-block bg-white/70 rounded-full px-8 py-3 text-2xl md:text-4xl font-extrabold text-blue-600 shadow-lg">
                  🐐 AYO BERI MAKAN KAMBING!
                </h1>

              </div>

              {/* INFORMASI SOAL */}
              <div className="flex justify-center gap-3 mb-5">

                <div className="bg-white/80 rounded-2xl shadow px-6 py-3 text-center">
                  <p className="text-sm text-gray-500 font-bold">
                    SOAL
                  </p>

                  <p className="text-2xl font-bold text-blue-600">
                    {questionNumber + 1}/{TOTAL_QUESTIONS}
                  </p>
                </div>

                <div className="bg-white/80 rounded-2xl shadow px-6 py-3 text-center">
                  <p className="text-sm text-gray-500 font-bold">
                    SKOR
                  </p>

                  <p className="text-2xl font-bold text-orange-500">
                    ⭐ {score}
                  </p>
                </div>

              </div>

              {/* AREA GAME */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                {/* KAMBING KIRI */}
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  className={`relative bg-blue-50/90 border-4 rounded-3xl shadow-xl p-4 md:p-6 transition ${
                    draggingItem
                      ? "border-blue-500 bg-blue-100 scale-[1.01]"
                      : "border-blue-200"
                  }`}
                >

                  <div className="relative w-full max-w-xl mx-auto aspect-[10/8] flex items-center justify-center">

                    <img
                      src={selectedGoat.image}
                      alt="Kambing"
                      draggable={false}
                      className="w-full h-full object-contain"
                    />

                    {/* AREA DROP */}
                    {draggingItem && (
                      <div className="absolute inset-0 flex items-end justify-center pb-5 pointer-events-none">
                        <div className="bg-blue-500/90 text-white font-extrabold text-xl md:text-2xl rounded-2xl px-6 py-3 shadow-lg animate-bounce">
                          👇 LETAKKAN DI SINI
                        </div>
                      </div>
                    )}

                  </div>

                  {/* JUMLAH MAKANAN */}
                  <div className="bg-white rounded-2xl p-4 shadow-md mt-2">

                    <div className="flex justify-between items-center mb-2">
                      <p className="font-extrabold text-green-700">
                        🥬 Makanan kambing
                      </p>

                      <p className="font-extrabold text-orange-500 text-xl">
                        {fedCount}/{round.answer}
                      </p>
                    </div>

                    <div className="flex gap-2 justify-center flex-wrap">

                      {Array.from({ length: round.answer }).map((_, index) => (
                        <div
                          key={index}
                          className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center text-2xl ${
                            index < fedCount
                              ? "bg-green-200 border-green-400"
                              : "bg-gray-100 border-dashed border-gray-300"
                          }`}
                        >
                          {index < fedCount ? "🥬" : "?"}
                        </div>
                      ))}

                    </div>

                  </div>

                  <p className="text-center text-green-700 font-bold mt-3">
                    {draggingItem
                      ? "Lepaskan bangun datar di area kambing!"
                      : "Tarik makanan ke gambar kambing!"}
                  </p>

                </div>

                {/* PILIHAN BANGUN DATAR */}
                <div className="bg-purple-50/95 border-4 border-purple-200 rounded-3xl shadow-xl p-4 md:p-6">

                  <div className="text-center">

                    <p className="text-lg md:text-2xl font-bold text-yellow-800">
                      🥬 Beri makan kambing 🐐
                    </p>

                    <div className="flex items-center justify-center gap-2 mt-2 mb-4">

                      <h2 className="text-3xl md:text-4xl font-extrabold text-orange-600">
                        {round.answer}
                      </h2>

                      <div className="w-8 h-8 md:w-10 md:h-10">
                        <ShapeDrawing
                          type={round.target}
                          color="#45B8E8"
                        />
                      </div>

                    </div>

                  </div>

                  {/* DAFTAR BANGUN DATAR */}
                  <div className="bg-white/80 rounded-2xl p-3 min-h-[350px] max-h-[500px] overflow-y-auto">

                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">

                      {availableItems.map((item) => (

                        <div
                          key={item.id}
                          draggable={!isProcessing}
                          onDragStart={() => handleDragStart(item)}
                          onDragEnd={() => setDraggingItem(null)}
                          className={`aspect-square bg-white rounded-2xl shadow-md border-2 border-purple-100 p-2 flex items-center justify-center cursor-grab active:cursor-grabbing hover:scale-110 hover:border-purple-400 transition ${
                            isProcessing
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          <ShapeDrawing
                            type={item.type}
                            color={item.color}
                          />
                        </div>

                      ))}

                    </div>

                    {availableItems.length === 0 && (
                      <div className="text-center py-10 text-green-600 font-extrabold">
                        Semua bentuk sudah diberikan! 🎉
                      </div>
                    )}

                  </div>

                  <div className="bg-purple-100 rounded-2xl p-3 mt-4 text-center">
                    <p className="text-purple-700 font-bold">
                      💡 Ingat! Pilih bentuk sesuai perintah, warnanya boleh berbeda.
                    </p>
                  </div>

                </div>

              </div>

              {/* PROGRESS */}
              <div className="bg-white/70 rounded-full h-5 overflow-hidden mt-6 shadow-lg">
                <div
                  className="bg-green-400 h-full transition-all duration-500"
                  style={{
                    width: `${((questionNumber + (fedCount === round.answer ? 1 : 0)) / TOTAL_QUESTIONS) * 100}%`,
                  }}
                />
              </div>

              <p className="text-center text-blue-700 font-bold mt-2">
                Semangat! Kamu pasti bisa! 🌟
              </p>

            </div>
          )}

          {/* ================================= */}
          {/* HALAMAN SELESAI */}
          {/* ================================= */}

          {finished && (

            <div className="max-w-xl mx-auto bg-white/95 rounded-3xl shadow-xl p-8 text-center mt-12">

              <div className="flex justify-center mb-2">
                <img
                  src="/images/geometri/benar3.png"
                  alt="Jawaban Benar"
                  className="w-64 h-auto object-contain"
                />
              </div>

              <h2 className="text-4xl font-extrabold text-blue-600">
                Hebat Sekali!
              </h2>

              <p className="text-xl font-bold text-orange-500 mt-5">
                Kambing sudah kenyang!
              </p>

              <div className="bg-yellow-50 rounded-2xl p-5 mt-4">
                <p className="text-gray-500 font-bold">
                  SKOR AKHIR
                </p>

                <p className="text-5xl font-extrabold text-orange-500 mt-2">
                  {score}
                </p>
              </div>

              <button
                onClick={restartGame}
                className="mt-8 bg-green-500 hover:bg-green-600 text-white text-xl font-bold px-10 py-4 rounded-2xl shadow-lg hover:scale-105 transition"
              >
                🔄 Main Lagi
              </button>

            </div>

          )}

        </div>
      </div>

      {/* ================================= */}
      {/* FEEDBACK */}
      {/* ================================= */}

      {feedback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">

          <img
            src={
              feedback === "benar"
                ? "/images/geometri/benar3.png"
                : "/images/geometri/salah2.png"
            }
            alt={feedback === "benar" ? "Benar" : "Coba lagi"}
            className="
              w-[500px] h-[500px]
              md:w-[600px] md:h-[600px]
              object-contain
              drop-shadow-2xl
              animate-bounce
            "
          />

        </div>
      )}

    </div>
  )
}
