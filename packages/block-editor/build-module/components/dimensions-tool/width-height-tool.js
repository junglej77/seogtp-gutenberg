import _styled from "@emotion/styled/base";
function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { __experimentalToolsPanelItem as ToolsPanelItem, __experimentalUnitControl as UnitControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const SingleColumnToolsPanelItem = /*#__PURE__*/_styled(ToolsPanelItem, process.env.NODE_ENV === "production" ? {
  target: "ef8pe3d0"
} : {
  target: "ef8pe3d0",
  label: "SingleColumnToolsPanelItem"
})(process.env.NODE_ENV === "production" ? {
  name: "957xgf",
  styles: "grid-column:span 1"
} : {
  name: "957xgf",
  styles: "grid-column:span 1",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkB3b3JkcHJlc3MvYmxvY2stZWRpdG9yL3NyYy9jb21wb25lbnRzL2RpbWVuc2lvbnMtdG9vbC93aWR0aC1oZWlnaHQtdG9vbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFjMkQiLCJmaWxlIjoiQHdvcmRwcmVzcy9ibG9jay1lZGl0b3Ivc3JjL2NvbXBvbmVudHMvZGltZW5zaW9ucy10b29sL3dpZHRoLWhlaWdodC10b29sLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xyXG4gKi9cclxuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xyXG5cclxuLyoqXHJcbiAqIFdvcmRQcmVzcyBkZXBlbmRlbmNpZXNcclxuICovXHJcbmltcG9ydCB7XHJcblx0X19leHBlcmltZW50YWxUb29sc1BhbmVsSXRlbSBhcyBUb29sc1BhbmVsSXRlbSxcclxuXHRfX2V4cGVyaW1lbnRhbFVuaXRDb250cm9sIGFzIFVuaXRDb250cm9sLFxyXG59IGZyb20gJ0B3b3JkcHJlc3MvY29tcG9uZW50cyc7XHJcbmltcG9ydCB7IF9fIH0gZnJvbSAnQHdvcmRwcmVzcy9pMThuJztcclxuXHJcbmNvbnN0IFNpbmdsZUNvbHVtblRvb2xzUGFuZWxJdGVtID0gc3R5bGVkKCBUb29sc1BhbmVsSXRlbSApYFxyXG5cdGdyaWQtY29sdW1uOiBzcGFuIDE7XHJcbmA7XHJcblxyXG4vKipcclxuICogQHR5cGVkZWYge2ltcG9ydCgnQHdvcmRwcmVzcy9jb21wb25lbnRzL2J1aWxkLXR5cGVzL3VuaXQtY29udHJvbC90eXBlcycpLldQVW5pdENvbnRyb2xVbml0fSBXUFVuaXRDb250cm9sVW5pdFxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBXaWR0aEhlaWdodFRvb2xWYWx1ZVxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW3dpZHRoXSAgV2lkdGggQ1NTIHZhbHVlLlxyXG4gKiBAcHJvcGVydHkge3N0cmluZ30gW2hlaWdodF0gSGVpZ2h0IENTUyB2YWx1ZS5cclxuICovXHJcblxyXG4vKipcclxuICogQGNhbGxiYWNrIFdpZHRoSGVpZ2h0VG9vbE9uQ2hhbmdlXHJcbiAqIEBwYXJhbSB7V2lkdGhIZWlnaHRUb29sVmFsdWV9IG5leHRWYWx1ZSBOZXh0IGRpbWVuc2lvbnMgdmFsdWUuXHJcbiAqIEByZXR1cm4ge3ZvaWR9XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFdpZHRoSGVpZ2h0VG9vbFByb3BzXHJcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSAgICAgICAgICAgICAgICAgIFtwYW5lbElkXSAgICAgICAgICBJRCBvZiB0aGUgcGFuZWwgdGhhdCBjb250YWlucyB0aGUgY29udHJvbHMuXHJcbiAqIEBwcm9wZXJ0eSB7V2lkdGhIZWlnaHRUb29sVmFsdWV9ICAgIFt2YWx1ZV0gICAgICAgICAgICBDdXJyZW50IGRpbWVuc2lvbnMgdmFsdWVzLlxyXG4gKiBAcHJvcGVydHkge1dpZHRoSGVpZ2h0VG9vbE9uQ2hhbmdlfSBbb25DaGFuZ2VdICAgICAgICAgQ2FsbGJhY2sgdG8gdXBkYXRlIHRoZSBkaW1lbnNpb25zIHZhbHVlcy5cclxuICogQHByb3BlcnR5IHtXUFVuaXRDb250cm9sVW5pdFtdfSAgICAgW3VuaXRzXSAgICAgICAgICAgIFVuaXRzIG9wdGlvbnMuXHJcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gICAgICAgICAgICAgICAgIFtpc1Nob3duQnlEZWZhdWx0XSBXaGV0aGVyIHRoZSBwYW5lbCBpcyBzaG93biBieSBkZWZhdWx0LlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBDb21wb25lbnQgdGhhdCByZW5kZXJzIGNvbnRyb2xzIHRvIGVkaXQgdGhlIGRpbWVuc2lvbnMgb2YgYW4gaW1hZ2Ugb3IgY29udGFpbmVyLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1dpZHRoSGVpZ2h0VG9vbFByb3BzfSBwcm9wcyBUaGUgY29tcG9uZW50IHByb3BzLlxyXG4gKlxyXG4gKiBAcmV0dXJuIHtpbXBvcnQoJ3JlYWN0JykuUmVhY3RFbGVtZW50fSBUaGUgd2lkdGggYW5kIGhlaWdodCB0b29sLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gV2lkdGhIZWlnaHRUb29sKCB7XHJcblx0cGFuZWxJZCxcclxuXHR2YWx1ZSA9IHt9LFxyXG5cdG9uQ2hhbmdlID0gKCkgPT4ge30sXHJcblx0dW5pdHMsXHJcblx0aXNTaG93bkJ5RGVmYXVsdCA9IHRydWUsXHJcbn0gKSB7XHJcblx0Ly8gbnVsbCwgdW5kZWZpbmVkLCBhbmQgJ2F1dG8nIGFsbCByZXByZXNlbnQgdGhlIGRlZmF1bHQgdmFsdWUuXHJcblx0Y29uc3Qgd2lkdGggPSB2YWx1ZS53aWR0aCA9PT0gJ2F1dG8nID8gJycgOiB2YWx1ZS53aWR0aCA/PyAnJztcclxuXHRjb25zdCBoZWlnaHQgPSB2YWx1ZS5oZWlnaHQgPT09ICdhdXRvJyA/ICcnIDogdmFsdWUuaGVpZ2h0ID8/ICcnO1xyXG5cclxuXHRjb25zdCBvbkRpbWVuc2lvbkNoYW5nZSA9ICggZGltZW5zaW9uICkgPT4gKCBuZXh0RGltZW5zaW9uICkgPT4ge1xyXG5cdFx0Y29uc3QgbmV4dFZhbHVlID0geyAuLi52YWx1ZSB9O1xyXG5cdFx0Ly8gRW1wdHkgc3RyaW5ncyBvciB1bmRlZmluZWQgbWF5IGJlIHBhc3NlZCBhbmQgYm90aCByZXByZXNlbnQgcmVtb3ZpbmcgdGhlIHZhbHVlLlxyXG5cdFx0aWYgKCAhIG5leHREaW1lbnNpb24gKSB7XHJcblx0XHRcdGRlbGV0ZSBuZXh0VmFsdWVbIGRpbWVuc2lvbiBdO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bmV4dFZhbHVlWyBkaW1lbnNpb24gXSA9IG5leHREaW1lbnNpb247XHJcblx0XHR9XHJcblx0XHRvbkNoYW5nZSggbmV4dFZhbHVlICk7XHJcblx0fTtcclxuXHJcblx0cmV0dXJuIChcclxuXHRcdDw+XHJcblx0XHRcdDxTaW5nbGVDb2x1bW5Ub29sc1BhbmVsSXRlbVxyXG5cdFx0XHRcdGxhYmVsPXsgX18oICdXaWR0aCcgKSB9XHJcblx0XHRcdFx0aXNTaG93bkJ5RGVmYXVsdD17IGlzU2hvd25CeURlZmF1bHQgfVxyXG5cdFx0XHRcdGhhc1ZhbHVlPXsgKCkgPT4gd2lkdGggIT09ICcnIH1cclxuXHRcdFx0XHRvbkRlc2VsZWN0PXsgb25EaW1lbnNpb25DaGFuZ2UoICd3aWR0aCcgKSB9XHJcblx0XHRcdFx0cGFuZWxJZD17IHBhbmVsSWQgfVxyXG5cdFx0XHQ+XHJcblx0XHRcdFx0PFVuaXRDb250cm9sXHJcblx0XHRcdFx0XHRsYWJlbD17IF9fKCAnV2lkdGgnICkgfVxyXG5cdFx0XHRcdFx0cGxhY2Vob2xkZXI9eyBfXyggJ0F1dG8nICkgfVxyXG5cdFx0XHRcdFx0bGFiZWxQb3NpdGlvbj1cInRvcFwiXHJcblx0XHRcdFx0XHR1bml0cz17IHVuaXRzIH1cclxuXHRcdFx0XHRcdG1pbj17IDAgfVxyXG5cdFx0XHRcdFx0dmFsdWU9eyB3aWR0aCB9XHJcblx0XHRcdFx0XHRvbkNoYW5nZT17IG9uRGltZW5zaW9uQ2hhbmdlKCAnd2lkdGgnICkgfVxyXG5cdFx0XHRcdFx0c2l6ZT1cIl9fdW5zdGFibGUtbGFyZ2VcIlxyXG5cdFx0XHRcdC8+XHJcblx0XHRcdDwvU2luZ2xlQ29sdW1uVG9vbHNQYW5lbEl0ZW0+XHJcblx0XHRcdDxTaW5nbGVDb2x1bW5Ub29sc1BhbmVsSXRlbVxyXG5cdFx0XHRcdGxhYmVsPXsgX18oICdIZWlnaHQnICkgfVxyXG5cdFx0XHRcdGlzU2hvd25CeURlZmF1bHQ9eyBpc1Nob3duQnlEZWZhdWx0IH1cclxuXHRcdFx0XHRoYXNWYWx1ZT17ICgpID0+IGhlaWdodCAhPT0gJycgfVxyXG5cdFx0XHRcdG9uRGVzZWxlY3Q9eyBvbkRpbWVuc2lvbkNoYW5nZSggJ2hlaWdodCcgKSB9XHJcblx0XHRcdFx0cGFuZWxJZD17IHBhbmVsSWQgfVxyXG5cdFx0XHQ+XHJcblx0XHRcdFx0PFVuaXRDb250cm9sXHJcblx0XHRcdFx0XHRsYWJlbD17IF9fKCAnSGVpZ2h0JyApIH1cclxuXHRcdFx0XHRcdHBsYWNlaG9sZGVyPXsgX18oICdBdXRvJyApIH1cclxuXHRcdFx0XHRcdGxhYmVsUG9zaXRpb249XCJ0b3BcIlxyXG5cdFx0XHRcdFx0dW5pdHM9eyB1bml0cyB9XHJcblx0XHRcdFx0XHRtaW49eyAwIH1cclxuXHRcdFx0XHRcdHZhbHVlPXsgaGVpZ2h0IH1cclxuXHRcdFx0XHRcdG9uQ2hhbmdlPXsgb25EaW1lbnNpb25DaGFuZ2UoICdoZWlnaHQnICkgfVxyXG5cdFx0XHRcdFx0c2l6ZT1cIl9fdW5zdGFibGUtbGFyZ2VcIlxyXG5cdFx0XHRcdC8+XHJcblx0XHRcdDwvU2luZ2xlQ29sdW1uVG9vbHNQYW5lbEl0ZW0+XHJcblx0XHQ8Lz5cclxuXHQpO1xyXG59XHJcbiJdfQ== */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
});

/**
 * @typedef {import('@wordpress/components/build-types/unit-control/types').WPUnitControlUnit} WPUnitControlUnit
 */

/**
 * @typedef {Object} WidthHeightToolValue
 * @property {string} [width]  Width CSS value.
 * @property {string} [height] Height CSS value.
 */

/**
 * @callback WidthHeightToolOnChange
 * @param {WidthHeightToolValue} nextValue Next dimensions value.
 * @return {void}
 */

/**
 * @typedef {Object} WidthHeightToolProps
 * @property {string}                  [panelId]          ID of the panel that contains the controls.
 * @property {WidthHeightToolValue}    [value]            Current dimensions values.
 * @property {WidthHeightToolOnChange} [onChange]         Callback to update the dimensions values.
 * @property {WPUnitControlUnit[]}     [units]            Units options.
 * @property {boolean}                 [isShownByDefault] Whether the panel is shown by default.
 */

/**
 * Component that renders controls to edit the dimensions of an image or container.
 *
 * @param {WidthHeightToolProps} props The component props.
 *
 * @return {import('react').ReactElement} The width and height tool.
 */
export default function WidthHeightTool({
  panelId,
  value = {},
  onChange = () => {},
  units,
  isShownByDefault = true
}) {
  var _value$width, _value$height;
  // null, undefined, and 'auto' all represent the default value.
  const width = value.width === 'auto' ? '' : (_value$width = value.width) !== null && _value$width !== void 0 ? _value$width : '';
  const height = value.height === 'auto' ? '' : (_value$height = value.height) !== null && _value$height !== void 0 ? _value$height : '';
  const onDimensionChange = dimension => nextDimension => {
    const nextValue = {
      ...value
    };
    // Empty strings or undefined may be passed and both represent removing the value.
    if (!nextDimension) {
      delete nextValue[dimension];
    } else {
      nextValue[dimension] = nextDimension;
    }
    onChange(nextValue);
  };
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(SingleColumnToolsPanelItem, {
      label: __('Width'),
      isShownByDefault: isShownByDefault,
      hasValue: () => width !== '',
      onDeselect: onDimensionChange('width'),
      panelId: panelId,
      children: /*#__PURE__*/_jsx(UnitControl, {
        label: __('Width'),
        placeholder: __('Auto'),
        labelPosition: "top",
        units: units,
        min: 0,
        value: width,
        onChange: onDimensionChange('width'),
        size: "__unstable-large"
      })
    }), /*#__PURE__*/_jsx(SingleColumnToolsPanelItem, {
      label: __('Height'),
      isShownByDefault: isShownByDefault,
      hasValue: () => height !== '',
      onDeselect: onDimensionChange('height'),
      panelId: panelId,
      children: /*#__PURE__*/_jsx(UnitControl, {
        label: __('Height'),
        placeholder: __('Auto'),
        labelPosition: "top",
        units: units,
        min: 0,
        value: height,
        onChange: onDimensionChange('height'),
        size: "__unstable-large"
      })
    })]
  });
}
//# sourceMappingURL=width-height-tool.js.map