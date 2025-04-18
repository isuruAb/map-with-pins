import React, { useRef, useEffect, useState } from "react";
import "./styles.css";

export interface MapWithPinsProps {
  imageUrl: string;
  windowWidth: string;
  windowHeight: string;
}

const MapWithPins: React.FC<MapWithPinsProps> = ({
  imageUrl,
  windowWidth,
  windowHeight,
}) => {
  const zoomContainerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setScale((prev) => Math.max(1, Math.min(prev + e.deltaY * -0.001, 4))); // clamp between 1 and 4
  };

  useEffect(() => {
    if (zoomContainerRef.current) {
      console.log("Ref initialized:", zoomContainerRef.current);
      const container = zoomContainerRef.current;
      container.style.transform = `scale(${scale})`;
    }
  }, [scale]);

  return (
    <div
      className="map-wrapper"
      style={{
        width: `${windowWidth}`,
        height: `${windowHeight}`,
        overflow: "hidden",
      }}
      onWheel={handleWheel}
    >
      <div 
      ref={zoomContainerRef} 
      className="zoom-container">
        <img src={imageUrl} alt="Map" className="map-image" />
      </div>
    </div>
  );
};

export default MapWithPins;
