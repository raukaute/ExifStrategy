import Exif from '@/util/Exif.js';
import FileTree from '@/util/fileTree.js'
import { pipeFolder, pipeFile } from '@/util/imagePipe.js'
const { dialog } = require('electron').remote

const state = {
  activeFiles: [],
  activeFolder: '',
  autoComplete: [],
  checkAutoComplete: true,
  error: '',
  exifPath: undefined,
  fileTree: null,
  folderPreview: null,
  infoFields: {
    File: { FileName: '', FileType: '', FileSize: '' },
    Composite: { ImageSize: '' },
    EXIF: { DateTimeOriginal: '', Model: '' },
  },
  metaData: {},
  previewImage: '',
  previewFolderHeight: null,
  thumbFolder: '',
};

const mutations = {
  SET_FILE_TREE(state, payload) {
    state.fileTree = payload;
  },
  SET_PREVIEW_CONT_HEIGHT(state, payload) {
    state.previewFolderHeight = payload;
  },
  UPDATE_FILE_TREE(state) {
    state.fileTree.build();
  },
  UPDATE_IMAGE(state, payload) {
    state.image = payload;
  },
  UPDATE_FILE_PREVIEW(state, payload) {
    state.previewImage = payload;
  },
  UPDATE_FOLDER_PREVIEW(state, payload) {
    state.folderPreview = payload;
  },

  UPDATE_EXIF(state, payload) {
    state.metaData = payload;
  },

  SET_INFO_FIELDS(state) {
    const _ = state.infoFields;
    // let current;

    for (const field in _) {
      for (const tag in _[field]) {
        // current = tag;
        try {
          _[field][tag] = state.metaData[field].find(
            (key) => Object.keys(key) == tag
          )[tag];
        } catch (e) {
          _[field][tag] = 'N/A';
        }
      }
    }
  },

  UPDATE_SUGGESTIONS(state, payload) {
    state.autoComplete = payload;
  },

  UPDATE_FILE_LIST(state, payload) {
    const { ctrlKey, name, path } = payload;
    state.activeFiles = ctrlKey
      ? [...state.activeFiles, { name, path }]
      : [{ name, path }];
  },
  UPDATE_ACTIVE_FOLDER(state, payload) {
    state.activeFolder = payload;
  },
  CLEAN_UP_AUTOCOMPLETE(state, valPicked) {
    state.checkAutoComplete = valPicked ? false : true;

    state.autoComplete = [];
  },
};

const actions = {

  buildFileTree({ commit }, payload) {
    const fileTree = new FileTree(payload);
    fileTree.build();
    commit('SET_FILE_TREE', fileTree);
  },

  async changeMetaData({ state ,commit, dispatch }, payload) {
    // @TODO write this less verbose
    const writeArgs = (() => {
      const {
        origin,
        target,
        applyFolder,
        subfolder,
        isCustom,
        isFN,
        appendFN } = payload;

      const args = applyFolder
        ? subfolder
          ? isCustom
            ? isFN
              ? appendFN
                ? [state.activeFolder.path, `-${target}=%f${origin}.%e`, '-r']
                : [state.activeFolder.path, `-${target}=${origin}.%e`, '-r']
              : [state.activeFolder.path, `-${target}=${origin}`, '-r']
            : isFN
            ? appendFN
              ? [state.activeFolder.path, `-${target}<%f${origin}.%e`, '-r']
              : [state.activeFolder.path, `-${target}<${origin}.%e`, '-r']
            : [state.activeFolder.path, `-${target}<${origin}`, '-r']
          : isCustom
          ? isFN
            ? appendFN
              ? [state.activeFolder.path, `-${target}=%f${origin}.%e`]
              : [state.activeFolder.path, `-${target}=${origin}.%e`]
            : [state.activeFolder.path, `-${target}=${origin}`]
          : isFN
          ? appendFN
            ? [state.activeFolder.path, `-${target}<%f${origin}.%e`]
            : [state.activeFolder.path, `-${target}<${origin}.%e`]
          : [state.activeFolder.path, `-${target}<${origin}`]
        : isCustom
        ? isFN
          ? appendFN
            ? [
                ...state.activeFiles.map((file) => file.path),
                `-${target}=%f${origin}.%e`,
              ]
            : [
                ...state.activeFiles.map((file) => file.path),
                `-${target}=${origin}.%e`,
              ]
          : [
              ...state.activeFiles.map((file) => file.path),
              `-${target}=${origin}`,
            ]
        : isFN
          ? appendFN
            ? [
                ...state.activeFiles.map((file) => file.path),
                `-${target}<%f${origin}%e`,
              ]
            : [
                ...state.activeFiles.map((file) => file.path),
                `-${target}<${origin}%e`,
              ]
          : [
              ...state.activeFiles.map((file) => file.path),
              `-${target}<${origin}`,
            ];

      return args
    })()

    const process = new Exif(state.exifPath);

    const report = await process.writeData(writeArgs)
    commit('UPDATE_FILE_TREE');

    // if (state.activeFiles && state.activeFiles.length)
    // dispatch('updateExif', state.activeFiles[0].path)

    // @TODO VALIDATE IF ALL FILES HAVE BEEN CHANGED
    return [report.toString(),
      /Warning/.test(report.toString())
        ? true
        : false]
  },

  async checkAutoComplete({ commit }, payload) {
    const process = new Exif(state.exifPath);
    const folder = state.fileTree.path;
    const searchString = `-*${ payload }*`

    let matches = await process.readData([folder, searchString, '-r']);

    try {
      matches = JSON.parse(matches.toString())
    }
    catch (e) {
      alert(
        `An error occured while parsing data \n ${ e } \n
        ${matches.toString()}`
      );
    }

    const suggestions = new Set();

    matches.forEach(match => {
      for (const prop in match) {
        if (prop.match(new RegExp(payload, 'i'))) {
          suggestions.add(prop)
        }
      }
    })
    commit('UPDATE_SUGGESTIONS', [...suggestions])
  },

  openFileBrowser({ dispatch }) {
    return new Promise(resolve => {
      dialog.showOpenDialog({ properties: ['openDirectory'] }).then((data) => {
        if (!data.canceled && data.filePaths[0]) {
          dispatch('buildFileTree', data.filePaths[0]);
          resolve()
        }
      });
    })
  },

  async updateExif({ commit }, payload) {
    const process = new Exif(state.exifPath);
    const x = await process.readData([payload, '-G']);
    let parsedData;

    try {
       parsedData = JSON.parse(x.toString())[0];
     } catch (e) {
      alert(e)
    }

     const tagObject = {};
     let currentTag = '';

     for (const tag in parsedData) {
       if (/\w+(?=:)/.test(tag)) {

         switch (currentTag) {

           case undefined:
             currentTag = tag.match(/\w+/)[0];
             tagObject[currentTag] = [
               { [tag.match(/(?<=:)\w+/i)[0]]: parsedData[tag] },
             ];
             break;

           case tag.match(/\w+/)[0]:
             tagObject[currentTag].push({
               [tag.match(/(?<=:)\w+/i)]: parsedData[tag],
             });
             break;

           default:
             currentTag = tag.match(/\w+/)[0];
             tagObject[currentTag] = [
               { [tag.match(/(?<=:)\w+/i)]: parsedData[tag] },
             ];
         }
       }
     }

     commit('UPDATE_EXIF', tagObject)
     commit('SET_INFO_FIELDS');
  },
  async updateFilePreview({ commit }, payload) {
    const filePreview = await pipeFile(payload)

    commit('UPDATE_FILE_PREVIEW', filePreview.toString('base64'))
  },
  async updateFolderPreview({ state, commit }, payload) {
    if (state.thumbFolder != payload) {
      state.thumbFolder = payload;
      const previewFiles = await pipeFolder(payload, state.previewFolderWidth );
      commit('UPDATE_FOLDER_PREVIEW', previewFiles)
    }

  }
}

const getters = {
  activeFiles: (state) => state.activeFiles,
  activeFolder: (state) => [state.activeFolder],
  checkAuto: (state) => state.checkAutoComplete,
  fileTree: (state) => state.fileTree,
  getPreviewImage: (state) => state.previewImage,
  infoFields: (state) => state.infoFields,
  metaData: (state) => state.metaData,
  rootFolder: (state) => state.fileTree ? state.fileTree.path.match(/\w+$/i)[0] : null,
  suggestions: (state) => state.autoComplete,
  sliderHeight: (state) => state.previewFolderHeight,
  thumbnails: (state) => state.folderPreview,
  tabs: (state) => {
    const tabs = [];
    for (const tab in state.metaData) {
      tabs.push(tab)
    }
    return tabs
  },
}

const workSpace = { state, mutations, actions, getters }

export default workSpace;

