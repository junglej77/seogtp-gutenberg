/**
 * WordPress dependencies
 */
import { useDispatch } from '@wordpress/data';
import { cloneBlock } from '@wordpress/blocks';
import { Composite, VisuallyHidden } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { useInstanceId } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { store as blockEditorStore } from '../../store';
import BlockPreview from '../block-preview';
import SetupToolbar from './setup-toolbar';
import usePatternsSetup from './use-patterns-setup';
import { VIEWMODES } from './constants';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const SetupContent = ({
  viewMode,
  activeSlide,
  patterns,
  onBlockPatternSelect,
  showTitles
}) => {
  const containerClass = 'block-editor-block-pattern-setup__container';
  if (viewMode === VIEWMODES.carousel) {
    const slideClass = new Map([[activeSlide, 'active-slide'], [activeSlide - 1, 'previous-slide'], [activeSlide + 1, 'next-slide']]);
    return /*#__PURE__*/_jsx("div", {
      className: "block-editor-block-pattern-setup__carousel",
      children: /*#__PURE__*/_jsx("div", {
        className: containerClass,
        children: /*#__PURE__*/_jsx("div", {
          className: "carousel-container",
          children: patterns.map((pattern, index) => /*#__PURE__*/_jsx(BlockPatternSlide, {
            active: index === activeSlide,
            className: slideClass.get(index) || '',
            pattern: pattern
          }, pattern.name))
        })
      })
    });
  }
  return /*#__PURE__*/_jsx("div", {
    className: "block-editor-block-pattern-setup__grid",
    children: /*#__PURE__*/_jsx(Composite, {
      role: "listbox",
      className: containerClass,
      "aria-label": __('Patterns list'),
      children: patterns.map(pattern => /*#__PURE__*/_jsx(BlockPattern, {
        pattern: pattern,
        onSelect: onBlockPatternSelect,
        showTitles: showTitles
      }, pattern.name))
    })
  });
};
function BlockPattern({
  pattern,
  onSelect,
  showTitles
}) {
  const baseClassName = 'block-editor-block-pattern-setup-list';
  const {
    blocks,
    description,
    viewportWidth = 700
  } = pattern;
  const descriptionId = useInstanceId(BlockPattern, `${baseClassName}__item-description`);
  return /*#__PURE__*/_jsx("div", {
    className: `${baseClassName}__list-item`,
    children: /*#__PURE__*/_jsxs(Composite.Item, {
      render: /*#__PURE__*/_jsx("div", {
        "aria-describedby": description ? descriptionId : undefined,
        "aria-label": pattern.title,
        className: `${baseClassName}__item`
      }),
      id: `${baseClassName}__pattern__${pattern.name}`,
      role: "option",
      onClick: () => onSelect(blocks),
      children: [/*#__PURE__*/_jsx(BlockPreview, {
        blocks: blocks,
        viewportWidth: viewportWidth
      }), showTitles && /*#__PURE__*/_jsx("div", {
        className: `${baseClassName}__item-title`,
        children: pattern.title
      }), !!description && /*#__PURE__*/_jsx(VisuallyHidden, {
        id: descriptionId,
        children: description
      })]
    })
  });
}
function BlockPatternSlide({
  active,
  className,
  pattern,
  minHeight
}) {
  const {
    blocks,
    title,
    description
  } = pattern;
  const descriptionId = useInstanceId(BlockPatternSlide, 'block-editor-block-pattern-setup-list__item-description');
  return /*#__PURE__*/_jsxs("div", {
    "aria-hidden": !active,
    role: "img",
    className: `pattern-slide ${className}`,
    "aria-label": title,
    "aria-describedby": description ? descriptionId : undefined,
    children: [/*#__PURE__*/_jsx(BlockPreview, {
      blocks: blocks,
      minHeight: minHeight
    }), !!description && /*#__PURE__*/_jsx(VisuallyHidden, {
      id: descriptionId,
      children: description
    })]
  });
}
const BlockPatternSetup = ({
  clientId,
  blockName,
  filterPatternsFn,
  onBlockPatternSelect,
  initialViewMode = VIEWMODES.carousel,
  showTitles = false
}) => {
  const [viewMode, setViewMode] = useState(initialViewMode);
  const [activeSlide, setActiveSlide] = useState(0);
  const {
    replaceBlock
  } = useDispatch(blockEditorStore);
  const patterns = usePatternsSetup(clientId, blockName, filterPatternsFn);
  if (!patterns?.length) {
    return null;
  }
  const onBlockPatternSelectDefault = blocks => {
    const clonedBlocks = blocks.map(block => cloneBlock(block));
    replaceBlock(clientId, clonedBlocks);
  };
  const onPatternSelectCallback = onBlockPatternSelect || onBlockPatternSelectDefault;
  return /*#__PURE__*/_jsx(_Fragment, {
    children: /*#__PURE__*/_jsxs("div", {
      className: `block-editor-block-pattern-setup view-mode-${viewMode}`,
      children: [/*#__PURE__*/_jsx(SetupContent, {
        viewMode: viewMode,
        activeSlide: activeSlide,
        patterns: patterns,
        onBlockPatternSelect: onPatternSelectCallback,
        showTitles: showTitles
      }), /*#__PURE__*/_jsx(SetupToolbar, {
        viewMode: viewMode,
        setViewMode: setViewMode,
        activeSlide: activeSlide,
        totalSlides: patterns.length,
        handleNext: () => {
          setActiveSlide(active => Math.min(active + 1, patterns.length - 1));
        },
        handlePrevious: () => {
          setActiveSlide(active => Math.max(active - 1, 0));
        },
        onBlockPatternSelect: () => {
          onPatternSelectCallback(patterns[activeSlide].blocks);
        }
      })]
    })
  });
};
export default BlockPatternSetup;
//# sourceMappingURL=index.js.map