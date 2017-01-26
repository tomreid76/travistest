const cp = require('child_process');
console.log('AFTER SCRIPT RUNNING');
cp.execSync('travis_terminate 1');
