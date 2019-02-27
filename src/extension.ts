import * as vscode from 'vscode';
import { WorkspaceFolder, DebugConfiguration, ProviderResult, CancellationToken } from 'vscode';
import { expandPath, getWSLPath } from './handlePath';
import { normalize, join } from 'path';
import * as which from 'npm-which';

export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(vscode.commands.registerCommand('extension.ksh-debug.getProgramName', _config => {
		// Invoked if any property in client's launch.json has ${command:AskForScriptName} (mapped to getProgramName
		// in package.json) in its value.
		return vscode.window.showInputBox({
			placeHolder: "Type absolute path to ksh script.",
			value: (process.platform === "win32") ? "{workspaceFolder}\\path\\to\\script.sh" : "{workspaceFolder}/path/to/script.sh"
		}).then(v => expandPath(v, vscode.workspace.rootPath));
	}));

	context.subscriptions.push(vscode.commands.registerCommand('extension.ksh-debug.selectProgramName', _config => {
		// Invoked if any property in client's launch.json has ${command:SelectScriptName} (mapped to selectProgramName
		// in package.json) in its value.
		return vscode.workspace.findFiles("**/*.sh", "").then((uris) => {
			const list = new Array<string>();
			for (let i = 0; i < uris.length; i++) {
				list.push(uris[i].fsPath);
			}
			return vscode.window.showQuickPick(list).then((result) => {
				if (!result) {
					return undefined; // canceled, abort launch
				}
				return result;
			}).then(v => expandPath(v, vscode.workspace.rootPath));
		});
	}));

	context.subscriptions.push(vscode.debug.registerDebugConfigurationProvider('kshdb', new KshConfigurationProvider()));
}

export function deactivate() {
	// nothing to do
}

class KshConfigurationProvider implements vscode.DebugConfigurationProvider {
	/**
	 * Check configuration just before a debug session is being launched.
	 */
	resolveDebugConfiguration(folder: WorkspaceFolder | undefined, config: DebugConfiguration, _token?: CancellationToken): ProviderResult<DebugConfiguration> {
		if (!config.type && !config.request && !config.name) {
			// If launch.json is missing or empty, abort launch and create launch.json with "initialConfigurations"
			return undefined;
		}

		if (!folder) {
			let msg = "Unable to determine workspace folder.";
			return vscode.window.showErrorMessage(msg).then(_ => { return undefined; });
		}

		// Else launch.json exists
		if (!config.type || !config.name) {
			let msg = "BUG in Ksh Debug: reached to unreachable code.";
			msg += "\nIf it is reproducible, please report this bug on: https://github.com/rogalmic/vscode-ksh-debug/issues";
			msg += "\nYou can avoid this bug by setting \"type\" and \"name\" attributes in launch.json.";
			return vscode.window.showErrorMessage(msg).then(_ => { return undefined; });
		}
		if (!config.request) {
			let msg = "Please set \"request\" attribute to \"launch\".";
			return vscode.window.showErrorMessage(msg).then(_ => { return undefined; });
		}

		// Abort launch if any deprecated argument is included
		if (config.kshDbPath) {
			return vscode.window.showErrorMessage("`kshDbPath` is deprecated. Use `pathKshdb` instead.").then(_ => { return undefined; });
		}
		if (config.kshPath) {
			return vscode.window.showErrorMessage("`kshPath` is deprecated. Use `pathKsh` instead.").then(_ => { return undefined; });
		}
		if (config.commandLineArguments) {
			return vscode.window.showErrorMessage("`commandLineArguments` is deprecated. Use `args` instead.").then(_ => { return undefined; });
		}
		if (config.scriptPath) {
			return vscode.window.showErrorMessage("`scriptPath` is deprecated. Use `program` instead.").then(_ => { return undefined; });
		}

		// Check "required" attributes (defined in package.json) are included
		if (!config.program) {
			return vscode.window.showErrorMessage("Please specify \"program\" in launch.json.").then(_ => { return undefined; });
		}

		// Fill non-"required" attributes with default values to prevent kshdb (or other programs) from panic
		if (!config.args) { config.args = []; }
		if (!config.env) { config.env = {}; }
		if (!config.cwd) { config.cwd = folder.uri.fsPath; }
		if (!config.pathKsh) {
			config.pathKsh = "ksh";
		}
		if (!config.pathKshdb) {
			if (process.platform === "win32") {
				config.pathKshdb = getWSLPath(normalize(join(__dirname, "..", "kshdb_dir", "kshdb")));
			}
			else {
				config.pathKshdb = normalize(join(__dirname, "..", "kshdb_dir", "kshdb"));
			}
		}
		if (!config.pathKshdbLib) {
			if (process.platform === "win32") {
				config.pathKshdbLib = getWSLPath(normalize(join(__dirname, "..", "kshdb_dir")));
			}
			else {
				config.pathKshdbLib = normalize(join(__dirname, "..", "kshdb_dir"));
			}
		}

		if (!config.pathCat) { config.pathCat = "cat"; }
		if (!config.pathMkfifo) { config.pathMkfifo = "mkfifo"; }
		if (!config.pathPkill) {

			if ( process.platform === "darwin" ) {
				const pathPkill = which(__dirname).sync('pkill');
				if (pathPkill === "/usr/local/bin/pkill") {
					vscode.window.showInformationMessage(`Using /usr/bin/pkill instead of /usr/local/bin/pkill`);
					config.pathPkill = "/usr/bin/pkill";
				}
				else {
					config.pathPkill = "pkill";
				}
			}
			else {
				config.pathPkill = "pkill";
			}
		}

		// These variables can be undefined, as indicated in `?` (optional type) in kshDebug.ts:LaunchRequestArguments
		// - config.showDebugOutput
		// - config.trace
		// - config.terminalKind

		return config;
	}
}
