/**
 * 引入依赖WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { button as icon } from '@wordpress/icons';

/**
 * 引入内部依赖Internal dependencies
 */
import initBlock from '../utils/init-block'; // 引入了一个内部的初始化方法 initBlock，用来初始化块的注册逻辑，通常包含一些通用的块注册操作。
import deprecated from './deprecated';
import edit from './edit';
import metadata from './block.json';
import save from './save';

const { name } = metadata;

export { metadata, name }; // 将 metadata 和 name 进行导出，这样其他文件就可以引用这个模块的块名称和元数据。
/**
 * 定义块的设置
 */
export const settings = {
	icon,
	example: {
		attributes: {
			className: 'is-style-fill',
			text: __( 'Call to Action' ),
		},
	},
	edit,
	save,
	deprecated,
	merge: ( a, { text = '' } ) => ( {
		...a,
		text: ( a.text || '' ) + text,
	} ),
};

export const init = () => initBlock( { name, metadata, settings } );
