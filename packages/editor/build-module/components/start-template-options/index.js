/**
 * WordPress dependencies
 */
import { Modal, Flex, FlexItem, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState, useMemo, useEffect } from '@wordpress/element';
import { __experimentalBlockPatternsList as BlockPatternsList } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { useAsyncList } from '@wordpress/compose';
import { parse } from '@wordpress/blocks';
import { store as coreStore, useEntityBlockEditor } from '@wordpress/core-data';

/**
 * Internal dependencies
 */
import { store as editorStore } from '../../store';
import { TEMPLATE_POST_TYPE } from '../../store/constants';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function useFallbackTemplateContent(slug, isCustom = false) {
  return useSelect(select => {
    const {
      getEntityRecord,
      getDefaultTemplateId
    } = select(coreStore);
    const templateId = getDefaultTemplateId({
      slug,
      is_custom: isCustom,
      ignore_empty: true
    });
    return templateId ? getEntityRecord('postType', TEMPLATE_POST_TYPE, templateId)?.content?.raw : undefined;
  }, [slug, isCustom]);
}
function useStartPatterns(fallbackContent) {
  const {
    slug,
    patterns
  } = useSelect(select => {
    const {
      getCurrentPostType,
      getCurrentPostId
    } = select(editorStore);
    const {
      getEntityRecord,
      getBlockPatterns
    } = select(coreStore);
    const postId = getCurrentPostId();
    const postType = getCurrentPostType();
    const record = getEntityRecord('postType', postType, postId);
    return {
      slug: record.slug,
      patterns: getBlockPatterns()
    };
  }, []);
  const currentThemeStylesheet = useSelect(select => select(coreStore).getCurrentTheme().stylesheet);

  // Duplicated from packages/block-library/src/pattern/edit.js.
  function injectThemeAttributeInBlockTemplateContent(block) {
    if (block.innerBlocks.find(innerBlock => innerBlock.name === 'core/template-part')) {
      block.innerBlocks = block.innerBlocks.map(innerBlock => {
        if (innerBlock.name === 'core/template-part' && innerBlock.attributes.theme === undefined) {
          innerBlock.attributes.theme = currentThemeStylesheet;
        }
        return innerBlock;
      });
    }
    if (block.name === 'core/template-part' && block.attributes.theme === undefined) {
      block.attributes.theme = currentThemeStylesheet;
    }
    return block;
  }
  return useMemo(() => {
    // filter patterns that are supposed to be used in the current template being edited.
    return [{
      name: 'fallback',
      blocks: parse(fallbackContent),
      title: __('Fallback content')
    }, ...patterns.filter(pattern => {
      return Array.isArray(pattern.templateTypes) && pattern.templateTypes.some(templateType => slug.startsWith(templateType));
    }).map(pattern => {
      return {
        ...pattern,
        blocks: parse(pattern.content).map(block => injectThemeAttributeInBlockTemplateContent(block))
      };
    })];
  }, [fallbackContent, slug, patterns]);
}
function PatternSelection({
  fallbackContent,
  onChoosePattern,
  postType
}) {
  const [,, onChange] = useEntityBlockEditor('postType', postType);
  const blockPatterns = useStartPatterns(fallbackContent);
  const shownBlockPatterns = useAsyncList(blockPatterns);
  return /*#__PURE__*/_jsx(BlockPatternsList, {
    blockPatterns: blockPatterns,
    shownPatterns: shownBlockPatterns,
    onClickPattern: (pattern, blocks) => {
      onChange(blocks, {
        selection: undefined
      });
      onChoosePattern();
    }
  });
}
function StartModal({
  slug,
  isCustom,
  onClose,
  postType
}) {
  const fallbackContent = useFallbackTemplateContent(slug, isCustom);
  if (!fallbackContent) {
    return null;
  }
  return /*#__PURE__*/_jsxs(Modal, {
    className: "editor-start-template-options__modal",
    title: __('Choose a pattern'),
    closeLabel: __('Cancel'),
    focusOnMount: "firstElement",
    onRequestClose: onClose,
    isFullScreen: true,
    children: [/*#__PURE__*/_jsx("div", {
      className: "editor-start-template-options__modal-content",
      children: /*#__PURE__*/_jsx(PatternSelection, {
        fallbackContent: fallbackContent,
        slug: slug,
        isCustom: isCustom,
        postType: postType,
        onChoosePattern: () => {
          onClose();
        }
      })
    }), /*#__PURE__*/_jsx(Flex, {
      className: "editor-start-template-options__modal__actions",
      justify: "flex-end",
      expanded: false,
      children: /*#__PURE__*/_jsx(FlexItem, {
        children: /*#__PURE__*/_jsx(Button
        // TODO: Switch to `true` (40px size) if possible
        , {
          __next40pxDefaultSize: false,
          variant: "tertiary",
          onClick: onClose,
          children: __('Skip')
        })
      })
    })]
  });
}
export default function StartTemplateOptions() {
  const [isClosed, setIsClosed] = useState(false);
  const {
    shouldOpenModal,
    slug,
    isCustom,
    postType,
    postId
  } = useSelect(select => {
    const {
      getCurrentPostType,
      getCurrentPostId
    } = select(editorStore);
    const _postType = getCurrentPostType();
    const _postId = getCurrentPostId();
    const {
      getEditedEntityRecord,
      hasEditsForEntityRecord
    } = select(coreStore);
    const templateRecord = getEditedEntityRecord('postType', _postType, _postId);
    const hasEdits = hasEditsForEntityRecord('postType', _postType, _postId);
    return {
      shouldOpenModal: !hasEdits && '' === templateRecord.content && TEMPLATE_POST_TYPE === _postType,
      slug: templateRecord.slug,
      isCustom: templateRecord.is_custom,
      postType: _postType,
      postId: _postId
    };
  }, []);
  useEffect(() => {
    // Should reset the modal state when navigating to a new page/post.
    setIsClosed(false);
  }, [postType, postId]);
  if (!shouldOpenModal || isClosed) {
    return null;
  }
  return /*#__PURE__*/_jsx(StartModal, {
    slug: slug,
    isCustom: isCustom,
    postType: postType,
    onClose: () => setIsClosed(true)
  });
}
//# sourceMappingURL=index.js.map