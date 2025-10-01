import { Route, Routes } from "react-router";
import { HomePage } from "./routes/Home/HomePage";
import { SignInPage } from "./routes/SignIn";
import { SecondaryMissionsPage } from "./routes/SecondaryMissions/SecondaryMissionsPage";
import { AdventurePage } from "./routes/Adventure";
import { AdventureAuth } from "./context/adventure/AdventureAuth";
import { CharacterPage } from "./routes/Character/CharacterPage";
import { Providers } from "./components/V2/providers";
import { SignUpPage } from "./routes/SignUp";
import { CreateCharacterPage } from "./routes/v2/CreateCharacter";
import { NotebookPage } from "./routes/Notebook/NotebookPage";
import { MyAdventurePage } from "./routes/MyAdventure";

function App() {
  return (
    <Providers>
      <Routes>
        <Route path="/home" element={<HomePage />} />,
        <Route path="/signin" element={<SignInPage />} />,
        <Route path="/tasks" element={<SecondaryMissionsPage />} />,
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/character" element={<CharacterPage />}></Route>
        <Route
          path="/adventure/:id"
          element={
            <AdventureAuth>
              <AdventurePage />
            </AdventureAuth>
          }
        />
        <Route
          path="/my_adventure/:id"
          element={
            <AdventureAuth>
              <MyAdventurePage />
            </AdventureAuth>
          }
        />
        <Route path="/create-character" element={<CreateCharacterPage />} />
        <Route path="/notebook/:id" element={<NotebookPage></NotebookPage>} />
      </Routes>
    </Providers>
  );
}

export default App;
