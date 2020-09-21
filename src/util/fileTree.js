const remote = window.require('electron').remote;
const electronFs = remote.require('fs');
export default class FileTree {
constructor(path, name = null) {
  this.path = path;
  this.name = name;
  this.items = [];
  this.isLeaf = false;
}

build = () => {
  this.items = FileTree.readDir(this.path);
};

static readDir(path) {
  const fileArray = [];

  electronFs.readdirSync(path).forEach((file) => {
    const fileInfo = new FileTree(`${ path }\\${ file }`, file);
    fileInfo.isLeaf = true;

    const stat = electronFs.statSync(fileInfo.path);

    if (stat.isDirectory()) {
      fileInfo.isLeaf = false;
      fileInfo.items = FileTree.readDir(fileInfo.path);
    }

    fileArray.push(fileInfo);
  });

  return fileArray.sort((a, b) => {
    return !a.isLeaf ? -1 : b.isLeaf ? 1 : 0;
  });
}
}
