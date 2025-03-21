declare global {
    interface Window {
      EXCALIDRAW_ASSET_PATH: string;
    }
  }
  
  window.EXCALIDRAW_ASSET_PATH = import.meta.env.VITE_EXCALIDRAW_ASSET_PATH || "/fonts/";
  