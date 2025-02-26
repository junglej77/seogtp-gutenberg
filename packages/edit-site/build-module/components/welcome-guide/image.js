import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function WelcomeGuideImage({
  nonAnimatedSrc,
  animatedSrc
}) {
  return /*#__PURE__*/_jsxs("picture", {
    className: "edit-site-welcome-guide__image",
    children: [/*#__PURE__*/_jsx("source", {
      srcSet: nonAnimatedSrc,
      media: "(prefers-reduced-motion: reduce)"
    }), /*#__PURE__*/_jsx("img", {
      src: animatedSrc,
      width: "312",
      height: "240",
      alt: ""
    })]
  });
}
//# sourceMappingURL=image.js.map