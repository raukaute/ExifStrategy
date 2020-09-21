const { spawn } = require('child_process');
const { remote } = require('electron');
const path = remote.require('path')

export default class Exif {
  constructor() {
    this.path = path.join(process.resourcesPath, 'exiftool', 'exiftool.exe');
    this.defaultOptions = ['-json']
  }

  readData(args) {
    // console.log(this.path)
    return new Promise((resolve) => {
      const _args = args && Array.isArray(args)
        ? [...args,...this.defaultOptions, ]
        : this.defaultOptions

      const dataChunks = [];
      const child = spawn(
        this.path, _args
      );

      child.stdout.on('data', (data) => {
        dataChunks.push(data)
      });

      child.stdout.on('end', () => {
          resolve(Buffer.concat(dataChunks));
      })
    })
  }

  writeData(args) {
    return new Promise((resolve) => {
      const _args = args && Array.isArray(args)
        ? [...args,...this.defaultOptions, ]
        : this.defaultOptions

      const dataChunks = [];

      const child = spawn(
        this.path, _args
      );

      child.stderr.on('data', (data) => {
        dataChunks.push(data)
      });
      child.on('close', () => {
        resolve(Buffer.concat(dataChunks));
      });
    })
  }
}