/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { useState, useRef, useEffect, useCallback, useMemo } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { lineSolid, moreVertical, plus } from '@wordpress/icons';
import { useDebounce } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import Button from '../button';
import { ColorPicker } from '../color-picker';
import { FlexItem } from '../flex';
import { HStack } from '../h-stack';
import { ItemGroup } from '../item-group';
import { VStack } from '../v-stack';
import GradientPicker from '../gradient-picker';
import ColorPalette from '../color-palette';
import DropdownMenu from '../dropdown-menu';
import Popover from '../popover';
import { PaletteActionsContainer, PaletteEditStyles, PaletteHeading, IndicatorStyled, PaletteItem, NameContainer, NameInputControl, DoneButton, RemoveButton, PaletteEditContents } from './styles';
import { NavigableMenu } from '../navigable-container';
import { DEFAULT_GRADIENT } from '../custom-gradient-picker/constants';
import CustomGradientPicker from '../custom-gradient-picker';
import { kebabCase } from '../utils/strings';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const DEFAULT_COLOR = '#000';
function NameInput({
  value,
  onChange,
  label
}) {
  return /*#__PURE__*/_jsx(NameInputControl, {
    label: label,
    hideLabelFromVision: true,
    value: value,
    onChange: onChange
  });
}

/**
 * Returns a name and slug for a palette item. The name takes the format "Color + id".
 * To ensure there are no duplicate ids, this function checks all slugs.
 * It expects slugs to be in the format: slugPrefix + color- + number.
 * It then sets the id component of the new name based on the incremented id of the highest existing slug id.
 *
 * @param elements   An array of color palette items.
 * @param slugPrefix The slug prefix used to match the element slug.
 *
 * @return A name and slug for the new palette item.
 */
export function getNameAndSlugForPosition(elements, slugPrefix) {
  const nameRegex = new RegExp(`^${slugPrefix}color-([\\d]+)$`);
  const position = elements.reduce((previousValue, currentValue) => {
    if (typeof currentValue?.slug === 'string') {
      const matches = currentValue?.slug.match(nameRegex);
      if (matches) {
        const id = parseInt(matches[1], 10);
        if (id >= previousValue) {
          return id + 1;
        }
      }
    }
    return previousValue;
  }, 1);
  return {
    name: sprintf( /* translators: %s: is an id for a custom color */
    __('Color %s'), position),
    slug: `${slugPrefix}color-${position}`
  };
}
function ColorPickerPopover({
  isGradient,
  element,
  onChange,
  popoverProps: receivedPopoverProps,
  onClose = () => {}
}) {
  const popoverProps = useMemo(() => ({
    shift: true,
    offset: 20,
    // Disabling resize as it would otherwise cause the popover to show
    // scrollbars while dragging the color picker's handle close to the
    // popover edge.
    resize: false,
    placement: 'left-start',
    ...receivedPopoverProps,
    className: clsx('components-palette-edit__popover', receivedPopoverProps?.className)
  }), [receivedPopoverProps]);
  return /*#__PURE__*/_jsxs(Popover, {
    ...popoverProps,
    onClose: onClose,
    children: [!isGradient && /*#__PURE__*/_jsx(ColorPicker, {
      color: element.color,
      enableAlpha: true,
      onChange: newColor => {
        onChange({
          ...element,
          color: newColor
        });
      }
    }), isGradient && /*#__PURE__*/_jsx("div", {
      className: "components-palette-edit__popover-gradient-picker",
      children: /*#__PURE__*/_jsx(CustomGradientPicker, {
        __experimentalIsRenderedInSidebar: true,
        value: element.gradient,
        onChange: newGradient => {
          onChange({
            ...element,
            gradient: newGradient
          });
        }
      })
    })]
  });
}
function Option({
  canOnlyChangeValues,
  elements,
  element,
  onChange,
  onRemove,
  popoverProps: receivedPopoverProps,
  slugPrefix,
  isGradient
}) {
  const value = isGradient ? element.gradient : element.color;
  const [isEditingColor, setIsEditingColor] = useState(false);

  // Use internal state instead of a ref to make sure that the component
  // re-renders when the popover's anchor updates.
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const popoverProps = useMemo(() => ({
    ...receivedPopoverProps,
    // Use the custom palette color item as the popover anchor.
    anchor: popoverAnchor
  }), [popoverAnchor, receivedPopoverProps]);
  return /*#__PURE__*/_jsxs(PaletteItem, {
    ref: setPopoverAnchor,
    as: "div",
    children: [/*#__PURE__*/_jsxs(HStack, {
      justify: "flex-start",
      children: [/*#__PURE__*/_jsx(Button, {
        onClick: () => {
          setIsEditingColor(true);
        },
        "aria-label": sprintf(
        // translators: %s is a color or gradient name, e.g. "Red".
        __('Edit: %s'), element.name.trim().length ? element.name : value),
        style: {
          padding: 0
        },
        children: /*#__PURE__*/_jsx(IndicatorStyled, {
          colorValue: value
        })
      }), /*#__PURE__*/_jsx(FlexItem, {
        children: !canOnlyChangeValues ? /*#__PURE__*/_jsx(NameInput, {
          label: isGradient ? __('Gradient name') : __('Color name'),
          value: element.name,
          onChange: nextName => {
            // 生成基础的 slug
            let baseSlug = slugPrefix + kebabCase(nextName !== null && nextName !== void 0 ? nextName : '');

            // 如果生成的 slug 为空，使用默认值
            if (!baseSlug) {
              baseSlug = slugPrefix + 'custom';
            }

            // 检查现有元素中的 slug 是否重复，并递增
            let slug = baseSlug;
            let counter = 1;
            while (elements.some(el => el.slug && el.slug === slug)) {
              slug = `${baseSlug}-${counter}`;
              counter++;
            }

            // 调用 onChange，并传递生成的唯一 slug 和 name
            onChange({
              ...element,
              name: nextName,
              slug: slug
            });
          }
        }) : /*#__PURE__*/_jsx(NameContainer, {
          children: element.name.trim().length ? element.name : /* Fall back to non-breaking space to maintain height */
          '\u00A0'
        })
      }), !canOnlyChangeValues && /*#__PURE__*/_jsx(FlexItem, {
        children: /*#__PURE__*/_jsx(RemoveButton, {
          size: "small",
          icon: lineSolid,
          label: sprintf(
          // translators: %s is a color or gradient name, e.g. "Red".
          __('Remove color: %s'), element.name.trim().length ? element.name : value),
          onClick: onRemove
        })
      })]
    }), isEditingColor && /*#__PURE__*/_jsx(ColorPickerPopover, {
      isGradient: isGradient,
      onChange: onChange,
      element: element,
      popoverProps: popoverProps,
      onClose: () => setIsEditingColor(false)
    })]
  });
}
function PaletteEditListView({
  elements,
  onChange,
  canOnlyChangeValues,
  slugPrefix,
  isGradient,
  popoverProps,
  addColorRef
}) {
  // When unmounting the component if there are empty elements (the user did not complete the insertion) clean them.
  const elementsReferenceRef = useRef();
  useEffect(() => {
    elementsReferenceRef.current = elements;
  }, [elements]);
  const debounceOnChange = useDebounce(onChange, 100);
  return /*#__PURE__*/_jsx(VStack, {
    spacing: 3,
    children: /*#__PURE__*/_jsx(ItemGroup, {
      isRounded: true,
      children: elements.map((element, index) => /*#__PURE__*/_jsx(Option, {
        isGradient: isGradient,
        canOnlyChangeValues: canOnlyChangeValues,
        elements: elements,
        element: element,
        onChange: newElement => {
          debounceOnChange(elements.map((currentElement, currentIndex) => {
            if (currentIndex === index) {
              return newElement;
            }
            return currentElement;
          }));
        },
        onRemove: () => {
          const newElements = elements.filter((_currentElement, currentIndex) => {
            if (currentIndex === index) {
              return false;
            }
            return true;
          });
          onChange(newElements.length ? newElements : undefined);
          addColorRef.current?.focus();
        },
        slugPrefix: slugPrefix,
        popoverProps: popoverProps
      }, index))
    })
  });
}
const EMPTY_ARRAY = [];

/**
 * Allows editing a palette of colors or gradients.
 *
 * ```jsx
 * import { PaletteEdit } from '@wordpress/components';
 * const MyPaletteEdit = () => {
 *   const [ controlledColors, setControlledColors ] = useState( colors );
 *
 *   return (
 *     <PaletteEdit
 *       colors={ controlledColors }
 *       onChange={ ( newColors?: Color[] ) => {
 *         setControlledColors( newColors );
 *       } }
 *       paletteLabel="Here is a label"
 *     />
 *   );
 * };
 * ```
 */
export function PaletteEdit({
  gradients,
  colors = EMPTY_ARRAY,
  onChange,
  paletteLabel,
  paletteLabelHeadingLevel = 2,
  emptyMessage,
  canOnlyChangeValues,
  canReset,
  slugPrefix = '',
  popoverProps
}) {
  const isGradient = !!gradients;
  const elements = isGradient ? gradients : colors;
  const [isEditing, setIsEditing] = useState(false);
  const [editingElement, setEditingElement] = useState(null);
  const isAdding = isEditing && !!editingElement && elements[editingElement] && !elements[editingElement].slug;
  const elementsLength = elements.length;
  const hasElements = elementsLength > 0;
  const debounceOnChange = useDebounce(onChange, 100);
  const onSelectPaletteItem = useCallback((value, newEditingElementIndex) => {
    const selectedElement = newEditingElementIndex === undefined ? undefined : elements[newEditingElementIndex];
    const key = isGradient ? 'gradient' : 'color';
    // Ensures that the index returned matches a known element value.
    if (!!selectedElement && selectedElement[key] === value) {
      setEditingElement(newEditingElementIndex);
    } else {
      setIsEditing(true);
    }
  }, [isGradient, elements]);
  const addColorRef = useRef(null);
  return /*#__PURE__*/_jsxs(PaletteEditStyles, {
    children: [/*#__PURE__*/_jsxs(HStack, {
      children: [/*#__PURE__*/_jsx(PaletteHeading, {
        level: paletteLabelHeadingLevel,
        children: paletteLabel
      }), /*#__PURE__*/_jsxs(PaletteActionsContainer, {
        children: [hasElements && isEditing && /*#__PURE__*/_jsx(DoneButton, {
          size: "small",
          onClick: () => {
            setIsEditing(false);
            setEditingElement(null);
          },
          children: __('Done')
        }), !canOnlyChangeValues && /*#__PURE__*/_jsx(Button, {
          ref: addColorRef,
          size: "small",
          isPressed: isAdding,
          icon: plus,
          label: isGradient ? __('Add gradient') : __('Add color'),
          onClick: () => {
            const {
              name,
              slug
            } = getNameAndSlugForPosition(elements, slugPrefix);
            if (!!gradients) {
              onChange([...gradients, {
                gradient: DEFAULT_GRADIENT,
                name,
                slug
              }]);
            } else {
              onChange([...colors, {
                color: DEFAULT_COLOR,
                name,
                slug
              }]);
            }
            setIsEditing(true);
            setEditingElement(elements.length);
          }
        }), hasElements && (!isEditing || !canOnlyChangeValues || canReset) && /*#__PURE__*/_jsx(DropdownMenu, {
          icon: moreVertical,
          label: isGradient ? __('Gradient options') : __('Color options'),
          toggleProps: {
            size: 'small'
          },
          children: ({
            onClose
          }) => /*#__PURE__*/_jsx(_Fragment, {
            children: /*#__PURE__*/_jsxs(NavigableMenu, {
              role: "menu",
              children: [!isEditing && /*#__PURE__*/_jsx(Button, {
                variant: "tertiary",
                onClick: () => {
                  setIsEditing(true);
                  onClose();
                },
                className: "components-palette-edit__menu-button",
                children: __('Show details')
              }), !canOnlyChangeValues && /*#__PURE__*/_jsx(Button, {
                variant: "tertiary",
                onClick: () => {
                  setEditingElement(null);
                  setIsEditing(false);
                  onChange();
                  onClose();
                },
                className: "components-palette-edit__menu-button",
                children: isGradient ? __('Remove all gradients') : __('Remove all colors')
              }), canReset && /*#__PURE__*/_jsx(Button, {
                variant: "tertiary",
                onClick: () => {
                  setEditingElement(null);
                  onChange();
                  onClose();
                },
                children: isGradient ? __('Reset gradient') : __('Reset colors')
              })]
            })
          })
        })]
      })]
    }), hasElements && /*#__PURE__*/_jsxs(PaletteEditContents, {
      children: [isEditing && /*#__PURE__*/_jsx(PaletteEditListView, {
        canOnlyChangeValues: canOnlyChangeValues,
        elements: elements
        // @ts-expect-error TODO: Don't know how to resolve
        ,
        onChange: onChange,
        slugPrefix: slugPrefix,
        isGradient: isGradient,
        popoverProps: popoverProps,
        addColorRef: addColorRef
      }), !isEditing && editingElement !== null && /*#__PURE__*/_jsx(ColorPickerPopover, {
        isGradient: isGradient,
        onClose: () => setEditingElement(null),
        onChange: newElement => {
          debounceOnChange(
          // @ts-expect-error TODO: Don't know how to resolve
          elements.map((currentElement, currentIndex) => {
            if (currentIndex === editingElement) {
              return newElement;
            }
            return currentElement;
          }));
        },
        element: elements[editingElement !== null && editingElement !== void 0 ? editingElement : -1],
        popoverProps: popoverProps
      }), !isEditing && (isGradient ? /*#__PURE__*/_jsx(GradientPicker, {
        gradients: gradients,
        onChange: onSelectPaletteItem,
        clearable: false,
        disableCustomGradients: true
      }) : /*#__PURE__*/_jsx(ColorPalette, {
        colors: colors,
        onChange: onSelectPaletteItem,
        clearable: false,
        disableCustomColors: true
      }))]
    }), !hasElements && emptyMessage && /*#__PURE__*/_jsx(PaletteEditContents, {
      children: emptyMessage
    })]
  });
}
export default PaletteEdit;
//# sourceMappingURL=index.js.map