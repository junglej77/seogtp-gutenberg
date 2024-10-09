// 外部依赖
import memoize from 'memize';

// WordPress 依赖
import { useMemo, useSyncExternalStore } from '@wordpress/element';
import { addAction, removeAction } from '@wordpress/hooks';
import isShallowEqual from '@wordpress/is-shallow-equal';

// 内部依赖
import { PluginContextProvider } from '../plugin-context';
import { PluginErrorBoundary } from '../plugin-error-boundary';
import { getPlugins } from '../../api';
import { jsx as _jsx } from "react/jsx-runtime";
// 缓存插件上下文
const getPluginContext = memoize((icon, name) => ({
  icon,
  name
}));

/**
 * 渲染所有插件填充的组件，并将其放置在一个隐藏的 div 中。
 *
 * @param props
 * @param props.scope 插件的作用域
 * @param props.onError 插件出错时的回调函数
 * @return 返回要渲染的组件
 */
function PluginArea({
  scope,
  onError
}) {
  // 使用 useMemo 创建一个插件存储对象
  const store = useMemo(() => {
    let lastValue = [];
    return {
      // 订阅插件注册和注销事件
      subscribe(listener) {
        addAction('plugins.pluginRegistered', 'core/plugins/plugin-area/plugins-registered', listener);
        addAction('plugins.pluginUnregistered', 'core/plugins/plugin-area/plugins-unregistered', listener);
        return () => {
          removeAction('plugins.pluginRegistered', 'core/plugins/plugin-area/plugins-registered');
          removeAction('plugins.pluginUnregistered', 'core/plugins/plugin-area/plugins-unregistered');
        };
      },
      // 获取当前插件列表
      getValue() {
        const nextValue = getPlugins(scope);
        if (!isShallowEqual(lastValue, nextValue)) {
          lastValue = nextValue;
        }
        return lastValue;
      }
    };
  }, [scope]);

  // 同步外部存储的插件列表
  const plugins = useSyncExternalStore(store.subscribe, store.getValue, store.getValue);

  // 渲染插件填充
  return /*#__PURE__*/_jsx("div", {
    style: {
      display: 'none'
    },
    children: plugins.map(({
      icon,
      name,
      render: Plugin
    }) => /*#__PURE__*/_jsx(PluginContextProvider, {
      value: getPluginContext(icon, name),
      children: /*#__PURE__*/_jsx(PluginErrorBoundary, {
        name: name,
        onError: onError,
        children: /*#__PURE__*/_jsx(Plugin, {})
      })
    }, name))
  });
}
export default PluginArea;
//# sourceMappingURL=index.js.map