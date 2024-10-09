/**
 * WordPress dependencies
 */
import { Button, Modal, __experimentalHStack as HStack, __experimentalVStack as VStack, TextControl } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';
import { useDispatch, useRegistry, useSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { store as coreStore } from '@wordpress/core-data';
import { store as noticesStore } from '@wordpress/notices';
import { decodeEntities } from '@wordpress/html-entities';
import { serialize, synchronizeBlocksWithTemplate } from '@wordpress/blocks';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function AddNewPostModal({
  postType,
  onSave,
  onClose
}) {
  const labels = useSelect(select => select(coreStore).getPostType(postType)?.labels, [postType]);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [title, setTitle] = useState('');
  const {
    saveEntityRecord
  } = useDispatch(coreStore);
  const {
    createErrorNotice,
    createSuccessNotice
  } = useDispatch(noticesStore);
  const {
    resolveSelect
  } = useRegistry();
  async function createPost(event) {
    event.preventDefault();
    if (isCreatingPost) {
      return;
    }
    setIsCreatingPost(true);
    try {
      const postTypeObject = await resolveSelect(coreStore).getPostType(postType);
      const newPage = await saveEntityRecord('postType', postType, {
        status: 'draft',
        title,
        slug: title || __('No title'),
        content: !!postTypeObject.template && postTypeObject.template.length ? serialize(synchronizeBlocksWithTemplate([], postTypeObject.template)) : undefined
      }, {
        throwOnError: true
      });
      onSave(newPage);
      createSuccessNotice(sprintf(
      // translators: %s: Title of the created post e.g: "Hello world".
      __('"%s" successfully created.'), decodeEntities(newPage.title?.rendered || title)), {
        type: 'snackbar'
      });
    } catch (error) {
      const errorMessage = error.message && error.code !== 'unknown_error' ? error.message : __('An error occurred while creating the item.');
      createErrorNotice(errorMessage, {
        type: 'snackbar'
      });
    } finally {
      setIsCreatingPost(false);
    }
  }
  return /*#__PURE__*/_jsx(Modal, {
    title:
    // translators: %s: post type singular_name label e.g: "Page".
    sprintf(__('Draft new: %s'), labels?.singular_name),
    onRequestClose: onClose,
    focusOnMount: "firstContentElement",
    size: "small",
    children: /*#__PURE__*/_jsx("form", {
      onSubmit: createPost,
      children: /*#__PURE__*/_jsxs(VStack, {
        spacing: 4,
        children: [/*#__PURE__*/_jsx(TextControl, {
          __next40pxDefaultSize: true,
          __nextHasNoMarginBottom: true,
          label: __('Title'),
          onChange: setTitle,
          placeholder: __('No title'),
          value: title
        }), /*#__PURE__*/_jsxs(HStack, {
          spacing: 2,
          justify: "end",
          children: [/*#__PURE__*/_jsx(Button, {
            __next40pxDefaultSize: true,
            variant: "tertiary",
            onClick: onClose,
            children: __('Cancel')
          }), /*#__PURE__*/_jsx(Button, {
            __next40pxDefaultSize: true,
            variant: "primary",
            type: "submit",
            isBusy: isCreatingPost,
            "aria-disabled": isCreatingPost,
            children: __('Create draft')
          })]
        })]
      })
    })
  });
}
//# sourceMappingURL=index.js.map