import { LibraryUnit } from "@rjax/excalidraw";
import { LibraryItemEx } from "../types";
import { SvgCache } from "@rjax/excalidraw/hooks/useLibraryItemSvg";

export const LibraryUnitEx = ({  libraryItem, svgCache }: { libraryItem: LibraryItemEx,svgCache:SvgCache}) => {

    console.log('svgCache', svgCache);

    const handleClick = (id: string | null) => {
        console.log('Library item clicked:', id);
    };

    const handleToggle = (id: string) => {
        console.log('Library item toggled:', id);
    };

    const handleDrag = (id: string) => {
        console.log('Library item dragged:', id);
    };

    return (
        <div style={{  padding: '8px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            {/* <div>
                <span>{libraryItem.category} {libraryItem.name}</span>
            </div> */}
            <LibraryUnit
                id="example-id"
                elements={libraryItem.elements}
                isPending={false}
                onClick={handleClick}
                selected={false}
                onToggle={handleToggle}
                onDrag={handleDrag}
                svgCache={svgCache}
            />
        </div>
    );
};

