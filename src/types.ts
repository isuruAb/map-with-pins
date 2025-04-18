export interface Pin {
  x: number; // x in percentage
  y: number; // y in percentage
  iconUrl: string;
  label?: string;
}

export interface MapWithPinsProps {
  mapUrl: string;
  // pins: Pin[];
  width?: string;
  height?: string;
}