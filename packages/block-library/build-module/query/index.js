/**
 * WordPress dependencies
 */
import { loop as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import initBlock from '../utils/init-block';
const metadata = {
  $schema: "https://schemas.wp.org/trunk/block.json",
  apiVersion: 3,
  name: "core/query",
  title: "Query Loop",
  category: "theme",
  description: "An advanced block that allows displaying post types based on different query parameters and visual configurations.",
  textdomain: "default",
  attributes: {
    queryId: {
      type: "number"
    },
    query: {
      type: "object",
      "default": {
        perPage: null,
        pages: 0,
        offset: 0,
        postType: "post",
        order: "desc",
        orderBy: "date",
        author: "",
        search: "",
        exclude: [],
        sticky: "",
        inherit: true,
        taxQuery: null,
        parents: []
      }
    },
    tagName: {
      type: "string",
      "default": "div"
    },
    namespace: {
      type: "string"
    },
    enhancedPagination: {
      type: "boolean",
      "default": false
    }
  },
  providesContext: {
    queryId: "queryId",
    query: "query",
    displayLayout: "displayLayout",
    enhancedPagination: "enhancedPagination"
  },
  supports: {
    align: ["wide", "full"],
    html: false,
    layout: true,
    interactivity: true
  },
  editorStyle: "wp-block-query-editor"
};
import edit from './edit';
import save from './save';
import variations from './variations';
import deprecated from './deprecated';
const {
  name
} = metadata;
export { metadata, name };
export const settings = {
  icon,
  edit,
  example: {
    viewportWidth: 650,
    attributes: {
      namespace: 'core/posts-list',
      query: {
        perPage: 4,
        pages: 1,
        offset: 0,
        postType: 'post',
        order: 'desc',
        orderBy: 'date',
        author: '',
        search: '',
        sticky: 'exclude',
        inherit: false
      }
    },
    innerBlocks: [{
      name: 'core/post-template',
      attributes: {
        layout: {
          type: 'grid',
          columnCount: 2
        }
      },
      innerBlocks: [{
        name: 'core/post-title'
      }, {
        name: 'core/post-date'
      }, {
        name: 'core/post-excerpt'
      }]
    }]
  },
  save,
  variations,
  deprecated
};
export const init = () => initBlock({
  name,
  metadata,
  settings
});
//# sourceMappingURL=index.js.map