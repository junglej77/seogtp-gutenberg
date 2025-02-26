/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useRef, useEffect, useState } from '@wordpress/element';
import { focus } from '@wordpress/dom';
import { ToolbarButton, NavigableMenu, Button, MenuItem, ToggleControl, TextControl, __experimentalVStack as VStack } from '@wordpress/components';
import { Icon, link as linkIcon, image, page, fullscreen, linkOff } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import URLPopover from './index';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const LINK_DESTINATION_NONE = 'none';
const LINK_DESTINATION_CUSTOM = 'custom';
const LINK_DESTINATION_MEDIA = 'media';
const LINK_DESTINATION_ATTACHMENT = 'attachment';
const NEW_TAB_REL = ['noreferrer', 'noopener'];
const ImageURLInputUI = ({
  linkDestination,
  onChangeUrl,
  url,
  mediaType = 'image',
  mediaUrl,
  mediaLink,
  linkTarget,
  linkClass,
  rel,
  showLightboxSetting,
  lightboxEnabled,
  onSetLightbox,
  resetLightbox
}) => {
  const [isOpen, setIsOpen] = useState(false);
  // Use internal state instead of a ref to make sure that the component
  // re-renders when the popover's anchor updates.
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const openLinkUI = () => {
    setIsOpen(true);
  };
  const [isEditingLink, setIsEditingLink] = useState(false);
  const [urlInput, setUrlInput] = useState(null);
  const autocompleteRef = useRef(null);
  const wrapperRef = useRef();
  useEffect(() => {
    if (!wrapperRef.current) {
      return;
    }
    const nextFocusTarget = focus.focusable.find(wrapperRef.current)[0] || wrapperRef.current;
    nextFocusTarget.focus();
  }, [isEditingLink, url, lightboxEnabled]);
  const startEditLink = () => {
    if (linkDestination === LINK_DESTINATION_MEDIA || linkDestination === LINK_DESTINATION_ATTACHMENT) {
      setUrlInput('');
    }
    setIsEditingLink(true);
  };
  const stopEditLink = () => {
    setIsEditingLink(false);
  };
  const closeLinkUI = () => {
    setUrlInput(null);
    stopEditLink();
    setIsOpen(false);
  };
  const getUpdatedLinkTargetSettings = value => {
    const newLinkTarget = value ? '_blank' : undefined;
    let updatedRel;
    if (newLinkTarget) {
      const rels = (rel !== null && rel !== void 0 ? rel : '').split(' ');
      NEW_TAB_REL.forEach(relVal => {
        if (!rels.includes(relVal)) {
          rels.push(relVal);
        }
      });
      updatedRel = rels.join(' ');
    } else {
      const rels = (rel !== null && rel !== void 0 ? rel : '').split(' ').filter(relVal => NEW_TAB_REL.includes(relVal) === false);
      updatedRel = rels.length ? rels.join(' ') : undefined;
    }
    return {
      linkTarget: newLinkTarget,
      rel: updatedRel
    };
  };
  const onFocusOutside = () => {
    return event => {
      // The autocomplete suggestions list renders in a separate popover (in a portal),
      // so onFocusOutside fails to detect that a click on a suggestion occurred in the
      // LinkContainer. Detect clicks on autocomplete suggestions using a ref here, and
      // return to avoid the popover being closed.
      const autocompleteElement = autocompleteRef.current;
      if (autocompleteElement && autocompleteElement.contains(event.target)) {
        return;
      }
      setIsOpen(false);
      setUrlInput(null);
      stopEditLink();
    };
  };
  const onSubmitLinkChange = () => {
    return event => {
      if (urlInput) {
        // It is possible the entered URL actually matches a named link destination.
        // This check will ensure our link destination is correct.
        const selectedDestination = getLinkDestinations().find(destination => destination.url === urlInput)?.linkDestination || LINK_DESTINATION_CUSTOM;
        onChangeUrl({
          href: urlInput,
          linkDestination: selectedDestination,
          lightbox: {
            enabled: false
          }
        });
      }
      stopEditLink();
      setUrlInput(null);
      event.preventDefault();
    };
  };
  const onLinkRemove = () => {
    onChangeUrl({
      linkDestination: LINK_DESTINATION_NONE,
      href: ''
    });
  };
  const getLinkDestinations = () => {
    const linkDestinations = [{
      linkDestination: LINK_DESTINATION_MEDIA,
      title: __('Link to image file'),
      url: mediaType === 'image' ? mediaUrl : undefined,
      icon: image
    }];
    if (mediaType === 'image' && mediaLink) {
      linkDestinations.push({
        linkDestination: LINK_DESTINATION_ATTACHMENT,
        title: __('Link to attachment page'),
        url: mediaType === 'image' ? mediaLink : undefined,
        icon: page
      });
    }
    return linkDestinations;
  };
  const onSetHref = value => {
    const linkDestinations = getLinkDestinations();
    let linkDestinationInput;
    if (!value) {
      linkDestinationInput = LINK_DESTINATION_NONE;
    } else {
      linkDestinationInput = (linkDestinations.find(destination => {
        return destination.url === value;
      }) || {
        linkDestination: LINK_DESTINATION_CUSTOM
      }).linkDestination;
    }
    onChangeUrl({
      linkDestination: linkDestinationInput,
      href: value
    });
  };
  const onSetNewTab = value => {
    const updatedLinkTarget = getUpdatedLinkTargetSettings(value);
    onChangeUrl(updatedLinkTarget);
  };
  const onSetLinkRel = value => {
    onChangeUrl({
      rel: value
    });
  };
  const onSetLinkClass = value => {
    onChangeUrl({
      linkClass: value
    });
  };
  const advancedOptions = /*#__PURE__*/_jsxs(VStack, {
    spacing: "3",
    children: [/*#__PURE__*/_jsx(ToggleControl, {
      __nextHasNoMarginBottom: true,
      label: __('Open in new tab'),
      onChange: onSetNewTab,
      checked: linkTarget === '_blank'
    }), /*#__PURE__*/_jsx(TextControl, {
      __next40pxDefaultSize: true,
      __nextHasNoMarginBottom: true,
      label: __('Link rel'),
      value: rel !== null && rel !== void 0 ? rel : '',
      onChange: onSetLinkRel
    }), /*#__PURE__*/_jsx(TextControl, {
      __next40pxDefaultSize: true,
      __nextHasNoMarginBottom: true,
      label: __('Link CSS class'),
      value: linkClass || '',
      onChange: onSetLinkClass
    })]
  });
  const linkEditorValue = urlInput !== null ? urlInput : url;
  const hideLightboxPanel = !lightboxEnabled || lightboxEnabled && !showLightboxSetting;
  const showLinkEditor = !linkEditorValue && hideLightboxPanel;
  const urlLabel = (getLinkDestinations().find(destination => destination.linkDestination === linkDestination) || {}).title;
  const PopoverChildren = () => {
    if (lightboxEnabled && showLightboxSetting && !url && !isEditingLink) {
      return /*#__PURE__*/_jsxs("div", {
        className: "block-editor-url-popover__expand-on-click",
        children: [/*#__PURE__*/_jsx(Icon, {
          icon: fullscreen
        }), /*#__PURE__*/_jsxs("div", {
          className: "text",
          children: [/*#__PURE__*/_jsx("p", {
            children: __('Expand on click')
          }), /*#__PURE__*/_jsx("p", {
            className: "description",
            children: __('Scales the image with a lightbox effect')
          })]
        }), /*#__PURE__*/_jsx(Button, {
          icon: linkOff,
          label: __('Disable expand on click'),
          onClick: () => {
            onSetLightbox?.(false);
          },
          size: "compact"
        })]
      });
    } else if (!url || isEditingLink) {
      return /*#__PURE__*/_jsx(URLPopover.LinkEditor, {
        className: "block-editor-format-toolbar__link-container-content",
        value: linkEditorValue,
        onChangeInputValue: setUrlInput,
        onSubmit: onSubmitLinkChange(),
        autocompleteRef: autocompleteRef
      });
    } else if (url && !isEditingLink) {
      return /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(URLPopover.LinkViewer, {
          className: "block-editor-format-toolbar__link-container-content",
          url: url,
          onEditLinkClick: startEditLink,
          urlLabel: urlLabel
        }), /*#__PURE__*/_jsx(Button, {
          icon: linkOff,
          label: __('Remove link'),
          onClick: () => {
            onLinkRemove();
            resetLightbox?.();
          },
          size: "compact"
        })]
      });
    }
  };
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(ToolbarButton, {
      icon: linkIcon,
      className: "components-toolbar__control",
      label: __('Link'),
      "aria-expanded": isOpen,
      onClick: openLinkUI,
      ref: setPopoverAnchor,
      isActive: !!url || lightboxEnabled && showLightboxSetting
    }), isOpen && /*#__PURE__*/_jsx(URLPopover, {
      ref: wrapperRef,
      anchor: popoverAnchor,
      onFocusOutside: onFocusOutside(),
      onClose: closeLinkUI,
      renderSettings: hideLightboxPanel ? () => advancedOptions : null,
      additionalControls: showLinkEditor && /*#__PURE__*/_jsxs(NavigableMenu, {
        children: [getLinkDestinations().map(link => /*#__PURE__*/_jsx(MenuItem, {
          icon: link.icon,
          iconPosition: "left",
          onClick: () => {
            setUrlInput(null);
            onSetHref(link.url);
            stopEditLink();
          },
          children: link.title
        }, link.linkDestination)), showLightboxSetting && /*#__PURE__*/_jsx(MenuItem, {
          className: "block-editor-url-popover__expand-on-click",
          icon: fullscreen,
          info: __('Scale the image with a lightbox effect.'),
          iconPosition: "left",
          onClick: () => {
            setUrlInput(null);
            onChangeUrl({
              linkDestination: LINK_DESTINATION_NONE,
              href: ''
            });
            onSetLightbox?.(true);
            stopEditLink();
          },
          children: __('Expand on click')
        }, "expand-on-click")]
      }),
      offset: 13,
      children: PopoverChildren()
    })]
  });
};
export { ImageURLInputUI as __experimentalImageURLInputUI };
//# sourceMappingURL=image-url-input-ui.js.map