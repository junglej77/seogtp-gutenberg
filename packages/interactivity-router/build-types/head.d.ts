/**
 * Helper to update only the necessary tags in the head.
 *
 * @async
 * @param newHead The head elements of the new page.
 */
export declare const updateHead: (newHead: HTMLHeadElement[]) => Promise<void>;
/**
 * Fetches and processes head assets (stylesheets and scripts) from a specified document.
 *
 * @async
 * @param doc               The document from which to fetch head assets. It should support standard DOM querying methods.
 * @param headElements      A map of head elements to modify tracking the URLs of already processed assets to avoid duplicates.
 * @param headElements.tag
 * @param headElements.text
 *
 * @return Returns an array of HTML elements representing the head assets.
 */
export declare const fetchHeadAssets: (doc: Document, headElements: Map<string, {
    tag: HTMLElement;
    text: string;
}>) => Promise<HTMLElement[]>;
//# sourceMappingURL=head.d.ts.map