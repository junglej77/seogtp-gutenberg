/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';
import { ToggleControl, SelectControl } from '@wordpress/components';
import { useMemo, useCallback, Platform } from '@wordpress/element';
import { jsx as _jsx } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const options = [{
  value: 'auto',
  label: __('Auto')
}, {
  value: 'metadata',
  label: __('Metadata')
}, {
  value: 'none',
  label: _x('None', 'Preload value')
}];
const VideoSettings = ({
  setAttributes,
  attributes
}) => {
  const {
    autoplay,
    controls,
    loop,
    muted,
    playsInline,
    preload
  } = attributes;
  const autoPlayHelpText = __('Autoplay may cause usability issues for some users.');
  const getAutoplayHelp = Platform.select({
    web: useCallback(checked => {
      return checked ? autoPlayHelpText : null;
    }, []),
    native: autoPlayHelpText
  });
  const toggleFactory = useMemo(() => {
    const toggleAttribute = attribute => {
      return newValue => {
        setAttributes({
          [attribute]: newValue
        });
      };
    };
    return {
      autoplay: toggleAttribute('autoplay'),
      loop: toggleAttribute('loop'),
      muted: toggleAttribute('muted'),
      controls: toggleAttribute('controls'),
      playsInline: toggleAttribute('playsInline')
    };
  }, []);
  const onChangePreload = useCallback(value => {
    setAttributes({
      preload: value
    });
  }, []);
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [/*#__PURE__*/_jsx(ToggleControl, {
      __nextHasNoMarginBottom: true,
      label: __('Autoplay'),
      onChange: toggleFactory.autoplay,
      checked: !!autoplay,
      help: getAutoplayHelp
    }), /*#__PURE__*/_jsx(ToggleControl, {
      __nextHasNoMarginBottom: true,
      label: __('Loop'),
      onChange: toggleFactory.loop,
      checked: !!loop
    }), /*#__PURE__*/_jsx(ToggleControl, {
      __nextHasNoMarginBottom: true,
      label: __('Muted'),
      onChange: toggleFactory.muted,
      checked: !!muted
    }), /*#__PURE__*/_jsx(ToggleControl, {
      __nextHasNoMarginBottom: true,
      label: __('Playback controls'),
      onChange: toggleFactory.controls,
      checked: !!controls
    }), /*#__PURE__*/_jsx(ToggleControl, {
      __nextHasNoMarginBottom: true
      /* translators: Setting to play videos within the webpage on mobile browsers rather than opening in a fullscreen player. */,
      label: __('Play inline'),
      onChange: toggleFactory.playsInline,
      checked: !!playsInline,
      help: __('When enabled, videos will play directly within the webpage on mobile browsers, instead of opening in a fullscreen player.')
    }), /*#__PURE__*/_jsx(SelectControl, {
      __next40pxDefaultSize: true,
      __nextHasNoMarginBottom: true,
      label: __('Preload'),
      value: preload,
      onChange: onChangePreload,
      options: options,
      hideCancelButton: true
    })]
  });
};
export default VideoSettings;
//# sourceMappingURL=edit-common-settings.js.map