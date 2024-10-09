/**
 * Internal dependencies
 */
import './hooks';
import '../../edit-site/src/store/seogtp_style_store'; // 引入并注册 seogtp_style_store

export { storeConfig, store } from './store';
export * from './components';
export * from './utils';
export * from './private-apis';
export * from './dataviews/api';

/*
 * Backward compatibility
 */
export { transformStyles } from '@wordpress/block-editor';
//# sourceMappingURL=index.js.map