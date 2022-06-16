const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlBeautifierPlugin = require('html-beautifier-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const RemovePlugin = require('remove-files-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'local/templates/main'),
  assets: 'assets',
}

const PAGES_DIR = path.join(__dirname, 'src/pages');

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const initMultipleHtmlPlugin = () => {
  const pages = fs.readdirSync(PAGES_DIR);

  const pagesMap = {}

  const pluginInstances = pages.map((page) => {
    const [pageName] = page.split('.');

    if (!pagesMap[pageName]) {
      pagesMap[pageName] = `${pageName}.html`;
    }

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
    'template.styles': `${PATHS.src}/styles.js`,
    'template.scripts': `${PATHS.src}/scripts.js`,
  },
  output: {
    filename: `${PATHS.assets}/js/[name]/[name].js`,
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
      '@template': `${PATHS.src}/template`,
      '@styles': `${PATHS.src}/template/styles`,
      '@modules': `${PATHS.src}/template/modules`,
      '@styleMixins': `${PATHS.src}/template/mixins/css`,
      '@utils': `${PATHS.src}/template/utils`,
      '@apiFront': `${PATHS.src}/template/api-front`,
      '@components': `${PATHS.src}/template/components`,
    }
  },
  plugins: [    
    ...initMultipleHtmlPlugin(),

    new HtmlBeautifierPlugin(),

    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}/css/[name]/[name].css`,
    }),

    new RemovePlugin({
      after: {
        root: './local/templates/main/assets',
        test: [
          {
            folder: './js',
            method: (absoluteItemPath) => {
                return new RegExp(/\.styles/, 'm').test(absoluteItemPath);
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
        test: /\.(svg|png|jpg|gif|webp)$/i,
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
        options: {
          attrs: ['source:srcset', 'img:src']
        },
      },
      {
        test: /\.pug$/i,
        use: [
          {
            loader: 'html-loader'
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
