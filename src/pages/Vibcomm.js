import React, { useState, useEffect, useRef } from "react";
import "./App.css";
const Vibcomm = () => {
    const [count, setCount] = useState(0);
    const componentRef = useRef(null); // Reference to the component

    const startCounting = () => {
        setCount(0); // Reset the count to 0 when the component becomes visible

        let i = 0;
        const interval = setInterval(() => {
            i++;
            setCount((prevCount) => prevCount + 1);

            if (i >= 9) {
                clearInterval(interval); // Stop counting after reaching 9
            }
        }, 100); // Increment every 0.5 seconds
    };

    useEffect(() => {
        const observerCallback = (entries) => {
            const [entry] = entries;
            if (entry.isIntersecting) {
                startCounting(); // Call the function when the component is visible
            }
        };

        const observer = new IntersectionObserver(observerCallback, {
            threshold: 0.5, // 50% visibility
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
        <div ref={componentRef}>
            <h1 className="type-eff abt-nf ">{count}+ campuses </h1>
           
        </div>
    );
};

export default Vibcomm;
