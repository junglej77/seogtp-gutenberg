/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { Button, Modal } from '@wordpress/components';
import { EntitiesSavedStates, useEntitiesSavedStatesIsDirty, privateApis } from '@wordpress/editor';
import { useDispatch, useSelect } from '@wordpress/data';
import { __, sprintf } from '@wordpress/i18n';
import { store as coreStore } from '@wordpress/core-data';

/**
 * Internal dependencies
 */
import { store as editSiteStore } from '../../store';
import { unlock } from '../../lock-unlock';
import { useActivateTheme } from '../../utils/use-activate-theme';
import { useActualCurrentTheme } from '../../utils/use-actual-current-theme';
import { isPreviewingTheme } from '../../utils/is-previewing-theme';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const {
  EntitiesSavedStatesExtensible,
  NavigableRegion
} = unlock(privateApis);
const EntitiesSavedStatesForPreview = ({
  onClose
}) => {
  var _currentTheme$name$re, _previewingTheme$name;
  const isDirtyProps = useEntitiesSavedStatesIsDirty();
  let activateSaveLabel;
  if (isDirtyProps.isDirty) {
    activateSaveLabel = __('Activate & Save');
  } else {
    activateSaveLabel = __('Activate');
  }
  const currentTheme = useActualCurrentTheme();
  const previewingTheme = useSelect(select => select(coreStore).getCurrentTheme(), []);
  const additionalPrompt = /*#__PURE__*/_jsx("p", {
    children: sprintf( /* translators: %1$s: The name of active theme, %2$s: The name of theme to be activated. */
    __('Saving your changes will change your active theme from %1$s to %2$s.'), (_currentTheme$name$re = currentTheme?.name?.rendered) !== null && _currentTheme$name$re !== void 0 ? _currentTheme$name$re : '...', (_previewingTheme$name = previewingTheme?.name?.rendered) !== null && _previewingTheme$name !== void 0 ? _previewingTheme$name : '...')
  });
  const activateTheme = useActivateTheme();
  const onSave = async values => {
    await activateTheme();
    return values;
  };
  return /*#__PURE__*/_jsx(EntitiesSavedStatesExtensible, {
    ...isDirtyProps,
    additionalPrompt,
    close: onClose,
    onSave,
    saveEnabled: true,
    saveLabel: activateSaveLabel
  });
};
const _EntitiesSavedStates = ({
  onClose,
  renderDialog = undefined
}) => {
  if (isPreviewingTheme()) {
    return /*#__PURE__*/_jsx(EntitiesSavedStatesForPreview, {
      onClose: onClose
    });
  }
  return /*#__PURE__*/_jsx(EntitiesSavedStates, {
    close: onClose,
    renderDialog: renderDialog
  });
};
export default function SavePanel() {
  const {
    isSaveViewOpen,
    canvasMode,
    isDirty,
    isSaving
  } = useSelect(select => {
    const {
      __experimentalGetDirtyEntityRecords,
      isSavingEntityRecord,
      isResolving
    } = select(coreStore);
    const dirtyEntityRecords = __experimentalGetDirtyEntityRecords();
    const isActivatingTheme = isResolving('activateTheme');
    const {
      isSaveViewOpened,
      getCanvasMode
    } = unlock(select(editSiteStore));

    // The currently selected entity to display.
    // Typically template or template part in the site editor.
    return {
      isSaveViewOpen: isSaveViewOpened(),
      canvasMode: getCanvasMode(),
      isDirty: dirtyEntityRecords.length > 0,
      isSaving: dirtyEntityRecords.some(record => isSavingEntityRecord(record.kind, record.name, record.key)) || isActivatingTheme
    };
  }, []);
  const {
    setIsSaveViewOpened
  } = useDispatch(editSiteStore);
  const onClose = () => setIsSaveViewOpened(false);
  if (canvasMode === 'view') {
    return isSaveViewOpen ? /*#__PURE__*/_jsx(Modal, {
      className: "edit-site-save-panel__modal",
      onRequestClose: onClose,
      __experimentalHideHeader: true,
      contentLabel: __('Save site, content, and template changes'),
      children: /*#__PURE__*/_jsx(_EntitiesSavedStates, {
        onClose: onClose
      })
    }) : null;
  }
  const activateSaveEnabled = isPreviewingTheme() || isDirty;
  const disabled = isSaving || !activateSaveEnabled;
  return /*#__PURE__*/_jsxs(NavigableRegion, {
    className: clsx('edit-site-layout__actions', {
      'is-entity-save-view-open': isSaveViewOpen
    }),
    ariaLabel: __('Save panel'),
    children: [/*#__PURE__*/_jsx("div", {
      className: clsx('edit-site-editor__toggle-save-panel', {
        'screen-reader-text': isSaveViewOpen
      }),
      children: /*#__PURE__*/_jsx(Button
      // TODO: Switch to `true` (40px size) if possible
      , {
        __next40pxDefaultSize: false,
        variant: "secondary",
        className: "edit-site-editor__toggle-save-panel-button",
        onClick: () => setIsSaveViewOpened(true),
        "aria-haspopup": "dialog",
        disabled: disabled,
        accessibleWhenDisabled: true,
        children: __('Open save panel')
      })
    }), isSaveViewOpen && /*#__PURE__*/_jsx(_EntitiesSavedStates, {
      onClose: onClose,
      renderDialog: true
    })]
  });
}
//# sourceMappingURL=index.js.map