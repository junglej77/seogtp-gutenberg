/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { chevronRightSmall, Icon } from '@wordpress/icons';
import { useRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import BlockTitle from '../block-title';
import { store as blockEditorStore } from '../../store';
import { unlock } from '../../lock-unlock';
import { useBlockElementRef } from '../block-list/use-block-props/use-block-refs';
import getEditorRegion from '../../utils/get-editor-region';

/**
 * Block breadcrumb component, displaying the hierarchy of the current block selection as a breadcrumb.
 *
 * @param {Object} props               Component props.
 * @param {string} props.rootLabelText Translated label for the root element of the breadcrumb trail.
 * @return {Element}                   Block Breadcrumb.
 */
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function BlockBreadcrumb({
  rootLabelText
}) {
  const {
    selectBlock,
    clearSelectedBlock
  } = useDispatch(blockEditorStore);
  const {
    clientId,
    parents,
    hasSelection
  } = useSelect(select => {
    const {
      getSelectionStart,
      getSelectedBlockClientId,
      getEnabledBlockParents
    } = unlock(select(blockEditorStore));
    const selectedBlockClientId = getSelectedBlockClientId();
    return {
      parents: getEnabledBlockParents(selectedBlockClientId),
      clientId: selectedBlockClientId,
      hasSelection: !!getSelectionStart().clientId
    };
  }, []);
  const rootLabel = rootLabelText || __('Document');

  // We don't care about this specific ref, but this is a way
  // to get a ref within the editor canvas so we can focus it later.
  const blockRef = useRef();
  useBlockElementRef(clientId, blockRef);

  /*
   * Disable reason: The `list` ARIA role is redundant but
   * Safari+VoiceOver won't announce the list otherwise.
   */
  /* eslint-disable jsx-a11y/no-redundant-roles */
  return /*#__PURE__*/_jsxs("ul", {
    className: "block-editor-block-breadcrumb",
    role: "list",
    "aria-label": __('Block breadcrumb'),
    children: [/*#__PURE__*/_jsxs("li", {
      className: !hasSelection ? 'block-editor-block-breadcrumb__current' : undefined,
      "aria-current": !hasSelection ? 'true' : undefined,
      children: [hasSelection && /*#__PURE__*/_jsx(Button, {
        size: "small",
        className: "block-editor-block-breadcrumb__button",
        onClick: () => {
          // Find the block editor wrapper for the selected block
          const blockEditor = blockRef.current?.closest('.editor-styles-wrapper');
          clearSelectedBlock();
          getEditorRegion(blockEditor)?.focus();
        },
        children: rootLabel
      }), !hasSelection && rootLabel, !!clientId && /*#__PURE__*/_jsx(Icon, {
        icon: chevronRightSmall,
        className: "block-editor-block-breadcrumb__separator"
      })]
    }), parents.map(parentClientId => /*#__PURE__*/_jsxs("li", {
      children: [/*#__PURE__*/_jsx(Button, {
        size: "small",
        className: "block-editor-block-breadcrumb__button",
        onClick: () => selectBlock(parentClientId),
        children: /*#__PURE__*/_jsx(BlockTitle, {
          clientId: parentClientId,
          maximumLength: 35
        })
      }), /*#__PURE__*/_jsx(Icon, {
        icon: chevronRightSmall,
        className: "block-editor-block-breadcrumb__separator"
      })]
    }, parentClientId)), !!clientId && /*#__PURE__*/_jsx("li", {
      className: "block-editor-block-breadcrumb__current",
      "aria-current": "true",
      children: /*#__PURE__*/_jsx(BlockTitle, {
        clientId: clientId,
        maximumLength: 35
      })
    })]
  })
  /* eslint-enable jsx-a11y/no-redundant-roles */;
}
export default BlockBreadcrumb;
//# sourceMappingURL=index.js.map