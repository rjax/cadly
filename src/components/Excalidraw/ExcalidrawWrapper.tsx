import React, { useCallback, useEffect, useState, Suspense } from 'react';
import { ExcalidrawProps, LibraryItems } from '@excalidraw/excalidraw/types/types';
import { ExcalidrawWrapperProps, ExcalidrawDimensions } from './types';
import { EXCALIDRAW_DEFAULTS } from './constants';
import { LoadingSpinner } from './LoadingSpinner';
import { ExcalidrawErrorBoundary } from './ExcalidrawErrorBoundary';


// Lazy load both Excalidraw and library data together
const ExcalidrawWithLibrary = React.lazy(async () => {
  const [{ Excalidraw }, libraryData ] = await Promise.all([
    import('@excalidraw/excalidraw'),
    import('../../assets/library.json')
  ]);
  
  return {
    default: (props: ExcalidrawProps) => (
      <Excalidraw
        {...props}
        initialData={{
          ...props.initialData,
          libraryItems: libraryData.libraryItems as LibraryItems
        }}
      />
    )
  };
});

export const ExcalidrawWrapper: React.FC<ExcalidrawWrapperProps> = (props) => {
  const [dimensions, setDimensions] = useState<ExcalidrawDimensions>({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const handleResize = useCallback(() => {
    setDimensions({
      width: Math.max(window.innerWidth, EXCALIDRAW_DEFAULTS.MIN_WIDTH),
      height: Math.max(window.innerHeight, EXCALIDRAW_DEFAULTS.MIN_HEIGHT)
    });
  }, []);

  useEffect(() => {
    handleResize();
    let timeoutId: number;

    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(handleResize, EXCALIDRAW_DEFAULTS.RESIZE_DEBOUNCE);
    };

    window.addEventListener('resize', debouncedResize);

    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(timeoutId);
    };
  }, [handleResize]);

  const excalidrawProps: ExcalidrawProps = {
    width: dimensions.width,
    height: dimensions.height,
    initialData: {
      appState: {
        viewBackgroundColor: '#ffffff',
        theme: 'light'
      }
    },
    ...props
  };

  return (
    <div className={`excalidraw-wrapper ${props.className || ''}`} style={{ width: '100%', height: '100%' }}>
      <ExcalidrawErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <ExcalidrawWithLibrary {...excalidrawProps} />
        </Suspense>
      </ExcalidrawErrorBoundary>
    </div>
  );
};