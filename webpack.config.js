/* eslint-disable */
// disable eslint for the entire file
// ref: https://eslint.org/docs/2.13.1/user-guide/configuring#disabling-rules-with-inline-comments
// TODO figure out how to fix the eslint errors in this file

// ref: https://www.typescriptlang.org/docs/handbook/react-&-webpack.html
const DefinePlugin = require('webpack').DefinePlugin;
const dotEnv = require('dotenv');
const fs = require('fs'); // to check if the file exists
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// loading env files dynamically
// ref: https://medium.com/@trekinbami/using-environment-variables-in-react-6b0a99d83cf5
const getEnvKeys = env => {
    // Get the root path (assuming your webpack config is in the root of your project!)
    const currentPath = path.join(__dirname);
    // Actual environment config file path
    const envPath = `${currentPath}/.env`;
    // Environment file containing mode configs
    const modePath = `${currentPath}/.env.${env.ENVIRONMENT}`;
    // Get the local environment config
    const localPath = `${currentPath}/.env.${env.ENVIRONMENT}.${env.NODE_ENV}`;
    // Build config and keep the most important ones in the order
    // [.env < .env.${env.ENVIRONMENT} < .env.${env.ENVIRONMENT}.${env.NODE_ENV}]
    const configPaths = [envPath, modePath, localPath];

    return configPaths.reduce((prevConfig, configPath) => {
        if (fs.existsSync(configPath)) {
            const fileEnv = dotEnv.config({ path: configPath }).parsed;
            return Object.keys(fileEnv).reduce((prev, next) => {
                prev[`process.env.${next}`] = fileEnv[next];
                return prev;
            }, prevConfig);
        }
        return prevConfig;
    }, {});
};

// proxy fix: https://github.com/webpack/docs/wiki/webpack-dev-server#proxying-local-virtual-hosts
const getProxyTarget = endpoint => {
    const splits = endpoint.split(':');

    const protocol = splits.length > 1 ? `${splits[0]}` : 'http';
    let host = splits.length > 1 ? splits[1] : splits[0];
    host = host.split('//')[1];
    let port = protocol === 'http' ? 80 : 443;
    port = splits.length > 2 ? Number(splits[2]) : port;

    return {
        host,
        protocol,
        port,
    };
};

module.exports = (env = {}) => {
    const ALLOWED_MODES = ['development', 'production'];
    const modes = ALLOWED_MODES.filter(mode => mode === env.ENVIRONMENT);
    env.ENVIRONMENT = modes.length > 0 ? modes[0] : ALLOWED_MODES[0];
    const ALLOWED_NODE_ENVS = ['local'];
    const node_envs = ALLOWED_NODE_ENVS.filter(mode => mode === env.NODE_ENV);
    env.NODE_ENV = node_envs.length > 0 ? node_envs[0] : ALLOWED_NODE_ENVS[0];

    const envKeys = getEnvKeys(env);
    const apiServerProxyTarget = getProxyTarget(envKeys['process.env.HIGHLIGHTS_API_ENDPOINT']);

    return {
        mode: env.ENVIRONMENT,
        entry: ['babel-polyfill', path.resolve(__dirname, 'src', 'index.tsx')],
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/',
        },
        devServer: {
            compress: true,
            historyApiFallback: true,
            proxy: {
                '/apis': {
                    target: apiServerProxyTarget,
                    pathRewrite: { '^/apis': '' },
                },
                '/highlights/images': {
                    target: apiServerProxyTarget,
                },
            },
        },

        // Enable sourcemaps for debugging webpack's output.
        devtool: 'source-map',
        resolve: {
            // Add '.ts' and '.tsx' as resolvable extensions.
            extensions: ['.ts', '.tsx', '.js'],
        },

        module: {
            rules: [
                {
                    test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
                    exclude: /node_modules/,
                    use: ['file-loader?name=[name].[ext]'], // ?name=[name].[ext] is only necessary to preserve the original file name
                },
                {
                    test: /\.(ts|js)x?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                    },
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                },
                // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
                {
                    enforce: 'pre',
                    test: /\.js$/,
                    loader: 'source-map-loader',
                },
            ],
        },

        // When importing a module whose path matches one of the following, just
        // assume a corresponding global variable exists and use that instead.
        // This is important because it allows us to avoid bundling all of our
        // dependencies, which allows browsers to cache those libraries between builds.
        externals: [
            // {
            //     react: 'React',
            //     'react-dom': 'ReactDOM',
            // },
        ],
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'public', 'index.html'),
            }),
            // env variables ref: https://webpack.js.org/guides/environment-variables/
            new DefinePlugin(envKeys),
        ],
    };
};
