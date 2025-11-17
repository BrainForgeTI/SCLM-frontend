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
import { GenPlansPage } from "./routes/GenPlans/GenPlansPage";
import { UserWrapper } from "./components/user-wrapper";

function App() {
  return (
    <Providers>
      <Routes>
        <Route path="/home" element={<UserWrapper><HomePage /></UserWrapper>} />,
        <Route path="/signin" element={<SignInPage />} />,
        <Route path="/tasks" element={<UserWrapper><SecondaryMissionsPage /></UserWrapper>} />,
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/character" element={<CharacterPage />}></Route>
        <Route path="/plans" element={<GenPlansPage/>}></Route>
        <Route
          path="/adventure/:id/home"
          element={
            <UserWrapper>
              <AdventureWrapper>
                <AdventurePage />
              </AdventureWrapper>
            </UserWrapper>
          }
        />
        <Route
          path="/adventure/:id/content"
          element={
            <UserWrapper>
              <AdventureWrapper>
                <MyAdventurePage />
              </AdventureWrapper>
            </UserWrapper>
          }
        />
        <Route path="/create-character" element={<CreateCharacterPage />} />
        <Route
          path="/adventure/:id/notebook/:missionId"
          element={
            <UserWrapper>
              <AdventureWrapper>
                <NotebookPage />
              </AdventureWrapper>
            </UserWrapper>
          }
        />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Providers>
  );
}

export default App;
