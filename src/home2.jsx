import { useState, useEffect } from 'react';
import './Homepage.css';

const Homepage = () => {
    const [hoveredImage, setHoveredImage] = useState(null);
    const [positions, setPositions] = useState([]);
    const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
    const [hasAnimated, setHasAnimated] = useState(false);

    const images = [
        "https://2022-pha5e-website-prod.s3.eu-west-3.amazonaws.com/assets/bigger-science_thumbnail-2.png",
        "https://2022-pha5e-website-prod.s3.eu-west-3.amazonaws.com/assets/map-interactive.png",
        "https://2022-pha5e-website-prod.s3.eu-west-3.amazonaws.com/assets/Capture%20da%C3%8CeI%C3%8Ccran%202024-01-04%20aI%C3%8C%2016.41.06-2.png",
        "https://2022-pha5e-website-prod.s3.eu-west-3.amazonaws.com/assets/Capture-d%C3%A2e%C3%8Ccran-2023-04-03-a%C3%8C-10.59.43_2-2.jpg"
    ];

    useEffect(() => {
        const generatePositions = () => {
            const newPositions = [];
            const minDistance = 120;
            const maxAttempts = 200;
            let attempts = 0;

            while(newPositions.length < 4 && attempts < maxAttempts) {
                attempts++;
                const pos = {
                    x: Math.random() * 60 + 20,
                    y: Math.random() * 60 + 20,
                    valid: true
                };

                for(const existing of newPositions) {
                    const dx = pos.x - existing.x;
                    const dy = pos.y - existing.y;
                    if(Math.sqrt(dx*dx + dy*dy) < minDistance) {
                        pos.valid = false;
                        break;
                    }
                }

                if(pos.valid) newPositions.push(pos);
            }
            
            if(newPositions.length < 4) {
                return [
                    { x: 25, y: 25 },
                    { x: 25, y: 75 },
                    { x: 75, y: 25 },
                    { x: 75, y: 75 }
                ].slice(0, 4);
            }
            return newPositions;
        };

        setPositions(generatePositions());
        if (!hasAnimated) {
            setTimeout(() => setHasAnimated(true), 100);
        }
    }, [hasAnimated]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const offsetX = (e.clientX - rect.left - rect.width/2) / 25;
        const offsetY = (e.clientY - rect.top - rect.height/2) / 25;
        setMouseOffset({ x: offsetX, y: offsetY });
    };

    return (
        <div className="min-h-screen bg-[rgb(33,33,33)] relative overflow-hidden">
            {/* Top Navigation Bar */}
            <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4 text-white bg-[rgb(33,33,33)]">
                <div className="text-2xl font-[Area_Normal]">PHASE</div>
                <div className="flex gap-8">
                    {["Our vision", "Our team", "Our projects", "Contact us"].map((item) => (
                        <a key={item} className="hover:opacity-70 transition-opacity cursor-pointer">{item}</a>
                    ))}
                    <div className="ml-4">FRI/EN</div>
                </div>
            </div>

            {/* Text Overlay */}
            <div className={`absolute inset-0 flex flex-col justify-center items-center pointer-events-none 
                transition-all duration-500 ${hoveredImage !== null ? 'opacity-100 mt-20 z-0' : 'opacity-100 z-10'}`}>
                <div className="relative text-center">
                    {["MAGNING", "UNIQUE", "CONCEPTS", "AND DIGITAL", "EXPERIENCES"].map((text, index) => (
                        <p 
                            key={index}
                            className={`text-[7rem] font-extrabold font-[Area_Normal] leading-none transition-all duration-300
                                ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                            style={{ 
                                WebkitTextStroke: hoveredImage !== null ? '3px white' : '0px',
                                color: hoveredImage !== null ? 'transparent' : 'white',
                                transitionDelay: `${index * 0.15}s`
                            }}
                        >
                            {text}
                        </p>
                    ))}
                </div>
            </div>

            {/* Images Container */}
            <div className="absolute inset-0 z-20">
                {positions.map((pos, index) => (
                    <div
                        key={index}
                        className={`absolute w-48 h-64 transition-transform duration-300 
                            hover:!scale-105 hover:z-30 ${getFloatClass(index)}`}
                        style={{
                            left: `${pos.x}%`,
                            top: `${pos.y}%`,
                            transform: `translate(
                                ${hoveredImage === index ? mouseOffset.x : 0}px,
                                ${hoveredImage === index ? mouseOffset.y : 0}px
                            )`
                        }}
                        onMouseEnter={() => setHoveredImage(index)}
                        onMouseLeave={() => setHoveredImage(null)}
                        onMouseMove={handleMouseMove}
                    >
                        <div className="w-full h-full overflow-hidden rounded-lg will-change-transform">
                            <img 
                                src={images[index]} 
                                alt={`project-${index}`} 
                                className="w-full h-full object-cover transform transition-all duration-300"
                                loading="lazy"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const getFloatClass = (index) => {
    const animations = [
        'animate-float-1',
        'animate-float-2',
        'animate-float-3',
        'animate-float-4'
    ];
    return animations[index];
};

export default Homepage;