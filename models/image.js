const fs   = require("fs"),
      path = require("path"),
      q    = require("q");

const Image = {
  read: function() {
    var deferred = q.defer();
    var filepath = path.join(__dirname, "../images/pixel.gif");

    fs.readFile(filepath, function(readError, data) {
      if(readError) {
        return deferred.reject(readError);
      }

      deferred.resolve(data);
    });

    return deferred.promise;
  }
};

module.exports = Image;
