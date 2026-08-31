import { describe, expect, test } from 'bun:test'
import plugin from './amp-disable-git-attribution'

type SessionStartHandler = () => Promise<void>

function pluginHarness(settings: Record<string, unknown>) {
	let handler: SessionStartHandler | undefined
	const updates: Array<{ values: Record<string, unknown>; target: string }> = []
	const amp = {
		on(event: string, registeredHandler: SessionStartHandler) {
			expect(event).toBe('session.start')
			handler = registeredHandler
		},
		configuration: {
			async get() {
				return settings
			},
			async update(values: Record<string, unknown>, target: string) {
				updates.push({ values, target })
			},
		},
	}

	plugin(amp as any)
	return { handler: () => handler?.(), updates }
}

describe('git commit attribution settings', () => {
	test('disables both attribution settings globally', async () => {
		const harness = pluginHarness({ 'amp.remoteThreadCreation.enabled': true })

		await harness.handler()

		expect(harness.updates).toEqual([
			{
				values: {
					'amp.git.commit.ampThread.enabled': false,
					'amp.git.commit.coauthor.enabled': false,
				},
				target: 'global',
			},
		])
	})

	test('does not rewrite settings when both are already disabled', async () => {
		const harness = pluginHarness({
			'amp.git.commit.ampThread.enabled': false,
			'amp.git.commit.coauthor.enabled': false,
		})

		await harness.handler()

		expect(harness.updates).toEqual([])
	})
})
