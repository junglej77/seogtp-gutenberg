"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dragFiles = dragFiles;
/**
 * External dependencies
 */
const promises_1 = require("fs/promises");
const path_1 = require("path");
const mime_1 = require("mime");
/**
 * Simulate dragging files from outside the current page.
 *
 * @param this
 * @param files The files to be dragged.
 * @return The methods of the drag operation.
 */
async function dragFiles(files) {
    const filesList = Array.isArray(files) ? files : [files];
    const fileObjects = await Promise.all(filesList.map(async (filePathOrObject) => {
        if (typeof filePathOrObject !== 'string') {
            return {
                name: filePathOrObject.name,
                mimeType: filePathOrObject.mimeType ||
                    (0, mime_1.getType)(filePathOrObject.name),
                base64: filePathOrObject.buffer.toString('base64'),
            };
        }
        const base64 = await (0, promises_1.readFile)(filePathOrObject, 'base64');
        const name = (0, path_1.basename)(filePathOrObject);
        return {
            name,
            mimeType: (0, mime_1.getType)(filePathOrObject),
            base64,
        };
    }));
    // CDP doesn't actually support dragging files, this is only a _good enough_
    // dummy data so that it will correctly send the relevant events.
    const dragData = {
        items: fileObjects.map((fileObject) => ({
            mimeType: fileObject.mimeType ?? 'File',
            data: fileObject.base64,
        })),
        files: fileObjects.map((fileObject) => fileObject.name),
        // Copy = 1, Link = 2, Move = 16.
        dragOperationsMask: 1,
    };
    const cdpSession = await this.context.newCDPSession(this.page);
    const position = {
        x: 0,
        y: 0,
    };
    return {
        /**
         * Drag the files over an element (fires `dragenter` and `dragover` events).
         *
         * @param selectorOrLocator A selector or a locator to search for an element.
         * @param options           The optional options.
         * @param options.position  A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of the element.
         */
        dragOver: async (selectorOrLocator, options = {}) => {
            const locator = typeof selectorOrLocator === 'string'
                ? this.page.locator(selectorOrLocator)
                : selectorOrLocator;
            const boundingBox = await locator.boundingBox();
            if (!boundingBox) {
                throw new Error('Cannot find the element or the element is not visible on the viewport.');
            }
            position.x =
                boundingBox.x +
                    (options.position?.x ?? boundingBox.width / 2);
            position.y =
                boundingBox.y +
                    (options.position?.y ?? boundingBox.height / 2);
            await cdpSession.send('Input.dispatchDragEvent', {
                type: 'dragEnter',
                ...position,
                data: dragData,
            });
            await cdpSession.send('Input.dispatchDragEvent', {
                type: 'dragOver',
                ...position,
                data: dragData,
            });
        },
        /**
         * Drop the files at the current position.
         */
        drop: async () => {
            const topMostElement = await this.page.evaluateHandle(({ x, y }) => {
                const element = document.elementFromPoint(x, y);
                if (element instanceof HTMLIFrameElement) {
                    const offsetBox = element.getBoundingClientRect();
                    return element.contentDocument.elementFromPoint(x - offsetBox.x, y - offsetBox.y);
                }
                return element;
            }, position);
            const elementHandle = topMostElement.asElement();
            if (!elementHandle) {
                throw new Error('Element not found.');
            }
            const dataTransfer = await elementHandle.evaluateHandle(async (_node, _fileObjects) => {
                const dt = new DataTransfer();
                const fileInstances = await Promise.all(_fileObjects.map(async (fileObject) => {
                    const blob = await fetch(`data:${fileObject.mimeType};base64,${fileObject.base64}`).then((res) => res.blob());
                    return new File([blob], fileObject.name, {
                        type: fileObject.mimeType ?? undefined,
                    });
                }));
                fileInstances.forEach((file) => {
                    dt.items.add(file);
                });
                return dt;
            }, fileObjects);
            await elementHandle.dispatchEvent('drop', { dataTransfer });
            await cdpSession.detach();
        },
    };
}
//# sourceMappingURL=drag-files.js.map