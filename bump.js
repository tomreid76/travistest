const CURRENT_VERSION = require('./package.json').version;
//const PREVIOUS_VERSION = require('child_process').execSync('git describe --abbrev=0', { encoding: 'utf8' }).trim();

/*if (PREVIOUS_VERSION === CURRENT_VERSION) {
  //autobump
  console.error('Auto bumping minor from ' + CURRENT_VERSION);
  process.exit(1);
} else {
  console.log('Manual bump here from ' + CURRENT_VERSION);
}*/

console.log('Is a pr:' + process.env.TRAVIS_PULL_REQUEST);
//git tag -a %build.number% -m "Version %build.number%"
//git push origin %sapphire-client-release-branch% --tags
