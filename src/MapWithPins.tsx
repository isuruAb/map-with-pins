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
  const [origin, setOrigin] = useState({ x: "50%", y: "50%" });

  // Drag state
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Zoom on mouse wheel
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const container = zoomContainerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    // Set transform origin based on cursor
    const originX = `${(offsetX / rect.width) * 100}%`;
    const originY = `${(offsetY / rect.height) * 100}%`;
    setOrigin({ x: originX, y: originY });

    // Update scale
    setScale((prev) => {
      const newScale = prev + e.deltaY * -0.001;
      return Math.min(2, Math.max(1, newScale));
    });
  };

  // Mouse down to start dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  // Mouse move to drag
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    setPosition({ x: newX, y: newY });
  };

  // Mouse up to stop dragging
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Apply transformations
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
        <img src={imageUrl} alt="Map" className="map-image" draggable={false}  />
      </div>
    </div>
  );
};

export default MapWithPins;
