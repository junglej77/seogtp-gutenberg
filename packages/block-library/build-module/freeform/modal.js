/**
 * WordPress dependencies
 */
import { BlockControls, store } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton, Modal, Button, Flex, FlexItem } from '@wordpress/components';
import { useEffect, useState, RawHTML } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { fullscreen } from '@wordpress/icons';
import { useViewportMatch } from '@wordpress/compose';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
function ModalAuxiliaryActions({
  onClick,
  isModalFullScreen
}) {
  // 'small' to match the rules in editor.scss.
  const isMobileViewport = useViewportMatch('small', '<');
  if (isMobileViewport) {
    return null;
  }
  return /*#__PURE__*/_jsx(Button
  // TODO: Switch to `true` (40px size) if possible
  , {
    __next40pxDefaultSize: false,
    onClick: onClick,
    icon: fullscreen,
    isPressed: isModalFullScreen,
    label: isModalFullScreen ? __('Exit fullscreen') : __('Enter fullscreen')
  });
}
function ClassicEdit(props) {
  const styles = useSelect(select => select(store).getSettings().styles);
  useEffect(() => {
    const {
      baseURL,
      suffix,
      settings
    } = window.wpEditorL10n.tinymce;
    window.tinymce.EditorManager.overrideDefaults({
      base_url: baseURL,
      suffix
    });
    window.wp.oldEditor.initialize(props.id, {
      tinymce: {
        ...settings,
        setup(editor) {
          editor.on('init', () => {
            const doc = editor.getDoc();
            styles.forEach(({
              css
            }) => {
              const styleEl = doc.createElement('style');
              styleEl.innerHTML = css;
              doc.head.appendChild(styleEl);
            });
          });
        }
      }
    });
    return () => {
      window.wp.oldEditor.remove(props.id);
    };
  }, []);
  return /*#__PURE__*/_jsx("textarea", {
    ...props
  });
}
export default function ModalEdit(props) {
  const {
    clientId,
    attributes: {
      content
    },
    setAttributes,
    onReplace
  } = props;
  const [isOpen, setOpen] = useState(false);
  const [isModalFullScreen, setIsModalFullScreen] = useState(false);
  const id = `editor-${clientId}`;
  const onClose = () => content ? setOpen(false) : onReplace([]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(BlockControls, {
      children: /*#__PURE__*/_jsx(ToolbarGroup, {
        children: /*#__PURE__*/_jsx(ToolbarButton, {
          onClick: () => setOpen(true),
          children: __('Edit')
        })
      })
    }), content && /*#__PURE__*/_jsx(RawHTML, {
      children: content
    }), (isOpen || !content) && /*#__PURE__*/_jsxs(Modal, {
      title: __('Classic Editor'),
      onRequestClose: onClose,
      shouldCloseOnClickOutside: false,
      overlayClassName: "block-editor-freeform-modal",
      isFullScreen: isModalFullScreen,
      className: "block-editor-freeform-modal__content",
      headerActions: /*#__PURE__*/_jsx(ModalAuxiliaryActions, {
        onClick: () => setIsModalFullScreen(!isModalFullScreen),
        isModalFullScreen: isModalFullScreen
      }),
      children: [/*#__PURE__*/_jsx(ClassicEdit, {
        id: id,
        defaultValue: content
      }), /*#__PURE__*/_jsxs(Flex, {
        className: "block-editor-freeform-modal__actions",
        justify: "flex-end",
        expanded: false,
        children: [/*#__PURE__*/_jsx(FlexItem, {
          children: /*#__PURE__*/_jsx(Button, {
            __next40pxDefaultSize: true,
            variant: "tertiary",
            onClick: onClose,
            children: __('Cancel')
          })
        }), /*#__PURE__*/_jsx(FlexItem, {
          children: /*#__PURE__*/_jsx(Button, {
            __next40pxDefaultSize: true,
            variant: "primary",
            onClick: () => {
              setAttributes({
                content: window.wp.oldEditor.getContent(id)
              });
              setOpen(false);
            },
            children: __('Save')
          })
        })]
      })]
    })]
  });
}
//# sourceMappingURL=modal.js.map