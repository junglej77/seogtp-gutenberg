/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { createBlock } from '@wordpress/blocks';
import { InspectorControls, BlockControls, useBlockProps, useInnerBlocksProps, getColorClassName, store as blockEditorStore, Warning } from '@wordpress/block-editor';
import { PanelBody, ToolbarButton, Spinner, Notice, ComboboxControl, Button } from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';
import { useMemo, useState, useEffect, useCallback } from '@wordpress/element';
import { useEntityRecords } from '@wordpress/core-data';
import { useSelect, useDispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { useConvertToNavigationLinks } from './use-convert-to-navigation-links';
import { convertDescription, ConvertToLinksModal } from './convert-to-links-modal';

// We only show the edit option when page count is <= MAX_PAGE_COUNT
// Performance of Navigation Links is not good past this value.
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const MAX_PAGE_COUNT = 100;
const NOOP = () => {};
function BlockContent({
  blockProps,
  innerBlocksProps,
  hasResolvedPages,
  blockList,
  pages,
  parentPageID
}) {
  if (!hasResolvedPages) {
    return /*#__PURE__*/_jsx("div", {
      ...blockProps,
      children: /*#__PURE__*/_jsx("div", {
        className: "wp-block-page-list__loading-indicator-container",
        children: /*#__PURE__*/_jsx(Spinner, {
          className: "wp-block-page-list__loading-indicator"
        })
      })
    });
  }
  if (pages === null) {
    return /*#__PURE__*/_jsx("div", {
      ...blockProps,
      children: /*#__PURE__*/_jsx(Notice, {
        status: "warning",
        isDismissible: false,
        children: __('Page List: Cannot retrieve Pages.')
      })
    });
  }
  if (pages.length === 0) {
    return /*#__PURE__*/_jsx("div", {
      ...blockProps,
      children: /*#__PURE__*/_jsx(Notice, {
        status: "info",
        isDismissible: false,
        children: __('Page List: Cannot retrieve Pages.')
      })
    });
  }
  if (blockList.length === 0) {
    const parentPageDetails = pages.find(page => page.id === parentPageID);
    if (parentPageDetails?.title?.rendered) {
      return /*#__PURE__*/_jsx("div", {
        ...blockProps,
        children: /*#__PURE__*/_jsx(Warning, {
          children: sprintf(
          // translators: %s: Page title.
          __('Page List: "%s" page has no children.'), parentPageDetails.title.rendered)
        })
      });
    }
    return /*#__PURE__*/_jsx("div", {
      ...blockProps,
      children: /*#__PURE__*/_jsx(Notice, {
        status: "warning",
        isDismissible: false,
        children: __('Page List: Cannot retrieve Pages.')
      })
    });
  }
  if (pages.length > 0) {
    return /*#__PURE__*/_jsx("ul", {
      ...innerBlocksProps
    });
  }
}
export default function PageListEdit({
  context,
  clientId,
  attributes,
  setAttributes
}) {
  const {
    parentPageID
  } = attributes;
  const [isOpen, setOpen] = useState(false);
  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = () => setOpen(false);
  const {
    records: pages,
    hasResolved: hasResolvedPages
  } = useEntityRecords('postType', 'page', {
    per_page: MAX_PAGE_COUNT,
    _fields: ['id', 'link', 'menu_order', 'parent', 'title', 'type'],
    // TODO: When https://core.trac.wordpress.org/ticket/39037 REST API support for multiple orderby
    // values is resolved, update 'orderby' to [ 'menu_order', 'post_title' ] to provide a consistent
    // sort.
    orderby: 'menu_order',
    order: 'asc'
  });
  const allowConvertToLinks = 'showSubmenuIcon' in context && pages?.length > 0 && pages?.length <= MAX_PAGE_COUNT;
  const pagesByParentId = useMemo(() => {
    if (pages === null) {
      return new Map();
    }

    // TODO: Once the REST API supports passing multiple values to
    // 'orderby', this can be removed.
    // https://core.trac.wordpress.org/ticket/39037
    const sortedPages = pages.sort((a, b) => {
      if (a.menu_order === b.menu_order) {
        return a.title.rendered.localeCompare(b.title.rendered);
      }
      return a.menu_order - b.menu_order;
    });
    return sortedPages.reduce((accumulator, page) => {
      const {
        parent
      } = page;
      if (accumulator.has(parent)) {
        accumulator.get(parent).push(page);
      } else {
        accumulator.set(parent, [page]);
      }
      return accumulator;
    }, new Map());
  }, [pages]);
  const blockProps = useBlockProps({
    className: clsx('wp-block-page-list', {
      'has-text-color': !!context.textColor,
      [getColorClassName('color', context.textColor)]: !!context.textColor,
      'has-background': !!context.backgroundColor,
      [getColorClassName('background-color', context.backgroundColor)]: !!context.backgroundColor
    }),
    style: {
      ...context.style?.color
    }
  });
  const pagesTree = useMemo(function makePagesTree(parentId = 0, level = 0) {
    const childPages = pagesByParentId.get(parentId);
    if (!childPages?.length) {
      return [];
    }
    return childPages.reduce((tree, page) => {
      const hasChildren = pagesByParentId.has(page.id);
      const item = {
        value: page.id,
        label: '— '.repeat(level) + page.title.rendered,
        rawName: page.title.rendered
      };
      tree.push(item);
      if (hasChildren) {
        tree.push(...makePagesTree(page.id, level + 1));
      }
      return tree;
    }, []);
  }, [pagesByParentId]);
  const blockList = useMemo(function getBlockList(parentId = parentPageID) {
    const childPages = pagesByParentId.get(parentId);
    if (!childPages?.length) {
      return [];
    }
    return childPages.reduce((template, page) => {
      const hasChildren = pagesByParentId.has(page.id);
      const pageProps = {
        id: page.id,
        label:
        // translators: displayed when a page has an empty title.
        page.title?.rendered?.trim() !== '' ? page.title?.rendered : __('(no title)'),
        title:
        // translators: displayed when a page has an empty title.
        page.title?.rendered?.trim() !== '' ? page.title?.rendered : __('(no title)'),
        link: page.url,
        hasChildren
      };
      let item = null;
      const children = getBlockList(page.id);
      item = createBlock('core/page-list-item', pageProps, children);
      template.push(item);
      return template;
    }, []);
  }, [pagesByParentId, parentPageID]);
  const {
    isNested,
    hasSelectedChild,
    parentClientId,
    hasDraggedChild,
    isChildOfNavigation
  } = useSelect(select => {
    const {
      getBlockParentsByBlockName,
      hasSelectedInnerBlock,
      hasDraggedInnerBlock
    } = select(blockEditorStore);
    const blockParents = getBlockParentsByBlockName(clientId, 'core/navigation-submenu', true);
    const navigationBlockParents = getBlockParentsByBlockName(clientId, 'core/navigation', true);
    return {
      isNested: blockParents.length > 0,
      isChildOfNavigation: navigationBlockParents.length > 0,
      hasSelectedChild: hasSelectedInnerBlock(clientId, true),
      hasDraggedChild: hasDraggedInnerBlock(clientId, true),
      parentClientId: navigationBlockParents[0]
    };
  }, [clientId]);
  const convertToNavigationLinks = useConvertToNavigationLinks({
    clientId,
    pages,
    parentClientId,
    parentPageID
  });
  const innerBlocksProps = useInnerBlocksProps(blockProps, {
    renderAppender: false,
    __unstableDisableDropZone: true,
    templateLock: isChildOfNavigation ? false : 'all',
    onInput: NOOP,
    onChange: NOOP,
    value: blockList
  });
  const {
    selectBlock
  } = useDispatch(blockEditorStore);
  useEffect(() => {
    if (hasSelectedChild || hasDraggedChild) {
      openModal();
      selectBlock(parentClientId);
    }
  }, [hasSelectedChild, hasDraggedChild, parentClientId, selectBlock, openModal]);
  useEffect(() => {
    setAttributes({
      isNested
    });
  }, [isNested, setAttributes]);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsxs(InspectorControls, {
      children: [pagesTree.length > 0 && /*#__PURE__*/_jsx(PanelBody, {
        children: /*#__PURE__*/_jsx(ComboboxControl, {
          __nextHasNoMarginBottom: true,
          __next40pxDefaultSize: true,
          className: "editor-page-attributes__parent",
          label: __('Parent'),
          value: parentPageID,
          options: pagesTree,
          onChange: value => setAttributes({
            parentPageID: value !== null && value !== void 0 ? value : 0
          }),
          help: __('Choose a page to show only its subpages.')
        })
      }), allowConvertToLinks && /*#__PURE__*/_jsxs(PanelBody, {
        title: __('Edit this menu'),
        children: [/*#__PURE__*/_jsx("p", {
          children: convertDescription
        }), /*#__PURE__*/_jsx(Button, {
          __next40pxDefaultSize: true,
          variant: "primary",
          accessibleWhenDisabled: true,
          disabled: !hasResolvedPages,
          onClick: convertToNavigationLinks,
          children: __('Edit')
        })]
      })]
    }), allowConvertToLinks && /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(BlockControls, {
        group: "other",
        children: /*#__PURE__*/_jsx(ToolbarButton, {
          title: __('Edit'),
          onClick: openModal,
          children: __('Edit')
        })
      }), isOpen && /*#__PURE__*/_jsx(ConvertToLinksModal, {
        onClick: convertToNavigationLinks,
        onClose: closeModal,
        disabled: !hasResolvedPages
      })]
    }), /*#__PURE__*/_jsx(BlockContent, {
      blockProps: blockProps,
      innerBlocksProps: innerBlocksProps,
      hasResolvedPages: hasResolvedPages,
      blockList: blockList,
      pages: pages,
      parentPageID: parentPageID
    })]
  });
}
//# sourceMappingURL=edit.js.map