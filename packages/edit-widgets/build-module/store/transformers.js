/**
 * WordPress dependencies
 */
import { createBlock, parse, serialize } from '@wordpress/blocks';
import { addWidgetIdToBlock } from '@wordpress/widgets';

/**
 * Converts a widget entity record into a block.
 *
 * @param {Object} widget The widget entity record.
 * @return {Object} a block (converted from the entity record).
 */
export function transformWidgetToBlock(widget) {
  if (widget.id_base === 'block') {
    const parsedBlocks = parse(widget.instance.raw.content, {
      __unstableSkipAutop: true
    });
    if (!parsedBlocks.length) {
      return addWidgetIdToBlock(createBlock('core/paragraph', {}, []), widget.id);
    }
    return addWidgetIdToBlock(parsedBlocks[0], widget.id);
  }
  let attributes;
  if (widget._embedded.about[0].is_multi) {
    attributes = {
      idBase: widget.id_base,
      instance: widget.instance
    };
  } else {
    attributes = {
      id: widget.id
    };
  }
  return addWidgetIdToBlock(createBlock('core/legacy-widget', attributes, []), widget.id);
}

/**
 * Converts a block to a widget entity record.
 *
 * @param {Object}  block         The block.
 * @param {Object?} relatedWidget A related widget entity record from the API (optional).
 * @return {Object} the widget object (converted from block).
 */
export function transformBlockToWidget(block, relatedWidget = {}) {
  let widget;
  const isValidLegacyWidgetBlock = block.name === 'core/legacy-widget' && (block.attributes.id || block.attributes.instance);
  if (isValidLegacyWidgetBlock) {
    var _block$attributes$id, _block$attributes$idB, _block$attributes$ins;
    widget = {
      ...relatedWidget,
      id: (_block$attributes$id = block.attributes.id) !== null && _block$attributes$id !== void 0 ? _block$attributes$id : relatedWidget.id,
      id_base: (_block$attributes$idB = block.attributes.idBase) !== null && _block$attributes$idB !== void 0 ? _block$attributes$idB : relatedWidget.id_base,
      instance: (_block$attributes$ins = block.attributes.instance) !== null && _block$attributes$ins !== void 0 ? _block$attributes$ins : relatedWidget.instance
    };
  } else {
    widget = {
      ...relatedWidget,
      id_base: 'block',
      instance: {
        raw: {
          content: serialize(block)
        }
      }
    };
  }

  // Delete read-only properties.
  delete widget.rendered;
  delete widget.rendered_form;
  return widget;
}
//# sourceMappingURL=transformers.js.map