import React, { useEffect, useRef, useState } from 'react';
import firebase from 'firebase/app';
import { getFirestore, collection, addDoc, orderBy, query, serverTimestamp ,where } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInAnonymously as signInAnonymouslyFirebase } from 'firebase/auth';
import './App.css';
import logo from '../images/logoo.png';
import pic from '../images/starry.jpg';
import light from '../images/agalogoedited.png';
import chatbg1 from '../images/chat_bg1.jpg';
// import tape from './tape.jpg';
// import './CurrentUsers.js';
import { onSnapshot } from 'firebase/firestore';
import axios from "axios";
import { startOfToday, subDays } from 'date-fns';
import CryptoJS from 'crypto-js';
import Notinloc from'./NotinlocComponent.js';

const firebaseConfig = {
  apiKey: "AIzaSyDwD3jIRBd40BY9gizvY7K-oH1upMYGjcA",
  authDomain: "agastya-bratha.firebaseapp.com",
  projectId: "agastya-bratha",
  storageBucket: "agastya-bratha.appspot.com",
  messagingSenderId: "976233712729",
  appId: "1:976233712729:web:99fcf7458e87e264257548",
  measurementId: "G-SR2D0HZDXS"

};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


function Signintochat({ setUser }) {
   const [isChecked, setIsChecked] = useState(false);
   const [showAlert, setShowAlert] = useState(false);
  const signInAnonymously = async () => {
    if (isChecked) {
    try {
      await signInAnonymouslyFirebase(getAuth());
    } catch (error) {
      console.error('Error signing in anonymously:', error.message);
    }}
    else {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  };
  
 
   

  const thunderAnimation = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <div className='homepgbg'>
        <header>
        <img src={logo} alt="Logo" className='aga-logo' />
       
        </header>
        
        <div className='homepg'>
          <div className='starry-img'><p className='starry-text'>Let's</p>
           <div className='thunder'>
           {isChecked && <img src={light} alt="lighting-effect" className={isChecked ? 'thunder-img blink' : 'thunder-img'} id="thunder-img" style={{ clipPath: 'circle(45px at center)',transform: 'rotate(-40deg)'  }}>
              </img>}
               
              
              </div>
          <img src={pic} alt="starry" className='starry-img'   />
          
          <p className='starry-text'>Chat</p></div>
          <p className='starry-text-mobile'>Let's Chat  </p>
        <p style={{ marginBottom: 0 , textAlign: "center"}}>Protect your privacy! Please do not share any sensitive personal information.<br/> You are responsible for your data.</p>
        <div className='agree-div'>
        <input   type='checkbox' id='agree'  className='styled-checkbox'   
          checked={isChecked}
          onChange={thunderAnimation}/>
        <label for='agree'>  I agree all <a href="">Terms & Conditions.</a> </label>
       
        </div>
        <button className='chat-anony' onClick={signInAnonymously}></button>
       
        </div> 
         
        </div>
        {showAlert && !isChecked && (
        <div className="check-alert">
          <p>Please agree to the terms and conditions.</p>
        </div>
      )}
      
    </>
  );
}

// function Notinloc(){
//   return(
//     <>
//     <img src={logo} alt="Logo" className='aga-logo ' />
//     <section className='notinloc'>
//         <img src={geek} alt="geekgod_modernart" className='geekgod'/> 
//         <sapn className="notinloc-msg">
//           <h2>Opps! Looks like your currently not in college primises <small>(VIIT or VIEW)</small></h2>
//           <img src={geek} alt="geekgod_modernart" className='geekgod_mobile'/> 
//           <p>We deeply value the privacy and security of our users.To protect the community we only allow acess to users who are in specified location</p>
//           <h3>Troubleshooting :)</h3>
//            <p>I'm in college but still facing this issue?</p>
//            <p>Users mostly encounter this issue because "Location is not enabled" from the user end.<br/>
//            <ul className='notinloc-li'>
//             <li>Kindly enable location and try again</li>
//             <li>Wait until the page is completely loaded</li>
//             <li>Check your internet connection</li>
//             <li>Didn't work? <a href="mailto:project.suppourt.rahul@gmail.com&subject=Hrlp%20agastya-bratha"> Contact suppourt</a></li>
//            </ul>
//             </p>
//             <h4><u>We never save your location.It is only used for authentication.</u></h4>
//              <img src={tape} className='tape'/>
//         </sapn>
//     </section>
//    </>
//   );
// }
function Chatroom({ user, ip }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [decryptedMessages, setDecryptedMessages] = useState([]);
  const secretKey = 'rahulsaivjy9420';
  const banana = useRef();
  const focus_type = useRef(null);
  // useEffect(() => {
  //   const q = query(collection(db, "messages"), orderBy("timestamp"));
  //   const unsubscribe = onSnapshot(q, snapshot => {
  //     setMessages(snapshot.docs.map(doc => ({
  //       id: doc.id,
  //       data: doc.data()
  //     })));
  //   });
  //   return unsubscribe;
  // }, [db]);
  
  
  

  
  useEffect(() => {
   
    const decryptMessages = () => {
   
      if (messages.length > 0) {
        const decryptedMsgs = messages.map(msg => {
          try {
            const decryptedText = CryptoJS.AES.decrypt(msg.data.text, secretKey).toString(CryptoJS.enc.Utf8);
            
          
            return { ...msg, decryptedText };
          } catch (error) {
            return { ...msg, decryptedText: 'Waiting for this message' };
          }
        });
        setDecryptedMessages(decryptedMsgs);
      }
    };

    decryptMessages();
  }, [messages]);

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("timestamp"),
      where("timestamp", ">", subDays(startOfToday(), 1)) 
    );
    const unsubscribe = onSnapshot(q, snapshot => {
      setMessages(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })));
    });
    return unsubscribe;
  }, [db]);
  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const sendMessage = async () => {
    if (!user) {
      console.log("User not logged in. Message not sent.");
      return;
    }
    if (!newMessage.trim()) {
      console.log("Message not sent.");
      return;
    }
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        // Call sendMessage function when Enter key is pressed
        sendMessage();
      }
    };
  
    
      
      const encrypted = CryptoJS.AES.encrypt(newMessage, secretKey).toString();
       
    
    // Send the message
    await addDoc(collection(db, "messages"), {
      uid: user.uid,
      ip_address: ip,
      text:encrypted,
      timestamp: serverTimestamp() ,
       times: currentTime
    });

    setNewMessage("");
    banana.current.scrollIntoView({ behavior: 'smooth' , block: 'end'});


  };
  
useEffect(()=>{
  focus_type.current.focus(); 
},[focus_type])
 
  
  return (
    <>
      
    <div className='logo'>
    <img src={logo} alt="Logo" height="70vh" />
      </div>
      <center>
        <div className='chat-wrapper'>
         
<div className='chat'> 

{decryptedMessages.map(msg => (
  <div key={msg.id} className={`message flex ${msg.data.uid === user.uid ? 'justify-end' : 'justify-start'}`}>
    <div className={`display_username ${msg.data.uid === user.uid ? 'no' : 'yes'}`}>
      {msg.data.username}
    </div>
    {msg.decryptedText}<span className='msgtimestamp'>{msg.data.times}</span>
  </div>
))}
 {/* <h1>iam here</h1> */}
{/* <div className='that-extrabit'></div> */}
 <span className="banana"ref={banana}></span> 
</div> 

</div>
{/* <p className='xpara'>No New messages</p> */}
<div className='send-msg'>
      <input className='msg-feild'
      ref ={focus_type}
        value={newMessage}
        placeholder="Type a message"
        onChange={e => setNewMessage(e.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            sendMessage();
          }
        }}
      />
      <button className='send' onClick={sendMessage} >
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA3UlEQVR4nO3WMWpCQRRG4Q9MYxkhha4ikMI9CJbpFFK5CKtsIWV6K9tsIKIpXIEoaJlCsLOzMAgvYCEhT525jT9MOZwzlzszl1sC84UZuqjkBG+wL9Y8p8D0CPy7VujhLiV4cAKcReD1D3BSgc4/wEkEmiXAVxWonQG+WOABwwvAZwk8Y30FaGmBKhp4QrvYcOjwt6IKEyyxi+qBCup4RAsv6B8JjrHA9oTAKAr8WabU7/hIWeo2viOa65D74oRZr1PoAxL6ZHZyA8O/xUFuYPjos4ka9sZR4+0tUuQHPT4UVVhjZqUAAAAASUVORK5CYII="/>
        
        
        </button>
        </div>     
{/* <br></br><br></br><br></br> */}
       
        
</center>





    
        
        
    </>
  );
}
 
function loccheck(ulat,ulon){
  function toRadians(degrees) {
    return degrees * Math.PI / 180;
}

function haversine(lon1, lat1, lon2, lat2) {
    
    lon1 = toRadians(lon1);
    lat1 = toRadians(lat1);
    lon2 = toRadians(lon2);
    lat2 = toRadians(lat2);

    // haversine  
    const dlon = lon2 - lon1;
    const dlat = lat2 - lat1;
    const a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);
    const c = 2 * Math.asin(Math.sqrt(a));
    const r = 6371;  
    return c * r;
}

const center_point = { 'lat': 17.710825, 'lng': 83.165222 };
const vcenter_point = { 'lat': 17.717297, 'lng': 83.177239 };
const test_point = { 'lat': ulat, 'lng': ulon };

const lat1 = center_point['lat'];
const lon1 = center_point['lng'];
const lat2 = test_point['lat'];
const lon2 = test_point['lng'];

// view coordinates
const vlat1 = vcenter_point['lat'];
const vlon1 = vcenter_point['lng'];
const vlat2 = test_point['lat'];
const vlon2 = test_point['lng'];
const radius = 0.30; // in kilometers

const distance = haversine(lon1, lat1, lon2, lat2);
const vdistance = haversine(vlon1, vlat1, vlon2, vlat2);
// console.log('Distance (km): ', distance);
// console.log("view distance",vdistance);

var IsInViit = 0;
var IsInView = 0;
if (distance <= radius) {
    IsInViit = 1;
}  
if(vdistance <= radius){
  IsInView = 1;
}
console.log(IsInView,IsInViit);
//  return IsInView || IsInViit;
return true;

}
 
 
 
 
function ChatroomC() {

    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [error, setError] = useState(null);
  
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
            setError(null);
          },
          (error) => {
            setError(error.message);
          }
        );
      } else {
        setError('Enable Location');
      }
    };
  
    useEffect(() => {
      getLocation();
    }, []);
  
    const [within500Meters, setWithin500Meters] = useState(false);
  
    useEffect(() => {
      if (latitude !== null && longitude !== null) {
        const isWithin500Meters = loccheck(latitude, longitude);
        setWithin500Meters(isWithin500Meters);
      }
    }, [latitude, longitude]);
      // console.log(latitude,longitude);
  const [user, setUser] = useState(null);
  const [ip, setIP] = useState("");

  const getData = async () => {
    try {
      const res = await axios.get("https://api.ipify.org/?format=json");
      setIP(res.data.ip);
    } catch (error) {
      console.error('Something Went Wrong..!');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
    <div className="App">
      
      <header className="App-header">
    
<section>
            {within500Meters ? user ? <Chatroom user={user} ip={ip} />: <Signintochat setUser={setUser} />: <Notinloc/>
    }
        </section> 


         {loccheck(latitude,longitude)} 
       
      </header>
    </div>
     
    </>
  );
}

export default ChatroomC;
