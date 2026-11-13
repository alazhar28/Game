
import { useEffect, useState } from "react"
import { FaPlayCircle } from "react-icons/fa"
import { BackHomeButton, StopButton } from "../../components/BackButton"

type Question = {
  id: number
  name: string
  image: string
}

// =====================================
// DATA SOAL
// CUKUP TAMBAHKAN / GANTI NAMA DAN GAMBAR
// =====================================

const questions: Question[] = [
  { id: 1, name: "Kambing", image: "/images/geometri/kambing.png" },
  { id: 2, name: "Sapi", image: "/images/geometri/sapi.png" },
  { id: 3, name: "Gajah", image: "/images/geometri/gajah.png" },
  { id: 4, name: "Buku", image: "/images/geometri/buku.png" },
  { id: 5, name: "Bola", image: "/images/geometri/bola.png" },
  { id: 6, name: "Meja", image: "/images/geometri/meja.png" },
  { id: 7, name: "Topi", image: "/images/geometri/topi.png" },
  { id: 8, name: "Kuda", image: "/images/geometri/kuda.png" },
  { id: 9, name: "Roti", image: "/images/geometri/roti.png" },
  { id: 10, name: "Mata", image: "/images/geometri/mata.png" },
  { id: 11, name: "Susu", image: "/images/geometri/susu.png" },
  { id: 12, name: "Paku", image: "/images/geometri/paku.png" },
  { id: 13, name: "Pita", image: "/images/geometri/pita.png" },
  { id: 14, name: "Nasi", image: "/images/geometri/nasi.png" },
  { id: 15, name: "Baju", image: "/images/geometri/baju.png" },
]

// =====================================
// FUNGSI ACAK
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
// URUTAN HURUF YANG HILANG
// =====================================

function createMissingOrder(word: string): number[] {
  const firstIndex = Math.min(4, word.length - 1)

  return [
    firstIndex,
    ...Array.from({ length: word.length }, (_, i) => i)
      .filter((i) => i !== firstIndex),
  ]
}

// =====================================
// KOMPONEN GAME
// =====================================

function MissingLetterGame() {
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([])
  const [questionIndex, setQuestionIndex] = useState(0)

  const [missingOrder, setMissingOrder] = useState<number[]>([])
  const [missingStep, setMissingStep] = useState(0)
  const [choices, setChoices] = useState<string[]>([])

  const [score, setScore] = useState(0)
  const [seconds, setSeconds] = useState(0)

  const [started, setStarted] = useState(false)
  const [finished, setFinished] = useState(false)

  const [feedback, setFeedback] = useState("")
  const [answered, setAnswered] = useState(false)

  // NAMA PEMAIN
  const [playerName, setPlayerName] = useState("")

  const question = shuffledQuestions[questionIndex]

  // JUMLAH SELURUH HURUF DALAM SEMUA SOAL
  const totalLetters = shuffledQuestions.reduce(
    (total, item) => total + item.name.length,
    0
  )

  // JUMLAH HURUF YANG SUDAH DITEMUKAN
  const completedLetters =
    shuffledQuestions
      .slice(0, questionIndex)
      .reduce((total, item) => total + item.name.length, 0)
    + missingStep

  const currentMissingIndex = missingOrder[missingStep]

  // =====================================
  // TIMER
  // =====================================

  useEffect(() => {
    if (!started || finished) return

    const timer = setInterval(() => {
      setSeconds((current) => current + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [started, finished])

  // =====================================
  // FORMAT WAKTU
  // =====================================

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
  // SIAPKAN SOAL
  // =====================================

  const prepareQuestion = (item: Question) => {
    const order = createMissingOrder(item.name)

    setMissingOrder(order)
    setMissingStep(0)

    setChoices(
      shuffle(item.name.toLowerCase().split(""))
    )
  }

  // =====================================
  // MULAI GAME
  // =====================================

  const startGame = () => {
    if (!playerName.trim() || questions.length === 0) return

    const newQuestions = shuffle(questions)

    setShuffledQuestions(newQuestions)
    setQuestionIndex(0)

    setScore(0)
    setSeconds(0)

    setFeedback("")
    setAnswered(false)
    setFinished(false)

    prepareQuestion(newQuestions[0])

    setStarted(true)
  }

  // =====================================
  // LANJUT SOAL BERIKUTNYA
  // =====================================

  const nextQuestion = () => {
    if (questionIndex + 1 >= shuffledQuestions.length) {
      setFinished(true)
      return
    }

    const nextIndex = questionIndex + 1
    const next = shuffledQuestions[nextIndex]

    setQuestionIndex(nextIndex)
    prepareQuestion(next)
  }

  // =====================================
  // PILIH HURUF
  // =====================================

  const handleAnswer = (letter: string) => {
    if (answered || !question) return

    setAnswered(true)

    const correctLetter = question.name[
      currentMissingIndex
    ].toLowerCase()

    const isCorrect = letter === correctLetter

    if (isCorrect) {
      setScore((current) => current + (100 / totalLetters))
      setFeedback("benar")
    } else {
      setFeedback("salah")
    }

    setTimeout(() => {
      setFeedback("")
      setAnswered(false)

      if (isCorrect) {

        // MASIH ADA HURUF YANG BELUM DICARI
        if (missingStep + 1 < missingOrder.length) {
          const nextStep = missingStep + 1

          setMissingStep(nextStep)

          // ACAK ULANG PILIHAN HURUF
          setChoices(
            shuffle(question.name.toLowerCase().split(""))
          )

        } else {

          // SEMUA HURUF SUDAH LENGKAP
          nextQuestion()
        }
      }
    }, 1200)
  }

  // =====================================
  // HANDLE STOP
  // =====================================

  const handleStop = () => {
    setStarted(false)
    setFinished(true)
  }

  // =====================================
  // MAIN LAGI
  // =====================================

  const restartGame = () => {
    setStarted(false)
    setFinished(false)

    setShuffledQuestions([])
    setQuestionIndex(0)

    setMissingOrder([])
    setMissingStep(0)
    setChoices([])

    setScore(0)
    setSeconds(0)

    setFeedback("")
    setAnswered(false)
  }

  // =====================================
  // TAMPILAN
  // =====================================

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

        {/* TOMBOL KEMBALI HOME */}
        <BackHomeButton />

        <StopButton onStop={handleStop} />

        <div className="max-w-5xl mx-auto">

          {/* JUDUL */}
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-5xl font-judul font-extrabold text-blue-600">
              🔤 Lengkapi Huruf yang Hilang!
            </h1>
          </div>

          {/* NAMA PEMAIN */}
          {started && !finished && (
            <div className="text-center mb-5">
              <div className="inline-block bg-blue-100 border-2 border-blue-300 rounded-full px-6 py-3 shadow-md">
                <p className="text-xl font-extrabold text-blue-600">
                  🦕 {playerName} 🦖
                </p>
              </div>
            </div>
          )}

          {/* INFORMASI */}
          <div className="flex justify-center gap-3 mb-6">

            <div className="bg-white/30 rounded-2xl shadow px-4 py-3 text-center flex-1">
              <p className="text-sm text-gray-500">SOAL</p>
              <p className="text-2xl font-bold text-blue-600">
                {started && !finished
                  ? questionIndex + 1
                  : finished
                    ? shuffledQuestions.length
                    : 0}
                /{questions.length}
              </p>
            </div>

            <div className="bg-white/30 rounded-2xl shadow px-4 py-3 text-center flex-1">
              <p className="text-sm text-gray-500">SKOR</p>
              <p className="text-2xl font-bold text-blue-500">
                {Math.round(score)}
              </p>
            </div>

            <div className="bg-white/30 rounded-2xl shadow px-4 py-3 text-center flex-1">
              <p className="text-sm text-gray-500">WAKTU</p>
              <p className="text-2xl font-bold text-orange-500">
                {formatTime(seconds)}
              </p>
            </div>

          </div>

          {/* HALAMAN MULAI */}
          {!started && !finished && (
            <div className="bg-white/50 rounded-3xl p-8 text-center shadow-xl mt-8">

              <div className="text-8xl mb-5">🔤</div>

              <h2 className="text-3xl font-bold text-blue-600">
                Siap Bermain?
              </h2>

              {/* INPUT NAMA */}
              <div className="mt-6 max-w-md mx-auto">

                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") startGame()
                  }}
                  placeholder="Tulis namamu di sini..."
                  className="w-full px-5 py-4 text-xl text-center font-bold border-4 border-blue-300 rounded-2xl focus:outline-none focus:border-blue-500 bg-white text-blue-600"
                />

              </div>

              <button
                onClick={startGame}
                disabled={!playerName.trim() || questions.length === 0}
                className="mt-8 mx-auto w-full max-w-xs py-4 px-6 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white text-xl font-extrabold rounded-full shadow-lg border-4 border-white flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <FaPlayCircle className="text-4xl" />
                Mulai
              </button>

            </div>
          )}

          {/* PAPAN PERMAINAN */}
          {started && !finished && question && (

            <div className="bg-white/30 rounded-3xl shadow-xl p-5 md:p-8">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">

                {/* GAMBAR KIRI */}
                <div className="flex flex-col items-center">

                  <div className="w-full max-w-sm aspect-square bg-blue-50 border-4 border-blue-300 rounded-3xl p-4 flex flex-col items-center justify-center transition-transform duration-300 hover:scale-105 hover:shadow-xl">

                    <img
                      key={question.id}
                      src={question.image}
                      alt={question.name}
                      draggable={false}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = "none"
                      }}
                    />

                  </div>

                  <p className="text-gray-500 font-semibold mt-3">
                    🖼️ Apa nama gambar ini?
                  </p>

                </div>

                {/* HURUF KANAN */}
                <div className="flex flex-col items-center justify-center">

                  <div className="w-full bg-purple-50 rounded-3xl border-4 border-purple-200 p-5 md:p-8">

                    <h3 className="text-center text-xl font-bold text-purple-600 mb-8">
                      ✏️ LENGKAPI HURUF
                    </h3>

                    {/* KOTAK HURUF */}
                    <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3">

                      {question.name.split("").map((letter, index) => {

                        const isMissing = index === currentMissingIndex

                        return (
                          <div
                            key={index}
                            className={`w-10 h-14 sm:w-12 sm:h-16 md:w-14 md:h-20 rounded-xl flex items-center justify-center ${
                              isMissing
                                ? feedback === "benar"
                                  ? "bg-blue-100 border-4 border-blue-500"
                                  : feedback === "salah"
                                    ? "bg-red-100 border-4 border-red-400"
                                    : "bg-yellow-100 border-4 border-dashed border-yellow-400"
                                : "bg-white border-b-4 border-blue-400"
                            }`}
                          >
                            <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-blue-600">
                              {isMissing
                                ? feedback === "benar"
                                  ? letter.toLowerCase()
                                  : "_"
                                : letter.toLowerCase()}
                            </span>
                          </div>
                        )
                      })}

                    </div>

                    <p className="text-center text-gray-500 mt-5 font-semibold">
                      Huruf apa yang tepat?
                    </p>

                    {/* PILIHAN HURUF ACAK */}
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 mt-5">

                      {choices.map((letter, index) => (

                        <button
                          key={`${letter}-${index}`}
                          disabled={answered}
                          onClick={() => handleAnswer(letter)}
                          className="aspect-square bg-white border-4 border-yellow-300 rounded-2xl text-3xl md:text-4xl font-extrabold text-orange-500 shadow-md hover:bg-yellow-100 hover:scale-110 active:scale-95 disabled:opacity-60 transition"
                        >
                          {letter}
                        </button>

                      ))}

                    </div>

                  </div>

                </div>

              </div>

            </div>

          )}

          {/* PROGRESS */}
          {started && (
            <div className="bg-white/30 rounded-full h-4 overflow-hidden mt-6 shadow">
              <div
                className="bg-blue-400 h-full transition-all duration-500"
                style={{
                  width: `${
                    totalLetters > 0
                      ? (
                          (finished ? totalLetters : completedLetters)
                          / totalLetters
                        ) * 100
                      : 0
                  }%`,
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
                WAAAH, {playerName.toUpperCase()}!
              </h2>

              <h2 className="text-3xl font-extrabold text-orange-500 mt-2">
                HEBAT SEKALI! 🎉
              </h2>

              <p className="text-lg text-gray-600 mt-3">
                Kamu hebat sudah belajar melengkapi huruf!
              </p>

              {/* SKOR DAN WAKTU */}
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

              {/* MAIN LAGI */}
              <button
                onClick={restartGame}
                className="mt-8 bg-blue-500 hover:bg-blue-600 text-white px-10 py-4 rounded-full text-4xl font-bold shadow-lg hover:scale-105 transition"
              >
                <FaPlayCircle />
              </button>

              <p className="text-gray-500 mt-3 font-semibold">
                Main Lagi
              </p>

            </div>

          )}

          <div className="text-center text-gray-500 text-sm mt-6">
            🌈 Belajar membaca menjadi lebih menyenangkan!
          </div>

        </div>
      </div>

      {/* FEEDBACK */}
      {feedback && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">

          <img
            src={
              feedback === "benar"
                ? "/images/geometri/benar1.png"
                : "/images/geometri/salah1.png"
            }
            alt={feedback === "benar" ? "Benar" : "Coba lagi"}
            className="w-[500px] h-[500px] md:w-[600px] md:h-[600px] object-contain drop-shadow-2xl animate-bounce"
          />

        </div>
      )}

    </div>
  )
}

export default MissingLetterGame
