/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';
import { SelectControl, __experimentalUnitControl as UnitControl, __experimentalToggleGroupControl as ToggleGroupControl, __experimentalToggleGroupControlOption as ToggleGroupControlOption, __experimentalUseCustomUnits as useCustomUnits, __experimentalToolsPanelItem as ToolsPanelItem } from '@wordpress/components';
import { useSettings, store as blockEditorStore } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const SCALE_OPTIONS = /*#__PURE__*/_jsxs(_Fragment, {
  children: [/*#__PURE__*/_jsx(ToggleGroupControlOption, {
    value: "cover",
    label: _x('Cover', 'Scale option for Image dimension control')
  }), /*#__PURE__*/_jsx(ToggleGroupControlOption, {
    value: "contain",
    label: _x('Contain', 'Scale option for Image dimension control')
  }), /*#__PURE__*/_jsx(ToggleGroupControlOption, {
    value: "fill",
    label: _x('Fill', 'Scale option for Image dimension control')
  })]
});
const DEFAULT_SCALE = 'cover';
const DEFAULT_SIZE = 'full';
const scaleHelp = {
  cover: __('Image is scaled and cropped to fill the entire space without being distorted.'),
  contain: __('Image is scaled to fill the space without clipping nor distorting.'),
  fill: __('Image will be stretched and distorted to completely fill the space.')
};
const DimensionControls = ({
  clientId,
  attributes: {
    aspectRatio,
    width,
    height,
    scale,
    sizeSlug
  },
  setAttributes,
  media
}) => {
  const [availableUnits, defaultRatios, themeRatios, showDefaultRatios] = useSettings('spacing.units', 'dimensions.aspectRatios.default', 'dimensions.aspectRatios.theme', 'dimensions.defaultAspectRatios');
  const units = useCustomUnits({
    availableUnits: availableUnits || ['px', '%', 'vw', 'em', 'rem']
  });
  const imageSizes = useSelect(select => select(blockEditorStore).getSettings().imageSizes, []);
  const imageSizeOptions = imageSizes.filter(({
    slug
  }) => {
    return media?.media_details?.sizes?.[slug]?.source_url;
  }).map(({
    name,
    slug
  }) => ({
    value: slug,
    label: name
  }));
  const onDimensionChange = (dimension, nextValue) => {
    const parsedValue = parseFloat(nextValue);
    /**
     * If we have no value set and we change the unit,
     * we don't want to set the attribute, as it would
     * end up having the unit as value without any number.
     */
    if (isNaN(parsedValue) && nextValue) {
      return;
    }
    setAttributes({
      [dimension]: parsedValue < 0 ? '0' : nextValue
    });
  };
  const scaleLabel = _x('Scale', 'Image scaling options');
  const showScaleControl = height || aspectRatio && aspectRatio !== 'auto';
  const themeOptions = themeRatios?.map(({
    name,
    ratio
  }) => ({
    label: name,
    value: ratio
  }));
  const defaultOptions = defaultRatios?.map(({
    name,
    ratio
  }) => ({
    label: name,
    value: ratio
  }));
  const aspectRatioOptions = [{
    label: _x('Original', 'Aspect ratio option for dimensions control'),
    value: 'auto'
  }, ...(showDefaultRatios ? defaultOptions : []), ...(themeOptions ? themeOptions : [])];
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(ToolsPanelItem, {
      hasValue: () => !!aspectRatio,
      label: __('Aspect ratio'),
      onDeselect: () => setAttributes({
        aspectRatio: undefined
      }),
      resetAllFilter: () => ({
        aspectRatio: undefined
      }),
      isShownByDefault: true,
      panelId: clientId,
      children: /*#__PURE__*/_jsx(SelectControl, {
        __next40pxDefaultSize: true,
        __nextHasNoMarginBottom: true,
        label: __('Aspect ratio'),
        value: aspectRatio,
        options: aspectRatioOptions,
        onChange: nextAspectRatio => setAttributes({
          aspectRatio: nextAspectRatio
        })
      })
    }), /*#__PURE__*/_jsx(ToolsPanelItem, {
      className: "single-column",
      hasValue: () => !!height,
      label: __('Height'),
      onDeselect: () => setAttributes({
        height: undefined
      }),
      resetAllFilter: () => ({
        height: undefined
      }),
      isShownByDefault: true,
      panelId: clientId,
      children: /*#__PURE__*/_jsx(UnitControl, {
        __next40pxDefaultSize: true,
        label: __('Height'),
        labelPosition: "top",
        value: height || '',
        min: 0,
        onChange: nextHeight => onDimensionChange('height', nextHeight),
        units: units
      })
    }), /*#__PURE__*/_jsx(ToolsPanelItem, {
      className: "single-column",
      hasValue: () => !!width,
      label: __('Width'),
      onDeselect: () => setAttributes({
        width: undefined
      }),
      resetAllFilter: () => ({
        width: undefined
      }),
      isShownByDefault: true,
      panelId: clientId,
      children: /*#__PURE__*/_jsx(UnitControl, {
        __next40pxDefaultSize: true,
        label: __('Width'),
        labelPosition: "top",
        value: width || '',
        min: 0,
        onChange: nextWidth => onDimensionChange('width', nextWidth),
        units: units
      })
    }), showScaleControl && /*#__PURE__*/_jsx(ToolsPanelItem, {
      hasValue: () => !!scale && scale !== DEFAULT_SCALE,
      label: scaleLabel,
      onDeselect: () => setAttributes({
        scale: DEFAULT_SCALE
      }),
      resetAllFilter: () => ({
        scale: DEFAULT_SCALE
      }),
      isShownByDefault: true,
      panelId: clientId,
      children: /*#__PURE__*/_jsx(ToggleGroupControl, {
        __next40pxDefaultSize: true,
        __nextHasNoMarginBottom: true,
        label: scaleLabel,
        value: scale,
        help: scaleHelp[scale],
        onChange: value => setAttributes({
          scale: value
        }),
        isBlock: true,
        children: SCALE_OPTIONS
      })
    }), !!imageSizeOptions.length && /*#__PURE__*/_jsx(ToolsPanelItem, {
      hasValue: () => !!sizeSlug,
      label: __('Resolution'),
      onDeselect: () => setAttributes({
        sizeSlug: undefined
      }),
      resetAllFilter: () => ({
        sizeSlug: undefined
      }),
      isShownByDefault: false,
      panelId: clientId,
      children: /*#__PURE__*/_jsx(SelectControl, {
        __next40pxDefaultSize: true,
        __nextHasNoMarginBottom: true,
        label: __('Resolution'),
        value: sizeSlug || DEFAULT_SIZE,
        options: imageSizeOptions,
        onChange: nextSizeSlug => setAttributes({
          sizeSlug: nextSizeSlug
        }),
        help: __('Select the size of the source image.')
      })
    })]
  });
};
export default DimensionControls;
//# sourceMappingURL=dimension-controls.js.map