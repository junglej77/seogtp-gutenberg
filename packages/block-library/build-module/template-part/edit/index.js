/**
 * WordPress dependencies
 */
import { serialize } from '@wordpress/blocks';
import { useSelect, useDispatch } from '@wordpress/data';
import { BlockSettingsMenuControls, useBlockProps, Warning, store as blockEditorStore, RecursionProvider, useHasRecursion, InspectorControls, __experimentalBlockPatternsList as BlockPatternsList, BlockControls } from '@wordpress/block-editor';
import { PanelBody, Spinner, Modal, MenuItem, ToolbarButton } from '@wordpress/components';
import { useAsyncList } from '@wordpress/compose';
import { __, sprintf } from '@wordpress/i18n';
import { store as coreStore } from '@wordpress/core-data';
import { useState } from '@wordpress/element';
import { store as noticesStore } from '@wordpress/notices';

/**
 * Internal dependencies
 */
import TemplatePartPlaceholder from './placeholder';
import TemplatePartSelectionModal from './selection-modal';
import { TemplatePartAdvancedControls } from './advanced-controls';
import TemplatePartInnerBlocks from './inner-blocks';
import { createTemplatePartId } from './utils/create-template-part-id';
import { useAlternativeBlockPatterns, useAlternativeTemplateParts, useTemplatePartArea } from './utils/hooks';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
function ReplaceButton({
  isEntityAvailable,
  area,
  templatePartId,
  isTemplatePartSelectionOpen,
  setIsTemplatePartSelectionOpen
}) {
  // This hook fetches patterns, so don't run it unconditionally in the main
  // edit function!
  const {
    templateParts
  } = useAlternativeTemplateParts(area, templatePartId);
  const hasReplacements = !!templateParts.length;
  const canReplace = isEntityAvailable && hasReplacements && (area === 'header' || area === 'footer');
  if (!canReplace) {
    return null;
  }
  return /*#__PURE__*/_jsx(MenuItem, {
    onClick: () => {
      setIsTemplatePartSelectionOpen(true);
    },
    "aria-expanded": isTemplatePartSelectionOpen,
    "aria-haspopup": "dialog",
    children: __('Replace')
  });
}
function TemplatesList({
  area,
  clientId,
  isEntityAvailable,
  onSelect
}) {
  // This hook fetches patterns, so don't run it unconditionally in the main
  // edit function!
  const blockPatterns = useAlternativeBlockPatterns(area, clientId);
  const canReplace = isEntityAvailable && !!blockPatterns.length && (area === 'header' || area === 'footer');
  const shownTemplates = useAsyncList(blockPatterns);
  if (!canReplace) {
    return null;
  }
  return /*#__PURE__*/_jsx(PanelBody, {
    title: __('Design'),
    children: /*#__PURE__*/_jsx(BlockPatternsList, {
      label: __('Templates'),
      blockPatterns: blockPatterns,
      shownPatterns: shownTemplates,
      onClickPattern: onSelect,
      showTitle: false
    })
  });
}
export default function TemplatePartEdit({
  attributes,
  setAttributes,
  clientId
}) {
  const {
    createSuccessNotice
  } = useDispatch(noticesStore);
  const {
    editEntityRecord
  } = useDispatch(coreStore);
  const currentTheme = useSelect(select => select(coreStore).getCurrentTheme()?.stylesheet, []);
  const {
    slug,
    theme = currentTheme,
    tagName,
    layout = {}
  } = attributes;
  const templatePartId = createTemplatePartId(theme, slug);
  const hasAlreadyRendered = useHasRecursion(templatePartId);
  const [isTemplatePartSelectionOpen, setIsTemplatePartSelectionOpen] = useState(false);
  const {
    isResolved,
    hasInnerBlocks,
    isMissing,
    area,
    onNavigateToEntityRecord,
    title,
    canUserEdit
  } = useSelect(select => {
    const {
      getEditedEntityRecord,
      hasFinishedResolution
    } = select(coreStore);
    const {
      getBlockCount,
      getSettings
    } = select(blockEditorStore);
    const getEntityArgs = ['postType', 'wp_template_part', templatePartId];
    const entityRecord = templatePartId ? getEditedEntityRecord(...getEntityArgs) : null;
    const _area = entityRecord?.area || attributes.area;
    const hasResolvedEntity = templatePartId ? hasFinishedResolution('getEditedEntityRecord', getEntityArgs) : false;
    const _canUserEdit = hasResolvedEntity ? select(coreStore).canUser('update', {
      kind: 'postType',
      name: 'wp_template_part',
      id: templatePartId
    }) : false;
    return {
      hasInnerBlocks: getBlockCount(clientId) > 0,
      isResolved: hasResolvedEntity,
      isMissing: hasResolvedEntity && (!entityRecord || Object.keys(entityRecord).length === 0),
      area: _area,
      onNavigateToEntityRecord: getSettings().onNavigateToEntityRecord,
      title: entityRecord?.title,
      canUserEdit: !!_canUserEdit
    };
  }, [templatePartId, attributes.area, clientId]);
  const areaObject = useTemplatePartArea(area);
  const blockProps = useBlockProps();
  const isPlaceholder = !slug;
  const isEntityAvailable = !isPlaceholder && !isMissing && isResolved;
  const TagName = tagName || areaObject.tagName;
  const onPatternSelect = async pattern => {
    await editEntityRecord('postType', 'wp_template_part', templatePartId, {
      blocks: pattern.blocks,
      content: serialize(pattern.blocks)
    });
    createSuccessNotice(sprintf( /* translators: %s: template part title. */
    __('Template Part "%s" updated.'), title || slug), {
      type: 'snackbar'
    });
  };

  // We don't want to render a missing state if we have any inner blocks.
  // A new template part is automatically created if we have any inner blocks but no entity.
  if (!hasInnerBlocks && (slug && !theme || slug && isMissing)) {
    return /*#__PURE__*/_jsx(TagName, {
      ...blockProps,
      children: /*#__PURE__*/_jsx(Warning, {
        children: sprintf( /* translators: %s: Template part slug */
        __('Template part has been deleted or is unavailable: %s'), slug)
      })
    });
  }
  if (isEntityAvailable && hasAlreadyRendered) {
    return /*#__PURE__*/_jsx(TagName, {
      ...blockProps,
      children: /*#__PURE__*/_jsx(Warning, {
        children: __('Block cannot be rendered inside itself.')
      })
    });
  }
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs(RecursionProvider, {
      uniqueId: templatePartId,
      children: [isEntityAvailable && onNavigateToEntityRecord && canUserEdit && /*#__PURE__*/_jsx(BlockControls, {
        group: "other",
        children: /*#__PURE__*/_jsx(ToolbarButton, {
          onClick: () => onNavigateToEntityRecord({
            postId: templatePartId,
            postType: 'wp_template_part'
          }),
          children: __('Edit')
        })
      }), canUserEdit && /*#__PURE__*/_jsx(InspectorControls, {
        group: "advanced",
        children: /*#__PURE__*/_jsx(TemplatePartAdvancedControls, {
          tagName: tagName,
          setAttributes: setAttributes,
          isEntityAvailable: isEntityAvailable,
          templatePartId: templatePartId,
          defaultWrapper: areaObject.tagName,
          hasInnerBlocks: hasInnerBlocks
        })
      }), isPlaceholder && /*#__PURE__*/_jsx(TagName, {
        ...blockProps,
        children: /*#__PURE__*/_jsx(TemplatePartPlaceholder, {
          area: attributes.area,
          templatePartId: templatePartId,
          clientId: clientId,
          setAttributes: setAttributes,
          onOpenSelectionModal: () => setIsTemplatePartSelectionOpen(true)
        })
      }), /*#__PURE__*/_jsx(BlockSettingsMenuControls, {
        children: ({
          selectedClientIds
        }) => {
          // Only enable for single selection that matches the current block.
          // Ensures menu item doesn't render multiple times.
          if (!(selectedClientIds.length === 1 && clientId === selectedClientIds[0])) {
            return null;
          }
          return /*#__PURE__*/_jsx(ReplaceButton, {
            isEntityAvailable,
            area,
            clientId,
            templatePartId,
            isTemplatePartSelectionOpen,
            setIsTemplatePartSelectionOpen
          });
        }
      }), /*#__PURE__*/_jsx(InspectorControls, {
        children: /*#__PURE__*/_jsx(TemplatesList, {
          area: area,
          clientId: clientId,
          isEntityAvailable: isEntityAvailable,
          onSelect: pattern => onPatternSelect(pattern)
        })
      }), isEntityAvailable && /*#__PURE__*/_jsx(TemplatePartInnerBlocks, {
        tagName: TagName,
        blockProps: blockProps,
        postId: templatePartId,
        hasInnerBlocks: hasInnerBlocks,
        layout: layout
      }), !isPlaceholder && !isResolved && /*#__PURE__*/_jsx(TagName, {
        ...blockProps,
        children: /*#__PURE__*/_jsx(Spinner, {})
      })]
    }), isTemplatePartSelectionOpen && /*#__PURE__*/_jsx(Modal, {
      overlayClassName: "block-editor-template-part__selection-modal",
      title: sprintf(
      // Translators: %s as template part area title ("Header", "Footer", etc.).
      __('Choose a %s'), areaObject.label.toLowerCase()),
      onRequestClose: () => setIsTemplatePartSelectionOpen(false),
      isFullScreen: true,
      children: /*#__PURE__*/_jsx(TemplatePartSelectionModal, {
        templatePartId: templatePartId,
        clientId: clientId,
        area: area,
        setAttributes: setAttributes,
        onClose: () => setIsTemplatePartSelectionOpen(false)
      })
    })]
  });
}
//# sourceMappingURL=index.js.map