const fs = require('fs');
const chokidar = require('chokidar');
const args = require('yargs').argv;


function require_argument(variable, name) {
  if (!variable) {
    throw new Error(name + ' required');
  }
}

const src = args.src;
const dest = args.dest;

require_argument(src, 'src');
require_argument(dest, 'dest');


function copyFile(path) {
  const file = path.substring(src.length);
  const newPath = dest + '/' + file;

  fs.copyFileSync(path, newPath);
  console.log(newPath, 'updated');
}

chokidar.watch(src)
  .on('add', copyFile)
  .on('change', copyFile);
  