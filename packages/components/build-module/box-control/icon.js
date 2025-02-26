/**
 * Internal dependencies
 */

import { Root, Viewbox, TopStroke, RightStroke, BottomStroke, LeftStroke } from './styles/box-control-icon-styles';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const BASE_ICON_SIZE = 24;
export default function BoxControlIcon({
  size = 24,
  side = 'all',
  sides,
  ...props
}) {
  const isSideDisabled = value => sides?.length && !sides.includes(value);
  const hasSide = value => {
    if (isSideDisabled(value)) {
      return false;
    }
    return side === 'all' || side === value;
  };
  const top = hasSide('top') || hasSide('vertical');
  const right = hasSide('right') || hasSide('horizontal');
  const bottom = hasSide('bottom') || hasSide('vertical');
  const left = hasSide('left') || hasSide('horizontal');

  // Simulates SVG Icon scaling.
  const scale = size / BASE_ICON_SIZE;
  return /*#__PURE__*/_jsx(Root, {
    style: {
      transform: `scale(${scale})`
    },
    ...props,
    children: /*#__PURE__*/_jsxs(Viewbox, {
      children: [/*#__PURE__*/_jsx(TopStroke, {
        isFocused: top
      }), /*#__PURE__*/_jsx(RightStroke, {
        isFocused: right
      }), /*#__PURE__*/_jsx(BottomStroke, {
        isFocused: bottom
      }), /*#__PURE__*/_jsx(LeftStroke, {
        isFocused: left
      })]
    })
  });
}
//# sourceMappingURL=icon.js.map