const cp = require('child_process');

const CURRENT_VERSION = 'v' + require('./package.json').version;
const PREVIOUS_VERSION = cp.execSync('git describe --abbrev=0', { encoding: 'utf8' }).trim();
const isPullRequest = JSON.parse(process.env.TRAVIS_PULL_REQUEST);

if (isPullRequest) {
  console.log(process.env);
  console.log('Pull request build run. Skipping tagging operation...');
} else {
  if (PREVIOUS_VERSION === CURRENT_VERSION) {
    //autobump
    cp.exec('npm version patch -m \"Travis Autobump [skip ci]\"', { encoding: 'utf8' }, (error, stdout, stderr) => {
      if (error) {
        console.log('Something went wrong, aborting', stderr);
        process.exit(1);
      }
      const NEW_VERSION = stdout.trim();
      console.log('Auto bumping minor from ' + CURRENT_VERSION + ' to ' + NEW_VERSION);
      cp.execSync('git push origin master --tags');
    });
    
    //process.exit(1);
  } else {
    console.log('Manual bump here from ' + PREVIOUS_VERSION + ' to ' + CURRENT_VERSION);
  }
}



/**/

//console.log('Is a pr:' + isPullRequest);
//git tag -a %build.number% -m "Version %build.number%"
//git push origin %sapphire-client-release-branch% --tags
