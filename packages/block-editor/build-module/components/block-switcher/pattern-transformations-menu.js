/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { useInstanceId, useViewportMatch } from '@wordpress/compose';
import { chevronRight } from '@wordpress/icons';
import { Composite, MenuGroup, MenuItem, Popover, VisuallyHidden } from '@wordpress/components';

/**
 * Internal dependencies
 */
import BlockPreview from '../block-preview';
import useTransformedPatterns from './use-transformed-patterns';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function PatternTransformationsMenu({
  blocks,
  patterns: statePatterns,
  onSelect
}) {
  const [showTransforms, setShowTransforms] = useState(false);
  const patterns = useTransformedPatterns(statePatterns, blocks);
  if (!patterns.length) {
    return null;
  }
  return /*#__PURE__*/_jsxs(MenuGroup, {
    className: "block-editor-block-switcher__pattern__transforms__menugroup",
    children: [showTransforms && /*#__PURE__*/_jsx(PreviewPatternsPopover, {
      patterns: patterns,
      onSelect: onSelect
    }), /*#__PURE__*/_jsx(MenuItem, {
      onClick: event => {
        event.preventDefault();
        setShowTransforms(!showTransforms);
      },
      icon: chevronRight,
      children: __('Patterns')
    })]
  });
}
function PreviewPatternsPopover({
  patterns,
  onSelect
}) {
  const isMobile = useViewportMatch('medium', '<');
  return /*#__PURE__*/_jsx("div", {
    className: "block-editor-block-switcher__popover-preview-container",
    children: /*#__PURE__*/_jsx(Popover, {
      className: "block-editor-block-switcher__popover-preview",
      placement: isMobile ? 'bottom' : 'right-start',
      offset: 16,
      children: /*#__PURE__*/_jsx("div", {
        className: "block-editor-block-switcher__preview is-pattern-list-preview",
        children: /*#__PURE__*/_jsx(BlockPatternsList, {
          patterns: patterns,
          onSelect: onSelect
        })
      })
    })
  });
}
function BlockPatternsList({
  patterns,
  onSelect
}) {
  return /*#__PURE__*/_jsx(Composite, {
    role: "listbox",
    className: "block-editor-block-switcher__preview-patterns-container",
    "aria-label": __('Patterns list'),
    children: patterns.map(pattern => /*#__PURE__*/_jsx(BlockPattern, {
      pattern: pattern,
      onSelect: onSelect
    }, pattern.name))
  });
}
function BlockPattern({
  pattern,
  onSelect
}) {
  // TODO check pattern/preview width...
  const baseClassName = 'block-editor-block-switcher__preview-patterns-container';
  const descriptionId = useInstanceId(BlockPattern, `${baseClassName}-list__item-description`);
  return /*#__PURE__*/_jsxs("div", {
    className: `${baseClassName}-list__list-item`,
    children: [/*#__PURE__*/_jsxs(Composite.Item, {
      render: /*#__PURE__*/_jsx("div", {
        role: "option",
        "aria-label": pattern.title,
        "aria-describedby": pattern.description ? descriptionId : undefined,
        className: `${baseClassName}-list__item`
      }),
      onClick: () => onSelect(pattern.transformedBlocks),
      children: [/*#__PURE__*/_jsx(BlockPreview, {
        blocks: pattern.transformedBlocks,
        viewportWidth: pattern.viewportWidth || 500
      }), /*#__PURE__*/_jsx("div", {
        className: `${baseClassName}-list__item-title`,
        children: pattern.title
      })]
    }), !!pattern.description && /*#__PURE__*/_jsx(VisuallyHidden, {
      id: descriptionId,
      children: pattern.description
    })]
  });
}
export default PatternTransformationsMenu;
//# sourceMappingURL=pattern-transformations-menu.js.map