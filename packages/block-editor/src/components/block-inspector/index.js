import { __ } from '@wordpress/i18n'; // 用于国际化和本地化字符串
import {
	getBlockType,
	getUnregisteredTypeHandlerName,
	store as blocksStore,
} from '@wordpress/blocks'; // 从blocks库导入函数，用于获取块类型等信息
import { PanelBody, __unstableMotion as motion } from '@wordpress/components'; // 从components库导入UI组件，PanelBody用于显示一个面板，motion用于动画
import { useSelect } from '@wordpress/data'; // 从data库导入用于从Redux store中提取数据的钩子

import SkipToSelectedBlock from '../skip-to-selected-block'; // 跳转到选中块的组件
import BlockCard from '../block-card'; // 显示块信息的卡片组件
import MultiSelectionInspector from '../multi-selection-inspector'; // 多选块检查器组件
import BlockVariationTransforms from '../block-variation-transforms'; // 块变体转换组件
import useBlockDisplayInformation from '../use-block-display-information'; // 获取块显示信息的钩子
import { store as blockEditorStore } from '../../store'; // 引入块编辑器的store
import BlockStyles from '../block-styles'; // 块样式组件
import InspectorControls from '../inspector-controls'; // 检查器控件组件
import InspectorControlsTabs from '../inspector-controls-tabs'; // 检查器控制选项卡组件
import useInspectorControlsTabs from '../inspector-controls-tabs/use-inspector-controls-tabs'; // 使用检查器控制选项卡的钩子
import PositionControls from '../inspector-controls-tabs/position-controls-panel'; // 位置控制面板组件
import useBlockInspectorAnimationSettings from './useBlockInspectorAnimationSettings'; // 使用块检查器动画设置的钩子
import BlockInfo from '../block-info-slot-fill'; // 块信息插槽填充组件
import BlockQuickNavigation from '../block-quick-navigation'; // 块快速导航组件
import { useBorderPanelLabel } from '../../hooks/border'; // 使用边框面板标签的钩子

import { unlock } from '../../lock-unlock'; // 解锁函数，可能是一个自定义功能，用于处理权限或解锁特定功能

// 块样式面板组件，展示块的样式设置
function BlockStylesPanel( { clientId } ) {
	return (
		<PanelBody title={ __( 'Styles' ) }>
			<BlockStyles clientId={ clientId } />
		</PanelBody>
	);
}
/**
 * 锁定块的检查器逻辑
 * topLevelLockedBlock: 这是传递给组件的参数，表示当前被锁定或作为顶层块的块的ID。这通常指的是用户不能自由编辑的块（例如模板中的某些块）。
 */
function BlockInspectorLockedBlocks( { topLevelLockedBlock } ) {
	/**
	 * getClientIdsOfDescendants: 从存储中获取特定块的所有子块的ID。
	 * getBlockName: 获取块ID对应的块类型名称。
	 * getBlockEditingMode: 获取块的编辑模式，这里特别检查模式是否为contentOnly，这通常意味着块是纯内容块，不应该有其他复杂的布局或样式控制。
	 * contentClientIds: 这个变量存储所有满足条件（非列表项且仅内容模式）的子块ID的数组。
	 */
	const contentClientIds = useSelect(
		( select ) => {
			const {
				getClientIdsOfDescendants,
				getBlockName,
				getBlockEditingMode,
			} = select( blockEditorStore );
			return getClientIdsOfDescendants( topLevelLockedBlock ).filter(
				( clientId ) =>
					getBlockName( clientId ) !== 'core/list-item' &&
					getBlockEditingMode( clientId ) === 'contentOnly'
			);
		},
		[ topLevelLockedBlock ]
	);
	console.log('contentClientIds',contentClientIds);
	
	/**
	 * getBlockStyles: 从存储中获取块的样式选项，通常这些是预定义的样式变体。
	 * hasBlockStyles: 如果顶层锁定块有任何样式变体，此变量为 true。
	 */
	const hasBlockStyles = useSelect(
		( select ) => {
			const { getBlockName } = select( blockEditorStore );
			const { getBlockStyles } = select( blocksStore );
			return !! getBlockStyles( getBlockName( topLevelLockedBlock ) )
				?.length;
		},
		[ topLevelLockedBlock ]
	);
	/**
	 * useBlockDisplayInformation: 一个钩子，用于获取块的显示信息，如标题和图标。
	 * BlockCard: 一个组件，显示块的基本信息，如标题和图标。
	 * BlockInfo.Slot: 一个插槽，用于插入额外的块信息。
	 * BlockStylesPanel: 如果块有样式选项，这个组件会显示样式选择面板。
	 * PanelBody: 显示一个面板，这里用于包装“Content”标题下的内容。
	 * BlockQuickNavigation: 提供一个快速导航界面，允许用户在子块之间快速切换。
	 */
	const blockInformation = useBlockDisplayInformation( topLevelLockedBlock );
	return (
		<div className="block-editor-block-inspector">
			<BlockCard
				{ ...blockInformation }
				className={ blockInformation.isSynced && 'is-synced' }
			/>
			<BlockInfo.Slot />
			{ hasBlockStyles && (
				<BlockStylesPanel clientId={ topLevelLockedBlock } />
			) }
			{ contentClientIds.length > 0 && (
				<PanelBody title={ __( 'Content' ) }>
					<BlockQuickNavigation clientIds={ contentClientIds } />
				</PanelBody>
			) }
		</div>
	);
}
// 主块检查器组件，根据选中块的情况显示不同的检查器内容
const BlockInspector = ( { showNoBlockSelectedMessage = true } ) => {
	const {
		count,
		selectedBlockName,
		selectedBlockClientId,
		blockType,
		topLevelLockedBlock,
	} = useSelect( ( select ) => {
		const {
			getSelectedBlockClientId,
			getSelectedBlockCount,
			getBlockName,
			getContentLockingParent,
			getTemplateLock,
		} = unlock( select( blockEditorStore ) );
		const _selectedBlockClientId = getSelectedBlockClientId();
		const _selectedBlockName =
			_selectedBlockClientId && getBlockName( _selectedBlockClientId );
		const _blockType =
			_selectedBlockName && getBlockType( _selectedBlockName );

		return {
			count: getSelectedBlockCount(),
			selectedBlockClientId: _selectedBlockClientId,
			selectedBlockName: _selectedBlockName,
			blockType: _blockType,
			topLevelLockedBlock:
				getContentLockingParent( _selectedBlockClientId ) ||
				( getTemplateLock( _selectedBlockClientId ) === 'contentOnly' ||
				_selectedBlockName === 'core/block'
					? _selectedBlockClientId
					: undefined ),
		};
	}, [] );
	console.log('blockType',blockType);
	const availableTabs = useInspectorControlsTabs( blockType?.name );
	console.log('availableTabs',availableTabs);
	const showTabs = availableTabs?.length > 1;

	// The block inspector animation settings will be completely
	// removed in the future to create an API which allows the block
	// inspector to transition between what it
	// displays based on the relationship between the selected block
	// and its parent, and only enable it if the parent is controlling
	// its children blocks.
	const blockInspectorAnimationSettings =
		useBlockInspectorAnimationSettings( blockType );

	const borderPanelLabel = useBorderPanelLabel( {
		blockName: selectedBlockName,
	} );

	if ( count > 1 ) {
		return (
			<div className="block-editor-block-inspector">
				<MultiSelectionInspector />
				{ showTabs ? (
					<InspectorControlsTabs tabs={ availableTabs } />
				) : (
					<>
						<InspectorControls.Slot />
						<InspectorControls.Slot
							group="color"
							label={ __( 'Color' ) }
							className="color-block-support-panel__inner-wrapper"
						/>
						<InspectorControls.Slot
							group="background"
							label={ __( 'Background image' ) }
						/>
						<InspectorControls.Slot
							group="typography"
							label={ __( 'Typography' ) }
						/>
						<InspectorControls.Slot
							group="dimensions"
							label={ __( 'Dimensions' ) }
						/>
						<InspectorControls.Slot
							group="border"
							label={ borderPanelLabel }
						/>
						<InspectorControls.Slot group="styles" />
					</>
				) }
			</div>
		);
	}

	const isSelectedBlockUnregistered =
		selectedBlockName === getUnregisteredTypeHandlerName();

	/*
	 * If the selected block is of an unregistered type, avoid showing it as an actual selection
	 * because we want the user to focus on the unregistered block warning, not block settings.
	 */
	if (
		! blockType ||
		! selectedBlockClientId ||
		isSelectedBlockUnregistered
	) {
		if ( showNoBlockSelectedMessage ) {
			return (
				<span className="block-editor-block-inspector__no-blocks">
					{ __( '没有选择块' ) }
				</span>
			);
		}
		return null;
	}
	console.log(topLevelLockedBlock);
	if ( topLevelLockedBlock ) {
		return (
			<BlockInspectorLockedBlocks
				topLevelLockedBlock={ topLevelLockedBlock }
			/>
		);
	}
	console.log('打印单个设置');
	return (
		<BlockInspectorSingleBlockWrapper
			animate={ blockInspectorAnimationSettings }
			wrapper={ ( children ) => (
				<AnimatedContainer
					blockInspectorAnimationSettings={
						blockInspectorAnimationSettings
					}
					selectedBlockClientId={ selectedBlockClientId }
				>
					{ children }
				</AnimatedContainer>
			) }
		>
			<BlockInspectorSingleBlock
				clientId={ selectedBlockClientId }
				blockName={ blockType.name }
			/>
		</BlockInspectorSingleBlockWrapper>
	);
};
/**
 * 功能: 这个组件用作条件性容器，它决定是否对包含的内容（通常是块检查器的细节部分）应用额外的包装逻辑。
	用途: 如果 animate 属性为 true，则通过 wrapper 函数添加动画或其他包装逻辑。这主要用于动画效果，提升用户体验。
	使用场景: 在需要根据某些条件（例如，动画开关或配置）动态包装块检查器内容时使用。
 */
const BlockInspectorSingleBlockWrapper = ( { animate, wrapper, children } ) => {
	return animate ? wrapper( children ) : children;
};
/**
 * 功能: 该组件使用 motion.div（来自 Framer Motion 库）为其子组件提供动画效果。动画的起始位置和透明度根据 blockInspectorAnimationSettings 动态设置。
	用途: 主要用于增强用户界面的视觉体验，通过平滑的动画过渡显示选中的块的检查器内容。
	使用场景: 当块被选中并且用户配置了动画效果时，此容器用于渲染块检查器的主体内容。
 */
const AnimatedContainer = ( {
	blockInspectorAnimationSettings,
	selectedBlockClientId,
	children,
} ) => {
	const animationOrigin =
		blockInspectorAnimationSettings &&
		blockInspectorAnimationSettings.enterDirection === 'leftToRight'
			? -50
			: 50;

	return (
		<motion.div
			animate={ {
				x: 0,
				opacity: 1,
				transition: {
					ease: 'easeInOut',
					duration: 0.14,
				},
			} }
			initial={ {
				x: animationOrigin,
				opacity: 0,
			} }
			key={ selectedBlockClientId }
		>
			{ children }
		</motion.div>
	);
};
/**
 * 功能: 该组件用于展示选中块的详细信息和可用控制选项。
	用途: 根据块名称加载相应的控制选项卡，显示块的样式、颜色、背景等设置。
	使用场景: 用于单块检查器视图，当只有一个块被选中时，此组件负责渲染所有相关的控制面板和设置。
 */
const BlockInspectorSingleBlock = ( { clientId, blockName } ) => {
	const availableTabs = useInspectorControlsTabs( blockName );
	const showTabs = availableTabs?.length > 1;
	console.log('showTabs',showTabs);
	
	const hasBlockStyles = useSelect(
		( select ) => {
			const { getBlockStyles } = select( blocksStore );
			const blockStyles = getBlockStyles( blockName );
			return blockStyles && blockStyles.length > 0;
		},
		[ blockName ]
	);
	console.log('hasBlockStyles',hasBlockStyles);

	const blockInformation = useBlockDisplayInformation( clientId );
	const borderPanelLabel = useBorderPanelLabel( { blockName } );

	return (
		<div className="block-editor-block-inspector">
			<BlockCard
				{ ...blockInformation }
				className={ blockInformation.isSynced && 'is-synced' }
			/>
			<BlockVariationTransforms blockClientId={ clientId } />
			<BlockInfo.Slot />
			{ showTabs && (
				<InspectorControlsTabs
					hasBlockStyles={ hasBlockStyles }
					clientId={ clientId }
					blockName={ blockName }
					tabs={ availableTabs }
				/>
			) }
			{ ! showTabs && (
				<>
					{ hasBlockStyles && (
						<BlockStylesPanel clientId={ clientId } />
					) }
					<InspectorControls.Slot />
					<InspectorControls.Slot group="list" />
					<InspectorControls.Slot
						group="color"
						label={ __( 'Color' ) }
						className="color-block-support-panel__inner-wrapper"
					/>
					<InspectorControls.Slot
						group="background"
						label={ __( 'Background image' ) }
					/>
					<InspectorControls.Slot
						group="typography"
						label={ __( 'Typography' ) }
					/>
					<InspectorControls.Slot
						group="dimensions"
						label={ __( 'Dimensions' ) }
					/>
					<InspectorControls.Slot
						group="border"
						label={ borderPanelLabel }
					/>
					<InspectorControls.Slot group="styles" />
					<PositionControls />
					<InspectorControls.Slot group="bindings" />
				</>
			) }
			<SkipToSelectedBlock key="back" />
		</div>
	);
};

/**
 * @see https://github.com/WordPress/gutenberg/blob/HEAD/packages/block-editor/src/components/block-inspector/README.md
 */
export default BlockInspector;
