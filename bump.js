const cp = require('child_process');

const CURRENT_VERSION = `v${require('./package.json').version}`;
const PREVIOUS_VERSION = cp.execSync('git describe --abbrev=0', { encoding: 'utf8' }).trim();
const isPullRequest = process.env.TRAVIS_PULL_REQUEST && JSON.parse(process.env.TRAVIS_PULL_REQUEST);
const eventType = process.env.TRAVIS_EVENT_TYPE;

//cp.execSync(`git config --global user.email "foreverbuild@travis-ci.com"`);
//cp.execSync(`git config --global user.name "TravisCI"`);

/*
console.log('event type: ', eventType);
console.log('travis commit: ', process.env.TRAVIS_COMMIT);
console.log('travis commit range: ', process.env.TRAVIS_COMMIT_RANGE);
console.log('travis tag: ', process.env.TRAVIS_TAG);
*/

if (!isPullRequest) {
  if (PREVIOUS_VERSION === CURRENT_VERSION) {
    //autobump
    cp.exec('npm version patch -m \"Travis Autobump [skip ci]\"', { encoding: 'utf8' }, (error, stdout, stderr) => {
      if (error) {
        console.log('Something went wrong, aborting', stderr);
        process.exit(1);
      }
      const NEW_VERSION = stdout.trim();
      console.log(`Auto bumping patch from ${CURRENT_VERSION} to ${NEW_VERSION}`);
      cp.execSync(`git push origin master --tags`);
    });

    //process.exit(1);
  } else {
    console.log(`Manual bump here from ${PREVIOUS_VERSION} to ${CURRENT_VERSION}`);
    cp.execSync(`git tag -a ${CURRENT_VERSION} -m "Travis Autobump [skip ci]"`);
    cp.execSync(`git push origin master --tags`);
  }

} else {
  console.log('Pull request build run. Skipping tagging operation...');
}



/**/

//console.log('Is a pr:' + isPullRequest);
//git tag -a %build.number% -m "Version %build.number%"
//git push origin %sapphire-client-release-branch% --tags
