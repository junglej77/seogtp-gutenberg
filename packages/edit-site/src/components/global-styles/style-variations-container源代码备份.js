// 导入WordPress核心数据存储
import { store as coreStore } from '@wordpress/core-data';
// 导入数据选择器
import { useSelect } from '@wordpress/data';
// 导入React相关钩子
import { useContext, useEffect, useMemo, useState } from '@wordpress/element';
// 导入Grid组件
import { __experimentalGrid as Grid } from '@wordpress/components';
// 导入国际化函数
import { __ } from '@wordpress/i18n';
// 导入区块编辑器的私有API
import { privateApis as blockEditorPrivateApis } from '@wordpress/block-editor';

// 导入内部依赖组件和工具函数
import PreviewStyles from './preview-styles';
import Variation from './variations/variation';
import { isVariationWithProperties } from '../../hooks/use-theme-style-variations/use-theme-style-variations-by-property';
import { unlock } from '../../lock-unlock';

// 解锁并获取GlobalStylesContext
const { GlobalStylesContext } = unlock( blockEditorPrivateApis );

// 定义StyleVariationsContainer组件
export default function StyleVariationsContainer( { gap = 2 } ) {
	// 从GlobalStylesContext中获取当前用户信息
	const { user } = useContext( GlobalStylesContext );
	// 使用state保存当前用户的样式
	const [ currentUserStyles, setCurrentUserStyles ] = useState( user );
	const userStyles = currentUserStyles?.styles;

	// 当用户信息变化时，更新当前用户的样式
	useEffect( () => {
		setCurrentUserStyles( user );
	}, [ user ] );

	// 从coreStore中获取当前主题的全局样式变体
	const variations = useSelect( ( select ) => {
		return select(
			coreStore
		).__experimentalGetCurrentThemeGlobalStylesVariations();
	}, [] );

	// 过滤掉颜色和排版相关的变体
	const fullStyleVariations = variations?.filter( ( variation ) => {
		return (
			! isVariationWithProperties( variation, [ 'color' ] ) &&
			! isVariationWithProperties( variation, [
				'typography',
				'spacing',
			] )
		);
	} );

	// 使用useMemo缓存主题变体数据
	const themeVariations = useMemo( () => {
		// 添加默认变体
		const withEmptyVariation = [
			{
				title: __( 'Default' ),
				settings: {},
				styles: {},
			},
			...( fullStyleVariations ?? [] ),
		];
		return [
			...withEmptyVariation.map( ( variation ) => {
				const blockStyles = { ...variation?.styles?.blocks } || {};

				// 将用户自定义的CSS合并到变体中，以防止切换变体时丢失
				if ( userStyles?.blocks ) {
					Object.keys( userStyles.blocks ).forEach( ( blockName ) => {
						if ( userStyles.blocks[ blockName ].css ) {
							const variationBlockStyles =
								blockStyles[ blockName ] || {};
							const customCSS = {
								css: `${
									blockStyles[ blockName ]?.css || ''
								} ${
									userStyles.blocks[ blockName ].css.trim() ||
									''
								}`,
							};
							blockStyles[ blockName ] = {
								...variationBlockStyles,
								...customCSS,
							};
						}
					} );
				}

				// 合并全局自定义CSS
				const css =
					userStyles?.css || variation.styles?.css
						? {
								css: `${ variation.styles?.css || '' } ${
									userStyles?.css || ''
								}`,
						  }
						: {};

				const blocks =
					Object.keys( blockStyles ).length > 0
						? { blocks: blockStyles }
						: {};

				const styles = {
					...variation.styles,
					...css,
					...blocks,
				};
				return {
					...variation,
					settings: variation.settings ?? {},
					styles,
				};
			} ),
		];
	}, [ fullStyleVariations, userStyles?.blocks, userStyles?.css ] );

	// 如果没有变体数据，返回null
	if ( ! fullStyleVariations || fullStyleVariations?.length < 1 ) {
		return null;
	}

	// 渲染Grid组件，展示主题变体
	return (
		<Grid
			columns={ 2 }
			className="edit-site-global-styles-style-variations-container"
			gap={ gap }
		>
			{ themeVariations.map( ( variation, index ) => (
				<Variation key={ index } variation={ variation }>
					{ ( isFocused ) => (
						<PreviewStyles
							label={ variation?.title }
							withHoverView
							isFocused={ isFocused }
							variation={ variation }
						/>
					) }
				</Variation>
			) ) }
		</Grid>
	);
}
