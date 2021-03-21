module.exports = {
    stories: [
        '../src/ui/**/*.stories.mdx',
        '../src/ui/**/*.stories.@(js|jsx|ts|tsx)'
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/preset-create-react-app'
    ],
    typescript: {
        reactDocgen: 'react-docgen-typescript',
        reactDocgenTypescriptOptions: {
            compilerOptions: {
                allowSyntheticDefaultImports: false,
                esModuleInterop: false,
            },
        }
    }
    // babel: async (options) => ({
    //     ...options,
    //     // any extra options you want to set
    // }),
};
