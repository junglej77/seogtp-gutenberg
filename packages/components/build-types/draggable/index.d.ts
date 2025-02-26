/**
 * Internal dependencies
 */
import type { DraggableProps } from './types';
/**
 * `Draggable` is a Component that provides a way to set up a cross-browser
 * (including IE) customizable drag image and the transfer data for the drag
 * event. It decouples the drag handle and the element to drag: use it by
 * wrapping the component that will become the drag handle and providing the DOM
 * ID of the element to drag.
 *
 * Note that the drag handle needs to declare the `draggable="true"` property
 * and bind the `Draggable`s `onDraggableStart` and `onDraggableEnd` event
 * handlers to its own `onDragStart` and `onDragEnd` respectively. `Draggable`
 * takes care of the logic to setup the drag image and the transfer data, but is
 * not concerned with creating an actual DOM element that is draggable.
 *
 * ```jsx
 * import { Draggable, Panel, PanelBody } from '@wordpress/components';
 * import { Icon, more } from '@wordpress/icons';
 *
 * const MyDraggable = () => (
 *   <div id="draggable-panel">
 *     <Panel header="Draggable panel">
 *       <PanelBody>
 *         <Draggable elementId="draggable-panel" transferData={ {} }>
 *           { ( { onDraggableStart, onDraggableEnd } ) => (
 *             <div
 *               className="example-drag-handle"
 *               draggable
 *               onDragStart={ onDraggableStart }
 *               onDragEnd={ onDraggableEnd }
 *             >
 *               <Icon icon={ more } />
 *             </div>
 *           ) }
 *         </Draggable>
 *       </PanelBody>
 *     </Panel>
 *   </div>
 * );
 * ```
 */
export declare function Draggable({ children, onDragStart, onDragOver, onDragEnd, appendToOwnerDocument, cloneClassname, elementId, transferData, __experimentalTransferDataType: transferDataType, __experimentalDragComponent: dragComponent, }: DraggableProps): import("react").JSX.Element;
export default Draggable;
//# sourceMappingURL=index.d.ts.map