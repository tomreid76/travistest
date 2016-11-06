const cp = require('child_process');

const CURRENT_VERSION = 'v' + require('./package.json').version;
const PREVIOUS_VERSION = cp.execSync('git describe --abbrev=0', { encoding: 'utf8' }).trim();
const isPullRequest = process.env.TRAVIS_PULL_REQUEST;

if (isPullRequest) {
  console.log('Pull request build build run. Skipping tagging operation...');
} else {
  if (PREVIOUS_VERSION === CURRENT_VERSION) {
    //autobump
    cp.execSync('npm version patch');
    const NEW_VERSION = require('./package.json').version;
    console.error('Auto bumping minor from ' + CURRENT_VERSION + ' to ' + NEW_VERSION);
    //process.exit(1);
  } else {
    console.log('Manual bump here from ' + CURRENT_VERSION);
  }
}



/**/

//console.log('Is a pr:' + isPullRequest);
//git tag -a %build.number% -m "Version %build.number%"
//git push origin %sapphire-client-release-branch% --tags
