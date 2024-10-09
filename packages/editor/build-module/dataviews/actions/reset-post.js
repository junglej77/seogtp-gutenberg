/**
 * WordPress dependencies
 */
import { backup } from '@wordpress/icons';
import { useDispatch } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { __, sprintf } from '@wordpress/i18n';
import { store as noticesStore } from '@wordpress/notices';
import { useState } from '@wordpress/element';
import { Button, __experimentalText as Text, __experimentalHStack as HStack, __experimentalVStack as VStack } from '@wordpress/components';
/**
 * Internal dependencies
 */
import { TEMPLATE_POST_TYPE, TEMPLATE_ORIGINS } from '../../store/constants';
import { store as editorStore } from '../../store';
import { unlock } from '../../lock-unlock';
import { isTemplateOrTemplatePart, getItemTitle } from './utils';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const resetPost = {
  id: 'reset-post',
  label: __('Reset'),
  isEligible: item => {
    return isTemplateOrTemplatePart(item) && item?.source === TEMPLATE_ORIGINS.custom && (Boolean(item.type === 'wp_template' && item?.plugin) || item?.has_theme_file);
  },
  icon: backup,
  supportsBulk: true,
  hideModalHeader: true,
  RenderModal: ({
    items,
    closeModal,
    onActionPerformed
  }) => {
    const [isBusy, setIsBusy] = useState(false);
    const {
      revertTemplate
    } = unlock(useDispatch(editorStore));
    const {
      saveEditedEntityRecord
    } = useDispatch(coreStore);
    const {
      createSuccessNotice,
      createErrorNotice
    } = useDispatch(noticesStore);
    const onConfirm = async () => {
      try {
        for (const template of items) {
          await revertTemplate(template, {
            allowUndo: false
          });
          await saveEditedEntityRecord('postType', template.type, template.id);
        }
        createSuccessNotice(items.length > 1 ? sprintf( /* translators: The number of items. */
        __('%s items reset.'), items.length) : sprintf( /* translators: The template/part's name. */
        __('"%s" reset.'), getItemTitle(items[0])), {
          type: 'snackbar',
          id: 'revert-template-action'
        });
      } catch (error) {
        let fallbackErrorMessage;
        if (items[0].type === TEMPLATE_POST_TYPE) {
          fallbackErrorMessage = items.length === 1 ? __('An error occurred while reverting the template.') : __('An error occurred while reverting the templates.');
        } else {
          fallbackErrorMessage = items.length === 1 ? __('An error occurred while reverting the template part.') : __('An error occurred while reverting the template parts.');
        }
        const typedError = error;
        const errorMessage = typedError.message && typedError.code !== 'unknown_error' ? typedError.message : fallbackErrorMessage;
        createErrorNotice(errorMessage, {
          type: 'snackbar'
        });
      }
    };
    return /*#__PURE__*/_jsxs(VStack, {
      spacing: "5",
      children: [/*#__PURE__*/_jsx(Text, {
        children: __('Reset to default and clear all customizations?')
      }), /*#__PURE__*/_jsxs(HStack, {
        justify: "right",
        children: [/*#__PURE__*/_jsx(Button
        // TODO: Switch to `true` (40px size) if possible
        , {
          __next40pxDefaultSize: false,
          variant: "tertiary",
          onClick: closeModal,
          disabled: isBusy,
          accessibleWhenDisabled: true,
          children: __('Cancel')
        }), /*#__PURE__*/_jsx(Button
        // TODO: Switch to `true` (40px size) if possible
        , {
          __next40pxDefaultSize: false,
          variant: "primary",
          onClick: async () => {
            setIsBusy(true);
            await onConfirm();
            onActionPerformed?.(items);
            setIsBusy(false);
            closeModal?.();
          },
          isBusy: isBusy,
          disabled: isBusy,
          accessibleWhenDisabled: true,
          children: __('Reset')
        })]
      })]
    });
  }
};
export default resetPost;
//# sourceMappingURL=reset-post.js.map