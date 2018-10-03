# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="0.1.0"></a>
# 0.1.0 (2018-10-03)


### Bug Fixes

* Add signal handler ([c69078b](https://github.com/rogalmic/vscode-ksh-debug/commit/c69078b))
* Cleaner IFS handling ([ac2ec62](https://github.com/rogalmic/vscode-ksh-debug/commit/ac2ec62))
* Fix breakpoint setting for newest bashdb ([5390d7f](https://github.com/rogalmic/vscode-ksh-debug/commit/5390d7f))
* Fix crash when debugging inaccessible source file ([af9c3d0](https://github.com/rogalmic/vscode-ksh-debug/commit/af9c3d0))
* Fix file opening second time on debugger break ([938d75f](https://github.com/rogalmic/vscode-ksh-debug/commit/938d75f))
* Fix for breakpoints handling ([39446cf](https://github.com/rogalmic/vscode-ksh-debug/commit/39446cf))
* Fix for handling whitespace in source path, requires bashdb fix in place ([f811b57](https://github.com/rogalmic/vscode-ksh-debug/commit/f811b57))
* Fix for tty, tty_in handling in kshdb ([b9c6ccb](https://github.com/rogalmic/vscode-ksh-debug/commit/b9c6ccb))
* Fix for unnecessary messages when checking breakpoint conditions ([620a264](https://github.com/rogalmic/vscode-ksh-debug/commit/620a264))
* Fix relative source path recognition during debugger break ([07690c5](https://github.com/rogalmic/vscode-ksh-debug/commit/07690c5))
* fixed error when `cwd` contains space characters ([1a2a9b3](https://github.com/rogalmic/vscode-ksh-debug/commit/1a2a9b3))
* Handle relative path in debugger break ([3ce9ee4](https://github.com/rogalmic/vscode-ksh-debug/commit/3ce9ee4))
* Handle space characters in launch.json args array ([850ce87](https://github.com/rogalmic/vscode-ksh-debug/commit/850ce87))
* Proper output to debug console vs terminal (dirty fix) ([6241c7c](https://github.com/rogalmic/vscode-ksh-debug/commit/6241c7c))
* Use defined bash path when stopping debug process ([313bcd6](https://github.com/rogalmic/vscode-ksh-debug/commit/313bcd6))
* Use defined bashPath in terminal ([0626d7e](https://github.com/rogalmic/vscode-ksh-debug/commit/0626d7e))


### Features

* **deploy:** automated changelog generation ([9ea28cb](https://github.com/rogalmic/vscode-ksh-debug/commit/9ea28cb))
* **windows:** Utilize wsl.exe instead of deprecated bash.exe ([3bbc0e8](https://github.com/rogalmic/vscode-ksh-debug/commit/3bbc0e8))
* Allow for conditional breakpoints ([28586a8](https://github.com/rogalmic/vscode-ksh-debug/commit/28586a8))
* Include bashdb scripts to extension package ("out of the box" usage) ([e479308](https://github.com/rogalmic/vscode-ksh-debug/commit/e479308))
* Initial Ksh Debug commit ([f0a6b7f](https://github.com/rogalmic/vscode-ksh-debug/commit/f0a6b7f))
* Start debugged scripts in terminal to allow stdin input ([b1c5a19](https://github.com/rogalmic/vscode-ksh-debug/commit/b1c5a19))
* Support for bash version 5.x ([2e2d7a8](https://github.com/rogalmic/vscode-ksh-debug/commit/2e2d7a8))
