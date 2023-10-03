import { createHashRouter, RouterProvider } from 'react-router-dom';
import { AudioProvider } from "./contexts/AudioContext";
import { PreloadProvider } from "./contexts/PreloadContext";
import Game from "./components/Game";
import Menu from "./components/Menu";

const router = createHashRouter([
  {
    path: '/',
    element: <Menu />,
  },
  {
    path: '/play',
    element: <Game />,
  },
]);

const App = () => {
  return (
    <PreloadProvider>
      <AudioProvider>
        <RouterProvider router={router} />
      </AudioProvider>
    </PreloadProvider>
  );
};

export default App;
