/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { isValidElement } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { getValidChildren } from '../utils/get-valid-children';
import { contextConnect, useContextSystem } from '../context';
import { ZStackView, ZStackChildView } from './styles';
import { jsx as _jsx } from "react/jsx-runtime";
function UnconnectedZStack(props, forwardedRef) {
  const {
    children,
    className,
    isLayered = true,
    isReversed = false,
    offset = 0,
    ...otherProps
  } = useContextSystem(props, 'ZStack');
  const validChildren = getValidChildren(children);
  const childrenLastIndex = validChildren.length - 1;
  const clonedChildren = validChildren.map((child, index) => {
    const zIndex = isReversed ? childrenLastIndex - index : index;
    // Only when the component is layered, the offset needs to be multiplied by
    // the item's index, so that items can correctly stack at the right distance
    const offsetAmount = isLayered ? offset * index : offset;
    const key = isValidElement(child) ? child.key : index;
    return /*#__PURE__*/_jsx(ZStackChildView, {
      offsetAmount: offsetAmount,
      zIndex: zIndex,
      children: child
    }, key);
  });
  return /*#__PURE__*/_jsx(ZStackView, {
    ...otherProps,
    className: className,
    isLayered: isLayered,
    ref: forwardedRef,
    children: clonedChildren
  });
}

/**
 * `ZStack` allows you to stack things along the Z-axis.
 *
 * ```jsx
 * import { __experimentalZStack as ZStack } from '@wordpress/components';
 *
 * function Example() {
 *   return (
 *     <ZStack offset={ 20 } isLayered>
 *       <ExampleImage />
 *       <ExampleImage />
 *       <ExampleImage />
 *     </ZStack>
 *   );
 * }
 * ```
 */
export const ZStack = contextConnect(UnconnectedZStack, 'ZStack');
export default ZStack;
//# sourceMappingURL=component.js.map