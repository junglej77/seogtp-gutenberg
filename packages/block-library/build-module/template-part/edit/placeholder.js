/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Placeholder, Button, Spinner } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

/**
 * Internal dependencies
 */
import { useAlternativeBlockPatterns, useAlternativeTemplateParts, useCreateTemplatePartFromBlocks, useTemplatePartArea } from './utils/hooks';
import TitleModal from './title-modal';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function TemplatePartPlaceholder({
  area,
  clientId,
  templatePartId,
  onOpenSelectionModal,
  setAttributes
}) {
  const {
    templateParts,
    isResolving
  } = useAlternativeTemplateParts(area, templatePartId);
  const blockPatterns = useAlternativeBlockPatterns(area, clientId);
  const {
    isBlockBasedTheme,
    canCreateTemplatePart
  } = useSelect(select => {
    const {
      getCurrentTheme,
      canUser
    } = select(coreStore);
    return {
      isBlockBasedTheme: getCurrentTheme()?.is_block_theme,
      canCreateTemplatePart: canUser('create', {
        kind: 'postType',
        name: 'wp_template_part'
      })
    };
  }, []);
  const [showTitleModal, setShowTitleModal] = useState(false);
  const areaObject = useTemplatePartArea(area);
  const createFromBlocks = useCreateTemplatePartFromBlocks(area, setAttributes);
  return /*#__PURE__*/_jsxs(Placeholder, {
    icon: areaObject.icon,
    label: areaObject.label,
    instructions: isBlockBasedTheme ? sprintf(
    // Translators: %s as template part area title ("Header", "Footer", etc.).
    __('Choose an existing %s or create a new one.'), areaObject.label.toLowerCase()) : sprintf(
    // Translators: %s as template part area title ("Header", "Footer", etc.).
    __('Choose an existing %s.'), areaObject.label.toLowerCase()),
    children: [isResolving && /*#__PURE__*/_jsx(Spinner, {}), !isResolving && !!(templateParts.length || blockPatterns.length) && /*#__PURE__*/_jsx(Button
    // TODO: Switch to `true` (40px size) if possible
    , {
      __next40pxDefaultSize: false,
      variant: "primary",
      onClick: onOpenSelectionModal,
      children: __('Choose')
    }), !isResolving && isBlockBasedTheme && canCreateTemplatePart && /*#__PURE__*/_jsx(Button
    // TODO: Switch to `true` (40px size) if possible
    , {
      __next40pxDefaultSize: false,
      variant: "secondary",
      onClick: () => {
        setShowTitleModal(true);
      },
      children: __('Start blank')
    }), showTitleModal && /*#__PURE__*/_jsx(TitleModal, {
      areaLabel: areaObject.label,
      onClose: () => setShowTitleModal(false),
      onSubmit: title => {
        createFromBlocks([], title);
      }
    })]
  });
}
//# sourceMappingURL=placeholder.js.map