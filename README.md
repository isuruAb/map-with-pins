# 📍 map-with-pins

**`map-with-pins`** is a simple and flexible React component built to display icons (pins) over a custom image-based map. It supports zooming, panning, and dynamic pin placement based on percentage coordinates.


---

## ✨ Features

- 🗺️ Overlay any number of pins on an image-based map
- 🔍 Zoom and pan the map interactively (Google Maps-style scroll behavior)
- 📌 Pins are placed using percentage-based positioning (responsive layout)
- 🧰 Written in TypeScript for better developer experience

---

## 🚀 Installation

```bash
npm install map-with-pins
```

or

```bash
yarn add map-with-pins
```

---

## 🛠️ Usage

```tsx
import React from 'react';
import MapWithPins, { Pin } from 'map-with-pins';

const pins: Pin[] = [
  {
    id: 1,
    x: 50,
    y: 30,
    imageUrl: '/pin-icon.png',
    width: 32,
    height: 32,
  },
];

const App = () => (
  <MapWithPins
    imageUrl="/my-map.jpg"
    windowWidth="100vw"
    windowHeight="80vh"
    mapWidth={1200}
    mapHeight={800}
    pins={pins}
  />
);

export default App;
```

---

## 📦 Props

| Prop           | Type        | Required | Description                                                        |
|----------------|-------------|----------|--------------------------------------------------------------------|
| `imageUrl`     | `string`    | ✅        | URL of the base map image                                          |
| `windowWidth`  | `string`    | ✅        | Width of the visible map wrapper                                   |
| `windowHeight` | `string`    | ✅        | Height of the visible map wrapper                                  |
| `mapWidth`     | `number`    | ❌        | Width of the full map image (optional, default is 100%)            |
| `mapHeight`    | `number`    | ❌        | Height of the full map image (optional, default is 100%)           |
| `pins`         | `Pin[]`     | ✅        | List of pin objects with coordinates and images                    |

### 🔖 Pin Type

```ts
interface Pin {
  id: string | number;
  x: number; // percentage from left (0 - 100)
  y: number; // percentage from top (0 - 100)
  imageUrl: string;
  width?: number; // optional, defaults to 24
  height?: number; // optional, defaults to 24
}
```

---

## 📈 Improvements

- 🚫 Currently, the **entire map image is loaded at once**, which can be inefficient for very large maps. Future versions may implement **lazy-loading or tile-based loading** to improve performance and load times.

---

## 🧑‍💻 Contributing

Got a cool idea or found a bug? Contributions are welcome! Feel free to open a pull request or issue.

---

## 🪪 License

MIT License. Free for personal and commercial use.

---

## 👋 Author

Built with ❤️ by [Isuru](https://github.com/isuruAb)