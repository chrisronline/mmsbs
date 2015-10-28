var Rsync = require('rsync');

// Build the command
var rsync = new Rsync()
  .shell('ssh')
  .flags('rzltv')
  .source(process.cwd() + '/basic/*')
  // .destination('croberso@ftp.croberson.net:/home2/croberso/public_html/shauni-stage/');
  .destination('croberso@ftp.croberson.net:/home2/croberso/public_html/mmsbs/');

// Execute the command
rsync.execute(function(error, code, cmd) {
    // we're done
    console.log('done');
});
