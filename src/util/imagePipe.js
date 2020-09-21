
const remote = window.require('electron').remote;
const fs = remote.require('fs');
const sharp = remote.require('sharp');

export function pipeFolder(dir, width) {
  const thumbs = [];
  return new Promise((resolve) => {
    fs.readdirSync(dir).forEach((file) => {
      const pipeline = sharp()
      pipeline
        .resize({ width: Math.floor(width / 10) })
        .toBuffer()
        .then((data) => {
          thumbs.push(data.toString('base64'));
        });

      try {
        const readStream = fs.createReadStream(`${ dir }/${ file }`);
        readStream.pipe(pipeline)
      } catch (err) {
        alert(err)
      }
    });
    resolve(thumbs)
  })
}

export function pipeFile(path) {
  return new Promise((resolve) => {
    const pipeline = sharp();
      pipeline
        .resize({ height: 200 })
        .toBuffer()
        .then((data) => {
          resolve(data)
      });
    try {
      fs.createReadStream(path).pipe(pipeline)
    } catch (err) {
      alert(err)
    }
  })
}