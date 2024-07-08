import Nav from './components/nav';
import { BrowserRouter, Route , Routes} from 'react-router-dom';
import SignUp from './components/signUp';
import PrivateComponent from './components/privateComponent';
import Login from './components/Login';
import Home from './components/Home';
import View from './components/view';
import Library from './components/Library';
import Streaming from './components/Streaming';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      {/* <Streaming/> */}
      <Routes>

        <Route element={<PrivateComponent/>}>
        <Route path="/" element={<Home />} />
        <Route path="/music"  element={ <View /> }/>
        <Route path="/search" element={<Nav/> } />
        <Route path="/logout" element={<Nav />} />
        <Route path="/library" element={<Library />} />
        </Route>
        <Route path="/signUp" element={<SignUp /> } />
        <Route path='/login' element={<Login/>}/>

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
