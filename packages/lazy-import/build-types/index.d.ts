export = lazyImport;
/**
 * Given an arg string as would be passed to `npm install`, requires the package
 * corresponding to the name and specifier parsed from the arg. If the package
 * is not installed (or not installed at that version), the package is installed
 * to a temporary directory at `node_modules/.wp-lazy` relative to where the
 * current working directory.
 *
 * @param {string}                       arg       A string that you might pass
 *                                                 to `npm install`.
 * @param {Partial<WPLazyImportOptions>} [options] Optional options object.
 *
 * @return {Promise<NodeRequire>} Promise resolving to required module.
 */
declare function lazyImport(arg: string, options?: Partial<WPLazyImportOptions> | undefined): Promise<NodeRequire>;
declare namespace lazyImport {
    export { WPLazyImportOptions };
}
type WPLazyImportOptions = {
    /**
     * Path to the local directory or file.
     */
    localPath?: string | undefined;
    /**
     * Callback to invoke when install starts.
     */
    onInstall?: (() => void) | undefined;
};
//# sourceMappingURL=index.d.ts.map