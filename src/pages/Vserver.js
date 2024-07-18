import { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import light from "../images/agalogoedited.png";
import "firebase/firestore";
import "./App.css";
import Createroom from "./CreateRoom.js";
import Joinroom from "./JoinRoom.js";
import { Link } from "react-router-dom";

const db = getFirestore();

function Vserver() {
  const [announcements, setAnnouncements] = useState([]);
  const [prevuser, setPrevuser] = useState("");
  useEffect(() => {
    if (announcements.length > 0) {
      setPrevuser(announcements[announcements.length - 1].userdis);
      console.log(prevuser);
    }
  }, [announcements]);

  useEffect(() => {
    const q = query(
      collection(db, "announcements"),
      orderBy("timestamp", "asc")
    ); // Change orderBy to ascending
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const announcementsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAnnouncements(announcementsData);
    });

    return () => unsubscribe();
  }, []);
  let lastUser = prevuser;
  return (
    <>
      <section className="vser-bg">
        <header>
          <Link to="/">
            {" "}
            <img
              src={light}
              className="aga-main"
              height="70vh"
              alt="logo"
            />{" "}
          </Link>
        </header>
        <div className="vserver">
          <div className="card card1">
            <h1 className="anno-head ahp1">
              #<u>Announcements</u>
            </h1>
            <div className="anno-bg">
              {announcements.length > 0 ? (
                announcements.map((announcement) => {
                  const showUser = lastUser !== announcement.user_id;
                  lastUser = announcement.user_id;

                  return (
                    <div key={announcement.id} className="wel-msg wel-x">
                      {showUser && (
                        <b>
                          <div>{announcement.userdis}</div>
                        </b>
                      )}
                      <div>{announcement.text}</div>
                      <span className="msgtimestamp">{announcement.time}</span>
                    </div>
                  );
                })
              ) : (
                <div>
                  <b>
                    <i>Loading</i>
                  </b>
                </div>
              )}
            </div>
          </div>
          <div className="card vig">
            <span className="anno-head">
              #<u>Vignan VIPS</u>
            </span>
            <span className="ser-info">
              No signup required..!
              <br />
              #stay_anonymous
            </span>
            <Link to="/chat">
              <button class="button butn-vc">
                Vignanittes Chat
                <svg fill="currentColor" viewBox="0 0 24 24" class="icon">
                  <path
                    clip-rule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </Link>
          </div>
          <div className="card ">
            <span className="anno-head">
              #<u>Exclusive</u>
            </span>
            <div className="c-j">
              <div className="create-join">
                <Createroom />
                <Joinroom />
              </div>
            </div>
          </div>
          <span
            className="vser-foot"
            style={{ textAlign: "center", opacity: "0.5" }}
          >
            {" "}
            Crafted and Programmed by
            <br />{" "}
            <a href="https://www.linkedin.com/in/kasimikotasanthoshrahul/">
              <u>Rahul Kasimikota</u>
            </a>{" "}
            <br /> ©2024 AgastyaBratha.{" "}
          </span>
        </div>{" "}
      </section>
    </>
  );
}

export default Vserver;
