// 外部依赖
import clsx from 'clsx';

// WordPress 依赖
import {
	createContext,
	useContext,
	useState,
	useRef,
	useLayoutEffect,
} from '@wordpress/element';
import { focus } from '@wordpress/dom';

// 创建一个上下文，用于管理侧边栏导航状态
export const SidebarNavigationContext = createContext( () => {} );

// 根据导航方向和选择器聚焦侧边栏元素
function focusSidebarElement( el, direction, focusSelector ) {
	let elementToFocus;
	if ( direction === 'back' && focusSelector ) {
		elementToFocus = el.querySelector( focusSelector );
	}
	if ( direction !== null && ! elementToFocus ) {
		const [ firstTabbable ] = focus.tabbable.find( el );
		elementToFocus = firstTabbable ?? el;
	}
	elementToFocus?.focus();
}

// 创建导航状态，用于管理导航方向和聚焦选择器
function createNavState() {
	let state = {
		direction: null,
		focusSelector: null,
	};

	return {
		get() {
			return state;
		},
		navigate( direction, focusSelector = null ) {
			state = {
				direction,
				focusSelector:
					direction === 'forward' && focusSelector
						? focusSelector
						: state.focusSelector,
			};
		},
	};
}

// 侧边栏内容包装组件
function SidebarContentWrapper( { children } ) {
	const navState = useContext( SidebarNavigationContext );
	const wrapperRef = useRef();
	const [ navAnimation, setNavAnimation ] = useState( null );

	useLayoutEffect( () => {
		const { direction, focusSelector } = navState.get();
		focusSidebarElement( wrapperRef.current, direction, focusSelector );
		setNavAnimation( direction );
	}, [ navState ] );

	const wrapperCls = clsx( 'edit-site-sidebar__screen-wrapper', {
		'slide-from-left': navAnimation === 'back',
		'slide-from-right': navAnimation === 'forward',
	} );

	return (
		<div ref={ wrapperRef } className={ wrapperCls }>
			{ children }
		</div>
	);
}

// 侧边栏内容主组件
export default function SidebarContent( { routeKey, children } ) {
	const [ navState ] = useState( createNavState );

	return (
		<SidebarNavigationContext.Provider value={ navState }>
			<div className="edit-site-sidebar__content">
				<SidebarContentWrapper key={ routeKey }>
					{ children }
				</SidebarContentWrapper>
			</div>
		</SidebarNavigationContext.Provider>
	);
}
