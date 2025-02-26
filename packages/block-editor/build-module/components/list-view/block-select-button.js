/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { Button, __experimentalHStack as HStack, __experimentalTruncate as Truncate } from '@wordpress/components';
import { forwardRef } from '@wordpress/element';
import { Icon, lockSmall as lock, pinSmall } from '@wordpress/icons';
import { SPACE, ENTER } from '@wordpress/keycodes';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import BlockIcon from '../block-icon';
import useBlockDisplayInformation from '../use-block-display-information';
import useBlockDisplayTitle from '../block-title/use-block-display-title';
import ListViewExpander from './expander';
import { useBlockLock } from '../block-lock';
import useListViewImages from './use-list-view-images';
import { store as blockEditorStore } from '../../store';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function ListViewBlockSelectButton({
  className,
  block: {
    clientId
  },
  onClick,
  onContextMenu,
  onMouseDown,
  onToggleExpanded,
  tabIndex,
  onFocus,
  onDragStart,
  onDragEnd,
  draggable,
  isExpanded,
  ariaDescribedBy
}, ref) {
  const blockInformation = useBlockDisplayInformation(clientId);
  const blockTitle = useBlockDisplayTitle({
    clientId,
    context: 'list-view'
  });
  const {
    isLocked
  } = useBlockLock(clientId);
  const {
    isContentOnly
  } = useSelect(select => ({
    isContentOnly: select(blockEditorStore).getBlockEditingMode(clientId) === 'contentOnly'
  }), [clientId]);
  const shouldShowLockIcon = isLocked && !isContentOnly;
  const isSticky = blockInformation?.positionType === 'sticky';
  const images = useListViewImages({
    clientId,
    isExpanded
  });

  // The `href` attribute triggers the browser's native HTML drag operations.
  // When the link is dragged, the element's outerHTML is set in DataTransfer object as text/html.
  // We need to clear any HTML drag data to prevent `pasteHandler` from firing
  // inside the `useOnBlockDrop` hook.
  const onDragStartHandler = event => {
    event.dataTransfer.clearData();
    onDragStart?.(event);
  };

  /**
   * @param {KeyboardEvent} event
   */
  function onKeyDown(event) {
    if (event.keyCode === ENTER || event.keyCode === SPACE) {
      onClick(event);
    }
  }
  return /*#__PURE__*/_jsxs(Button
  // TODO: Switch to `true` (40px size) if possible
  , {
    __next40pxDefaultSize: false,
    className: clsx('block-editor-list-view-block-select-button', className),
    onClick: onClick,
    onContextMenu: onContextMenu,
    onKeyDown: onKeyDown,
    onMouseDown: onMouseDown,
    ref: ref,
    tabIndex: tabIndex,
    onFocus: onFocus,
    onDragStart: onDragStartHandler,
    onDragEnd: onDragEnd,
    draggable: draggable,
    href: `#block-${clientId}`,
    "aria-describedby": ariaDescribedBy,
    "aria-expanded": isExpanded,
    children: [/*#__PURE__*/_jsx(ListViewExpander, {
      onClick: onToggleExpanded
    }), /*#__PURE__*/_jsx(BlockIcon, {
      icon: blockInformation?.icon,
      showColors: true,
      context: "list-view"
    }), /*#__PURE__*/_jsxs(HStack, {
      alignment: "center",
      className: "block-editor-list-view-block-select-button__label-wrapper",
      justify: "flex-start",
      spacing: 1,
      children: [/*#__PURE__*/_jsx("span", {
        className: "block-editor-list-view-block-select-button__title",
        children: /*#__PURE__*/_jsx(Truncate, {
          ellipsizeMode: "auto",
          children: blockTitle
        })
      }), blockInformation?.anchor && /*#__PURE__*/_jsx("span", {
        className: "block-editor-list-view-block-select-button__anchor-wrapper",
        children: /*#__PURE__*/_jsx(Truncate, {
          className: "block-editor-list-view-block-select-button__anchor",
          ellipsizeMode: "auto",
          children: blockInformation.anchor
        })
      }), isSticky && /*#__PURE__*/_jsx("span", {
        className: "block-editor-list-view-block-select-button__sticky",
        children: /*#__PURE__*/_jsx(Icon, {
          icon: pinSmall
        })
      }), images.length ? /*#__PURE__*/_jsx("span", {
        className: "block-editor-list-view-block-select-button__images",
        "aria-hidden": true,
        children: images.map((image, index) => /*#__PURE__*/_jsx("span", {
          className: "block-editor-list-view-block-select-button__image",
          style: {
            backgroundImage: `url(${image.url})`,
            zIndex: images.length - index // Ensure the first image is on top, and subsequent images are behind.
          }
        }, image.clientId))
      }) : null, shouldShowLockIcon && /*#__PURE__*/_jsx("span", {
        className: "block-editor-list-view-block-select-button__lock",
        children: /*#__PURE__*/_jsx(Icon, {
          icon: lock
        })
      })]
    })]
  });
}
export default forwardRef(ListViewBlockSelectButton);
//# sourceMappingURL=block-select-button.js.map