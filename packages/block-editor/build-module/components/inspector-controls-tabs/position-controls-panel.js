/**
 * WordPress dependencies
 */
import { PanelBody, __experimentalUseSlotFills as useSlotFills } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useLayoutEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import InspectorControlsGroups from '../inspector-controls/groups';
import { default as InspectorControls } from '../inspector-controls';
import { store as blockEditorStore } from '../../store';
import { jsx as _jsx } from "react/jsx-runtime";
const PositionControlsPanel = () => {
  const [initialOpen, setInitialOpen] = useState();

  // Determine whether the panel should be expanded.
  const {
    multiSelectedBlocks
  } = useSelect(select => {
    const {
      getBlocksByClientId,
      getSelectedBlockClientIds
    } = select(blockEditorStore);
    const clientIds = getSelectedBlockClientIds();
    return {
      multiSelectedBlocks: getBlocksByClientId(clientIds)
    };
  }, []);
  useLayoutEffect(() => {
    // If any selected block has a position set, open the panel by default.
    // The first block's value will still be used within the control though.
    if (initialOpen === undefined) {
      setInitialOpen(multiSelectedBlocks.some(({
        attributes
      }) => !!attributes?.style?.position?.type));
    }
  }, [initialOpen, multiSelectedBlocks, setInitialOpen]);
  return /*#__PURE__*/_jsx(PanelBody, {
    className: "block-editor-block-inspector__position",
    title: __('Position'),
    initialOpen: initialOpen !== null && initialOpen !== void 0 ? initialOpen : false,
    children: /*#__PURE__*/_jsx(InspectorControls.Slot, {
      group: "position"
    })
  });
};
const PositionControls = () => {
  const fills = useSlotFills(InspectorControlsGroups.position.Slot.__unstableName);
  const hasFills = Boolean(fills && fills.length);
  if (!hasFills) {
    return null;
  }
  return /*#__PURE__*/_jsx(PositionControlsPanel, {});
};
export default PositionControls;
//# sourceMappingURL=position-controls-panel.js.map