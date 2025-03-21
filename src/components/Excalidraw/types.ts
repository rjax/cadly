import { ExcalidrawProps } from "@rjax/excalidraw/types";

export interface ExcalidrawWrapperProps extends Partial<ExcalidrawProps> {
  className?: string;
}

export interface ExcalidrawDimensions {
  width: number;
  height: number;
}