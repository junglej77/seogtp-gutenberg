/**
 * WordPress dependencies
 */
import { __experimentalItemGroup as ItemGroup } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { layout, symbol, navigation, styles, page } from '@wordpress/icons';
import { useDispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

/**
 * Internal dependencies
 */
import SidebarNavigationScreen from '../sidebar-navigation-screen';
import SidebarNavigationItem from '../sidebar-navigation-item';
import { SidebarNavigationItemGlobalStyles } from '../sidebar-navigation-screen-global-styles';
import { unlock } from '../../lock-unlock';
import { store as editSiteStore } from '../../store';
import {
	NAVIGATION_POST_TYPE,
	TEMPLATE_POST_TYPE,
	PATTERN_TYPES,
} from '../../utils/constants';

export default function SidebarNavigationScreenMain() {
	const { setEditorCanvasContainerView } = unlock(
		useDispatch( editSiteStore )
	);

	// Clear the editor canvas container view when accessing the main navigation screen.
	useEffect( () => {
		setEditorCanvasContainerView( undefined );
	}, [ setEditorCanvasContainerView ] );

	return (
		<SidebarNavigationScreen
			isRoot
			title={ __( '网站全局设计' ) }
			description={ __(
				'使用块编辑器自定义网站的外观。'
			) }
			content={
				<>
					<ItemGroup>
						<SidebarNavigationItem
							uid="navigation-navigation-item"
							params={ { postType: NAVIGATION_POST_TYPE } }
							withChevron
							icon={ navigation }
						>
							{ __( '导航' ) }
						</SidebarNavigationItem>
						<SidebarNavigationItemGlobalStyles
							uid="styles-navigation-item"
							withChevron
							icon={ styles }
						>
							{ __( '风格' ) }
						</SidebarNavigationItemGlobalStyles>
						<SidebarNavigationItem
							uid="page-navigation-item"
							params={ { postType: 'page' } }
							withChevron
							icon={ page }
						>
							{ __( '页面' ) }
						</SidebarNavigationItem>
						<SidebarNavigationItem
							uid="template-navigation-item"
							params={ { postType: TEMPLATE_POST_TYPE } }
							withChevron
							icon={ layout }
						>
							{ __( '模板' ) }
						</SidebarNavigationItem>
						<SidebarNavigationItem
							uid="patterns-navigation-item"
							params={ { postType: PATTERN_TYPES.user } }
							withChevron
							icon={ symbol }
						>
							{ __( '块设计' ) }
						</SidebarNavigationItem>
					</ItemGroup>
				</>
			}
		/>
	);
}
