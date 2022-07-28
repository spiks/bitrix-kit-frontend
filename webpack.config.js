const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlBeautifierPlugin = require('html-beautifier-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const RemovePlugin = require('remove-files-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
  assets: 'assets',
}

const PAGES_DIR = path.join(__dirname, 'src/pages');

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const initMultipleHtmlPlugin = () => {
  const pages = fs.readdirSync(PAGES_DIR);

  const pluginInstances = pages.map((page) => {
    const [pageName] = page.split('.');

    return new HtmlWebpackPlugin({
      filename: `${pageName}.html`,
      template: `${PAGES_DIR}/${page}`,
      minify: false,
    });
  });

  return pluginInstances;
};

const config = {
  target: 'browserslist',
  entry: {
    'main_styles': `${PATHS.src}/styles.js`,
    'main_scripts': `${PATHS.src}/scripts.js`,
  },
  output: {
    filename: `js/[name]/[name].js`,
    path: PATHS.dist,
    clean: true,
  },
  devtool: 'source-map',
  devServer: {
    static: {
      directory: PATHS.src,
    },
    open: true,
    host: 'localhost',
  },
  resolve: {
    alias: {
      '@': PATHS.src,
      '@assets-fonts': `${PATHS.src}/assets/fonts`,
      '@assets-media': `${PATHS.src}/assets/media`,
      '@styles': `${PATHS.src}/styles`,
      '@styles-mixins': `${PATHS.src}/styles/mixins`,
      '@components': `${PATHS.src}/components`,
    }
  },
  plugins: [    
    ...initMultipleHtmlPlugin(),

    new HtmlBeautifierPlugin(),

    new MiniCssExtractPlugin({
      filename: `css/[name]/[name].css`,
    }),

    new RemovePlugin({
      after: {
        root: './dist',
        test: [
          {
            folder: './js',
            method: (absoluteItemPath) => {
              return new RegExp(/styles/, 'gim').test(absoluteItemPath);
            }
          },
        ]
      }
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/i,
        use: [
          mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(svg|png|jpg|gif|mp4|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: `${PATHS.assets}/media/[name][ext]`,
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: `${PATHS.assets}/fonts/[name][ext]`,
        },
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.pug$/i,
        use: [
          {
            loader: 'html-loader',
            options: {
              sources: {
                list: [
                  {
                    tag: 'img',
                    attribute: 'data-src',
                    type: 'src',
                  },
                  {
                    tag: 'img',
                    attribute: "data-srcset",
                    type: 'srcset',
                  },
                  {
                    tag: 'div',
                    attribute: 'data-background-image',
                    type: 'src',
                  },
                ],
              },
              minimize: false,
            },
          },
          {
            loader: 'pug-html-loader',
            options: {
              basedir: PATHS.src,
            },
          }
        ],
        exclude: /(node_modules)/,
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true,
        }
      }
    },
    minimizer: [
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.squooshMinify,
        },
      }),
    ],
  },
};

module.exports = () => {
  config.mode = 'development';

  if (mode === 'production') {
    config.mode = 'production';
  }

  return config;
};
