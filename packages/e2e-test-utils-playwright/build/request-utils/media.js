"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listMedia = listMedia;
exports.uploadMedia = uploadMedia;
exports.deleteMedia = deleteMedia;
exports.deleteAllMedia = deleteAllMedia;
/**
 * External dependencies
 */
const fs = require("fs");
/**
 * List all media files.
 *
 * @see https://developer.wordpress.org/rest-api/reference/media/#list-media
 * @param this
 */
async function listMedia() {
    const response = await this.rest({
        method: 'GET',
        path: '/wp/v2/media',
        params: {
            per_page: 100,
        },
    });
    return response;
}
/**
 * Upload a media file.
 *
 * @see https://developer.wordpress.org/rest-api/reference/media/#create-a-media-item
 * @param this
 * @param filePathOrData The path or data of the file being uploaded.
 */
async function uploadMedia(filePathOrData) {
    const file = typeof filePathOrData === 'string'
        ? fs.createReadStream(filePathOrData)
        : filePathOrData;
    const response = await this.rest({
        method: 'POST',
        path: '/wp/v2/media',
        multipart: {
            file,
        },
    });
    return response;
}
/**
 * delete a media file.
 *
 * @see https://developer.wordpress.org/rest-api/reference/media/#delete-a-media-item
 * @param this
 * @param mediaId The ID of the media file.
 */
async function deleteMedia(mediaId) {
    const response = await this.rest({
        method: 'DELETE',
        path: `/wp/v2/media/${mediaId}`,
        params: { force: true },
    });
    return response;
}
/**
 * delete all media files.
 *
 * @param this
 */
async function deleteAllMedia() {
    const files = await this.listMedia();
    // The media endpoint doesn't support batch request yet.
    const responses = await Promise.all(files.map((media) => this.deleteMedia(media.id)));
    return responses;
}
//# sourceMappingURL=media.js.map