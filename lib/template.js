const fs  = require("fs"),
      dot = require("dot");

const Template = {};

Template.fetch = function(template) {
  return new Promise((resolve, reject) => {
    fs.readFile(template, "utf8", function (error, data) {
      if(error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};

Template.merge = function(file, data) {
  var template = dot.template(file);
  return template(data);
};

module.exports = Template;
