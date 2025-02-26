/**
 * WordPress dependencies
 */
import { useContext } from '@wordpress/element';
import { Icon, check } from '@wordpress/icons';
/**
 * Internal dependencies
 */

import * as Styled from './styles';
import { CustomSelectContext } from './custom-select';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function CustomSelectItem({
  children,
  ...props
}) {
  var _customSelectContext$;
  const customSelectContext = useContext(CustomSelectContext);
  return /*#__PURE__*/_jsxs(Styled.SelectItem, {
    store: customSelectContext?.store,
    size: (_customSelectContext$ = customSelectContext?.size) !== null && _customSelectContext$ !== void 0 ? _customSelectContext$ : 'default',
    ...props,
    children: [children !== null && children !== void 0 ? children : props.value, /*#__PURE__*/_jsx(Styled.SelectedItemCheck, {
      children: /*#__PURE__*/_jsx(Icon, {
        icon: check
      })
    })]
  });
}
CustomSelectItem.displayName = 'CustomSelectControlV2.Item';
export default CustomSelectItem;
//# sourceMappingURL=item.js.map