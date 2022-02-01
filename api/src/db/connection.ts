const mongoose = require('mongoose');

export const connect = async () => {
  mongoose
    .connect('mongodb://localhost:27017/trello')
    .then(() => {
      console.log('Successfully connected with mongodb');
    })
    .catch(e => {
      console.error(
        'While connecting with mongodb, getting error: ',
        e.message
      );
    });
};
