import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Home from './pages/Home';
import NotinlocComponent from "./pages/NotinlocComponent";
import ChatroomC from "./pages/ChatroomC";
import Blogs from "./pages/Documentation";
import Documentation from "./pages/Documentation";
import Profile from'./pages/Profile';
import Vserver from'./pages/Vserver';
import UserRoom from "./pages/UserRoom.js";
import Termsc from "./pages/Termsc.js";
import Rahul from "./pages/Founder.js";
// import Test from "./pages/Rahul.jsx"
// import reportWebVitals from './reportWebVitals';


function App(){
  return(
    <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notinloc" element={<NotinlocComponent />} />
        <Route path="/chat" element={<ChatroomC />} />
        <Route path="/blogs" element={<Documentation />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/vserver" element={<Vserver />} />
        <Route path="/room/:roomName" element={<UserRoom />} />
        <Route path="/term&conditions" element={<Termsc/>} />
        <Route path="/Team" element={<Rahul/>}/>
        {/* <Route path="/rahul" element={<Test/>}/> */}
      </Routes>
    </BrowserRouter>
  )
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
