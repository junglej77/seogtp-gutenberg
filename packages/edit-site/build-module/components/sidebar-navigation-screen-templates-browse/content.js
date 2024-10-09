/**
 * WordPress dependencies
 */
import { useEntityRecords } from '@wordpress/core-data';
import { useMemo } from '@wordpress/element';
import { __experimentalItemGroup as ItemGroup } from '@wordpress/components';

/**
 * Internal dependencies
 */
import DataViewItem from '../sidebar-dataviews/dataview-item';
import { useAddedBy } from '../page-templates/hooks';
import { layout } from '@wordpress/icons';
import { TEMPLATE_POST_TYPE } from '../../utils/constants';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const EMPTY_ARRAY = [];
function TemplateDataviewItem({
  template,
  isActive
}) {
  const {
    text,
    icon
  } = useAddedBy(template.type, template.id);
  return /*#__PURE__*/_jsx(DataViewItem, {
    slug: text,
    title: text,
    icon: icon,
    isActive: isActive,
    isCustom: false
  }, text);
}
export default function DataviewsTemplatesSidebarContent({
  activeView,
  title
}) {
  const {
    records
  } = useEntityRecords('postType', TEMPLATE_POST_TYPE, {
    per_page: -1
  });
  const firstItemPerAuthorText = useMemo(() => {
    var _ref;
    const firstItemPerAuthor = records?.reduce((acc, template) => {
      const author = template.author_text;
      if (author && !acc[author]) {
        acc[author] = template;
      }
      return acc;
    }, {});
    return (_ref = firstItemPerAuthor && Object.values(firstItemPerAuthor)) !== null && _ref !== void 0 ? _ref : EMPTY_ARRAY;
  }, [records]);
  return /*#__PURE__*/_jsxs(ItemGroup, {
    children: [/*#__PURE__*/_jsx(DataViewItem, {
      slug: "all",
      title: title,
      icon: layout,
      isActive: activeView === 'all',
      isCustom: false
    }), firstItemPerAuthorText.map(template => {
      return /*#__PURE__*/_jsx(TemplateDataviewItem, {
        template: template,
        isActive: activeView === template.author_text
      }, template.author_text);
    })]
  });
}
//# sourceMappingURL=content.js.map