export declare function useNavigationTreeNodes<TNode extends {
    children?: React.ReactNode;
    [key: string]: unknown;
}>(): {
    nodes: Record<string, Omit<TNode, "children">>;
    getNode: (key: string) => Omit<TNode, "children">;
    addNode: (key: string, value: TNode) => void;
    removeNode: (key: string) => void;
};
//# sourceMappingURL=use-navigation-tree-nodes.d.ts.map