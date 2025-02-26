/**
 * Internal dependencies
 */
import type { TabsProps } from './types';
declare function Tabs({ selectOnMove, defaultTabId, orientation, onSelect, children, selectedTabId, }: TabsProps): import("react").JSX.Element;
declare namespace Tabs {
    var TabList: import("react").ForwardRefExoticComponent<import("./types").TabListProps & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "as" | "children"> & import("react").RefAttributes<HTMLDivElement>>;
    var Tab: import("react").ForwardRefExoticComponent<Omit<import("../context").WordPressComponentProps<import("./types").TabProps, "button", false>, "id"> & import("react").RefAttributes<HTMLButtonElement>>;
    var TabPanel: import("react").ForwardRefExoticComponent<Omit<import("../context").WordPressComponentProps<import("./types").TabPanelProps, "div", false>, "id"> & import("react").RefAttributes<HTMLDivElement>>;
    var Context: import("react").Context<import("./types").TabsContextProps>;
}
export default Tabs;
//# sourceMappingURL=index.d.ts.map