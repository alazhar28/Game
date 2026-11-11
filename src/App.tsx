import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home"

import NumberGame from "./games/NumberGame/NumberGame"
import MatchingGame from "./games/MatchingGame/MatchingGame"
import NumberMatchingGame from "./games/NumberMatchingGame/NumberMatchingGame"
import VokalGame from "./games/VocalGame/VocalGame"
import WaitingPage from "./games/WaitingPage/WaitingPage"
import WritingLatter from "./games/WritingLetter/WrittingLatter"
import AnimalGroupingGame from "./games/GroupingGame/AnimalGroupingGame"

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
          path="/game/waiting"
          element={<WaitingPage />}
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
          path="/game/vocal"
          element={<VokalGame />}
        />

        <Route
          path="/game/writing"
          element={<WritingLatter />}
        />

        <Route
          path="/game/animal-grouping"
          element={<AnimalGroupingGame />}
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App