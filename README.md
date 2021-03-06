# VS Code Ksh Debug
A ksh debugger GUI frontend based on awesome `kshdb` scripts (kshdb included in package).

# Overview
This is a SIMPLE kshdb debugger frontend. Useful for learning ksh shell usage and writing simple scripts.

Useful hint: shellcheck extension does a great job with finding common script errors before debugging.

## Usage
1. Download and install newest `ksh`: (https://build.opensuse.org/project/show/shells:ksh:new:latest)
1. Select **Debug -> Add Configuration** to add custom debug configuration (drop-down, path-input, etc...)
1. Select **Debug -> Start Debugging (F5)** to start debugging

See https://code.visualstudio.com/docs/editor/debugging for general usage.

## Sample features
- Debugging auto-configuration via `launch.json`

[<img src="https://raw.githubusercontent.com/rogalmic/vscode-ksh-debug/gif/images/ksh-debug-samp-launch-autoconfig.gif" width="400" style="filter: blur(1px); " title="Click to show in browser" />](https://raw.githubusercontent.com/rogalmic/vscode-ksh-debug/gif/images/ksh-debug-samp-launch-autoconfig.gif)

- Simple debugging in hello world application

[<img src="https://raw.githubusercontent.com/rogalmic/vscode-ksh-debug/gif/images/ksh-debug-samp-hello-world.gif" width="400" style="filter: blur(1px); " title="Click to show in browser"/>](https://raw.githubusercontent.com/rogalmic/vscode-ksh-debug/gif/images/ksh-debug-samp-hello-world.gif)

- Standard input handling via terminal

[<img src="https://raw.githubusercontent.com/rogalmic/vscode-ksh-debug/gif/images/ksh-debug-samp-stdin-usage.gif" width="400" style="filter: blur(1px); " title="Click to show in browser"/>](https://raw.githubusercontent.com/rogalmic/vscode-ksh-debug/gif/images/ksh-debug-samp-stdin-usage.gif)

- Pause support while script is running

[<img src="https://raw.githubusercontent.com/rogalmic/vscode-ksh-debug/gif/images/ksh-debug-samp-pause-support.gif" width="400" style="filter: blur(1px); " title="Click to show in browser"/>](https://raw.githubusercontent.com/rogalmic/vscode-ksh-debug/gif/images/ksh-debug-samp-pause-support.gif)

- Advanced "Watch" and "Debug console" usage

[<img src="https://raw.githubusercontent.com/rogalmic/vscode-ksh-debug/gif/images/ksh-debug-samp-watch-advanced.gif" width="400" style="filter: blur(1px); " title="Click to show in browser"/>](https://raw.githubusercontent.com/rogalmic/vscode-ksh-debug/gif/images/ksh-debug-samp-watch-advanced.gif)

- Conditional breakpoints usage

[<img src="https://raw.githubusercontent.com/rogalmic/vscode-ksh-debug/gif/images/ksh-debug-samp-conditional-breakpoints.gif" width="400" style="filter: blur(1px); " title="Click to show in browser"/>](https://raw.githubusercontent.com/rogalmic/vscode-ksh-debug/gif/images/ksh-debug-samp-conditional-breakpoints.gif)

For Windows users:
- Install [Windows Subsystem for Linux](https://en.wikipedia.org/wiki/Windows_Subsystem_for_Linux)
- Terminal has problems with spaces in paths when powershell is used, use [WSL shell](https://github.com/Microsoft/vscode/issues/22317) instead. For beta WSL please read [this](https://github.com/rogalmic/vscode-bash-debug/issues/93)

For macOS users:
- Read [here](https://github.com/rogalmic/vscode-bash-debug/wiki/macOS:-avoid-use-of--usr-local-bin-pkill) if your mac has `/usr/local/bin/pkill`.

## Dependencies
1. `ksh` version `93v- 2014-12-24` or later
2. `cat`, `mkfifo`, `rm`, `pkill`

## Limitations and known problems
* Use `terminalKind`@`launch.json` set to `integrated` or `external` for interactive scripts (using stdin)
* Currently debugger stops at first command
* `$0` variable shows path to kshdb
* Korn shell sometimes crashes
