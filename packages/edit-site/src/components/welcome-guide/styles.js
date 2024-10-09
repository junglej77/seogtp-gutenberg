/**
 * WordPress dependencies
 */
import { useDispatch, useSelect } from '@wordpress/data';
import { ExternalLink, Guide } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { store as preferencesStore } from '@wordpress/preferences';
import { privateApis as editorPrivateApis } from '@wordpress/editor';

/**
 * Internal dependencies
 */
import WelcomeGuideImage from './image';
import { unlock } from '../../lock-unlock';

const { interfaceStore } = unlock( editorPrivateApis );

export default function WelcomeGuideStyles() {
	const { toggle } = useDispatch( preferencesStore );

	const { isActive, isStylesOpen } = useSelect( ( select ) => {
		const sidebar =
			select( interfaceStore ).getActiveComplementaryArea( 'core' );

		return {
			isActive: !! select( preferencesStore ).get(
				'core/edit-site',
				'welcomeGuideStyles'
			),
			isStylesOpen: sidebar === 'edit-site/global-styles',
		};
	}, [] );

	if ( ! isActive || ! isStylesOpen ) {
		return null;
	}

	const welcomeLabel = __( '欢迎来到风格设置' );

	return (
		<Guide
			className="edit-site-welcome-guide guide-styles"
			contentLabel={ welcomeLabel }
			finishButtonText={ __( 'Get started' ) }
			onFinish={ () => toggle( 'core/edit-site', 'welcomeGuideStyles' ) }
			pages={ [
				{
					image: (
						<WelcomeGuideImage
							nonAnimatedSrc="https://s.w.org/images/block-editor/welcome-to-styles.svg?1"
							animatedSrc="https://s.w.org/images/block-editor/welcome-to-styles.gif?1"
						/>
					),
					content: (
						<>
							<h1 className="edit-site-welcome-guide__heading">
								{ welcomeLabel }
							</h1>
							<p className="edit-site-welcome-guide__text">
								{ __(
									'调整你的网站，或者给它一个全新的外观!要有创意——为你的按钮换一个新的调色板，或者选择一种新的字体怎么样?看看你能在这里做些什么。'
								) }
							</p>
						</>
					),
				},
				{
					image: (
						<WelcomeGuideImage
							nonAnimatedSrc="https://s.w.org/images/block-editor/set-the-design.svg?1"
							animatedSrc="https://s.w.org/images/block-editor/set-the-design.gif?1"
						/>
					),
					content: (
						<>
							<h1 className="edit-site-welcome-guide__heading">
								{ __( 'Set the design' ) }
							</h1>
							<p className="edit-site-welcome-guide__text">
								{ __(
									'You can customize your site as much as you like with different colors, typography, and layouts. Or if you prefer, just leave it up to your theme to handle!'
								) }
							</p>
						</>
					),
				},
				{
					image: (
						<WelcomeGuideImage
							nonAnimatedSrc="https://s.w.org/images/block-editor/personalize-blocks.svg?1"
							animatedSrc="https://s.w.org/images/block-editor/personalize-blocks.gif?1"
						/>
					),
					content: (
						<>
							<h1 className="edit-site-welcome-guide__heading">
								{ __( 'Personalize blocks' ) }
							</h1>
							<p className="edit-site-welcome-guide__text">
								{ __(
									'You can adjust your blocks to ensure a cohesive experience across your site — add your unique colors to a branded Button block, or adjust the Heading block to your preferred size.'
								) }
							</p>
						</>
					),
				},
				{
					image: (
						<WelcomeGuideImage
							nonAnimatedSrc="https://s.w.org/images/block-editor/welcome-documentation.svg"
							animatedSrc="https://s.w.org/images/block-editor/welcome-documentation.gif"
						/>
					),
					content: (
						<>
							<h1 className="edit-site-welcome-guide__heading">
								{ __( 'Learn more' ) }
							</h1>
							<p className="edit-site-welcome-guide__text">
								{ __(
									'New to block themes and styling your site?'
								) }{ ' ' }
								<ExternalLink
									href={ __(
										'https://wordpress.org/documentation/article/styles-overview/'
									) }
								>
									{ __(
										'Here’s a detailed guide to learn how to make the most of it.'
									) }
								</ExternalLink>
							</p>
						</>
					),
				},
			] }
		/>
	);
}
