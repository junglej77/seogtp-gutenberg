/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { store as blockEditorStore } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import QueryContent from './query-content';
import QueryPlaceholder from './query-placeholder';
import PatternSelectionModal from './pattern-selection-modal';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const QueryEdit = props => {
  const {
    clientId,
    attributes
  } = props;
  const [isPatternSelectionModalOpen, setIsPatternSelectionModalOpen] = useState(false);
  const hasInnerBlocks = useSelect(select => !!select(blockEditorStore).getBlocks(clientId).length, [clientId]);
  const Component = hasInnerBlocks ? QueryContent : QueryPlaceholder;
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Component, {
      ...props,
      openPatternSelectionModal: () => setIsPatternSelectionModalOpen(true)
    }), isPatternSelectionModalOpen && /*#__PURE__*/_jsx(PatternSelectionModal, {
      clientId: clientId,
      attributes: attributes,
      setIsPatternSelectionModalOpen: setIsPatternSelectionModalOpen
    })]
  });
};
export default QueryEdit;
//# sourceMappingURL=index.js.map