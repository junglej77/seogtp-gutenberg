/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from '@wordpress/data';
import { __, _x } from '@wordpress/i18n';
import { Modal, Button, __experimentalHStack as HStack, __experimentalVStack as VStack, ToggleControl, TextControl } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import { store as editorStore } from '@wordpress/editor';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
export default function InitPatternModal() {
  const {
    editPost
  } = useDispatch(editorStore);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [syncType, setSyncType] = useState(undefined);
  const [title, setTitle] = useState('');
  const {
    postType,
    isNewPost
  } = useSelect(select => {
    const {
      getEditedPostAttribute,
      isCleanNewPost
    } = select(editorStore);
    return {
      postType: getEditedPostAttribute('type'),
      isNewPost: isCleanNewPost()
    };
  }, []);
  useEffect(() => {
    if (isNewPost && postType === 'wp_block') {
      setIsModalOpen(true);
    }
    // We only want the modal to open when the page is first loaded.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (postType !== 'wp_block' || !isNewPost) {
    return null;
  }
  return /*#__PURE__*/_jsx(_Fragment, {
    children: isModalOpen && /*#__PURE__*/_jsx(Modal, {
      title: __('Create pattern'),
      onRequestClose: () => {
        setIsModalOpen(false);
      },
      overlayClassName: "reusable-blocks-menu-items__convert-modal",
      children: /*#__PURE__*/_jsx("form", {
        onSubmit: event => {
          event.preventDefault();
          setIsModalOpen(false);
          editPost({
            title,
            meta: {
              wp_pattern_sync_status: syncType
            }
          });
        },
        children: /*#__PURE__*/_jsxs(VStack, {
          spacing: "5",
          children: [/*#__PURE__*/_jsx(TextControl, {
            label: __('Name'),
            value: title,
            onChange: setTitle,
            placeholder: __('My pattern'),
            className: "patterns-create-modal__name-input",
            __nextHasNoMarginBottom: true,
            __next40pxDefaultSize: true
          }), /*#__PURE__*/_jsx(ToggleControl, {
            __nextHasNoMarginBottom: true,
            label: _x('Synced', 'pattern (singular)'),
            help: __('Sync this pattern across multiple locations.'),
            checked: !syncType,
            onChange: () => {
              setSyncType(!syncType ? 'unsynced' : undefined);
            }
          }), /*#__PURE__*/_jsx(HStack, {
            justify: "right",
            children: /*#__PURE__*/_jsx(Button
            // TODO: Switch to `true` (40px size) if possible
            , {
              __next40pxDefaultSize: false,
              variant: "primary",
              type: "submit",
              disabled: !title,
              accessibleWhenDisabled: true,
              children: __('Create')
            })
          })]
        })
      })
    })
  });
}
//# sourceMappingURL=index.js.map