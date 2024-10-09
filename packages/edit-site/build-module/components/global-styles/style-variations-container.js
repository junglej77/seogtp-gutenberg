// 导入WordPress核心数据存储
import { store as coreStore } from '@wordpress/core-data';
// 导入数据选择器 seogtp
import { useSelect, dispatch, useDispatch } from '@wordpress/data';
// 导入React相关钩子
import { useContext, useEffect, useMemo, useState } from '@wordpress/element';
// 导入Grid组件
import { Button, Modal, TextControl, __experimentalGrid as Grid } from '@wordpress/components';
// 导入国际化函数
import { __ } from '@wordpress/i18n';
// 导入区块编辑器的私有API
import { privateApis as blockEditorPrivateApis } from '@wordpress/block-editor';
import apiFetch from '@wordpress/api-fetch'; // seogtp用于调用 REST API 的 apiFetch
// 导入内部依赖组件和工具函数
import PreviewStyles from './preview-styles';
import Variation from './variations/variation';
import { isVariationWithProperties } from '../../hooks/use-theme-style-variations/use-theme-style-variations-by-property';
import { unlock } from '../../lock-unlock';
// 解锁并获取GlobalStylesContext
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const {
  GlobalStylesContext
} = unlock(blockEditorPrivateApis);

// 定义StyleVariationsContainer组件
export default function StyleVariationsContainer({
  gap = 2
}) {
  const {
    user
  } = useContext(GlobalStylesContext); // 从GlobalStylesContext中获取当前用户信息
  const [currentUserStyles, setCurrentUserStyles] = useState(user); // 使用state保存当前用户的样式

  const currentStyle = useSelect(select => select('seogtp-gutenberg/seogtp_style_store').getCurrentStyle()); // seogtp从全局状态中获取 currentStyle
  const {
    setCurrentStyle
  } = useDispatch('seogtp-gutenberg/seogtp_style_store'); // seogtp获取更新 currentStyle 的 di

  const [isModalOpen, setIsModalOpen] = useState(false); // seogtp控制弹窗的状态
  const [newStyleName, setNewStyleName] = useState(''); // seogtp用于存储新文件名
  const [isLoading, setIsLoading] = useState(false); // seogtp控制加载状态
  const userStyles = currentUserStyles?.styles;
  // 当用户信息变化时，更新当前用户的样式
  useEffect(() => {
    console.log(user);
    setCurrentUserStyles(user);
  }, [user]);
  // seogtp在组件加载时初始化 currentStyle 为 user.title，如果没有则为 'default'
  useEffect(() => {
    if (user?.title) {
      setCurrentStyle(user.title); // 设置初始 currentStyle 为 user.title
    } else {
      setCurrentStyle('default'); // 设置默认值
    }
  }, []);
  // 从coreStore中获取当前主题的全局样式变体
  const variations = useSelect(select => {
    return select(coreStore).__experimentalGetCurrentThemeGlobalStylesVariations();
  }, []);
  // 过滤掉颜色和排版相关的变体
  const fullStyleVariations = variations?.filter(variation => {
    return !isVariationWithProperties(variation, ['color']) && !isVariationWithProperties(variation, ['typography', 'spacing']);
  });
  // 使用useMemo缓存主题变体数据
  const themeVariations = useMemo(() => {
    // 添加默认变体
    const withEmptyVariation = [{
      title: 'default',
      settings: {},
      styles: {}
    }, ...(fullStyleVariations !== null && fullStyleVariations !== void 0 ? fullStyleVariations : [])];
    const mergedVariations = withEmptyVariation.map(variation => {
      var _variation$settings;
      const blockStyles = {
        ...variation?.styles?.blocks
      } || {};

      // 将用户自定义的CSS合并到变体中，以防止切换变体时丢失
      // if ( userStyles?.blocks ) {
      // 	Object.keys( userStyles.blocks ).forEach( ( blockName ) => {
      // 		if ( userStyles.blocks[ blockName ].css ) {
      // 			const variationBlockStyles =
      // 				blockStyles[ blockName ] || {};
      // 			const customCSS = {
      // 				css: `${
      // 					blockStyles[ blockName ]?.css || ''
      // 				} ${
      // 					userStyles.blocks[ blockName ].css.trim() ||
      // 					''
      // 				}`,
      // 			};
      // 			blockStyles[ blockName ] = {
      // 				...variationBlockStyles,
      // 				...customCSS,
      // 			};
      // 		}
      // 	} );
      // }

      // 合并全局自定义CSS
      const css = userStyles?.css || variation.styles?.css ? {
        css: `${variation.styles?.css || ''} ${userStyles?.css || ''}`
      } : {};
      const blocks = Object.keys(blockStyles).length > 0 ? {
        blocks: blockStyles
      } : {};

      // const styles = {
      // 	...variation.styles,
      // 	...css,
      // 	...blocks,
      // };
      const styles = {
        ...variation.styles,
        // ...css,
        ...blocks
      };
      return {
        ...variation,
        settings: (_variation$settings = variation.settings) !== null && _variation$settings !== void 0 ? _variation$settings : {},
        styles
      };
    });
    return mergedVariations;
  }, [fullStyleVariations, userStyles?.blocks, userStyles?.css]);
  // 如果没有变体数据，返回null
  // style目录下没有风格，照样有显示默认风格
  if (!themeVariations || themeVariations?.length < 1) {
    return null;
  }
  /**
   * seogtp 处理弹窗确认逻辑
   */
  const handleAddStyle = async () => {
    const trimmedStyleName = newStyleName.trim();
    if (!trimmedStyleName) {
      alert(__('请输入风格的名字'));
      return;
    }
    setIsLoading(true);

    // 直接通过 themeVariations 检查是否存在相同的风格文件
    const styleExists = themeVariations.some(variation => variation.title.toLowerCase() === trimmedStyleName.toLowerCase());
    if (styleExists) {
      alert(__('已经创建此风格'));
    } else if (themeVariations.length >= 8) {
      alert(__('风格最多创建8个'));
    } else {
      try {
        // 创建新风格文件
        const createResponse = await apiFetch({
          path: '/seogtp/v1/create-style',
          method: 'POST',
          data: {
            new_style_name: trimmedStyleName
          }
        });
        // 使缓存失效，确保全局样式的重新获取
        await dispatch(coreStore).invalidateResolution('getGlobalStyles');
        await dispatch(coreStore).invalidateResolution('__experimentalGetCurrentThemeGlobalStylesVariations');
        if (createResponse.success) {
          alert(__('新风格创建成功'));
        } else {
          alert(__('新风格创建失败，稍后再试'));
        }
      } catch (error) {
        alert(__('处理请求时发生错误。'));
      }
    }
    setIsLoading(false);
    setIsModalOpen(false); // 关闭弹窗
    setNewStyleName(''); // 清空输入框
  };

  /* seogtp将currentStyle传递给Variation */
  // 渲染Grid组件，展示主题变体
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(Grid, {
      columns: 2,
      className: "edit-site-global-styles-style-variations-container",
      gap: gap,
      children: themeVariations.map((variation, index) => /*#__PURE__*/_jsx(Variation, {
        variation: variation,
        currentStyle: currentStyle,
        children: isFocused => /*#__PURE__*/_jsx(PreviewStyles, {
          label: variation?.title,
          withHoverView: true,
          isFocused: isFocused,
          variation: variation
        })
      }, index))
    }), themeVariations.length < 8 && /*#__PURE__*/_jsx(Button, {
      isPrimary: true,
      onClick: () => setIsModalOpen(true),
      children: __('添加新的风格')
    }), isModalOpen && /*#__PURE__*/_jsxs(Modal, {
      title: __('输入新风格的名称'),
      onRequestClose: () => setIsModalOpen(false),
      children: [/*#__PURE__*/_jsx(TextControl, {
        label: __('风格'),
        value: newStyleName,
        onChange: value => setNewStyleName(value)
      }), /*#__PURE__*/_jsx(Button, {
        isPrimary: true,
        onClick: handleAddStyle,
        children: __('确定')
      }), /*#__PURE__*/_jsx(Button, {
        isSecondary: true,
        onClick: () => setIsModalOpen(false),
        children: __('取消')
      })]
    })]
  });
}
//# sourceMappingURL=style-variations-container.js.map