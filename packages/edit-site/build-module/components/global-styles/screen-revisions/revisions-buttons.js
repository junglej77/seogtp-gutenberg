/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Button } from '@wordpress/components';
import { dateI18n, getDate, humanTimeDiff, getSettings } from '@wordpress/date';
import { store as coreStore } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { privateApis as blockEditorPrivateApis } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { unlock } from '../../../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const DAY_IN_MILLISECONDS = 60 * 60 * 1000 * 24;
const {
  getGlobalStylesChanges
} = unlock(blockEditorPrivateApis);
function ChangesSummary({
  revision,
  previousRevision
}) {
  const changes = getGlobalStylesChanges(revision, previousRevision, {
    maxResults: 7
  });
  if (!changes.length) {
    return null;
  }
  return /*#__PURE__*/_jsx("ul", {
    "data-testid": "global-styles-revision-changes",
    className: "edit-site-global-styles-screen-revisions__changes",
    children: changes.map(change => /*#__PURE__*/_jsx("li", {
      children: change
    }, change))
  });
}

/**
 * Returns a button label for the revision.
 *
 * @param {string|number} id                    A revision object.
 * @param {string}        authorDisplayName     Author name.
 * @param {string}        formattedModifiedDate Revision modified date formatted.
 * @param {boolean}       areStylesEqual        Whether the revision matches the current editor styles.
 * @return {string} Translated label.
 */
function getRevisionLabel(id, authorDisplayName, formattedModifiedDate, areStylesEqual) {
  if ('parent' === id) {
    return __('Reset the styles to the theme defaults');
  }
  if ('unsaved' === id) {
    return sprintf( /* translators: %s: author display name */
    __('Unsaved changes by %s'), authorDisplayName);
  }
  return areStylesEqual ? sprintf(
  // translators: %1$s: author display name, %2$s: revision creation date.
  __('Changes saved by %1$s on %2$s. This revision matches current editor styles.'), authorDisplayName, formattedModifiedDate) : sprintf(
  // translators: %1$s: author display name, %2$s: revision creation date.
  __('Changes saved by %1$s on %2$s'), authorDisplayName, formattedModifiedDate);
}

/**
 * Returns a rendered list of revisions buttons.
 *
 * @typedef {Object} props
 * @property {Array<Object>} userRevisions      A collection of user revisions.
 * @property {number}        selectedRevisionId The id of the currently-selected revision.
 * @property {Function}      onChange           Callback fired when a revision is selected.
 *
 * @param    {props}         Component          props.
 * @return {JSX.Element} The modal component.
 */
function RevisionsButtons({
  userRevisions,
  selectedRevisionId,
  onChange,
  canApplyRevision,
  onApplyRevision
}) {
  const {
    currentThemeName,
    currentUser
  } = useSelect(select => {
    const {
      getCurrentTheme,
      getCurrentUser
    } = select(coreStore);
    const currentTheme = getCurrentTheme();
    return {
      currentThemeName: currentTheme?.name?.rendered || currentTheme?.stylesheet,
      currentUser: getCurrentUser()
    };
  }, []);
  const dateNowInMs = getDate().getTime();
  const {
    datetimeAbbreviated
  } = getSettings().formats;
  return /*#__PURE__*/_jsx("ol", {
    className: "edit-site-global-styles-screen-revisions__revisions-list",
    "aria-label": __('Global styles revisions list'),
    role: "group",
    children: userRevisions.map((revision, index) => {
      const {
        id,
        author,
        modified
      } = revision;
      const isUnsaved = 'unsaved' === id;
      // Unsaved changes are created by the current user.
      const revisionAuthor = isUnsaved ? currentUser : author;
      const authorDisplayName = revisionAuthor?.name || __('User');
      const authorAvatar = revisionAuthor?.avatar_urls?.['48'];
      const isFirstItem = index === 0;
      const isSelected = selectedRevisionId ? selectedRevisionId === id : isFirstItem;
      const areStylesEqual = !canApplyRevision && isSelected;
      const isReset = 'parent' === id;
      const modifiedDate = getDate(modified);
      const displayDate = modified && dateNowInMs - modifiedDate.getTime() > DAY_IN_MILLISECONDS ? dateI18n(datetimeAbbreviated, modifiedDate) : humanTimeDiff(modified);
      const revisionLabel = getRevisionLabel(id, authorDisplayName, dateI18n(datetimeAbbreviated, modifiedDate), areStylesEqual);
      return /*#__PURE__*/_jsxs("li", {
        className: clsx('edit-site-global-styles-screen-revisions__revision-item', {
          'is-selected': isSelected,
          'is-active': areStylesEqual,
          'is-reset': isReset
        }),
        "aria-current": isSelected,
        children: [/*#__PURE__*/_jsx(Button
        // TODO: Switch to `true` (40px size) if possible
        , {
          __next40pxDefaultSize: false,
          className: "edit-site-global-styles-screen-revisions__revision-button",
          accessibleWhenDisabled: true,
          disabled: isSelected,
          onClick: () => {
            onChange(revision);
          },
          "aria-label": revisionLabel,
          children: isReset ? /*#__PURE__*/_jsxs("span", {
            className: "edit-site-global-styles-screen-revisions__description",
            children: [__('Default styles'), /*#__PURE__*/_jsx("span", {
              className: "edit-site-global-styles-screen-revisions__meta",
              children: currentThemeName
            })]
          }) : /*#__PURE__*/_jsxs("span", {
            className: "edit-site-global-styles-screen-revisions__description",
            children: [isUnsaved ? /*#__PURE__*/_jsx("span", {
              className: "edit-site-global-styles-screen-revisions__date",
              children: __('(Unsaved)')
            }) : /*#__PURE__*/_jsx("time", {
              className: "edit-site-global-styles-screen-revisions__date",
              dateTime: modified,
              children: displayDate
            }), /*#__PURE__*/_jsxs("span", {
              className: "edit-site-global-styles-screen-revisions__meta",
              children: [/*#__PURE__*/_jsx("img", {
                alt: authorDisplayName,
                src: authorAvatar
              }), authorDisplayName]
            }), isSelected && /*#__PURE__*/_jsx(ChangesSummary, {
              revision: revision,
              previousRevision: index < userRevisions.length ? userRevisions[index + 1] : {}
            })]
          })
        }), isSelected && (areStylesEqual ? /*#__PURE__*/_jsx("p", {
          className: "edit-site-global-styles-screen-revisions__applied-text",
          children: __('These styles are already applied to your site.')
        }) : /*#__PURE__*/_jsx(Button, {
          size: "compact",
          variant: "primary",
          className: "edit-site-global-styles-screen-revisions__apply-button",
          onClick: onApplyRevision,
          children: isReset ? __('Reset to defaults') : __('Apply')
        }))]
      }, id);
    })
  });
}
export default RevisionsButtons;
//# sourceMappingURL=revisions-buttons.js.map