import './App.css';
import founder from '../images/founder.jpeg';
import nischal from '../images/nischal.jpeg';
import jaga from '../images/jaga.jpeg';
import pavan from '../images/image.png';
import mama from '../images/chandumama.jpg';
import view from '../images/prakruthi.jpg';
import light from '../images/agalogoedited.png';
import { Link } from "react-router-dom";
import React, { useEffect} from 'react';
const Founder = () =>{
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);
    return(
        <>
        <div className="founder-div">
            <h1 className="type-eff abt-nf">The power behind <br></br> <Link to="/">
            <img src={light} className='aga-main' height="70vh" alt="logo"></img></Link></h1>
            <div className="founder-img">
            <a href='https://www.linkedin.com/in/kasimikotasanthoshrahul/'><img src={founder} alt='rahul_kasimikota' className=""/> </a>
             </div>
             <a href='https://www.linkedin.com/in/kasimikotasanthoshrahul/'><h2 className="type-eff abt-nf admin-text">Rahul Kasimikota</h2></a>
             <p style={{marginTop:'0',color:'#ffff',textAlign:'center'}}><b>Key person, VIIT Admin <i>AgastyaBratha</i></b></p>
             <span className="li-gi">
             <a href='https://www.linkedin.com/in/kasimikotasanthoshrahul'><button class="button butn-vs">
        LinkedIn
  <svg fill="currentColor" viewBox="0 0 24 24" class="icon" className='icon-till'>
    <path clip-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" fill-rule="evenodd"></path>
  </svg>
</button></a>

              
             <a href='https://www.github.com/rahul-9429'><button class="button butn-vs">
        Github
  <svg fill="currentColor" viewBox="0 0 24 24" class="icon" className='icon-till'>
    <path clip-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" fill-rule="evenodd"></path>
  </svg>
</button></a></span>
<br/><br/>
<h1 className="type-eff abt-nf admin-ty" style={{paddingLeft:'1rem',paddingRight:'1rem'}}>Meet our contributors</h1>
<div className="admins">
<span className="admins-wrap">
  
<div className="founder-img">
            <a href='https://www.linkedin.com/in/nischal-mantri-898508276/'><img src={nischal} alt='Nischal' className=""/> </a>
             </div>
             <a href='https://www.linkedin.com/in/nischal-mantri-898508276/'><h2 className="type-eff abt-nf admin-text">Sai Nischal</h2></a>
             <p style={{marginTop:'0',color:'#ffff',textAlign:'center'}}><b>UI contributor <i>AgastyaBratha</i></b></p>
             <span className="li-gi">
             <a href='https://www.linkedin.com/in/nischal-mantri-898508276/'><button class="button butn-vs">
        LinkedIn
  <svg fill="currentColor" viewBox="0 0 24 24" class="icon" className='icon-till'>
    <path clip-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" fill-rule="evenodd"></path>
  </svg>
</button></a></span></span>

<span className="admins-wrap">
<div className="founder-img">
            <a href='https://www.linkedin.com/in/jagadeesh-kandepalli-6133a1264/'><img src={jaga} alt='Jagadeesh' className=""/> </a>
             </div>
             <a href='https://www.linkedin.com/in/jagadeesh-kandepalli-6133a1264/'><h2 className="type-eff abt-nf admin-text">Jagadeesh</h2></a>
             <p style={{marginTop:'0',color:'#ffff',textAlign:'center'}}><b>UI contributor  <i>AgastyaBratha</i></b></p>
             <span className="li-gi">
             <a href='https://www.linkedin.com/in/jagadeesh-kandepalli-6133a1264/'><button class="button butn-vs">
        LinkedIn
  <svg fill="currentColor" viewBox="0 0 24 24" class="icon" className='icon-till'>
    <path clip-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" fill-rule="evenodd"></path>
  </svg>
</button></a></span></span>

 
</div> 


<br/><br/>
<h1 className="type-eff abt-nf admin-ty" style={{paddingLeft:'1rem',paddingRight:'1rem'}}>Meet our team behind the authentic updates on AgastyaBratha's announcements page</h1>
<p style={{textAlign:'center',justifyContent:'center',display:'flex',fontSize:'large',marginTop:'0'
  }}>Together, we strive to deliver reliable updates that keep you informed and confident about our community.</p>
<div className="admins">
<span className="admins-wrap">
  
<div className="founder-img">
            <a href='https://www.linkedin.com/in/das-pavan-kumar-686279165/'><img src={pavan} alt='Das pavan kumar' className=""/> </a>
             </div>
             <a href='https://www.linkedin.com/in/das-pavan-kumar-686279165/'><h2 className="type-eff abt-nf admin-text">Pavan Kumar</h2></a>
             <p style={{marginTop:'0',color:'#ffff',textAlign:'center'}}><b>VIIT Admin <i>AgastyaBratha</i></b></p>
             <span className="li-gi">
             <a href='https://www.linkedin.com/in/das-pavan-kumar-686279165/'><button class="button butn-vs">
        LinkedIn
  <svg fill="currentColor" viewBox="0 0 24 24" class="icon" className='icon-till'>
    <path clip-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" fill-rule="evenodd"></path>
  </svg>
</button></a></span></span>

<span className="admins-wrap">
<div className="founder-img">
            <a href='https://www.linkedin.com/in/saichandu26/'><img src={mama} alt='Sai Chandu' className=""/> </a>
             </div>
             <a href='https://www.linkedin.com/in/saichandu26/'><h2 className="type-eff abt-nf admin-text">Sai Chandu</h2></a>
             <p style={{marginTop:'0',color:'#ffff',textAlign:'center'}}><b>VIIT Admin <i>AgastyaBratha</i></b></p>
             <span className="li-gi">
             <a href='https://www.linkedin.com/in/saichandu26/'><button class="button butn-vs">
        LinkedIn
  <svg fill="currentColor" viewBox="0 0 24 24" class="icon" className='icon-till'>
    <path clip-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" fill-rule="evenodd"></path>
  </svg>
</button></a></span></span>

<span className="admins-wrap">
<div className="founder-img">
            <a href='https://www.linkedin.com/in/prakruthi-chowdary-00a125289/'><img src={view}alt='Prakruthi Chowdary' className=""/> </a>
             </div>
             <a href='https://www.linkedin.com/in/prakruthi-chowdary-00a125289/'><h2 className="type-eff abt-nf admin-text">Prakruthi </h2></a>
             <p style={{marginTop:'0',color:'#ffff',textAlign:'center'}}><b>VIEW Admin <i>AgastyaBratha</i></b></p>
             <span className="li-gi">
             <a href='https://www.linkedin.com/in/prakruthi-chowdary-00a125289/'><button class="button butn-vs">
        LinkedIn
  <svg fill="currentColor" viewBox="0 0 24 24" class="icon" className='icon-till'>
    <path clip-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z" fill-rule="evenodd"></path>
  </svg>
</button></a></span></span>
</div> 
      <p style={{textAlign:'center'}}> ©2024 AgastyaBratha.</p>
        </div>
        </>
    );
};

export default Founder;