/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { decodeEntities } from '@wordpress/html-entities';
import { useSelect, useDispatch } from '@wordpress/data';
import { ENTER, SPACE } from '@wordpress/keycodes';

/**
 * Internal dependencies
 */
import Inserter from '../inserter';
import { store as blockEditorStore } from '../../store';

/**
 * Zero width non-breaking space, used as padding for the paragraph when it is
 * empty.
 */
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export const ZWNBSP = '\ufeff';
export default function DefaultBlockAppender({
  rootClientId
}) {
  const {
    showPrompt,
    isLocked,
    placeholder,
    isManualGrid
  } = useSelect(select => {
    const {
      getBlockCount,
      getSettings,
      getTemplateLock,
      getBlockAttributes
    } = select(blockEditorStore);
    const isEmpty = !getBlockCount(rootClientId);
    const {
      bodyPlaceholder
    } = getSettings();
    return {
      showPrompt: isEmpty,
      isLocked: !!getTemplateLock(rootClientId),
      placeholder: bodyPlaceholder,
      isManualGrid: getBlockAttributes(rootClientId)?.layout?.isManualPlacement
    };
  }, [rootClientId]);
  const {
    insertDefaultBlock,
    startTyping
  } = useDispatch(blockEditorStore);
  if (isLocked || isManualGrid) {
    return null;
  }
  const value = decodeEntities(placeholder) || __('Type / to choose a block');
  const onAppend = () => {
    insertDefaultBlock(undefined, rootClientId);
    startTyping();
  };
  return /*#__PURE__*/_jsxs("div", {
    "data-root-client-id": rootClientId || '',
    className: clsx('block-editor-default-block-appender', {
      'has-visible-prompt': showPrompt
    }),
    children: [/*#__PURE__*/_jsx("p", {
      tabIndex: "0"
      // We want this element to be styled as a paragraph by themes.
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
      ,
      role: "button",
      "aria-label": __('Add default block')
      // A wrapping container for this one already has the wp-block className.
      ,
      className: "block-editor-default-block-appender__content",
      onKeyDown: event => {
        if (ENTER === event.keyCode || SPACE === event.keyCode) {
          onAppend();
        }
      },
      onClick: () => onAppend(),
      onFocus: () => {
        if (showPrompt) {
          onAppend();
        }
      },
      children: showPrompt ? value : ZWNBSP
    }), /*#__PURE__*/_jsx(Inserter, {
      rootClientId: rootClientId,
      position: "bottom right",
      isAppender: true,
      __experimentalIsQuick: true
    })]
  });
}
//# sourceMappingURL=index.js.map