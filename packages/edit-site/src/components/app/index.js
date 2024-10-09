/**
 * WordPress 依赖项
 */
import { SlotFillProvider } from '@wordpress/components'; // 提供插槽和填充组件的功能
import {
	UnsavedChangesWarning, // 未保存更改的警告组件
	privateApis as editorPrivateApis, // 编辑器私有 API
} from '@wordpress/editor';
import { store as noticesStore } from '@wordpress/notices'; // 通知存储
import { useDispatch } from '@wordpress/data'; // 数据分发钩子
import { __, sprintf } from '@wordpress/i18n'; // 国际化工具
import { PluginArea } from '@wordpress/plugins'; // 插件区域组件
import { privateApis as routerPrivateApis } from '@wordpress/router'; // 路由器私有 API

/**
 * 内部依赖项
 */
import Layout from '../layout'; // 布局组件
import { unlock } from '../../lock-unlock'; // 解锁私有 API
import { useCommonCommands } from '../../hooks/commands/use-common-commands'; // 通用命令钩子
import { useEditModeCommands } from '../../hooks/commands/use-edit-mode-commands'; // 编辑模式命令钩子
import useInitEditedEntityFromURL from '../sync-state-with-url/use-init-edited-entity-from-url'; // 从 URL 初始化编辑实体的钩子
import useLayoutAreas from '../layout/router'; // 布局区域钩子
import useSetCommandContext from '../../hooks/commands/use-set-command-context'; // 设置命令上下文的钩子

// 解锁并使用路由器和编辑器的私有 API
const { RouterProvider } = unlock( routerPrivateApis );
const { GlobalStylesProvider } = unlock( editorPrivateApis );

function AppLayout() {
	// 确保编辑实体的 ID 和类型被正确初始化
	useInitEditedEntityFromURL();
	useEditModeCommands();
	useCommonCommands();
	useSetCommandContext();
	const route = useLayoutAreas(); // 获取当前路由

	return <Layout route={ route } />; // 渲染布局组件
}

export default function App() {
	const { createErrorNotice } = useDispatch( noticesStore ); // 获取创建错误通知的函数

	// 插件区域错误处理函数
	function onPluginAreaError( name ) {
		createErrorNotice(
			sprintf(
				/* translators: %s: 插件名称 */
				__(
					'插件“%s”遇到错误，无法渲染。'
				),
				name
			)
		);
	}

	return (
		<SlotFillProvider>
			<GlobalStylesProvider>
				<UnsavedChangesWarning />
				<RouterProvider>
					<AppLayout />
					<PluginArea onError={ onPluginAreaError } />
				</RouterProvider>
			</GlobalStylesProvider>
		</SlotFillProvider>
	);
}
