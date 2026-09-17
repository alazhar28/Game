import { useState } from "react"

type Card = {
  id: number
  emoji: string
  matched: boolean
}

const levelEmojis = [
  ["🦄", "🐱", "🐰"],

  ["🦄", "🐱", "🐰", "🐶", "🐼", "🦊"],

  [
    "🦄",
    "🐱",
    "🐰",
    "🐶",
    "🐼",
    "🦊",
    "🐸",
    "🐯",
    "🐨",
  ],

  [
    "🦄",
    "🐱",
    "🐰",
    "🐶",
    "🐼",
    "🦊",
    "🐸",
    "🐯",
    "🐨",
    "🐷",
    "🐮",
    "🐵",
  ],

  [
    "🦄",
    "🐱",
    "🐰",
    "🐶",
    "🐼",
    "🦊",
    "🐸",
    "🐯",
    "🐨",
    "🐷",
    "🐮",
    "🐵",
    "🐔",
    "🐙",
    "🦁",
  ],
]

const columnsByLevel = [
  3, // Level 1 → 3 x 2
  4, // Level 2 → 4 x 3
  6, // Level 3 → 6 x 3
  6, // Level 4 → 6 x 4
  6, // Level 5 → 6 x 5
]

function createCards(level: number): Card[] {
  const emojis = levelEmojis[level - 1]

  const cards = emojis.flatMap((emoji, index) => [
    {
      id: index * 2 + 1,
      emoji,
      matched: false,
    },
    {
      id: index * 2 + 2,
      emoji,
      matched: false,
    },
  ])

  // Acak isi kartu, tetapi grid tetap rapi
  return [...cards].sort(() => Math.random() - 0.5)
}

function MatchingGame() {
  const [level, setLevel] = useState(1)

  const [cards, setCards] = useState<Card[]>(() =>
    createCards(1)
  )

  const [selected, setSelected] = useState<number[]>([])

  const [score, setScore] = useState(0)

  const [showLevelComplete, setShowLevelComplete] =
    useState(false)

  const handleCardClick = (id: number) => {
    if (selected.length === 2) return

    if (showLevelComplete) return

    const card = cards.find(
      (card) => card.id === id
    )

    if (
      !card ||
      card.matched ||
      selected.includes(id)
    ) {
      return
    }

    const newSelected = [...selected, id]

    setSelected(newSelected)

    if (newSelected.length === 2) {
      const firstCard = cards.find(
        (card) => card.id === newSelected[0]
      )

      const secondCard = cards.find(
        (card) => card.id === newSelected[1]
      )

      if (
        firstCard?.emoji === secondCard?.emoji
      ) {
        setTimeout(() => {
          const updatedCards = cards.map(
            (card) =>
              newSelected.includes(card.id)
                ? {
                    ...card,
                    matched: true,
                  }
                : card
          )

          setCards(updatedCards)

          setScore(
            (currentScore) =>
              currentScore + 1
          )

          setSelected([])

          const finished =
            updatedCards.every(
              (card) => card.matched
            )

          if (finished) {
            setShowLevelComplete(true)
          }
        }, 500)
      } else {
        setTimeout(() => {
          setSelected([])
        }, 800)
      }
    }
  }

  const nextLevel = () => {
    if (level < levelEmojis.length) {
      const next = level + 1

      setLevel(next)

      setCards(createCards(next))

      setSelected([])

      setShowLevelComplete(false)
    }
  }

  const restartGame = () => {
    setLevel(1)

    setCards(createCards(1))

    setSelected([])

    setScore(0)

    setShowLevelComplete(false)
  }

  const totalPairs =
    levelEmojis[level - 1].length

  const totalCards = totalPairs * 2

  const columns =
    columnsByLevel[level - 1]

  return (
    <div className="min-h-screen bg-sky-100 p-4 md:p-6">

      {/* HEADER */}

      <div className="max-w-5xl mx-auto text-center">

        <h1 className="text-4xl md:text-5xl font-bold text-blue-600">
          🧩 Cari Pasangan
        </h1>

        <p className="text-lg md:text-xl text-gray-600 mt-2">
          Yuk cari gambar yang sama!
        </p>

        {/* INFO */}

        <div className="flex justify-center gap-3 mt-5 flex-wrap">

          <div className="bg-white px-5 py-3 rounded-full shadow">
            <span className="text-lg font-bold">
              🎯 Level {level}
            </span>
          </div>

          <div className="bg-white px-5 py-3 rounded-full shadow">
            <span className="text-lg font-bold">
              ⭐ Skor: {score}
            </span>
          </div>

          <div className="bg-white px-5 py-3 rounded-full shadow">
            <span className="text-lg font-bold">
              🃏 {totalCards} Kartu
            </span>
          </div>

        </div>

      </div>

      {/* CARD GRID */}

      <div
        className="
          max-w-5xl
          mx-auto
          mt-8
          grid
          gap-4
          md:gap-5
        "
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
      >

        {cards.map((card) => {

          const isSelected =
            selected.includes(card.id)

          return (
            <button
              key={card.id}
              onClick={() =>
                handleCardClick(card.id)
              }
              className={`
                aspect-square
                bg-white
                rounded-3xl
                shadow-lg
                flex
                items-center
                justify-center
                text-4xl
                md:text-6xl
                transition
                duration-200
                hover:scale-105
                active:scale-95
                ${
                  card.matched
                    ? "bg-green-100"
                    : ""
                }
              `}
            >

              {card.matched ||
              isSelected ? (
                card.emoji
              ) : (
                <span className="text-3xl md:text-5xl">
                  ❓
                </span>
              )}

            </button>
          )
        })}

      </div>

      {/* LEVEL SELESAI */}

      {showLevelComplete && (

        <div className="
          fixed
          inset-0
          bg-black/30
          flex
          items-center
          justify-center
          p-5
        ">

          <div className="
            bg-white
            rounded-3xl
            shadow-2xl
            p-8
            text-center
            max-w-md
            w-full
          ">

            <div className="text-7xl">
              🎉
            </div>

            <h2 className="
              text-4xl
              font-bold
              text-green-500
              mt-3
            ">
              Hebat!
            </h2>

            <p className="text-xl mt-3">
              Level {level} berhasil!
            </p>

            <p className="
              text-lg
              text-gray-600
              mt-2
            ">
              Semua pasangan sudah ditemukan.
            </p>

            <div className="
              text-2xl
              font-bold
              mt-4
            ">
              ⭐ Skor: {score}
            </div>

            {level <
            levelEmojis.length ? (

              <button
                onClick={nextLevel}
                className="
                  mt-6
                  bg-blue-500
                  text-white
                  px-8
                  py-4
                  rounded-full
                  text-xl
                  font-bold
                  hover:bg-blue-600
                  active:scale-95
                  transition
                "
              >
                🚀 Level Berikutnya
              </button>

            ) : (

              <div>

                <p className="
                  text-2xl
                  font-bold
                  text-yellow-500
                  mt-5
                ">
                  🏆 Semua Level Selesai!
                </p>

                <button
                  onClick={restartGame}
                  className="
                    mt-5
                    bg-blue-500
                    text-white
                    px-8
                    py-4
                    rounded-full
                    text-xl
                    font-bold
                    hover:bg-blue-600
                    active:scale-95
                    transition
                  "
                >
                  🔄 Main Lagi
                </button>

              </div>

            )}

          </div>

        </div>
      )}

      {/* RESET */}

      <div className="text-center mt-8">

        <button
          onClick={restartGame}
          className="
            bg-white
            px-6
            py-3
            rounded-full
            shadow
            font-bold
            text-gray-600
            hover:bg-gray-50
          "
        >
          🔄 Ulangi dari Level 1
        </button>

      </div>

    </div>
  )
}

export default MatchingGame