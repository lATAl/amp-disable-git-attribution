import type { PluginAPI } from '@ampcode/plugin'

export const description =
	'Disables Amp thread and co-author attribution in Git commits everywhere the plugin loads, including Amp Orbs.'

const gitCommitSettings = {
	'amp.git.commit.ampThread.enabled': false,
	'amp.git.commit.coauthor.enabled': false,
}

export default function (amp: PluginAPI) {
	amp.on('session.start', async () => {
		const settings = await amp.configuration.get()
		if (
			settings['amp.git.commit.ampThread.enabled'] === false &&
			settings['amp.git.commit.coauthor.enabled'] === false
		) {
			return
		}

		await amp.configuration.update(gitCommitSettings, 'global')
	})
}
