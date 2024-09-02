import "./App.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import light from "../images/agalogoedited.png";
import van from "../images/van1.jpg";
import Vibcomm from './Vibcomm';
function TypingEffect() {
  const [textIndex, setTextIndex] = useState(0);
  const words = ["Chat ", "Express "]; 
  const typingSpeed = 3000;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTextIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, typingSpeed);

    return () => clearInterval(intervalId);
  }, [words.length]);

  return (
    <>
      <h1 className="type-eff">
        <span className="fade">{words[textIndex]}</span>
        <br />
        <span className="n0-fade">Anonymously</span>
      </h1>{" "}
      
    </>
  );
}

function Home() {
  // const [showChatroom, setShowChatroom] = useState(false);
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
    navRef.current.classList.toggle("show_links");
  };

  const handleClick = (event, sectionId) => {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      showNavbar();
    }
  };

  
  
  //intersection observer :)
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('showw');
        } else {
          entry.target.classList.remove('showw');
        }
      });
    });

    const hiddenElements = document.querySelectorAll('.hiddenn');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);


  return (
    <>
    
      <header className="aa-header">
        <Link to="/">
          <img src={light} className="aga-main" height="70vh" alt="logo"></img>
        </Link>
        <nav className="linkss" ref={navRef}>
          <div className="in_links">
            <a href="#about" onClick={(e) => handleClick(e, "about")}>
              {" "}
              About{" "}
            </a>{" "}
          </div>
          <div className="in_links">
            <Link to="/chat"> Chat </Link>
          </div>
          <div className="in_links">
            <a href="#ccc"> Contact </a>
          </div>
          <button className="ham-cross nav-btn" onClick={showNavbar}>
            <FaTimes />
          </button>
          <p style={{ paddingTop: "5rem", opacity: "50%" }}>
            #Creating My Mark <br />
            ~Rahul_kasimikota
          </p>
        </nav>
        <button className="ham-menu nav-btn" onClick={showNavbar}>
          <FaBars style={{ color: "#1d3646" }} />
        </button>
      </header>
      <section className="home-section">
        <TypingEffect />

        <Link to="/vserver">
          <button class="button butn-vs ">
            Server Vignan
            <svg fill="currentColor" viewBox="0 0 24 24" class="icon">
              <path
                clip-rule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                fill-rule="evenodd"
              ></path>
            </svg>
          </button>
        </Link>
      </section>

      
      <section className="Why-ab hiddenn">
      <span className="type-eff abt-nf">Why AgastyaBratha?</span> <Vibcomm/>
      <p className="why-ab-p">Discover the pulse of Vignan's vibrant community with AgastyaBratha, connecting 9+ campuses across Andhra Pradesh and uniting over 9999+ students. Stay in the loop with the latest happenings, events, and opportunities, all while enjoying the freedom to explore and engage anonymously. Whether you're looking to collaborate, learn, or just stay informed, you can do it all without revealing your identity. </p><br/> 
      
      <span className="type-eff ani-eff abt-nf">#Stay connected,<br/> #Stay informed, <br/> #Stay in the loop!</span>
       
      <br></br><br/>
      </section>

      <section className="About-sec hiddenn" id="about">
        <div className="about-wrap">
          <span className="about1">
            <span className="type-eff abt-nf">About us</span>
            <span className="van-hid">
              <img src={van} className="van"></img>{" "}
              <p>
                <b>Vincent van Gogh</b>
              </p>
            </span>

            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In the year
              2024, amidst the bustling campus life, Rahul, a curious college
              student, found himself in need of a platform. He yearned for a
              place where he could seamlessly connect with his community, stay
              informed about campus happenings, and above all, safeguard his
              privacy while expressing his thoughts anonymously.
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;And so,
              AgastyaBratha came into existence. Its first iteration took shape
              as a simple yet innovative online chatroom tailored for Rahul's
              college community. But even as the platform gained traction, the
              quest for anonymity persisted. Traditional sign-up methods were
              swiftly discarded, paving the way for a more discreet user
              experience. But there was a dilemma. Anonymity on the wide-open
              web posed potential risks. To tackle this, AgastyaBratha
              restricted its reach to Rahul's college campus, ensuring that only
              those within its confines could participate.
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;As time went
              on, AgastyaBratha evolved once more. The once mundane website was
              rejuvenated with the introduction of Private Rooms—exclusive
              spaces accessible solely through designated room codes. This
              innovation not only injected excitement into the platform but also
              fortified the shield of anonymity that Rahul and his peers
              cherished.
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;And thus,
              from a college student's simple desire for connection and privacy,
              AgastyaBratha blossomed into a haven where anonymity and community
              thrived in harmony.
            </p>
          </span>
          <span className="about2">
            <img src={van} className="van"></img>
            {/* <p className='rand'><b>Vincent van Gogh</b></p> */}
          </span>
        </div>
      </section>
      

     


      <h1 className="type-eff abt-nf hiddenn">
        AgastyaBratha <br />
        Know what it means?
      </h1>
      <span className="Aga-name-exp hiddenn">
        <span className="aga-mean-jagu">
          <span className="aga-mean-jagu1">
            
              <i>
                He who has no name or place is called{" "}
                <span style={{ color: "#345163" }}>
                  <u>Agastya Bhrata.</u>
                </span>{" "}
                <br />
                In Valmiki's Ramayana, Lord Rama visited many sages during
                Aranya Vasa. In Sangraha Ramayanam (This is called Bala
                Ramayanam. This is the first sarga of Ramayana) Valmiki said
                this.
              </i>

          </span>
          <span className="aga-mean-jagu2">
            <i>
              <b>
                *విరాధం రాక్షసం హత్వా శరభంగం దదర్శ హ<br></br>
                సుతీక్ష్ణం చాప్యగస్త్యం చ{" "}
                <span style={{ color: "#345163" }}>
                  <u>అగస్త్య భ్రాతరం</u>
                </span>{" "}
                తథా<br></br>
                అగస్త్య వచనాచ్చైవ జంగ్రాహైంద్రం శరాసనమ్*<br></br>( బాల కాండ
                1–41,42)
              </b>
            </i>
          </span>
        </span>
      </span>{" "}
      <center style={{ marginTop: "1rem" }}>
        <span className="hiddenn">
          <a href="https://te.quora.com/%E0%B0%85%E0%B0%97%E0%B0%B8%E0%B1%8D%E0%B0%A4%E0%B1%8D%E0%B0%AF-%E0%B0%AD%E0%B1%8D%E0%B0%B0%E0%B0%BE%E0%B0%A4-%E0%B0%85%E0%B0%A8%E0%B1%8D%E0%B0%A8">
            <b>
              <u>View References</u>
            </b>
            <svg
              width="0.625rem"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 9L9 1M9 1H2.5M9 1V7.22222"
                stroke="currentColor"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </a>
        </span>
      </center>
      <section className="aga-community hiddenn" id="community">
        <span className="type-eff abt-nf">
          AgastyaBratha <br />
          For Communities
        </span>
        <p style={{ textAlign: "", marginTop: "" }}>
          Get a Community Chatroom for your own community tailored according to
          your needs
          <br /> Your just few taps away!
        </p>

        <a href="https://forms.gle/cux8RAsiemGaeexW7">
        <center> <button className="button butn-vs">
            Get Quote
            <svg
              fill="currentColor"
              viewBox="0 0 24 24"
              class="icon"
              className="icon-till"
            >
              <path
                clip-rule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                fill-rule="evenodd"
              ></path>
            </svg>
          </button></center>
        </a>
        {/* <div className='aga-com com-p2'></div> 
        <div className='aga-com com-p1'> </div>
        */}
      </section>
      {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#1d3646" fill-opacity="1" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,117.3C960,107,1056,149,1152,154.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg> */}
      <footer className="home-footer">
        {/* <p className='cmmrk' style={{ paddingTop: '5rem', opacity: '50%', color: 'white', textAlign: 'center' , margin:'0' }}>#Creating My Mark <br />~Rahul_kasimikota</p> */}
        <h1 className="type-eff abt-nf" style={{ textAlign: "left",padding:"20px" }}>
          Contact Us
        </h1>
        <div className="contact-div" id="ccc">
          <span className="jagu">
            <div className="top-nav sub-div">
              <a href="#about" onClick={(e) => handleClick(e, "about")}>
                {" "}
                About{" "}
              </a>
              <Link to="/blogs"> Blogs </Link>
              <Link to="/chat"> Chat </Link>
              <Link to="/Team">Our team</Link>
              <Link to="/vserver">Private Rooms</Link>
              <a href="">Buy me Coffee!</a>
            </div>

            <div className="sub-div top-nav"><a href="https://docs.google.com/forms/d/e/1FAIpQLSc3dl9MZjo0lp-kD5tgifWKHjwo6CYr2D0hueZt08wHcwwfjQ/viewform?usp=sf_link">
                Report Bug
              </a>
              <a href="https://github.com/rahul-9429/AgastyaBratha">
                For Developers{" "}
              </a>
              <a href="#community" onClick={(e) => handleClick(e, "community")}>
                {" "}
                For Communities
              </a>
              <a href="https://docs.google.com/document/d/1M57eh1_goxaJnUIB6qkAP_m8aPAFMChlrNibvmfbjYM/edit?usp=sharing">Documentation</a>
              <Link to="/term&conditions">Privacy Policy</Link>
              
              <a href="mailto:project.suppourt.rahul@gmail.com?subject=Help%20reg%20Agastyabratha&body=describe%20your%20issue%20attach%20relevant%20screenshots">
                {" "}
                Contact Suppourt
              </a>
            </div>
          </span>
          <div className="Catch-Us">
            <span className="">Catch Us here..!</span>
            <span className="map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3196.0142726916674!2d83.16440192900556!3d17.710545027603203!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3968cb428b8087%3A0xaa3e198c43836a65!2sVignan&#39;s%20Institute%20Of%20Information%20Technology!5e0!3m2!1sen!2sin!4v1719688297254!5m2!1sen!2sin"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </span>
          </div>
        </div>
        <span className="prof-links-div">
          <span className="des-dev">
            {" "}
            Crafted and Programmed by{" "}
            <Link to="/Team">
              <u>Rahul Kasimikota</u>{" "}
            </Link>
            <br /> ©2024 AgastyaBratha. All rights reserved.
          </span>
          <span className="profil-links">
            <a href="https://www.linkedin.com/in/kasimikotasanthoshrahul/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                viewBox="0 0 17 17"
                fill="none"
              >
                <g clip-path="url(#a)">
                  <path
                    fill="currentColor"
                    d="M15.776.83H2.14C1.488.83.96 1.329.96 1.946v13.249c0 .617.528 1.119 1.181 1.119h13.635c.653 0 1.184-.502 1.184-1.116V1.946c0-.617-.531-1.116-1.184-1.116ZM5.706 14.025H3.333V6.633h2.375v7.392ZM4.52 5.626c-.762 0-1.378-.595-1.378-1.33 0-.735.616-1.33 1.378-1.33.76 0 1.375.595 1.375 1.33 0 .732-.615 1.33-1.375 1.33Zm10.075 8.399h-2.371v-3.593c0-.856-.016-1.96-1.235-1.96-1.234 0-1.422.935-1.422 1.9v3.653H7.197V6.633h2.275v1.01h.032c.315-.58 1.09-1.194 2.244-1.194 2.403 0 2.846 1.53 2.846 3.52v4.056Z"
                  ></path>
                </g>
              </svg>
            </a>

            <a href="https://www.github.com/rahul-9429">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                viewBox="0 0 17 17"
                fill="none"
              >
                <g clip-path="url(#a)">
                  <path
                    fill="currentColor"
                    fill-rule="evenodd"
                    d="M8.977.83C4.549.83.97 4.32.97 8.636c0 3.45 2.293 6.371 5.475 7.405.397.078.543-.168.543-.375 0-.18-.013-.8-.013-1.447-2.227.465-2.691-.93-2.691-.93-.358-.905-.888-1.138-.888-1.138-.73-.478.053-.478.053-.478.808.052 1.233.801 1.233.801.715 1.19 1.869.853 2.333.646.066-.504.278-.853.504-1.046-1.777-.181-3.646-.853-3.646-3.852 0-.853.318-1.55.822-2.093-.08-.194-.358-.995.08-2.068 0 0 .676-.207 2.2.801a7.94 7.94 0 0 1 2.002-.258c.676 0 1.365.09 2.001.258 1.525-1.008 2.2-.801 2.2-.801.438 1.073.16 1.874.08 2.068.517.542.822 1.24.822 2.093 0 2.999-1.869 3.658-3.659 3.852.292.245.544.71.544 1.447 0 1.047-.013 1.887-.013 2.145 0 .207.146.453.543.375 3.182-1.034 5.475-3.955 5.475-7.405C16.983 4.319 13.39.83 8.977.83Z"
                    clip-rule="evenodd"
                  ></path>
                </g>
              </svg>
            </a>
          </span>
        </span>
        {/* <center>Version 9.11  </center> */}
        
      </footer>
    </>
  );
}

export default Home;
