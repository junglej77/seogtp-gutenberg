/**
 * WordPress dependencies
 */
import { privateApis as blockEditorPrivateApis } from '@wordpress/block-editor';
import { privateApis as componentsPrivateApis, ProgressBar } from '@wordpress/components';
import { store as coreStore } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { unlock } from '../../lock-unlock';
import { useStylesPreviewColors } from '../global-styles/hooks';
import { jsx as _jsx } from "react/jsx-runtime";
const {
  Theme
} = unlock(componentsPrivateApis);
const {
  useGlobalStyle
} = unlock(blockEditorPrivateApis);
export default function CanvasLoader({
  id
}) {
  var _highlightedColors$0$;
  const [fallbackIndicatorColor] = useGlobalStyle('color.text');
  const [backgroundColor] = useGlobalStyle('color.background');
  const {
    highlightedColors
  } = useStylesPreviewColors();
  const indicatorColor = (_highlightedColors$0$ = highlightedColors[0]?.color) !== null && _highlightedColors$0$ !== void 0 ? _highlightedColors$0$ : fallbackIndicatorColor;
  const {
    elapsed,
    total
  } = useSelect(select => {
    var _selectorsByStatus$re, _selectorsByStatus$fi;
    const selectorsByStatus = select(coreStore).countSelectorsByStatus();
    const resolving = (_selectorsByStatus$re = selectorsByStatus.resolving) !== null && _selectorsByStatus$re !== void 0 ? _selectorsByStatus$re : 0;
    const finished = (_selectorsByStatus$fi = selectorsByStatus.finished) !== null && _selectorsByStatus$fi !== void 0 ? _selectorsByStatus$fi : 0;
    return {
      elapsed: finished,
      total: finished + resolving
    };
  }, []);
  return /*#__PURE__*/_jsx("div", {
    className: "edit-site-canvas-loader",
    children: /*#__PURE__*/_jsx(Theme, {
      accent: indicatorColor,
      background: backgroundColor,
      children: /*#__PURE__*/_jsx(ProgressBar, {
        id: id,
        max: total,
        value: elapsed
      })
    })
  });
}
//# sourceMappingURL=index.js.map