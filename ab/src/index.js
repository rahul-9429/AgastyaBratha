import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Home from './pages/Home';
import NotinlocComponent from "./pages/NotinlocComponent";
import ChatroomC from "./pages/ChatroomC";
// import reportWebVitals from './reportWebVitals';


function App(){
  return(
    <BrowserRouter>
        <Routes>
        <Route index element={<Home />} />
        <Route path="/notinloc" element={<NotinlocComponent />} />
        <Route path="/chat" element={<ChatroomC />} />
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
