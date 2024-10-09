/**
 * WordPress dependencies
 */
import { BlockControls, BlockIcon, InspectorControls, store as blockEditorStore, useBlockProps } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';
import { PanelBody, Placeholder, ToggleControl, ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { renderToString } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useInstanceId } from '@wordpress/compose';
import { store as noticeStore } from '@wordpress/notices';
import { tableOfContents as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import TableOfContentsList from './list';
import { linearToNestedHeadingList } from './utils';
import { useObserveHeadings } from './hooks';

/** @typedef {import('./utils').HeadingData} HeadingData */

/**
 * Table of Contents block edit component.
 *
 * @param {Object}                       props                                   The props.
 * @param {Object}                       props.attributes                        The block attributes.
 * @param {HeadingData[]}                props.attributes.headings               A list of data for each heading in the post.
 * @param {boolean}                      props.attributes.onlyIncludeCurrentPage Whether to only include headings from the current page (if the post is paginated).
 * @param {string}                       props.clientId
 * @param {(attributes: Object) => void} props.setAttributes
 *
 * @return {Component} The component.
 */
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function TableOfContentsEdit({
  attributes: {
    headings = [],
    onlyIncludeCurrentPage
  },
  clientId,
  setAttributes
}) {
  useObserveHeadings(clientId);
  const blockProps = useBlockProps();
  const instanceId = useInstanceId(TableOfContentsEdit, 'table-of-contents');

  // If a user clicks to a link prevent redirection and show a warning.
  const {
    createWarningNotice,
    removeNotice
  } = useDispatch(noticeStore);
  let noticeId;
  const showRedirectionPreventedNotice = event => {
    event.preventDefault();
    // Remove previous warning if any, to show one at a time per block.
    removeNotice(noticeId);
    noticeId = `block-library/core/table-of-contents/redirection-prevented/${instanceId}`;
    createWarningNotice(__('Links are disabled in the editor.'), {
      id: noticeId,
      type: 'snackbar'
    });
  };
  const canInsertList = useSelect(select => {
    const {
      getBlockRootClientId,
      canInsertBlockType
    } = select(blockEditorStore);
    const rootClientId = getBlockRootClientId(clientId);
    return canInsertBlockType('core/list', rootClientId);
  }, [clientId]);
  const {
    replaceBlocks
  } = useDispatch(blockEditorStore);
  const headingTree = linearToNestedHeadingList(headings);
  const toolbarControls = canInsertList && /*#__PURE__*/_jsx(BlockControls, {
    children: /*#__PURE__*/_jsx(ToolbarGroup, {
      children: /*#__PURE__*/_jsx(ToolbarButton, {
        onClick: () => replaceBlocks(clientId, createBlock('core/list', {
          ordered: true,
          values: renderToString( /*#__PURE__*/_jsx(TableOfContentsList, {
            nestedHeadingList: headingTree
          }))
        })),
        children: __('Convert to static list')
      })
    })
  });
  const inspectorControls = /*#__PURE__*/_jsx(InspectorControls, {
    children: /*#__PURE__*/_jsx(PanelBody, {
      title: __('Settings'),
      children: /*#__PURE__*/_jsx(ToggleControl, {
        __nextHasNoMarginBottom: true,
        label: __('Only include current page'),
        checked: onlyIncludeCurrentPage,
        onChange: value => setAttributes({
          onlyIncludeCurrentPage: value
        }),
        help: onlyIncludeCurrentPage ? __('Only including headings from the current page (if the post is paginated).') : __('Toggle to only include headings from the current page (if the post is paginated).')
      })
    })
  });

  // If there are no headings or the only heading is empty.
  // Note that the toolbar controls are intentionally omitted since the
  // "Convert to static list" option is useless to the placeholder state.
  if (headings.length === 0) {
    return /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx("div", {
        ...blockProps,
        children: /*#__PURE__*/_jsx(Placeholder, {
          icon: /*#__PURE__*/_jsx(BlockIcon, {
            icon: icon
          }),
          label: __('Table of Contents'),
          instructions: __('Start adding Heading blocks to create a table of contents. Headings with HTML anchors will be linked here.')
        })
      }), inspectorControls]
    });
  }
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx("nav", {
      ...blockProps,
      children: /*#__PURE__*/_jsx("ol", {
        children: /*#__PURE__*/_jsx(TableOfContentsList, {
          nestedHeadingList: headingTree,
          disableLinkActivation: true,
          onClick: showRedirectionPreventedNotice
        })
      })
    }), toolbarControls, inspectorControls]
  });
}
//# sourceMappingURL=edit.js.map