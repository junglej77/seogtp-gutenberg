export declare const NumberControlWrapper: import("@emotion/styled").StyledComponent<Omit<import("../input-control/types").InputControlProps, "value" | "type" | "step" | "max" | "min" | "required" | "isDragEnabled"> & {
    hideHTMLArrows?: boolean;
    spinControls?: "none" | "native" | "custom";
    isDragEnabled?: import("../input-control/types").InputControlProps["isDragEnabled"];
    isShiftStepEnabled?: boolean;
    max?: number;
    min?: number;
    required?: import("../input-control/types").InputControlProps["required"];
    shiftStep?: number;
    step?: import("../input-control/types").InputControlProps["step"];
    spinFactor?: number;
    type?: import("../input-control/types").InputControlProps["type"];
    value?: number | string;
} & Omit<Omit<import("react").DetailedHTMLProps<import("react").InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "ref">, "form" | "label" | "slot" | "style" | "title" | "pattern" | "as" | "children" | "key" | "defaultChecked" | "defaultValue" | "suppressContentEditableWarning" | "suppressHydrationWarning" | "accessKey" | "autoFocus" | "className" | "contentEditable" | "contextMenu" | "dir" | "draggable" | "hidden" | "id" | "lang" | "nonce" | "spellCheck" | "tabIndex" | "translate" | "radioGroup" | "role" | "about" | "content" | "datatype" | "inlist" | "prefix" | "property" | "rel" | "resource" | "rev" | "typeof" | "vocab" | "autoCapitalize" | "autoCorrect" | "autoSave" | "color" | "itemProp" | "itemScope" | "itemType" | "itemID" | "itemRef" | "results" | "security" | "unselectable" | "inputMode" | "is" | "aria-activedescendant" | "aria-atomic" | "aria-autocomplete" | "aria-braillelabel" | "aria-brailleroledescription" | "aria-busy" | "aria-checked" | "aria-colcount" | "aria-colindex" | "aria-colindextext" | "aria-colspan" | "aria-controls" | "aria-current" | "aria-describedby" | "aria-description" | "aria-details" | "aria-disabled" | "aria-dropeffect" | "aria-errormessage" | "aria-expanded" | "aria-flowto" | "aria-grabbed" | "aria-haspopup" | "aria-hidden" | "aria-invalid" | "aria-keyshortcuts" | "aria-label" | "aria-labelledby" | "aria-level" | "aria-live" | "aria-modal" | "aria-multiline" | "aria-multiselectable" | "aria-orientation" | "aria-owns" | "aria-placeholder" | "aria-posinset" | "aria-pressed" | "aria-readonly" | "aria-relevant" | "aria-required" | "aria-roledescription" | "aria-rowcount" | "aria-rowindex" | "aria-rowindextext" | "aria-rowspan" | "aria-selected" | "aria-setsize" | "aria-sort" | "aria-valuemax" | "aria-valuemin" | "aria-valuenow" | "aria-valuetext" | "dangerouslySetInnerHTML" | "onCopy" | "onCopyCapture" | "onCut" | "onCutCapture" | "onPaste" | "onPasteCapture" | "onCompositionEnd" | "onCompositionEndCapture" | "onCompositionStart" | "onCompositionStartCapture" | "onCompositionUpdate" | "onCompositionUpdateCapture" | "onFocus" | "onFocusCapture" | "onBlur" | "onBlurCapture" | "onChange" | "onChangeCapture" | "onBeforeInput" | "onBeforeInputCapture" | "onInput" | "onInputCapture" | "onReset" | "onResetCapture" | "onSubmit" | "onSubmitCapture" | "onInvalid" | "onInvalidCapture" | "onLoad" | "onLoadCapture" | "onError" | "onErrorCapture" | "onKeyDown" | "onKeyDownCapture" | "onKeyPress" | "onKeyPressCapture" | "onKeyUp" | "onKeyUpCapture" | "onAbort" | "onAbortCapture" | "onCanPlay" | "onCanPlayCapture" | "onCanPlayThrough" | "onCanPlayThroughCapture" | "onDurationChange" | "onDurationChangeCapture" | "onEmptied" | "onEmptiedCapture" | "onEncrypted" | "onEncryptedCapture" | "onEnded" | "onEndedCapture" | "onLoadedData" | "onLoadedDataCapture" | "onLoadedMetadata" | "onLoadedMetadataCapture" | "onLoadStart" | "onLoadStartCapture" | "onPause" | "onPauseCapture" | "onPlay" | "onPlayCapture" | "onPlaying" | "onPlayingCapture" | "onProgress" | "onProgressCapture" | "onRateChange" | "onRateChangeCapture" | "onResize" | "onResizeCapture" | "onSeeked" | "onSeekedCapture" | "onSeeking" | "onSeekingCapture" | "onStalled" | "onStalledCapture" | "onSuspend" | "onSuspendCapture" | "onTimeUpdate" | "onTimeUpdateCapture" | "onVolumeChange" | "onVolumeChangeCapture" | "onWaiting" | "onWaitingCapture" | "onAuxClick" | "onAuxClickCapture" | "onClick" | "onClickCapture" | "onContextMenu" | "onContextMenuCapture" | "onDoubleClick" | "onDoubleClickCapture" | "onDrag" | "onDragCapture" | "onDragEnd" | "onDragEndCapture" | "onDragEnter" | "onDragEnterCapture" | "onDragExit" | "onDragExitCapture" | "onDragLeave" | "onDragLeaveCapture" | "onDragOver" | "onDragOverCapture" | "onDragStart" | "onDragStartCapture" | "onDrop" | "onDropCapture" | "onMouseDown" | "onMouseDownCapture" | "onMouseEnter" | "onMouseLeave" | "onMouseMove" | "onMouseMoveCapture" | "onMouseOut" | "onMouseOutCapture" | "onMouseOver" | "onMouseOverCapture" | "onMouseUp" | "onMouseUpCapture" | "onSelect" | "onSelectCapture" | "onTouchCancel" | "onTouchCancelCapture" | "onTouchEnd" | "onTouchEndCapture" | "onTouchMove" | "onTouchMoveCapture" | "onTouchStart" | "onTouchStartCapture" | "onPointerDown" | "onPointerDownCapture" | "onPointerMove" | "onPointerMoveCapture" | "onPointerUp" | "onPointerUpCapture" | "onPointerCancel" | "onPointerCancelCapture" | "onPointerEnter" | "onPointerLeave" | "onPointerOver" | "onPointerOverCapture" | "onPointerOut" | "onPointerOutCapture" | "onGotPointerCapture" | "onGotPointerCaptureCapture" | "onLostPointerCapture" | "onLostPointerCaptureCapture" | "onScroll" | "onScrollCapture" | "onWheel" | "onWheelCapture" | "onAnimationStart" | "onAnimationStartCapture" | "onAnimationEnd" | "onAnimationEndCapture" | "onAnimationIteration" | "onAnimationIterationCapture" | "onTransitionEnd" | "onTransitionEndCapture" | "value" | "disabled" | "formAction" | "formEncType" | "formMethod" | "formNoValidate" | "formTarget" | "name" | "type" | "height" | "width" | "list" | "step" | "max" | "min" | "alt" | "src" | "autoComplete" | "accept" | "capture" | "checked" | "enterKeyHint" | "maxLength" | "minLength" | "multiple" | "placeholder" | "readOnly" | "required" | "size" | "help" | "isDragEnabled" | "suffix" | "__next36pxDefaultSize" | "__next40pxDefaultSize" | "__unstableInputWidth" | "hideLabelFromVision" | "labelPosition" | "dragDirection" | "dragThreshold" | "isPressEnterToChange" | "onValidate" | "__unstableStateReducer" | "hideHTMLArrows" | "spinControls" | "isShiftStepEnabled" | "shiftStep" | "spinFactor"> & import("react").RefAttributes<any> & {
    theme?: import("@emotion/react").Theme;
}, {}, {}>;
export declare const SelectControl: import("@emotion/styled").StyledComponent<(import("../context").WordPressComponentProps<import("../select-control/types").SelectControlProps<string>, "select", false> & {
    ref?: React.Ref<HTMLSelectElement>;
}) & {
    theme?: import("@emotion/react").Theme;
}, {}, {}>;
export declare const RangeControl: import("@emotion/styled").StyledComponent<Pick<import("../base-control/types").BaseControlProps, "help" | "__nextHasNoMarginBottom" | "hideLabelFromVision"> & import("../range-control/types").NumericProps & {
    disabled?: boolean;
    marks?: boolean | {
        value: number;
        label?: string;
    }[];
    step?: number | "any";
} & {
    afterIcon?: import("..").IconType;
    allowReset?: boolean;
    beforeIcon?: import("..").IconType;
    color?: import("react").CSSProperties["color"];
    currentInput?: number;
    icon?: string;
    initialPosition?: number;
    isShiftStepEnabled?: boolean;
    label?: string;
    onBlur?: import("react").FocusEventHandler<HTMLInputElement>;
    onChange?: (value?: number) => void;
    onFocus?: import("react").FocusEventHandler<HTMLInputElement>;
    onMouseLeave?: import("react").MouseEventHandler<HTMLInputElement>;
    onMouseMove?: import("react").MouseEventHandler<HTMLInputElement>;
    railColor?: import("react").CSSProperties["color"];
    renderTooltipContent?: (value?: import("../range-control/types").ControlledRangeValue) => string | number | null | undefined;
    resetFallbackValue?: number;
    separatorType?: "none" | "fullWidth" | "topFullWidth";
    shiftStep?: number;
    __next40pxDefaultSize?: boolean;
    showTooltip?: boolean;
    trackColor?: import("react").CSSProperties["color"];
    type?: "stepper";
    withInputField?: boolean;
} & Omit<Omit<import("react").DetailedHTMLProps<import("react").InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "ref">, "label" | "as" | "children" | "color" | "onFocus" | "onBlur" | "onChange" | "onMouseLeave" | "onMouseMove" | "disabled" | "type" | "step" | "help" | "icon" | "__nextHasNoMarginBottom" | "__next40pxDefaultSize" | "hideLabelFromVision" | "isShiftStepEnabled" | "shiftStep" | "showTooltip" | keyof import("../range-control/types").NumericProps | "marks" | "afterIcon" | "allowReset" | "beforeIcon" | "currentInput" | "initialPosition" | "railColor" | "renderTooltipContent" | "resetFallbackValue" | "separatorType" | "trackColor" | "withInputField"> & import("react").RefAttributes<HTMLInputElement> & {
    theme?: import("@emotion/react").Theme;
}, {}, {}>;
export declare const AuxiliaryColorArtefactWrapper: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme;
    as?: React.ElementType;
}, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
export declare const AuxiliaryColorArtefactHStackHeader: import("@emotion/styled").StyledComponent<Omit<import("../flex/types").FlexProps, "gap" | "align"> & {
    alignment?: import("../h-stack/types").HStackAlignment | import("react").CSSProperties["alignItems"];
    spacing?: import("react").CSSProperties["width"];
} & import("react").RefAttributes<any> & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "as" | "children" | "direction" | "spacing" | "wrap" | "justify" | keyof import("react").RefAttributes<any> | "expanded" | "isReversed" | "alignment"> & {
    as?: keyof JSX.IntrinsicElements | undefined;
} & {
    theme?: import("@emotion/react").Theme;
}, {}, {}>;
export declare const ColorInputWrapper: import("@emotion/styled").StyledComponent<import("../flex/types").FlexProps & import("react").RefAttributes<any> & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "as" | keyof import("react").RefAttributes<any> | keyof import("../flex/types").FlexProps> & {
    as?: keyof JSX.IntrinsicElements | undefined;
} & {
    theme?: import("@emotion/react").Theme;
}, {}, {}>;
export declare const ColorfulWrapper: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme;
    as?: React.ElementType;
}, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
export declare const CopyButton: import("@emotion/styled").StyledComponent<((import("../button/types").ButtonProps & import("../button/types").DeprecatedButtonProps) & import("react").RefAttributes<any>) & {
    theme?: import("@emotion/react").Theme;
}, {}, {}>;
//# sourceMappingURL=styles.d.ts.map