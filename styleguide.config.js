// const loaders = require('vue-webpack-loaders')
// const webpack = require('webpack')
const webpack = require('./build/webpack.dev.conf.js')
const path = require('path')
const { theme, styles } = require('./src/styleguidist/styles')

module.exports = {
    title: 'Croud Tech Docs',
    showUsage: true,
    highlightTheme: 'material',
    getComponentPathLine(componentPath) {
        const component = path.basename(componentPath, '.vue').split('.')[0]
        const dir = path.dirname(componentPath)
        return `import Croud${component} from 'croud-style-guide/${dir}/${component}'`
    },
    // components: 'src/components/shared/**/*.vue',
    sections: [
        {
            name: 'Buttons',
            components: 'src/components/shared/buttons/**/*.vue',
        },
        {
            name: 'Icons',
            components: 'src/components/shared/icons/**/*.vue',
        },
        {
            name: 'Menus',
            components: 'src/components/shared/menus/**/*.vue',
        },

        {
            name: 'Layout',
            components: 'src/components/shared/layout/**/*.vue',
            sections: [
                {
                    name: 'Datatable',
                    components: 'src/components/shared/Datatable.vue',
                },
                {
                    name: 'Modal',
                    content: 'src/components/shared/semantic/semantic-modal.md',
                },
                {
                    name: 'full-calendar',
                    content: 'src/components/shared/layout/fullcalendar.md',
                },
            ],
        },
        {
            name: 'Form Inputs',
            components: 'src/components/shared/forms/**/*.vue',
            sections: [
                {
                    name: 'croud-form-builder',
                    content: 'src/components/shared/forms/croud-forms.md',
                },
                {
                    name: 'Quill',
                    content: 'src/components/shared/forms/quill/quill.md',
                },
                {
                    name: 'Masked Inputs',
                    content: 'src/components/shared/forms/cleave/cleave.md',
                },
                {
                    name: 'Dropdown',
                    content: 'src/components/shared/semantic/semantic-form-dropdown.md',
                },
                {
                    name: 'Checkbox',
                    content: 'src/components/shared/semantic/semantic-checkbox.md',
                },
                {
                    name: 'Radio',
                    content: 'src/components/shared/semantic/semantic-radiobutton.md',
                },
            ],
        },
        {
            name: 'Scheduler',
            components: 'src/components/shared/scheduler/**/*.vue',
        },
        {
            name: 'Misc',
            components: 'src/components/shared/misc/**/*.vue',
            sections: [
                {
                    name: 'Headings',
                    content: 'src/components/shared/Headings.md',
                },
                {
                    name: 'Toast',
                    content: 'src/components/shared/forms/toast/toast.md',
                },
            ],
        },
        {
            name: 'HOC',
            components: 'src/components/shared/hoc/**/*.vue',
        },
    ],
    styleguideComponents: {
        Logo: path.join(__dirname, 'src/styleguidist/components/logo.js'),
    },
    require: [
        'jquery',
        './semantic/dist/semantic.min.js',
        './semantic/dist/semantic.min.css',
        'quill/dist/quill.snow.css',
        './src/components/shared/forms/quill/shortcodes.css',
        'fullcalendar/dist/fullcalendar.js',
        'fullcalendar/dist/fullcalendar.css',
    ],
    // webpackConfig: {
    //     module: {
    //         loaders,
    //     },
    //     plugins: [
    //         new webpack.ProvidePlugin({
    //             $: 'jquery',
    //             jQuery: 'jquery',
    //             'window.jQuery': 'jquery',
    //         }),
    //     ],
    // },
    webpackConfig: webpack,
    styleguideDir: 'docs/technical',
    mixins: [
        'src/mixins/styleguidist.js',
    ],
    theme,
    styles,
}
