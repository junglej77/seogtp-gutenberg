/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { justifyLeft, justifyCenter, justifyRight, justifySpaceBetween, justifyStretch, arrowRight, arrowDown } from '@wordpress/icons';
import { Button, ToggleControl, Flex, FlexItem, __experimentalToggleGroupControl as ToggleGroupControl, __experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { appendSelectors, getBlockGapCSS } from './utils';
import { getGapCSSValue } from '../hooks/gap';
import { BlockControls, JustifyContentControl, BlockVerticalAlignmentControl } from '../components';
import { shouldSkipSerialization } from '../hooks/utils';
import { LAYOUT_DEFINITIONS } from './definitions';

// Used with the default, horizontal flex orientation.
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const justifyContentMap = {
  left: 'flex-start',
  right: 'flex-end',
  center: 'center',
  'space-between': 'space-between'
};

// Used with the vertical (column) flex orientation.
const alignItemsMap = {
  left: 'flex-start',
  right: 'flex-end',
  center: 'center',
  stretch: 'stretch'
};
const verticalAlignmentMap = {
  top: 'flex-start',
  center: 'center',
  bottom: 'flex-end',
  stretch: 'stretch',
  'space-between': 'space-between'
};
const flexWrapOptions = ['wrap', 'nowrap'];
export default {
  name: 'flex',
  label: __('Flex'),
  inspectorControls: function FlexLayoutInspectorControls({
    layout = {},
    onChange,
    layoutBlockSupport = {}
  }) {
    const {
      allowOrientation = true
    } = layoutBlockSupport;
    return /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsxs(Flex, {
        children: [/*#__PURE__*/_jsx(FlexItem, {
          children: /*#__PURE__*/_jsx(FlexLayoutJustifyContentControl, {
            layout: layout,
            onChange: onChange
          })
        }), /*#__PURE__*/_jsx(FlexItem, {
          children: allowOrientation && /*#__PURE__*/_jsx(OrientationControl, {
            layout: layout,
            onChange: onChange
          })
        })]
      }), /*#__PURE__*/_jsx(FlexWrapControl, {
        layout: layout,
        onChange: onChange
      })]
    });
  },
  toolBarControls: function FlexLayoutToolbarControls({
    layout = {},
    onChange,
    layoutBlockSupport
  }) {
    if (layoutBlockSupport?.allowSwitching) {
      return null;
    }
    const {
      allowVerticalAlignment = true
    } = layoutBlockSupport;
    return /*#__PURE__*/_jsxs(BlockControls, {
      group: "block",
      __experimentalShareWithChildBlocks: true,
      children: [/*#__PURE__*/_jsx(FlexLayoutJustifyContentControl, {
        layout: layout,
        onChange: onChange,
        isToolbar: true
      }), allowVerticalAlignment && /*#__PURE__*/_jsx(FlexLayoutVerticalAlignmentControl, {
        layout: layout,
        onChange: onChange,
        isToolbar: true
      })]
    });
  },
  getLayoutStyle: function getLayoutStyle({
    selector,
    layout,
    style,
    blockName,
    hasBlockGapSupport,
    layoutDefinitions = LAYOUT_DEFINITIONS
  }) {
    const {
      orientation = 'horizontal'
    } = layout;

    // If a block's block.json skips serialization for spacing or spacing.blockGap,
    // don't apply the user-defined value to the styles.
    const blockGapValue = style?.spacing?.blockGap && !shouldSkipSerialization(blockName, 'spacing', 'blockGap') ? getGapCSSValue(style?.spacing?.blockGap, '0.5em') : undefined;
    const justifyContent = justifyContentMap[layout.justifyContent];
    const flexWrap = flexWrapOptions.includes(layout.flexWrap) ? layout.flexWrap : 'wrap';
    const verticalAlignment = verticalAlignmentMap[layout.verticalAlignment];
    const alignItems = alignItemsMap[layout.justifyContent] || alignItemsMap.left;
    let output = '';
    const rules = [];
    if (flexWrap && flexWrap !== 'wrap') {
      rules.push(`flex-wrap: ${flexWrap}`);
    }
    if (orientation === 'horizontal') {
      if (verticalAlignment) {
        rules.push(`align-items: ${verticalAlignment}`);
      }
      if (justifyContent) {
        rules.push(`justify-content: ${justifyContent}`);
      }
    } else {
      if (verticalAlignment) {
        rules.push(`justify-content: ${verticalAlignment}`);
      }
      rules.push('flex-direction: column');
      rules.push(`align-items: ${alignItems}`);
    }
    if (rules.length) {
      output = `${appendSelectors(selector)} {
				${rules.join('; ')};
			}`;
    }

    // Output blockGap styles based on rules contained in layout definitions in theme.json.
    if (hasBlockGapSupport && blockGapValue) {
      output += getBlockGapCSS(selector, layoutDefinitions, 'flex', blockGapValue);
    }
    return output;
  },
  getOrientation(layout) {
    const {
      orientation = 'horizontal'
    } = layout;
    return orientation;
  },
  getAlignments() {
    return [];
  }
};
function FlexLayoutVerticalAlignmentControl({
  layout,
  onChange,
  isToolbar = false
}) {
  const {
    orientation = 'horizontal'
  } = layout;
  const defaultVerticalAlignment = orientation === 'horizontal' ? verticalAlignmentMap.center : verticalAlignmentMap.top;
  const {
    verticalAlignment = defaultVerticalAlignment
  } = layout;
  const onVerticalAlignmentChange = value => {
    onChange({
      ...layout,
      verticalAlignment: value
    });
  };
  if (isToolbar) {
    return /*#__PURE__*/_jsx(BlockVerticalAlignmentControl, {
      onChange: onVerticalAlignmentChange,
      value: verticalAlignment,
      controls: orientation === 'horizontal' ? ['top', 'center', 'bottom', 'stretch'] : ['top', 'center', 'bottom', 'space-between']
    });
  }
  const verticalAlignmentOptions = [{
    value: 'flex-start',
    label: __('Align items top')
  }, {
    value: 'center',
    label: __('Align items center')
  }, {
    value: 'flex-end',
    label: __('Align items bottom')
  }];
  return /*#__PURE__*/_jsxs("fieldset", {
    className: "block-editor-hooks__flex-layout-vertical-alignment-control",
    children: [/*#__PURE__*/_jsx("legend", {
      children: __('Vertical alignment')
    }), /*#__PURE__*/_jsx("div", {
      children: verticalAlignmentOptions.map((value, icon, label) => {
        return /*#__PURE__*/_jsx(Button
        // TODO: Switch to `true` (40px size) if possible
        , {
          __next40pxDefaultSize: false,
          label: label,
          icon: icon,
          isPressed: verticalAlignment === value,
          onClick: () => onVerticalAlignmentChange(value)
        }, value);
      })
    })]
  });
}
const POPOVER_PROPS = {
  placement: 'bottom-start'
};
function FlexLayoutJustifyContentControl({
  layout,
  onChange,
  isToolbar = false
}) {
  const {
    justifyContent = 'left',
    orientation = 'horizontal'
  } = layout;
  const onJustificationChange = value => {
    onChange({
      ...layout,
      justifyContent: value
    });
  };
  const allowedControls = ['left', 'center', 'right'];
  if (orientation === 'horizontal') {
    allowedControls.push('space-between');
  } else {
    allowedControls.push('stretch');
  }
  if (isToolbar) {
    return /*#__PURE__*/_jsx(JustifyContentControl, {
      allowedControls: allowedControls,
      value: justifyContent,
      onChange: onJustificationChange,
      popoverProps: POPOVER_PROPS
    });
  }
  const justificationOptions = [{
    value: 'left',
    icon: justifyLeft,
    label: __('Justify items left')
  }, {
    value: 'center',
    icon: justifyCenter,
    label: __('Justify items center')
  }, {
    value: 'right',
    icon: justifyRight,
    label: __('Justify items right')
  }];
  if (orientation === 'horizontal') {
    justificationOptions.push({
      value: 'space-between',
      icon: justifySpaceBetween,
      label: __('Space between items')
    });
  } else {
    justificationOptions.push({
      value: 'stretch',
      icon: justifyStretch,
      label: __('Stretch items')
    });
  }
  return /*#__PURE__*/_jsx(ToggleGroupControl, {
    __next40pxDefaultSize: true,
    __nextHasNoMarginBottom: true,
    label: __('Justification'),
    value: justifyContent,
    onChange: onJustificationChange,
    className: "block-editor-hooks__flex-layout-justification-controls",
    children: justificationOptions.map(({
      value,
      icon,
      label
    }) => {
      return /*#__PURE__*/_jsx(ToggleGroupControlOptionIcon, {
        value: value,
        icon: icon,
        label: label
      }, value);
    })
  });
}
function FlexWrapControl({
  layout,
  onChange
}) {
  const {
    flexWrap = 'wrap'
  } = layout;
  return /*#__PURE__*/_jsx(ToggleControl, {
    __nextHasNoMarginBottom: true,
    label: __('Allow to wrap to multiple lines'),
    onChange: value => {
      onChange({
        ...layout,
        flexWrap: value ? 'wrap' : 'nowrap'
      });
    },
    checked: flexWrap === 'wrap'
  });
}
function OrientationControl({
  layout,
  onChange
}) {
  const {
    orientation = 'horizontal',
    verticalAlignment,
    justifyContent
  } = layout;
  return /*#__PURE__*/_jsxs(ToggleGroupControl, {
    __next40pxDefaultSize: true,
    __nextHasNoMarginBottom: true,
    className: "block-editor-hooks__flex-layout-orientation-controls",
    label: __('Orientation'),
    value: orientation,
    onChange: value => {
      // Make sure the vertical alignment and justification are compatible with the new orientation.
      let newVerticalAlignment = verticalAlignment;
      let newJustification = justifyContent;
      if (value === 'horizontal') {
        if (verticalAlignment === 'space-between') {
          newVerticalAlignment = 'center';
        }
        if (justifyContent === 'stretch') {
          newJustification = 'left';
        }
      } else {
        if (verticalAlignment === 'stretch') {
          newVerticalAlignment = 'top';
        }
        if (justifyContent === 'space-between') {
          newJustification = 'left';
        }
      }
      return onChange({
        ...layout,
        orientation: value,
        verticalAlignment: newVerticalAlignment,
        justifyContent: newJustification
      });
    },
    children: [/*#__PURE__*/_jsx(ToggleGroupControlOptionIcon, {
      icon: arrowRight,
      value: "horizontal",
      label: __('Horizontal')
    }), /*#__PURE__*/_jsx(ToggleGroupControlOptionIcon, {
      icon: arrowDown,
      value: "vertical",
      label: __('Vertical')
    })]
  });
}
//# sourceMappingURL=flex.js.map