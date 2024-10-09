/**
 * WordPress dependencies
 */
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';
import { jsx as _jsx } from "react/jsx-runtime";
const {
  wp
} = window;
const withWideWidgetDisplay = createHigherOrderComponent(BlockEdit => props => {
  var _wp$customize$Widgets;
  const {
    idBase
  } = props.attributes;
  const isWide = (_wp$customize$Widgets = wp.customize.Widgets.data.availableWidgets.find(widget => widget.id_base === idBase)?.is_wide) !== null && _wp$customize$Widgets !== void 0 ? _wp$customize$Widgets : false;
  return /*#__PURE__*/_jsx(BlockEdit, {
    ...props,
    isWide: isWide
  }, "edit");
}, 'withWideWidgetDisplay');
addFilter('editor.BlockEdit', 'core/customize-widgets/wide-widget-display', withWideWidgetDisplay);
//# sourceMappingURL=wide-widget-display.js.map