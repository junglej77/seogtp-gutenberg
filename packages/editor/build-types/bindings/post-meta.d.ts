declare namespace _default {
    let name: string;
    function getValues({ registry, context, bindings }: {
        registry: any;
        context: any;
        bindings: any;
    }): {};
    function setValues({ registry, context, bindings }: {
        registry: any;
        context: any;
        bindings: any;
    }): void;
    function canUserEditValue({ select, context, args }: {
        select: any;
        context: any;
        args: any;
    }): boolean;
    function getFieldsList({ registry, context }: {
        registry: any;
        context: any;
    }): {
        [k: string]: any;
    } | null;
}
export default _default;
//# sourceMappingURL=post-meta.d.ts.map