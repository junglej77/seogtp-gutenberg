/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { Tooltip } from '@wordpress/components';
import { useMemo, useContext, useState } from '@wordpress/element';
import { ENTER } from '@wordpress/keycodes';
import { __, sprintf } from '@wordpress/i18n';
import { privateApis as blockEditorPrivateApis } from '@wordpress/block-editor';
import { privateApis as editorPrivateApis } from '@wordpress/editor';

/**
 * Internal dependencies
 */
import { filterObjectByProperties } from '../../../hooks/use-theme-style-variations/use-theme-style-variations-by-property';
import { unlock } from '../../../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
const {
  mergeBaseAndUserConfigs
} = unlock(editorPrivateApis);
const {
  GlobalStylesContext,
  areGlobalStyleConfigsEqual
} = unlock(blockEditorPrivateApis);
export default function Variation({
  variation,
  children,
  isPill,
  properties,
  showTooltip
}) {
  const [isFocused, setIsFocused] = useState(false);
  const {
    base,
    user,
    setUserConfig
  } = useContext(GlobalStylesContext);
  const context = useMemo(() => {
    let merged = mergeBaseAndUserConfigs(base, variation);
    if (properties) {
      merged = filterObjectByProperties(merged, properties);
    }
    return {
      user: variation,
      base,
      merged,
      setUserConfig: () => {}
    };
  }, [variation, base, properties]);
  const selectVariation = () => setUserConfig(variation);
  const selectOnEnter = event => {
    if (event.keyCode === ENTER) {
      event.preventDefault();
      selectVariation();
    }
  };
  const isActive = useMemo(() => areGlobalStyleConfigsEqual(user, variation), [user, variation]);
  let label = variation?.title;
  if (variation?.description) {
    label = sprintf( /* translators: %1$s: variation title. %2$s variation description. */
    __('%1$s (%2$s)'), variation?.title, variation?.description);
  }
  const content = /*#__PURE__*/_jsx("div", {
    className: clsx('edit-site-global-styles-variations_item', {
      'is-active': isActive
    }),
    role: "button",
    onClick: selectVariation,
    onKeyDown: selectOnEnter,
    tabIndex: "0",
    "aria-label": label,
    "aria-current": isActive,
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false),
    children: /*#__PURE__*/_jsx("div", {
      className: clsx('edit-site-global-styles-variations_item-preview', {
        'is-pill': isPill
      }),
      children: children(isFocused)
    })
  });
  return /*#__PURE__*/_jsx(GlobalStylesContext.Provider, {
    value: context,
    children: showTooltip ? /*#__PURE__*/_jsx(Tooltip, {
      text: variation?.title,
      children: content
    }) : content
  });
}
//# sourceMappingURL=variation源文件备份.js.map