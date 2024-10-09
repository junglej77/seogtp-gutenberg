/**
 * WordPress dependencies
 */
import { __, _n, sprintf } from '@wordpress/i18n';
import { Button, Spinner, VisuallyHidden, Composite } from '@wordpress/components';
import { createInterpolateElement } from '@wordpress/element';
import { decodeEntities } from '@wordpress/html-entities';
import { getBlockType } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import BlockRatings from '../block-ratings';
import DownloadableBlockIcon from '../downloadable-block-icon';
import DownloadableBlockNotice from '../downloadable-block-notice';
import { store as blockDirectoryStore } from '../../store';

// Return the appropriate block item label, given the block data and status.
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
function getDownloadableBlockLabel({
  title,
  rating,
  ratingCount
}, {
  hasNotice,
  isInstalled,
  isInstalling
}) {
  const stars = Math.round(rating / 0.5) * 0.5;
  if (!isInstalled && hasNotice) {
    /* translators: %1$s: block title */
    return sprintf('Retry installing %s.', decodeEntities(title));
  }
  if (isInstalled) {
    /* translators: %1$s: block title */
    return sprintf('Add %s.', decodeEntities(title));
  }
  if (isInstalling) {
    /* translators: %1$s: block title */
    return sprintf('Installing %s.', decodeEntities(title));
  }

  // No ratings yet, just use the title.
  if (ratingCount < 1) {
    /* translators: %1$s: block title */
    return sprintf('Install %s.', decodeEntities(title));
  }
  return sprintf( /* translators: %1$s: block title, %2$s: average rating, %3$s: total ratings count. */
  _n('Install %1$s. %2$s stars with %3$s review.', 'Install %1$s. %2$s stars with %3$s reviews.', ratingCount), decodeEntities(title), stars, ratingCount);
}
function DownloadableBlockListItem({
  item,
  onClick
}) {
  const {
    author,
    description,
    icon,
    rating,
    title
  } = item;
  // getBlockType returns a block object if this block exists, or null if not.
  const isInstalled = !!getBlockType(item.name);
  const {
    hasNotice,
    isInstalling,
    isInstallable
  } = useSelect(select => {
    const {
      getErrorNoticeForBlock,
      isInstalling: isBlockInstalling
    } = select(blockDirectoryStore);
    const notice = getErrorNoticeForBlock(item.id);
    const hasFatal = notice && notice.isFatal;
    return {
      hasNotice: !!notice,
      isInstalling: isBlockInstalling(item.id),
      isInstallable: !hasFatal
    };
  }, [item]);
  let statusText = '';
  if (isInstalled) {
    statusText = __('Installed!');
  } else if (isInstalling) {
    statusText = __('Installing…');
  }
  return /*#__PURE__*/_jsxs(Composite.Item, {
    render: /*#__PURE__*/_jsx(Button
    // TODO: Switch to `true` (40px size) if possible
    , {
      __next40pxDefaultSize: false,
      accessibleWhenDisabled: true,
      type: "button",
      role: "option",
      className: "block-directory-downloadable-block-list-item",
      isBusy: isInstalling,
      onClick: event => {
        event.preventDefault();
        onClick();
      },
      label: getDownloadableBlockLabel(item, {
        hasNotice,
        isInstalled,
        isInstalling
      }),
      showTooltip: true,
      tooltipPosition: "top center"
    }),
    disabled: isInstalling || !isInstallable,
    children: [/*#__PURE__*/_jsxs("div", {
      className: "block-directory-downloadable-block-list-item__icon",
      children: [/*#__PURE__*/_jsx(DownloadableBlockIcon, {
        icon: icon,
        title: title
      }), isInstalling ? /*#__PURE__*/_jsx("span", {
        className: "block-directory-downloadable-block-list-item__spinner",
        children: /*#__PURE__*/_jsx(Spinner, {})
      }) : /*#__PURE__*/_jsx(BlockRatings, {
        rating: rating
      })]
    }), /*#__PURE__*/_jsxs("span", {
      className: "block-directory-downloadable-block-list-item__details",
      children: [/*#__PURE__*/_jsx("span", {
        className: "block-directory-downloadable-block-list-item__title",
        children: createInterpolateElement(sprintf( /* translators: %1$s: block title, %2$s: author name. */
        __('%1$s <span>by %2$s</span>'), decodeEntities(title), author), {
          span: /*#__PURE__*/_jsx("span", {
            className: "block-directory-downloadable-block-list-item__author"
          })
        })
      }), hasNotice ? /*#__PURE__*/_jsx(DownloadableBlockNotice, {
        block: item
      }) : /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx("span", {
          className: "block-directory-downloadable-block-list-item__desc",
          children: !!statusText ? statusText : decodeEntities(description)
        }), isInstallable && !(isInstalled || isInstalling) && /*#__PURE__*/_jsx(VisuallyHidden, {
          children: __('Install block')
        })]
      })]
    })]
  });
}
export default DownloadableBlockListItem;
//# sourceMappingURL=index.js.map