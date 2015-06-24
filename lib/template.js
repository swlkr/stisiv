const fs  = require("fs"),
      q   = require("q"),
      dot = require("dot");

const Template = {};

Template.fetch = function(template) {
  var deferred = q.defer();

  fs.readFile(template, "utf8", function (error, data) {
    if(error) {
      deferred.reject(error);
    } else {
      deferred.resolve(data);
    }
  });

  return deferred.promise;
};

Template.merge = function(file, data) {
  var template = dot.template(file);
  return template(data);
};

module.exports = Template;
