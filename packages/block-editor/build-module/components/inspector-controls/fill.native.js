/**
 * External dependencies
 */
import { View } from 'react-native';

/**
 * WordPress dependencies
 */
import { Children } from '@wordpress/element';
import { BottomSheetConsumer } from '@wordpress/components';
import warning from '@wordpress/warning';
import deprecated from '@wordpress/deprecated';

/**
 * Internal dependencies
 */
import groups from './groups';
import { useBlockEditContext, mayDisplayControlsKey } from '../block-edit/context';
import { BlockSettingsButton } from '../block-settings';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function InspectorControlsFill({
  children,
  group = 'default',
  __experimentalGroup,
  ...props
}) {
  if (__experimentalGroup) {
    deprecated('`__experimentalGroup` property in `InspectorControlsFill`', {
      since: '6.2',
      version: '6.4',
      alternative: '`group`'
    });
    group = __experimentalGroup;
  }
  const context = useBlockEditContext();
  const Fill = groups[group]?.Fill;
  if (!Fill) {
    globalThis.SCRIPT_DEBUG === true ? warning(`Unknown InspectorControls group "${group}" provided.`) : void 0;
    return null;
  }
  if (!context[mayDisplayControlsKey]) {
    return null;
  }
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Fill, {
      ...props,
      children: /*#__PURE__*/_jsx(BottomSheetConsumer, {
        children: () => /*#__PURE__*/_jsx(View, {
          children: children
        })
      })
    }), Children.count(children) > 0 && /*#__PURE__*/_jsx(BlockSettingsButton, {})]
  });
}
//# sourceMappingURL=fill.native.js.map