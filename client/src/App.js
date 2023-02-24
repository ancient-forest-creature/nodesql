import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import PersonForm from './components/PersonFrom';
// import DisplayPeople from './components/DisplayPeople';
import Login from './components/Login';
import Signup from './components/Signup'
import Success from './components/Success';
import Fail from './components/Fail';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/new" element={<PersonForm />} /> */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/success" element={<Success />} />
          <Route path="/fail" element={<Fail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;