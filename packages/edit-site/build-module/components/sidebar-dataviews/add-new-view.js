/**
 * WordPress dependencies
 */
import { Modal, TextControl, __experimentalHStack as HStack, __experimentalVStack as VStack, Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useDispatch, resolveSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { useState } from '@wordpress/element';
import { plus } from '@wordpress/icons';
import { privateApis as routerPrivateApis } from '@wordpress/router';

/**
 * Internal dependencies
 */
import SidebarNavigationItem from '../sidebar-navigation-item';
import { useDefaultViews } from './default-views';
import { unlock } from '../../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const {
  useHistory
} = unlock(routerPrivateApis);
function AddNewItemModalContent({
  type,
  setIsAdding
}) {
  const history = useHistory();
  const {
    saveEntityRecord
  } = useDispatch(coreStore);
  const [title, setTitle] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const defaultViews = useDefaultViews({
    postType: type
  });
  return /*#__PURE__*/_jsx("form", {
    onSubmit: async event => {
      event.preventDefault();
      setIsSaving(true);
      const {
        getEntityRecords
      } = resolveSelect(coreStore);
      let dataViewTaxonomyId;
      const dataViewTypeRecords = await getEntityRecords('taxonomy', 'wp_dataviews_type', {
        slug: type
      });
      if (dataViewTypeRecords && dataViewTypeRecords.length > 0) {
        dataViewTaxonomyId = dataViewTypeRecords[0].id;
      } else {
        const record = await saveEntityRecord('taxonomy', 'wp_dataviews_type', {
          name: type
        });
        if (record && record.id) {
          dataViewTaxonomyId = record.id;
        }
      }
      const savedRecord = await saveEntityRecord('postType', 'wp_dataviews', {
        title,
        status: 'publish',
        wp_dataviews_type: dataViewTaxonomyId,
        content: JSON.stringify(defaultViews[0].view)
      });
      const {
        params: {
          postType
        }
      } = history.getLocationWithParams();
      history.push({
        postType,
        activeView: savedRecord.id,
        isCustom: 'true'
      });
      setIsSaving(false);
      setIsAdding(false);
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
        children: [/*#__PURE__*/_jsx(Button
        // TODO: Switch to `true` (40px size) if possible
        , {
          __next40pxDefaultSize: false,
          variant: "tertiary",
          onClick: () => {
            setIsAdding(false);
          },
          children: __('Cancel')
        }), /*#__PURE__*/_jsx(Button
        // TODO: Switch to `true` (40px size) if possible
        , {
          __next40pxDefaultSize: false,
          variant: "primary",
          type: "submit",
          "aria-disabled": !title || isSaving,
          isBusy: isSaving,
          children: __('Create')
        })]
      })]
    })
  });
}
export default function AddNewItem({
  type
}) {
  const [isAdding, setIsAdding] = useState(false);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(SidebarNavigationItem, {
      icon: plus,
      onClick: () => {
        setIsAdding(true);
      },
      className: "dataviews__siderbar-content-add-new-item",
      children: __('New view')
    }), isAdding && /*#__PURE__*/_jsx(Modal, {
      title: __('Add new view'),
      onRequestClose: () => {
        setIsAdding(false);
      },
      children: /*#__PURE__*/_jsx(AddNewItemModalContent, {
        type: type,
        setIsAdding: setIsAdding
      })
    })]
  });
}
//# sourceMappingURL=add-new-view.js.map