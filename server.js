require( 'dotenv' ).load();
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const bodyParser = require('body-parser');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');

//En fonction du mode (production ou développement), on intégre différentes fonctionnalités
const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 8080 : process.env.PORT;

//On appelle express permettant à Node JS de gérer l'application
//comme par exemple l'écoute sur un port
const app = express();

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });
} else {
  app.use(express.static(__dirname + '/dist'));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

//On écoute sur le port 8080 par défaut
app.listen(port, function onStat(err){
  if (err) {
    console.log(err);
  }
  console.info('==> Listening on port %s. Open up in your browser.',port);
});
