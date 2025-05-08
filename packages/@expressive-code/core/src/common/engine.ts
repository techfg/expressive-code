import githubDark from 'shiki/themes/github-dark.mjs'
import githubLight from 'shiki/themes/github-light.mjs'
import { ExpressiveCodeTheme } from './theme'
import { ExpressiveCodeEngineCore, type ExpressiveCodeEngineConfig } from './engine-core'

export const defaultThemes = [new ExpressiveCodeTheme(githubDark), new ExpressiveCodeTheme(githubLight)]

/**
 * The Expressive Code engine is responsible for rendering code blocks to a
 * [Hypertext Abstract Syntax Tree (HAST)](https://github.com/syntax-tree/hast)
 * that can be serialized to HTML, as well as generating the required CSS styles
 * and JS modules.
 *
 * It also provides read-only access to all resolved configuration options
 * through its public properties.
 */
export class ExpressiveCodeEngine extends ExpressiveCodeEngineCore {
	constructor(config: ExpressiveCodeEngineConfig) {
		// Transfer deprecated `theme` option to `themes` without triggering the deprecation warning
		const deprecatedConfig: Omit<ExpressiveCodeEngineConfig, 'theme'> & { theme?: ExpressiveCodeTheme | undefined } = config
		if (deprecatedConfig.theme && !config.themes) {
			config.themes = Array.isArray(deprecatedConfig.theme) ? deprecatedConfig.theme : [deprecatedConfig.theme]
			delete deprecatedConfig.theme
		}
		super({
			...config,
			themes: Array.isArray(config.themes) ? config.themes : config.themes ? [config.themes] : defaultThemes,
		})
	}
}
