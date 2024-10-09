import type { WPPlugin } from '../../api';
/**
 * 渲染所有插件填充的组件，并将其放置在一个隐藏的 div 中。
 *
 * @param props
 * @param props.scope 插件的作用域
 * @param props.onError 插件出错时的回调函数
 * @return 返回要渲染的组件
 */
declare function PluginArea({ scope, onError, }: {
    scope?: string;
    onError?: (name: WPPlugin['name'], error: Error) => void;
}): import("react").JSX.Element;
export default PluginArea;
//# sourceMappingURL=index.d.ts.map