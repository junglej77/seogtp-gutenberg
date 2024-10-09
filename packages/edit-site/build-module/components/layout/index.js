/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import { __unstableMotion as motion, __unstableAnimatePresence as AnimatePresence, __unstableUseNavigateRegions as useNavigateRegions } from '@wordpress/components';
import { useReducedMotion, useViewportMatch, useResizeObserver, usePrevious } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { useState, useRef, useEffect } from '@wordpress/element';
import { store as keyboardShortcutsStore } from '@wordpress/keyboard-shortcuts';
import { CommandMenu } from '@wordpress/commands';
import { privateApis as blockEditorPrivateApis } from '@wordpress/block-editor';
import { EditorSnackbars, privateApis as editorPrivateApis } from '@wordpress/editor';
import { privateApis as coreCommandsPrivateApis } from '@wordpress/core-commands';

/**
 * Internal dependencies
 */
import ErrorBoundary from '../error-boundary';
import { store as editSiteStore } from '../../store';
import { default as SiteHub, SiteHubMobile } from '../site-hub';
import ResizableFrame from '../resizable-frame';
import { unlock } from '../../lock-unlock';
import KeyboardShortcutsRegister from '../keyboard-shortcuts/register';
import KeyboardShortcutsGlobal from '../keyboard-shortcuts/global';
import { useIsSiteEditorLoading } from './hooks';
import useMovingAnimation from './animation';
import SidebarContent from '../sidebar';
import SaveHub from '../save-hub';
import SavePanel from '../save-panel';
import useSyncCanvasModeWithURL from '../sync-state-with-url/use-sync-canvas-mode-with-url';
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const {
  useCommands
} = unlock(coreCommandsPrivateApis);
const {
  useGlobalStyle
} = unlock(blockEditorPrivateApis);
const {
  NavigableRegion
} = unlock(editorPrivateApis);
const ANIMATION_DURATION = 0.3;
export default function Layout({
  route
}) {
  useSyncCanvasModeWithURL();
  useCommands();
  const isMobileViewport = useViewportMatch('medium', '<');
  const toggleRef = useRef();
  const {
    canvasMode,
    previousShortcut,
    nextShortcut
  } = useSelect(select => {
    const {
      getAllShortcutKeyCombinations
    } = select(keyboardShortcutsStore);
    const {
      getCanvasMode
    } = unlock(select(editSiteStore));
    return {
      canvasMode: getCanvasMode(),
      previousShortcut: getAllShortcutKeyCombinations('core/editor/previous-region'),
      nextShortcut: getAllShortcutKeyCombinations('core/editor/next-region')
    };
  }, []);
  const navigateRegionsProps = useNavigateRegions({
    previous: previousShortcut,
    next: nextShortcut
  });
  const disableMotion = useReducedMotion();
  const [canvasResizer, canvasSize] = useResizeObserver();
  const isEditorLoading = useIsSiteEditorLoading();
  const [isResizableFrameOversized, setIsResizableFrameOversized] = useState(false);
  const {
    key: routeKey,
    areas,
    widths
  } = route;
  const animationRef = useMovingAnimation({
    triggerAnimationOnChange: canvasMode + '__' + routeKey
  });
  const [backgroundColor] = useGlobalStyle('color.background');
  const [gradientValue] = useGlobalStyle('color.gradient');
  const previousCanvaMode = usePrevious(canvasMode);
  useEffect(() => {
    if (previousCanvaMode === 'edit') {
      toggleRef.current?.focus();
    }
    // Should not depend on the previous canvas mode value but the next.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasMode]);

  // Synchronizing the URL with the store value of canvasMode happens in an effect
  // This condition ensures the component is only rendered after the synchronization happens
  // which prevents any animations due to potential canvasMode value change.
  if (canvasMode === 'init') {
    return null;
  }
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(CommandMenu, {}), /*#__PURE__*/_jsx(KeyboardShortcutsRegister, {}), /*#__PURE__*/_jsx(KeyboardShortcutsGlobal, {}), /*#__PURE__*/_jsx("div", {
      ...navigateRegionsProps,
      ref: navigateRegionsProps.ref,
      className: clsx('edit-site-layout', navigateRegionsProps.className, {
        'is-full-canvas': canvasMode === 'edit'
      }),
      children: /*#__PURE__*/_jsxs("div", {
        className: "edit-site-layout__content",
        children: [(!isMobileViewport || !areas.mobile) && /*#__PURE__*/_jsx(NavigableRegion, {
          ariaLabel: __('Navigation'),
          className: "edit-site-layout__sidebar-region",
          children: /*#__PURE__*/_jsx(AnimatePresence, {
            children: canvasMode === 'view' && /*#__PURE__*/_jsxs(motion.div, {
              initial: {
                opacity: 0
              },
              animate: {
                opacity: 1
              },
              exit: {
                opacity: 0
              },
              transition: {
                type: 'tween',
                duration:
                // Disable transition in mobile to emulate a full page transition.
                disableMotion || isMobileViewport ? 0 : ANIMATION_DURATION,
                ease: 'easeOut'
              },
              className: "edit-site-layout__sidebar",
              children: [/*#__PURE__*/_jsx(SiteHub, {
                ref: toggleRef,
                isTransparent: isResizableFrameOversized
              }), /*#__PURE__*/_jsx(SidebarContent, {
                routeKey: routeKey,
                children: areas.sidebar
              }), /*#__PURE__*/_jsx(SaveHub, {}), /*#__PURE__*/_jsx(SavePanel, {})]
            })
          })
        }), /*#__PURE__*/_jsx(EditorSnackbars, {}), isMobileViewport && areas.mobile && /*#__PURE__*/_jsxs("div", {
          className: "edit-site-layout__mobile",
          children: [canvasMode !== 'edit' && /*#__PURE__*/_jsx(SidebarContent, {
            routeKey: routeKey,
            children: /*#__PURE__*/_jsx(SiteHubMobile, {
              ref: toggleRef,
              isTransparent: isResizableFrameOversized
            })
          }), areas.mobile]
        }), !isMobileViewport && areas.content && canvasMode !== 'edit' && /*#__PURE__*/_jsx("div", {
          className: "edit-site-layout__area",
          style: {
            maxWidth: widths?.content
          },
          children: areas.content
        }), !isMobileViewport && areas.edit && /*#__PURE__*/_jsx("div", {
          className: "edit-site-layout__area",
          style: {
            maxWidth: widths?.edit
          },
          children: areas.edit
        }), !isMobileViewport && areas.preview && /*#__PURE__*/_jsxs("div", {
          className: "edit-site-layout__canvas-container",
          children: [canvasResizer, !!canvasSize.width && /*#__PURE__*/_jsx("div", {
            className: clsx('edit-site-layout__canvas', {
              'is-right-aligned': isResizableFrameOversized
            }),
            ref: animationRef,
            children: /*#__PURE__*/_jsx(ErrorBoundary, {
              children: /*#__PURE__*/_jsx(ResizableFrame, {
                isReady: !isEditorLoading,
                isFullWidth: canvasMode === 'edit',
                defaultSize: {
                  width: canvasSize.width - 24 /* $canvas-padding */,
                  height: canvasSize.height
                },
                isOversized: isResizableFrameOversized,
                setIsOversized: setIsResizableFrameOversized,
                innerContentStyle: {
                  background: gradientValue !== null && gradientValue !== void 0 ? gradientValue : backgroundColor
                },
                children: areas.preview
              })
            })
          })]
        })]
      })
    })]
  });
}
//# sourceMappingURL=index.js.map