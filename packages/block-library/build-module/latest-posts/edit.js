/**
 * External dependencies
 */
import clsx from 'clsx';

/**
 * WordPress dependencies
 */
import { PanelBody, Placeholder, QueryControls, RadioControl, RangeControl, Spinner, ToggleControl, ToolbarGroup, __experimentalToggleGroupControl as ToggleGroupControl, __experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon } from '@wordpress/components';
import { __, _x, sprintf } from '@wordpress/i18n';
import { dateI18n, format, getSettings } from '@wordpress/date';
import { InspectorControls, BlockControls, __experimentalImageSizeControl as ImageSizeControl, useBlockProps, store as blockEditorStore } from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';
import { pin, list, grid, alignNone, positionLeft, positionCenter, positionRight } from '@wordpress/icons';
import { store as coreStore } from '@wordpress/core-data';
import { store as noticeStore } from '@wordpress/notices';
import { useInstanceId } from '@wordpress/compose';
import { createInterpolateElement } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { MIN_EXCERPT_LENGTH, MAX_EXCERPT_LENGTH, MAX_POSTS_COLUMNS } from './constants';

/**
 * Module Constants
 */
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment as _Fragment } from "react/jsx-runtime";
const CATEGORIES_LIST_QUERY = {
  per_page: -1,
  context: 'view'
};
const USERS_LIST_QUERY = {
  per_page: -1,
  has_published_posts: ['post'],
  context: 'view'
};
function getFeaturedImageDetails(post, size) {
  var _image$media_details$;
  const image = post._embedded?.['wp:featuredmedia']?.['0'];
  return {
    url: (_image$media_details$ = image?.media_details?.sizes?.[size]?.source_url) !== null && _image$media_details$ !== void 0 ? _image$media_details$ : image?.source_url,
    alt: image?.alt_text
  };
}
export default function LatestPostsEdit({
  attributes,
  setAttributes
}) {
  var _categoriesList$reduc;
  const instanceId = useInstanceId(LatestPostsEdit);
  const {
    postsToShow,
    order,
    orderBy,
    categories,
    selectedAuthor,
    displayFeaturedImage,
    displayPostContentRadio,
    displayPostContent,
    displayPostDate,
    displayAuthor,
    postLayout,
    columns,
    excerptLength,
    featuredImageAlign,
    featuredImageSizeSlug,
    featuredImageSizeWidth,
    featuredImageSizeHeight,
    addLinkToFeaturedImage
  } = attributes;
  const {
    imageSizes,
    latestPosts,
    defaultImageWidth,
    defaultImageHeight,
    categoriesList,
    authorList
  } = useSelect(select => {
    var _settings$imageDimens, _settings$imageDimens2;
    const {
      getEntityRecords,
      getUsers
    } = select(coreStore);
    const settings = select(blockEditorStore).getSettings();
    const catIds = categories && categories.length > 0 ? categories.map(cat => cat.id) : [];
    const latestPostsQuery = Object.fromEntries(Object.entries({
      categories: catIds,
      author: selectedAuthor,
      order,
      orderby: orderBy,
      per_page: postsToShow,
      _embed: 'wp:featuredmedia'
    }).filter(([, value]) => typeof value !== 'undefined'));
    return {
      defaultImageWidth: (_settings$imageDimens = settings.imageDimensions?.[featuredImageSizeSlug]?.width) !== null && _settings$imageDimens !== void 0 ? _settings$imageDimens : 0,
      defaultImageHeight: (_settings$imageDimens2 = settings.imageDimensions?.[featuredImageSizeSlug]?.height) !== null && _settings$imageDimens2 !== void 0 ? _settings$imageDimens2 : 0,
      imageSizes: settings.imageSizes,
      latestPosts: getEntityRecords('postType', 'post', latestPostsQuery),
      categoriesList: getEntityRecords('taxonomy', 'category', CATEGORIES_LIST_QUERY),
      authorList: getUsers(USERS_LIST_QUERY)
    };
  }, [featuredImageSizeSlug, postsToShow, order, orderBy, categories, selectedAuthor]);

  // If a user clicks to a link prevent redirection and show a warning.
  const {
    createWarningNotice,
    removeNotice
  } = useDispatch(noticeStore);
  let noticeId;
  const showRedirectionPreventedNotice = event => {
    event.preventDefault();
    // Remove previous warning if any, to show one at a time per block.
    removeNotice(noticeId);
    noticeId = `block-library/core/latest-posts/redirection-prevented/${instanceId}`;
    createWarningNotice(__('Links are disabled in the editor.'), {
      id: noticeId,
      type: 'snackbar'
    });
  };
  const imageSizeOptions = imageSizes.filter(({
    slug
  }) => slug !== 'full').map(({
    name,
    slug
  }) => ({
    value: slug,
    label: name
  }));
  const categorySuggestions = (_categoriesList$reduc = categoriesList?.reduce((accumulator, category) => ({
    ...accumulator,
    [category.name]: category
  }), {})) !== null && _categoriesList$reduc !== void 0 ? _categoriesList$reduc : {};
  const selectCategories = tokens => {
    const hasNoSuggestion = tokens.some(token => typeof token === 'string' && !categorySuggestions[token]);
    if (hasNoSuggestion) {
      return;
    }
    // Categories that are already will be objects, while new additions will be strings (the name).
    // allCategories nomalizes the array so that they are all objects.
    const allCategories = tokens.map(token => {
      return typeof token === 'string' ? categorySuggestions[token] : token;
    });
    // We do nothing if the category is not selected
    // from suggestions.
    if (allCategories.includes(null)) {
      return false;
    }
    setAttributes({
      categories: allCategories
    });
  };
  const imageAlignmentOptions = [{
    value: 'none',
    icon: alignNone,
    label: __('None')
  }, {
    value: 'left',
    icon: positionLeft,
    label: __('Left')
  }, {
    value: 'center',
    icon: positionCenter,
    label: __('Center')
  }, {
    value: 'right',
    icon: positionRight,
    label: __('Right')
  }];
  const hasPosts = !!latestPosts?.length;
  const inspectorControls = /*#__PURE__*/_jsxs(InspectorControls, {
    children: [/*#__PURE__*/_jsxs(PanelBody, {
      title: __('Post content'),
      children: [/*#__PURE__*/_jsx(ToggleControl, {
        __nextHasNoMarginBottom: true,
        label: __('Post content'),
        checked: displayPostContent,
        onChange: value => setAttributes({
          displayPostContent: value
        })
      }), displayPostContent && /*#__PURE__*/_jsx(RadioControl, {
        className: "wp-block-latest-posts__post-content-radio",
        label: __('Show:'),
        selected: displayPostContentRadio,
        options: [{
          label: __('Excerpt'),
          value: 'excerpt'
        }, {
          label: __('Full post'),
          value: 'full_post'
        }],
        onChange: value => setAttributes({
          displayPostContentRadio: value
        })
      }), displayPostContent && displayPostContentRadio === 'excerpt' && /*#__PURE__*/_jsx(RangeControl, {
        __nextHasNoMarginBottom: true,
        __next40pxDefaultSize: true,
        label: __('Max number of words'),
        value: excerptLength,
        onChange: value => setAttributes({
          excerptLength: value
        }),
        min: MIN_EXCERPT_LENGTH,
        max: MAX_EXCERPT_LENGTH
      })]
    }), /*#__PURE__*/_jsxs(PanelBody, {
      title: __('Post meta'),
      children: [/*#__PURE__*/_jsx(ToggleControl, {
        __nextHasNoMarginBottom: true,
        label: __('Display author name'),
        checked: displayAuthor,
        onChange: value => setAttributes({
          displayAuthor: value
        })
      }), /*#__PURE__*/_jsx(ToggleControl, {
        __nextHasNoMarginBottom: true,
        label: __('Display post date'),
        checked: displayPostDate,
        onChange: value => setAttributes({
          displayPostDate: value
        })
      })]
    }), /*#__PURE__*/_jsxs(PanelBody, {
      title: __('Featured image'),
      children: [/*#__PURE__*/_jsx(ToggleControl, {
        __nextHasNoMarginBottom: true,
        label: __('Display featured image'),
        checked: displayFeaturedImage,
        onChange: value => setAttributes({
          displayFeaturedImage: value
        })
      }), displayFeaturedImage && /*#__PURE__*/_jsxs(_Fragment, {
        children: [/*#__PURE__*/_jsx(ImageSizeControl, {
          onChange: value => {
            const newAttrs = {};
            if (value.hasOwnProperty('width')) {
              newAttrs.featuredImageSizeWidth = value.width;
            }
            if (value.hasOwnProperty('height')) {
              newAttrs.featuredImageSizeHeight = value.height;
            }
            setAttributes(newAttrs);
          },
          slug: featuredImageSizeSlug,
          width: featuredImageSizeWidth,
          height: featuredImageSizeHeight,
          imageWidth: defaultImageWidth,
          imageHeight: defaultImageHeight,
          imageSizeOptions: imageSizeOptions,
          imageSizeHelp: __('Select the size of the source image.'),
          onChangeImage: value => setAttributes({
            featuredImageSizeSlug: value,
            featuredImageSizeWidth: undefined,
            featuredImageSizeHeight: undefined
          })
        }), /*#__PURE__*/_jsx(ToggleGroupControl, {
          className: "editor-latest-posts-image-alignment-control",
          __nextHasNoMarginBottom: true,
          __next40pxDefaultSize: true,
          label: __('Image alignment'),
          value: featuredImageAlign || 'none',
          onChange: value => setAttributes({
            featuredImageAlign: value !== 'none' ? value : undefined
          }),
          children: imageAlignmentOptions.map(({
            value,
            icon,
            label
          }) => {
            return /*#__PURE__*/_jsx(ToggleGroupControlOptionIcon, {
              value: value,
              icon: icon,
              label: label
            }, value);
          })
        }), /*#__PURE__*/_jsx(ToggleControl, {
          __nextHasNoMarginBottom: true,
          label: __('Add link to featured image'),
          checked: addLinkToFeaturedImage,
          onChange: value => setAttributes({
            addLinkToFeaturedImage: value
          })
        })]
      })]
    }), /*#__PURE__*/_jsxs(PanelBody, {
      title: __('Sorting and filtering'),
      children: [/*#__PURE__*/_jsx(QueryControls, {
        order,
        orderBy,
        numberOfItems: postsToShow,
        onOrderChange: value => setAttributes({
          order: value
        }),
        onOrderByChange: value => setAttributes({
          orderBy: value
        }),
        onNumberOfItemsChange: value => setAttributes({
          postsToShow: value
        }),
        categorySuggestions: categorySuggestions,
        onCategoryChange: selectCategories,
        selectedCategories: categories,
        onAuthorChange: value => setAttributes({
          selectedAuthor: '' !== value ? Number(value) : undefined
        }),
        authorList: authorList !== null && authorList !== void 0 ? authorList : [],
        selectedAuthorId: selectedAuthor
      }), postLayout === 'grid' && /*#__PURE__*/_jsx(RangeControl, {
        __nextHasNoMarginBottom: true,
        __next40pxDefaultSize: true,
        label: __('Columns'),
        value: columns,
        onChange: value => setAttributes({
          columns: value
        }),
        min: 2,
        max: !hasPosts ? MAX_POSTS_COLUMNS : Math.min(MAX_POSTS_COLUMNS, latestPosts.length),
        required: true
      })]
    })]
  });
  const blockProps = useBlockProps({
    className: clsx({
      'wp-block-latest-posts__list': true,
      'is-grid': postLayout === 'grid',
      'has-dates': displayPostDate,
      'has-author': displayAuthor,
      [`columns-${columns}`]: postLayout === 'grid'
    })
  });
  if (!hasPosts) {
    return /*#__PURE__*/_jsxs("div", {
      ...blockProps,
      children: [inspectorControls, /*#__PURE__*/_jsx(Placeholder, {
        icon: pin,
        label: __('Latest Posts'),
        children: !Array.isArray(latestPosts) ? /*#__PURE__*/_jsx(Spinner, {}) : __('No posts found.')
      })]
    });
  }

  // Removing posts from display should be instant.
  const displayPosts = latestPosts.length > postsToShow ? latestPosts.slice(0, postsToShow) : latestPosts;
  const layoutControls = [{
    icon: list,
    title: _x('List view', 'Latest posts block display setting'),
    onClick: () => setAttributes({
      postLayout: 'list'
    }),
    isActive: postLayout === 'list'
  }, {
    icon: grid,
    title: _x('Grid view', 'Latest posts block display setting'),
    onClick: () => setAttributes({
      postLayout: 'grid'
    }),
    isActive: postLayout === 'grid'
  }];
  const dateFormat = getSettings().formats.date;
  return /*#__PURE__*/_jsxs(_Fragment, {
    children: [inspectorControls, /*#__PURE__*/_jsx(BlockControls, {
      children: /*#__PURE__*/_jsx(ToolbarGroup, {
        controls: layoutControls
      })
    }), /*#__PURE__*/_jsx("ul", {
      ...blockProps,
      children: displayPosts.map(post => {
        const titleTrimmed = post.title.rendered.trim();
        let excerpt = post.excerpt.rendered;
        const currentAuthor = authorList?.find(author => author.id === post.author);
        const excerptElement = document.createElement('div');
        excerptElement.innerHTML = excerpt;
        excerpt = excerptElement.textContent || excerptElement.innerText || '';
        const {
          url: imageSourceUrl,
          alt: featuredImageAlt
        } = getFeaturedImageDetails(post, featuredImageSizeSlug);
        const imageClasses = clsx({
          'wp-block-latest-posts__featured-image': true,
          [`align${featuredImageAlign}`]: !!featuredImageAlign
        });
        const renderFeaturedImage = displayFeaturedImage && imageSourceUrl;
        const featuredImage = renderFeaturedImage && /*#__PURE__*/_jsx("img", {
          src: imageSourceUrl,
          alt: featuredImageAlt,
          style: {
            maxWidth: featuredImageSizeWidth,
            maxHeight: featuredImageSizeHeight
          }
        });
        const needsReadMore = excerptLength < excerpt.trim().split(' ').length && post.excerpt.raw === '';
        const postExcerpt = needsReadMore ? /*#__PURE__*/_jsxs(_Fragment, {
          children: [excerpt.trim().split(' ', excerptLength).join(' '), createInterpolateElement(sprintf( /* translators: 1: Hidden accessibility text: Post title */
          __('… <a>Read more<span>: %1$s</span></a>'), titleTrimmed || __('(no title)')), {
            a:
            /*#__PURE__*/
            // eslint-disable-next-line jsx-a11y/anchor-has-content
            _jsx("a", {
              className: "wp-block-latest-posts__read-more",
              href: post.link,
              rel: "noopener noreferrer",
              onClick: showRedirectionPreventedNotice
            }),
            span: /*#__PURE__*/_jsx("span", {
              className: "screen-reader-text"
            })
          })]
        }) : excerpt;
        return /*#__PURE__*/_jsxs("li", {
          children: [renderFeaturedImage && /*#__PURE__*/_jsx("div", {
            className: imageClasses,
            children: addLinkToFeaturedImage ? /*#__PURE__*/_jsx("a", {
              href: post.link,
              rel: "noreferrer noopener",
              onClick: showRedirectionPreventedNotice,
              children: featuredImage
            }) : featuredImage
          }), /*#__PURE__*/_jsx("a", {
            className: "wp-block-latest-posts__post-title",
            href: post.link,
            rel: "noreferrer noopener",
            dangerouslySetInnerHTML: !!titleTrimmed ? {
              __html: titleTrimmed
            } : undefined,
            onClick: showRedirectionPreventedNotice,
            children: !titleTrimmed ? __('(no title)') : null
          }), displayAuthor && currentAuthor && /*#__PURE__*/_jsx("div", {
            className: "wp-block-latest-posts__post-author",
            children: sprintf( /* translators: byline. %s: current author. */
            __('by %s'), currentAuthor.name)
          }), displayPostDate && post.date_gmt && /*#__PURE__*/_jsx("time", {
            dateTime: format('c', post.date_gmt),
            className: "wp-block-latest-posts__post-date",
            children: dateI18n(dateFormat, post.date_gmt)
          }), displayPostContent && displayPostContentRadio === 'excerpt' && /*#__PURE__*/_jsx("div", {
            className: "wp-block-latest-posts__post-excerpt",
            children: postExcerpt
          }), displayPostContent && displayPostContentRadio === 'full_post' && /*#__PURE__*/_jsx("div", {
            className: "wp-block-latest-posts__post-full-content",
            dangerouslySetInnerHTML: {
              __html: post.content.raw.trim()
            }
          })]
        }, post.id);
      })
    })]
  });
}
//# sourceMappingURL=edit.js.map