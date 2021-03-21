const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // ! Version in react-scripts is v0.11.3

module.exports = {
    // The Webpack config to use when compiling your react app for development or production.
    webpack: function (config, env) {
        // Custom MiniCssExtractPlugin instance to get rid of hash in filename template
        const miniCssExtractPlugin = new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[name].chunk.css'
        });
        // Replace origin MiniCssExtractPlugin instance in config.plugins with the above one
        config.plugins = replacePlugin(
            config.plugins,
            (name) => /MiniCssExtractPlugin/i.test(name),
            miniCssExtractPlugin
        );
        // Change output filename template to get rid of hash there
        config.output.filename = 'js/main.js';
        config.output.chunkFilename = 'js/[name].chunk.js';
        // Disable built-in SplitChunksPlugin
        config.optimization.splitChunks = {
            cacheGroups: { default: false }
        };
        // Disable runtime chunk addition for each entry point
        config.optimization.runtimeChunk = false;
        // Edit module.rule
        config.module.rules = config.module.rules.map((item) => {
            if (item.oneOf) {
                const rules = item.oneOf.map((el) => {
                    // Change url-loader filename to get rid of hash there
                    if (/url-loader/i.test(el.loader)) {
                        el.options.name = 'assets/[name].[ext]';
                    }
                    // Change file-loader filename to get rid of hash there
                    if (/file-loader/i.test(el.loader)) {
                        el.options.name = 'assets/[name].[ext]';
                    }

                    return el;
                });

                return { oneOf: rules };
            }

            return item;
        });

        return config;
    },
    // The Jest config to use when running your jest tests - note that the normal rewires do not
    // work here.
    jest: function (config) {
        // ...add your jest config customisation...
        // Example: enable/disable some tests based on environment variables in the .env file.
        if (!config.testPathIgnorePatterns) {
            config.testPathIgnorePatterns = [];
        }

        if (!process.env.RUN_COMPONENT_TESTS) {
            config.testPathIgnorePatterns.push('<rootDir>/src/components/**/*.test.js');
        }

        if (!process.env.RUN_REDUCER_TESTS) {
            config.testPathIgnorePatterns.push('<rootDir>/src/reducers/**/*.test.js');
        }
        return config;
    },
    // The function to use to create a webpack dev server configuration when running the development
    // server with 'npm run start' or 'yarn start'.
    // Example: set the dev server to use a specific certificate in https.
    devServer: function (configFunction) {
        // Return the replacement function for create-react-app to use to generate the Webpack
        // Development Server config. "configFunction" is the function that would normally have
        // been used to generate the Webpack Development server config - you can use it to create
        // a starting configuration to then modify instead of having to create a config from scratch.
        return function (proxy, allowedHost) {
            // Create the default config by calling configFunction with the proxy/allowedHost parameters
            const config = configFunction(proxy, allowedHost);
            // Change the https certificate options to match your certificate, using the .env file to
            // set the file paths & passphrase.
            // const fs = require('fs');
            // config.https = {
            //     key: fs.readFileSync(process.env.REACT_HTTPS_KEY, 'utf8'),
            //     cert: fs.readFileSync(process.env.REACT_HTTPS_CERT, 'utf8'),
            //     ca: fs.readFileSync(process.env.REACT_HTTPS_CA, 'utf8'),
            //     passphrase: process.env.REACT_HTTPS_PASS
            // };
            // Return your customised Webpack Development Server config.
            return config;
        };
    },
    // The paths config to use when compiling your react app for development or production.
    paths: function (paths, env) {
        // ...add your paths config
        return paths;
    }
};

// Utility function to replace/remove specific plugin in a webpack config
function replacePlugin(plugins, nameMatcher, newPlugin) {
    const i = plugins.findIndex((plugin) => {
        return plugin.constructor && plugin.constructor.name && nameMatcher(plugin.constructor.name);
    });

    return i > -1
        ? plugins
              .slice(0, i)
              .concat(newPlugin || [])
              .concat(plugins.slice(i + 1))
        : plugins;
}
