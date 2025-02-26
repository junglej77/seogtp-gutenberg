/**
 * External dependencies
 */
import type { SerializedStyles } from '@emotion/react';
import type { CSSProperties, ReactNode } from 'react';
/**
 * Internal dependencies
 */
import type { WordPressComponentProps } from '../../context';
import type { LabelPosition, Size, PrefixSuffixWrapperProps } from '../types';
type ContainerProps = {
    disabled?: boolean;
    hideLabel?: boolean;
    __unstableInputWidth?: CSSProperties['width'];
    labelPosition?: LabelPosition;
};
export declare const Prefix: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme;
    as?: React.ElementType;
}, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, {}>;
export declare const Suffix: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme;
    as?: React.ElementType;
}, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, {}>;
type BackdropProps = {
    disabled?: boolean;
    isBorderless?: boolean;
};
export declare const BackdropUI: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme;
    as?: React.ElementType;
} & BackdropProps, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
export declare const Root: import("@emotion/styled").StyledComponent<import("../../flex/types").FlexProps & import("react").RefAttributes<any> & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "as" | keyof import("react").RefAttributes<any> | keyof import("../../flex/types").FlexProps> & {
    as?: keyof JSX.IntrinsicElements | undefined;
} & {
    theme?: import("@emotion/react").Theme;
}, {}, {}>;
export declare const Container: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme;
    as?: React.ElementType;
} & ContainerProps, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
type InputProps = {
    __next40pxDefaultSize?: boolean;
    disabled?: boolean;
    inputSize?: Size;
    isDragging?: boolean;
    dragCursor?: CSSProperties['cursor'];
    paddingInlineStart?: CSSProperties['paddingInlineStart'];
    paddingInlineEnd?: CSSProperties['paddingInlineEnd'];
};
export declare const fontSizeStyles: ({ inputSize: size }: InputProps) => SerializedStyles | "";
export declare const getSizeConfig: ({ inputSize: size, __next40pxDefaultSize, }: InputProps) => {
    height: number;
    lineHeight: number;
    minHeight: number;
    paddingLeft: number;
    paddingRight: number;
} | {
    height: number;
    lineHeight: number;
    minHeight: number;
    paddingLeft: number;
    paddingRight: number;
} | {
    height: number;
    lineHeight: number;
    minHeight: number;
    paddingLeft: number;
    paddingRight: number;
} | {
    height: number;
    lineHeight: number;
    minHeight: number;
    paddingLeft: number;
    paddingRight: number;
};
export declare const Input: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme;
    as?: React.ElementType;
} & InputProps, import("react").DetailedHTMLProps<import("react").InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, {}>;
export declare const Label: (props: WordPressComponentProps<{
    labelPosition?: LabelPosition;
    children: ReactNode;
}, "label", false>) => import("react").JSX.Element;
export declare const LabelWrapper: import("@emotion/styled").StyledComponent<import("../../flex/types").FlexItemProps & import("react").RefAttributes<any> & Omit<Omit<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref">, "as" | keyof import("react").RefAttributes<any> | keyof import("../../flex/types").FlexItemProps> & {
    as?: keyof JSX.IntrinsicElements | undefined;
} & {
    theme?: import("@emotion/react").Theme;
}, {}, {}>;
export declare const PrefixSuffixWrapper: import("@emotion/styled").StyledComponent<{
    theme?: import("@emotion/react").Theme;
    as?: React.ElementType;
} & PrefixSuffixWrapperProps & {
    isPrefix?: boolean;
}, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
export {};
//# sourceMappingURL=input-control-styles.d.ts.map