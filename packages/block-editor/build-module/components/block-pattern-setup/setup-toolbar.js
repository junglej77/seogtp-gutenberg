/**
 * WordPress dependencies
 */
import { __, isRTL } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { chevronRight, chevronLeft, grid, stretchFullWidth } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { VIEWMODES } from './constants';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const Actions = ({
  onBlockPatternSelect
}) => /*#__PURE__*/_jsx("div", {
  className: "block-editor-block-pattern-setup__actions",
  children: /*#__PURE__*/_jsx(Button
  // TODO: Switch to `true` (40px size) if possible
  , {
    __next40pxDefaultSize: false,
    variant: "primary",
    onClick: onBlockPatternSelect,
    children: __('Choose')
  })
});
const CarouselNavigation = ({
  handlePrevious,
  handleNext,
  activeSlide,
  totalSlides
}) => /*#__PURE__*/_jsxs("div", {
  className: "block-editor-block-pattern-setup__navigation",
  children: [/*#__PURE__*/_jsx(Button
  // TODO: Switch to `true` (40px size) if possible
  , {
    __next40pxDefaultSize: false,
    icon: isRTL() ? chevronRight : chevronLeft,
    label: __('Previous pattern'),
    onClick: handlePrevious,
    disabled: activeSlide === 0,
    accessibleWhenDisabled: true
  }), /*#__PURE__*/_jsx(Button
  // TODO: Switch to `true` (40px size) if possible
  , {
    __next40pxDefaultSize: false,
    icon: isRTL() ? chevronLeft : chevronRight,
    label: __('Next pattern'),
    onClick: handleNext,
    disabled: activeSlide === totalSlides - 1,
    accessibleWhenDisabled: true
  })]
});
const SetupToolbar = ({
  viewMode,
  setViewMode,
  handlePrevious,
  handleNext,
  activeSlide,
  totalSlides,
  onBlockPatternSelect
}) => {
  const isCarouselView = viewMode === VIEWMODES.carousel;
  const displayControls = /*#__PURE__*/_jsxs("div", {
    className: "block-editor-block-pattern-setup__display-controls",
    children: [/*#__PURE__*/_jsx(Button
    // TODO: Switch to `true` (40px size) if possible
    , {
      __next40pxDefaultSize: false,
      icon: stretchFullWidth,
      label: __('Carousel view'),
      onClick: () => setViewMode(VIEWMODES.carousel),
      isPressed: isCarouselView
    }), /*#__PURE__*/_jsx(Button
    // TODO: Switch to `true` (40px size) if possible
    , {
      __next40pxDefaultSize: false,
      icon: grid,
      label: __('Grid view'),
      onClick: () => setViewMode(VIEWMODES.grid),
      isPressed: viewMode === VIEWMODES.grid
    })]
  });
  return /*#__PURE__*/_jsxs("div", {
    className: "block-editor-block-pattern-setup__toolbar",
    children: [isCarouselView && /*#__PURE__*/_jsx(CarouselNavigation, {
      handlePrevious: handlePrevious,
      handleNext: handleNext,
      activeSlide: activeSlide,
      totalSlides: totalSlides
    }), displayControls, isCarouselView && /*#__PURE__*/_jsx(Actions, {
      onBlockPatternSelect: onBlockPatternSelect
    })]
  });
};
export default SetupToolbar;
//# sourceMappingURL=setup-toolbar.js.map