In addition to the details for issue, please provide us *Executables* information and *Debug output* unless you have confidence that they don't help us.

## Executables
Version of ksh-debug: (can be checked in: ctrl+shift+X or command+shift+X -> INSTALLED: Ksh Debug)

Output of following commands (on windows, execute them in Command Prompt or PowerShell):

```
where ksh
# if `code` not found on macOS, follow the instructions in:
# https://code.visualstudio.com/docs/setup/mac
code --version
ksh -c 'uname -a; for P in ksh kshdb cat mkfifo pkill; do echo ---; which -a $P; command $P --version; done'
```

## Debug output
Paste here outputs in DEBUG CONSOLE (ctrl+shift+D or command+shift+D) with `"showDebugOutput": true` and `"trace": true` in `launch.json`.
Your `launch.json` may looks like:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "kshdb",
            "request": "launch",
            "name": "Ksh Debug",
            "program": "${workspaceFolder}/src/foo.sh",
            "showDebugOutput": true,
            "trace": true
        }
    ]
}
```

## Details
Details goes here.
