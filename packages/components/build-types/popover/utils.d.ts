/**
 * External dependencies
 */
import type { MotionProps } from 'framer-motion';
import type { Placement, ReferenceType } from '@floating-ui/react-dom';
/**
 * Internal dependencies
 */
import type { PopoverProps } from './types';
/**
 * Converts the `Popover`'s legacy "position" prop to the new "placement" prop
 * (used by `floating-ui`).
 *
 * @param position The legacy position
 * @return The corresponding placement
 */
export declare const positionToPlacement: (position: NonNullable<PopoverProps["position"]>) => Placement;
/**
 * Given the floating-ui `placement`, compute the framer-motion props for the
 * popover's entry animation.
 *
 * @param placement A placement string from floating ui
 * @return The object containing the motion props
 */
export declare const placementToMotionAnimationProps: (placement: NonNullable<PopoverProps["placement"]>) => MotionProps;
export declare const getReferenceElement: ({ anchor, anchorRef, anchorRect, getAnchorRect, fallbackReferenceElement, }: Pick<PopoverProps, "anchorRef" | "anchorRect" | "getAnchorRect" | "anchor"> & {
    fallbackReferenceElement: Element | null;
}) => ReferenceType | null;
/**
 * Computes the final coordinate that needs to be applied to the floating
 * element when applying transform inline styles, defaulting to `undefined`
 * if the provided value is `null` or `NaN`.
 *
 * @param c input coordinate (usually as returned from floating-ui)
 * @return The coordinate's value to be used for inline styles. An `undefined`
 *         return value means "no style set" for this coordinate.
 */
export declare const computePopoverPosition: (c: number | null) => number | undefined;
//# sourceMappingURL=utils.d.ts.map