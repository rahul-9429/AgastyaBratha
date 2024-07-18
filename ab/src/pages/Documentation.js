import './App.css';
import logo from '../images/logoo.png';
import Founder from './Founder';
function Documentation(){
    return(
<>
<section className='aga-doc'>
    <div className='aga-doc-con'>
<img src={logo} alt="agastyabratha-logo"/>
<hr/>
{/* <Founder/> */}
<span style={{display:'block', textAlign:'left'}}><i>Welcome,</i></span>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Agastya-Bratha is a common community chatroom where users can continue without any login or signup which works on location basis. It offers a unique and efficient way for users to engage in community conversations based on their physical location, providing instant access to relevant discussions without the need for traditional sign-up processes. This makes it a versatile tool for fostering local community connections and enhancing real-time communication. <br/>
<strong>Potential Use Cases
</strong>
<ul typeof='circle'>
    <li><strong>Neighborhood Watch:</strong> Residents can quickly share information about local safety concerns, lost pets, or community announcements.</li>
    <li><strong>Public Announcements:</strong> Local authorities or organisations can disseminate information quickly to people in the area without needing to gather contact details or manage a mailing list.</li>
</ul>
</div>
</section>
</>
    )
}
export default Documentation;