/**
 * External dependencies
 */

/**
 * Internal dependencies
 */

import { hasConnectNamespace, useContextSystem } from '../context';
import { FlexItem, useFlex } from '../flex';
import { getAlignmentProps } from './utils';
import { getValidChildren } from '../utils/get-valid-children';
import { jsx as _jsx } from "react/jsx-runtime";
export function useHStack(props) {
  const {
    alignment = 'edge',
    children,
    direction,
    spacing = 2,
    ...otherProps
  } = useContextSystem(props, 'HStack');
  const align = getAlignmentProps(alignment, direction);
  const validChildren = getValidChildren(children);
  const clonedChildren = validChildren.map((child, index) => {
    const _isSpacer = hasConnectNamespace(child, ['Spacer']);
    if (_isSpacer) {
      const childElement = child;
      const _key = childElement.key || `hstack-${index}`;
      return /*#__PURE__*/_jsx(FlexItem, {
        isBlock: true,
        ...childElement.props
      }, _key);
    }
    return child;
  });
  const propsForFlex = {
    children: clonedChildren,
    direction,
    justify: 'center',
    ...align,
    ...otherProps,
    gap: spacing
  };

  // Omit `isColumn` because it's not used in HStack.
  const {
    isColumn,
    ...flexProps
  } = useFlex(propsForFlex);
  return flexProps;
}
//# sourceMappingURL=hook.js.map