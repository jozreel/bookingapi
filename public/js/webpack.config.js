var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'reactclasses');

var config = {
	  // entry: {'main':APP_DIR + '/main.jsx', 'sform':APP_DIR + '/sform.jsx', 'clienthome':APP_DIR + '/clienthome.jsx'},
     entry: {'main':APP_DIR + '/main.jsx'},
	   output: {  path: BUILD_DIR,filename: '[name].bundle.js'  , chunkFilename: "[id].chunk.js" }, 

	module : {
    loaders : [
      {
        test: /\.jsx?$/,
        include : APP_DIR,
        loader : 'babel',
		    exclude: /node_modules/ 
           
      }
    ]
  } 
};

module.exports = config;
