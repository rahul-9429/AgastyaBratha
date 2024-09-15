import './App.css';
import geek from '../images/geekgodcroped.jpg';
import geeky from '../images/geek.jpg';
import tape from '../images/tape.jpg';
import logo from '../images/logoo.png';

function NotinlocComponent(){
  const style = {
    backgroundColor: '#ff5733',
};
    return(
      <>
      <div className='notinloccss'>
      <img src={logo} alt="Logo" className='aga-logo ' />
      <section className='notinloc'>
          <img src={geeky} alt="geekgod_modernart" className='geekgod'/> 
          <sapn className="notinloc-msg">
            <h2>Oops! Looks like You're currently not in college primises <small>(VIIT or VIEW or VU)</small></h2>
            <img src={geek} alt="geekgod_modernart" className='geekgod_mobile'/> 
            <p>We deeply value the privacy and security of our users.To protect the community we only allow acess to users who are in specified location</p>
            
            <h3>Troubleshooting :)</h3>
             <p>I'm in college but still facing this issue?</p>
             <p>Users mostly encounter this issue because "Location is not enabled" from the user end.<br/>
             <ul className='notinloc-li'>
              <li>Kindly enable location and try again</li>
              <li>Wait until the page is completely loaded</li>
              <li>Check your internet connection</li>
              <li>Didn't work? <a href="mailto:project.suppourt.rahul@gmail.com&subject=Hrlp%20agastya-bratha"><u>Contact support</u></a></li>
             </ul>
              </p>
              <h4><u>We never save your location.It is only used for authentication.</u></h4>
               <img src={tape} className='tape'/>
          </sapn>
         
      </section>
      </div>
     </>
    );
  }

  export default NotinlocComponent;