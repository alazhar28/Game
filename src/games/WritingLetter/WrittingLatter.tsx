

import { useEffect, useRef, useState } from "react"
import { FaPlayCircle } from "react-icons/fa"

type Question = {
  id: number
  name: string
  image: string
}

type GameQuestion = {
  question: Question
  hiddenIndices: number[]
}

const questions: Question[] = [
  { id: 1, name: "Roda", image: "/images/geometri/roda.png" },
  { id: 2, name: "Sapi", image: "/images/geometri/sapi.png" },
  { id: 3, name: "Buku", image: "/images/geometri/buku.png" },
  { id: 4, name: "Bola", image: "/images/geometri/bola.png" },
  { id: 5, name: "Meja", image: "/images/geometri/meja.png" },
  { id: 6, name: "Topi", image: "/images/geometri/topi.png" },
  { id: 7, name: "Kuda", image: "/images/geometri/kuda.png" },
  { id: 8, name: "Roti", image: "/images/geometri/roti.png" },
  { id: 9, name: "Mata", image: "/images/geometri/mata.png" },
  { id: 10, name: "Susu", image: "/images/geometri/susu.png" },
  { id: 11, name: "Paku", image: "/images/geometri/paku.png" },
  { id: 12, name: "Pita", image: "/images/geometri/pita.png" },
  { id: 13, name: "Nasi", image: "/images/geometri/nasi.png" },
  { id: 14, name: "Kaca", image: "/images/geometri/kaca.png" },
  { id: 15, name: "Baju", image: "/images/geometri/baju.png" },
]

function shuffle<T,>(array: T[]): T[] {
  const result = [...array]

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }

  return result
}

function createRounds(): GameQuestion[] {
  return shuffle(questions).map((question) => {
    const word = question.name.toLowerCase()

    // Pilih 2 posisi huruf yang dikosongkan
    const hiddenIndices = shuffle(
      Array.from({ length: word.length }, (_, i) => i)
    ).slice(0, 2).sort((a, b) => a - b)

    return { question, hiddenIndices }
  })
}

function WritingLatter() {
  const [rounds, setRounds] = useState<GameQuestion[]>([])
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [started, setStarted] = useState(false)
  const [finished, setFinished] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [answered, setAnswered] = useState(false)

  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const currentRound = rounds[questionIndex]
  const question = currentRound?.question
  const word = question?.name.toLowerCase() || ""

  // TIMER
  useEffect(() => {
    if (!started || finished) return

    const timer = setInterval(() => {
      setSeconds((current) => current + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [started, finished])

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
    setRounds(createRounds())
    setQuestionIndex(0)
    setAnswers([])
    setScore(0)
    setSeconds(0)
    setFeedback("")
    setAnswered(false)
    setFinished(false)
    setStarted(true)
  }

  // MENULIS HURUF
  const handleChange = (index: number, value: string) => {
    if (answered) return

    const letter = value.slice(-1).replace(/[^a-z]/gi, "").toLowerCase()

    const updatedAnswers = [...answers]
    updatedAnswers[index] = letter

    setAnswers(updatedAnswers)

    // Pindah otomatis ke kotak kosong berikutnya
    if (letter) {
      const nextIndex = currentRound.hiddenIndices.find(
        (hiddenIndex) => hiddenIndex > index
      )

      if (nextIndex !== undefined) {
        inputRefs.current[nextIndex]?.focus()
      }
    }
  }

  // PERIKSA JAWABAN
  const handleCheck = () => {
    if (answered || !question || !currentRound) return

    // Pastikan semua kotak sudah diisi
    const allFilled = currentRound.hiddenIndices.every(
      (index) => answers[index]?.trim() !== ""
    )

    if (!allFilled) return

    setAnswered(true)

    const isCorrect = word.split("").every((letter, index) => {
      if (currentRound.hiddenIndices.includes(index)) {
        return answers[index] === letter
      }

      return true
    })

    if (isCorrect) {
      setScore((current) => current + (100 / 15))
      setFeedback("benar")
    } else {
      setFeedback("salah")
    }

    setTimeout(() => {
      if (questionIndex + 1 >= rounds.length) {
        setFinished(true)
      } else {
        setQuestionIndex((current) => current + 1)
      }

      setAnswers([])
      setFeedback("")
      setAnswered(false)
    }, 1500)
  }

  // MAIN LAGI
  const restartGame = () => {
    setStarted(false)
    setFinished(false)
    setRounds([])
    setQuestionIndex(0)
    setAnswers([])
    setScore(0)
    setSeconds(0)
    setFeedback("")
    setAnswered(false)
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

      <div className="fixed inset-0 bg-white/30" />

      <div className="relative z-10 min-h-screen p-4 md:p-6">

        <div className="max-w-5xl mx-auto">

          {/* JUDUL */}
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-5xl font-extrabold text-blue-600">
              ✏️ Ayo Lengkapi Kata!
            </h1>
          </div>

          {/* INFORMASI */}
          <div className="flex justify-center gap-3 mb-6">

            <div className="bg-white/50 rounded-2xl shadow px-4 py-3 text-center flex-1">
              <p className="text-sm text-gray-500">SOAL</p>
              <p className="text-2xl font-bold text-blue-600">
                {started && !finished ? questionIndex + 1 : finished ? 15 : 0}/15
              </p>
            </div>

            <div className="bg-white/50 rounded-2xl shadow px-4 py-3 text-center flex-1">
              <p className="text-sm text-gray-500">SKOR</p>
              <p className="text-2xl font-bold text-blue-500">
                {Math.round(score)}
              </p>
            </div>

            <div className="bg-white/50 rounded-2xl shadow px-4 py-3 text-center flex-1">
              <p className="text-sm text-gray-500">WAKTU</p>
              <p className="text-2xl font-bold text-orange-500">
                {formatTime(seconds)}
              </p>
            </div>

          </div>

          {/* HALAMAN MULAI */}
          {!started && !finished && (
            <div className="bg-white/50 rounded-3xl p-8 text-center shadow-xl mt-8">

              <div className="text-8xl mb-5">✏️</div>

              <h2 className="text-3xl font-bold text-blue-600">
                Siap Menulis?
              </h2>

              <p className="text-gray-500 mt-3 text-lg">
                Perhatikan gambar dan tulislah huruf yang hilang!
              </p>

              <button
                onClick={startGame}
                className="mt-8 mx-auto w-full max-w-xs py-4 px-6 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white text-xl font-extrabold rounded-full shadow-lg border-4 border-white flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition"
              >
                <FaPlayCircle className="text-4xl" />
                Mulai
              </button>

            </div>
          )}

          {/* PAPAN PERMAINAN */}
          {started && !finished && question && currentRound && (

            <div className="bg-white/40 rounded-3xl shadow-xl p-5 md:p-8">

              <h2 className="text-center text-xl md:text-2xl font-bold text-purple-600 mb-6">
                👀 Perhatikan Gambar dan Lengkapi Hurufnya!
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">

                {/* GAMBAR KIRI */}
                <div className="flex flex-col items-center">

                 <div className="w-full max-w-sm aspect-square bg-blue-50 border-4 border-blue-300 rounded-3xl p-4 flex items-center justify-center">

                    <img
                        key={question.id}
                        src={question.image}
                        alt={question.name}
                        draggable={false}
                        className="w-full h-4/5 object-contain transition-transform duration-300 hover:scale-110"
                        onError={(e) => {
                        e.currentTarget.style.display = "none"
                        }}
                    />

                    </div>

                  <p className="text-gray-500 font-semibold mt-3">
                    🖼️ Apa nama gambar ini?
                  </p>

                </div>

                {/* KOTAK HURUF KANAN */}
                <div className="flex flex-col items-center justify-center">

                  <div className="w-full bg-purple-50 rounded-3xl border-4 border-purple-200 p-5 md:p-8">

                    <h3 className="text-center text-xl font-bold text-purple-600 mb-8">
                      ✏️ TULIS HURUF YANG HILANG
                    </h3>

                    {/* KOTAK HURUF */}
                    <div className="flex justify-center items-center gap-2 md:gap-3 flex-wrap">

                      {word.split("").map((letter, index) => {

                        const isHidden = currentRound.hiddenIndices.includes(index)

                        return (
                          <div
                            key={index}
                            className={`w-14 h-16 md:w-16 md:h-20 rounded-xl flex items-center justify-center ${
                              isHidden
                                ? "bg-yellow-100 border-4 border-dashed border-yellow-400"
                                : "bg-white border-b-4 border-blue-400"
                            } ${
                              feedback === "benar" && isHidden
                                ? "bg-blue-100 border-blue-500"
                                : feedback === "salah" && isHidden
                                ? "bg-red-100 border-red-500"
                                : ""
                            }`}
                          >

                            {isHidden ? (
                              <input
                                ref={(el) => {
                                  inputRefs.current[index] = el
                                }}
                                type="text"
                                value={answers[index] || ""}
                                maxLength={1}
                                disabled={answered}
                                onChange={(e) =>
                                  handleChange(index, e.target.value)
                                }
                                onFocus={(e) => e.target.select()}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    handleCheck()
                                  }
                                }}
                                className="w-full h-full bg-transparent text-center text-3xl md:text-4xl font-extrabold text-purple-600 outline-none lowercase caret-purple-600"
                              />
                            ) : (
                              <span className="text-3xl md:text-4xl font-extrabold text-blue-600">
                                {letter}
                              </span>
                            )}

                          </div>
                        )
                      })}

                    </div>

                    <p className="text-center text-gray-500 mt-6 font-semibold">
                      Ketik huruf yang tepat pada kotak kosong!
                    </p>

                    {/* TOMBOL PERIKSA */}
                    <button
                      onClick={handleCheck}
                      disabled={
                        answered ||
                        !currentRound.hiddenIndices.every(
                          (index) => answers[index]?.trim() !== ""
                        )
                      }
                      className="w-full mt-6 py-4 bg-gradient-to-r from-blue-400 to-blue-600 text-white text-xl font-extrabold rounded-2xl shadow-lg hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition"
                    >
                      ✓ PERIKSA JAWABAN
                    </button>

                  </div>

                </div>

              </div>

            </div>

          )}

          {/* PROGRESS */}
          {started && (
            <div className="bg-white/50 rounded-full h-4 overflow-hidden mt-6 shadow">
              <div
                className="bg-blue-400 h-full transition-all duration-500"
                style={{
                  width: `${((questionIndex + (finished ? 1 : 0)) / 15) * 100}%`,
                }}
              />
            </div>
          )}

          {/* HASIL AKHIR */}
          {finished && (

            <div className="bg-white/50 rounded-3xl shadow-xl p-8 text-center">

              <img
                src="/images/goodjob.png"
                alt="Anak juara"
                className="w-64 md:w-80 h-auto object-contain mx-auto"
              />

              <h2 className="text-4xl font-extrabold text-blue-500 mt-3">
                LUAR BIASA! 🎉
              </h2>

              <p className="text-lg text-gray-600 mt-3">
                Kamu berhasil menyelesaikan 15 soal!
              </p>

              <div className="grid grid-cols-2 gap-4 mt-7">

                <div className="bg-yellow-50 p-5 rounded-2xl">
                  <p className="text-gray-500">SKOR AKHIR</p>
                  <p className="text-4xl font-bold text-orange-500">
                    {Math.round(score)}
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
                className="mt-8 mx-auto bg-blue-500 hover:bg-blue-600 text-white px-12 py-4 rounded-full text-4xl font-bold flex items-center justify-center"
              >
                <FaPlayCircle />
              </button>

            </div>

          )}

          <div className="text-center text-gray-500 text-sm mt-6">
            🌈 Belajar menulis menjadi lebih menyenangkan!
          </div>

        </div>
      </div>

      {/* MODAL FEEDBACK */}
      {feedback && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className={`w-full max-w-sm rounded-3xl border-4 p-8 text-center shadow-2xl ${
            feedback === "benar"
              ? "border-blue-400 bg-blue-100"
              : "border-red-400 bg-red-100"
          }`}>

            {feedback === "benar" ? (
              <>
                <div className="text-8xl text-blue-600">✓</div>

                <h2 className="mt-3 text-3xl font-bold text-blue-700">
                  Hebat!
                </h2>

                <div className="mt-3 text-4xl">
                  ⭐⭐⭐⭐⭐
                </div>
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

export default WritingLatter
