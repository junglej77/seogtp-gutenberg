/**
 * Concatenate two or more React children objects.
 *
 * @param {...?Object} childrenArguments Array of children arguments (array of arrays/strings/objects) to concatenate.
 *
 * @return {Array} The concatenated value.
 */
export function concatChildren(...childrenArguments: (any | null)[]): any[];
/**
 * Switches the nodeName of all the elements in the children object.
 *
 * @param {?Object} children Children object.
 * @param {string}  nodeName Node name.
 *
 * @return {?Object} The updated children object.
 */
export function switchChildrenNodeName(children: any | null, nodeName: string): any | null;
/**
 * Object containing a React element.
 */
export type Element = import("react").ReactElement;
/**
 * Object containing a React component.
 */
export type ComponentType = import("react").ComponentType;
/**
 * Object containing a React synthetic event.
 */
export type SyntheticEvent = import("react").SyntheticEvent;
/**
 * <T>
 */
export type RefObject<T> = import("react").RefObject<T>;
/**
 * <T>
 */
export type RefCallback<T> = import("react").RefCallback<T>;
/**
 * <T>
 */
export type Ref<T> = import("react").Ref<T>;
import { Children } from 'react';
import { cloneElement } from 'react';
import { Component } from 'react';
import { createContext } from 'react';
import { createElement } from 'react';
import { createRef } from 'react';
import { forwardRef } from 'react';
import { Fragment } from 'react';
import { isValidElement } from 'react';
import { memo } from 'react';
import { StrictMode } from 'react';
import { useCallback } from 'react';
import { useContext } from 'react';
import { useDebugValue } from 'react';
import { useDeferredValue } from 'react';
import { useEffect } from 'react';
import { useId } from 'react';
import { useImperativeHandle } from 'react';
import { useInsertionEffect } from 'react';
import { useLayoutEffect } from 'react';
import { useMemo } from 'react';
import { useReducer } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useSyncExternalStore } from 'react';
import { useTransition } from 'react';
import { startTransition } from 'react';
import { lazy } from 'react';
import { Suspense } from 'react';
import { PureComponent } from 'react';
export { Children, cloneElement, Component, createContext, createElement, createRef, forwardRef, Fragment, isValidElement, memo, StrictMode, useCallback, useContext, useDebugValue, useDeferredValue, useEffect, useId, useImperativeHandle, useInsertionEffect, useLayoutEffect, useMemo, useReducer, useRef, useState, useSyncExternalStore, useTransition, startTransition, lazy, Suspense, PureComponent };
//# sourceMappingURL=react.d.ts.map