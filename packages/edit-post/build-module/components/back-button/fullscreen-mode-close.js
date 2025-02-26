/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { Button, Icon, __unstableMotion as motion } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { addQueryArgs } from '@wordpress/url';
import { wordpress } from '@wordpress/icons';
import { store as editorStore } from '@wordpress/editor';
import { store as coreStore } from '@wordpress/core-data';
import { useReducedMotion } from '@wordpress/compose';
import { jsx as _jsx } from "react/jsx-runtime";
function FullscreenModeClose({
  showTooltip,
  icon,
  href,
  initialPost
}) {
  var _postType$labels$view;
  const {
    isRequestingSiteIcon,
    postType,
    siteIconUrl
  } = useSelect(select => {
    const {
      getCurrentPostType
    } = select(editorStore);
    const {
      getEntityRecord,
      getPostType,
      isResolving
    } = select(coreStore);
    const siteData = getEntityRecord('root', '__unstableBase', undefined) || {};
    const _postType = initialPost?.type || getCurrentPostType();
    return {
      isRequestingSiteIcon: isResolving('getEntityRecord', ['root', '__unstableBase', undefined]),
      postType: getPostType(_postType),
      siteIconUrl: siteData.site_icon_url
    };
  }, []);
  const disableMotion = useReducedMotion();
  if (!postType) {
    return null;
  }
  let buttonIcon = /*#__PURE__*/_jsx(Icon, {
    size: "36px",
    icon: wordpress
  });
  const effect = {
    expand: {
      scale: 1.25,
      transition: {
        type: 'tween',
        duration: '0.3'
      }
    }
  };
  if (siteIconUrl) {
    buttonIcon = /*#__PURE__*/_jsx(motion.img, {
      variants: !disableMotion && effect,
      alt: __('Site Icon'),
      className: "edit-post-fullscreen-mode-close_site-icon",
      src: siteIconUrl
    });
  }
  if (isRequestingSiteIcon) {
    buttonIcon = null;
  }

  // Override default icon if custom icon is provided via props.
  if (icon) {
    buttonIcon = /*#__PURE__*/_jsx(Icon, {
      size: "36px",
      icon: icon
    });
  }
  const classes = clsx('edit-post-fullscreen-mode-close', {
    'has-icon': siteIconUrl
  });
  const buttonHref = href !== null && href !== void 0 ? href : addQueryArgs('edit.php', {
    post_type: postType.slug
  });
  const buttonLabel = (_postType$labels$view = postType?.labels?.view_items) !== null && _postType$labels$view !== void 0 ? _postType$labels$view : __('Back');
  return /*#__PURE__*/_jsx(motion.div, {
    whileHover: "expand",
    children: /*#__PURE__*/_jsx(Button
    // TODO: Switch to `true` (40px size) if possible
    , {
      __next40pxDefaultSize: false,
      className: classes,
      href: buttonHref,
      label: buttonLabel,
      showTooltip: showTooltip,
      children: buttonIcon
    })
  });
}
export default FullscreenModeClose;
//# sourceMappingURL=fullscreen-mode-close.js.map