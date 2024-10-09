/**
 * External dependencies
 */
import clsx from 'clsx';
/**
 * WordPress dependencies
 */
import { Button, Tooltip } from '@wordpress/components'; // seogtp 引入Button,
import apiFetch from '@wordpress/api-fetch'; // seogtp 引入 API 调用
import { store as coreStore } from '@wordpress/core-data'; // seogtp 引入
import { useMemo, useContext, useState } from '@wordpress/element';
import { ENTER } from '@wordpress/keycodes';
import { __, sprintf } from '@wordpress/i18n';
import { privateApis as blockEditorPrivateApis } from '@wordpress/block-editor';
import { privateApis as editorPrivateApis } from '@wordpress/editor';
// 导入数据选择器 seogtp
import { dispatch } from '@wordpress/data';
/**
 * Internal dependencies
 */
import { filterObjectByProperties } from '../../../hooks/use-theme-style-variations/use-theme-style-variations-by-property';
import { unlock } from '../../../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const {
  mergeBaseAndUserConfigs
} = unlock(editorPrivateApis);
const {
  GlobalStylesContext,
  areGlobalStyleConfigsEqual
} = unlock(blockEditorPrivateApis);
export default function Variation({
  currentStyle,
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
  // seogtp删除风格的函数

  const deleteVariation = async () => {
    try {
      console.log(user);
      console.log(variation);
      // 调用 REST API 来删除风格
      const response = await apiFetch({
        path: '/seogtp/v1/delete-style',
        method: 'POST',
        body: JSON.stringify({
          styleName: variation.title
        }),
        // 发送风格名称
        headers: {
          'Content-Type': 'application/json'
        } // 设置请求头为 JSON
      });
      console.log('API response:', response); // 确认 response 内容

      // 检查返回结果并提示用户
      if (response.success) {
        // 使缓存失效，确保全局样式的重新获取
        await dispatch(coreStore).invalidateResolution('getGlobalStyles');
        await dispatch(coreStore).invalidateResolution('__experimentalGetCurrentThemeGlobalStylesVariations');
        alert(__('Style deleted successfully.', 'seogtp'));
      } else {
        alert(__('Failed to delete the style.', 'seogtp'));
      }
    } catch (error) {
      // 捕捉并处理请求错误
      console.error('Failed to delete the style: ', error);
      alert(__('An error occurred while deleting the style.', 'seogtp'));
    }
  };
  const content = /*#__PURE__*/_jsxs("div", {
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
    children: [/*#__PURE__*/_jsx("div", {
      className: clsx('edit-site-global-styles-variations_item-preview', {
        'is-pill': isPill
      }),
      children: children(isFocused)
    }), /*#__PURE__*/_jsxs("div", {
      className: `edit-site-global-styles-variations_item_label ${variation.title !== 'default' && currentStyle !== variation.title ? '' : 'olny-center'}`,
      children: [/*#__PURE__*/_jsx("span", {
        children: variation.title
      }), variation.title !== 'default' && currentStyle !== variation.title && /*#__PURE__*/_jsx(Button, {
        isDestructive: true,
        isSmall: true,
        onClick: deleteVariation,
        className: "delete-style-button",
        children: __('Delete')
      })]
    })]
  });
  return /*#__PURE__*/_jsx(GlobalStylesContext.Provider, {
    value: context,
    children: showTooltip ? /*#__PURE__*/_jsx(Tooltip, {
      text: variation?.title,
      children: content
    }) : content
  });
}
//# sourceMappingURL=variation.js.map