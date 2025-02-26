/**
 * WordPress dependencies
 */
import { __experimentalStyleProvider as StyleProvider, ToolbarGroup } from '@wordpress/components';

/**
 * Internal dependencies
 */
import useBlockControlsFill from './hook';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function BlockControlsFill({
  group = 'default',
  controls,
  children,
  __experimentalShareWithChildBlocks = false
}) {
  const Fill = useBlockControlsFill(group, __experimentalShareWithChildBlocks);
  if (!Fill) {
    return null;
  }
  const innerMarkup = /*#__PURE__*/_jsxs(_Fragment, {
    children: [group === 'default' && /*#__PURE__*/_jsx(ToolbarGroup, {
      controls: controls
    }), children]
  });
  return /*#__PURE__*/_jsx(StyleProvider, {
    document: document,
    children: /*#__PURE__*/_jsx(Fill, {
      children: fillProps => {
        // `fillProps.forwardedContext` is an array of context provider entries, provided by slot,
        // that should wrap the fill markup.
        const {
          forwardedContext = []
        } = fillProps;
        return forwardedContext.reduce((inner, [Provider, props]) => /*#__PURE__*/_jsx(Provider, {
          ...props,
          children: inner
        }), innerMarkup);
      }
    })
  });
}
//# sourceMappingURL=fill.js.map