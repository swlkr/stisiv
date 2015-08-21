var fs   = require("fs"),
    path = require("path");

var Image = {
  read: function() {
    return new Promise((resolve, reject) => {
      var filepath = path.join(__dirname, "../images/pixel.gif");
      fs.readFile(filepath, function(error, data) {
        if(error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }
};

module.exports = Image;
