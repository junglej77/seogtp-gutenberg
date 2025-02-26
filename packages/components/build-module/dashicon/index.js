import { jsx as _jsx } from "react/jsx-runtime";
/**
 * @typedef OwnProps
 *
 * @property {import('./types').IconKey} icon        Icon name
 * @property {string}                    [className] Class name
 * @property {number}                    [size]      Size of the icon
 */

/**
 * Internal dependencies
 */

function Dashicon({
  icon,
  className,
  size = 20,
  style = {},
  ...extraProps
}) {
  const iconClass = ['dashicon', 'dashicons', 'dashicons-' + icon, className].filter(Boolean).join(' ');

  // For retro-compatibility reasons (for example if people are overriding icon size with CSS), we add inline styles just if the size is different to the default
  const sizeStyles =
  // using `!=` to catch both 20 and "20"
  // eslint-disable-next-line eqeqeq
  20 != size ? {
    fontSize: `${size}px`,
    width: `${size}px`,
    height: `${size}px`
  } : {};
  const styles = {
    ...sizeStyles,
    ...style
  };
  return /*#__PURE__*/_jsx("span", {
    className: iconClass,
    style: styles,
    ...extraProps
  });
}
export default Dashicon;
//# sourceMappingURL=index.js.map