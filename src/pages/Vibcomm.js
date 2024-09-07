import React, { useState, useEffect, useRef } from "react";
import "./App.css";
const Vibcomm = () => {
    const [count, setCount] = useState(0);
    const [countt, setCountt]= useState(9429);
    const componentRef = useRef(null); // Reference to the component

    const startCounting = () => {
        setCount(0); // Reset the count to 0 when the component becomes visible
        setCountt(9429);
        let i = 1;
        let j=9429;
        const interval = setInterval(() => {
            i++;
            setCount((prevCount) => prevCount + 1);

            if (i > 8) {
                clearInterval(interval); 
            }
        }, 100); 
        const inccc = setInterval(()=>{
            j++;
            setCountt((prevCount) => prevCount+1);
            if(j>9999){
                clearInterval(inccc);
            }
        },400);
       
        
    };

    useEffect(() => {
        const observerCallback = (entries) => {
            const [entry] = entries;
            if (entry.isIntersecting) {
                startCounting(); 
            }
        };

        const observer = new IntersectionObserver(observerCallback, {
            threshold: 0.5,  
        });

        if (componentRef.current) {
            observer.observe(componentRef.current);
        }

        return () => {
            if (componentRef.current) {
                observer.unobserve(componentRef.current);
            }
        };
    }, []);

    return (
        <div ref={componentRef} className="vibcomm"> 
            <h1 className=" abt-nf ani-eff" style={{marginBottom:0, color:"#c3c0c0"}}>{count}+ campuses </h1>
            <h1 className="abt-nf ani-eff" style={{marginTop:0,marginBottom:0, textAlign:"center",color:"#c3c0c0"}}><span className="add-space-count">{countt}</span>+ Anonymous explorers</h1> 
           
        </div>
    );
};

export default Vibcomm;
