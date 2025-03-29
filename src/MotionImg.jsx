import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const MotionImg = ({ src, index, pos, setHoveredIndex, hoveredIndex, w, h, Content }) => {
    const [translate, setTranslate] = useState({ x: 0, y: 0 });

    const handleMouseMove = (event) => {
        const { clientX, clientY } = event;
        const target = event.currentTarget;
        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = clientX - centerX;
        const deltaY = clientY - centerY;
        const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
        const safeDistance = distance || 1;
        const offset = 100; // Adjust this value to change movement distance

        setTranslate({
            x: (deltaX / safeDistance) * offset,
            y: (deltaY / safeDistance) * offset
        });
    };

    const handleMouseLeave = () => {
        setHoveredIndex(0);
        setTranslate({ x: 0, y: 0 });
    };

   
    return (
        <motion.div
            className="relative cursor-pointer"
            initial={{ x: pos[0], y: pos[1] }}
            animate={{
                x: pos[0] + (hoveredIndex === index ? translate.x : 0),
                y: pos[1] + (hoveredIndex === index ? translate.y : 0),
                scale: hoveredIndex === index ? 1.15 : 1,
                zIndex: hoveredIndex === index ? 3 : 1
            }}
            transition={{
                type: "spring",
                stiffness: hoveredIndex === index ? 100 : 30,
                damping: hoveredIndex === index ? 20 : 15, 
                mass: 2, 
                duration: hoveredIndex === index ? 1 : 1.5 
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={handleMouseLeave}
            
        >
            <motion.img
                src={src}
                alt={`img-${index}`}
                className={`object-cover shadow-lg`}
                style={{ 
                    width: `${w}rem`, 
                    height: `${h}rem`,
                     // Ensures it doesn't overflow container
                }}
                whileHover={{
                    boxShadow: "0px 10px 20px rgba(255, 255, 255, 0.5)"
                }}
            />
            <motion.div
                className="absolute bottom-0 left-45 flex items-center justify-center font-extrabold text-white text-5xl pointer-events-none"
                style={{ WebkitTextStroke: "1px gray" }}
                animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            
            >
                {Content}
            </motion.div>
        </motion.div>
    );
};