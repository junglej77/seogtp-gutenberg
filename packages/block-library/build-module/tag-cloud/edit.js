/**
 * WordPress dependencies
 */
import { Flex, FlexItem, PanelBody, ToggleControl, SelectControl, RangeControl, __experimentalUnitControl as UnitControl, __experimentalUseCustomUnits as useCustomUnits, __experimentalParseQuantityAndUnitFromRawValue as parseQuantityAndUnitFromRawValue, __experimentalVStack as VStack, Disabled } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps, useSettings } from '@wordpress/block-editor';
import ServerSideRender from '@wordpress/server-side-render';
import { store as coreStore } from '@wordpress/core-data';

/**
 * Minimum number of tags a user can show using this block.
 *
 * @type {number}
 */
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const MIN_TAGS = 1;

/**
 * Maximum number of tags a user can show using this block.
 *
 * @type {number}
 */
const MAX_TAGS = 100;
const MIN_FONT_SIZE = 0.1;
const MAX_FONT_SIZE = 100;
function TagCloudEdit({
  attributes,
  setAttributes
}) {
  const {
    taxonomy,
    showTagCounts,
    numberOfTags,
    smallestFontSize,
    largestFontSize
  } = attributes;
  const [availableUnits] = useSettings('spacing.units');

  // The `pt` unit is used as the default value and is therefore
  // always considered an available unit.
  const units = useCustomUnits({
    availableUnits: availableUnits ? [...availableUnits, 'pt'] : ['%', 'px', 'em', 'rem', 'pt']
  });
  const taxonomies = useSelect(select => select(coreStore).getTaxonomies({
    per_page: -1
  }), []);
  const getTaxonomyOptions = () => {
    const selectOption = {
      label: __('- Select -'),
      value: '',
      disabled: true
    };
    const taxonomyOptions = (taxonomies !== null && taxonomies !== void 0 ? taxonomies : []).filter(tax => !!tax.show_cloud).map(item => {
      return {
        value: item.slug,
        label: item.name
      };
    });
    return [selectOption, ...taxonomyOptions];
  };
  const onFontSizeChange = (fontSizeLabel, newValue) => {
    // eslint-disable-next-line @wordpress/no-unused-vars-before-return
    const [quantity, newUnit] = parseQuantityAndUnitFromRawValue(newValue);
    if (!Number.isFinite(quantity)) {
      return;
    }
    const updateObj = {
      [fontSizeLabel]: newValue
    };
    // We need to keep in sync the `unit` changes to both `smallestFontSize`
    // and `largestFontSize` attributes.
    Object.entries({
      smallestFontSize,
      largestFontSize
    }).forEach(([attribute, currentValue]) => {
      const [currentQuantity, currentUnit] = parseQuantityAndUnitFromRawValue(currentValue);
      // Only add an update if the other font size attribute has a different unit.
      if (attribute !== fontSizeLabel && currentUnit !== newUnit) {
        updateObj[attribute] = `${currentQuantity}${newUnit}`;
      }
    });
    setAttributes(updateObj);
  };

  // Remove border styles from the server-side attributes to prevent duplicate border.
  const serverSideAttributes = {
    ...attributes,
    style: {
      ...attributes?.style,
      border: undefined
    }
  };
  const inspectorControls = /*#__PURE__*/_jsx(InspectorControls, {
    children: /*#__PURE__*/_jsx(PanelBody, {
      title: __('Settings'),
      children: /*#__PURE__*/_jsxs(VStack, {
        spacing: 4,
        className: "wp-block-tag-cloud__inspector-settings",
        children: [/*#__PURE__*/_jsx(SelectControl, {
          __nextHasNoMarginBottom: true,
          __next40pxDefaultSize: true,
          label: __('Taxonomy'),
          options: getTaxonomyOptions(),
          value: taxonomy,
          onChange: selectedTaxonomy => setAttributes({
            taxonomy: selectedTaxonomy
          })
        }), /*#__PURE__*/_jsxs(Flex, {
          gap: 4,
          children: [/*#__PURE__*/_jsx(FlexItem, {
            isBlock: true,
            children: /*#__PURE__*/_jsx(UnitControl, {
              label: __('Smallest size'),
              value: smallestFontSize,
              onChange: value => {
                onFontSizeChange('smallestFontSize', value);
              },
              units: units,
              min: MIN_FONT_SIZE,
              max: MAX_FONT_SIZE,
              size: "__unstable-large"
            })
          }), /*#__PURE__*/_jsx(FlexItem, {
            isBlock: true,
            children: /*#__PURE__*/_jsx(UnitControl, {
              label: __('Largest size'),
              value: largestFontSize,
              onChange: value => {
                onFontSizeChange('largestFontSize', value);
              },
              units: units,
              min: MIN_FONT_SIZE,
              max: MAX_FONT_SIZE,
              size: "__unstable-large"
            })
          })]
        }), /*#__PURE__*/_jsx(RangeControl, {
          __nextHasNoMarginBottom: true,
          __next40pxDefaultSize: true,
          label: __('Number of tags'),
          value: numberOfTags,
          onChange: value => setAttributes({
            numberOfTags: value
          }),
          min: MIN_TAGS,
          max: MAX_TAGS,
          required: true
        }), /*#__PURE__*/_jsx(ToggleControl, {
          __nextHasNoMarginBottom: true,
          label: __('Show tag counts'),
          checked: showTagCounts,
          onChange: () => setAttributes({
            showTagCounts: !showTagCounts
          })
        })]
      })
    })
  });
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [inspectorControls, /*#__PURE__*/_jsx("div", {
      ...useBlockProps(),
      children: /*#__PURE__*/_jsx(Disabled, {
        children: /*#__PURE__*/_jsx(ServerSideRender, {
          skipBlockSupportAttributes: true,
          block: "core/tag-cloud",
          attributes: serverSideAttributes
        })
      })
    })]
  });
}
export default TagCloudEdit;
//# sourceMappingURL=edit.js.map