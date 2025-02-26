/**
 * WordPress dependencies
 */
import { useMemo, useState } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { store as noticesStore } from '@wordpress/notices';
import { useDispatch } from '@wordpress/data';
import { useAsyncList } from '@wordpress/compose';
import { __experimentalBlockPatternsList as BlockPatternsList } from '@wordpress/block-editor';
import { SearchControl, __experimentalHStack as HStack } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { useAlternativeBlockPatterns, useAlternativeTemplateParts } from './utils/hooks';
import { mapTemplatePartToBlockPattern } from './utils/map-template-part-to-block-pattern';
import { searchPatterns } from '../../utils/search-patterns';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function TemplatePartSelectionModal({
  setAttributes,
  onClose,
  templatePartId = null,
  area,
  clientId
}) {
  const [searchValue, setSearchValue] = useState('');
  const {
    templateParts
  } = useAlternativeTemplateParts(area, templatePartId);

  // We can map template parts to block patters to reuse the BlockPatternsList UI
  const filteredTemplateParts = useMemo(() => {
    const partsAsPatterns = templateParts.map(templatePart => mapTemplatePartToBlockPattern(templatePart));
    return searchPatterns(partsAsPatterns, searchValue);
  }, [templateParts, searchValue]);
  const shownTemplateParts = useAsyncList(filteredTemplateParts);
  const blockPatterns = useAlternativeBlockPatterns(area, clientId);
  const filteredBlockPatterns = useMemo(() => {
    return searchPatterns(blockPatterns, searchValue);
  }, [blockPatterns, searchValue]);
  const {
    createSuccessNotice
  } = useDispatch(noticesStore);
  const onTemplatePartSelect = templatePart => {
    setAttributes({
      slug: templatePart.slug,
      theme: templatePart.theme,
      area: undefined
    });
    createSuccessNotice(sprintf( /* translators: %s: template part title. */
    __('Template Part "%s" inserted.'), templatePart.title?.rendered || templatePart.slug), {
      type: 'snackbar'
    });
    onClose();
  };
  const hasTemplateParts = !!filteredTemplateParts.length;
  const hasBlockPatterns = !!filteredBlockPatterns.length;
  return /*#__PURE__*/_jsxs("div", {
    className: "block-library-template-part__selection-content",
    children: [/*#__PURE__*/_jsx("div", {
      className: "block-library-template-part__selection-search",
      children: /*#__PURE__*/_jsx(SearchControl, {
        __nextHasNoMarginBottom: true,
        onChange: setSearchValue,
        value: searchValue,
        label: __('Search for replacements'),
        placeholder: __('Search')
      })
    }), hasTemplateParts && /*#__PURE__*/_jsxs("div", {
      children: [/*#__PURE__*/_jsx("h2", {
        children: __('Existing template parts')
      }), /*#__PURE__*/_jsx(BlockPatternsList, {
        blockPatterns: filteredTemplateParts,
        shownPatterns: shownTemplateParts,
        onClickPattern: pattern => {
          onTemplatePartSelect(pattern.templatePart);
        }
      })]
    }), !hasTemplateParts && !hasBlockPatterns && /*#__PURE__*/_jsx(HStack, {
      alignment: "center",
      children: /*#__PURE__*/_jsx("p", {
        children: __('No results found.')
      })
    })]
  });
}
//# sourceMappingURL=selection-modal.js.map