/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { useMergeRefs, useRefEffect } from '@wordpress/compose';
import { forwardRef } from '@wordpress/element';

/**
 * Internal dependencies
 */
import useMultiSelection from './use-multi-selection';
import useTabNav from './use-tab-nav';
import useArrowNav from './use-arrow-nav';
import useSelectAll from './use-select-all';
import useDragSelection from './use-drag-selection';
import useSelectionObserver from './use-selection-observer';
import useClickSelection from './use-click-selection';
import useInput from './use-input';
import useClipboardHandler from './use-clipboard-handler';
import useEventRedirect from './use-event-redirect';
import { store as blockEditorStore } from '../../store';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export function useWritingFlow() {
  const [before, ref, after] = useTabNav();
  const hasMultiSelection = useSelect(select => select(blockEditorStore).hasMultiSelection(), []);
  return [before, useMergeRefs([ref, useClipboardHandler(), useInput(), useDragSelection(), useSelectionObserver(), useClickSelection(), useMultiSelection(), useSelectAll(), useArrowNav(), useRefEffect(node => {
    node.tabIndex = 0;
    if (!hasMultiSelection) {
      return;
    }
    node.classList.add('has-multi-selection');
    node.setAttribute('aria-label', __('Multiple selected blocks'));
    return () => {
      node.classList.remove('has-multi-selection');
      node.removeAttribute('aria-label');
    };
  }, [hasMultiSelection]), useEventRedirect()]), after];
}
function WritingFlow({
  children,
  ...props
}, forwardedRef) {
  const [before, ref, after] = useWritingFlow();
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [before, /*#__PURE__*/_jsx("div", {
      ...props,
      ref: useMergeRefs([ref, forwardedRef]),
      className: clsx(props.className, 'block-editor-writing-flow'),
      children: children
    }), after]
  });
}

/**
 * Handles selection and navigation across blocks. This component should be
 * wrapped around BlockList.
 *
 * @param {Object}  props          Component properties.
 * @param {Element} props.children Children to be rendered.
 */
export default forwardRef(WritingFlow);
//# sourceMappingURL=index.js.map