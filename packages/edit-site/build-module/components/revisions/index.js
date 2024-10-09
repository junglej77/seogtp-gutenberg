/**
 * WordPress dependencies
 */
import { Disabled } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { BlockList, privateApis as blockEditorPrivateApis, store as blockEditorStore, __unstableEditorStyles as EditorStyles, __unstableIframe as Iframe } from '@wordpress/block-editor';
import { privateApis as editorPrivateApis } from '@wordpress/editor';
import { useSelect } from '@wordpress/data';
import { useContext, useMemo } from '@wordpress/element';

/**
 * Internal dependencies
 */

import { unlock } from '../../lock-unlock';
import EditorCanvasContainer from '../editor-canvas-container';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const {
  ExperimentalBlockEditorProvider,
  GlobalStylesContext,
  useGlobalStylesOutputWithConfig,
  __unstableBlockStyleVariationOverridesWithConfig
} = unlock(blockEditorPrivateApis);
const {
  mergeBaseAndUserConfigs
} = unlock(editorPrivateApis);
function isObjectEmpty(object) {
  return !object || Object.keys(object).length === 0;
}
function Revisions({
  userConfig,
  blocks
}) {
  const {
    base: baseConfig
  } = useContext(GlobalStylesContext);
  const mergedConfig = useMemo(() => {
    if (!isObjectEmpty(userConfig) && !isObjectEmpty(baseConfig)) {
      return mergeBaseAndUserConfigs(baseConfig, userConfig);
    }
    return {};
  }, [baseConfig, userConfig]);
  const renderedBlocksArray = useMemo(() => Array.isArray(blocks) ? blocks : [blocks], [blocks]);
  const originalSettings = useSelect(select => select(blockEditorStore).getSettings(), []);
  const settings = useMemo(() => ({
    ...originalSettings,
    __unstableIsPreviewMode: true
  }), [originalSettings]);
  const [globalStyles] = useGlobalStylesOutputWithConfig(mergedConfig);
  const editorStyles = !isObjectEmpty(globalStyles) && !isObjectEmpty(userConfig) ? globalStyles : settings.styles;
  return /*#__PURE__*/_jsx(EditorCanvasContainer, {
    title: __('Revisions'),
    closeButtonLabel: __('Close revisions'),
    enableResizing: true,
    children: /*#__PURE__*/_jsxs(Iframe, {
      className: "edit-site-revisions__iframe",
      name: "revisions",
      tabIndex: 0,
      children: [/*#__PURE__*/_jsx("style", {
        children:
        // Forming a "block formatting context" to prevent margin collapsing.
        // @see https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context
        `.is-root-container { display: flow-root; }`
      }), /*#__PURE__*/_jsx(Disabled, {
        className: "edit-site-revisions__example-preview__content",
        children: /*#__PURE__*/_jsxs(ExperimentalBlockEditorProvider, {
          value: renderedBlocksArray,
          settings: settings,
          children: [/*#__PURE__*/_jsx(BlockList, {
            renderAppender: false
          }), /*#__PURE__*/_jsx(EditorStyles, {
            styles: editorStyles
          }), /*#__PURE__*/_jsx(__unstableBlockStyleVariationOverridesWithConfig, {
            config: mergedConfig
          })]
        })
      })]
    })
  });
}
export default Revisions;
//# sourceMappingURL=index.js.map