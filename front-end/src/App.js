import Nav from "./components/nav";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./components/signUp";
import Login from "./components/Login";
import Home from "./components/Home";
import View from "./components/view";
import Library from "./components/Library";
import { useCookies } from "react-cookie";
import MySong from "./components/MySong";
import NoteState from "./components/noteState";
import Search from "./pages/Search";
import SinglePlaylist from "./pages/SinglePlaylist";

function App() {
  const [cookie, setCookie] = useCookies(["token"]);

  return (
    <div className="App">
      <BrowserRouter>
        <NoteState>
          {cookie.token ? (
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/playlist" element={<View />} />
              <Route path="/search" element={<Search />} />
              <Route path="/logout" element={<Nav />} />
              <Route
                path="/playlist/view/:playlistId"
                element={<SinglePlaylist />}
              />
              <Route path="/library" element={<Library />} />
              <Route path="/mymusic" element={<MySong />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          ) : (
            <Routes>
              {/* <Route path="/home" element={<Home />} /> */}
              <Route path="/signUp" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          )}
        </NoteState>
      </BrowserRouter>
    </div>
  );
}

// Test1();

export default App;
