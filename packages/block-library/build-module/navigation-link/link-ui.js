/**
 * WordPress dependencies
 */
import { __unstableStripHTML as stripHTML } from '@wordpress/dom';
import { Popover, Button, VisuallyHidden, __experimentalVStack as VStack } from '@wordpress/components';
import { __, sprintf, isRTL } from '@wordpress/i18n';
import { __experimentalLinkControl as LinkControl, store as blockEditorStore, privateApis as blockEditorPrivateApis } from '@wordpress/block-editor';
import { createInterpolateElement, useMemo, useState, useRef, useEffect, forwardRef } from '@wordpress/element';
import { store as coreStore, useResourcePermissions } from '@wordpress/core-data';
import { decodeEntities } from '@wordpress/html-entities';
import { useSelect, useDispatch } from '@wordpress/data';
import { chevronLeftSmall, chevronRightSmall, plus } from '@wordpress/icons';
import { useInstanceId, useFocusOnMount } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import { unlock } from '../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const {
  PrivateQuickInserter: QuickInserter
} = unlock(blockEditorPrivateApis);

/**
 * Given the Link block's type attribute, return the query params to give to
 * /wp/v2/search.
 *
 * @param {string} type Link block's type attribute.
 * @param {string} kind Link block's entity of kind (post-type|taxonomy)
 * @return {{ type?: string, subtype?: string }} Search query params.
 */
export function getSuggestionsQuery(type, kind) {
  switch (type) {
    case 'post':
    case 'page':
      return {
        type: 'post',
        subtype: type
      };
    case 'category':
      return {
        type: 'term',
        subtype: 'category'
      };
    case 'tag':
      return {
        type: 'term',
        subtype: 'post_tag'
      };
    case 'post_format':
      return {
        type: 'post-format'
      };
    default:
      if (kind === 'taxonomy') {
        return {
          type: 'term',
          subtype: type
        };
      }
      if (kind === 'post-type') {
        return {
          type: 'post',
          subtype: type
        };
      }
      return {
        // for custom link which has no type
        // always show pages as initial suggestions
        initialSuggestionsSearchOptions: {
          type: 'post',
          subtype: 'page',
          perPage: 20
        }
      };
  }
}
function LinkUIBlockInserter({
  clientId,
  onBack,
  onSelectBlock
}) {
  const {
    rootBlockClientId
  } = useSelect(select => {
    const {
      getBlockRootClientId
    } = select(blockEditorStore);
    return {
      rootBlockClientId: getBlockRootClientId(clientId)
    };
  }, [clientId]);
  const focusOnMountRef = useFocusOnMount('firstElement');
  const dialogTitleId = useInstanceId(LinkControl, `link-ui-block-inserter__title`);
  const dialogDescritionId = useInstanceId(LinkControl, `link-ui-block-inserter__description`);
  if (!clientId) {
    return null;
  }
  return /*#__PURE__*/_jsxs("div", {
    className: "link-ui-block-inserter",
    role: "dialog",
    "aria-labelledby": dialogTitleId,
    "aria-describedby": dialogDescritionId,
    ref: focusOnMountRef,
    children: [/*#__PURE__*/_jsxs(VisuallyHidden, {
      children: [/*#__PURE__*/_jsx("h2", {
        id: dialogTitleId,
        children: __('Add block')
      }), /*#__PURE__*/_jsx("p", {
        id: dialogDescritionId,
        children: __('Choose a block to add to your Navigation.')
      })]
    }), /*#__PURE__*/_jsx(Button, {
      className: "link-ui-block-inserter__back",
      icon: isRTL() ? chevronRightSmall : chevronLeftSmall,
      onClick: e => {
        e.preventDefault();
        onBack();
      },
      size: "small",
      children: __('Back')
    }), /*#__PURE__*/_jsx(QuickInserter, {
      rootClientId: rootBlockClientId,
      clientId: clientId,
      isAppender: false,
      prioritizePatterns: false,
      selectBlockOnInsert: true,
      hasSearch: false,
      onSelect: onSelectBlock
    })]
  });
}
function UnforwardedLinkUI(props, ref) {
  const {
    label,
    url,
    opensInNewTab,
    type,
    kind
  } = props.link;
  const postType = type || 'page';
  const [addingBlock, setAddingBlock] = useState(false);
  const [focusAddBlockButton, setFocusAddBlockButton] = useState(false);
  const {
    saveEntityRecord
  } = useDispatch(coreStore);
  const permissions = useResourcePermissions({
    kind: 'postType',
    name: postType
  });
  async function handleCreate(pageTitle) {
    const page = await saveEntityRecord('postType', postType, {
      title: pageTitle,
      status: 'draft'
    });
    return {
      id: page.id,
      type: postType,
      // Make `title` property consistent with that in `fetchLinkSuggestions` where the `rendered` title (containing HTML entities)
      // is also being decoded. By being consistent in both locations we avoid having to branch in the rendering output code.
      // Ideally in the future we will update both APIs to utilise the "raw" form of the title which is better suited to edit contexts.
      // e.g.
      // - title.raw = "Yes & No"
      // - title.rendered = "Yes &#038; No"
      // - decodeEntities( title.rendered ) = "Yes & No"
      // See:
      // - https://github.com/WordPress/gutenberg/pull/41063
      // - https://github.com/WordPress/gutenberg/blob/a1e1fdc0e6278457e9f4fc0b31ac6d2095f5450b/packages/core-data/src/fetch/__experimental-fetch-link-suggestions.js#L212-L218
      title: decodeEntities(page.title.rendered),
      url: page.link,
      kind: 'post-type'
    };
  }

  // Memoize link value to avoid overriding the LinkControl's internal state.
  // This is a temporary fix. See https://github.com/WordPress/gutenberg/issues/50976#issuecomment-1568226407.
  const link = useMemo(() => ({
    url,
    opensInNewTab,
    title: label && stripHTML(label)
  }), [label, opensInNewTab, url]);
  const dialogTitleId = useInstanceId(LinkUI, `link-ui-link-control__title`);
  const dialogDescritionId = useInstanceId(LinkUI, `link-ui-link-control__description`);

  // Selecting a block should close the popover and also remove the (previously) automatically inserted
  // link block so that the newly selected block can be inserted in its place.
  const {
    onClose: onSelectBlock
  } = props;
  return /*#__PURE__*/_jsxs(Popover, {
    ref: ref,
    placement: "bottom",
    onClose: props.onClose,
    anchor: props.anchor,
    shift: true,
    children: [!addingBlock && /*#__PURE__*/_jsxs("div", {
      role: "dialog",
      "aria-labelledby": dialogTitleId,
      "aria-describedby": dialogDescritionId,
      children: [/*#__PURE__*/_jsxs(VisuallyHidden, {
        children: [/*#__PURE__*/_jsx("h2", {
          id: dialogTitleId,
          children: __('Add link')
        }), /*#__PURE__*/_jsx("p", {
          id: dialogDescritionId,
          children: __('Search for and add a link to your Navigation.')
        })]
      }), /*#__PURE__*/_jsx(LinkControl, {
        hasTextControl: true,
        hasRichPreviews: true,
        value: link,
        showInitialSuggestions: true,
        withCreateSuggestion: permissions.canCreate,
        createSuggestion: handleCreate,
        createSuggestionButtonText: searchTerm => {
          let format;
          if (type === 'post') {
            /* translators: %s: search term. */
            format = __('Create draft post: <mark>%s</mark>');
          } else {
            /* translators: %s: search term. */
            format = __('Create draft page: <mark>%s</mark>');
          }
          return createInterpolateElement(sprintf(format, searchTerm), {
            mark: /*#__PURE__*/_jsx("mark", {})
          });
        },
        noDirectEntry: !!type,
        noURLSuggestion: !!type,
        suggestionsQuery: getSuggestionsQuery(type, kind),
        onChange: props.onChange,
        onRemove: props.onRemove,
        onCancel: props.onCancel,
        renderControlBottom: () => !link?.url?.length && /*#__PURE__*/_jsx(LinkUITools, {
          focusAddBlockButton: focusAddBlockButton,
          setAddingBlock: () => {
            setAddingBlock(true);
            setFocusAddBlockButton(false);
          }
        })
      })]
    }), addingBlock && /*#__PURE__*/_jsx(LinkUIBlockInserter, {
      clientId: props.clientId,
      onBack: () => {
        setAddingBlock(false);
        setFocusAddBlockButton(true);
      },
      onSelectBlock: onSelectBlock
    })]
  });
}
export const LinkUI = forwardRef(UnforwardedLinkUI);
const LinkUITools = ({
  setAddingBlock,
  focusAddBlockButton
}) => {
  const blockInserterAriaRole = 'listbox';
  const addBlockButtonRef = useRef();

  // Focus the add block button when the popover is opened.
  useEffect(() => {
    if (focusAddBlockButton) {
      addBlockButtonRef.current?.focus();
    }
  }, [focusAddBlockButton]);
  return /*#__PURE__*/_jsx(VStack, {
    className: "link-ui-tools",
    children: /*#__PURE__*/_jsx(Button, {
      __next40pxDefaultSize: true,
      ref: addBlockButtonRef,
      icon: plus,
      onClick: e => {
        e.preventDefault();
        setAddingBlock(true);
      },
      "aria-haspopup": blockInserterAriaRole,
      children: __('Add block')
    })
  });
};
export default LinkUITools;
//# sourceMappingURL=link-ui.js.map