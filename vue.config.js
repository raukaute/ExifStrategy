
const path = require('path');

module.exports = {
  transpileDependencies: ['vuetify'],
  devServer: {
    watchOptions: {
      ignored: [path.resolve(__dirname, 'public/IMG')],
    },
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        "productName": 'ExifStrategy',
        "extraResources": [
          {
            "from": "exiftool",
            "to": "exiftool",
            "filter": [
              "**/*"
            ]
          }
        ]
      },
    },
  },
};