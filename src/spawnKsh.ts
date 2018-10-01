import { ChildProcess, SpawnSyncReturns, spawnSync, spawn } from 'child_process';
import { getWSLLauncherPath } from './handlePath';

export function spawnKshScript(scriptCode: string, pathKsh: string, outputHandler?: (output: string) => void): ChildProcess{
	const currentShell  = (process.platform === "win32") ? getWSLLauncherPath(false) : pathKsh;
	const optionalKshPathArgument = (currentShell !== pathKsh) ? pathKsh : "";

	let spawnedProcess = spawn(currentShell, [optionalKshPathArgument, "-c", scriptCode].filter(arg => arg !== ""), { stdio: ["pipe", "pipe", "pipe"], shell: false});

	if (outputHandler) {
		spawnedProcess.on("error", (error) => {
			outputHandler(`${error}`);
		});

		spawnedProcess.stderr.on("data", (data) => {
			outputHandler(`${data}`);
		});

		spawnedProcess.stdout.on("data", (data) => {
			outputHandler(`${data}`);
		});
	}

	return spawnedProcess;
}

export function spawnKshScriptSync(scriptCode: string, pathKsh: string, spawnTimeout: number): SpawnSyncReturns<Buffer>{
	const currentShell  = (process.platform === "win32") ? getWSLLauncherPath(false) : pathKsh;
	const optionalKshPathArgument = (currentShell !== pathKsh) ? pathKsh : "";

	return spawnSync(currentShell, [optionalKshPathArgument, "-c", scriptCode].filter(arg => arg !== ""), { timeout: spawnTimeout, shell: false });
}