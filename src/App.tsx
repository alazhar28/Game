import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home"

import ColoringGame from "./games/ColoringGame/ColoringGame"
import NumberGame from "./games/NumberGame/NumberGame"
import MatchingGame from "./games/MatchingGame/MatchingGame"
import PuzzleGame from "./games/PuzzelGame/PuzzelGame"
import NumberMatchingGame from "./games/NumberMatchingGame/NumberMatchingGame"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/game/matching"
          element={<MatchingGame />}
        />

        <Route
          path="/game/coloring"
          element={<ColoringGame />}
        />

        <Route
          path="/game/number"
          element={<NumberGame />}
        />

        {/* MENCOCOKKAN GAMBAR */}
        <Route
          path="/game/number-matching"
          element={<NumberMatchingGame />}
        />

        <Route
          path="/game/puzzle"
          element={<PuzzleGame />}
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App