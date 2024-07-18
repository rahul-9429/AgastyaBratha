import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { getFirestore, collection, doc, getDoc } from "firebase/firestore";
import './App.css';
import { FaArrowRight } from "react-icons/fa";

const F04 = () =>{
 return(
   <div><h1>404!</h1></div>
 );
};

const Joinroom = () => {
  const [JroomName, setJroomName] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [Found, setFound] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsSignedIn(true);
      } else {
        signInAnonymously(auth).catch((error) => {
          console.error("Error signing in anonymously: ", error);
        });
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleRoomInput = (event) => {
    setJroomName(event.target.value);
  };

  const handleJoinRoom = async () => {
    if (JroomName.trim()) {
      try {
        const roomDocRef = doc(db, JroomName, 'info');  
        const roomDocSnapshot = await getDoc(roomDocRef);
        
        if (roomDocSnapshot.exists()) {
          setFound(true); 
          navigate(`/room/${JroomName}`);
          
        } else {
          setFound(false);
        }
      } catch (error) {
        console.error("Error checking collection existence:", error);
      }
    } else {
      console.log("Room name cannot be empty");
    }
  };

  return (
    <div className="join-room-container">
      <div className="input-container">
        <input
          type="text"
          placeholder=""
          value={JroomName}
          onChange={handleRoomInput}
          className="input-field"
        />
        <label className="input-label">Enter Room Code</label>
        
      </div>
       
      <button class="button" onClick={handleJoinRoom}>
   Join Room
  <svg fill="currentColor" viewBox="0 0 24 24" class="icon">
    <path clip-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" fill-rule="evenodd"></path>
  </svg>
</button>
<div>{Found === true && <F04 />}</div>
    </div>
  );
};

export default Joinroom;
