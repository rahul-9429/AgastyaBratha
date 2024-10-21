import React, { useEffect, useRef, useState } from "react";
import firebase from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import useWebSocket from './useWebSocket';
import {
  getAuth,
  onAuthStateChanged,
  signInAnonymously as signInAnonymouslyFirebase,
} from "firebase/auth";
import "./App.css";
import { Link } from "react-router-dom";
import logo from "../images/agalogoedited.png";
import light from "../images/light.png";
import starryimg from "../images/starry.jpg";
// import tape from './tape.jpg';
// import './CurrentUsers.js';
import { onSnapshot } from "firebase/firestore";
import axios from "axios";
import { startOfToday, subDays } from "date-fns";
import CryptoJS from "crypto-js";
import Notinloc from "./NotinlocComponent.js";
import { getAnalytics } from "firebase/analytics";
// import Livev from './server.js';
// var Filter = require('bad-words');



const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY_API_KEY,
  authDomain: "es-project-7d0c1.firebaseapp.com",
  databaseURL: "https://es-project-7d0c1-default-rtdb.firebaseio.com",
  projectId: "es-project-7d0c1",
  storageBucket: "es-project-7d0c1.appspot.com",
  messagingSenderId: "790953467909",
  appId: "1:790953467909:web:3585a505f6f442e455fc6c",
  measurementId: "G-WQEDPJVKC9",
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

function Signintochat({ setUser }) {
  const [isChecked, setIsChecked] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const signInAnonymously = async () => {
    if (isChecked) {
      try {
        await signInAnonymouslyFirebase(getAuth());
      } catch (error) {
        console.error("Error signing in anonymously:", error.message);
      }
    } else {
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
      {" "}
      <div className="whole">
        <div className="homepgbg ">
          <header>
            <img src={logo} alt="Logo" className="agaa-logo" />
          </header>

          <div className="homepg">
            <div className="starry-img">
              <p className="starry-text">Let's</p>
              <div className="thunder">
                {isChecked && (
                  <img
                    src={light}
                    alt="lighting-effect"
                    className={isChecked ? "thunder-img blink" : "thunder-img"}
                    id="thunder-img"
                    style={{
                      clipPath: "circle(45px at center)",
                      transform: "rotate(-40deg)",
                    }}
                  ></img>
                )}
              </div>
              <img src={starryimg} alt="starry" className="starry-img" />

              <p className="starry-text">Chat</p>
            </div>
            <p className="starry-text-mobile">Let's Chat </p>
            <p style={{ marginBottom: 0, textAlign: "center" }}>
              Protect your privacy! Please do not share any sensitive personal
              information.
              <br /> You are responsible for your data.
            </p>
            <div className="agree-div">
              <input
                type="checkbox"
                id="agree"
                className="styled-checkbox"
                checked={isChecked}
                onChange={thunderAnimation}
              />
              <span for="agree">
                {" "}
                I agree all{" "}
                <Link to="/term&conditions">
                  <u>Terms & Conditions.</u>
                </Link>
              </span>
            </div>
            <button className="chat-anony" onClick={signInAnonymously}></button>
          </div>
        </div>
        {showAlert && !isChecked && (
          <div className="check-alert">
            <p>Please agree to the terms and conditions.</p>
          </div>
        )}
      </div>
    </>
  );
}

function Chatroom({ user, ip }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [decryptedMessages, setDecryptedMessages] = useState([]);

  const secretKey = "rahulsaivjy9420";
  const focus_type = useRef(null);
  const wsUrl = process.env.NODE_ENV === 'production' ? 'wss://agastya-bratha.vercel.app/' : 'ws://localhost:8080';
  const activeUsers = useWebSocket(wsUrl);
  
  const colorPalette = [
  "linear-gradient(145deg, #1a5554, #005260)",
  "linear-gradient(145deg, #7d7a2f, #686c1d)", 
  "linear-gradient(145deg, #3c7ba6, #193852)", 
  "linear-gradient(145deg, #79a49e, #3876a6)", 
  // "linear-gradient(145deg, #79a49e, #686c1d)",

 "linear-gradient(145deg, #1a3b41, #0e272b)",
 "linear-gradient(145deg, #1a2238, #0d1523)",
 "linear-gradient(145deg, #4b5b21, #2f3915)",
 "linear-gradient(145deg, #3a3a3a, #1e1e1e)",
 "linear-gradient(145deg, #1c2e44, #0d1a2e)",
 "linear-gradient(145deg, #4a5335, #2c301f)",
 "linear-gradient(145deg, #2a3e5f, #1b2a3d)",
 "linear-gradient(145deg, #736b31, #504d22)"

  // "linear-gradient(145deg, #1a2238, #735f1f)",
  // "linear-gradient(145deg, #2b3a55, #695c1a)",
  // "linear-gradient(145deg, #23374d, #525822)",
  // "linear-gradient(145deg, #2b496e, #726b34)",
  // "linear-gradient(145deg, #0f1a2e, #8b734d)",
  // "linear-gradient(145deg, #1c2e44, #606b31)"
  ];

  let lastUid = null;
  let currentColor = colorPalette[0]; // Start with the first color

  const getNextColor = () => {
    const nextColorIndex = (colorPalette.indexOf(currentColor) + 1) % colorPalette.length;
    return colorPalette[nextColorIndex];
  };

  useEffect(() => {
    const decryptMessages = () => {
      if (messages.length > 0) {
        const decryptedMsgs = messages.map((msg) => {
          try {
            const decryptedText = CryptoJS.AES.decrypt(
              msg.data.text,
              secretKey
            ).toString(CryptoJS.enc.Utf8);
            return { ...msg, decryptedText };
          } catch (error) {
            return { ...msg, decryptedText: "Waiting for this message" };
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
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return unsubscribe;
  }, [db]);

  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;

  const currentTime = `${formattedHours}:${minutes < 10 ? "0" : ""}${minutes} ${ampm}`;

  const sendMessage = async () => {
    if (!user) {
      console.log("User not logged in. Message not sent.");
      return;
    }
    if (!newMessage.trim()) {
      console.log("Message not sent.");
      return;
    }

    const encrypted = CryptoJS.AES.encrypt(newMessage, secretKey).toString();
    await addDoc(collection(db, "messages"), {
      uid: user.uid,
      ip_address: ip,
      text: encrypted,
      timestamp: serverTimestamp(),
      times: currentTime,
    });

    setNewMessage("");
  };

  useEffect(() => {
    focus_type.current.focus();
  }, [focus_type]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const newRef = useRef(null);
  useEffect(() => {
    const div = newRef.current;
    if (div) {
      div.scrollTop = div.scrollHeight;
    }
  }, [decryptedMessages]);

  return (
    <>
      <div className="outer">
        <div className="logo x-logo">
          <Link to={"/"}>
            <img src={logo} alt="Logo" className="agaa-logo" />
          </Link>
        </div>
        <div ref={newRef} className="chat">
          {decryptedMessages.map((msg) => {
            // Check if the uid has changed
            if (msg.data.uid !== lastUid) {
              currentColor = getNextColor();
            }
            lastUid = msg.data.uid;

            return (
              <div
                key={msg.id}
                className={`message flex ${
                  msg.data.uid === user.uid ? "justify-end" : "justify-start"
                }`}
                style={{ background: currentColor }}
              >
                <div
                  className={`display_username ${
                    msg.data.uid === user.uid ? "no" : "yes"
                  }`}
                >
                  {msg.data.username}
                </div>
                {msg.decryptedText}
                <span className="msgtimestamp ">{msg.data.times}</span>
              </div>
            );
          })}
        </div>
        <div className="send-msg">
          <span className="msg-feild-wrap">
            <textarea
              className="msg-feild"
              ref={focus_type}
              value={newMessage}
              rows={1}
              placeholder="Type a message"
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{
                overflowY: "hidden",
                overflowX: "hidden",
                outline: "none",
                border: "none",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            />
          </span>
          <button
            style={{ cursor: "pointer" }}
            className="send"
            onClick={sendMessage}
          >
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAABLElEQVR4nO2WsUoDQRCG10obq3TJzJ7FIYhCmp05TWGK3MyJYApJfAQ738HGF1CwFl/BRvAdtPAhFCxFrDRyB3fESjx1zkB+mG7hG3b/mf2dm6sJQZCNVm+4bApFyg6QdYKkz0hyBpsaG4HluABXJW/AcuVDlhqDtSpgvfWJHkb9/pIpGKsG5CE/16ZByxSMZQOkr0ByGSXpmikYP/vgBoPsOecWDME6XXe1fIA/B5fP8PgtH3iW0W+Ap57hBVjO2zRY/RLeYe12QrYPpEdAegKsF8h6jaz3yPpUs4FiHwDJtqurON5ZXNnajXzQXo0G3zFJh82AQ+H+f3LVnmXciLmwqXHC2VogYrsywfqTAOtvEWyDgNhEH1/OcR72WE7Nwl4upGzdPN7O5f5YH92R4pqmqt7BAAAAAElFTkSuQmCC"
              alt="send"
            />
          </button>
        </div>
      </div>
    </>
  );
}


function loccheck(ulat, ulon) {
  const start = performance.now();
  function toRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  function haversine(lon1, lat1, lon2, lat2) {
    lon1 = toRadians(lon1);
    lat1 = toRadians(lat1);
    lon2 = toRadians(lon2);
    lat2 = toRadians(lat2);

    // haversine
    const dlon = lon2 - lon1;
    const dlat = lat2 - lat1;
    const a =
      Math.pow(Math.sin(dlat / 2), 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);
    const c = 2 * Math.asin(Math.sqrt(a));
    const r = 6371;
    return c * r;
  }

  const center_point = { lat: 17.710825, lng: 83.165222 };
  const vcenter_point = { lat: 17.717297, lng: 83.177239 };
  const vucenter_point = { lat: 16.233347, lng: 80.549813 };
  const test_point = { lat: ulat, lng: ulon };


  //viit coordinates
  const lat1 = center_point["lat"];
  const lon1 = center_point["lng"];
  const lat2 = test_point["lat"];
  const lon2 = test_point["lng"];

  // view coordinates
  const vlat1 = vcenter_point["lat"];
  const vlon1 = vcenter_point["lng"];
  const vlat2 = test_point["lat"];
  const vlon2 = test_point["lng"];
  const radius = 0.3; // in kilometers
  
  // vu coordinates
  const vulat1 = vucenter_point["lat"];
  const vulon1 = vucenter_point["lng"];
  const vulat2 = test_point["lat"];
  const vulon2 = test_point["lng"];
  const radius1 = 0.5; 

  const distance = haversine(lon1, lat1, lon2, lat2);
  const vdistance = haversine(vlon1, vlat1, vlon2, vlat2);
  const vudistance = haversine(vulon1,vulat1,vulon2,vulat2);
  // console.log('Distance (km): ', distance);
  // console.log("view distance",vdistance);

  var IsInViit = 0;
  var IsInView = 0;
  var IsInVu = 0;
  if (distance <= radius) {
    IsInViit = 1;
  }
  if (vdistance <= radius) {
    IsInView = 1;
  }
  if(vudistance<=radius1){
    IsInVu = 1;
  }
  const end = performance.now();
  const executionTime = end - start;
  console.log("Execution time:", executionTime, "milliseconds");
  console.log(IsInView, IsInViit, IsInVu);
   return IsInView || IsInViit || IsInVu;
  // return true;
}

function ChatroomC() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  const [within500Meters, setWithin500Meters] = useState(false);
  const [user, setUser] = useState(null);
  const [ip, setIP] = useState("");
  const [loading, setLoading] = useState(true);
  const [chatroomType, setChatroomType] = useState(null);

  const fetchValue = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const value = within500Meters ? "B" : "C";
        resolve(value);
      }, 2000);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const value = await fetchValue();
        setChatroomType(value);
      } catch (error) {
        console.error("Error fetching value:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
      setError("Enable Location");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const getData = async () => {
    try {
      const res = await axios.get("https://api.ipify.org/?format=json");
      setIP(res.data.ip);
    } catch (error) {
      console.error("Something Went Wrong..!");
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

  useEffect(() => {
    if (latitude !== null && longitude !== null) {
      const isWithin500Meters = loccheck(latitude, longitude);
      setWithin500Meters(isWithin500Meters);
    }
  }, [latitude, longitude]);
  console.log("heyyyyy" + within500Meters);
  const renderChatroom = () => {
    if (user) {
      if (loading) {
        return (
          <div className="loader">
            <p>
              Venturing into the realm of anonymity... Where every message holds
              a mystery.🕵️‍♂️
            </p>
            <sapn className="spinner"></sapn>
          </div>
        );
      } else {
        if (within500Meters) {
          return <Chatroom user={user} ip={ip} />;
        } else {
          return <Notinloc />;
        }
      }
    } else {
      return <Signintochat setUser={setUser} />;
    }
  };

  return (
    <>
      <div className="App">
        <header className="App-header"></header>

        <section>
          {user ? renderChatroom() : <Signintochat setUser={setUser} />}
        </section>
      </div>
    </>
  );
}

export default ChatroomC;
