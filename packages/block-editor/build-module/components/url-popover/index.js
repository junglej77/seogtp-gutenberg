/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { forwardRef, useState } from '@wordpress/element';
import { Button, Popover, privateApis as componentsPrivateApis } from '@wordpress/components';
import { chevronDown } from '@wordpress/icons';
import deprecated from '@wordpress/deprecated';

/**
 * Internal dependencies
 */
import LinkViewer from './link-viewer';
import LinkEditor from './link-editor';
import { unlock } from '../../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const {
  __experimentalPopoverLegacyPositionToPlacement
} = unlock(componentsPrivateApis);
const DEFAULT_PLACEMENT = 'bottom';
const URLPopover = forwardRef(({
  additionalControls,
  children,
  renderSettings,
  // The DEFAULT_PLACEMENT value is assigned inside the function's body
  placement,
  focusOnMount = 'firstElement',
  // Deprecated
  position,
  // Rest
  ...popoverProps
}, ref) => {
  if (position !== undefined) {
    deprecated('`position` prop in wp.blockEditor.URLPopover', {
      since: '6.2',
      alternative: '`placement` prop'
    });
  }

  // Compute popover's placement:
  // - give priority to `placement` prop, if defined
  // - otherwise, compute it from the legacy `position` prop (if defined)
  // - finally, fallback to the DEFAULT_PLACEMENT.
  let computedPlacement;
  if (placement !== undefined) {
    computedPlacement = placement;
  } else if (position !== undefined) {
    computedPlacement = __experimentalPopoverLegacyPositionToPlacement(position);
  }
  computedPlacement = computedPlacement || DEFAULT_PLACEMENT;
  const [isSettingsExpanded, setIsSettingsExpanded] = useState(false);
  const showSettings = !!renderSettings && isSettingsExpanded;
  const toggleSettingsVisibility = () => {
    setIsSettingsExpanded(!isSettingsExpanded);
  };
  return /*#__PURE__*/_jsxs(Popover, {
    ref: ref,
    role: "dialog",
    "aria-modal": "true",
    "aria-label": __('Edit URL'),
    className: "block-editor-url-popover",
    focusOnMount: focusOnMount,
    placement: computedPlacement,
    shift: true,
    variant: "toolbar",
    ...popoverProps,
    children: [/*#__PURE__*/_jsx("div", {
      className: "block-editor-url-popover__input-container",
      children: /*#__PURE__*/_jsxs("div", {
        className: "block-editor-url-popover__row",
        children: [children, !!renderSettings && /*#__PURE__*/_jsx(Button, {
          className: "block-editor-url-popover__settings-toggle",
          icon: chevronDown,
          label: __('Link settings'),
          onClick: toggleSettingsVisibility,
          "aria-expanded": isSettingsExpanded,
          size: "compact"
        })]
      })
    }), showSettings && /*#__PURE__*/_jsx("div", {
      className: "block-editor-url-popover__settings",
      children: renderSettings()
    }), additionalControls && !showSettings && /*#__PURE__*/_jsx("div", {
      className: "block-editor-url-popover__additional-controls",
      children: additionalControls
    })]
  });
});
URLPopover.LinkEditor = LinkEditor;
URLPopover.LinkViewer = LinkViewer;

/**
 * @see https://github.com/WordPress/gutenberg/blob/HEAD/packages/block-editor/src/components/url-popover/README.md
 */
export default URLPopover;
//# sourceMappingURL=index.js.map