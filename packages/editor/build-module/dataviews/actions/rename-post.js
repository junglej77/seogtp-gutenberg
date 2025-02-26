/**
 * WordPress dependencies
 */
import { useDispatch } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
// @ts-ignore
import { privateApis as patternsPrivateApis } from '@wordpress/patterns';
import { Button, TextControl, __experimentalHStack as HStack, __experimentalVStack as VStack } from '@wordpress/components';
import { store as noticesStore } from '@wordpress/notices';

/**
 * Internal dependencies
 */
import { TEMPLATE_ORIGINS, TEMPLATE_PART_POST_TYPE, TEMPLATE_POST_TYPE } from '../../store/constants';
import { unlock } from '../../lock-unlock';
import { getItemTitle, isTemplateRemovable, isTemplate, isTemplatePart } from './utils';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
// Patterns.
const {
  PATTERN_TYPES
} = unlock(patternsPrivateApis);
const renamePost = {
  id: 'rename-post',
  label: __('Rename'),
  isEligible(post) {
    if (post.status === 'trash') {
      return false;
    }
    // Templates, template parts and patterns have special checks for renaming.
    if (![TEMPLATE_POST_TYPE, TEMPLATE_PART_POST_TYPE, ...Object.values(PATTERN_TYPES)].includes(post.type)) {
      return post.permissions?.update;
    }

    // In the case of templates, we can only rename custom templates.
    if (isTemplate(post)) {
      return isTemplateRemovable(post) && post.is_custom && post.permissions?.update;
    }
    if (isTemplatePart(post)) {
      return post.source === TEMPLATE_ORIGINS.custom && !post?.has_theme_file && post.permissions?.update;
    }
    return post.type === PATTERN_TYPES.user && post.permissions?.update;
  },
  RenderModal: ({
    items,
    closeModal,
    onActionPerformed
  }) => {
    const [item] = items;
    const [title, setTitle] = useState(() => getItemTitle(item));
    const {
      editEntityRecord,
      saveEditedEntityRecord
    } = useDispatch(coreStore);
    const {
      createSuccessNotice,
      createErrorNotice
    } = useDispatch(noticesStore);
    async function onRename(event) {
      event.preventDefault();
      try {
        await editEntityRecord('postType', item.type, item.id, {
          title
        });
        // Update state before saving rerenders the list.
        setTitle('');
        closeModal?.();
        // Persist edited entity.
        await saveEditedEntityRecord('postType', item.type, item.id, {
          throwOnError: true
        });
        createSuccessNotice(__('Name updated'), {
          type: 'snackbar'
        });
        onActionPerformed?.(items);
      } catch (error) {
        const typedError = error;
        const errorMessage = typedError.message && typedError.code !== 'unknown_error' ? typedError.message : __('An error occurred while updating the name');
        createErrorNotice(errorMessage, {
          type: 'snackbar'
        });
      }
    }
    return /*#__PURE__*/_jsx("form", {
      onSubmit: onRename,
      children: /*#__PURE__*/_jsxs(VStack, {
        spacing: "5",
        children: [/*#__PURE__*/_jsx(TextControl, {
          __nextHasNoMarginBottom: true,
          __next40pxDefaultSize: true,
          label: __('Name'),
          value: title,
          onChange: setTitle,
          required: true
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
            children: __('Save')
          })]
        })]
      })
    });
  }
};
export default renamePost;
//# sourceMappingURL=rename-post.js.map