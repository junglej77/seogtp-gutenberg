/**
 * WordPress dependencies
 */
import { useMergeRefs } from '@wordpress/compose';
import { useRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import BlockList from '../block-list';
import BlockTools from '../block-tools';
import EditorStyles from '../editor-styles';
import Iframe from '../iframe';
import WritingFlow from '../writing-flow';
import { useMouseMoveTypingReset } from '../observe-typing';
import { useBlockSelectionClearer } from '../block-selection-clearer';
import { useBlockCommands } from '../use-block-commands';

// EditorStyles is a memoized component, so avoid passing a new
// object reference on each render.
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const EDITOR_STYLE_TRANSFORM_OPTIONS = {
  // Don't transform selectors that already specify `.editor-styles-wrapper`.
  ignoredSelectors: [/\.editor-styles-wrapper/gi]
};
export function ExperimentalBlockCanvas({
  shouldIframe = true,
  height = '300px',
  children = /*#__PURE__*/_jsx(BlockList, {}),
  styles,
  contentRef: contentRefProp,
  iframeProps
}) {
  useBlockCommands();
  const resetTypingRef = useMouseMoveTypingReset();
  const clearerRef = useBlockSelectionClearer();
  const localRef = useRef();
  const contentRef = useMergeRefs([contentRefProp, clearerRef, localRef]);
  if (!shouldIframe) {
    return /*#__PURE__*/_jsxs(BlockTools, {
      __unstableContentRef: localRef,
      style: {
        height,
        display: 'flex'
      },
      children: [/*#__PURE__*/_jsx(EditorStyles, {
        styles: styles,
        scope: ":where(.editor-styles-wrapper)",
        transformOptions: EDITOR_STYLE_TRANSFORM_OPTIONS
      }), /*#__PURE__*/_jsx(WritingFlow, {
        ref: contentRef,
        className: "editor-styles-wrapper",
        tabIndex: -1,
        style: {
          height: '100%',
          width: '100%'
        },
        children: children
      })]
    });
  }
  return /*#__PURE__*/_jsx(BlockTools, {
    __unstableContentRef: localRef,
    style: {
      height,
      display: 'flex'
    },
    children: /*#__PURE__*/_jsxs(Iframe, {
      ...iframeProps,
      ref: resetTypingRef,
      contentRef: contentRef,
      style: {
        ...iframeProps?.style
      },
      name: "editor-canvas",
      children: [/*#__PURE__*/_jsx(EditorStyles, {
        styles: styles
      }), children]
    })
  });
}

/**
 * BlockCanvas component is a component used to display the canvas of the block editor.
 * What we call the canvas is an iframe containing the block list that you can manipulate.
 * The component is also responsible of wiring up all the necessary hooks to enable
 * the keyboard navigation across blocks in the editor and inject content styles into the iframe.
 *
 * @example
 *
 * ```jsx
 * function MyBlockEditor() {
 *   const [ blocks, updateBlocks ] = useState([]);
 *   return (
 *     <BlockEditorProvider
 *       value={ blocks }
 *       onInput={ updateBlocks }
 *       onChange={ persistBlocks }
 *      >
 *        <BlockCanvas height="400px" />
 *      </BlockEditorProvider>
 *    );
 * }
 * ```
 *
 * @param {Object}  props          Component props.
 * @param {string}  props.height   Canvas height, defaults to 300px.
 * @param {Array}   props.styles   Content styles to inject into the iframe.
 * @param {Element} props.children Content of the canvas, defaults to the BlockList component.
 * @return {Element}               Block Breadcrumb.
 */
function BlockCanvas({
  children,
  height,
  styles
}) {
  return /*#__PURE__*/_jsx(ExperimentalBlockCanvas, {
    height: height,
    styles: styles,
    children: children
  });
}
export default BlockCanvas;
//# sourceMappingURL=index.js.map