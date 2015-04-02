const Image = require("../models/image"),
      Visit = require("../models/visit");

const ImagesController = {
  routes: function() {
    return [
      { method: "get", url: "/images/:filename", fn: this.show, auth: false }
    ];
  },
  show: function *(filename) {

    // Create a visit
    yield Visit.create(filename.slice(0, -4), this.request);


    this.type = "image/gif";
    this.body = yield Image.read();
  }
};

module.exports = ImagesController;
