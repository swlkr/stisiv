const PingsController = {
  routes: function() {
    return [
      { method: "get", url: "/", fn: this.get, auth: false }
    ];
  },
  get: function *() {
    this.type = "application/json";
    this.body = {status: "Alive!"};
  }
};

module.exports = PingsController;
