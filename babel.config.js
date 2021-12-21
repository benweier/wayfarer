module.exports = (api) => {
  const BABEL_ENV = api.env()

  const styledComponentsConfig = {
    namespace: 'sc-',
    pure: true,
    ssr: false,
    displayName: BABEL_ENV !== 'production',
    fileName: BABEL_ENV !== 'production',
  }

  const plugins = [
    'babel-plugin-twin',
    [
      'babel-plugin-styled-components',
      styledComponentsConfig,
    ],
    [
      'babel-plugin-macros',
      {
        twin: {
          preset: 'styled-components',
          styled: {
            import: 'default',
            from: 'styled-components/macro',
          },
          css: {
            import: 'css',
            from: 'styled-components/macro',
          },
        },
        styledComponents: styledComponentsConfig,
      },
    ],
  ]

  if (BABEL_ENV === 'development') {
    plugins.push('react-refresh/babel')
  }

  return {
    presets: [
      [
        '@babel/env',
        {
          useBuiltIns: 'usage',
          corejs: '3',
          targets: {
            esmodules: true,
          },
        },
      ],
      [
        '@babel/react',
        {
          runtime: 'automatic',
        },
      ],
      '@babel/typescript',
    ],
    plugins,
  }
}
