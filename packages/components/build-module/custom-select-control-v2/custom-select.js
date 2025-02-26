/**
 * External dependencies
 */
import * as Ariakit from '@ariakit/react';
import { useStoreState } from '@ariakit/react';

/**
 * WordPress dependencies
 */
import { createContext, useCallback, useMemo } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { VisuallyHidden } from '..';
import * as Styled from './styles';
import InputBase from '../input-control/input-base';
import SelectControlChevronDown from '../select-control/chevron-down';
import BaseControl from '../base-control';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export const CustomSelectContext = createContext(undefined);
function defaultRenderSelectedValue(value) {
  const isValueEmpty = Array.isArray(value) ? value.length === 0 : value === undefined || value === null;
  if (isValueEmpty) {
    return __('Select an item');
  }
  if (Array.isArray(value)) {
    return value.length === 1 ? value[0] :
    // translators: %s: number of items selected (it will always be 2 or more items)
    sprintf(__('%s items selected'), value.length);
  }
  return value;
}
const CustomSelectButton = ({
  renderSelectedValue,
  size = 'default',
  store,
  ...restProps
}) => {
  const {
    value: currentValue
  } = useStoreState(store);
  const computedRenderSelectedValue = useMemo(() => renderSelectedValue !== null && renderSelectedValue !== void 0 ? renderSelectedValue : defaultRenderSelectedValue, [renderSelectedValue]);
  return /*#__PURE__*/_jsx(Styled.Select, {
    ...restProps,
    size: size,
    hasCustomRenderProp: !!renderSelectedValue,
    store: store,
    children: computedRenderSelectedValue(currentValue)
  });
};
function _CustomSelect(props) {
  const {
    children,
    hideLabelFromVision = false,
    label,
    size,
    store,
    className,
    isLegacy = false,
    ...restProps
  } = props;
  const onSelectPopoverKeyDown = useCallback(e => {
    if (isLegacy) {
      e.stopPropagation();
    }
  }, [isLegacy]);
  const contextValue = useMemo(() => ({
    store,
    size
  }), [store, size]);
  return (
    /*#__PURE__*/
    // Where should `restProps` be forwarded to?
    _jsxs("div", {
      className: className,
      children: [/*#__PURE__*/_jsx(Ariakit.SelectLabel, {
        store: store,
        render: hideLabelFromVision ?
        /*#__PURE__*/
        // @ts-expect-error `children` are passed via the render prop
        _jsx(VisuallyHidden, {}) :
        /*#__PURE__*/
        // @ts-expect-error `children` are passed via the render prop
        _jsx(BaseControl.VisualLabel, {
          as: "div"
        }),
        children: label
      }), /*#__PURE__*/_jsxs(InputBase, {
        __next40pxDefaultSize: true,
        size: size,
        suffix: /*#__PURE__*/_jsx(SelectControlChevronDown, {}),
        children: [/*#__PURE__*/_jsx(CustomSelectButton, {
          ...restProps,
          size: size,
          store: store
          // Match legacy behavior (move selection rather than open the popover)
          ,
          showOnKeyDown: !isLegacy
        }), /*#__PURE__*/_jsx(Styled.SelectPopover, {
          gutter: 12,
          store: store,
          sameWidth: true,
          slide: false,
          onKeyDown: onSelectPopoverKeyDown
          // Match legacy behavior
          ,
          flip: !isLegacy,
          children: /*#__PURE__*/_jsx(CustomSelectContext.Provider, {
            value: contextValue,
            children: children
          })
        })]
      })]
    })
  );
}
export default _CustomSelect;
//# sourceMappingURL=custom-select.js.map