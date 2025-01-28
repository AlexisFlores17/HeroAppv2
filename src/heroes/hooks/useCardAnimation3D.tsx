import { useGSAP } from "@gsap/react";

import gsap from "gsap";
import { useState, useRef, useEffect } from "react";
import { useMousePosition } from "./useMousePosition";

interface Props {
    cardRef: React.RefObject<HTMLDivElement>;
    glossRef: React.RefObject<HTMLDivElement>;
    itsFlipped?: boolean;
}

gsap.registerPlugin(useGSAP);

export const useCardAnimation3D = ({cardRef,glossRef, itsFlipped = false}: Props) => {


    const [isHovered, setIsHovered] = useState(false);
    const mousePosition = useMousePosition();
    const rx = useRef(0);
    const ry = useRef(0)
    const deg = useRef(0);
    const distanceToCenter = useRef(0);
    const maxDistance = useRef(0);
  


    useEffect(() => {
        const Rect = cardRef.current
          ? cardRef.current.getBoundingClientRect()
          : null;
    
        const halfWidth = Rect ? Rect.width / 2 : 0;
        const halfHeight = Rect ? Rect.height / 2 : 0;
    
        const cardCenterX = Rect ? Rect.left + halfWidth : 0;
        const cardCenterY = Rect ? Rect.top + halfHeight : 0;
    
        const deltaX = mousePosition.x - cardCenterX;
        const deltaY = mousePosition.y - cardCenterY;
    
        rx.current = deltaY / halfHeight;
        ry.current = deltaX / halfWidth;
    
        distanceToCenter.current = Math.sqrt(
          Math.pow(deltaX, 2) + Math.pow(deltaY, 2)
        );
        maxDistance.current = Math.max(halfWidth, halfHeight);
    
        deg.current = (distanceToCenter.current * 10) / maxDistance.current;
      }, [mousePosition]);
    
      useGSAP(() => {
        gsap.to(cardRef.current, {
          transform:
            isHovered && !itsFlipped
              ? `rotate3D(${-rx.current}, ${ry.current}, 0, ${deg.current}deg)`
              : `rotate3D(0, 0, 0, 0deg)`,
          duration: 0.2,
          perspective: 1000,
          transformStyle: "preserve-3d",
          willChange: "transform",
          ease: "power2.In",
        });
        gsap.to(glossRef.current, {
          transform: `translate(${ry.current * 100 * -1}%, ${
            rx.current * 100 * -1
          }%) scale(2.4)`,
          opacity: isHovered
            ? `${((distanceToCenter.current* 0.6) / maxDistance.current + 0.1)}`
            : "0",
          willChange: "transform, opacity",
          duration: 0.2,
          ease: "power2.Out",
          perspective: 1000,
          transformStyle: "preserve-3d",
        });
      }, [mousePosition]);


  return {
    setIsHovered,
  }
}
