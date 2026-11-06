
import { useState } from "react"

type Shape =
  | "triangle"
  | "circle"
  | "square"
  | "rectangle"
  | "oval"
  | "star"

type Pair = {
  id: number
  name: string
  image: string
  shape: Shape
}

type Card = {
  id: number
  pairId: number
  type: "image" | "shape"
  matched: boolean
}

const shapeNames: Record<Shape, string> = {
  triangle: "Segitiga",
  circle: "Lingkaran",
  square: "Persegi",
  rectangle: "Persegi Panjang",
  oval: "Oval",
  star: "Bintang",
}

function createCards(pairs: Pair[]): Card[] {
  const cards = pairs.flatMap((pair) => [
    {
      id: pair.id * 2,
      pairId: pair.id,
      type: "image" as const,
      matched: false,
    },
    {
      id: pair.id * 2 + 1,
      pairId: pair.id,
      type: "shape" as const,
      matched: false,
    },
  ])

  // Acak kartu
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[cards[i], cards[j]] = [cards[j], cards[i]]
  }

  return cards
}

function ShapeIcon({ shape }: { shape: Shape }) {
  const common = {
    fill: "#FBBF24",
    stroke: "#D97706",
    strokeWidth: 3,
    strokeLinejoin: "round" as const,
  }

  return (
    <svg
      viewBox="0 0 100 100"
      className="w-24 h-24 md:w-32 md:h-32"
    >
      {shape === "triangle" && (
        <polygon
          points="50,8 5,90 95,90"
          {...common}
        />
      )}

      {shape === "circle" && (
        <circle cx="50" cy="50" r="40" {...common} />
      )}

      {shape === "square" && (
        <rect
          x="10"
          y="10"
          width="80"
          height="80"
          rx="5"
          {...common}
        />
      )}

      {shape === "rectangle" && (
        <rect
          x="5"
          y="25"
          width="90"
          height="50"
          rx="5"
          {...common}
        />
      )}

      {shape === "oval" && (
        <ellipse
          cx="50"
          cy="50"
          rx="45"
          ry="30"
          {...common}
        />
      )}

      {shape === "star" && (
        <polygon
          points="50,5 62,36 95,38 70,60 78,93 50,75 22,93 30,60 5,38 38,36"
          {...common}
        />
      )}
    </svg>
  )
}

function MatchingGame() {
  const [pairs, setPairs] = useState<Pair[]>([])

  const [cards, setCards] = useState<Card[]>([])

  const [selected, setSelected] = useState<number[]>([])

  const [score, setScore] = useState(0)

  const [isPlaying, setIsPlaying] = useState(false)

  const [isChecking, setIsChecking] = useState(false)

  const [imageName, setImageName] = useState("")

  const [imageFile, setImageFile] = useState("")

  const [shape, setShape] = useState<Shape>("triangle")

  const [error, setError] = useState("")

  const finished =
    cards.length > 0 &&
    cards.every((card) => card.matched)

  // TAMBAH GAMBAR PNG
  const addPair = () => {
    if (!imageName.trim()) {
      setError("Masukkan nama gambar terlebih dahulu!")
      return
    }

    if (!imageFile) {
      setError("Pilih gambar PNG terlebih dahulu!")
      return
    }

    const newPair: Pair = {
      id: Date.now(),
      name: imageName,
      image: imageFile,
      shape,
    }

    setPairs((current) => [...current, newPair])

    setImageName("")
    setImageFile("")
    setShape("triangle")
    setError("")
    setIsPlaying(false)
    setCards([])
    setSelected([])
    setScore(0)
  }

  // UPLOAD FILE
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]

    if (!file) return

    if (file.type !== "image/png") {
      setError("Gunakan file gambar PNG ya!")
      e.target.value = ""
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      setImageFile(reader.result as string)
      setError("")
    }

    reader.readAsDataURL(file)
  }

  // HAPUS GAMBAR
  const removePair = (id: number) => {
    setPairs((current) =>
      current.filter((pair) => pair.id !== id)
    )

    setIsPlaying(false)
    setCards([])
    setSelected([])
    setScore(0)
  }

  // MULAI GAME
  const startGame = () => {
    if (pairs.length < 2) {
      setError("Tambahkan minimal 2 gambar terlebih dahulu!")
      return
    }

    setCards(createCards(pairs))
    setSelected([])
    setScore(0)
    setIsChecking(false)
    setIsPlaying(true)
    setError("")
  }

  // ULANGI GAME
  const restartGame = () => {
    setCards(createCards(pairs))
    setSelected([])
    setScore(0)
    setIsChecking(false)
  }

  // KLIK KARTU
  const handleCardClick = (id: number) => {
    if (isChecking || finished) return

    if (selected.includes(id)) return

    const clickedCard = cards.find(
      (card) => card.id === id
    )

    if (!clickedCard || clickedCard.matched) return

    const newSelected = [...selected, id]

    setSelected(newSelected)

    if (newSelected.length === 2) {
      setIsChecking(true)

      const first = cards.find(
        (card) => card.id === newSelected[0]
      )

      const second = cards.find(
        (card) => card.id === newSelected[1]
      )

      const isMatch =
        first?.pairId === second?.pairId &&
        first?.type !== second?.type

      setTimeout(() => {
        if (isMatch) {
          setCards((current) =>
            current.map((card) =>
              newSelected.includes(card.id)
                ? { ...card, matched: true }
                : card
            )
          )

          setScore((current) => current + 1)
        }

        setSelected([])
        setIsChecking(false)
      }, 700)
    }
  }

  const columns =
    cards.length <= 8
      ? 4
      : cards.length <= 12
      ? 4
      : 5

  return (
    <div className="min-h-screen bg-sky-100 p-4 md:p-6">

      {/* HEADER */}

      <div className="max-w-5xl mx-auto text-center">

        <h1 className="text-3xl md:text-5xl font-bold text-blue-600">
          🔷 Cocokkan Bentuk Geometri
        </h1>

        <p className="text-lg text-gray-600 mt-2">
          Yuk, cocokkan gambar dengan bentuknya!
        </p>

        <div className="flex justify-center gap-3 mt-5 flex-wrap">
          <div className="bg-white px-5 py-3 rounded-full shadow font-bold">
            🎯 Pasangan: {score}/{pairs.length}
          </div>

          <div className="bg-white px-5 py-3 rounded-full shadow font-bold">
            🃏 Kartu: {cards.length}
          </div>
        </div>

      </div>

      {/* MENU GURU */}

      {!isPlaying && (
        <div className="max-w-3xl mx-auto mt-8">

          <div className="bg-white rounded-3xl shadow-lg p-5 md:p-7">

            <h2 className="text-2xl font-bold text-blue-600 mb-2">
              ⚙️ Pengaturan Gambar
            </h2>

            <p className="text-gray-600 mb-5">
              Guru dapat mengunggah gambar PNG dan menentukan
              bentuk geometri yang sesuai.
            </p>

            <div className="space-y-4">

              <div>
                <label className="font-bold block mb-2">
                  1. Nama Gambar
                </label>

                <input
                  type="text"
                  value={imageName}
                  onChange={(e) => setImageName(e.target.value)}
                  placeholder="Contoh: Caping"
                  className="w-full border-2 rounded-xl p-3"
                />
              </div>

              <div>
                <label className="font-bold block mb-2">
                  2. Upload Gambar PNG
                </label>

                <input
                  type="file"
                  accept="image/png"
                  onChange={handleImageUpload}
                  className="w-full border-2 rounded-xl p-3"
                />

                {imageFile && (
                  <div className="mt-3 bg-sky-50 rounded-2xl p-4 flex justify-center">
                    <img
                      src={imageFile}
                      alt="Preview gambar"
                      className="w-36 h-36 object-contain"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="font-bold block mb-2">
                  3. Pilih Bentuk Geometri
                </label>

                <select
                  value={shape}
                  onChange={(e) =>
                    setShape(e.target.value as Shape)
                  }
                  className="w-full border-2 rounded-xl p-3 bg-white"
                >
                  {Object.entries(shapeNames).map(
                    ([value, name]) => (
                      <option key={value} value={value}>
                        {name}
                      </option>
                    )
                  )}
                </select>

                <div className="flex justify-center mt-3">
                  <ShapeIcon shape={shape} />
                </div>
              </div>

              {error && (
                <p className="text-red-500 font-semibold">
                  {error}
                </p>
              )}

              <button
                onClick={addPair}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold p-4 rounded-2xl text-lg"
              >
                ➕ Tambahkan Pasangan
              </button>

            </div>

            {/* DAFTAR GAMBAR */}

            <div className="mt-7">

              <h3 className="font-bold text-xl mb-3">
                📋 Daftar Gambar ({pairs.length})
              </h3>

              {pairs.length === 0 && (
                <p className="text-gray-500 text-center py-5">
                  Belum ada gambar. Silakan tambahkan gambar PNG.
                </p>
              )}

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">

                {pairs.map((pair) => (
                  <div
                    key={pair.id}
                    className="border rounded-2xl p-3 text-center bg-sky-50"
                  >
                    <img
                      src={pair.image}
                      alt={pair.name}
                      className="w-full h-24 object-contain"
                    />

                    <p className="font-bold mt-2">
                      {pair.name}
                    </p>

                    <p className="text-sm text-gray-600">
                      {shapeNames[pair.shape]}
                    </p>

                    <button
                      onClick={() => removePair(pair.id)}
                      className="text-red-500 text-sm font-bold mt-2"
                    >
                      🗑 Hapus
                    </button>
                  </div>
                ))}

              </div>

            </div>

            <button
              onClick={startGame}
              disabled={pairs.length < 2}
              className="w-full mt-7 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white text-xl font-bold p-4 rounded-2xl"
            >
              🚀 MULAI BERMAIN
            </button>

          </div>
        </div>
      )}

      {/* PAPAN PERMAINAN */}

      {isPlaying && (
        <div className="max-w-5xl mx-auto mt-8">

          <div
            className="grid gap-3 md:gap-5"
            style={{
              gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            }}
          >

            {cards.map((card) => {
              const isSelected = selected.includes(card.id)

              const pair = pairs.find(
                (item) => item.id === card.pairId
              )

              const isVisible = isSelected || card.matched

              return (
                <button
                  key={card.id}
                  disabled={card.matched || isChecking}
                  onClick={() => handleCardClick(card.id)}
                  className={`
                    aspect-square rounded-2xl md:rounded-3xl
                    shadow-lg flex flex-col items-center
                    justify-center p-2 transition
                    ${
                      card.matched
                        ? "bg-green-100 border-4 border-green-400"
                        : isVisible
                        ? "bg-white border-4 border-blue-400"
                        : "bg-white hover:bg-yellow-50 hover:scale-105"
                    }
                  `}
                >

                  {isVisible ? (
                    card.type === "image" ? (
                      <>
                        <img
                          src={pair?.image}
                          alt={pair?.name}
                          className="w-full h-3/4 object-contain"
                        />
                        <span className="text-xs md:text-base font-bold text-gray-600">
                          {pair?.name}
                        </span>
                      </>
                    ) : (
                      <>
                        <ShapeIcon
                          shape={pair?.shape ?? "triangle"}
                        />
                        <span className="text-xs md:text-base font-bold text-gray-600 text-center">
                          {shapeNames[pair?.shape ?? "triangle"]}
                        </span>
                      </>
                    )
                  ) : (
                    <span className="text-4xl md:text-6xl">
                      ❓
                    </span>
                  )}

                </button>
              )
            })}

          </div>

          {/* SELESAI */}

          {finished && (
            <div className="bg-white rounded-3xl shadow-xl p-7 mt-8 text-center">

              <div className="text-7xl">🏆</div>

              <h2 className="text-4xl font-bold text-green-500 mt-3">
                Hebat Sekali!
              </h2>

              <p className="text-xl mt-3">
                Semua bentuk berhasil dicocokkan!
              </p>

              <p className="text-2xl font-bold mt-4">
                ⭐ Skor: {score}
              </p>

              <button
                onClick={restartGame}
                className="mt-6 bg-blue-500 text-white px-8 py-4 rounded-full text-xl font-bold"
              >
                🔄 Main Lagi
              </button>

            </div>
          )}

          <div className="flex justify-center gap-3 flex-wrap mt-8">

            <button
              onClick={restartGame}
              className="bg-yellow-400 px-6 py-3 rounded-full font-bold shadow"
            >
              🔄 Acak Ulang
            </button>

            <button
              onClick={() => setIsPlaying(false)}
              className="bg-white px-6 py-3 rounded-full font-bold shadow"
            >
              ⚙️ Pengaturan Guru
            </button>

          </div>

        </div>
      )}

    </div>
  )
}

export default MatchingGame


// import { useState } from "react"

// type Card = {
//   id: number
//   emoji: string
//   matched: boolean
// }

// const levelEmojis = [
//   ["🦄", "🐱", "🐰"],

//   ["🦄", "🐱", "🐰", "🐶", "🐼", "🦊"],

//   [
//     "🦄",
//     "🐱",
//     "🐰",
//     "🐶",
//     "🐼",
//     "🦊",
//     "🐸",
//     "🐯",
//     "🐨",
//   ],

//   [
//     "🦄",
//     "🐱",
//     "🐰",
//     "🐶",
//     "🐼",
//     "🦊",
//     "🐸",
//     "🐯",
//     "🐨",
//     "🐷",
//     "🐮",
//     "🐵",
//   ],

//   [
//     "🦄",
//     "🐱",
//     "🐰",
//     "🐶",
//     "🐼",
//     "🦊",
//     "🐸",
//     "🐯",
//     "🐨",
//     "🐷",
//     "🐮",
//     "🐵",
//     "🐔",
//     "🐙",
//     "🦁",
//   ],
// ]

// const columnsByLevel = [
//   3, // Level 1 → 3 x 2
//   4, // Level 2 → 4 x 3
//   6, // Level 3 → 6 x 3
//   6, // Level 4 → 6 x 4
//   6, // Level 5 → 6 x 5
// ]

// function createCards(level: number): Card[] {
//   const emojis = levelEmojis[level - 1]

//   const cards = emojis.flatMap((emoji, index) => [
//     {
//       id: index * 2 + 1,
//       emoji,
//       matched: false,
//     },
//     {
//       id: index * 2 + 2,
//       emoji,
//       matched: false,
//     },
//   ])

//   // Acak isi kartu, tetapi grid tetap rapi
//   return [...cards].sort(() => Math.random() - 0.5)
// }

// function MatchingGame() {
//   const [level, setLevel] = useState(1)

//   const [cards, setCards] = useState<Card[]>(() =>
//     createCards(1)
//   )

//   const [selected, setSelected] = useState<number[]>([])

//   const [score, setScore] = useState(0)

//   const [showLevelComplete, setShowLevelComplete] =
//     useState(false)

//   const handleCardClick = (id: number) => {
//     if (selected.length === 2) return

//     if (showLevelComplete) return

//     const card = cards.find(
//       (card) => card.id === id
//     )

//     if (
//       !card ||
//       card.matched ||
//       selected.includes(id)
//     ) {
//       return
//     }

//     const newSelected = [...selected, id]

//     setSelected(newSelected)

//     if (newSelected.length === 2) {
//       const firstCard = cards.find(
//         (card) => card.id === newSelected[0]
//       )

//       const secondCard = cards.find(
//         (card) => card.id === newSelected[1]
//       )

//       if (
//         firstCard?.emoji === secondCard?.emoji
//       ) {
//         setTimeout(() => {
//           const updatedCards = cards.map(
//             (card) =>
//               newSelected.includes(card.id)
//                 ? {
//                     ...card,
//                     matched: true,
//                   }
//                 : card
//           )

//           setCards(updatedCards)

//           setScore(
//             (currentScore) =>
//               currentScore + 1
//           )

//           setSelected([])

//           const finished =
//             updatedCards.every(
//               (card) => card.matched
//             )

//           if (finished) {
//             setShowLevelComplete(true)
//           }
//         }, 500)
//       } else {
//         setTimeout(() => {
//           setSelected([])
//         }, 800)
//       }
//     }
//   }

//   const nextLevel = () => {
//     if (level < levelEmojis.length) {
//       const next = level + 1

//       setLevel(next)

//       setCards(createCards(next))

//       setSelected([])

//       setShowLevelComplete(false)
//     }
//   }

//   const restartGame = () => {
//     setLevel(1)

//     setCards(createCards(1))

//     setSelected([])

//     setScore(0)

//     setShowLevelComplete(false)
//   }

//   const totalPairs =
//     levelEmojis[level - 1].length

//   const totalCards = totalPairs * 2

//   const columns =
//     columnsByLevel[level - 1]

//   return (
//     <div className="min-h-screen bg-sky-100 p-4 md:p-6">

//       {/* HEADER */}

//       <div className="max-w-5xl mx-auto text-center">

//         <h1 className="text-4xl md:text-5xl font-bold text-blue-600">
//           🧩 Cari Pasangan
//         </h1>

//         <p className="text-lg md:text-xl text-gray-600 mt-2">
//           Yuk cari gambar yang sama!
//         </p>

//         {/* INFO */}

//         <div className="flex justify-center gap-3 mt-5 flex-wrap">

//           <div className="bg-white px-5 py-3 rounded-full shadow">
//             <span className="text-lg font-bold">
//               🎯 Level {level}
//             </span>
//           </div>

//           <div className="bg-white px-5 py-3 rounded-full shadow">
//             <span className="text-lg font-bold">
//               ⭐ Skor: {score}
//             </span>
//           </div>

//           <div className="bg-white px-5 py-3 rounded-full shadow">
//             <span className="text-lg font-bold">
//               🃏 {totalCards} Kartu
//             </span>
//           </div>

//         </div>

//       </div>

//       {/* CARD GRID */}

//       <div
//         className="
//           max-w-5xl
//           mx-auto
//           mt-8
//           grid
//           gap-4
//           md:gap-5
//         "
//         style={{
//           gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
//         }}
//       >

//         {cards.map((card) => {

//           const isSelected =
//             selected.includes(card.id)

//           return (
//             <button
//               key={card.id}
//               onClick={() =>
//                 handleCardClick(card.id)
//               }
//               className={`
//                 aspect-square
//                 bg-white
//                 rounded-3xl
//                 shadow-lg
//                 flex
//                 items-center
//                 justify-center
//                 text-4xl
//                 md:text-6xl
//                 transition
//                 duration-200
//                 hover:scale-105
//                 active:scale-95
//                 ${
//                   card.matched
//                     ? "bg-green-100"
//                     : ""
//                 }
//               `}
//             >

//               {card.matched ||
//               isSelected ? (
//                 card.emoji
//               ) : (
//                 <span className="text-3xl md:text-5xl">
//                   ❓
//                 </span>
//               )}

//             </button>
//           )
//         })}

//       </div>

//       {/* LEVEL SELESAI */}

//       {showLevelComplete && (

//         <div className="
//           fixed
//           inset-0
//           bg-black/30
//           flex
//           items-center
//           justify-center
//           p-5
//         ">

//           <div className="
//             bg-white
//             rounded-3xl
//             shadow-2xl
//             p-8
//             text-center
//             max-w-md
//             w-full
//           ">

//             <div className="text-7xl">
//               🎉
//             </div>

//             <h2 className="
//               text-4xl
//               font-bold
//               text-green-500
//               mt-3
//             ">
//               Hebat!
//             </h2>

//             <p className="text-xl mt-3">
//               Level {level} berhasil!
//             </p>

//             <p className="
//               text-lg
//               text-gray-600
//               mt-2
//             ">
//               Semua pasangan sudah ditemukan.
//             </p>

//             <div className="
//               text-2xl
//               font-bold
//               mt-4
//             ">
//               ⭐ Skor: {score}
//             </div>

//             {level <
//             levelEmojis.length ? (

//               <button
//                 onClick={nextLevel}
//                 className="
//                   mt-6
//                   bg-blue-500
//                   text-white
//                   px-8
//                   py-4
//                   rounded-full
//                   text-xl
//                   font-bold
//                   hover:bg-blue-600
//                   active:scale-95
//                   transition
//                 "
//               >
//                 🚀 Level Berikutnya
//               </button>

//             ) : (

//               <div>

//                 <p className="
//                   text-2xl
//                   font-bold
//                   text-yellow-500
//                   mt-5
//                 ">
//                   🏆 Semua Level Selesai!
//                 </p>

//                 <button
//                   onClick={restartGame}
//                   className="
//                     mt-5
//                     bg-blue-500
//                     text-white
//                     px-8
//                     py-4
//                     rounded-full
//                     text-xl
//                     font-bold
//                     hover:bg-blue-600
//                     active:scale-95
//                     transition
//                   "
//                 >
//                   🔄 Main Lagi
//                 </button>

//               </div>

//             )}

//           </div>

//         </div>
//       )}

//       {/* RESET */}

//       <div className="text-center mt-8">

//         <button
//           onClick={restartGame}
//           className="
//             bg-white
//             px-6
//             py-3
//             rounded-full
//             shadow
//             font-bold
//             text-gray-600
//             hover:bg-gray-50
//           "
//         >
//           🔄 Ulangi dari Level 1
//         </button>

//       </div>

//     </div>
//   )
// }

// export default MatchingGame