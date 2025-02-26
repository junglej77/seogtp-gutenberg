/**
 * WordPress dependencies
 */
import { createHigherOrderComponent, useConstrainedTabbing } from '@wordpress/compose';

/**
 * `withConstrainedTabbing` is a React [higher-order component](https://facebook.github.io/react/docs/higher-order-components.html)
 * adding the ability to constrain keyboard navigation with the Tab key within a component.
 * For accessibility reasons, some UI components need to constrain Tab navigation, for example
 * modal dialogs or similar UI. Use of this component is recommended only in cases where a way to
 * navigate away from the wrapped component is implemented by other means, usually by pressing
 * the Escape key or using a specific UI control, e.g. a "Close" button.
 */
import { jsx as _jsx } from "react/jsx-runtime";
const withConstrainedTabbing = createHigherOrderComponent(WrappedComponent => function ComponentWithConstrainedTabbing(props) {
  const ref = useConstrainedTabbing();
  return /*#__PURE__*/_jsx("div", {
    ref: ref,
    tabIndex: -1,
    children: /*#__PURE__*/_jsx(WrappedComponent, {
      ...props
    })
  });
}, 'withConstrainedTabbing');
export default withConstrainedTabbing;
//# sourceMappingURL=index.js.map