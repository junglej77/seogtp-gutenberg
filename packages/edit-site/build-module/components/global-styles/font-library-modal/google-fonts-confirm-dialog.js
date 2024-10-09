/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Button, Card, CardBody, __experimentalHeading as Heading, __experimentalText as Text, __experimentalSpacer as Spacer } from '@wordpress/components';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function GoogleFontsConfirmDialog() {
  const handleConfirm = () => {
    // eslint-disable-next-line no-undef
    window.localStorage.setItem('wp-font-library-google-fonts-permission', 'true');
    window.dispatchEvent(new Event('storage'));
  };
  return /*#__PURE__*/_jsx("div", {
    className: "font-library__google-fonts-confirm",
    children: /*#__PURE__*/_jsx(Card, {
      children: /*#__PURE__*/_jsxs(CardBody, {
        children: [/*#__PURE__*/_jsx(Heading, {
          level: 2,
          children: __('Connect to Google Fonts')
        }), /*#__PURE__*/_jsx(Spacer, {
          margin: 6
        }), /*#__PURE__*/_jsx(Text, {
          as: "p",
          children: __('To install fonts from Google you must give permission to connect directly to Google servers. The fonts you install will be downloaded from Google and stored on your site. Your site will then use these locally-hosted fonts.')
        }), /*#__PURE__*/_jsx(Spacer, {
          margin: 3
        }), /*#__PURE__*/_jsx(Text, {
          as: "p",
          children: __('You can alternatively upload files directly on the Upload tab.')
        }), /*#__PURE__*/_jsx(Spacer, {
          margin: 6
        }), /*#__PURE__*/_jsx(Button, {
          __next40pxDefaultSize: true,
          variant: "primary",
          onClick: handleConfirm,
          children: __('Allow access to Google Fonts')
        })]
      })
    })
  });
}
export default GoogleFontsConfirmDialog;
//# sourceMappingURL=google-fonts-confirm-dialog.js.map