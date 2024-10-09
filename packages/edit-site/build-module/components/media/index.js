/**
 * WordPress dependencies
 */
import { useEntityRecord } from '@wordpress/core-data';
import { jsx as _jsx } from "react/jsx-runtime";
function Media({
  id,
  size = ['large', 'medium', 'thumbnail'],
  ...props
}) {
  const {
    record: media
  } = useEntityRecord('root', 'media', id);
  const currentSize = size.find(s => !!media?.media_details?.sizes[s]);
  const mediaUrl = media?.media_details?.sizes[currentSize]?.source_url || media?.source_url;
  if (!mediaUrl) {
    return null;
  }
  return /*#__PURE__*/_jsx("img", {
    ...props,
    src: mediaUrl,
    alt: media.alt_text
  });
}
export default Media;
//# sourceMappingURL=index.js.map