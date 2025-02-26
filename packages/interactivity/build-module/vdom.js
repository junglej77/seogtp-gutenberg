/**
 * External dependencies
 */
import { h } from 'preact';
/**
 * Internal dependencies
 */
import { directivePrefix as p } from './constants';
import { warn } from './utils';
const ignoreAttr = `data-${p}-ignore`;
const islandAttr = `data-${p}-interactive`;
const fullPrefix = `data-${p}-`;
const namespaces = [];
const currentNamespace = () => {
  var _namespaces;
  return (_namespaces = namespaces[namespaces.length - 1]) !== null && _namespaces !== void 0 ? _namespaces : null;
};
const isObject = item => Boolean(item && typeof item === 'object' && item.constructor === Object);

// Regular expression for directive parsing.
const directiveParser = new RegExp(`^data-${p}-` +
// ${p} must be a prefix string, like 'wp'.
// Match alphanumeric characters including hyphen-separated
// segments. It excludes underscore intentionally to prevent confusion.
// E.g., "custom-directive".
'([a-z0-9]+(?:-[a-z0-9]+)*)' +
// (Optional) Match '--' followed by any alphanumeric charachters. It
// excludes underscore intentionally to prevent confusion, but it can
// contain multiple hyphens. E.g., "--custom-prefix--with-more-info".
'(?:--([a-z0-9_-]+))?$', 'i' // Case insensitive.
);

// Regular expression for reference parsing. It can contain a namespace before
// the reference, separated by `::`, like `some-namespace::state.somePath`.
// Namespaces can contain any alphanumeric characters, hyphens, underscores or
// forward slashes. References don't have any restrictions.
const nsPathRegExp = /^([\w_\/-]+)::(.+)$/;
export const hydratedIslands = new WeakSet();

/**
 * Recursive function that transforms a DOM tree into vDOM.
 *
 * @param root The root element or node to start traversing on.
 * @return The resulting vDOM tree.
 */
export function toVdom(root) {
  const treeWalker = document.createTreeWalker(root, 205 // TEXT + CDATA_SECTION + COMMENT + PROCESSING_INSTRUCTION + ELEMENT
  );
  function walk(node) {
    const {
      nodeType
    } = node;

    // TEXT_NODE (3)
    if (nodeType === 3) {
      return [node.data];
    }

    // CDATA_SECTION_NODE (4)
    if (nodeType === 4) {
      var _nodeValue;
      const next = treeWalker.nextSibling();
      node.replaceWith(new window.Text((_nodeValue = node.nodeValue) !== null && _nodeValue !== void 0 ? _nodeValue : ''));
      return [node.nodeValue, next];
    }

    // COMMENT_NODE (8) || PROCESSING_INSTRUCTION_NODE (7)
    if (nodeType === 8 || nodeType === 7) {
      const next = treeWalker.nextSibling();
      node.remove();
      return [null, next];
    }
    const elementNode = node;
    const {
      attributes
    } = elementNode;
    const localName = elementNode.localName;
    const props = {};
    const children = [];
    const directives = [];
    let ignore = false;
    let island = false;
    for (let i = 0; i < attributes.length; i++) {
      const attributeName = attributes[i].name;
      const attributeValue = attributes[i].value;
      if (attributeName[fullPrefix.length] && attributeName.slice(0, fullPrefix.length) === fullPrefix) {
        if (attributeName === ignoreAttr) {
          ignore = true;
        } else {
          var _regexResult$, _regexResult$2;
          const regexResult = nsPathRegExp.exec(attributeValue);
          const namespace = (_regexResult$ = regexResult?.[1]) !== null && _regexResult$ !== void 0 ? _regexResult$ : null;
          let value = (_regexResult$2 = regexResult?.[2]) !== null && _regexResult$2 !== void 0 ? _regexResult$2 : attributeValue;
          try {
            const parsedValue = JSON.parse(value);
            value = isObject(parsedValue) ? parsedValue : value;
          } catch {}
          if (attributeName === islandAttr) {
            island = true;
            const islandNamespace =
            // eslint-disable-next-line no-nested-ternary
            typeof value === 'string' ? value : typeof value?.namespace === 'string' ? value.namespace : null;
            namespaces.push(islandNamespace);
          } else {
            directives.push([attributeName, namespace, value]);
          }
        }
      } else if (attributeName === 'ref') {
        continue;
      }
      props[attributeName] = attributeValue;
    }
    if (ignore && !island) {
      return [h(localName, {
        ...props,
        innerHTML: elementNode.innerHTML,
        __directives: {
          ignore: true
        }
      })];
    }
    if (island) {
      hydratedIslands.add(elementNode);
    }
    if (directives.length) {
      props.__directives = directives.reduce((obj, [name, ns, value]) => {
        const directiveMatch = directiveParser.exec(name);
        if (directiveMatch === null) {
          warn(`Found malformed directive name: ${name}.`);
          return obj;
        }
        const prefix = directiveMatch[1] || '';
        const suffix = directiveMatch[2] || 'default';
        obj[prefix] = obj[prefix] || [];
        obj[prefix].push({
          namespace: ns !== null && ns !== void 0 ? ns : currentNamespace(),
          value,
          suffix
        });
        return obj;
      }, {});
    }

    // @ts-expect-error Fixed in upcoming preact release https://github.com/preactjs/preact/pull/4334
    if (localName === 'template') {
      props.content = [...elementNode.content.childNodes].map(childNode => toVdom(childNode));
    } else {
      let child = treeWalker.firstChild();
      if (child) {
        while (child) {
          const [vnode, nextChild] = walk(child);
          if (vnode) {
            children.push(vnode);
          }
          child = nextChild || treeWalker.nextSibling();
        }
        treeWalker.parentNode();
      }
    }

    // Restore previous namespace.
    if (island) {
      namespaces.pop();
    }
    return [h(localName, props, children)];
  }
  return walk(treeWalker.currentNode);
}
//# sourceMappingURL=vdom.js.map