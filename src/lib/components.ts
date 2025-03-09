import type { LibraryItems } from "@excalidraw/excalidraw/types/types";

export function loadLibraryFile(path: string): Promise<LibraryItems> {
  
  return fetch(path)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load library file: ${response.statusText}`);
      }
      return response.json()
    })
    .then(data => {
      console.log(data);
      return data.libraryItems as LibraryItems
    })
    .catch(error => {
      console.error('Error loading library file:', error);
      return [] as LibraryItems;
    });
}
