/**
 * Internal dependencies
 */
import FormRegular from './regular';
import FormPanel from './panel';
const FORM_LAYOUTS = [{
  type: 'regular',
  component: FormRegular
}, {
  type: 'panel',
  component: FormPanel
}];
export function getFormLayout(type) {
  return FORM_LAYOUTS.find(layout => layout.type === type);
}
//# sourceMappingURL=index.js.map