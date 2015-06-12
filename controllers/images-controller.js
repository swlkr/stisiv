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

    // Cache control
    var now = new Date();
    var midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    var secondsUntilMidnight = Math.floor((midnight.getTime() - now.getTime())/1000);

    this.type = "image/gif";
    this.body = yield Image.read();
    this.set("Cache-Control", "public, max-age=" + secondsUntilMidnight);
  }
};

module.exports = ImagesController;
