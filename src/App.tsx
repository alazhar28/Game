import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home"
import NumberGame from "./games/NumberGame/NumberGame"
import NumberMatchingGame from "./games/NumberMatchingGame/NumberMatchingGame"
import VokalGame from "./games/VocalGame/VocalGame"
import AnimalGroupingGame from "./games/GroupingGame/AnimalGroupingGame"
import WritingLatter from "./games/WritingLetter/WrittingLatter"
import CowFeedingGame from "./games/MatchingGame/SapiGame"
import WritingLatterCow from "./games/WritingLetter/WrittingLatterCow"

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/game/sapi"
          element={<CowFeedingGame />}
        />

        <Route
          path="/game/tulissapi"
          element={<WritingLatterCow />}
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
          path="/game/writting"
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