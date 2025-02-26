/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { privateApis as blocksPrivateApis } from '@wordpress/blocks';
import { __experimentalItemGroup as ItemGroup, __experimentalItem as Item, __experimentalText as Text, __experimentalToolsPanel as ToolsPanel, __experimentalToolsPanelItem as ToolsPanelItem, __experimentalVStack as VStack, privateApis as componentsPrivateApis } from '@wordpress/components';
import { useRegistry, useSelect } from '@wordpress/data';
import { useContext, Fragment } from '@wordpress/element';
import { useViewportMatch } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import { canBindAttribute, getBindableAttributes } from '../hooks/use-bindings-attributes';
import { unlock } from '../lock-unlock';
import InspectorControls from '../components/inspector-controls';
import BlockContext from '../components/block-context';
import { useBlockBindingsUtils } from '../utils/block-bindings';
import { store as blockEditorStore } from '../store';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const {
  DropdownMenuV2
} = unlock(componentsPrivateApis);
const useToolsPanelDropdownMenuProps = () => {
  const isMobile = useViewportMatch('medium', '<');
  return !isMobile ? {
    popoverProps: {
      placement: 'left-start',
      // For non-mobile, inner sidebar width (248px) - button width (24px) - border (1px) + padding (16px) + spacing (20px)
      offset: 259
    }
  } : {};
};
function BlockBindingsPanelDropdown({
  fieldsList,
  attribute,
  binding
}) {
  const {
    getBlockBindingsSources
  } = unlock(blocksPrivateApis);
  const registeredSources = getBlockBindingsSources();
  const {
    updateBlockBindings
  } = useBlockBindingsUtils();
  const currentKey = binding?.args?.key;
  return /*#__PURE__*/_jsx(_Fragment, {
    children: Object.entries(fieldsList).map(([name, fields], i) => /*#__PURE__*/_jsxs(Fragment, {
      children: [/*#__PURE__*/_jsxs(DropdownMenuV2.Group, {
        children: [Object.keys(fieldsList).length > 1 && /*#__PURE__*/_jsx(DropdownMenuV2.GroupLabel, {
          children: registeredSources[name].label
        }), Object.entries(fields).map(([key, value]) => /*#__PURE__*/_jsxs(DropdownMenuV2.RadioItem, {
          onChange: () => updateBlockBindings({
            [attribute]: {
              source: name,
              args: {
                key
              }
            }
          }),
          name: attribute + '-binding',
          value: key,
          checked: key === currentKey,
          children: [/*#__PURE__*/_jsx(DropdownMenuV2.ItemLabel, {
            children: key
          }), /*#__PURE__*/_jsx(DropdownMenuV2.ItemHelpText, {
            children: value
          })]
        }, key))]
      }), i !== Object.keys(fieldsList).length - 1 && /*#__PURE__*/_jsx(DropdownMenuV2.Separator, {})]
    }, name))
  });
}
function BlockBindingsAttribute({
  attribute,
  binding
}) {
  const {
    source: sourceName,
    args
  } = binding || {};
  const sourceProps = unlock(blocksPrivateApis).getBlockBindingsSource(sourceName);
  const isSourceInvalid = !sourceProps;
  return /*#__PURE__*/_jsxs(VStack, {
    className: "block-editor-bindings__item",
    children: [/*#__PURE__*/_jsx(Text, {
      truncate: true,
      children: attribute
    }), !!binding && /*#__PURE__*/_jsx(Text, {
      truncate: true,
      variant: !isSourceInvalid && 'muted',
      isDestructive: isSourceInvalid,
      children: isSourceInvalid ? __('Invalid source') : args?.key || sourceProps?.label || sourceName
    })]
  });
}
function ReadOnlyBlockBindingsPanelItems({
  bindings
}) {
  return /*#__PURE__*/_jsx(_Fragment, {
    children: Object.entries(bindings).map(([attribute, binding]) => /*#__PURE__*/_jsx(Item, {
      children: /*#__PURE__*/_jsx(BlockBindingsAttribute, {
        attribute: attribute,
        binding: binding
      })
    }, attribute))
  });
}
function EditableBlockBindingsPanelItems({
  attributes,
  bindings,
  fieldsList
}) {
  const {
    updateBlockBindings
  } = useBlockBindingsUtils();
  const isMobile = useViewportMatch('medium', '<');
  return /*#__PURE__*/_jsx(_Fragment, {
    children: attributes.map(attribute => {
      const binding = bindings[attribute];
      return /*#__PURE__*/_jsx(ToolsPanelItem, {
        hasValue: () => !!binding,
        label: attribute,
        onDeselect: () => {
          updateBlockBindings({
            [attribute]: undefined
          });
        },
        children: /*#__PURE__*/_jsx(DropdownMenuV2, {
          placement: isMobile ? 'bottom-start' : 'left-start',
          gutter: isMobile ? 8 : 36,
          trigger: /*#__PURE__*/_jsx(Item, {
            children: /*#__PURE__*/_jsx(BlockBindingsAttribute, {
              attribute: attribute,
              binding: binding
            })
          }),
          children: /*#__PURE__*/_jsx(BlockBindingsPanelDropdown, {
            fieldsList: fieldsList,
            attribute: attribute,
            binding: binding
          })
        })
      }, attribute);
    })
  });
}
export const BlockBindingsPanel = ({
  name: blockName,
  metadata
}) => {
  const registry = useRegistry();
  const blockContext = useContext(BlockContext);
  const {
    bindings
  } = metadata || {};
  const {
    removeAllBlockBindings
  } = useBlockBindingsUtils();
  const bindableAttributes = getBindableAttributes(blockName);
  const dropdownMenuProps = useToolsPanelDropdownMenuProps();
  const filteredBindings = {
    ...bindings
  };
  Object.keys(filteredBindings).forEach(key => {
    if (!canBindAttribute(blockName, key) || filteredBindings[key].source === 'core/pattern-overrides') {
      delete filteredBindings[key];
    }
  });
  const {
    canUpdateBlockBindings
  } = useSelect(select => {
    return {
      canUpdateBlockBindings: select(blockEditorStore).getSettings().canUpdateBlockBindings
    };
  }, []);
  if (!bindableAttributes || bindableAttributes.length === 0) {
    return null;
  }
  const fieldsList = {};
  const {
    getBlockBindingsSources
  } = unlock(blocksPrivateApis);
  const registeredSources = getBlockBindingsSources();
  Object.entries(registeredSources).forEach(([sourceName, {
    getFieldsList,
    usesContext
  }]) => {
    if (getFieldsList) {
      // Populate context.
      const context = {};
      if (usesContext?.length) {
        for (const key of usesContext) {
          context[key] = blockContext[key];
        }
      }
      const sourceList = getFieldsList({
        registry,
        context
      });
      // Only add source if the list is not empty.
      if (sourceList) {
        fieldsList[sourceName] = {
          ...sourceList
        };
      }
    }
  });
  // Remove empty sources.
  Object.entries(fieldsList).forEach(([key, value]) => {
    if (!Object.keys(value).length) {
      delete fieldsList[key];
    }
  });

  // Lock the UI when the user can't update bindings or there are no fields to connect to.
  const readOnly = !canUpdateBlockBindings || !Object.keys(fieldsList).length;
  if (readOnly && Object.keys(filteredBindings).length === 0) {
    return null;
  }
  return /*#__PURE__*/_jsx(InspectorControls, {
    group: "bindings",
    children: /*#__PURE__*/_jsxs(ToolsPanel, {
      label: __('Attributes'),
      resetAll: () => {
        removeAllBlockBindings();
      },
      dropdownMenuProps: dropdownMenuProps,
      className: "block-editor-bindings__panel",
      children: [/*#__PURE__*/_jsx(ItemGroup, {
        isBordered: true,
        isSeparated: true,
        children: readOnly ? /*#__PURE__*/_jsx(ReadOnlyBlockBindingsPanelItems, {
          bindings: filteredBindings
        }) : /*#__PURE__*/_jsx(EditableBlockBindingsPanelItems, {
          attributes: bindableAttributes,
          bindings: filteredBindings,
          fieldsList: fieldsList
        })
      }), /*#__PURE__*/_jsx(ItemGroup, {
        children: /*#__PURE__*/_jsx(Text, {
          variant: "muted",
          children: __('Attributes connected to custom fields or other dynamic data.')
        })
      })]
    })
  });
};
export default {
  edit: BlockBindingsPanel,
  attributeKeys: ['metadata'],
  hasSupport() {
    return true;
  }
};
//# sourceMappingURL=block-bindings.js.map