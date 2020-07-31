const bcrypt = require('bcryptjs');
bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash('admin', salt, (err, hash) => {
    if (err) throw err;
    console.log(hash);
  });
});
