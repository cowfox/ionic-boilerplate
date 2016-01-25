/**
 * @created Lei)Leo) SHI <foxshee@gmail.com>
 * @date 1/24/16
 */

/* ***************************************************************************
 * ### gulpfile.js ###
 *
 * Rather than manage one giant configuration file responsible for creating multiple tasks,
 * each task has been broken out into its own file in `./gulpfile/tasks/`.
 * Any files in that directory get automatically required below.
 *
 * To add a new task, simply add a new task file into the folder.
 *
 */

var requireDir = require('require-dir')

// Require all tasks in `./gulpfile/`, including sub-folders.
requireDir('./gulpfile', { recurse: true })