jsdiff NodeRED Node
=====================

Installing with npm
-------

`npm install node-red-contrib-jsdiff`

Adding nodes to the palette
-------
Using the Editor
You can install nodes directly within the editor by selecting the Manage Palette option from the main menu to open the Palette Manager.

The ‘Nodes’ tab lists all of the modules you have installed. It shows which you are using and whether updates are available for any of them.

The ‘Install’ tab lets you search the catalogue of available node modules and install them.

Example
------
- compare old and new string or array or json or etc
- jsdiff wrapper

## Parameters

```javascript
msg = {};
msg.targetObject = 'diffSentences';
msg.oldValue = 'string';
msg.newValue = 'sttring';
msg.targetObject = 'diffJson';
msg.oldValue = {
    'name': 'naver',
    'value' : 1
}
msg.newValue = {
    'name' : 'naver',
    'value' : 2
}
return msg;
```

Sample Flow
------
```json
[
  {
    "id": "a5713573.755a58",
    "type": "inject",
    "z": "98b6e6a8.7f6808",
    "name": "",
    "props": [
      {
        "p": "payload"
      },
      {
        "p": "topic",
        "vt": "str"
      }
    ],
    "repeat": "",
    "crontab": "",
    "once": false,
    "onceDelay": 0.1,
    "topic": "",
    "payload": "",
    "payloadType": "date",
    "x": 190,
    "y": 100,
    "wires": [
      [
        "96817de4.9b66f"
      ]
    ]
  },
  {
    "id": "96817de4.9b66f",
    "type": "function",
    "z": "98b6e6a8.7f6808",
    "name": "",
    "func": "msg = {};\nmsg.targetObject = 'diffSentences' // diffSentences, diffCss, diffJson, diffArrays, diffTrimmedLines, diffLines, diffWordsWithSpace\nmsg.oldValue = 'string'\nmsg.newValue = 'sttring'\n\nmsg.targetObject = 'diffJson' // diffSentences, diffCss, diffJson, diffArrays, diffTrimmedLines, diffLines, diffWordsWithSpace\nmsg.oldValue = {\n 'name': 'naver',\n 'value' : 1\n}\nmsg.newValue = {\n  'name' : 'naver',\n  'value' : 2\n}\n\nreturn msg;",
    "outputs": 1,
    "noerr": 0,
    "initialize": "",
    "finalize": "",
    "x": 360,
    "y": 100,
    "wires": [
      [
        "f181b39c.f4d58"
      ]
    ]
  },
  {
    "id": "f181b39c.f4d58",
    "type": "jsdiff",
    "z": "98b6e6a8.7f6808",
    "targetObject": "",
    "oldValue": "",
    "newValue": "",
    "name": "diff",
    "x": 530,
    "y": 100,
    "wires": [
      [
        "e4949bb8.788d18"
      ]
    ]
  },
  {
    "id": "e4949bb8.788d18",
    "type": "function",
    "z": "98b6e6a8.7f6808",
    "name": "",
    "func": "node.error(msg.payload);\nvar results = ''\nfor(var i in msg.payload){\n    results += msg.payload[i].value + ''\n}\n\nnode.error(results);\n\nreturn msg;",
    "outputs": 1,
    "noerr": 0,
    "initialize": "",
    "finalize": "",
    "x": 700,
    "y": 100,
    "wires": [
      []
    ]
  }
]

```


JS Code for Node-RED lib
------
```js
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

```
