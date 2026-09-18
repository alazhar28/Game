import { useEffect, useRef, useState } from "react"

type FoodType = {
  name: string
  image: string
}

type Question = {
  food: FoodType
  answer: number
  options: number[]
}

type Point = {
  x: number
  y: number
}

const TOTAL_QUESTIONS = 10

const foodTypes: FoodType[] = [
  {
    name: "Padi",
    image: "/images/padi.png",
  },
  {
    name: "Beras",
    image: "/images/beras.png",
  },
  {
    name: "Nasi",
    image: "/images/nasi.png",
  },
  {
    name: "Jagung",
    image: "/images/jagung.png",
  },
  {
    name: "Gandum",
    image: "/images/gandum.png",
  },
]

function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5)
}

function createQuestion(): Question {
  const food =
    foodTypes[
      Math.floor(Math.random() * foodTypes.length)
    ]

  const answer =
    Math.floor(Math.random() * 6) + 1

  const wrongAnswers = shuffle(
    [1, 2, 3, 4, 5, 6].filter(
      (number) => number !== answer
    )
  ).slice(0, 2)

  return {
    food,
    answer,
    options: shuffle([
      answer,
      ...wrongAnswers,
    ]),
  }
}

function NumberMatchingGame() {
  const [question, setQuestion] =
    useState<Question>(createQuestion())

  const [questionNumber, setQuestionNumber] =
    useState(1)

  const [score, setScore] = useState(0)

  const [dragging, setDragging] =
    useState(false)

  const [startPoint, setStartPoint] =
    useState<Point | null>(null)

  const [currentPoint, setCurrentPoint] =
    useState<Point | null>(null)

  const [feedback, setFeedback] = useState<
    "correct" | "wrong" | null
  >(null)

  const [showFinish, setShowFinish] =
    useState(false)

  const gameAreaRef =
    useRef<HTMLDivElement>(null)

  // =========================
  // POSISI MOUSE / TOUCH
  // =========================

  const getPointFromEvent = (
    event: PointerEvent
  ): Point | null => {
    if (!gameAreaRef.current) {
      return null
    }

    const rect =
      gameAreaRef.current.getBoundingClientRect()

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }
  }

  // =========================
  // MULAI TARIK GARIS
  // =========================

  const startDrag = (
    event: React.PointerEvent<HTMLButtonElement>
  ) => {
    if (feedback || showFinish) {
      return
    }

    const point = getPointFromEvent(
      event.nativeEvent
    )

    if (!point) {
      return
    }

    setDragging(true)
    setStartPoint(point)
    setCurrentPoint(point)
  }

  // =========================
  // GERAKKAN GARIS
  // =========================

  useEffect(() => {
    if (!dragging) {
      return
    }

    const handlePointerMove = (
      event: PointerEvent
    ) => {
      const point = getPointFromEvent(event)

      if (!point) {
        return
      }

      setCurrentPoint(point)
    }

    const handlePointerUp = (
      event: PointerEvent
    ) => {
      const target = document.elementFromPoint(
        event.clientX,
        event.clientY
      )

      const numberButton =
        target?.closest("[data-number]")

      const selectedNumber = numberButton
        ? Number(
            numberButton.getAttribute(
              "data-number"
            )
          )
        : null

      setDragging(false)
      setCurrentPoint(null)

      if (selectedNumber === null) {
        setStartPoint(null)
        return
      }

      // =========================
      // JAWABAN BENAR
      // =========================

      if (
        selectedNumber === question.answer
      ) {
        setFeedback("correct")

        setScore(
          (current) => current + 1
        )

        setTimeout(() => {
          if (
            questionNumber >=
            TOTAL_QUESTIONS
          ) {
            setFeedback(null)
            setShowFinish(true)
            setStartPoint(null)
          } else {
            setQuestion(createQuestion())

            setQuestionNumber(
              (current) => current + 1
            )

            setFeedback(null)
            setStartPoint(null)
          }
        }, 1000)
      }

      // =========================
      // JAWABAN SALAH
      // =========================

      else {
        setFeedback("wrong")
        setStartPoint(null)
      }
    }

    window.addEventListener(
      "pointermove",
      handlePointerMove
    )

    window.addEventListener(
      "pointerup",
      handlePointerUp
    )

    return () => {
      window.removeEventListener(
        "pointermove",
        handlePointerMove
      )

      window.removeEventListener(
        "pointerup",
        handlePointerUp
      )
    }
  }, [
    dragging,
    question,
    questionNumber,
  ])

  // =========================
  // MENCEGAH SCROLL SAAT DRAG
  // =========================

  useEffect(() => {
    const preventScroll = (
      event: TouchEvent
    ) => {
      if (dragging) {
        event.preventDefault()
      }
    }

    document.addEventListener(
      "touchmove",
      preventScroll,
      {
        passive: false,
      }
    )

    return () => {
      document.removeEventListener(
        "touchmove",
        preventScroll
      )
    }
  }, [dragging])

  // =========================
  // COBA LAGI
  // =========================

  const tryAgain = () => {
    setFeedback(null)
  }

  // =========================
  // MULAI ULANG
  // =========================

  const restartGame = () => {
    setQuestion(createQuestion())
    setQuestionNumber(1)
    setScore(0)
    setDragging(false)
    setStartPoint(null)
    setCurrentPoint(null)
    setFeedback(null)
    setShowFinish(false)
  }

  // =========================
  // TAMPILAN
  // =========================

  return (
    <div
      className="
        min-h-screen
        bg-amber-50
        p-3
        sm:p-4
        md:p-8
        select-none
      "
    >
      {/* HEADER */}

      <div
        className="
          max-w-6xl
          mx-auto
          text-center
        "
      >
        <h1
          className="
            text-4xl
            md:text-5xl
            font-bold
            text-green-600
          "
        >
          🌾 Mencocokkan Gambar
        </h1>

        <p
          className="
            text-lg
            md:text-xl
            text-gray-600
            mt-2
          "
        >
          Hitung gambarnya lalu tarik garis
          ke angka yang benar!
        </p>

        {/* INFO */}

        <div
          className="
            flex
            justify-center
            gap-3
            mt-5
            flex-wrap
          "
        >
          <div
            className="
              bg-white
              px-5
              py-3
              rounded-full
              shadow
            "
          >
            <span className="text-lg font-bold">
              📚 Soal {questionNumber}/
              {TOTAL_QUESTIONS}
            </span>
          </div>

          <div
            className="
              bg-white
              px-5
              py-3
              rounded-full
              shadow
            "
          >
            <span className="text-lg font-bold">
              ⭐ Skor: {score}
            </span>
          </div>
        </div>
      </div>

      {/* AREA PERMAINAN */}

      <div
        ref={gameAreaRef}
        className="
          relative
          max-w-6xl
          mx-auto
          mt-5
          sm:mt-8
          bg-white
          rounded-[1.5rem]
          md:rounded-[2rem]
          shadow-xl
          p-3
          sm:p-5
          md:p-10
          overflow-hidden
          touch-pan-y
        "
      >
        {/* SVG GARIS */}

        <svg
          className="
            absolute
            inset-0
            w-full
            h-full
            pointer-events-none
            z-20
          "
        >
          {dragging &&
            startPoint &&
            currentPoint && (
              <line
                x1={startPoint.x}
                y1={startPoint.y}
                x2={currentPoint.x}
                y2={currentPoint.y}
                stroke="currentColor"
                strokeWidth="7"
                strokeLinecap="round"
                className="text-green-400"
                strokeDasharray="12 8"
              />
            )}
        </svg>

        <div
          className="
            relative
            z-10
            grid
            md:grid-cols-2
            gap-6
            sm:gap-8
            md:gap-20
            items-center
            min-h-[360px]
            sm:min-h-[430px]
          "
        >
          {/* ===================== */}
          {/* PILIH ANGKA */}
          {/* ===================== */}

          <div>
            <h2
              className="
                text-xl
                sm:text-2xl
                md:text-3xl
                font-bold
                text-green-600
                text-center
                mb-4
                sm:mb-6
              "
            >
              Pilih Angka
            </h2>

            <div
              className="
                flex
                flex-col
                items-center
                gap-3
                sm:gap-5
              "
            >
              {question.options.map(
                (number) => (
                  <button
                    key={number}
                    data-number={number}
                    type="button"
                    className="
                      relative
                      w-20
                      h-16
                      sm:w-24
                      sm:h-20
                      md:w-28
                      md:h-24
                      bg-green-50
                      border-4
                      border-green-300
                      rounded-3xl
                      shadow-md
                      flex
                      items-center
                      justify-center
                      text-4xl
                      sm:text-5xl
                      md:text-6xl
                      font-bold
                      text-green-700
                      hover:bg-green-100
                      active:scale-95
                      transition
                      touch-none
                    "
                  >
                    {number}

                    {/* TITIK ANGKA */}

                    <span
                      className="
                        absolute
                        right-[-10px]
                        top-1/2
                        -translate-y-1/2
                        w-5
                        h-5
                        sm:right-[-12px]
                        sm:w-6
                        sm:h-6
                        bg-green-500
                        border-4
                        border-white
                        rounded-full
                        shadow
                      "
                    />
                  </button>
                )
              )}
            </div>
          </div>

          {/* ===================== */}
          {/* GAMBAR BAHAN POKOK */}
          {/* ===================== */}

          <div>
            <h2
              className="
                text-xl
                sm:text-2xl
                md:text-3xl
                font-bold
                text-amber-600
                text-center
                mb-4
                sm:mb-6
              "
            >
              Hitung {question.food.name}
            </h2>

            <div
              className="
                relative
                min-h-[220px]
                sm:min-h-[280px]
                bg-amber-50
                border-4
                border-amber-100
                rounded-3xl
                p-3
                sm:p-6
                flex
                flex-wrap
                justify-center
                items-center
                gap-3
                sm:gap-5
              "
            >
              {/* KELOMPOK GAMBAR */}

              <div
                className="
                  flex
                  flex-wrap
                  justify-center
                  items-center
                  gap-3
                sm:gap-5
                "
              >
                {/* {Array.from({
                  length: question.answer,
                }).map((_, index) => (
                  <div
                    key={index}
                    className="
                      w-24
                      h-24
                      md:w-28
                      md:h-28
                      bg-white
                      rounded-2xl
                      shadow-md
                      flex
                      items-center
                      justify-center
                      p-3
                    "
                  >
                    <img
                      src={question.food.image}
                      alt={question.food.name}
                      className="
                        max-w-full
                        max-h-full
                        object-contain
                      "
                      draggable={false}
                    />
                  </div>
                ))} */}

                {Array.from({
  length: question.answer,
}).map((_, index) => (
  <div
    key={index}
    className={`
      bg-white
      rounded-2xl
      shadow-md
      flex
      items-center
      justify-center
      p-3
      ${
        question.answer === 1
          ? "w-36 h-36 sm:w-48 sm:h-48 md:w-60 md:h-60"
          : "w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28"
      }
    `}
  >
    <img
      src={question.food.image}
      alt={question.food.name}
      className={`
        object-contain
        ${
          question.answer === 1
            ? "max-w-full max-h-full"
            : "max-w-full max-h-full"
        }
      `}
      draggable={false}
    />
  </div>
))}
              </div>

              {/* SATU TITIK UNTUK
                  SELURUH KELOMPOK */}

              <button
                type="button"
                aria-label="Tarik dari kelompok gambar"
                onPointerDown={startDrag}
                className="
                  absolute
                  left-[-10px]
                  top-1/2
                  -translate-y-1/2
                  w-7
                  h-7
                  sm:left-[-14px]
                  sm:w-8
                  sm:h-8
                  bg-orange-400
                  border-4
                  border-white
                  rounded-full
                  shadow-lg
                  cursor-crosshair
                  touch-none
                  z-30
                "
              />
            </div>

            <p
              className="
                text-center
                text-lg
                text-gray-500
                mt-5
              "
            >
              👆 Hitung jumlah gambar,
              lalu tarik dari titik ke
              angka yang sesuai
            </p>
          </div>
        </div>
      </div>

      {/* ===================== */}
      {/* MODAL BENAR */}
      {/* ===================== */}

      {/* {feedback === "correct" && (
        <div
          className="
            fixed
            inset-0
            z-50
            bg-black/30
            flex
            items-center
            justify-center
            p-5
          "
        >
          <div
            className="
              bg-white
              rounded-[2rem]
              shadow-2xl
              p-8
              text-center
              max-w-md
              w-full
            "
          >
            <div className="text-6xl sm:text-7xl">
              🎉
            </div>

            <h2
              className="
                text-4xl
                font-bold
                text-green-500
                mt-3
              "
            >
              Benar!
            </h2>

            <p
              className="
                text-xl
                text-gray-600
                mt-3
              "
            >
              MasyaAllah, hebat sekali!
            </p>

            <p
              className="
                text-lg
                text-gray-500
                mt-2
              "
            >
              Ada {question.answer}{" "}
              {question.food.name.toLowerCase()}.
            </p>
          </div>
        </div>
      )} */}

      {feedback === "correct" && (
  <div
    className="
      fixed
      inset-0
      z-50
      bg-black/30
      flex
      items-center
      justify-center
      p-5
    "
  >
    <div
      className="
        bg-white
        rounded-[2rem]
        shadow-2xl
        p-5
        sm:p-8
        text-center
        max-w-md
        w-full
      "
    >
      {/* GAMBAR ANAK */}

      <div className="flex justify-center">
        <img
          src="/images/anak.png"
          alt="Anak"
          className="
            w-28
            h-28
            sm:w-36
            sm:h-36
            md:w-44
            md:h-44
            object-contain
          "
          draggable={false}
        />
      </div>

      <h2
        className="
          text-3xl
          sm:text-4xl
          font-bold
          text-green-500
          mt-3
        "
      >
        Benar!
      </h2>

      <p
        className="
          text-base
          sm:text-xl
          text-gray-600
          mt-3
        "
      >
        MasyaAllah, hebat sekali!
      </p>

      <p
        className="
          text-base
          sm:text-lg
          text-gray-500
          mt-2
        "
      >
        Ada {question.answer}{" "}
        {question.food.name.toLowerCase()}.
      </p>
    </div>
  </div>
)}

      {/* ===================== */}
      {/* MODAL SALAH */}
      {/* ===================== */}

      {feedback === "wrong" && (
        <div
          className="
            fixed
            inset-0
            z-50
            bg-black/30
            flex
            items-center
            justify-center
            p-5
          "
        >
          <div
            className="
              bg-white
              rounded-[2rem]
              shadow-2xl
              p-8
              text-center
              max-w-md
              w-full
            "
          >
            <div className="text-6xl sm:text-7xl">
              😊
            </div>

            <h2
              className="
                text-2xl
                sm:text-3xl
                md:text-4xl
                font-bold
                text-orange-500
                mt-3
              "
            >
              Belum Tepat!
            </h2>

            <p
              className="
                text-xl
                text-gray-600
                mt-3
              "
            >
              Yuk, hitung lagi gambarnya.
            </p>

            <button
              type="button"
              onClick={tryAgain}
              className="
                mt-6
                bg-orange-400
                text-white
                px-6
                py-3
                sm:px-8
                sm:py-4
                rounded-full
                text-lg
                sm:text-xl
                font-bold
                shadow-lg
                hover:bg-orange-500
                active:scale-95
                transition
              "
            >
              🔄 Coba Lagi
            </button>
          </div>
        </div>
      )}

      {/* ===================== */}
      {/* SELESAI */}
      {/* ===================== */}

      {showFinish && (
        <div
          className="
            fixed
            inset-0
            z-50
            bg-black/40
            flex
            items-center
            justify-center
            p-5
          "
        >
          <div
            className="
              bg-white
             
              shadow-2xl
              p-8
              text-center
              max-w-md
              w-full
            "
          >
            <div className="text-6xl sm:text-7xl">
              🏆
            </div>

            <h2
              className="
                text-4xl
                font-bold
                text-green-500
                mt-3
              "
            >
              MasyaAllah!
            </h2>

            <p
              className="
                text-xl
                text-gray-600
                mt-3
              "
            >
              Semua soal sudah selesai!
            </p>

            <div
              className="
                mt-5
                text-2xl
                sm:text-3xl
                font-bold
                text-yellow-500
              "
            >
              ⭐ Skor: {score}/
              {TOTAL_QUESTIONS}
            </div>

            <button
              type="button"
              onClick={restartGame}
              className="
                mt-7
                bg-green-500
                text-white
                px-6
                py-3
                sm:px-8
                sm:py-4
                rounded-full
                text-lg
                sm:text-xl
                font-bold
                shadow-lg
                hover:bg-green-600
                active:scale-95
                transition
              "
            >
              🔄 Main Lagi
            </button>
          </div>
        </div>
      )}

      {/* ===================== */}
      {/* RESET */}
      {/* ===================== */}

      <div
        className="
          text-center
          mt-7
        "
      >
        <button
          type="button"
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
          🔄 Mulai dari Awal
        </button>
      </div>
    </div>
  )
}

export default NumberMatchingGame