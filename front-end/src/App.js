import Nav from './components/nav';
import { BrowserRouter, Navigate, Route , Routes} from 'react-router-dom';
import SignUp from './components/signUp';
import Login from './components/Login';
import Home from './components/Home';
import View from './components/view';
import Library from './components/Library';
import Streaming from './components/Streaming';
import { useCookies } from 'react-cookie';


function App() {
  const [cookie , setCookie] = useCookies(["token"]);
  console.log(cookie.token);

  return (
    
    <div className="App">
      <BrowserRouter>
      <Streaming/>
      {
        cookie.token ? (
      

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/music"  element={ <View /> }/>
        <Route path="/search" element={<Nav/> } />
        <Route path="/logout" element={<Nav />} />
        <Route path="/library" element={<Library />} />
        <Route path="/mymusic" element={<hello />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
        ):(
          <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/signUp" element={<SignUp /> } />
          <Route path='/login' element={<Login/>}/>
          <Route path="*" element={<Navigate to="/login" />} />

          </Routes>
        )
      }
      </BrowserRouter>
    </div>
  );
}

// Test1();

export default App;
