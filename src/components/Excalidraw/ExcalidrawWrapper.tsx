import React, { useCallback, useEffect, useState, Suspense } from 'react';
import { ExcalidrawWrapperProps, ExcalidrawDimensions } from './types';
import { EXCALIDRAW_DEFAULTS } from './constants';
import { LoadingSpinner } from './LoadingSpinner';
import { ExcalidrawErrorBoundary } from './ExcalidrawErrorBoundary';
import { Sidebar } from '@rjax/excalidraw';
import { Footer } from '@rjax/excalidraw';
import { loadLibraryFromBlob } from "@rjax/excalidraw";
import { ExcalidrawProps, LibraryItems } from '@rjax/excalidraw/types';
import { t } from '@rjax/excalidraw/i18n';

// Lazy load Excalidraw component
const Excalidraw = React.lazy(() =>
  import('@rjax/excalidraw').then(module => ({
    default: module.Excalidraw
  }))
);

export const ExcalidrawWrapper: React.FC<ExcalidrawWrapperProps> = (props) => {
  const [dimensions, setDimensions] = useState<ExcalidrawDimensions>({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const [docked, setDocked] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [libraryItems, setLibraryItems] = useState<LibraryItems>([]);

  const handleResize = useCallback(() => {
    setDimensions({
      width: Math.max(window.innerWidth, EXCALIDRAW_DEFAULTS.MIN_WIDTH),
      height: Math.max(window.innerHeight, EXCALIDRAW_DEFAULTS.MIN_HEIGHT)
    });
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  useEffect(() => {
    const loadLibrary = async () => {
      try {
        // Update to your actual library file path

        const response = await fetch("/assets/library.excalidrawlib", {
          headers: { "Content-type": "application/json" }
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch library: ${response.status} ${response.statusText}`);
        }

        const blob = await response.blob();
        const items = await loadLibraryFromBlob(blob, "published");

        const publishedItems = items.map((item: any) => ({
          ...item,
          status: "published"
        }));


        console.log("Library items loaded:", publishedItems);
        setLibraryItems(publishedItems);
      } catch (error) {
        console.error("Failed to load library:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLibrary();
  }, []);

  const excalidrawProps: ExcalidrawProps = {
    width: dimensions.width,
    height: dimensions.height,
    initialData: {
      appState: {
        viewBackgroundColor: '#ffffff',
        theme: 'light',
        // Open library sidebar by default
        openSidebar: { name: "library" }
      },
      // Pass library items to Excalidraw
      libraryItems: libraryItems
    },
    ...props
  };

  return (
    <div className={`excalidraw-wrapper ${props.className || ''}`} style={{ width: '100%', height: '100%' }}>
      <ExcalidrawErrorBoundary>
      <h1 style={{ textAlign: "center" }}>Cadli</h1>
        <Suspense fallback={<LoadingSpinner />}>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <Excalidraw
              {...excalidrawProps}
              UIOptions={{
                dockedSidebarBreakpoint: 0,
              }}
            >
              <Sidebar name="custom1" docked={docked} onDock={setDocked}>
                <Sidebar.Header>
                  Component Library
                </Sidebar.Header>
                {/* You can add custom components here */}
              </Sidebar>
              <Footer>
                <Sidebar.Trigger
                  name="custom1"
                  style={{
                    marginLeft: "0.5rem",
                    background: "#70b1ec",
                    color: "white",
                  }}
                >
                  Toggle Custom Sidebar
                </Sidebar.Trigger>
              </Footer>
            </Excalidraw>
          )}
        </Suspense>
      </ExcalidrawErrorBoundary>
    </div>
  );
};