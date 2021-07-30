const config = require('config');

module.exports = function(){
    if (!config.get('jwtPrivateKey')) {
      throw new Error('Jiddiy xato ruy berdi! jwtPrivateKey anmiqlanmagan muhitda');
        
    };
}