
import { useState } from "react"


const imageList = [
  "/images/geometri/roda.png",
  "/images/geometri/sapi.png",
  "/images/geometri/buku.png",
  "/images/geometri/bola.png",
  "/images/geometri/meja.png",
  "/images/geometri/topi.png",
  "/images/geometri/kuda.png",
  "/images/geometri/roti.png",
  "/images/geometri/mata.png",
  "/images/geometri/susu.png",
  "/images/geometri/paku.png",
  "/images/geometri/pita.png",
  "/images/geometri/nasi.png",
  "/images/geometri/kaca.png",
  "/images/geometri/baju.png",
]
type Question = {
  id: number
  answer: number
  options: number[]
  image: string
}

// MEMBUAT SOAL ACAK
function createQuestion(id: number): Question {
  const answer = Math.floor(Math.random() * 6) + 1

  const wrongNumbers = [1, 2, 3, 4, 5, 6].filter(
    (number) => number !== answer
  )

  const shuffledWrong = [...wrongNumbers].sort(
    () => Math.random() - 0.5
  )

  const options = [
    answer,
    shuffledWrong[0],
    shuffledWrong[1],
  ].sort(() => Math.random() - 0.5)

  // PILIH GAMBAR ACAK DARI 15 GAMBAR
  const randomImage =
    imageList[Math.floor(Math.random() * imageList.length)]

  return {
    id,
    answer,
    options,
    image: randomImage,
  }
}

function NumberGame() {
  const [question, setQuestion] = useState<Question>(() =>
    createQuestion(1)
  )

  const [score, setScore] = useState(0)
  const [questionNumber, setQuestionNumber] = useState(1)

  const [feedback, setFeedback] = useState<
    "correct" | "wrong" | null
  >(null)

  const [showFinish, setShowFinish] = useState(false)

  const totalQuestions = 10

  // MEMERIKSA JAWABAN
  const handleAnswer = (number: number) => {
    if (feedback) return

    if (number === question.answer) {
      setFeedback("correct")
      setScore((current) => current + 1)

      setTimeout(() => {
        if (questionNumber >= totalQuestions) {
          setShowFinish(true)
          setFeedback(null)
        } else {
          setQuestionNumber((current) => current + 1)
          setQuestion(createQuestion(questionNumber + 1))
          setFeedback(null)
        }
      }, 1000)
    } else {
      setFeedback("wrong")
    }
  }

  // COBA LAGI
  const tryAgain = () => {
    setFeedback(null)
  }

  // ULANG PERMAINAN
  const restartGame = () => {
    setQuestionNumber(1)
    setScore(0)
    setFeedback(null)
    setShowFinish(false)
    setQuestion(createQuestion(1))
  }

  return (
    <div className="min-h-screen bg-amber-50 p-4 md:p-8">

      {/* HEADER */}
      <div className="max-w-5xl mx-auto text-center">

        <h1 className="
          text-4xl
          md:text-5xl
          font-bold
          text-green-600
        ">
          🌾 Yuk Mengenal Angka!
        </h1>

        <p className="
          text-lg
          md:text-xl
          text-gray-600
          mt-2
        ">
          Hitung jumlahnya, lalu pilih angka yang benar!
        </p>

        {/* INFO */}
        <div className="
          flex
          justify-center
          gap-3
          mt-5
          flex-wrap
        ">

          <div className="
            bg-white
            px-5
            py-3
            rounded-full
            shadow
          ">
            <span className="font-bold text-lg">
              🌾 Soal {questionNumber}/{totalQuestions}
            </span>
          </div>

          <div className="
            bg-white
            px-5
            py-3
            rounded-full
            shadow
          ">
            <span className="font-bold text-lg">
              ⭐ Skor: {score}
            </span>
          </div>

        </div>
      </div>

      {/* GAME AREA */}
      <div className="
        max-w-5xl
        mx-auto
        mt-8
        bg-white
        rounded-[2rem]
        shadow-xl
        p-5
        md:p-10
      ">

        <div className="
          grid
          md:grid-cols-2
          gap-8
          items-center
        ">

          {/* PILIHAN ANGKA */}
          <div className="text-center">

            <h2 className="
              text-2xl
              md:text-3xl
              font-bold
              text-green-600
              mb-5
            ">
              Pilih Angkanya
            </h2>

            <div className="
              flex
              justify-center
              gap-4
            ">

              {question.options.map((number) => (

                <button
                  key={number}
                  onClick={() => handleAnswer(number)}
                  disabled={feedback !== null}
                  className="
                    w-20
                    h-20
                    md:w-24
                    md:h-24
                    rounded-3xl
                    bg-green-100
                    border-4
                    border-green-300
                    text-4xl
                    md:text-5xl
                    font-bold
                    text-green-700
                    shadow-lg
                    hover:bg-green-200
                    hover:scale-105
                    active:scale-95
                    transition
                    disabled:opacity-70
                  "
                >
                  {number}
                </button>

              ))}

            </div>
          </div>

          {/* JUMLAH GAMBAR */}
          <div className="text-center">

            <h2 className="
              text-2xl
              md:text-3xl
              font-bold
              text-amber-600
              mb-5
            ">
              Ada Berapa?
            </h2>

            <div className="
              min-h-[220px]
              bg-amber-50
              rounded-3xl
              p-6
              flex
              flex-wrap
              justify-center
              items-center
              gap-3
              border-4
              border-amber-100
            ">

              {Array.from({
                length: question.answer,
              }).map((_, index) => (

                <img
                  key={index}
                  src={question.image}
                  alt="Gambar untuk dihitung"
                  className="
                    w-16
                    h-16
                    md:w-20
                    md:h-20
                    object-contain
                    animate-pulse
                  "
                />

              ))}

            </div>
          </div>

        </div>

        {/* PETUNJUK */}
        <div className="
          mt-8
          text-center
          bg-blue-50
          rounded-2xl
          p-4
        ">

          <p className="
            text-lg
            md:text-xl
            font-semibold
            text-blue-600
          ">
            👆 Hitung gambarnya dengan teliti, ya!
          </p>

        </div>
      </div>

      {/* FEEDBACK BENAR */}
      {feedback === "correct" && (

        <div className="
          fixed
          inset-0
          bg-black/30
          flex
          items-center
          justify-center
          p-5
          z-50
        ">

          <div className="
            bg-white
            rounded-[2rem]
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
              Benar!
            </h2>

            <p className="
              text-xl
              text-gray-600
              mt-3
            ">
              MasyaAllah, hebat sekali!
            </p>

            <p className="
              text-lg
              text-gray-500
              mt-2
            ">
              Jawabannya adalah
            </p>

            <div className="
              text-6xl
              font-bold
              text-green-600
              mt-2
            ">
              {question.answer}
            </div>

          </div>
        </div>
      )}

      {/* FEEDBACK SALAH */}
      {feedback === "wrong" && (

        <div className="
          fixed
          inset-0
          bg-black/30
          flex
          items-center
          justify-center
          p-5
          z-50
        ">

          <div className="
            bg-white
            rounded-[2rem]
            shadow-2xl
            p-8
            text-center
            max-w-md
            w-full
          ">

            <div className="text-7xl">
              😊
            </div>

            <h2 className="
              text-3xl
              md:text-4xl
              font-bold
              text-orange-500
              mt-3
            ">
              Belum tepat!
            </h2>

            <p className="
              text-xl
              text-gray-600
              mt-3
            ">
              Yuk, hitung lagi gambarnya.
            </p>

            <button
              onClick={tryAgain}
              className="
                mt-6
                bg-orange-400
                text-white
                px-8
                py-4
                rounded-full
                text-xl
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

      {/* SELESAI */}
      {showFinish && (

        <div className="
          fixed
          inset-0
          bg-black/40
          flex
          items-center
          justify-center
          p-5
          z-50
        ">

          <div className="
            bg-white
            rounded-[2rem]
            shadow-2xl
            p-8
            text-center
            max-w-md
            w-full
          ">

            <div className="text-7xl">
              🏆
            </div>

            <h2 className="
              text-4xl
              font-bold
              text-green-500
              mt-3
            ">
              Hebat!
            </h2>

            <p className="
              text-xl
              text-gray-600
              mt-3
            ">
              Kamu sudah menyelesaikan semua soal!
            </p>

            <div className="
              text-3xl
              font-bold
              text-yellow-500
              mt-5
            ">
              ⭐ Skor: {score}/{totalQuestions}
            </div>

            <button
              onClick={restartGame}
              className="
                mt-7
                bg-green-500
                text-white
                px-8
                py-4
                rounded-full
                text-xl
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

      {/* RESET */}
      <div className="text-center mt-7">

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
          🔄 Mulai dari Awal
        </button>

      </div>

    </div>
  )
}

export default NumberGame
