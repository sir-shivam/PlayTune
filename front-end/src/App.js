import './App.css';
import Nav from './components/nav';
import { BrowserRouter, Route , Routes} from 'react-router-dom';
import SignUp from './components/signUp';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav />
      <Routes>

        <Route path="/" element={<h1>home</h1>} />
        <Route path="/music"  element={<h1>ho</h1>} />
        <Route path="/search" element={<h1>home </h1>} />
        <Route path="/logout" element={<h1>home hello</h1>} />
        <Route path="/signUp" element={<SignUp /> } />

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
