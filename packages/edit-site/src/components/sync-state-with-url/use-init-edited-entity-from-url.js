/**
 * WordPress dependencies
 */
import { useEffect, useMemo } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as coreDataStore } from '@wordpress/core-data';
import { privateApis as routerPrivateApis } from '@wordpress/router';

/**
 * Internal dependencies
 */
/**
 * 导入 `editSiteStore` 从 '../../store' 模块中。
 * `editSiteStore` 是一个用于管理站点编辑状态的 Redux store。
 */
import { store as editSiteStore } from '../../store';
import { unlock } from '../../lock-unlock';
import {
	// 模板文章类型
	TEMPLATE_POST_TYPE,
	// 模板部分文章类型
	TEMPLATE_PART_POST_TYPE,
	// 导航文章类型
	NAVIGATION_POST_TYPE,
	// 模式类型
	PATTERN_TYPES,
} from '../../utils/constants';


// 解锁路由器的私有API以获取当前位置信息
const { useLocation } = unlock( routerPrivateApis );

// 定义不需要父模板的帖子类型
const postTypesWithoutParentTemplate = [
	TEMPLATE_POST_TYPE,
	TEMPLATE_PART_POST_TYPE,
	NAVIGATION_POST_TYPE,
	PATTERN_TYPES.user,
];

// 定义授权的帖子类型
const authorizedPostTypes = [ 'page', 'post' ];

/**
 * 根据给定的postId和postType解析编辑的实体和上下文
 * @param {Object} params - 包含postId和postType的对象
 * @returns {Object} - 包含isReady、postType、postId和context的对象
 */
function useResolveEditedEntityAndContext( { postId, postType } ) {
	// 使用useSelect钩子获取站点数据和模板信息
	const {
		hasLoadedAllDependencies,
		homepageId,
		postsPageId,
		url,
		frontPageTemplateId,
	} = useSelect( ( select ) => {
		const { getEntityRecord, getEntityRecords } = select( coreDataStore );
		const siteData = getEntityRecord( 'root', 'site' );
		const base = getEntityRecord( 'root', '__unstableBase' );
		const templates = getEntityRecords( 'postType', TEMPLATE_POST_TYPE, {
			per_page: -1,
		} );
		const _homepageId =
			siteData?.show_on_front === 'page' &&
			[ 'number', 'string' ].includes( typeof siteData.page_on_front ) &&
			!! +siteData.page_on_front // 检查是否为零(`0`)
				? siteData.page_on_front.toString()
				: null;
		const _postsPageId =
			siteData?.show_on_front === 'page' &&
			[ 'number', 'string' ].includes( typeof siteData.page_for_posts )
				? siteData.page_for_posts.toString()
				: null;
		let _frontPageTemplateId;
		if ( templates ) {
			const frontPageTemplate = templates.find(
				( t ) => t.slug === 'front-page'
			);
			_frontPageTemplateId = frontPageTemplate
				? frontPageTemplate.id
				: false;
		}
		return {
			hasLoadedAllDependencies: !! base && !! siteData,
			homepageId: _homepageId,
			postsPageId: _postsPageId,
			url: base?.home,
			frontPageTemplateId: _frontPageTemplateId,
		};
	}, [] );

	/**
	 * 这是一个钩子，用于重新创建解析给定WordPress postID和postTypeId的模板的逻辑，
	 * 以便在站点编辑器中尽可能接近前端的匹配。
	 * 由于可能存在未保存的更改影响模板解析，因此无法依赖服务器逻辑。
	 */
	const resolvedTemplateId = useSelect(
		( select ) => {
			// 如果渲染的帖子类型没有模板，则不需要解析其模板。
			if (
				postTypesWithoutParentTemplate.includes( postType ) &&
				postId
			) {
				return undefined;
			}

			// 不要为多选帖子触发解析。
			if ( postId && postId.includes( ',' ) ) {
				return undefined;
			}

			const {
				getEditedEntityRecord,
				getEntityRecords,
				getDefaultTemplateId,
				__experimentalGetTemplateForLink,
			} = select( coreDataStore );

			function resolveTemplateForPostTypeAndId(
				postTypeToResolve,
				postIdToResolve
			) {
				// 对于首页，如果存在首页模板，则始终使用首页模板。
				if (
					postTypeToResolve === 'page' &&
					homepageId === postIdToResolve
				) {
					// 仍在检查首页模板是否存在。
					// 不要解析模板。
					if ( frontPageTemplateId === undefined ) {
						return undefined;
					}

					if ( !! frontPageTemplateId ) {
						return frontPageTemplateId;
					}
				}

				const editedEntity = getEditedEntityRecord(
					'postType',
					postTypeToResolve,
					postIdToResolve
				);
				if ( ! editedEntity ) {
					return undefined;
				}
				// 检查当前页面是否为文章页面。
				if (
					postTypeToResolve === 'page' &&
					postsPageId === postIdToResolve
				) {
					return __experimentalGetTemplateForLink( editedEntity.link )
						?.id;
				}
				// 首先检查帖子/页面是否有分配的模板并获取它。
				const currentTemplateSlug = editedEntity.template;
				if ( currentTemplateSlug ) {
					const currentTemplate = getEntityRecords(
						'postType',
						TEMPLATE_POST_TYPE,
						{
							per_page: -1,
						}
					)?.find( ( { slug } ) => slug === currentTemplateSlug );
					if ( currentTemplate ) {
						return currentTemplate.id;
					}
				}
				// 如果没有分配模板，则使用默认模板。
				let slugToCheck;
				// 在`draft`状态下，我们可能没有可用的slug，因此我们使用`single`
				// 帖子类型模板的slug（例如page、single-post、single-product等）。
				// 页面不需要在slug中添加`single`前缀以通过模板层次结构进行优先级排序。
				if ( editedEntity.slug ) {
					slugToCheck =
						postTypeToResolve === 'page'
							? `${ postTypeToResolve }-${ editedEntity.slug }`
							: `single-${ postTypeToResolve }-${ editedEntity.slug }`;
				} else {
					slugToCheck =
						postTypeToResolve === 'page'
							? 'page'
							: `single-${ postTypeToResolve }`;
				}
				return getDefaultTemplateId( {
					slug: slugToCheck,
				} );
			}

			if ( ! hasLoadedAllDependencies ) {
				return undefined;
			}

			// 如果渲染的是特定页面，则需要解析其模板。
			// 站点编辑器目前仅支持页面，不支持其他CPT。
			if (
				postType &&
				postId &&
				authorizedPostTypes.includes( postType )
			) {
				return resolveTemplateForPostTypeAndId( postType, postId );
			}

			// 如果渲染的是首页，并且有静态首页，则解析其模板。
			if ( homepageId ) {
				return resolveTemplateForPostTypeAndId( 'page', homepageId );
			}

			// 如果没有渲染特定页面，则使用首页模板。
			if ( url ) {
				const template = __experimentalGetTemplateForLink( url );
				return template?.id;
			}
		},
		[
			homepageId,
			postsPageId,
			hasLoadedAllDependencies,
			url,
			postId,
			postType,
			frontPageTemplateId,
		]
	);

	// 使用useMemo钩子生成上下文
	const context = useMemo( () => {
		if ( postTypesWithoutParentTemplate.includes( postType ) && postId ) {
			return {};
		}

		if ( postType && postId && authorizedPostTypes.includes( postType ) ) {
			return { postType, postId };
		}
		// TODO: 对于帖子类型列表，我们可能不应该渲染首页，而是渲染一个占位符
		// 带有类似“选择一个页面”的消息。
		if ( homepageId ) {
			return { postType: 'page', postId: homepageId };
		}

		return {};
	}, [ homepageId, postType, postId ] );

	// 如果帖子类型不需要父模板，则返回相应的对象
	if ( postTypesWithoutParentTemplate.includes( postType ) && postId ) {
		return { isReady: true, postType, postId, context };
	}

	// 如果所有依赖项已加载，则返回解析的模板ID和上下文
	if ( hasLoadedAllDependencies ) {
		return {
			isReady: resolvedTemplateId !== undefined,
			postType: TEMPLATE_POST_TYPE,
			postId: resolvedTemplateId,
			context,
		};
	}

	// 如果依赖项未加载，则返回未准备好的状态
	return { isReady: false };
}

/**
 * 从URL初始化编辑的实体
 */
export default function useInitEditedEntityFromURL() {
	// 获取当前位置的参数
	const { params = {} } = useLocation();
	// 解析编辑的实体和上下文
	const { postType, postId, context, isReady } =
		useResolveEditedEntityAndContext( params );

	// 获取编辑实体的调度器
	const { setEditedEntity } = useDispatch( editSiteStore );

	// 使用useEffect钩子在实体准备好时设置编辑的实体
	useEffect( () => {
		if ( isReady ) {
			setEditedEntity( postType, postId, context );
		}
	}, [ isReady, postType, postId, context, setEditedEntity ] );
}
