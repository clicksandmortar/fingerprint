// This eslint config was naenae'd by from a force much stronger than Ed - @cajacko (Charlie Jackson)

// Most of the meanings are commented. When adding more rules, please comment them, and try to keep as vars.

/*
Change matching values in prettierrc as well:
*/
const tabSize = 2;
const charsPerLine = 120;
const maxLinesPerFile = 150;

const minVariableLength = 2;

const allowPropsSpread = true;
const requireJsDoc = true;

const typescriptExtensions = [".ts", ".tsx"];
const extensions = [".js", ".jsx", ...typescriptExtensions];

const cookieWarning =  "Be super careful when setting Cookies with Fingerprint. Doing so has the potential to cause serious issues within apps Difi is Running on Proceed only when 100% confident. If not - please check with the team."

module.exports = {
  // Our main extended package is eslint-config-airbnb. This is widely accepted as one of the best
  // industry standard linting configurations, and is very well documented with why they chose the
  // rules they did: https://github.com/airbnb/javascript
  // Keep prettier as last so it overrides everything else. As it's best to keep prettier config
  // to a minimum, as it can be pretty tricky to match prettier with more specific rules and it
  // doesn't play nicely with a lot of editors if you do try and go more custom
  extends: ["airbnb", "eslint:recommended"],
  // Stop looking foconfig further up than thisr eslint 
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["react-hooks", "@typescript-eslint", "jest", "import"],

  // Cookies have caused a P1 incicent in the past. We want to be super careful when setting cookies with DiFi.
  rules: {
    "no-restricted-properties": [ "error", {
      "object": "Cookies",
      "property": "set",
      "message": cookieWarning
  },
  { 
    "object": "Cookies",
    "property": "remove",
    "message": cookieWarning
  }
],
    'no-restricted-syntax': [
      'error',
      {
        message: cookieWarning,
        selector:
          `CallExpression[callee.name='setCookie']`
      },
    ],

    // Temporarily disabling, but we may want to bring it back eventually for consistency :)
    "import/prefer-default-export": ["off"],
    // our projects use nextJs / gatsby which inject React globally
    "react/react-in-jsx-scope": "off",
    // Ensure all prettier errors fail
    "prettier/prettier": ["error"],
    // Leaving console messages bloats the console and worse case may leak sensitive info or inner
    // workings or lead to performance downsides, so leaving as an error.
    "no-console": "error",
    // Long lines are hard to read an review, so we want to error for them. But not for some things
    // like urls, strings, regex etc
    "max-len": [
      "error",
      {
        code: charsPerLine,
        ignoreUrls: true,
        tabWidth: tabSize,
        ignoreTemplateLiterals: true,
        ignoreStrings: true,
        ignoreRegExpLiterals: true,
      },
    ],
    // Don't allow empty lines between imports
    "padding-line-between-statements": [
      "error",
      { blankLine: "never", prev: "import", next: "import" },
    ],
    // We don't want to specify the extensions when we import .js, .jsx, .ts, .tsx. It's entirely
    // unnecessary to do so
    "import/extensions": [
      "error",
      {
        pattern: extensions.reduce(
          (accumulator, extension) => ({
            ...accumulator,
            [extension]: "never",
          }),
          {}
        ),
      },
    ],
    // allows devDependencies imports in test files
    "import/no-extraneous-dependencies": [
      "off",
      {
        devDependencies: ["**.test.{ts,tsx}"],
        optionalDependencies: false,
      },
    ],
    // Only allow jsx in .tsx or .jsx files
    "react/jsx-filename-extension": ["error", { extensions: [".tsx", ".jsx"] }],
    // On components with loads of props, having to destructure can lead to much more unreadable code
    "react/destructuring-assignment": "off",
    // Limit the length of vars, func names etc. Stops people getting silly with long names or lazy
    // with unreadable short identifiers, excluded a few common and acceptable use cases
    "id-length": [
      "error",
      {
        min: minVariableLength,
        max: 40,
        exceptions: [
          // coordinates
          "x",
          "y",
          // common js iterators
          "i",
          "j",
          // common unique standards
          "e", // common js error
          "cb", // common js callback
          "fs", // common node module name for import fs from "fs"
          "id", // common shortening of identifier
          "db", // common shortening of database
          "ui", // common shortening of user interface
          // sort parameters
          "a",
          "b",
          // actual words
          "as",
          "if",
          "at",
          "on",
          "_", // handled in a special way by typescript, when you don't need to use a param
          "en", // locale
          // header variables
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "to", // describes a destination for output
          "fn", // for saga api calls to api client
        ],
      },
    ],
    // Warn the user if they are using TODO, FIXME etc. Shouldn't really be in production but there
    // can be some use cases where it is ok
    "no-warning-comments": ["warn", { location: "anywhere" }],
    // Force JSdoc comments. Controversial rule, but it is super beneficial for new people to the
    // project, and less senior developers. It forces them to think about their documentation and
    // actually put it in. The extra overhead and annoyance added to senior developer who are naming
    // things properly is minor compared to the benefit of a well documented code base
    "require-jsdoc": !requireJsDoc
      ? "off"
      : [
          "error",
          {
            require: {
              FunctionDeclaration: true,
              MethodDefinition: true,
              ClassDeclaration: true,
              ArrowFunctionExpression: true,
            },
          },
        ],
    // Don't let files get too large. There's always going to be some cases with class files that
    // need to be longer. Just add a eslint-ignore comment for that 1 file. Keeping this rule
    // encourages people to split and organise files properly
    "max-lines": [
      "error",
      {
        max: maxLinesPerFile,
        skipBlankLines: true,
        skipComments: true,
      },
    ],
    // Makes it much easier to navigate imports, especially when importing loads of things
    "import/imports-first": ["error", "absolute-first"],
    // As we aim to build composable components, spreading params into their native subcomponents makes sense
    "react/jsx-props-no-spreading": allowPropsSpread ? "off" : "error",

    // Labels must be controlling an input, when we use custom components this can get confused so we can specify
    //  custom components that are inputs or labels here
    // 'jsx-a11y/label-has-associated-control': [
    //   'warn',
    //   {
    //     // Most of the time we'd define the input like this
    //     controlComponents: ['Style.Input'],
    //     depth: 3,
    //   },
    // ],
    // There are times we may genuinely want to process serially
    "no-await-in-loop": "off",
    // There's a lot of occasions where it's important to be certain we have a boolean value
    "no-extra-boolean-cast": "off",
    // Always have a line after class members except for single line definitions e.g. properties not methods
    "lines-between-class-members": [
      "error",
      "always",
      {
        exceptAfterSingleLine: true,
      },
    ],
    // Conflicts with prettier
    "react/jsx-wrap-multilines": ["off"],
    "react/require-default-props": ["off"],
  },

  overrides: [
    // NOTE: keep this at the top of the overrides so that more specific overrides that follow will override this
    {
      files: ["*.js", "*.jsx", "*.tsx", ".ts"],
      rules: {
        // Don't delay - Make your React hooks reliable today!
        // having this rule here also makes ESLINT extensions in some editors to autofill hook dependencies.
        "react-hooks/exhaustive-deps": "error",
      },
    },
    {
      // Only want typescript config for typescript files
      extends: [
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
      ],
      files: typescriptExtensions.map((extension) => `*${extension}`),
      rules: {
        // eslint won't pick up the typescript props, so disabling here. Pointless to have prop-types
        // and typescript
        "react/prop-types": "off",
        // Ensure we must put private/public on class props and methods. Makes it much more obvious what you can consume
        // and use
        "@typescript-eslint/explicit-member-accessibility": "error",
        "@typescript-eslint/no-explicit-any": "error",
      },
    },
    {
      files: [
        "**/stories/**/*",
        "**/storybook/**/*",
        "**/storybooks/**/*",
        "**/*.stories.*",
      ],
      rules: {
        "require-jsdoc": ["off"],
        "import/no-extraneous-dependencies": ["off"],
        "@typescript-eslint/explicit-function-return-type": ["off"],
        "max-lines": ["off"],
        "import/prefer-default-export": ["off"],
      },
    },
    {
      files: ["**/defaultContentStrings.*"],
      rules: {
        "max-lines": ["off"],
      },
    },
    {
      files: [
        "**/selectors.*",
        "**/selectors/**/*",
        "**/actions.*",
        "**/actions/**/*",
        "**/sideEffects.*",
        "**/sideEffects/**/*",
        "**/context/**/*",
        "**/config/**/*",
      ],
      rules: {
        "import/prefer-default-export": ["off"],
      },
    },
    {
      // Turn off some rules for test files
      files: [
        "**/__mocks__/**/*",
        "**/__tests__/**/*",
        "**/*.test.*",
        "**/__utils__/**/*",
      ],
      env: {
        "jest/globals": true,
      },
      extends: ["plugin:jest/recommended"],
      rules: {
        // We like storing any large data files in mocks, so this is okay
        "jest/no-mocks-import": ["off"],
        "require-jsdoc": ["off"],
        "max-lines": ["off"],
        "no-underscore-dangle": ["off"],
        "id-length": ["off"],
        camelcase: "off",
        "@typescript-eslint/camelcase": ["off"],
        "@typescript-eslint/ban-ts-ignore": ["off"],
        "@typescript-eslint/no-explicit-any": ["off"],
        "react/jsx-props-no-spreading": ["off"],
        "@typescript-eslint/explicit-function-return-type": ["off"],
        "import/prefer-default-export": ["off"],
      },
    },
    {
      // Turn off some rules for testing typescript test files
      files: ["**/__type_tests__/**/*"],
      rules: {
        "require-jsdoc": ["off"],
        "import/prefer-default-export": ["off"],
        "@typescript-eslint/explicit-function-return-type": ["off"],
      },
    },

    {
      // This is for the shared package which follows the format src/v1/ as the ignore statements run inside the package
      // folder so we can't check for the package name
      files: ["**/src/v*/**/*"],
      rules: {
        "react/jsx-props-no-spreading": ["off"],
        // The shared package specifies optional dependencies to accommodate native/web projects, this let's you import
        // those, otherwise it complains about not importing dependencies properly
        "import/no-extraneous-dependencies": [
          "error",
          {
            devDependencies: true,
            peerDependencies: true,
            optionalDependencies: true,
          },
        ],
      },
    },
    // {
    //   // Backend data is in snake_case so we need this.
    //   files: ["packages/backend/**"],
    //   rules: {
    //     "@typescript-eslint/camelcase": ["off"],
    //   },
    // },
    // {
    //   // Backend JS code uses a large number of for loops to run async tasks synchronously
    //   files: ["packages/backend/js/**"],
    //   rules: {
    //     "no-restricted-syntax": ["off"],
    //   },
    // },
    {
      files: ["**/fixtures/**"],
      rules: {
        "max-lines": ["off"],
        "@typescript-eslint/camelcase": ["off"],
      },
    },
    {
      files: ["**/api/**"],
      rules: {
        "import/prefer-default-export": ["off"],
        // We map a lot of the backend snake_case stuff to camelCase here
        "@typescript-eslint/camelcase": ["off"],
        // Many of the api types are quite complex and it can be hard or pointless to type the return statements. As
        // long as everything is kept in typescript we should be fine here
        "@typescript-eslint/explicit-function-return-type": ["off"],
      },
    },
  ],
  settings: {
    "import/resolver": {
      node: {
        extensions,
      },
    },
    "import/extensions": extensions,
    "import/parsers": {
      "@typescript-eslint/parser": typescriptExtensions,
    },
    react: {
      version: "18.2",
    },
  },
};
