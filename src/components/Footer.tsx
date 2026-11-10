
function Footer() {
  return (
    <footer className="relative z-1 backdrop-blur-md border-t border-blue-200 py-6 px-4 mt-12">

      <div className="max-w-5xl mx-auto text-center">

        <p className="text-sm md:text-base font-bold text-blue-700">
          🎮 KB-TK IA Game
        </p>

        <p className="text-xs md:text-sm text-gray-900 mt-2">
          Original Game Created by{" "}
          <span className="font-bold text-blue-600">Septania</span>
        </p>

        <p className="text-xs md:text-sm text-gray-900">
          Khusus untuk KB-TK Islam Al Azhar 28 Solo Baru
        </p>

        {/* MEDIA SOSIAL */}
        <div className="flex justify-center items-center gap-5 mt-4">

          <a href="#" target="_blank" rel="noreferrer"
            className="text-pink-600 hover:scale-125 transition text-2xl"
            title="Instagram">
            📸
          </a>

          <a href="#" target="_blank" rel="noreferrer"
            className="text-red-600 hover:scale-125 transition text-2xl"
            title="YouTube">
            ▶️
          </a>

          <a href="#" target="_blank" rel="noreferrer"
            className="text-blue-700 hover:scale-125 transition text-2xl"
            title="Facebook">
            f
          </a>

          <a href="#" target="_blank" rel="noreferrer"
            className="text-green-600 hover:scale-125 transition text-2xl"
            title="WhatsApp">
            💬
          </a>

        </div>

        <div className="border-t border-gray-200 mt-5 pt-4">

          <p className="text-xs text-gray-900">
            © {new Date().getFullYear()} KB-TK Islam Al Azhar 28 Solo Baru.
            All Rights Reserved.
          </p>

          <p className="text-xs text-gray-900 mt-1">
            Made with ❤️ for Little Learners
          </p>

        </div>

      </div>
    </footer>
  )
}

export default Footer
