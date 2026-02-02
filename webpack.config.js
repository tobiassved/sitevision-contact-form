/**
 * Webpack Configuration for Sitevision Contact Form
 * 
 * This configuration is optimized for Sitevision WebApps2.
 * It uses @sitevision/sitevision-scripts which provides
 * the base configuration - this file can override or extend it.
 */

const path = require('path');

module.exports = {
  // Entry points for WebApps2
  entry: {
    // Server-side rendering
    server: './src/index.js',
    // Client-side hydration
    client: './src/main.js'
  },

  // Output configuration
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    libraryTarget: 'umd'
  },

  // Module resolution
  module: {
    rules: [
      // JSX/JavaScript
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', { runtime: 'automatic' }]
            ]
          }
        }
      },
      // CSS
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  // Module resolution
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },

  // Development tools
  devtool: 'source-map',

  // Optimization
  optimization: {
    minimize: true
  },

  // External dependencies (provided by Sitevision)
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    '@sitevision/api': '@sitevision/api'
  }
};
