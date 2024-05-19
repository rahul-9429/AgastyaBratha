 import './App.css';
 import { Link } from "react-router-dom";
// import ChatroomC from './ChatroomC.js';
import React, {useEffect, useState} from 'react';
import light from '../images/agalogoedited.png';

 function Home(){
  const [showChatroom, setShowChatroom] = useState(false);

  const handleClick = () => {
    setShowChatroom(true);
  };
  return(
    <>
      <nav>
    <img src={light} className='aga-main' height="70vh"></img>
    <div className='linkss'>
       <div className='in_links'><Link to="/about">About</Link></div>
       <div className='in_links'><Link to="/chat">chat</Link></div>
       <div className='in_links'><Link to="/notinloc">Blogs</Link> </div>
    </div>
      </nav>
      
    </>
  )
 }

 export default Home;
