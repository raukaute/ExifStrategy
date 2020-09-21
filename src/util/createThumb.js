const remote = window.require('electron').remote;
const electronFs = remote.require('fs');
const sharp = remote.require('sharp');
const pipeline = sharp();
pipeline.resize({ height: 50 }).toBuffer();


export function createThumb(img) {
  //  Read the file
  const readStream = electronFs.createReadStream(img);
  // Pipe into sharp
  return readStream.pipe(pipeline)
    .toBuffer()
}