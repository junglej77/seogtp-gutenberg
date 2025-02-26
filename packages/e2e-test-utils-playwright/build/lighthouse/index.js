"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lighthouse = void 0;
const lighthouse = require("lighthouse/core/index.cjs");
class Lighthouse {
    page;
    port;
    constructor({ page, port }) {
        this.page = page;
        this.port = port;
    }
    /**
     * Returns the Lighthouse report for the current URL.
     *
     * Runs several Lighthouse audits in a separate browser window and returns
     * the summary.
     */
    async getReport() {
        // From https://github.com/GoogleChrome/lighthouse/blob/d149e9c1b628d5881ca9ca451278d99ff1b31d9a/core/config/default-config.js#L433-L503
        const audits = {
            'largest-contentful-paint': 'LCP',
            'total-blocking-time': 'TBT',
            interactive: 'TTI',
            'cumulative-layout-shift': 'CLS',
            'experimental-interaction-to-next-paint': 'INP',
        };
        const report = await lighthouse(this.page.url(), { port: this.port }, {
            extends: 'lighthouse:default',
            settings: {
                // "provided" means no throttling.
                // TODO: Make configurable.
                throttlingMethod: 'provided',
                // Default is "mobile".
                // See https://github.com/GoogleChrome/lighthouse/blob/main/docs/emulation.md
                // TODO: Make configurable.
                formFactor: 'desktop',
                screenEmulation: {
                    disabled: true,
                },
                // Speeds up the report.
                disableFullPageScreenshot: true,
                // Only run certain audits to speed things up.
                onlyAudits: Object.keys(audits),
            },
        });
        const result = {};
        if (!report) {
            return result;
        }
        const { lhr } = report;
        for (const [audit, acronym] of Object.entries(audits)) {
            result[acronym] = lhr.audits[audit]?.numericValue || 0;
        }
        return result;
    }
}
exports.Lighthouse = Lighthouse;
//# sourceMappingURL=index.js.map