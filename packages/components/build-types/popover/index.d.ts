import type { WordPressComponentProps } from '../context';
import type { PopoverProps } from './types';
/**
 * Name of slot in which popover should fill.
 *
 * @type {string}
 */
export declare const SLOT_NAME = "Popover";
/**
 * `Popover` renders its content in a floating modal. If no explicit anchor is passed via props, it anchors to its parent element by default.
 *
 * ```jsx
 * import { Button, Popover } from '@wordpress/components';
 * import { useState } from '@wordpress/element';
 *
 * const MyPopover = () => {
 * 	const [ isVisible, setIsVisible ] = useState( false );
 * 	const toggleVisible = () => {
 * 		setIsVisible( ( state ) => ! state );
 * 	};
 *
 * 	return (
 * 		<Button variant="secondary" onClick={ toggleVisible }>
 * 			Toggle Popover!
 * 			{ isVisible && <Popover>Popover is toggled!</Popover> }
 * 		</Button>
 * 	);
 * };
 * ```
 *
 */
export declare const Popover: import("../context").WordPressComponent<import("react").ElementType<any, keyof import("react").JSX.IntrinsicElements> | null, Omit<WordPressComponentProps<PopoverProps, "div", false>, "onDrag" | "onDragEnd" | "onDragStart" | "onAnimationStart" | "transition" | "inherit" | "initial" | "layout" | "drag" | "custom" | "transformTemplate" | "data-framer-appear-id" | "exit" | "variants" | "onBeforeLayoutMeasure" | "onLayoutMeasure" | "onUpdate" | "onAnimationComplete" | "onPan" | "onPanStart" | "onPanSessionStart" | "onPanEnd" | "onTap" | "onTapStart" | "onTapCancel" | "whileTap" | "globalTapTarget" | "whileHover" | "onHoverStart" | "onHoverEnd" | "whileFocus" | "whileInView" | "onViewportEnter" | "onViewportLeave" | "viewport" | "whileDrag" | "dragDirectionLock" | "dragPropagation" | "dragConstraints" | "dragElastic" | "dragMomentum" | "dragTransition" | "dragControls" | "dragSnapToOrigin" | "dragListener" | "onMeasureDragConstraints" | "_dragX" | "_dragY" | "onDirectionLock" | "onDragTransitionEnd" | "layoutId" | "onLayoutAnimationStart" | "onLayoutAnimationComplete" | "layoutDependency" | "layoutScroll" | "layoutRoot" | "ignoreStrict"> & import("react").RefAttributes<any>, boolean>;
export default Popover;
//# sourceMappingURL=index.d.ts.map