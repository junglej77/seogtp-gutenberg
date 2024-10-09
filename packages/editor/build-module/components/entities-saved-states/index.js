/**
 * WordPress dependencies
 */
import { Button, Flex, FlexItem } from '@wordpress/components';
import { __, _n, sprintf } from '@wordpress/i18n';
import { useCallback, useRef, createInterpolateElement } from '@wordpress/element';
import { __experimentalUseDialog as useDialog, useInstanceId } from '@wordpress/compose';
import { useDispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import EntityTypeList from './entity-type-list';
import { useIsDirty } from './hooks/use-is-dirty';
import { store as editorStore } from '../../store';
import { unlock } from '../../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
function identity(values) {
  console.log('identity', values);
  return values;
}

/**
 * Renders the component for managing saved states of entities.
 *
 * @param {Object}   props              The component props.
 * @param {Function} props.close        The function to close the dialog.
 * @param {Function} props.renderDialog The function to render the dialog.
 *
 * @return {JSX.Element} The rendered component.
 */
export default function EntitiesSavedStates({
  close,
  renderDialog = undefined
}) {
  const isDirtyProps = useIsDirty();
  return /*#__PURE__*/_jsx(EntitiesSavedStatesExtensible, {
    close: close,
    renderDialog: renderDialog,
    ...isDirtyProps
  });
}

/**
 * Renders a panel for saving entities with dirty records.
 *
 * @param {Object}   props                       The component props.
 * @param {string}   props.additionalPrompt      Additional prompt to display.
 * @param {Function} props.close                 Function to close the panel.
 * @param {Function} props.onSave                Function to call when saving entities.
 * @param {boolean}  props.saveEnabled           Flag indicating if save is enabled.
 * @param {string}   props.saveLabel             Label for the save button.
 * @param {Function} props.renderDialog          Function to render a custom dialog.
 * @param {Array}    props.dirtyEntityRecords    Array of dirty entity records.
 * @param {boolean}  props.isDirty               Flag indicating if there are dirty entities.
 * @param {Function} props.setUnselectedEntities Function to set unselected entities.
 * @param {Array}    props.unselectedEntities    Array of unselected entities.
 *
 * @return {JSX.Element} The rendered component.
 */
export function EntitiesSavedStatesExtensible({
  additionalPrompt = undefined,
  close,
  onSave = identity,
  saveEnabled: saveEnabledProp = undefined,
  saveLabel = __('保存'),
  renderDialog = undefined,
  dirtyEntityRecords,
  isDirty,
  setUnselectedEntities,
  unselectedEntities
}) {
  const saveButtonRef = useRef();
  const {
    saveDirtyEntities
  } = unlock(useDispatch(editorStore));
  // To group entities by type.
  const partitionedSavables = dirtyEntityRecords.reduce((acc, record) => {
    const {
      name
    } = record;
    if (!acc[name]) {
      acc[name] = [];
    }
    acc[name].push(record);
    return acc;
  }, {});

  // Sort entity groups.
  const {
    site: siteSavables,
    wp_template: templateSavables,
    wp_template_part: templatePartSavables,
    ...contentSavables
  } = partitionedSavables;
  const sortedPartitionedSavables = [siteSavables, templateSavables, templatePartSavables, ...Object.values(contentSavables)].filter(Array.isArray);
  const saveEnabled = saveEnabledProp !== null && saveEnabledProp !== void 0 ? saveEnabledProp : isDirty;
  // Explicitly define this with no argument passed.  Using `close` on
  // its own will use the event object in place of the expected saved entities.
  const dismissPanel = useCallback(() => close(), [close]);
  const [saveDialogRef, saveDialogProps] = useDialog({
    onClose: () => dismissPanel()
  });
  const dialogLabel = useInstanceId(EntitiesSavedStatesExtensible, 'label');
  const dialogDescription = useInstanceId(EntitiesSavedStatesExtensible, 'description');
  return /*#__PURE__*/_jsxs("div", {
    ref: saveDialogRef,
    ...saveDialogProps,
    className: "entities-saved-states__panel",
    role: renderDialog ? 'dialog' : undefined,
    "aria-labelledby": renderDialog ? dialogLabel : undefined,
    "aria-describedby": renderDialog ? dialogDescription : undefined,
    children: [/*#__PURE__*/_jsxs(Flex, {
      className: "entities-saved-states__panel-header",
      gap: 2,
      children: [/*#__PURE__*/_jsx(FlexItem, {
        isBlock: true,
        as: Button,
        ref: saveButtonRef,
        variant: "primary",
        disabled: !saveEnabled,
        accessibleWhenDisabled: true,
        onClick: () => saveDirtyEntities({
          onSave,
          dirtyEntityRecords,
          entitiesToSkip: unselectedEntities,
          close
        }),
        className: "editor-entities-saved-states__save-button",
        children: saveLabel
      }), /*#__PURE__*/_jsx(FlexItem, {
        isBlock: true,
        as: Button,
        variant: "secondary",
        onClick: dismissPanel,
        children: __('Cancel')
      })]
    }), /*#__PURE__*/_jsxs("div", {
      className: "entities-saved-states__text-prompt",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "entities-saved-states__text-prompt--header-wrapper",
        id: renderDialog ? dialogLabel : undefined,
        children: [/*#__PURE__*/_jsx("strong", {
          className: "entities-saved-states__text-prompt--header",
          children: __('准备好保存了吗？')
        }), additionalPrompt]
      }), /*#__PURE__*/_jsx("p", {
        id: renderDialog ? dialogDescription : undefined,
        children: isDirty ? createInterpolateElement(sprintf( /* translators: %d: number of site changes waiting to be saved. */
        _n('这里有 <strong>%d 个网站变化</strong> 将要被保存。', '这里有 <strong>%d 个网站变化</strong> 将要被保存。', sortedPartitionedSavables.length), sortedPartitionedSavables.length), {
          strong: /*#__PURE__*/_jsx("strong", {})
        }) : __('Select the items you want to save.')
      })]
    }), sortedPartitionedSavables.map(list => {
      return /*#__PURE__*/_jsx(EntityTypeList, {
        list: list,
        unselectedEntities: unselectedEntities,
        setUnselectedEntities: setUnselectedEntities
      }, list[0].name);
    })]
  });
}
//# sourceMappingURL=index.js.map