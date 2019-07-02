var config  = require('config');

module.exports = function (req,res){
  return res.send(JSON.stringify({'App Name': config.get('Application.Name'), 
  'Version': config.get('Application.Version')}));
};