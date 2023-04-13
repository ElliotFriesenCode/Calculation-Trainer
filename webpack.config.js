const path = require('path');

module.exports = {
  entry: './src/index.js', // Replace with your entry point
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};