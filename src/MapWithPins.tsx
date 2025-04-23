import React, { useRef, useEffect, useState } from "react";
import "./styles.css";

export interface MapWithPinsProps {
  imageUrl: string;
  windowWidth: string;
  windowHeight: string;
  mapWidth?: number;
  mapHeight?: number;
  initScale?: number;
  pins: Pin[];
}

export interface Pin {
  id: string | number;
  x: number;
  y: number;
  imageUrl: string;
  width?: number;
  height?: number;
}

const MapWithPins: React.FC<MapWithPinsProps> = ({
  imageUrl,
  windowWidth,
  windowHeight,
  mapHeight,
  mapWidth,
  pins,
  initScale,
}) => {
  const zoomContainerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(initScale || 1);
  const [origin, setOrigin] = useState({ x: "50%", y: "50%" });

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const container = zoomContainerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const originX = `${(offsetX / rect.width) * 100}%`;
    const originY = `${(offsetY / rect.height) * 100}%`;
    setOrigin({ x: originX, y: originY });

    setScale((prev: number) => {
      const zoomFactor = 0.1;
      const newScale = e.deltaY < 0 ? prev + zoomFactor : prev - zoomFactor;
      return Math.min(5, Math.max(1, newScale)); // allow bigger zoom range for smoother feel
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (zoomContainerRef.current) {
      const container = zoomContainerRef.current;
      container.style.transformOrigin = `${origin.x} ${origin.y}`;
      container.style.transform = `translate(${position.x}px, ${position.y}px) scale(${scale})`;
    }
  }, [scale, origin, position]);

  return (
    <div
      className="map-wrapper"
      style={{
        width: windowWidth,
        height: windowHeight,
        overflow: "hidden",
        position: "relative",
        cursor: isDragging ? "grabbing" : "grab",
        backgroundColor: "#EFD6A1",
      }}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div ref={zoomContainerRef} className="zoom-container">
        <div
          style={{
            position: "relative",
            width: mapWidth || "100%",
            height: mapHeight || "100%",
            margin: "0 auto",
          }}
        >
          <img
            src={imageUrl}
            alt="Map"
            className="map-image"
            draggable={false}
            style={{
              width: mapWidth || "100%",
              height: mapHeight || "100%",
            }}
          />
          {pins.map((pin) => (
            <div
              key={pin.id}
              style={{
                position: "absolute",
                left: `${pin.x}%`,
                top: `${pin.y}%`,
                transform: "translate(-50%, -100%)",
                zIndex: 10,
                pointerEvents: "auto",
              }}
            >
              <img
                src={pin.imageUrl}
                alt={`Pin ${pin.id}`}
                style={{
                  width: pin.width || 24,
                  height: pin.height || 24,
                  cursor: "pointer",
                }}
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapWithPins;
