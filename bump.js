const CURRENT_VERSION = require('./package.json').version;
const PREVIOUS_VERSION = require('child_process').execSync('git describe --abbrev=0', { encoding: 'utf8' }).trim();

if (PREVIOUS_VERSION === CURRENT_VERSION) {
  //autobump
  console.error('You need to bump the package.json version! Build failing');
  process.exit(1);
} else {
  console.log(`##teamcity[buildNumber '${CURRENT_VERSION}']`);
}
//git tag -a %build.number% -m "Version %build.number%"
//git push origin %sapphire-client-release-branch% --tags
