/**
 * WordPress dependencies
 */
import { useMemo } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { applyFormat, removeFormat, getActiveFormat, useAnchor } from '@wordpress/rich-text';
import { ColorPalette, getColorClassName, getColorObjectByColorValue, getColorObjectByAttributeValues, store as blockEditorStore } from '@wordpress/block-editor';
import { Popover, privateApis as componentsPrivateApis } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { textColor as settings, transparentValue } from './index';
import { unlock } from '../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const {
  Tabs
} = unlock(componentsPrivateApis);
const TABS = [{
  name: 'color',
  title: __('Text')
}, {
  name: 'backgroundColor',
  title: __('Background')
}];
function parseCSS(css = '') {
  return css.split(';').reduce((accumulator, rule) => {
    if (rule) {
      const [property, value] = rule.split(':');
      if (property === 'color') {
        accumulator.color = value;
      }
      if (property === 'background-color' && value !== transparentValue) {
        accumulator.backgroundColor = value;
      }
    }
    return accumulator;
  }, {});
}
export function parseClassName(className = '', colorSettings) {
  return className.split(' ').reduce((accumulator, name) => {
    // `colorSlug` could contain dashes, so simply match the start and end.
    if (name.startsWith('has-') && name.endsWith('-color')) {
      const colorSlug = name.replace(/^has-/, '').replace(/-color$/, '');
      const colorObject = getColorObjectByAttributeValues(colorSettings, colorSlug);
      accumulator.color = colorObject.color;
    }
    return accumulator;
  }, {});
}
export function getActiveColors(value, name, colorSettings) {
  const activeColorFormat = getActiveFormat(value, name);
  if (!activeColorFormat) {
    return {};
  }
  return {
    ...parseCSS(activeColorFormat.attributes.style),
    ...parseClassName(activeColorFormat.attributes.class, colorSettings)
  };
}
function setColors(value, name, colorSettings, colors) {
  const {
    color,
    backgroundColor
  } = {
    ...getActiveColors(value, name, colorSettings),
    ...colors
  };
  if (!color && !backgroundColor) {
    return removeFormat(value, name);
  }
  const styles = [];
  const classNames = [];
  const attributes = {};
  if (backgroundColor) {
    styles.push(['background-color', backgroundColor].join(':'));
  } else {
    // Override default browser color for mark element.
    styles.push(['background-color', transparentValue].join(':'));
  }
  if (color) {
    const colorObject = getColorObjectByColorValue(colorSettings, color);
    if (colorObject) {
      classNames.push(getColorClassName('color', colorObject.slug));
    } else {
      styles.push(['color', color].join(':'));
    }
  }
  if (styles.length) {
    attributes.style = styles.join(';');
  }
  if (classNames.length) {
    attributes.class = classNames.join(' ');
  }
  return applyFormat(value, {
    type: name,
    attributes
  });
}
function ColorPicker({
  name,
  property,
  value,
  onChange
}) {
  const colors = useSelect(select => {
    var _getSettings$colors;
    const {
      getSettings
    } = select(blockEditorStore);
    return (_getSettings$colors = getSettings().colors) !== null && _getSettings$colors !== void 0 ? _getSettings$colors : [];
  }, []);
  const activeColors = useMemo(() => getActiveColors(value, name, colors), [name, value, colors]);
  return /*#__PURE__*/_jsx(ColorPalette, {
    value: activeColors[property],
    onChange: color => {
      onChange(setColors(value, name, colors, {
        [property]: color
      }));
    }
  });
}
export default function InlineColorUI({
  name,
  value,
  onChange,
  onClose,
  contentRef,
  isActive
}) {
  const popoverAnchor = useAnchor({
    editableContentElement: contentRef.current,
    settings: {
      ...settings,
      isActive
    }
  });
  return /*#__PURE__*/_jsx(Popover, {
    onClose: onClose,
    className: "format-library__inline-color-popover",
    anchor: popoverAnchor,
    children: /*#__PURE__*/_jsxs(Tabs, {
      children: [/*#__PURE__*/_jsx(Tabs.TabList, {
        children: TABS.map(tab => /*#__PURE__*/_jsx(Tabs.Tab, {
          tabId: tab.name,
          children: tab.title
        }, tab.name))
      }), TABS.map(tab => /*#__PURE__*/_jsx(Tabs.TabPanel, {
        tabId: tab.name,
        focusable: false,
        children: /*#__PURE__*/_jsx(ColorPicker, {
          name: name,
          property: tab.name,
          value: value,
          onChange: onChange
        })
      }, tab.name))]
    })
  });
}
//# sourceMappingURL=inline.js.map