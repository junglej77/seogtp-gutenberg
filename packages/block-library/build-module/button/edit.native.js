/**
 * External dependencies
 */
import { View, AccessibilityInfo, Platform, Text } from 'react-native';

/**
 * WordPress dependencies
 */
import { useCallback, useEffect, useState, useRef } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { __, _x } from '@wordpress/i18n';
import { RichText, InspectorControls, BlockControls, store as blockEditorStore, getColorObjectByAttributeValues, getGradientValueBySlug, __experimentalGetColorClassesAndStyles as getColorClassesAndStyles, useMobileGlobalStylesColors } from '@wordpress/block-editor';
import { PanelBody, ToolbarGroup, ToolbarButton, LinkSettingsNavigation, UnitControl, getValueAndUnit, BottomSheetSelectControl, CSS_UNITS, filterUnitsWithSettings } from '@wordpress/components';
import { link } from '@wordpress/icons';
// eslint-disable-next-line no-restricted-imports
import { store as editPostStore } from '@wordpress/edit-post';

/**
 * Internal dependencies
 */
import richTextStyle from './rich-text.scss';
import styles from './editor.scss';
import ColorBackground from './color-background';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const MIN_BORDER_RADIUS_VALUE = 0;
const MAX_BORDER_RADIUS_VALUE = 50;
const INITIAL_MAX_WIDTH = 108;
const MIN_WIDTH = 40;
// Map of the percentage width to pixel subtraction that make the buttons fit nicely into columns.
const MIN_WIDTH_MARGINS = {
  100: 0,
  75: styles.button75?.marginLeft,
  50: styles.button50?.marginLeft,
  25: styles.button25?.marginLeft
};
function WidthPanel({
  selectedWidth,
  setAttributes
}) {
  function handleChange(newWidth) {
    // Check if we are toggling the width off
    let width = selectedWidth === newWidth ? undefined : newWidth;
    if (newWidth === 'auto') {
      width = undefined;
    }
    // Update attributes.
    setAttributes({
      width
    });
  }
  const options = [{
    value: 'auto',
    label: __('Auto')
  }, {
    value: 25,
    label: '25%'
  }, {
    value: 50,
    label: '50%'
  }, {
    value: 75,
    label: '75%'
  }, {
    value: 100,
    label: '100%'
  }];
  if (!selectedWidth) {
    selectedWidth = 'auto';
  }
  return /*#__PURE__*/_jsx(PanelBody, {
    title: __('Width Settings'),
    children: /*#__PURE__*/_jsx(BottomSheetSelectControl, {
      label: __('Button width'),
      value: selectedWidth,
      onChange: handleChange,
      options: options
    })
  });
}
function ButtonEdit(props) {
  const {
    isSelected,
    parentWidth
  } = props;
  const initialBorderRadius = props?.attributes?.style?.border?.radius;
  const {
    valueUnit = 'px'
  } = getValueAndUnit(initialBorderRadius) || {};
  const {
    editorSidebarOpened,
    numOfButtons
  } = useSelect(select => {
    const {
      isEditorSidebarOpened
    } = select(editPostStore);
    const {
      getBlockCount,
      getBlockRootClientId
    } = select(blockEditorStore);
    const parentId = getBlockRootClientId(clientId);
    const blockCount = getBlockCount(parentId);
    const currentIsEditorSidebarOpened = isEditorSidebarOpened();
    return {
      editorSidebarOpened: isSelected && currentIsEditorSidebarOpened,
      numOfButtons: blockCount
    };
  }, [clientId, isSelected]);
  const {
    closeGeneralSidebar
  } = useDispatch(editPostStore);
  const [maxWidth, setMaxWidth] = useState(INITIAL_MAX_WIDTH);
  const [isLinkSheetVisible, setIsLinkSheetVisible] = useState(false);
  const [isButtonFocused, setIsButtonFocused] = useState(true);
  const [placeholderTextWidth, setPlaceholderTextWidth] = useState(0);
  const [borderRadiusUnit, setBorderRadiusUnit] = useState(valueUnit);
  const richTextRef = useRef();
  const colors = useMobileGlobalStylesColors();
  const gradients = useMobileGlobalStylesColors('gradients');
  useEffect(() => {
    if (isSelected) {
      onToggleButtonFocus(true);
    }
  }, [isSelected]);
  useEffect(() => {
    onSetMaxWidth(null, true);
  }, [parentWidth]);
  useEffect(() => {
    // Blur `RichText` on Android when link settings sheet or button settings sheet is opened,
    // to avoid flashing caret after closing one of them
    const richText = richTextRef?.current;
    if (Platform.OS === 'android' && richText) {
      if (editorSidebarOpened || isLinkSheetVisible) {
        richText.blur();
        onToggleButtonFocus(false);
      } else {
        onToggleButtonFocus(true);
      }
    }
  }, [editorSidebarOpened, isLinkSheetVisible]);
  useEffect(() => {
    if (richTextRef?.current) {
      if (!isSelected && isButtonFocused) {
        onToggleButtonFocus(false);
      }
      if (isSelected && !isButtonFocused) {
        AccessibilityInfo.isScreenReaderEnabled().then(enabled => {
          if (enabled) {
            onToggleButtonFocus(true);
            richTextRef?.current.focus();
          }
        });
      }
    }
  }, [isSelected, isButtonFocused]);
  const linkSettingsActions = [{
    label: __('Remove link'),
    onPress: onClearSettings
  }];
  const linkSettingsOptions = {
    url: {
      label: __('Button Link URL'),
      placeholder: __('Add URL'),
      autoFocus: true,
      autoFill: false
    },
    openInNewTab: {
      label: __('Open in new tab')
    },
    linkRel: {
      label: __('Link Rel'),
      placeholder: _x('None', 'Link rel attribute value placeholder')
    }
  };
  const noFocusLinkSettingOptions = {
    ...linkSettingsOptions,
    url: {
      ...linkSettingsOptions.url,
      autoFocus: false
    }
  };
  function getBackgroundColor() {
    const {
      attributes,
      style
    } = props;
    const {
      backgroundColor,
      gradient
    } = attributes;

    // Return named gradient value if available.
    const gradientValue = getGradientValueBySlug(gradients, gradient);
    if (gradientValue) {
      return gradientValue;
    }
    const colorProps = getColorClassesAndStyles(attributes);

    // Retrieve named color object to force inline styles for themes that
    // do not load their color stylesheets in the editor.
    const colorObject = getColorObjectByAttributeValues(colors, backgroundColor);
    return colorObject?.color || colorProps.style?.backgroundColor || colorProps.style?.background || style?.backgroundColor || styles.defaultButton.backgroundColor;
  }
  function getTextColor() {
    const {
      attributes,
      style
    } = props;
    const colorProps = getColorClassesAndStyles(attributes);

    // Retrieve named color object to force inline styles for themes that
    // do not load their color stylesheets in the editor.
    const colorObject = getColorObjectByAttributeValues(colors, attributes.textColor);
    return colorObject?.color || colorProps.style?.color || style?.color || styles.defaultButton.color;
  }
  function onChangeText(value) {
    const {
      setAttributes
    } = props;
    setAttributes({
      text: value
    });
  }
  function onChangeBorderRadius(newRadius) {
    const {
      setAttributes,
      attributes
    } = props;
    const {
      style
    } = attributes;
    const newStyle = getNewStyle(style, newRadius, borderRadiusUnit);
    setAttributes({
      style: newStyle
    });
  }
  function onChangeBorderRadiusUnit(newRadiusUnit) {
    const {
      setAttributes,
      attributes
    } = props;
    const {
      style
    } = attributes;
    const newBorderRadius = getBorderRadiusValue(attributes?.style?.border?.radius);
    const newStyle = getNewStyle(style, newBorderRadius, newRadiusUnit);
    setAttributes({
      style: newStyle
    });
    setBorderRadiusUnit(newRadiusUnit);
  }
  function getNewStyle(style, radius, radiusUnit) {
    return {
      ...style,
      border: {
        ...style?.border,
        radius: `${radius}${radiusUnit}` // Store the value with the unit so that it works as expected.
      }
    };
  }
  function onShowLinkSettings() {
    setIsLinkSheetVisible(true);
  }
  function onHideLinkSettings() {
    setIsLinkSheetVisible(false);
  }
  function onToggleButtonFocus(value) {
    if (value !== isButtonFocused) {
      setIsButtonFocused(value);
    }
  }
  function onClearSettings() {
    const {
      setAttributes
    } = props;
    setAttributes({
      url: '',
      rel: '',
      linkTarget: ''
    });
    onHideLinkSettings();
  }
  function onLayout({
    nativeEvent
  }) {
    const {
      width
    } = nativeEvent.layout;
    onSetMaxWidth(width);
  }
  const onSetMaxWidth = useCallback((width, isParentWidthDidChange = false) => {
    const {
      marginRight: spacing
    } = styles.defaultButton;
    const isParentWidthChanged = isParentWidthDidChange ? isParentWidthDidChange : maxWidth !== parentWidth;
    const isWidthChanged = maxWidth !== width;
    if (parentWidth && !width && isParentWidthChanged) {
      setMaxWidth(parentWidth - spacing);
    } else if (!parentWidth && width && isWidthChanged) {
      setMaxWidth(width - spacing);
    }
  }, [maxWidth, parentWidth]);
  function onRemove() {
    const {
      onDeleteBlock,
      onReplace
    } = props;
    if (numOfButtons === 1) {
      onDeleteBlock();
    } else {
      onReplace([]);
    }
  }
  function onPlaceholderTextWidth({
    nativeEvent
  }) {
    const textWidth = nativeEvent.lines[0] && nativeEvent.lines[0].width;
    if (textWidth && textWidth !== placeholderTextWidth) {
      setPlaceholderTextWidth(Math.min(textWidth, maxWidth));
    }
  }
  const onSetRef = useCallback(ref => {
    richTextRef.current = ref;
  }, [richTextRef]);
  const onUnstableOnFocus = useCallback(() => {
    onToggleButtonFocus(true);
  }, []);
  const onBlur = useCallback(() => {
    onSetMaxWidth();
  }, []);
  function dismissSheet() {
    onHideLinkSettings();
    closeGeneralSidebar();
  }
  function getLinkSettings(isCompatibleWithSettings) {
    const {
      attributes,
      setAttributes
    } = props;
    return /*#__PURE__*/_jsx(LinkSettingsNavigation, {
      isVisible: isLinkSheetVisible,
      url: attributes.url,
      rel: attributes.rel,
      linkTarget: attributes.linkTarget,
      onClose: dismissSheet,
      setAttributes: setAttributes,
      withBottomSheet: !isCompatibleWithSettings,
      hasPicker: true,
      actions: linkSettingsActions,
      options: isCompatibleWithSettings ? linkSettingsOptions : noFocusLinkSettingOptions,
      showIcon: !isCompatibleWithSettings
    });
  }

  // Render `Text` with `placeholderText` styled as a placeholder
  // to calculate its width which then is set as a `minWidth`
  function getPlaceholderWidth(placeholderText) {
    return /*#__PURE__*/_jsx(Text, {
      style: styles.placeholder,
      onTextLayout: onPlaceholderTextWidth,
      children: placeholderText
    });
  }
  function getBorderRadiusValue(currentBorderRadius, defaultBorderRadius) {
    const valueAndUnit = getValueAndUnit(currentBorderRadius);
    if (Number.isInteger(parseInt(valueAndUnit?.valueToConvert))) {
      return parseFloat(valueAndUnit.valueToConvert);
    }
    return defaultBorderRadius;
  }
  const {
    attributes,
    clientId,
    onReplace,
    mergeBlocks,
    setAttributes,
    style
  } = props;
  const {
    placeholder,
    text,
    style: buttonStyle,
    url,
    align = 'center',
    width
  } = attributes;
  const {
    paddingTop: spacing,
    borderWidth
  } = styles.defaultButton;
  if (parentWidth === 0) {
    return null;
  }
  const currentBorderRadius = buttonStyle?.border?.radius;
  const borderRadiusValue = getBorderRadiusValue(currentBorderRadius, styles.defaultButton.borderRadius);
  const buttonBorderRadiusValue = borderRadiusUnit === 'px' || borderRadiusUnit === '%' ? borderRadiusValue : Math.floor(14 * borderRadiusValue); // Lets assume that the font size is set to 14px; TO get a nicer preview.
  const outlineBorderRadius = buttonBorderRadiusValue > 0 ? buttonBorderRadiusValue + spacing + borderWidth : 0;

  // To achieve proper expanding and shrinking `RichText` on iOS, there is a need to set a `minWidth`
  // value at least on 1 when `RichText` is focused or when is not focused, but `RichText` value is
  // different than empty string.
  let minWidth = isButtonFocused || !isButtonFocused && text && text !== '' ? MIN_WIDTH : placeholderTextWidth;
  if (width) {
    // Set the width of the button.
    minWidth = Math.floor(maxWidth * (width / 100) - MIN_WIDTH_MARGINS[width]);
  }
  // To achieve proper expanding and shrinking `RichText` on Android, there is a need to set
  // a `placeholder` as an empty string when `RichText` is focused,
  // because `AztecView` is calculating a `minWidth` based on placeholder text.
  const placeholderText = isButtonFocused || !isButtonFocused && text && text !== '' ? '' : placeholder || __('Add text…');
  const backgroundColor = getBackgroundColor();
  const textColor = getTextColor();
  const isFixedWidth = !!width;
  const outLineStyles = [styles.outline, {
    borderRadius: outlineBorderRadius,
    borderColor: backgroundColor
  }];
  const textStyles = {
    ...richTextStyle.richText,
    paddingLeft: isFixedWidth ? 0 : richTextStyle.richText.paddingLeft,
    paddingRight: isFixedWidth ? 0 : richTextStyle.richText.paddingRight,
    color: textColor
  };
  return /*#__PURE__*/_jsxs(View, {
    onLayout: onLayout,
    children: [getPlaceholderWidth(placeholderText), /*#__PURE__*/_jsxs(ColorBackground, {
      borderRadiusValue: buttonBorderRadiusValue,
      backgroundColor: backgroundColor,
      isSelected: isSelected,
      children: [isSelected && /*#__PURE__*/_jsx(View, {
        pointerEvents: "none",
        style: outLineStyles
      }), /*#__PURE__*/_jsx(RichText, {
        ref: onSetRef,
        placeholder: placeholderText,
        value: text,
        onChange: onChangeText,
        style: textStyles,
        textAlign: align,
        placeholderTextColor: style?.color || styles.placeholderTextColor.color,
        identifier: "text",
        tagName: "p",
        minWidth: minWidth // The minimum Button size.
        ,
        maxWidth: isFixedWidth ? minWidth : maxWidth // The width of the screen.
        ,
        id: clientId,
        isSelected: isButtonFocused,
        withoutInteractiveFormatting: true,
        unstableOnFocus: onUnstableOnFocus,
        __unstableMobileNoFocusOnMount: !isSelected,
        selectionColor: textColor,
        onBlur: onBlur,
        onReplace: onReplace,
        onRemove: onRemove,
        onMerge: mergeBlocks,
        fontSize: style?.fontSize
      })]
    }), isSelected && /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(BlockControls, {
        children: /*#__PURE__*/_jsx(ToolbarGroup, {
          children: /*#__PURE__*/_jsx(ToolbarButton, {
            title: __('Edit link'),
            icon: link,
            onClick: onShowLinkSettings,
            isActive: url
          })
        })
      }), getLinkSettings(false), /*#__PURE__*/_jsxs(InspectorControls, {
        children: [/*#__PURE__*/_jsx(PanelBody, {
          title: __('Border Settings'),
          children: /*#__PURE__*/_jsx(UnitControl, {
            label: __('Border Radius'),
            min: MIN_BORDER_RADIUS_VALUE,
            max: MAX_BORDER_RADIUS_VALUE,
            value: borderRadiusValue,
            onChange: onChangeBorderRadius,
            onUnitChange: onChangeBorderRadiusUnit,
            unit: borderRadiusUnit,
            units: filterUnitsWithSettings(['px', 'em', 'rem'], CSS_UNITS)
          })
        }), /*#__PURE__*/_jsx(WidthPanel, {
          selectedWidth: width,
          setAttributes: setAttributes
        }), /*#__PURE__*/_jsx(PanelBody, {
          title: __('Link Settings'),
          children: getLinkSettings(true)
        })]
      })]
    })]
  });
}
export default ButtonEdit;
//# sourceMappingURL=edit.native.js.map