/**
 * WordPress dependencies
 */
import { useRef, Children } from '@wordpress/element';
import { useKeyboardShortcut } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function KeyboardShortcut({
  target,
  callback,
  shortcut,
  bindGlobal,
  eventName
}) {
  useKeyboardShortcut(shortcut, callback, {
    bindGlobal,
    target,
    eventName
  });
  return null;
}

/**
 * `KeyboardShortcuts` is a component which handles keyboard sequences during the lifetime of the rendering element.
 *
 * When passed children, it will capture key events which occur on or within the children. If no children are passed, events are captured on the document.
 *
 * It uses the [Mousetrap](https://craig.is/killing/mice) library to implement keyboard sequence bindings.
 *
 * ```jsx
 * import { KeyboardShortcuts } from '@wordpress/components';
 * import { useState } from '@wordpress/element';
 *
 * const MyKeyboardShortcuts = () => {
 * 	const [ isAllSelected, setIsAllSelected ] = useState( false );
 * 	const selectAll = () => {
 * 		setIsAllSelected( true );
 * 	};
 *
 * 	return (
 * 		<div>
 * 			<KeyboardShortcuts
 * 				shortcuts={ {
 * 					'mod+a': selectAll,
 * 				} }
 * 			/>
 * 			[cmd/ctrl + A] Combination pressed? { isAllSelected ? 'Yes' : 'No' }
 * 		</div>
 * 	);
 * };
 * ```
 */
function KeyboardShortcuts({
  children,
  shortcuts,
  bindGlobal,
  eventName
}) {
  const target = useRef(null);
  const element = Object.entries(shortcuts !== null && shortcuts !== void 0 ? shortcuts : {}).map(([shortcut, callback]) => /*#__PURE__*/_jsx(KeyboardShortcut, {
    shortcut: shortcut,
    callback: callback,
    bindGlobal: bindGlobal,
    eventName: eventName,
    target: target
  }, shortcut));

  // Render as non-visual if there are no children pressed. Keyboard
  // events will be bound to the document instead.
  if (!Children.count(children)) {
    return /*#__PURE__*/_jsx(_Fragment, {
      children: element
    });
  }
  return /*#__PURE__*/_jsxs("div", {
    ref: target,
    children: [element, children]
  });
}
export default KeyboardShortcuts;
//# sourceMappingURL=index.js.map