/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */

import { getItemTitle } from '../actions/utils';
export const titleField = {
  type: 'text',
  id: 'title',
  label: __('Title'),
  placeholder: __('No title'),
  getValue: ({
    item
  }) => getItemTitle(item)
};
export const orderField = {
  type: 'integer',
  id: 'menu_order',
  label: __('Order'),
  description: __('Determines the order of pages.')
};
//# sourceMappingURL=index.js.map