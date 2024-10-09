/**
 * WordPress dependencies
 */
import { privateApis as blockEditorPrivateApis } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import useSidebarBlockEditor from './use-sidebar-block-editor';
import useBlocksFocusControl from '../focus-control/use-blocks-focus-control';
import { unlock } from '../../lock-unlock';
import { jsx as _jsx } from "react/jsx-runtime";
const {
  ExperimentalBlockEditorProvider
} = unlock(blockEditorPrivateApis);
export default function SidebarEditorProvider({
  sidebar,
  settings,
  children
}) {
  const [blocks, onInput, onChange] = useSidebarBlockEditor(sidebar);
  useBlocksFocusControl(blocks);
  return /*#__PURE__*/_jsx(ExperimentalBlockEditorProvider, {
    value: blocks,
    onInput: onInput,
    onChange: onChange,
    settings: settings,
    useSubRegistry: false,
    children: children
  });
}
//# sourceMappingURL=sidebar-editor-provider.js.map