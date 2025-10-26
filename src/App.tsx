import { Route, Routes } from "react-router";
import { HomePage } from "./routes/Home/HomePage";
import { SignInPage } from "./routes/SignIn";
import { SecondaryMissionsPage } from "./routes/SecondaryMissions/SecondaryMissionsPage";
import { AdventurePage } from "./routes/Adventure";
import { CharacterPage } from "./routes/Character/CharacterPage";
import { Providers } from "./components/V2/providers";
import { SignUpPage } from "./routes/SignUp";
import { CreateCharacterPage } from "./routes/v2/CreateCharacter";
import { NotebookPage } from "./routes/Notebook/NotebookPage";
import { MyAdventurePage } from "./routes/v2/adventure/my-adventure";
import { AdventureWrapper } from "./components/V2/adventure/adventure-wrapper";
import { LandingPage } from "./routes/Landing/LandingPage";

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
          path="/adventure/:id/home"
          element={
            <AdventureWrapper>
              <AdventurePage />
            </AdventureWrapper>
          }
        />
        <Route
          path="/adventure/:id/content"
          element={
            <AdventureWrapper>
              <MyAdventurePage />
            </AdventureWrapper>
          }
        />
        <Route path="/create-character" element={<CreateCharacterPage />} />
        <Route
          path="/adventure/:id/notebook/:missionId"
          element={<NotebookPage></NotebookPage>}
        />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Providers>
  );
}

export default App;
