import { useContext } from "react";
import { PreloadContext } from '../contexts/PreloadContext';

const usePreload = () => useContext(PreloadContext);

export default usePreload;
