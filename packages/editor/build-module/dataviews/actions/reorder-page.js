/**
 * WordPress dependencies
 */
import { useDispatch } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { __ } from '@wordpress/i18n';
import { store as noticesStore } from '@wordpress/notices';
import { useState } from '@wordpress/element';
import { DataForm, isItemValid } from '@wordpress/dataviews';
import { Button, __experimentalHStack as HStack, __experimentalVStack as VStack } from '@wordpress/components';

/**
 * Internal dependencies
 */

import { orderField } from '../fields';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const fields = [orderField];
const formOrderAction = {
  fields: ['menu_order']
};
function ReorderModal({
  items,
  closeModal,
  onActionPerformed
}) {
  const [item, setItem] = useState(items[0]);
  const orderInput = item.menu_order;
  const {
    editEntityRecord,
    saveEditedEntityRecord
  } = useDispatch(coreStore);
  const {
    createSuccessNotice,
    createErrorNotice
  } = useDispatch(noticesStore);
  async function onOrder(event) {
    event.preventDefault();
    if (!isItemValid(item, fields, formOrderAction)) {
      return;
    }
    try {
      await editEntityRecord('postType', item.type, item.id, {
        menu_order: orderInput
      });
      closeModal?.();
      // Persist edited entity.
      await saveEditedEntityRecord('postType', item.type, item.id, {
        throwOnError: true
      });
      createSuccessNotice(__('Order updated.'), {
        type: 'snackbar'
      });
      onActionPerformed?.(items);
    } catch (error) {
      const typedError = error;
      const errorMessage = typedError.message && typedError.code !== 'unknown_error' ? typedError.message : __('An error occurred while updating the order');
      createErrorNotice(errorMessage, {
        type: 'snackbar'
      });
    }
  }
  const isSaveDisabled = !isItemValid(item, fields, formOrderAction);
  return /*#__PURE__*/_jsx("form", {
    onSubmit: onOrder,
    children: /*#__PURE__*/_jsxs(VStack, {
      spacing: "5",
      children: [/*#__PURE__*/_jsx("div", {
        children: __('Determines the order of pages. Pages with the same order value are sorted alphabetically. Negative order values are supported.')
      }), /*#__PURE__*/_jsx(DataForm, {
        data: item,
        fields: fields,
        form: formOrderAction,
        onChange: changes => setItem({
          ...item,
          ...changes
        })
      }), /*#__PURE__*/_jsxs(HStack, {
        justify: "right",
        children: [/*#__PURE__*/_jsx(Button, {
          __next40pxDefaultSize: true,
          variant: "tertiary",
          onClick: () => {
            closeModal?.();
          },
          children: __('Cancel')
        }), /*#__PURE__*/_jsx(Button, {
          __next40pxDefaultSize: true,
          variant: "primary",
          type: "submit",
          accessibleWhenDisabled: true,
          disabled: isSaveDisabled,
          children: __('Save')
        })]
      })]
    })
  });
}
const reorderPage = {
  id: 'order-pages',
  label: __('Order'),
  isEligible({
    status
  }) {
    return status !== 'trash';
  },
  RenderModal: ReorderModal
};
export default reorderPage;
//# sourceMappingURL=reorder-page.js.map