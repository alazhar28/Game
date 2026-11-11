
import { useEffect, useState } from "react"
import { FaPlayCircle } from "react-icons/fa"
import { IoArrowBackCircle } from "react-icons/io5"
import { useNavigate } from "react-router-dom"

type Question = {
  id: number
  name: string
  image: string
  letters: string[]
  answer: string
}

const vowels = ["a", "i", "u", "e", "o"]

const questions: Question[] = [
  { id: 1, name: "Roda", image: "/images/geometri/roda.png", letters: ["r", "o", "d"], answer: "a" },
  { id: 2, name: "Sapi", image: "/images/geometri/sapi.png", letters: ["s", "a", "p"], answer: "i" },
  { id: 3, name: "Buku", image: "/images/geometri/buku.png", letters: ["b", "u", "k"], answer: "u" },
  { id: 4, name: "Bola", image: "/images/geometri/bola.png", letters: ["b", "o", "l"], answer: "a" },
  { id: 5, name: "Meja", image: "/images/geometri/meja.png", letters: ["m", "e", "j"], answer: "a" },
  { id: 6, name: "Topi", image: "/images/geometri/topi.png", letters: ["t", "o", "p"], answer: "i" },
  { id: 7, name: "Kuda", image: "/images/geometri/kuda.png", letters: ["k", "u", "d"], answer: "a" },
  { id: 8, name: "Roti", image: "/images/geometri/roti.png", letters: ["r", "o", "t"], answer: "i" },
  { id: 9, name: "Mata", image: "/images/geometri/mata.png", letters: ["m", "a", "t"], answer: "a" },
  { id: 10, name: "Susu", image: "/images/geometri/susu.png", letters: ["s", "u", "s"], answer: "u" },
  { id: 11, name: "Paku", image: "/images/geometri/paku.png", letters: ["p", "a", "k"], answer: "u" },
  { id: 12, name: "Pita", image: "/images/geometri/pita.png", letters: ["p", "i", "t"], answer: "a" },
  { id: 13, name: "Nasi", image: "/images/geometri/nasi.png", letters: ["n", "a", "s"], answer: "i" },
  { id: 14, name: "Kaca", image: "/images/geometri/kaca.png", letters: ["k", "a", "c"], answer: "a" },
  { id: 15, name: "Baju", image: "/images/geometri/baju.png", letters: ["b", "a", "j"], answer: "u" },
]

function shuffle<T,>(array: T[]): T[] {
  const result = [...array]

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }

  return result
}

function VokalGame() {
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([])
  const [questionIndex, setQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [started, setStarted] = useState(false)
  const [finished, setFinished] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [answered, setAnswered] = useState(false)

  // NAMA PEMAIN
  const [playerName, setPlayerName] = useState("")

  const navigate = useNavigate()

  const question = shuffledQuestions[questionIndex]

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
    if (!playerName.trim()) return

    setShuffledQuestions(shuffle(questions))
    setQuestionIndex(0)
    setScore(0)
    setSeconds(0)
    setFeedback("")
    setAnswered(false)
    setFinished(false)
    setStarted(true)
  }

  // PILIH HURUF
  const handleAnswer = (letter: string) => {
    if (answered || !question) return

    setAnswered(true)

    const isCorrect = letter === question.answer

    if (isCorrect) {
      setScore((current) => current + (100 / 15))
      setFeedback("benar")
    } else {
      setFeedback("salah")
    }

    setTimeout(() => {
      if (questionIndex + 1 >= shuffledQuestions.length) {
        setFinished(true)
      } else {
        setQuestionIndex((current) => current + 1)
      }

      setFeedback("")
      setAnswered(false)
    }, 1500)
  }

  // MAIN LAGI
  const restartGame = () => {
    setStarted(false)
    setFinished(false)
    setShuffledQuestions([])
    setQuestionIndex(0)
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

        {/* TOMBOL KEMBALI HOME */}
        <button
          onClick={() => navigate("/")}
          className="fixed top-4 left-4 z-50 flex items-center gap-2
          bg-blue-600 text-white px-4 py-3 rounded-full
          shadow-lg border-2 border-white
          hover:bg-blue-300 hover:scale-105 transition
          hover:text-blue-600 hover:border-blue-600"
        >
          <IoArrowBackCircle className="text-4xl" />
          <span className="font-bold">Kembali</span>
        </button>

        <div className="max-w-5xl mx-auto">

          {/* JUDUL */}
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-5xl font-extrabold text-blue-600">
              🔤 Lengkapi Huruf yang Hilang!
            </h1>
          </div>

          {/* NAMA PEMAIN SAAT GAME BERLANGSUNG */}
          {started && !finished && (
            <div className="text-center mb-5">
              <div className="inline-block bg-blue-100 border-2 border-blue-300
              rounded-full px-6 py-3 shadow-md">
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
                {started && !finished ? questionIndex + 1 : finished ? 15 : 0}/15
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
                  className="w-full px-5 py-4 text-xl text-center font-bold
                  border-4 border-blue-300 rounded-2xl
                  focus:outline-none focus:border-blue-500
                  bg-white text-blue-600"
                />

              </div>

              <button
                onClick={startGame}
                disabled={!playerName.trim()}
                className="mt-8 mx-auto w-full max-w-xs py-4 px-6
                from-blue-400 via-blue-500 to-blue-600
                text-white text-xl font-extrabold rounded-full shadow-lg
                border-4 border-white flex items-center justify-center gap-3
                hover:scale-105 active:scale-95 transition
                disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <FaPlayCircle className="text-4xl" />
                Mulai
              </button>

            </div>
          )}

          {/* PAPAN PERMAINAN */}
          {started && !finished && question && (

            <div className="bg-white/30 rounded-3xl shadow-xl p-5 md:p-8">

              <h2 className="text-center text-xl md:text-2xl font-bold text-purple-600 mb-6">
                👀 Perhatikan Gambar dan Lengkapi Hurufnya!
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">

                {/* GAMBAR KIRI */}
                <div className="flex flex-col items-center">

                  <div className="w-full max-w-sm aspect-square bg-blue-50
                  border-4 border-blue-300 rounded-3xl p-4 flex flex-col
                  items-center justify-center transition-transform duration-300
                  hover:scale-105 hover:shadow-xl cursor-pointer">

                    <img
                      key={question.id}
                      src={question.image}
                      alt={question.name}
                      draggable={false}
                      className="w-full h-4/5 object-contain"
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

                  <div className="w-full bg-purple-50 rounded-3xl
                  border-4 border-purple-200 p-5 md:p-8">

                    <h3 className="text-center text-xl font-bold text-purple-600 mb-8">
                      ✏️ LENGKAPI HURUF
                    </h3>

                    <div className="flex justify-center items-center gap-2 md:gap-4">

                      {question.letters.map((letter, index) => (

                        <div
                          key={index}
                          className="w-14 h-16 md:w-16 md:h-20 bg-white
                          border-b-4 border-blue-400 rounded-xl flex
                          items-center justify-center"
                        >
                          <span className="text-3xl md:text-4xl font-extrabold text-blue-600">
                            {letter}
                          </span>
                        </div>

                      ))}

                      {/* KOTAK HURUF KOSONG */}
                      <div
                        className={`w-14 h-16 md:w-16 md:h-20 rounded-xl
                        border-4 border-dashed flex items-center justify-center
                        transition ${
                          feedback === "benar"
                            ? "bg-blue-100 border-blue-500"
                            : feedback === "salah"
                            ? "bg-red-100 border-red-500"
                            : "bg-yellow-100 border-yellow-400"
                        }`}
                      >

                        <span className="text-4xl font-extrabold text-purple-600">
                          {feedback === "benar"
                            ? question.answer
                            : "_"}
                        </span>

                      </div>

                    </div>

                    <p className="text-center text-gray-500 mt-5 font-semibold">
                      Huruf apa yang tepat?
                    </p>

                    {/* PILIHAN VOKAL */}
                    <div className="grid grid-cols-5 gap-2 mt-5">

                      {vowels.map((vowel) => (

                        <button
                          key={vowel}
                          disabled={answered}
                          onClick={() => handleAnswer(vowel)}
                          className="aspect-square bg-white border-4
                          border-yellow-300 rounded-2xl text-3xl md:text-4xl
                          font-extrabold text-orange-500 shadow-md
                          hover:bg-yellow-100 hover:scale-110 active:scale-95
                          disabled:opacity-60 transition"
                        >
                          {vowel}
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
                WAAAH, {playerName.toUpperCase()}!
              </h2>

              <h2 className="text-3xl font-extrabold text-orange-500 mt-2">
                HEBAT SEKALI! 🎉
              </h2>

              <p className="text-lg text-gray-600 mt-3">
                Kamu berhasil menyelesaikan 15 soal!
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
                className="mt-8 bg-blue-500 hover:bg-blue-600
                text-white px-10 py-4 rounded-full text-4xl
                font-bold shadow-lg hover:scale-105 transition"
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

      {/* MODAL FEEDBACK */}
      {feedback && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div
            className={`w-full max-w-sm rounded-3xl border-4 p-8
            text-center shadow-2xl ${
              feedback === "benar"
                ? "border-blue-400 bg-blue-100"
                : "border-red-400 bg-red-100"
            }`}
          >

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

export default VokalGame
