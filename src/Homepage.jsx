import './Homepage.css';
import { useState } from 'react';
import { MotionImg } from './MotionImg';
import CrossBox from './CrossBox';

const Homepage = () => {
    const images = [
        "https://2022-pha5e-website-prod.s3.eu-west-3.amazonaws.com/assets/bigger-science_thumbnail-2.png",
        "https://2022-pha5e-website-prod.s3.eu-west-3.amazonaws.com/assets/map-interactive.png",
        "https://2022-pha5e-website-prod.s3.eu-west-3.amazonaws.com/assets/Capture%20da%C3%8CeI%C3%8Ccran%202024-01-04%20aI%C3%8C%2016.41.06-2.png",
        "https://2022-pha5e-website-prod.s3.eu-west-3.amazonaws.com/assets/Capture-d%C3%A2e%C3%8Ccran-2023-04-03-a%C3%8C-10.59.43_2-2.jpg"
    ];

    const imgContent = [
        "BIGGER SCIENCE",
        "MUCEM",
        "OLIVE TREE",
        "UNGANISHA"
    ]

    const [hoveredIndex, setHoveredIndex] = useState(0);

    return (
        <div className="min-h-screen bg-[rgb(33,33,33)] relative overflow-hidden">
            {/*bbar */}
            <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4 text-white bg-[rgb(33,33,33)]">
                <div className="text-2xl font-[Area_Normal] cursor-pointer">
                    <img src="https://2022-pha5e-website-prod.s3.eu-west-3.amazonaws.com/assets/logo.svg" alt="" />
                </div>
                <div className="flex gap-8">
                    {["Our vision", "Our team", "Our projects", "Contact us"].map((item) => (
                        <a key={item} className="hover:opacity-70 transition-opacity cursor-pointer">{item}</a>
                    ))}
                    <div className="ml-4">FRI/EN</div>
                </div>
            </div>

            {/* Cente*/}
            <div
                className={`absolute inset-0 flex flex-col justify-center items-center text-center text-white font-extrabold text-[15vh] leading-none pointer-events-none z-20 
                ${hoveredIndex !== 0 ? "text-5xl font-bold text-transparent text-outline" : ""}`}
            >
                {["IMAGNING", "UNIQUE", "CONCEPTS", "AND DIGITAL", "EXPERIENCES"].map((text, index) => (
                    <p key={index} className="opacity-100">{text}</p>
                ))}
            </div>

            {/* Imaaage */}
            <div className=" w-full h-screen z-10">
                {[250, 800, 300, 800].map((xPos, i) => (
                    <div key={i} className="absolute" style={{ zIndex: hoveredIndex !== 0 ? 30 : 10 }}>
                        {hoveredIndex === i + 1 || hoveredIndex === 0 ? (
                            <MotionImg
                                src={images[i]}
                                index={i + 1}
                                pos={[xPos, [160, 70, 500, 400][i]]}
                                setHoveredIndex={setHoveredIndex}
                                hoveredIndex={hoveredIndex}
                                w={18.5}
                                h={10.5}
                                Content={imgContent[i]}
                            />
                        ) : (
                            <CrossBox width={295} height={180} x={xPos} y={[160, 70, 480, 450][i]} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Homepage;
