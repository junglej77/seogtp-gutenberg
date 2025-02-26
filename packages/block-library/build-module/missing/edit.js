/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { RawHTML } from '@wordpress/element';
import { Button } from '@wordpress/components';
import { createBlock } from '@wordpress/blocks';
import { useDispatch, useSelect } from '@wordpress/data';
import { Warning, useBlockProps, store as blockEditorStore } from '@wordpress/block-editor';
import { safeHTML } from '@wordpress/dom';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function MissingEdit({
  attributes,
  clientId
}) {
  const {
    originalName,
    originalUndelimitedContent
  } = attributes;
  const hasContent = !!originalUndelimitedContent;
  const {
    hasFreeformBlock,
    hasHTMLBlock
  } = useSelect(select => {
    const {
      canInsertBlockType,
      getBlockRootClientId
    } = select(blockEditorStore);
    return {
      hasFreeformBlock: canInsertBlockType('core/freeform', getBlockRootClientId(clientId)),
      hasHTMLBlock: canInsertBlockType('core/html', getBlockRootClientId(clientId))
    };
  }, [clientId]);
  const {
    replaceBlock
  } = useDispatch(blockEditorStore);
  function convertToHTML() {
    replaceBlock(clientId, createBlock('core/html', {
      content: originalUndelimitedContent
    }));
  }
  const actions = [];
  let messageHTML;
  const convertToHtmlButton = /*#__PURE__*/_jsx(Button, {
    __next40pxDefaultSize: true,
    onClick: convertToHTML,
    variant: "primary",
    children: __('Keep as HTML')
  }, "convert");
  if (hasContent && !hasFreeformBlock && !originalName) {
    if (hasHTMLBlock) {
      messageHTML = __('It appears you are trying to use the deprecated Classic block. You can leave this block intact, convert its content to a Custom HTML block, or remove it entirely. Alternatively, you can refresh the page to use the Classic block.');
      actions.push(convertToHtmlButton);
    } else {
      messageHTML = __('It appears you are trying to use the deprecated Classic block. You can leave this block intact, or remove it entirely. Alternatively, you can refresh the page to use the Classic block.');
    }
  } else if (hasContent && hasHTMLBlock) {
    messageHTML = sprintf( /* translators: %s: block name */
    __('Your site doesn’t include support for the "%s" block. You can leave it as-is, convert it to custom HTML, or remove it.'), originalName);
    actions.push(convertToHtmlButton);
  } else {
    messageHTML = sprintf( /* translators: %s: block name */
    __('Your site doesn’t include support for the "%s" block. You can leave it as-is or remove it.'), originalName);
  }
  return /*#__PURE__*/_jsxs("div", {
    ...useBlockProps({
      className: 'has-warning'
    }),
    children: [/*#__PURE__*/_jsx(Warning, {
      actions: actions,
      children: messageHTML
    }), /*#__PURE__*/_jsx(RawHTML, {
      children: safeHTML(originalUndelimitedContent)
    })]
  });
}
//# sourceMappingURL=edit.js.map