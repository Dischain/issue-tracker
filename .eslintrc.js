module.exports = {
  "env": {
      "es6": true,
      "node": true
  },
  "extends": "eslint:recommended",
  "rules": {
      // "indent": [
      //     "error",
      //     2
      // ],
      "linebreak-style": [
          "error",
          "windows"
      ],
      "quotes": [
          "error",
          "single"
      ],
      "semi": [
          "error",
          "always"
      ],
      "no-console": "off",
      "no-unused-vars": "off",
      "no-undef": "off"
  },
  "plugins": [
      "react"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  }
};