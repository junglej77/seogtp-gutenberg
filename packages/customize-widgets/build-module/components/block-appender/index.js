/**
 * WordPress dependencies
 */
import { useRef, useEffect } from '@wordpress/element';
import { ButtonBlockAppender, store as blockEditorStore } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { jsx as _jsx } from "react/jsx-runtime";
export default function BlockAppender(props) {
  const ref = useRef();
  const isBlocksListEmpty = useSelect(select => select(blockEditorStore).getBlockCount() === 0);

  // Move the focus to the block appender to prevent focus from
  // being lost when emptying the widget area.
  useEffect(() => {
    if (isBlocksListEmpty && ref.current) {
      const {
        ownerDocument
      } = ref.current;
      if (!ownerDocument.activeElement || ownerDocument.activeElement === ownerDocument.body) {
        ref.current.focus();
      }
    }
  }, [isBlocksListEmpty]);
  return /*#__PURE__*/_jsx(ButtonBlockAppender, {
    ...props,
    ref: ref
  });
}
//# sourceMappingURL=index.js.map