module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Disallow the use of setCookie",
      category: "Best Practices",
      recommended: true,
    },
    schema: [], // No options to configure
  },
  create(context) {
    return {
      CallExpression(node) {
        const { callee } = node;

        // Check if the callee is setCookie
        if (callee.type === "Identifier" && callee.name === "setCookie") {
          context.report({
            node: callee,
            message: "Avoid using setCookie",
          });
        }
      },
    };
  },
};
