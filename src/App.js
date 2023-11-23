import './App.css';
import { BrowserRouter, Routes, Route, useNavigate} from "react-router-dom";
import { LoginSignup } from './Components/LoginSignup/LoginSignup';
import { ProfilePage } from './Components/ProfilePage/ProfilePage';


function App() {


  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LoginSignup />} />
          <Route exact path="/profile" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
