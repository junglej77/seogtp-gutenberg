/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelBody, __experimentalText as Text, Dropdown, Button, __experimentalVStack as VStack } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { useMemo, useState } from '@wordpress/element';
import { __experimentalInspectorPopoverHeader as InspectorPopoverHeader } from '@wordpress/block-editor';
import { store as coreStore } from '@wordpress/core-data';
import { decodeEntities } from '@wordpress/html-entities';

/**
 * Internal dependencies
 */
import PostExcerptForm from './index';
import PostExcerptCheck from './check';
import PluginPostExcerpt from './plugin';
import { TEMPLATE_ORIGINS } from '../../store/constants';
import { store as editorStore } from '../../store';

/**
 * Module Constants
 */
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const PANEL_NAME = 'post-excerpt';
function ExcerptPanel() {
  const {
    isOpened,
    isEnabled,
    postType
  } = useSelect(select => {
    const {
      isEditorPanelOpened,
      isEditorPanelEnabled,
      getCurrentPostType
    } = select(editorStore);
    return {
      isOpened: isEditorPanelOpened(PANEL_NAME),
      isEnabled: isEditorPanelEnabled(PANEL_NAME),
      postType: getCurrentPostType()
    };
  }, []);
  const {
    toggleEditorPanelOpened
  } = useDispatch(editorStore);
  const toggleExcerptPanel = () => toggleEditorPanelOpened(PANEL_NAME);
  if (!isEnabled) {
    return null;
  }

  // There are special cases where we want to label the excerpt as a description.
  const shouldUseDescriptionLabel = ['wp_template', 'wp_template_part', 'wp_block'].includes(postType);
  return /*#__PURE__*/_jsx(PanelBody, {
    title: shouldUseDescriptionLabel ? __('Description') : __('Excerpt'),
    opened: isOpened,
    onToggle: toggleExcerptPanel,
    children: /*#__PURE__*/_jsx(PluginPostExcerpt.Slot, {
      children: fills => /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(PostExcerptForm, {}), fills]
      })
    })
  });
}

/**
 * Is rendered if the post type supports excerpts and allows editing the excerpt.
 *
 * @return {JSX.Element} The rendered PostExcerptPanel component.
 */
export default function PostExcerptPanel() {
  return /*#__PURE__*/_jsx(PostExcerptCheck, {
    children: /*#__PURE__*/_jsx(ExcerptPanel, {})
  });
}
export function PrivatePostExcerptPanel() {
  return /*#__PURE__*/_jsx(PostExcerptCheck, {
    children: /*#__PURE__*/_jsx(PrivateExcerpt, {})
  });
}
function PrivateExcerpt() {
  const {
    shouldRender,
    excerpt,
    shouldBeUsedAsDescription,
    allowEditing
  } = useSelect(select => {
    const {
      getCurrentPostType,
      getCurrentPostId,
      getEditedPostAttribute,
      isEditorPanelEnabled
    } = select(editorStore);
    const postType = getCurrentPostType();
    const isTemplateOrTemplatePart = ['wp_template', 'wp_template_part'].includes(postType);
    const isPattern = postType === 'wp_block';
    // These post types use the `excerpt` field as a description semantically, so we need to
    // handle proper labeling and some flows where we should always render them as text.
    const _shouldBeUsedAsDescription = isTemplateOrTemplatePart || isPattern;
    const _usedAttribute = isTemplateOrTemplatePart ? 'description' : 'excerpt';
    // We need to fetch the entity in this case to check if we'll allow editing.
    const template = isTemplateOrTemplatePart && select(coreStore).getEntityRecord('postType', postType, getCurrentPostId());
    // For post types that use excerpt as description, we do not abide
    // by the `isEnabled` panel flag in order to render them as text.
    const _shouldRender = isEditorPanelEnabled(PANEL_NAME) || _shouldBeUsedAsDescription;
    return {
      excerpt: getEditedPostAttribute(_usedAttribute),
      shouldRender: _shouldRender,
      shouldBeUsedAsDescription: _shouldBeUsedAsDescription,
      // If we should render, allow editing for all post types that are not used as description.
      // For the rest allow editing only for user generated entities.
      allowEditing: _shouldRender && (!_shouldBeUsedAsDescription || isPattern || template && template.source === TEMPLATE_ORIGINS.custom && !template.has_theme_file && template.is_custom)
    };
  }, []);
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const label = shouldBeUsedAsDescription ? __('Description') : __('Excerpt');
  // Memoize popoverProps to avoid returning a new object every time.
  const popoverProps = useMemo(() => ({
    // Anchor the popover to the middle of the entire row so that it doesn't
    // move around when the label changes.
    anchor: popoverAnchor,
    'aria-label': label,
    headerTitle: label,
    placement: 'left-start',
    offset: 36,
    shift: true
  }), [popoverAnchor, label]);
  if (!shouldRender) {
    return false;
  }
  const excerptText = !!excerpt && /*#__PURE__*/_jsx(Text, {
    align: "left",
    numberOfLines: 4,
    truncate: allowEditing,
    children: decodeEntities(excerpt)
  });
  if (!allowEditing) {
    return excerptText;
  }
  const excerptPlaceholder = shouldBeUsedAsDescription ? __('Add a description…') : __('Add an excerpt…');
  const triggerEditLabel = shouldBeUsedAsDescription ? __('Edit description') : __('Edit excerpt');
  return /*#__PURE__*/_jsxs(VStack, {
    children: [excerptText, /*#__PURE__*/_jsx(Dropdown, {
      className: "editor-post-excerpt__dropdown",
      contentClassName: "editor-post-excerpt__dropdown__content",
      popoverProps: popoverProps,
      focusOnMount: true,
      ref: setPopoverAnchor,
      renderToggle: ({
        onToggle
      }) => /*#__PURE__*/_jsx(Button
      // TODO: Switch to `true` (40px size) if possible
      , {
        __next40pxDefaultSize: false,
        className: "editor-post-excerpt__dropdown__trigger",
        onClick: onToggle,
        variant: "link",
        children: excerptText ? triggerEditLabel : excerptPlaceholder
      }),
      renderContent: ({
        onClose
      }) => /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(InspectorPopoverHeader, {
          title: label,
          onClose: onClose
        }), /*#__PURE__*/_jsx(VStack, {
          spacing: 4,
          children: /*#__PURE__*/_jsx(PluginPostExcerpt.Slot, {
            children: fills => /*#__PURE__*/_jsxs(_Fragment, {
              children: [/*#__PURE__*/_jsx(PostExcerptForm, {
                hideLabelFromVision: true,
                updateOnBlur: true
              }), fills]
            })
          })
        })]
      })
    })]
  });
}
//# sourceMappingURL=panel.js.map