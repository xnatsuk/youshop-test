// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  formatters: {
    css: true,
    html: true,
  },
  typescript: {
    tsconfigPath: ['./tsconfig.json', './tsconfig.node.json'], // Type aware rules
  },
})
