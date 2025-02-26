import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const Section = ({
  description,
  title,
  children
}) => /*#__PURE__*/_jsxs("fieldset", {
  className: "preferences-modal__section",
  children: [/*#__PURE__*/_jsxs("legend", {
    className: "preferences-modal__section-legend",
    children: [/*#__PURE__*/_jsx("h2", {
      className: "preferences-modal__section-title",
      children: title
    }), description && /*#__PURE__*/_jsx("p", {
      className: "preferences-modal__section-description",
      children: description
    })]
  }), /*#__PURE__*/_jsx("div", {
    className: "preferences-modal__section-content",
    children: children
  })]
});
export default Section;
//# sourceMappingURL=index.js.map