/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { createBlobURL, revokeBlobURL } from '@wordpress/blob';

/**
 * Internal dependencies
 */

import { uploadToServer } from './upload-to-server';
import { validateMimeType } from './validate-mime-type';
import { validateMimeTypeForUser } from './validate-mime-type-for-user';
import { validateFileSize } from './validate-file-size';
import { UploadError } from './upload-error';
/**
 * Upload a media file when the file upload button is activated
 * or when adding a file to the editor via drag & drop.
 *
 * @param $0                    Parameters object passed to the function.
 * @param $0.allowedTypes       Array with the types of media that can be uploaded, if unset all types are allowed.
 * @param $0.additionalData     Additional data to include in the request.
 * @param $0.filesList          List of files.
 * @param $0.maxUploadFileSize  Maximum upload size in bytes allowed for the site.
 * @param $0.onError            Function called when an error happens.
 * @param $0.onFileChange       Function called each time a file or a temporary representation of the file is available.
 * @param $0.wpAllowedMimeTypes List of allowed mime types and file extensions.
 * @param $0.signal             Abort signal.
 */
export function uploadMedia({
  wpAllowedMimeTypes,
  allowedTypes,
  additionalData = {},
  filesList,
  maxUploadFileSize,
  onError,
  onFileChange,
  signal
}) {
  const validFiles = [];
  const filesSet = [];
  const setAndUpdateFiles = (index, value) => {
    if (filesSet[index]?.url) {
      revokeBlobURL(filesSet[index].url);
    }
    filesSet[index] = value;
    onFileChange?.(filesSet.filter(attachment => attachment !== null));
  };
  for (const mediaFile of filesList) {
    // Verify if user is allowed to upload this mime type.
    // Defer to the server when type not detected.
    try {
      validateMimeTypeForUser(mediaFile, wpAllowedMimeTypes);
    } catch (error) {
      onError?.(error);
      continue;
    }

    // Check if the caller (e.g. a block) supports this mime type.
    // Defer to the server when type not detected.
    try {
      validateMimeType(mediaFile, allowedTypes);
    } catch (error) {
      onError?.(error);
      continue;
    }

    // Verify if file is greater than the maximum file upload size allowed for the site.
    try {
      validateFileSize(mediaFile, maxUploadFileSize);
    } catch (error) {
      onError?.(error);
      continue;
    }
    validFiles.push(mediaFile);

    // Set temporary URL to create placeholder media file, this is replaced
    // with final file from media gallery when upload is `done` below.
    filesSet.push({
      url: createBlobURL(mediaFile)
    });
    onFileChange?.(filesSet);
  }
  validFiles.map(async (file, index) => {
    try {
      const attachment = await uploadToServer(file, additionalData, signal);
      setAndUpdateFiles(index, attachment);
    } catch (error) {
      // Reset to empty on failure.
      setAndUpdateFiles(index, null);
      let message;
      if (error instanceof Error) {
        message = error.message;
      } else {
        message = sprintf(
        // translators: %s: file name
        __('Error while uploading file %s to the media library.'), file.name);
      }
      onError?.(new UploadError({
        code: 'GENERAL',
        message,
        file,
        cause: error instanceof Error ? error : undefined
      }));
    }
  });
}
//# sourceMappingURL=upload-media.js.map