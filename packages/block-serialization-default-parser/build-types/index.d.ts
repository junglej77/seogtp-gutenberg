export function parse(doc: string): ParsedBlock[];
export type Attributes = Object | null;
export type ParsedBlock = {
    /**
     * Block name.
     */
    blockName: string | null;
    /**
     * Block attributes.
     */
    attrs: Attributes;
    /**
     * Inner blocks.
     */
    innerBlocks: ParsedBlock[];
    /**
     * Inner HTML.
     */
    innerHTML: string;
    /**
     * Inner content.
     */
    innerContent: Array<string | null>;
};
export type ParsedFrame = {
    /**
     * Block.
     */
    block: ParsedBlock;
    /**
     * Token start.
     */
    tokenStart: number;
    /**
     * Token length.
     */
    tokenLength: number;
    /**
     * Previous offset.
     */
    prevOffset: number;
    /**
     * Leading HTML start.
     */
    leadingHtmlStart: number | null;
};
export type TokenType = "no-more-tokens" | "void-block" | "block-opener" | "block-closer";
export type Token = [TokenType, string, Attributes, number, number];
//# sourceMappingURL=index.d.ts.map