
import { useEffect, useRef, useState } from "react"
import { FaPlayCircle } from "react-icons/fa"
import { BackHomeButton, StopButton } from "../../components/BackButton"
import { IoCaretBackCircleSharp } from "react-icons/io5"

const WORD = "sapi"
const TOTAL_LETTERS = WORD.length * 3

function WritingLatterCow() {
  const [started, setStarted] = useState(false)
  const [finished, setFinished] = useState(false)
  const [typedCount, setTypedCount] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [showModalButtons, setShowModalButtons] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // TIMER
  useEffect(() => {
    if (!started || finished || feedback === "benar") return

    const timer = setInterval(() => {
      setSeconds((current) => current + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [started, finished, feedback])

  // BERSIHKAN TIMEOUT
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  // FORMAT WAKTU
  const formatTime = (value: number) => {
    const minutes = Math.floor(value / 60)
    const secs = value % 60

    return (
      String(minutes).padStart(2, "0") +
      ":" +
      String(secs).padStart(2, "0")
    )
  }

  // MULAI GAME
  const startGame = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    setTypedCount(0)
    setSeconds(0)
    setFeedback("")
    setShowModalButtons(false)
    setFinished(false)
    setStarted(true)

    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)
  }

  // MENGETIK HURUF
  const handleChange = (letter: string) => {
    if (!started || finished || feedback) return

    const expectedLetter = WORD[typedCount % WORD.length]

    // JIKA HURUF BENAR
    if (letter === expectedLetter) {
      const nextCount = typedCount + 1

      setTypedCount(nextCount)

      // SEMUA HURUF SELESAI
      if (nextCount >= TOTAL_LETTERS) {
        timeoutRef.current = setTimeout(() => {
          setFeedback("benar")
          setShowModalButtons(false)

          // TOMBOL MUNCUL 2 DETIK SETELAH MODAL
          timeoutRef.current = setTimeout(() => {
            setShowModalButtons(true)
            timeoutRef.current = null
          }, 2000)

        }, 1000)
      }
    } else {
      // JIKA HURUF SALAH
      setFeedback("salah")

      timeoutRef.current = setTimeout(() => {
        setFeedback("")
        timeoutRef.current = null
        inputRef.current?.focus()
      }, 1000)
    }
  }

  // STOP GAME
  const handleStop = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    setStarted(false)
    setFinished(false)
    setFeedback("")
    setShowModalButtons(false)
    setTypedCount(0)
    setSeconds(0)
  }

  // MAIN LAGI
  const restartGame = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    setStarted(false)
    setFinished(false)
    setTypedCount(0)
    setSeconds(0)
    setFeedback("")
    setShowModalButtons(false)
  }

  // =================================
  // UKURAN DAN TAHAP PERTUMBUHAN SAPI
  // =================================

  const cowStage = Math.min(
    5,
    Math.ceil((typedCount / TOTAL_LETTERS) * 5)
  )

  const cowScale = [
    0.55,
    0.70,
    0.85,
    1.00,
    1.15,
  ][Math.max(0, cowStage - 1)]

  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* BACKGROUND */}
      <div
        className="fixed inset-0 bg-cover bg-center blur-[1px] scale-105"
        style={{
          backgroundImage: "url('/images/background2.png')",
        }}
      />

      <div className="fixed inset-0 bg-white/30" />

      <div className="relative z-10 min-h-screen p-4 md:p-6">

        {/* TOMBOL HOME */}
        <BackHomeButton />

        {/* TOMBOL STOP */}
        {started && !finished && (
          <StopButton onStop={handleStop} />
        )}

        <div className="max-w-5xl mx-auto">

          {/* JUDUL */}
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-5xl font-extrabold text-blue-600">
              ✏️ AYO MENULIS HURUF!
            </h1>
          </div>

          {/* INFORMASI */}
          <div className="flex justify-center gap-3 mb-6">

            <div className="bg-white/70 rounded-2xl shadow px-4 py-3 text-center flex-1">
              <p className="text-sm text-gray-500">HURUF</p>
              <p className="text-2xl font-bold text-blue-600">
                {typedCount}/{TOTAL_LETTERS}
              </p>
            </div>

            <div className="bg-white/70 rounded-2xl shadow px-4 py-3 text-center flex-1">
              <p className="text-sm text-gray-500">WAKTU</p>
              <p className="text-2xl font-bold text-orange-500">
                {formatTime(seconds)}
              </p>
            </div>

          </div>

          {/* ================================= */}
          {/* HALAMAN MULAI */}
          {/* ================================= */}

          {!started && !finished && (

            <div className="bg-white/70 rounded-3xl p-8 text-center shadow-xl mt-8">

              <div className="text-8xl mb-5">
                🐄
              </div>

              <h2 className="text-3xl font-bold text-blue-600">
                Ayo Besarkan Sapi!
              </h2>

              <p className="text-gray-600 mt-3 text-lg">
                Ketik huruf S A P I sebanyak tiga kali!
              </p>

              <button
                onClick={startGame}
                className="mt-8 mx-auto w-full max-w-xs py-4 px-6 bg-gradient-to-r from-blue-400 to-blue-600 text-white text-xl font-extrabold rounded-full shadow-lg border-4 border-white flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition"
              >
                <FaPlayCircle className="text-4xl" />
                Mulai
              </button>

            </div>
          )}

          {/* ================================= */}
          {/* PAPAN PERMAINAN */}
          {/* ================================= */}

          {started && !finished && (

            <div className="bg-white/60 rounded-3xl shadow-xl p-5 md:p-8">

              <h2 className="text-center text-2xl font-bold text-purple-600 mb-6">
                🐄 Ayo Buat Sapi Menjadi Besar!
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">

                {/* GAMBAR SAPI */}
                <div className="flex flex-col items-center">

                  <div className="w-full h-72 md:h-96 flex items-center justify-center overflow-visible">

                    <img
                      src="/images/animal-grouping/sapi.png"
                      alt="Sapi"
                      draggable={false}
                      className="w-64 h-64 md:w-80 md:h-80 object-contain transition-transform duration-500 ease-out"
                      style={{
                        transform: `scale(${cowScale})`,
                      }}
                    />

                  </div>

                  <p className="text-xl font-extrabold text-orange-500 mt-3">
                    {cowStage === 0
                      ? "Sapi masih kecil!"
                      : cowStage === 1
                      ? "Sapi mulai besar!"
                      : cowStage === 2
                      ? "Wah, sapi semakin besar!"
                      : cowStage === 3
                      ? "Sapi semakin gemuk!"
                      : "Sapi sudah besar! 🐄"}
                  </p>

                </div>

                {/* KOTAK HURUF */}
                <div className="bg-purple-50 rounded-3xl border-4 border-purple-200 p-5 md:p-8">

                  <h3 className="text-center text-4xl font-bold text-purple-600 mb-7">
                    ✏️ s a p i
                  </h3>

                  {/* INPUT KEYBOARD */}
                  <input
                    ref={inputRef}
                    type="text"
                    value=""
                    onChange={(e) => {
                      const letter = e.target.value
                        .slice(-1)
                        .replace(/[^a-z]/gi, "")
                        .toLowerCase()

                      if (letter) {
                        handleChange(letter)
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === " " || e.key === "Enter") {
                        e.preventDefault()
                      }
                    }}
                    autoComplete="off"
                    autoCapitalize="off"
                    className="absolute opacity-0 w-1 h-1"
                    aria-label="Ketik huruf"
                  />

                  {/* TIGA BARIS HURUF */}
                  {[0, 1, 2].map((row) => (

                    <div
                      key={row}
                      className="flex justify-center gap-2 md:gap-3 mb-5"
                    >

                      {WORD.split("").map((letter, col) => {

                        const index = row * WORD.length + col

                        const isDone = index < typedCount
                        const isCurrent = index === typedCount

                        return (
                          <div
                            key={index}
                            onClick={() => inputRef.current?.focus()}
                            className={`
                              w-14 h-16 md:w-16 md:h-20
                              rounded-xl flex items-center justify-center
                              border-4 transition-all duration-300
                              ${
                                isDone
                                  ? "bg-green-100 border-green-400"
                                  : isCurrent
                                  ? "bg-yellow-100 border-yellow-400 animate-pulse"
                                  : "bg-white border-gray-200"
                              }
                            `}
                          >

                            {isDone ? (
                              <span className="text-4xl font-extrabold text-green-600">
                                {letter}
                              </span>
                            ) : (
                              <span className="text-3xl font-bold text-gray-300">
                                ?
                              </span>
                            )}

                          </div>
                        )
                      })}

                    </div>

                  ))}

                  <button
                    onClick={() => inputRef.current?.focus()}
                    className="w-full mt-5 py-4 bg-gradient-to-r from-blue-400 to-blue-600 text-white text-xl font-extrabold rounded-2xl shadow-lg"
                  >
                    ⌨️ MULAI MENGETIK
                  </button>

                </div>

              </div>

              {/* PROGRESS */}
              <div className="mt-8 bg-white rounded-full h-5 overflow-hidden shadow">
                <div
                  className="bg-gradient-to-r from-green-300 to-green-500 h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${(typedCount / TOTAL_LETTERS) * 100}%`,
                  }}
                />
              </div>

            </div>
          )}

        </div>
      </div>

      {/* ================================= */}
      {/* MODAL BERHASIL */}
      {/* ================================= */}

      {feedback === "benar" && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[2px] p-4">

          <div className="
            bg-white/30
            rounded-[35px]
            shadow-2xl
            border-4 border-blue-950
            p-6 md:p-8
            max-w-md
            w-full
            text-center
          ">

            {/* GAMBAR SAPI JUARA */}
            <img
              src="/images/sapi/sapijuara1.png"
              alt="Sapi Juara"
              className="
                w-64 h-64 md:w-72 md:h-72
                object-contain mx-auto
                animate-sparkle
              "
            />

            {/* JUDUL */}
            <h2 className="text-3xl md:text-4xl font-extrabold text-blue-600 mt-2">
              HEBAT SEKALI!
            </h2>

            {/* SKOR */}
            <div className="py-4 px-6">
              <p className="text-6xl font-extrabold text-blue-600 mt-2">
                100
              </p>
            </div>

            {/* TOMBOL MAIN LAGI */}
            {showModalButtons && (

              <button
                onClick={restartGame}
                className="
                  w-38 h-16
                  mt-7 mx-auto
                  flex items-center justify-center
                  bg-gradient-to-r from-blue-400 to-blue-600
                  text-white text-4xl
                  rounded-2xl shadow-lg
                  hover:scale-105 active:scale-95
                  transition
                "
              >
                <IoCaretBackCircleSharp />
              </button>

            )}

            {!showModalButtons && (
              <p className="text-gray-400 font-semibold mt-6 animate-pulse">
                Tunggu sebentar ya...
              </p>
            )}

          </div>
        </div>
      )}

      {/* ================================= */}
      {/* FEEDBACK SALAH */}
      {/* ================================= */}

      {feedback === "salah" && (

        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">

          <img
            src="/images/animal-grouping/salah.png"
            alt="Coba lagi"
            className="w-[400px] h-[400px] md:w-[550px] md:h-[550px] object-contain drop-shadow-2xl animate-bounce"
          />

        </div>
      )}

    </div>
  )
}

export default WritingLatterCow
