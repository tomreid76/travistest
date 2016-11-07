const cp = require('child_process');
console.log(process.argv[0]);
const CURRENT_VERSION = `v${require('../package.json').version}`;
const PREVIOUS_VERSION = cp.execSync('git describe --abbrev=0', { encoding: 'utf8' }).trim();
const isPullRequest = process.env.TRAVIS_PULL_REQUEST && JSON.parse(process.env.TRAVIS_PULL_REQUEST);
const isTravis = process.env.TRAVIS && JSON.parse(process.env.TRAVIS);

/*/!*make sure this is being run on travis. If so, set git config accordingly.*!/
if (isTravis) {
  console.log('Setting git username and email to environment...');
  cp.execSync(`git config --global user.email "foreverbuild@travis-ci.com"`);
  cp.execSync(`git config --global user.name "TravisCI"`);
} else {
  console.log('ERROR: This script is intended to be run on TravisCI only.');
  process.exit(1);
}*/


/*if not a PR. attempt bump and tag*/
if (!isPullRequest) {

  /*package file version is equal to the last git tag version, attempt autobump of patch*/
  if (PREVIOUS_VERSION === CURRENT_VERSION) {
    console.log('No version set, attempting autobump of patch...');
    cp.exec('npm version patch -m \"Travis Autobump [skip ci]\"', { encoding: 'utf8' }, (error, stdout, stderr) => {
      if (error) {
        console.log('Something went wrong while autobumping, aborting', stderr);
        process.exit(1);
      }
      const NEW_VERSION = stdout.trim();
      console.log(`Auto bumping patch from ${CURRENT_VERSION} to ${NEW_VERSION}`);
      cp.execSync(`git push origin master --tags`);
      console.log('Bump successful. New version tag pushed to master.');
    });

  /*package version has been update, attempt tag only.*/
  } else {
    console.log(`Manual bump here from ${PREVIOUS_VERSION} to ${CURRENT_VERSION}`);
    cp.execSync(`git tag -a ${CURRENT_VERSION} -m "Travis Autobump [skip ci]"`);
    cp.execSync(`git push origin master --tags`);
    console.log('Bump successful. New version tag pushed to master.');
  }

/*this is a PR, do nothing*/
} else {
  console.log('Pull request build run. Skipping tagging operation...');
}

