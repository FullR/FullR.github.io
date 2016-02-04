const _ = require("lodash");
const prompt = (name, message, type, validate) => ({type: type || "input", name, message, validate});

function dashcapCase(text) {
  return _.capitalize(_.kebabCase(text));
}

module.exports = (plop) => {
  plop.addHelper("dashcapCase", dashcapCase);

  plop.setGenerator("component", {
    description: "Barebones React Component",
    prompts: [
      prompt("name", "Name?")
    ],
    actions: [
      {
        type: "add",
        path: "src/components/{{dashCase name}}/index.js",
        templateFile: "plop-templates/component.hb"
      },
      {
        type: "add",
        path: "src/components/{{dashCase name}}/style.scss",
        templateFile: "plop-templates/component-style.hb"
      }
    ]
  });
};
