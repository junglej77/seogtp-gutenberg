/**
 * Internal dependencies
 */
import { NEW_TAB_REL, NEW_TAB_TARGET, NOFOLLOW_REL } from './constants';

/**
 * prependHTTP：从 WordPress 的 @wordpress/url 模块中引入的一个函数，
 * 用于确保链接以 http:// 或 https:// 开头。如果链接没有协议前缀，该函数会自动添加 http://。
 */
import { prependHTTP } from '@wordpress/url';
export function getUpdatedLinkAttributes({
  rel = '',
  url = '',
  opensInNewTab,
  nofollow
}) {
  let newLinkTarget; // 用来存储新链接的 target 属性值，初始化为 undefined。
  let updatedRel = rel; // 对传入的 rel 属性进行操作，并将其存储到 updatedRel 变量中。
  /**
   * 如果 opensInNewTab 为 true：
  
  	将 newLinkTarget 设置为 NEW_TAB_TARGET（通常为 _blank，表示在新标签页打开链接）。
  	检查 updatedRel 中是否已经包含 NEW_TAB_REL（例如 noopener noreferrer）：
  	如果已包含，保留原值。
  	如果未包含，添加 NEW_TAB_REL 到 updatedRel 中。
  
  	如果 opensInNewTab 为 false：
  
  	使用正则表达式 relRegex 从 updatedRel 中移除 NEW_TAB_REL，并移除多余的空格。
  */
  if (opensInNewTab) {
    newLinkTarget = NEW_TAB_TARGET;
    updatedRel = updatedRel?.includes(NEW_TAB_REL) ? updatedRel : updatedRel + ` ${NEW_TAB_REL}`;
  } else {
    const relRegex = new RegExp(`\\b${NEW_TAB_REL}\\s*`, 'g');
    updatedRel = updatedRel?.replace(relRegex, '').trim();
  }
  /**
   * 如果 nofollow 为 true：
  
  	检查 updatedRel 中是否包含 nofollow 值 (NOFOLLOW_REL)：
  	如果已包含，保持不变。
  	如果未包含，添加 nofollow 到 updatedRel。
  
  	如果 nofollow 为 false：
  
  	使用正则表达式 relRegex 从 updatedRel 中移除 nofollow，并移除多余的空格。
  */
  if (nofollow) {
    updatedRel = updatedRel?.includes(NOFOLLOW_REL) ? updatedRel : updatedRel + ` ${NOFOLLOW_REL}`;
  } else {
    const relRegex = new RegExp(`\\b${NOFOLLOW_REL}\\s*`, 'g');
    updatedRel = updatedRel?.replace(relRegex, '').trim();
  }
  return {
    url: prependHTTP(url),
    linkTarget: newLinkTarget,
    rel: updatedRel || undefined
  };
}
//# sourceMappingURL=get-updated-link-attributes.js.map