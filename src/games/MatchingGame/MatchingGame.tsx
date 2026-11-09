
import { useEffect, useRef, useState } from "react"

type Shape =
  | "triangle"
  | "circle"
  | "square"
  | "rectangle"
  | "oval"
  | "star"

type Question = {
  id: number
  name: string
  image: string
  answer: Shape
  options: Shape[]
}

// =====================================
// DATA SOAL
// =====================================

const questions: Question[] = [
  {
    id: 1,
    name: "Caping",
    image: "/images/geometri/caping.png",
    answer: "triangle",
    options: ["circle", "triangle", "square"],
  },
  {
    id: 2,
    name: "Roda",
    image: "/images/geometri/roda.png",
    answer: "circle",
    options: ["square", "circle", "rectangle"],
  },
  {
    id: 3,
    name: "Buku",
    image: "/images/geometri/buku.png",
    answer: "rectangle",
    options: ["triangle", "rectangle", "star"],
  },
  {
    id: 4,
    name: "Ubin",
    image: "/images/geometri/ubin.png",
    answer: "square",
    options: ["oval", "square", "circle"],
  },
  {
    id: 5,
    name: "Telur",
    image: "/images/geometri/telur.png",
    answer: "oval",
    options: ["oval", "triangle", "square"],
  },
  {
    id: 6,
    name: "Bintang",
    image: "/images/geometri/bintang.png",
    answer: "star",
    options: ["circle", "star", "rectangle"],
  },
  {
    id: 7,
    name: "Rambu",
    image: "/images/geometri/rambu.png",
    answer: "triangle",
    options: ["triangle", "square", "oval"],
  },
  {
    id: 8,
    name: "tv",
    image: "/images/geometri/tv.png",
    answer: "rectangle",
    options: ["rectangle", "star", "square"],
  },
  {
    id: 9,
    name: "Pintu",
    image: "/images/geometri/pintu.png",
    answer: "rectangle",
    options: ["star", "rectangle", "triangle"],
  },
  {
    id: 10,
    name: "donat",
    image: "/images/geometri/donat.png",
    answer: "circle",
    options: ["star", "oval", "circle"],
  },
  
  {
    id:11,
    name: "Bintang",
    image: "/images/geometri/bintang2.png",
    answer: "star",
    options: ["circle", "star", "rectangle"],
  },
  {
    id: 12,
    name: "Onigiri",
    image: "/images/geometri/onigiri.png",
    answer: "triangle",
    options: ["triangle", "square", "oval"],
  },
  {
    id: 13,
    name: "Jam",
    image: "/images/geometri/jam.png",
    answer: "circle",
    options: ["rectangle", "circle", "square"],
  },
  {
    id: 14,
    name: "Bantal",
    image: "/images/geometri/bantal.png",
    answer: "rectangle",
    options: ["star", "rectangle", "triangle"],
  },
  {
    id: 15,
    name: "Penggorengan",
    image: "/images/geometri/penggorengan.png",
    answer: "circle",
    options: ["star", "oval", "circle"],
  },
]

// =====================================
// NAMA BENTUK
// =====================================

const shapeNames: Record<Shape, string> = {
  triangle: "Segitiga",
  circle: "Lingkaran",
  square: "Persegi",
  rectangle: "Persegi Panjang",
  oval: "Oval",
  star: "Bintang",
}

// =====================================
// KOMPONEN GAMBAR GEOMETRI
// =====================================

function ShapeImage({ shape }: { shape: Shape }) {
  const colors: Record<Shape, string> = {
    triangle: "#FBBF24",
    circle: "#60A5FA",
    square: "#F9A8D4",
    rectangle: "#A78BFA",
    oval: "#4ADE80",
    star: "#FB923C",
  }

  const color = colors[shape]

  return (
    <svg
      viewBox="0 0 100 100"
      className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36"
    >
      {shape === "triangle" && (
        <polygon
          points="50,7 5,90 95,90"
          fill={color}
          stroke="#64748B"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      )}

      {shape === "circle" && (
        <circle
          cx="50"
          cy="50"
          r="42"
          fill={color}
          stroke="#64748B"
          strokeWidth="3"
        />
      )}

      {shape === "square" && (
        <rect
          x="8"
          y="8"
          width="84"
          height="84"
          rx="4"
          fill={color}
          stroke="#64748B"
          strokeWidth="3"
        />
      )}

      {shape === "rectangle" && (
        <rect
          x="4"
          y="23"
          width="92"
          height="54"
          rx="4"
          fill={color}
          stroke="#64748B"
          strokeWidth="3"
        />
      )}

      {shape === "oval" && (
        <ellipse
          cx="50"
          cy="50"
          rx="45"
          ry="30"
          fill={color}
          stroke="#64748B"
          strokeWidth="3"
        />
      )}

      {shape === "star" && (
        <polygon
          points="50,3 62,36 97,36 69,57 80,93 50,71 20,93 31,57 3,36 38,36"
          fill={color}
          stroke="#64748B"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      )}
    </svg>
  )
}

function MatchingGame() {
  const [questionIndex, setQuestionIndex] = useState(0)
  const [shuffledQuestions, setShuffledQuestions] = useState<typeof questions>([])
  const [score, setScore] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [started, setStarted] = useState(false)
  const [finished, setFinished] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [feedback, setFeedback] = useState("")

  const [line, setLine] = useState<{
    x1: number
    y1: number
    x2: number
    y2: number
    correct: boolean
  } | null>(null)

  const boardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  const optionRefs = useRef<
    Record<string, HTMLButtonElement | null>
  >({})

  const question = shuffledQuestions[questionIndex]

  // =====================================
  // ACAK 15 SOAL TANPA PERULANGAN
  // =====================================

  const shuffleQuestions = () => {
    const shuffled = [...questions]

    // Fisher-Yates Shuffle
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))

      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }

    setShuffledQuestions(shuffled)
  }

  // =====================================
  // TIMER
  // =====================================

  useEffect(() => {
    if (!started || finished) return

    const timer = setInterval(() => {
      setSeconds((current) => current + 1)
    }, 1500)

    return () => clearInterval(timer)
  }, [started, finished])

  const formatTime = (value: number) => {
    const minutes = Math.floor(value / 60)
    const secs = value % 60

    return (
      String(minutes).padStart(2, "0") +
      ":" +
      String(secs).padStart(2, "0")
    )
  }

  // =====================================
  // POSISI GARIS
  // =====================================

  const getCenter = (element: HTMLElement) => {
    const board = boardRef.current

    if (!board) return null

    const boardRect = board.getBoundingClientRect()
    const rect = element.getBoundingClientRect()

    return {
      x: rect.left + rect.width / 2 - boardRect.left,
      y: rect.top + rect.height / 2 - boardRect.top,
    }
  }

  // =====================================
  // MULAI TARIK GARIS
  // =====================================

  const handleDragStart = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    if (!started || finished || dragging) return

    e.preventDefault()

    const board = boardRef.current
    const image = imageRef.current

    if (!board || !image) return

    const start = getCenter(image)

    if (!start) return

    setDragging(true)

    setLine({
      x1: start.x,
      y1: start.y,
      x2: start.x,
      y2: start.y,
      correct: false,
    })
  }

  // =====================================
  // GERAKAN GARIS
  // =====================================

  const handleDragMove = (
    e: React.PointerEvent<HTMLDivElement>
  ) => {
    if (!dragging || !line || !boardRef.current) return

    const rect = boardRef.current.getBoundingClientRect()

    setLine((current) =>
      current
        ? {
            ...current,
            x2: e.clientX - rect.left,
            y2: e.clientY - rect.top,
          }
        : null
    )
  }

  // =====================================
  // SELESAI MENARIK GARIS
  // =====================================

  const handleDragEnd = (
    e: React.PointerEvent<HTMLButtonElement>,
    shape: Shape
  ) => {
    if (!dragging || !started || finished) return

    e.preventDefault()

    const image = imageRef.current
    const option = optionRefs.current[shape]

    if (!image || !option || !question) return

    const start = getCenter(image)
    const end = getCenter(option)

    if (!start || !end) return

    setDragging(false)

    const isCorrect = shape === question.answer

    setLine({
      x1: start.x,
      y1: start.y,
      x2: end.x,
      y2: end.y,
      correct: isCorrect,
    })

    if (isCorrect) {
  setScore((current) => current + (100 / 15))
  setFeedback("benar")
} else {
  setFeedback("salah")
}

    // BENAR ATAU SALAH TETAP LANJUT
    setTimeout(() => {
      if (questionIndex + 1 >= shuffledQuestions.length) {
        setFinished(true)
      } else {
        setQuestionIndex((current) => current + 1)
      }

      setFeedback("")
      setLine(null)
    }, 1500)
  }

  // =====================================
  // RESET GAME
  // =====================================

  const restartGame = () => {
    setQuestionIndex(0)
    setScore(0)
    setSeconds(0)
    setStarted(false)
    setFinished(false)
    setDragging(false)
    setFeedback("")
    setLine(null)
    setShuffledQuestions([])
  }

  // =====================================
  // MULAI PERMAINAN
  // =====================================

  const startGame = () => {
    shuffleQuestions()
    setQuestionIndex(0)
    setScore(0)
    setSeconds(0)
    setDragging(false)
    setFeedback("")
    setLine(null)
    setFinished(false)
    setStarted(true)
  }

  // =====================================
  // TAMPILAN
  // =====================================

  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* BACKGROUND GAMBAR BLUR TIPIS */}

      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat scale-105 blur-[1px]"
        style={{
          backgroundImage:
            "url('/images/background2.png')",
        }}
      />

      {/* LAPISAN PUTIH TRANSPARAN */}

      <div className="fixed inset-0 bg-white/30" />

      {/* KONTEN GAME */}

      <div className="relative z-10 min-h-screen p-4 md:p-6">

        <div className="max-w-5xl mx-auto">

          {/* JUDUL */}

          <div className="text-center mb-6">
          </div>

          {/* INFORMASI GAME */}

          <div className="flex justify-center gap-3 mb-6">

            <div className="bg-white rounded-2xl shadow px-6 py-3 text-center flex-1">
              <p className="text-sm text-gray-500">SOAL</p>

              <p className="text-2xl font-bold text-blue-600">
                {questionIndex + (finished ? 0 : 1)}/15
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow px-6 py-3 text-center flex-1">
              <p className="text-sm text-gray-500">SKOR</p>

              <p className="text-2xl font-bold text-blue-500">
                {Math.round(score)}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow px-6 py-3 text-center flex-1">
              <p className="text-sm text-gray-500">WAKTU</p>

              <p className="text-2xl font-bold text-orange-500">
                {formatTime(seconds)}
              </p>
            </div>

          </div>

          

          {/* PAPAN PERMAINAN */}

          {!finished && started && question && (

            <div
              ref={boardRef}
              onPointerMove={handleDragMove}
              className="
                relative
                bg-white
                rounded-3xl
                shadow-xl
                p-4
                md:p-8
                min-h-[430px]
                overflow-hidden
                select-none
              "
            >

              {/* SVG GARIS */}

              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-20"
                style={{ overflow: "visible" }}
              >
                {line && (
                  <line
                    x1={line.x1}
                    y1={line.y1}
                    x2={line.x2}
                    y2={line.y2}
                    stroke={
                      line.correct
                        ? "#22C55E"
                        : dragging
                        ? "#3B82F6"
                        : "#EF4444"
                    }
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="10 7"
                  />
                )}
              </svg>

              <div className="grid grid-cols-2 gap-4 md:gap-10 relative z-10">

                {/* KOLOM GAMBAR */}

                <div className="flex flex-col items-center">

                  <h2 className="text-lg md:text-2xl font-bold text-blue-600 mb-5">
                    🖼️ GAMBAR
                  </h2>

                  <div
                    ref={imageRef}
                    onPointerDown={handleDragStart}
                    className="
                      w-full
                      aspect-square
                      bg-blue-50
                      border-4
                      border-blue-300
                      rounded-3xl
                      flex
                      flex-col
                      items-center
                      justify-center
                      p-3
                      cursor-grab
                      active:cursor-grabbing
                      touch-none
                      hover:scale-105
                      transition
                    "
                  >

                    <img
                      src={question.image}
                      alt={question.name}
                      draggable={false}
                      className="w-full h-4/5 object-contain pointer-events-none"
                    />

                    <p className="font-bold text-gray-700 text-lg">
                      {question.name}
                    </p>

                  </div>

                  <p className="text-sm text-gray-500 mt-4 text-center">
                    👆 Tarik garis dari sini
                  </p>

                </div>

                {/* KOLOM BENTUK */}

                <div className="flex flex-col items-center">

                  <h2 className="text-lg md:text-2xl font-bold text-purple-600 mb-5">
                    🔷 BENTUK
                  </h2>

                  <div className="w-full max-w-[220px] flex flex-col gap-3">

                    {question.options.map((shape) => (

                      <button
                        key={shape}
                        ref={(element) => {
                          optionRefs.current[shape] = element
                        }}
                        onPointerUp={(e) =>
                          handleDragEnd(e, shape)
                        }
                        className="
                          w-full
                          h-28
                          md:h-32
                          bg-purple-50
                          border-4
                          border-purple-200
                          rounded-2xl
                          flex
                          flex-col
                          items-center
                          justify-center
                          hover:bg-purple-100
                          active:bg-green-100
                          transition
                          touch-none
                        "
                      >

                        <ShapeImage shape={shape} />

                        <span className="font-bold text-gray-600 text-sm">
                          {shapeNames[shape]}
                        </span>

                      </button>

                    ))}

                  </div>

                </div>

              </div>



            </div>
          )}

          {/* HALAMAN MULAI */}

          {!started && !finished && (
            <div className="bg-white rounded-3xl p-7 text-center shadow-xl mt-6">

              <div className="text-6xl mb-3">🎮</div>

              <h2 className="text-2xl font-bold text-blue-600">
                Siap Bermain?
              </h2>


              
<button
  onClick={startGame}
  className="
    mt-8
    w-full
    max-w-md
    py-6
    px-10
    bg-gradient-to-r
    from-blue-400
    via-blue-500
    to-blue-600
    hover:from-blue-500
    hover:to-blue-700
    text-white
    text-2xl
    md:text-3xl
    font-extrabold
    rounded-full
    shadow-[0_8px_0_#15803d,0_12px_20px_rgba(0,0,0,0.2)]
    border-4
    border-white
    hover:scale-105
    active:scale-95
    active:shadow-none
    transition-all
    duration-200
    animate-pulse
  "
>
  <span className="inline-flex items-center justify-center gap-3">
    <span className="text-4xl">🚀</span>
    MULAI BERMAIN
    <span className="text-3xl">⭐</span>
  </span>
</button>


            </div>
          )}

          {/* HASIL AKHIR */}

          {finished && (

            <div className="bg-white rounded-3xl shadow-xl p-8 text-center">

              <div className="flex justify-center">
                <img
                  src="/images/goodjob.png"
                  alt="Anak juara"
                  className="w-64 md:w-80 h-auto object-contain"
                />
              </div>

              <h2 className="text-4xl font-bold text-blue-500 mt-3">
                LUAR BIASA!
              </h2>

              <p className="text-lg text-gray-600 mt-2">
                Kamu berhasil menyelesaikan 15 soal!
              </p>

              <div className="grid grid-cols-2 gap-4 mt-7">

                <div className="bg-yellow-50 p-5 rounded-2xl">
                  <p className="text-gray-500">SKOR AKHIR</p>
                  <p className="text-4xl font-bold text-orange-500">
                    {score}
                  </p>
                </div>

                <div className="bg-blue-50 p-5 rounded-2xl">
                  <p className="text-gray-500">WAKTU</p>
                  <p className="text-4xl font-bold text-blue-500">
                    {formatTime(seconds)}
                  </p>
                </div>

              </div>

              <button
                onClick={restartGame}
                className="
                  mt-8
                  bg-blue-500
                  hover:bg-blue-600
                  text-white
                  px-10
                  py-4
                  rounded-full
                  text-xl
                  font-bold
                "
              >
                🔄 MAIN LAGI
              </button>

            </div>
          )}

          {/* PROGRESS */}

          <div className="bg-white rounded-full h-4 overflow-hidden mb-6 mt-4 shadow">
            <div
              className="bg-blue-400 h-full transition-all duration-500"
              style={{
                width: `${((questionIndex + (finished ? 1 : 0)) / 15) * 100}%`,
              }}
            />
          </div>

          {/* PETUNJUK */}

          <div className="text-center text-gray-500 text-sm mt-6">
            🌈 Belajar bentuk geometri sambil bermain!
          </div>

        </div>
      </div>

      {/* MODAL FEEDBACK */}
{feedback && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
    <div
      className={`w-full max-w-sm rounded-3xl border-4 p-8 text-center shadow-2xl ${
        feedback === "benar"
          ? "border-blue-400 bg-blue-100"
          : "border-red-400 bg-red-100"
      }`}
    >
      {feedback === "benar" ? (
        <>
          <div className="text-8xl">✓</div>
          <h2 className="mt-3 text-3xl font-bold text-blue-700">
            Hebat!
          </h2>
          <div className="mt-3 text-4xl">⭐⭐⭐⭐⭐</div>
          
        </>
      ) : (
        <>
          <div className="text-8xl font-bold text-red-500">✕</div>
          <h2 className="mt-3 text-3xl font-bold text-red-700">
            Belum Tepat!
          </h2>
          <div className="mt-3 text-5xl">😢</div>
          
        </>
      )}
    </div>
  </div>
)}
    </div>
  )
}

export default MatchingGame
