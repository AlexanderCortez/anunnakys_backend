const app = require('express')();

app.listen(3000, (err) => {
  if (!err) {
    console.log('Running on port =>', 3000);
  } else {
    console.log('error: ', err.messsage);
  }
});
