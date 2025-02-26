/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { useBlockProps, BlockControls, InspectorControls, BlockIcon, store as blockEditorStore } from '@wordpress/block-editor';
import { Flex, FlexBlock, Spinner, Placeholder } from '@wordpress/components';
import { brush as brushIcon } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { useState, useCallback } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';

/**
 * Internal dependencies
 */
import WidgetTypeSelector from './widget-type-selector';
import InspectorCard from './inspector-card';
import Form from './form';
import Preview from './preview';
import NoPreview from './no-preview';
import ConvertToBlocksButton from './convert-to-blocks-button';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
export default function Edit(props) {
  const {
    id,
    idBase
  } = props.attributes;
  const {
    isWide = false
  } = props;
  const blockProps = useBlockProps({
    className: clsx({
      'is-wide-widget': isWide
    })
  });
  return /*#__PURE__*/_jsx("div", {
    ...blockProps,
    children: !id && !idBase ? /*#__PURE__*/_jsx(Empty, {
      ...props
    }) : /*#__PURE__*/_jsx(NotEmpty, {
      ...props
    })
  });
}
function Empty({
  attributes: {
    id,
    idBase
  },
  setAttributes
}) {
  return /*#__PURE__*/_jsx(Placeholder, {
    icon: /*#__PURE__*/_jsx(BlockIcon, {
      icon: brushIcon
    }),
    label: __('Legacy Widget'),
    children: /*#__PURE__*/_jsx(Flex, {
      children: /*#__PURE__*/_jsx(FlexBlock, {
        children: /*#__PURE__*/_jsx(WidgetTypeSelector, {
          selectedId: id !== null && id !== void 0 ? id : idBase,
          onSelect: ({
            selectedId,
            isMulti
          }) => {
            if (!selectedId) {
              setAttributes({
                id: null,
                idBase: null,
                instance: null
              });
            } else if (isMulti) {
              setAttributes({
                id: null,
                idBase: selectedId,
                instance: {}
              });
            } else {
              setAttributes({
                id: selectedId,
                idBase: null,
                instance: null
              });
            }
          }
        })
      })
    })
  });
}
function NotEmpty({
  attributes: {
    id,
    idBase,
    instance
  },
  setAttributes,
  clientId,
  isSelected,
  isWide = false
}) {
  const [hasPreview, setHasPreview] = useState(null);
  const widgetTypeId = id !== null && id !== void 0 ? id : idBase;
  const {
    record: widgetType,
    hasResolved: hasResolvedWidgetType
  } = useEntityRecord('root', 'widgetType', widgetTypeId);
  const isNavigationMode = useSelect(select => select(blockEditorStore).isNavigationMode(), []);
  const setInstance = useCallback(nextInstance => {
    setAttributes({
      instance: nextInstance
    });
  }, []);
  if (!widgetType && hasResolvedWidgetType) {
    return /*#__PURE__*/_jsx(Placeholder, {
      icon: /*#__PURE__*/_jsx(BlockIcon, {
        icon: brushIcon
      }),
      label: __('Legacy Widget'),
      children: __('Widget is missing.')
    });
  }
  if (!hasResolvedWidgetType) {
    return /*#__PURE__*/_jsx(Placeholder, {
      children: /*#__PURE__*/_jsx(Spinner, {})
    });
  }
  const mode = idBase && (isNavigationMode || !isSelected) ? 'preview' : 'edit';
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [idBase === 'text' && /*#__PURE__*/_jsx(BlockControls, {
      group: "other",
      children: /*#__PURE__*/_jsx(ConvertToBlocksButton, {
        clientId: clientId,
        rawInstance: instance.raw
      })
    }), /*#__PURE__*/_jsx(InspectorControls, {
      children: /*#__PURE__*/_jsx(InspectorCard, {
        name: widgetType.name,
        description: widgetType.description
      })
    }), /*#__PURE__*/_jsx(Form, {
      title: widgetType.name,
      isVisible: mode === 'edit',
      id: id,
      idBase: idBase,
      instance: instance,
      isWide: isWide,
      onChangeInstance: setInstance,
      onChangeHasPreview: setHasPreview
    }), idBase && /*#__PURE__*/_jsxs(_Fragment, {
      children: [hasPreview === null && mode === 'preview' && /*#__PURE__*/_jsx(Placeholder, {
        children: /*#__PURE__*/_jsx(Spinner, {})
      }), hasPreview === true && /*#__PURE__*/_jsx(Preview, {
        idBase: idBase,
        instance: instance,
        isVisible: mode === 'preview'
      }), hasPreview === false && mode === 'preview' && /*#__PURE__*/_jsx(NoPreview, {
        name: widgetType.name
      })]
    })]
  });
}
//# sourceMappingURL=index.js.map