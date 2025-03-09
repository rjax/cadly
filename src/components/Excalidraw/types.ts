import type { ExcalidrawProps } from "@excalidraw/excalidraw/types/types";

export interface ExcalidrawWrapperProps extends Partial<ExcalidrawProps> {
  className?: string;
}

export interface ExcalidrawDimensions {
  width: number;
  height: number;
}