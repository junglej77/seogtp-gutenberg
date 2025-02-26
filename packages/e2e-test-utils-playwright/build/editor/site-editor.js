"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveSiteEditorEntities = saveSiteEditorEntities;
/**
 * Save entities in the site editor. Assumes the editor is in a dirty state.
 *
 * @param this
 * @param options
 */
async function saveSiteEditorEntities(options = {}) {
    const editorTopBar = this.page.getByRole('region', {
        name: 'Editor top bar',
    });
    // If we have changes in a single entity which can be published the label is `Publish`.
    const saveButton = editorTopBar.getByRole('button', {
        name: 'Save',
        exact: true,
    });
    const publishButton = editorTopBar.getByRole('button', {
        name: 'Publish',
    });
    const publishButtonIsVisible = !(await saveButton.isVisible());
    // First Save button in the top bar.
    const buttonToClick = publishButtonIsVisible ? publishButton : saveButton;
    await buttonToClick.click();
    if (!options.isOnlyCurrentEntityDirty) {
        // Second Save button in the entities panel.
        await this.page
            .getByRole('region', {
            name: /(Editor publish|Save panel)/,
        })
            .getByRole('button', { name: 'Save', exact: true })
            .click();
    }
    // The text in the notice can be different based on the edited entity, whether
    // we are saving multiple entities and whether we publish or update. So for now,
    // we locate it based on the last part.
    await this.page
        .getByRole('button', { name: 'Dismiss this notice' })
        .getByText(/(updated|published)\./)
        .waitFor();
}
//# sourceMappingURL=site-editor.js.map