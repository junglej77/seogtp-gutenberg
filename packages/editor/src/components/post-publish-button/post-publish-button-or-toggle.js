/**
 * WordPress 依赖
 */
import { useViewportMatch, compose } from '@wordpress/compose';
import { withDispatch, withSelect } from '@wordpress/data';

/**
 * 内部依赖
 */
import PostPublishButton from './index';
import { store as editorStore } from '../../store';

export function PostPublishButtonOrToggle( {
	forceIsDirty,
	hasPublishAction,
	isBeingScheduled,
	isPending,
	isPublished,
	isPublishSidebarEnabled,
	isPublishSidebarOpened,
	isScheduled,
	togglePublishSidebar,
	setEntitiesSavedStatesCallback,
	postStatusHasChanged,
	postStatus,
} ) {
	const IS_TOGGLE = 'toggle';
	const IS_BUTTON = 'button';
	const isSmallerThanMediumViewport = useViewportMatch( 'medium', '<' );
	let component;

	/**
	 * 显示 BUTTON（直接发布）或 TOGGLE（打开发布侧边栏）的条件：
	 *
	 * 1) 当文章状态处于特定角色的最终阶段时，我们希望显示 BUTTON：
	 *
	 * - 已发布
	 * - 文章状态已明确更改为不同于 'future' 或 'publish'
	 * - 已安排发布
	 * - 处于待定状态且无法发布（仅适用于视口 >= medium）。
	 * 	 最初，我们考虑为无法发布的待定文章显示按钮（例如，对于具有贡献者角色的作者）。
	 * 	 某些语言的“提交审核”翻译可能很长，因此考虑到可用 UI 空间的不足，我们决定在这种情况下考虑视口。
	 * 	 参见：https://github.com/WordPress/gutenberg/issues/10475
	 *
	 * 2) 然后，在小视口中，我们将显示 TOGGLE。
	 *
	 * 3) 最后，我们将使用发布侧边栏状态来决定：
	 *
	 * - 如果启用，我们显示 TOGGLE
	 * - 如果禁用，我们显示 BUTTON
	 */
	if (
		isPublished ||
		( postStatusHasChanged &&
			! [ 'future', 'publish' ].includes( postStatus ) ) ||
		( isScheduled && isBeingScheduled ) ||
		( isPending && ! hasPublishAction && ! isSmallerThanMediumViewport )
	) {
		component = IS_BUTTON;
	} else if ( isSmallerThanMediumViewport || isPublishSidebarEnabled ) {
		component = IS_TOGGLE;
	} else {
		component = IS_BUTTON;
	}

	return (
		<PostPublishButton
			forceIsDirty={ forceIsDirty }
			isOpen={ isPublishSidebarOpened }
			isToggle={ component === IS_TOGGLE }
			onToggle={ togglePublishSidebar }
			setEntitiesSavedStatesCallback={ setEntitiesSavedStatesCallback }
		/>
	);
}

export default compose(
	withSelect( ( select ) => ( {
		hasPublishAction:
			select( editorStore ).getCurrentPost()?._links?.[
				'wp:action-publish'
			] ?? false,
		isBeingScheduled: select( editorStore ).isEditedPostBeingScheduled(),
		isPending: select( editorStore ).isCurrentPostPending(),
		isPublished: select( editorStore ).isCurrentPostPublished(),
		isPublishSidebarEnabled:
			select( editorStore ).isPublishSidebarEnabled(),
		isPublishSidebarOpened: select( editorStore ).isPublishSidebarOpened(),
		isScheduled: select( editorStore ).isCurrentPostScheduled(),
		postStatus: select( editorStore ).getEditedPostAttribute( 'status' ),
		postStatusHasChanged: select( editorStore ).getPostEdits()?.status,
	} ) ),
	withDispatch( ( dispatch ) => {
		const { togglePublishSidebar } = dispatch( editorStore );
		return {
			togglePublishSidebar,
		};
	} )
)( PostPublishButtonOrToggle );
