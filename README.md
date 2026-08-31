# Amp Disable Git Attribution

An [Amp](https://ampcode.com) plugin that disables both forms of Amp attribution in Git commits:

```json
{
  "amp.git.commit.ampThread.enabled": false,
  "amp.git.commit.coauthor.enabled": false
}
```

The plugin applies these values to Amp's user-level settings when a thread session starts. It does not change the Git author, committer, signing configuration, commit message, or any unrelated Amp setting.

## Install everywhere, including Orbs

Personal Plugins are available everywhere you use Amp. Open [Puck](https://ampcode.com/docs/puck) with `Ctrl+/` on ampcode.com, or select `puck: open` from the Amp command palette. Then send:

```text
Install https://github.com/lATAl/amp-disable-git-attribution as a Personal Plugin named amp-disable-git-attribution. Ask before pushing the Personal Plugins repository, then reload the plugins.
```

The plugin automatically applies the settings in new local sessions and Orbs. Existing sessions may need a plugin reload or restart.

## Local-only alternative

You do not need the plugin for one machine. Run `amp config edit` and add the two settings shown above.

## Verify

Start or reopen an Amp thread, then check the user settings file:

```bash
cat "${XDG_CONFIG_HOME:-$HOME/.config}/amp/settings.json"
```

Both settings should be `false`. If you installed the Personal Plugin, confirm that it loaded:

```bash
amp plugins list
```

## Remove

Open Puck and send:

```text
Remove amp-disable-git-attribution from my Personal Plugins. Ask before pushing the Personal Plugins repository, then reload the plugins.
```

Removing the plugin does not restore the settings. Run `amp config edit` and set either value to `true` if you want to enable that attribution again.

## Security

The plugin only reads and updates the two Amp user settings shown above. It does not execute shell commands, read repository contents, make network requests, or send data anywhere.

## Development

Requires [Bun](https://bun.sh) to run the tests:

```bash
bun test amp-disable-git-attribution.test.ts
```

## License

MIT
