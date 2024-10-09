/**
 * WordPress 依赖
 */
import { __ } from '@wordpress/i18n'; // 用于文本的国际化处理。
import { edit, seen } from '@wordpress/icons'; // 提供编辑和查看图标。
import { useSelect, useDispatch } from '@wordpress/data'; // 用于访问和操作 Redux 存储。
import { store as coreStore } from '@wordpress/core-data'; // 访问 WordPress 核心数据的存储。
import { useViewportMatch } from '@wordpress/compose'; // 用于根据视口尺寸来决定渲染逻辑。
import { useCallback } from '@wordpress/element'; // 用于定义回调函数，优化性能。
import { store as editorStore } from '@wordpress/editor'; // 访问编辑器功能的存储。
import { store as preferencesStore } from '@wordpress/preferences'; // 访问用户偏好设置的存储。

/**
 * 内部依赖
 */
import SidebarNavigationScreen from '../sidebar-navigation-screen'; // 侧边栏导航屏幕组件。
import { unlock } from '../../lock-unlock'; // 可能是一个功能解锁工具。
import { store as editSiteStore } from '../../store'; // 用于编辑站点的 Redux 存储。
import SidebarButton from '../sidebar-button'; // 自定义的侧边栏按钮组件。
import SidebarNavigationItem from '../sidebar-navigation-item'; // 侧边栏导航项组件。
import StyleBook from '../style-book'; // 样式书组件。
import useGlobalStylesRevisions from '../global-styles/screen-revisions/use-global-styles-revisions'; // 自定义钩子，用于获取全局样式的修订版本信息。
import SidebarNavigationScreenDetailsFooter from '../sidebar-navigation-screen-details-footer'; // 侧边导航屏幕详细信息的底部组件。
import SidebarNavigationScreenGlobalStylesContent from './content'; // 全局样式内容组件的实现。

/**
 * 定义一个展示全局样式选项的组件。
 */
export function SidebarNavigationItemGlobalStyles(props) {
    // 使用 useDispatch 钩子获取 dispatch 方法。
    const { openGeneralSidebar } = useDispatch(editSiteStore);
    const { setCanvasMode } = unlock(useDispatch(editSiteStore));

    // 使用 useSelect 钩子选择全局样式变体的存在状态。
    const hasGlobalStyleVariations = useSelect(
        (select) =>
            !!select(coreStore).__experimentalGetCurrentThemeGlobalStylesVariations()?.length,
        []
    );

    // 根据全局样式变体的存在与否，渲染不同的组件。
    if (hasGlobalStyleVariations) {
        return (
            <SidebarNavigationItem
                {...props}
                params={{ path: '/wp_global_styles' }}
                uid="global-styles-navigation-item"
            />
        );
    }
    return (
        <SidebarNavigationItem
            {...props}
            onClick={() => {
                // 切换到编辑模式。
                setCanvasMode('edit');
                // 打开全局样式的侧边栏。
                openGeneralSidebar('edit-site/global-styles');
            }}
        />
    );
}

/**
 * 定义一个用于全局样式管理的侧边栏导航屏幕组件。
 */
export default function SidebarNavigationScreenGlobalStyles({ backPath }) {
    // 使用自定义钩子获取全局样式修订版本信息。
    const { revisions, isLoading: isLoadingRevisions } = useGlobalStylesRevisions();
    const { openGeneralSidebar } = useDispatch(editSiteStore);
    const { setIsListViewOpened } = useDispatch(editorStore);
    const isMobileViewport = useViewportMatch('medium', '<');
    const { setCanvasMode, setEditorCanvasContainerView } = unlock(useDispatch(editSiteStore));
    const { isViewMode, isStyleBookOpened, revisionsCount } = useSelect((select) => {
        const { getCanvasMode, getEditorCanvasContainerView } = unlock(select(editSiteStore));
        const { getEntityRecord, __experimentalGetCurrentGlobalStylesId } = select(coreStore);
        const globalStylesId = __experimentalGetCurrentGlobalStylesId();
        const globalStyles = globalStylesId ? getEntityRecord('root', 'globalStyles', globalStylesId) : undefined;
        return {
            isViewMode: 'view' === getCanvasMode(),
            isStyleBookOpened: 'style-book' === getEditorCanvasContainerView(),
            revisionsCount: globalStyles?._links?.['version-history']?.[0]?.count ?? 0,
        };
    });

    const { set: setPreference } = useDispatch(preferencesStore);

    // 定义打开全局样式编辑器的函数。
    const openGlobalStyles = useCallback(async () => {
        return Promise.all([
            setPreference('core', 'distractionFree', false),
            setCanvasMode('edit'),
            openGeneralSidebar('edit-site/global-styles'),
        ]);
    }, [setCanvasMode, openGeneralSidebar, setPreference]);

    // 定义打开样式书的函数。
    const openStyleBook = useCallback(async () => {
        await openGlobalStyles();
        // 打开样式书，确保不会过早关闭。
        setEditorCanvasContainerView('style-book');
        setIsListViewOpened(false);
    }, [openGlobalStyles, setEditorCanvasContainerView, setIsListViewOpened]);

    // 定义打开全局样式修订历史的函数。
    const openRevisions = useCallback(async () => {
        await openGlobalStyles();
        // 打开全球样式修订历史。
        setEditorCanvasContainerView('global-styles-revisions');
    }, [openGlobalStyles, setEditorCanvasContainerView]);

    // 判断是否显示全球样式底部栏。
    const hasRevisions = revisionsCount > 0;
    const modifiedDateTime = revisions?.[0]?.modified;
    const shouldShowGlobalStylesFooter = hasRevisions && !isLoadingRevisions && modifiedDateTime;

    // 渲染组件。
    return (
        <>
            <SidebarNavigationScreen
                title={__('风格展示！')}
                description={__('为你的当前主题选择不同的风格！')}
                backPath={backPath}
                content={<SidebarNavigationScreenGlobalStylesContent />}
                footer={
                    shouldShowGlobalStylesFooter && (
                        <SidebarNavigationScreenDetailsFooter
                            record={revisions?.[0]}
                            onClick={openRevisions}
                        />
                    )
                }
                actions={
                    <>
                        {!isMobileViewport && (
                            <SidebarButton
                                icon={seen}
                                label={__('Style Book')}
                                onClick={() =>
                                    setEditorCanvasContainerView(
                                        !isStyleBookOpened ? 'style-book' : undefined
                                    )
                                }
                                isPressed={isStyleBookOpened}
                            />
                        )}
                        <SidebarButton
                            icon={edit}
                            label={__('Edit styles')}
                            onClick={async () => await openGlobalStyles()}
                        />
                    </>
                }
            />
            {isStyleBookOpened && !isMobileViewport && isViewMode && (
                <StyleBook
                    enableResizing={false}
                    isSelected={() => false}
                    onClick={openStyleBook}
                    onSelect={openStyleBook}
                    showCloseButton={false}
                    showTabs={false}
                />
            )}
        </>
    );
}
