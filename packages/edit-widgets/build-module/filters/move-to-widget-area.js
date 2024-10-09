/**
 * WordPress dependencies
 */

import { BlockControls } from '@wordpress/block-editor';
import { createHigherOrderComponent } from '@wordpress/compose';
import { useDispatch, useSelect } from '@wordpress/data';
import { addFilter } from '@wordpress/hooks';
import { MoveToWidgetArea } from '@wordpress/widgets';

/**
 * Internal dependencies
 */
import { store as editWidgetsStore } from '../store';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const withMoveToWidgetAreaToolbarItem = createHigherOrderComponent(BlockEdit => props => {
  const {
    clientId,
    name: blockName
  } = props;
  const {
    widgetAreas,
    currentWidgetAreaId,
    canInsertBlockInWidgetArea
  } = useSelect(select => {
    // Component won't display for a widget area, so don't run selectors.
    if (blockName === 'core/widget-area') {
      return {};
    }
    const selectors = select(editWidgetsStore);
    const widgetAreaBlock = selectors.getParentWidgetAreaBlock(clientId);
    return {
      widgetAreas: selectors.getWidgetAreas(),
      currentWidgetAreaId: widgetAreaBlock?.attributes?.id,
      canInsertBlockInWidgetArea: selectors.canInsertBlockInWidgetArea(blockName)
    };
  }, [clientId, blockName]);
  const {
    moveBlockToWidgetArea
  } = useDispatch(editWidgetsStore);
  const hasMultipleWidgetAreas = widgetAreas?.length > 1;
  const isMoveToWidgetAreaVisible = blockName !== 'core/widget-area' && hasMultipleWidgetAreas && canInsertBlockInWidgetArea;
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(BlockEdit, {
      ...props
    }, "edit"), isMoveToWidgetAreaVisible && /*#__PURE__*/_jsx(BlockControls, {
      children: /*#__PURE__*/_jsx(MoveToWidgetArea, {
        widgetAreas: widgetAreas,
        currentWidgetAreaId: currentWidgetAreaId,
        onSelect: widgetAreaId => {
          moveBlockToWidgetArea(props.clientId, widgetAreaId);
        }
      })
    })]
  });
}, 'withMoveToWidgetAreaToolbarItem');
addFilter('editor.BlockEdit', 'core/edit-widgets/block-edit', withMoveToWidgetAreaToolbarItem);
//# sourceMappingURL=move-to-widget-area.js.map