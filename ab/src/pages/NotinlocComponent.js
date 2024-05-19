import './App.css';
import geek from '../images/geek.jpg';
import tape from '../images/tape.jpg';
import logo from '../images/logoo.png';

function NotinlocComponent(){
    return(
      <>
      <img src={logo} alt="Logo" className='aga-logo ' />
      <section className='notinloc'>
          <img src={geek} alt="geekgod_modernart" className='geekgod'/> 
          <sapn className="notinloc-msg">
            <h2>Opps! Looks like your currently not in college primises <small>(VIIT or VIEW)</small></h2>
            <img src={geek} alt="geekgod_modernart" className='geekgod_mobile'/> 
            <p>We deeply value the privacy and security of our users.To protect the community we only allow acess to users who are in specified location</p>
            
            <h3>Troubleshooting :)</h3>
             <p>I'm in college but still facing this issue?</p>
             <p>Users mostly encounter this issue because "Location is not enabled" from the user end.<br/>
             <ul className='notinloc-li'>
              <li>Kindly enable location and try again</li>
              <li>Wait until the page is completely loaded</li>
              <li>Check your internet connection</li>
              <li>Didn't work? <a href="mailto:project.suppourt.rahul@gmail.com&subject=Hrlp%20agastya-bratha"> Contact suppourt</a></li>
             </ul>
              </p>
              <h4><u>We never save your location.It is only used for authentication.</u></h4>
               <img src={tape} className='tape'/>
          </sapn>
         
      </section>
     </>
    );
  }

  export default NotinlocComponent;