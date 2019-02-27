import { spawnKshScriptSync } from './spawnKsh';

enum validatePathResult {
	success = 0,
	notExistCwd,
	notFoundKsh,
	notFoundKshdb,
	notFoundCat,
	notFoundMkfifo,
	notFoundPkill,
	timeout,
	cannotChmod,
	unsupportedKshVersion,
	unknown,
}

/**
 * @example
 * _validatePath("./", "ksh", "type", "type", "type", "type");
 * // => validatePathResult.success
 *
 * @example
 * _validatePath("non-exist-directory", "ksh", "type", "type", "type", "type");
 * // => validatePathResult.notExistCwd
 *
 * @example
 * _validatePath("./", "invalid-ksh-path", "type", "type", "type", "type");
 * // => validatePathResult.notFoundKsh
 *
 * @example
 * _validatePath("./", "ksh", "invalid-kshdb-path", "type", "type", "type");
 * // => validatePathResult.notFoundKshdb
 *
 * @example
 * _validatePath("./", "ksh", "type", "invalid-cat-path", "type", "type");
 * // => validatePathResult.notFoundCat
 *
 * @example
 * _validatePath("./", "ksh", "type", "type", "invalid-mkfifo-path", "type");
 * // => validatePathResult.notFoundMkfifo
 *
 * @example
 * _validatePath("./", "ksh", "type", "type", "type", "invalid-pkill-path");
 * // => validatePathResult.notFoundPkill
 *
 * @example
 * _validatePath("./", "ksh", "type", "type", "type", "invalid-pkill-path");
 * // => validatePathResult.notFoundPkill
 *
 * @example
 * _validatePath("invalid-path", "invalid-path", "invalid-path", "invalid-path", "invalid-path", "invalid-path");
 * // => validatePathResult.notFoundKsh
 *
 * @example
 * _validatePath("./", "ksh", "", "", "", "", 1);
 * // => validatePathResult.timeout
 */
function _validatePath(cwd: string,
	pathKsh: string, pathKshdb: string, pathCat: string, pathMkfifo: string, pathPkill: string, spawnTimeout: number = 5000): [validatePathResult, string] {

	const vpr = validatePathResult;

	const proc = spawnKshScriptSync(
		((pathKshdb.indexOf("kshdb_dir") > 0) ? `chmod +x "${pathKshdb}" || exit ${vpr.cannotChmod};` : ``) +
		`type "${pathKshdb}" || exit ${vpr.notFoundKshdb};` +
		`type "${pathCat}" || exit ${vpr.notFoundCat};` +
		`type "${pathMkfifo}" || exit ${vpr.notFoundMkfifo};` +
		`type "${pathPkill}" || exit ${vpr.notFoundPkill};` +
		`test -d "${cwd}" || exit ${vpr.notExistCwd};` , pathKsh, spawnTimeout);

	if (proc.error !== undefined) {
		// @ts-ignore Property 'code' does not exist on type 'Error'.
		if (proc.error.code === "ENOENT") {
			return [vpr.notFoundKsh, ""];
		}
		// @ts-ignore Property 'code' does not exist on type 'Error'.
		if (proc.error.code === "ETIMEDOUT") {
			return [vpr.timeout, ""];
		}
		return [vpr.unknown, ""];
	}

	const errorString = proc.stderr.toString();

	return [<validatePathResult>proc.status, errorString];
}

/**
 * @returns "" on success, non-empty error message on failure.
 * @example
 * validatePath("./", "ksh", "type", "type", "type", "type");
 * // => ""
 * @example
 * validatePath("non-exist-directory", "ksh", "type", "type", "type", "type");
 * // => "Error: cwd (non-exist-directory) does not exist."
 */
export function validatePath(cwd: string,
	pathKsh: string, pathKshdb: string, pathCat: string, pathMkfifo: string, pathPkill: string): string {

	const rc = _validatePath(cwd, pathKsh, pathKshdb, pathCat, pathMkfifo, pathPkill);

	const askReport = `If it is reproducible, please report it to https://github.com/rogalmic/vscode-ksh-debug/issues.`;

	const stderrContent = `\n\n${rc["1"]}`;

	switch (rc["0"]) {
		case validatePathResult.success: {
			return ``;
		}
		case validatePathResult.notExistCwd: {
			return `Error: cwd (${cwd}) does not exist.` + stderrContent;
		}
		case validatePathResult.notFoundKsh: {
			return `Error: ksh not found. (pathKsh: ${pathKsh})` + stderrContent;
		}
		case validatePathResult.notFoundKshdb: {
			return `Error: kshdb not found. (pathKshdb: ${pathKshdb})` + stderrContent;
		}
		case validatePathResult.notFoundCat: {
			return `Error: cat not found. (pathCat: ${pathCat})` + stderrContent;
		}
		case validatePathResult.notFoundMkfifo: {
			return `Error: mkfifo not found. (pathMkfifo: ${pathMkfifo})` + stderrContent;
		}
		case validatePathResult.notFoundPkill: {
			return `Error: pkill not found. (pathPkill: ${pathPkill})` + stderrContent;
		}
		case validatePathResult.timeout: {
			return `Error: BUG: timeout while validating environment. ` + askReport  + stderrContent;
		}
		case validatePathResult.cannotChmod: {
			return `Error: Cannot chmod +x internal kshdb copy.` + stderrContent;
		}
		case validatePathResult.unsupportedKshVersion: {
			return `Error: Only ksh versions 4.* are supported.` + stderrContent;
		}
		case validatePathResult.unknown: {
			return `Error: BUG: unknown error ocurred while validating environment. ` + askReport + stderrContent;
		}
	}

	return `Error: BUG: reached to unreachable code while validating environment (code ${rc}). ` + askReport + stderrContent;
}

