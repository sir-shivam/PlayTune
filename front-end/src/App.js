import Nav from './components/nav';
import { BrowserRouter, Route , Routes} from 'react-router-dom';
import SignUp from './components/signUp';
import PrivateComponent from './components/privateComponent';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav />
      <Routes>

        <Route element={<PrivateComponent/>}>
        <Route path="/" element={<h1>home</h1>} />
        <Route path="/music"  element={<h1>ho</h1>} />
        <Route path="/search" element={<h1>home </h1>} />
        <Route path="/logout" element={<h1>home hello</h1>} />
        </Route>
        <Route path="/signUp" element={<SignUp /> } />
        <Route path='/login' element={<Login/>}/>

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
