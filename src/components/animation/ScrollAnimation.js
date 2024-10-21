import React, { useEffect, useRef, useState } from 'react';
import './ScrollAnimation.scss';

const ScrollAnimation = ({ children, animationClass }) => { //animationClass cho phép truyền vào bên trong nó bất kỳ phần tử hoặc component nào
    const animationRef = useRef(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const animationElement = animationRef.current;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !hasAnimated) {
                    entry.target.classList.add('active');
                    setHasAnimated(true);
                    observer.unobserve(entry.target); // Ngừng theo dõi phần tử
                }
            });
        }, { threshold: 0.3 });// Khi phần tử hiển thị 30% trong khung nhìn

        observer.observe(animationElement);
    }, [hasAnimated]);

    return (
        <div ref={animationRef} className={animationClass}>
            {children}
        </div>
    );
};

export default ScrollAnimation;
