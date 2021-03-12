const Diff = require('diff');
module.exports = function (RED) {
  function jsdiff(config) {
    RED.nodes.createNode(this, config);
    var self = this;
    this.oldValue = config.oldValue || "";
    this.newValue = config.newValue || "";
    this.targetObject = config.targetObject || "";
    this.on('input', function(msg) {
      var oldValue = self.oldValue || msg.oldValue;
      var newValue = self.newValue || msg.newValue;
      var targetObject = self.targetObject || msg.targetObject;

      msg.payload = Diff[targetObject](oldValue, newValue);
      self.send(msg);

    });
  }
  RED.nodes.registerType('jsdiff', jsdiff);
};
