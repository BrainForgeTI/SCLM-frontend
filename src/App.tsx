import { Route, Routes } from "react-router"
import { HomePage } from "./routes/Home/HomePage"
import { SignUpPage } from "./routes/SignUp/SignUpPage"
import { AdventurePage } from "./routes/Adventure"
import { AdventureAuth } from "./context/adventure/AdventureAuth"
import { MyAdventurePage } from "./routes/MyAdventure"
import { CharacterPage } from "./routes/Character/CharacterPage"

function App() {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />,
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/character" element={<CharacterPage />}></Route>
      <Route path="/adventure/:id" element={<AdventureAuth><AdventurePage /></AdventureAuth>} />
      <Route path="/my_adventure/:id" element={<AdventureAuth><MyAdventurePage /></AdventureAuth>} />
    </Routes>
  )
}

export default App
