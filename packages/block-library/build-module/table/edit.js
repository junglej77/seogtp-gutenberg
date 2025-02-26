/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { useEffect, useRef, useState } from '@wordpress/element';
import { InspectorControls, BlockControls, RichText, BlockIcon, AlignmentControl, useBlockProps, __experimentalUseColorProps as useColorProps, __experimentalUseBorderProps as useBorderProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { Button, PanelBody, Placeholder, TextControl, ToggleControl, ToolbarDropdownMenu, __experimentalHasSplitBorders as hasSplitBorders } from '@wordpress/components';
import { alignLeft, alignRight, alignCenter, blockTable as icon, tableColumnAfter, tableColumnBefore, tableColumnDelete, tableRowAfter, tableRowBefore, tableRowDelete, table } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import { createTable, updateSelectedCell, getCellAttribute, insertRow, deleteRow, insertColumn, deleteColumn, toggleSection, isEmptyTableSection } from './state';
import { Caption } from '../utils/caption';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const ALIGNMENT_CONTROLS = [{
  icon: alignLeft,
  title: __('Align column left'),
  align: 'left'
}, {
  icon: alignCenter,
  title: __('Align column center'),
  align: 'center'
}, {
  icon: alignRight,
  title: __('Align column right'),
  align: 'right'
}];
const cellAriaLabel = {
  head: __('Header cell text'),
  body: __('Body cell text'),
  foot: __('Footer cell text')
};
const placeholder = {
  head: __('Header label'),
  foot: __('Footer label')
};
function TSection({
  name,
  ...props
}) {
  const TagName = `t${name}`;
  return /*#__PURE__*/_jsx(TagName, {
    ...props
  });
}
function TableEdit({
  attributes,
  setAttributes,
  insertBlocksAfter,
  isSelected: isSingleSelected
}) {
  const {
    hasFixedLayout,
    head,
    foot
  } = attributes;
  const [initialRowCount, setInitialRowCount] = useState(2);
  const [initialColumnCount, setInitialColumnCount] = useState(2);
  const [selectedCell, setSelectedCell] = useState();
  const colorProps = useColorProps(attributes);
  const borderProps = useBorderProps(attributes);
  const tableRef = useRef();
  const [hasTableCreated, setHasTableCreated] = useState(false);

  /**
   * Updates the initial column count used for table creation.
   *
   * @param {number} count New initial column count.
   */
  function onChangeInitialColumnCount(count) {
    setInitialColumnCount(count);
  }

  /**
   * Updates the initial row count used for table creation.
   *
   * @param {number} count New initial row count.
   */
  function onChangeInitialRowCount(count) {
    setInitialRowCount(count);
  }

  /**
   * Creates a table based on dimensions in local state.
   *
   * @param {Object} event Form submit event.
   */
  function onCreateTable(event) {
    event.preventDefault();
    setAttributes(createTable({
      rowCount: parseInt(initialRowCount, 10) || 2,
      columnCount: parseInt(initialColumnCount, 10) || 2
    }));
    setHasTableCreated(true);
  }

  /**
   * Toggles whether the table has a fixed layout or not.
   */
  function onChangeFixedLayout() {
    setAttributes({
      hasFixedLayout: !hasFixedLayout
    });
  }

  /**
   * Changes the content of the currently selected cell.
   *
   * @param {Array} content A RichText content value.
   */
  function onChange(content) {
    if (!selectedCell) {
      return;
    }
    setAttributes(updateSelectedCell(attributes, selectedCell, cellAttributes => ({
      ...cellAttributes,
      content
    })));
  }

  /**
   * Align text within the a column.
   *
   * @param {string} align The new alignment to apply to the column.
   */
  function onChangeColumnAlignment(align) {
    if (!selectedCell) {
      return;
    }

    // Convert the cell selection to a column selection so that alignment
    // is applied to the entire column.
    const columnSelection = {
      type: 'column',
      columnIndex: selectedCell.columnIndex
    };
    const newAttributes = updateSelectedCell(attributes, columnSelection, cellAttributes => ({
      ...cellAttributes,
      align
    }));
    setAttributes(newAttributes);
  }

  /**
   * Get the alignment of the currently selected cell.
   *
   * @return {string | undefined} The new alignment to apply to the column.
   */
  function getCellAlignment() {
    if (!selectedCell) {
      return;
    }
    return getCellAttribute(attributes, selectedCell, 'align');
  }

  /**
   * Add or remove a `head` table section.
   */
  function onToggleHeaderSection() {
    setAttributes(toggleSection(attributes, 'head'));
  }

  /**
   * Add or remove a `foot` table section.
   */
  function onToggleFooterSection() {
    setAttributes(toggleSection(attributes, 'foot'));
  }

  /**
   * Inserts a row at the currently selected row index, plus `delta`.
   *
   * @param {number} delta Offset for selected row index at which to insert.
   */
  function onInsertRow(delta) {
    if (!selectedCell) {
      return;
    }
    const {
      sectionName,
      rowIndex
    } = selectedCell;
    const newRowIndex = rowIndex + delta;
    setAttributes(insertRow(attributes, {
      sectionName,
      rowIndex: newRowIndex
    }));
    // Select the first cell of the new row.
    setSelectedCell({
      sectionName,
      rowIndex: newRowIndex,
      columnIndex: 0,
      type: 'cell'
    });
  }

  /**
   * Inserts a row before the currently selected row.
   */
  function onInsertRowBefore() {
    onInsertRow(0);
  }

  /**
   * Inserts a row after the currently selected row.
   */
  function onInsertRowAfter() {
    onInsertRow(1);
  }

  /**
   * Deletes the currently selected row.
   */
  function onDeleteRow() {
    if (!selectedCell) {
      return;
    }
    const {
      sectionName,
      rowIndex
    } = selectedCell;
    setSelectedCell();
    setAttributes(deleteRow(attributes, {
      sectionName,
      rowIndex
    }));
  }

  /**
   * Inserts a column at the currently selected column index, plus `delta`.
   *
   * @param {number} delta Offset for selected column index at which to insert.
   */
  function onInsertColumn(delta = 0) {
    if (!selectedCell) {
      return;
    }
    const {
      columnIndex
    } = selectedCell;
    const newColumnIndex = columnIndex + delta;
    setAttributes(insertColumn(attributes, {
      columnIndex: newColumnIndex
    }));
    // Select the first cell of the new column.
    setSelectedCell({
      rowIndex: 0,
      columnIndex: newColumnIndex,
      type: 'cell'
    });
  }

  /**
   * Inserts a column before the currently selected column.
   */
  function onInsertColumnBefore() {
    onInsertColumn(0);
  }

  /**
   * Inserts a column after the currently selected column.
   */
  function onInsertColumnAfter() {
    onInsertColumn(1);
  }

  /**
   * Deletes the currently selected column.
   */
  function onDeleteColumn() {
    if (!selectedCell) {
      return;
    }
    const {
      sectionName,
      columnIndex
    } = selectedCell;
    setSelectedCell();
    setAttributes(deleteColumn(attributes, {
      sectionName,
      columnIndex
    }));
  }
  useEffect(() => {
    if (!isSingleSelected) {
      setSelectedCell();
    }
  }, [isSingleSelected]);
  useEffect(() => {
    if (hasTableCreated) {
      tableRef?.current?.querySelector('td div[contentEditable="true"]')?.focus();
      setHasTableCreated(false);
    }
  }, [hasTableCreated]);
  const sections = ['head', 'body', 'foot'].filter(name => !isEmptyTableSection(attributes[name]));
  const tableControls = [{
    icon: tableRowBefore,
    title: __('Insert row before'),
    isDisabled: !selectedCell,
    onClick: onInsertRowBefore
  }, {
    icon: tableRowAfter,
    title: __('Insert row after'),
    isDisabled: !selectedCell,
    onClick: onInsertRowAfter
  }, {
    icon: tableRowDelete,
    title: __('Delete row'),
    isDisabled: !selectedCell,
    onClick: onDeleteRow
  }, {
    icon: tableColumnBefore,
    title: __('Insert column before'),
    isDisabled: !selectedCell,
    onClick: onInsertColumnBefore
  }, {
    icon: tableColumnAfter,
    title: __('Insert column after'),
    isDisabled: !selectedCell,
    onClick: onInsertColumnAfter
  }, {
    icon: tableColumnDelete,
    title: __('Delete column'),
    isDisabled: !selectedCell,
    onClick: onDeleteColumn
  }];
  const renderedSections = sections.map(name => /*#__PURE__*/_jsx(TSection, {
    name: name,
    children: attributes[name].map(({
      cells
    }, rowIndex) => /*#__PURE__*/_jsx("tr", {
      children: cells.map(({
        content,
        tag: CellTag,
        scope,
        align,
        colspan,
        rowspan
      }, columnIndex) => /*#__PURE__*/_jsx(CellTag, {
        scope: CellTag === 'th' ? scope : undefined,
        colSpan: colspan,
        rowSpan: rowspan,
        className: clsx({
          [`has-text-align-${align}`]: align
        }, 'wp-block-table__cell-content'),
        children: /*#__PURE__*/_jsx(RichText, {
          value: content,
          onChange: onChange,
          onFocus: () => {
            setSelectedCell({
              sectionName: name,
              rowIndex,
              columnIndex,
              type: 'cell'
            });
          },
          "aria-label": cellAriaLabel[name],
          placeholder: placeholder[name]
        })
      }, columnIndex))
    }, rowIndex))
  }, name));
  const isEmpty = !sections.length;
  return /*#__PURE__*/_jsxs("figure", {
    ...useBlockProps({
      ref: tableRef
    }),
    children: [!isEmpty && /*#__PURE__*/_jsxs(_Fragment, {
      children: [/*#__PURE__*/_jsx(BlockControls, {
        group: "block",
        children: /*#__PURE__*/_jsx(AlignmentControl, {
          label: __('Change column alignment'),
          alignmentControls: ALIGNMENT_CONTROLS,
          value: getCellAlignment(),
          onChange: nextAlign => onChangeColumnAlignment(nextAlign)
        })
      }), /*#__PURE__*/_jsx(BlockControls, {
        group: "other",
        children: /*#__PURE__*/_jsx(ToolbarDropdownMenu, {
          hasArrowIndicator: true,
          icon: table,
          label: __('Edit table'),
          controls: tableControls
        })
      })]
    }), /*#__PURE__*/_jsx(InspectorControls, {
      children: /*#__PURE__*/_jsxs(PanelBody, {
        title: __('Settings'),
        className: "blocks-table-settings",
        children: [/*#__PURE__*/_jsx(ToggleControl, {
          __nextHasNoMarginBottom: true,
          label: __('Fixed width table cells'),
          checked: !!hasFixedLayout,
          onChange: onChangeFixedLayout
        }), !isEmpty && /*#__PURE__*/_jsxs(_Fragment, {
          children: [/*#__PURE__*/_jsx(ToggleControl, {
            __nextHasNoMarginBottom: true,
            label: __('Header section'),
            checked: !!(head && head.length),
            onChange: onToggleHeaderSection
          }), /*#__PURE__*/_jsx(ToggleControl, {
            __nextHasNoMarginBottom: true,
            label: __('Footer section'),
            checked: !!(foot && foot.length),
            onChange: onToggleFooterSection
          })]
        })]
      })
    }), !isEmpty && /*#__PURE__*/_jsx("table", {
      className: clsx(colorProps.className, borderProps.className, {
        'has-fixed-layout': hasFixedLayout,
        // This is required in the editor only to overcome
        // the fact the editor rewrites individual border
        // widths into a shorthand format.
        'has-individual-borders': hasSplitBorders(attributes?.style?.border)
      }),
      style: {
        ...colorProps.style,
        ...borderProps.style
      },
      children: renderedSections
    }), isEmpty ? /*#__PURE__*/_jsx(Placeholder, {
      label: __('Table'),
      icon: /*#__PURE__*/_jsx(BlockIcon, {
        icon: icon,
        showColors: true
      }),
      instructions: __('Insert a table for sharing data.'),
      children: /*#__PURE__*/_jsxs("form", {
        className: "blocks-table__placeholder-form",
        onSubmit: onCreateTable,
        children: [/*#__PURE__*/_jsx(TextControl, {
          __nextHasNoMarginBottom: true,
          __next40pxDefaultSize: true,
          type: "number",
          label: __('Column count'),
          value: initialColumnCount,
          onChange: onChangeInitialColumnCount,
          min: "1",
          className: "blocks-table__placeholder-input"
        }), /*#__PURE__*/_jsx(TextControl, {
          __nextHasNoMarginBottom: true,
          __next40pxDefaultSize: true,
          type: "number",
          label: __('Row count'),
          value: initialRowCount,
          onChange: onChangeInitialRowCount,
          min: "1",
          className: "blocks-table__placeholder-input"
        }), /*#__PURE__*/_jsx(Button, {
          __next40pxDefaultSize: true,
          variant: "primary",
          type: "submit",
          children: __('Create Table')
        })]
      })
    }) : /*#__PURE__*/_jsx(Caption, {
      attributes: attributes,
      setAttributes: setAttributes,
      isSelected: isSingleSelected,
      insertBlocksAfter: insertBlocksAfter,
      label: __('Table caption text'),
      showToolbarButton: isSingleSelected
    })]
  });
}
export default TableEdit;
//# sourceMappingURL=edit.js.map