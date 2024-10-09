/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { __experimentalItemGroup as ItemGroup, __experimentalHeading as Heading, DropdownMenu, MenuGroup, MenuItem, TextControl, __experimentalHStack as HStack, __experimentalVStack as VStack, Button, Modal } from '@wordpress/components';
import { useMemo, useState } from '@wordpress/element';
import { moreVertical } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { privateApis as routerPrivateApis } from '@wordpress/router';

/**
 * Internal dependencies
 */
import DataViewItem from './dataview-item';
import AddNewItem from './add-new-view';
import { unlock } from '../../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const {
  useHistory
} = unlock(routerPrivateApis);
const EMPTY_ARRAY = [];
function RenameItemModalContent({
  dataviewId,
  currentTitle,
  setIsRenaming
}) {
  const {
    editEntityRecord
  } = useDispatch(coreStore);
  const [title, setTitle] = useState(currentTitle);
  return /*#__PURE__*/_jsx("form", {
    onSubmit: async event => {
      event.preventDefault();
      await editEntityRecord('postType', 'wp_dataviews', dataviewId, {
        title
      });
      setIsRenaming(false);
    },
    children: /*#__PURE__*/_jsxs(VStack, {
      spacing: "5",
      children: [/*#__PURE__*/_jsx(TextControl, {
        __next40pxDefaultSize: true,
        __nextHasNoMarginBottom: true,
        label: __('Name'),
        value: title,
        onChange: setTitle,
        placeholder: __('My view'),
        className: "patterns-create-modal__name-input"
      }), /*#__PURE__*/_jsxs(HStack, {
        justify: "right",
        children: [/*#__PURE__*/_jsx(Button, {
          variant: "tertiary",
          __next40pxDefaultSize: true,
          onClick: () => {
            setIsRenaming(false);
          },
          children: __('Cancel')
        }), /*#__PURE__*/_jsx(Button, {
          variant: "primary",
          type: "submit",
          "aria-disabled": !title,
          __next40pxDefaultSize: true,
          children: __('Save')
        })]
      })]
    })
  });
}
function CustomDataViewItem({
  dataviewId,
  isActive
}) {
  const history = useHistory();
  const {
    dataview
  } = useSelect(select => {
    const {
      getEditedEntityRecord
    } = select(coreStore);
    return {
      dataview: getEditedEntityRecord('postType', 'wp_dataviews', dataviewId)
    };
  }, [dataviewId]);
  const {
    deleteEntityRecord
  } = useDispatch(coreStore);
  const type = useMemo(() => {
    const viewContent = JSON.parse(dataview.content);
    return viewContent.type;
  }, [dataview.content]);
  const [isRenaming, setIsRenaming] = useState(false);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(DataViewItem, {
      title: dataview.title,
      type: type,
      isActive: isActive,
      isCustom: true,
      customViewId: dataviewId,
      suffix: /*#__PURE__*/_jsx(DropdownMenu, {
        icon: moreVertical,
        label: __('Actions'),
        className: "edit-site-sidebar-dataviews-dataview-item__dropdown-menu",
        toggleProps: {
          style: {
            color: 'inherit'
          },
          size: 'small'
        },
        children: ({
          onClose
        }) => /*#__PURE__*/_jsxs(MenuGroup, {
          children: [/*#__PURE__*/_jsx(MenuItem, {
            onClick: () => {
              setIsRenaming(true);
              onClose();
            },
            children: __('Rename')
          }), /*#__PURE__*/_jsx(MenuItem, {
            onClick: async () => {
              await deleteEntityRecord('postType', 'wp_dataviews', dataview.id, {
                force: true
              });
              if (isActive) {
                const {
                  params: {
                    postType
                  }
                } = history.getLocationWithParams();
                history.replace({
                  postType
                });
              }
              onClose();
            },
            isDestructive: true,
            children: __('Delete')
          })]
        })
      })
    }), isRenaming && /*#__PURE__*/_jsx(Modal, {
      title: __('Rename'),
      onRequestClose: () => {
        setIsRenaming(false);
      },
      focusOnMount: "firstContentElement",
      size: "small",
      children: /*#__PURE__*/_jsx(RenameItemModalContent, {
        dataviewId: dataviewId,
        setIsRenaming: setIsRenaming,
        currentTitle: dataview.title
      })
    })]
  });
}
export function useCustomDataViews(type) {
  const customDataViews = useSelect(select => {
    const {
      getEntityRecords
    } = select(coreStore);
    const dataViewTypeRecords = getEntityRecords('taxonomy', 'wp_dataviews_type', {
      slug: type
    });
    if (!dataViewTypeRecords || dataViewTypeRecords.length === 0) {
      return EMPTY_ARRAY;
    }
    const dataViews = getEntityRecords('postType', 'wp_dataviews', {
      wp_dataviews_type: dataViewTypeRecords[0].id,
      orderby: 'date',
      order: 'asc'
    });
    if (!dataViews) {
      return EMPTY_ARRAY;
    }
    return dataViews;
  });
  return customDataViews;
}
export default function CustomDataViewsList({
  type,
  activeView,
  isCustom
}) {
  const customDataViews = useCustomDataViews(type);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx("div", {
      className: "edit-site-sidebar-navigation-screen-dataviews__group-header",
      children: /*#__PURE__*/_jsx(Heading, {
        level: 2,
        children: __('Custom Views')
      })
    }), /*#__PURE__*/_jsxs(ItemGroup, {
      children: [customDataViews.map(customViewRecord => {
        return /*#__PURE__*/_jsx(CustomDataViewItem, {
          dataviewId: customViewRecord.id,
          isActive: isCustom && Number(activeView) === customViewRecord.id
        }, customViewRecord.id);
      }), /*#__PURE__*/_jsx(AddNewItem, {
        type: type
      })]
    })]
  });
}
//# sourceMappingURL=custom-dataviews-list.js.map