<template>
  <v-row
      class="row-action-info"
      style="height: 46%"
    >
      <v-col
        class="col-file"
      >
        <h2
          class="header-info"
        >
          File Info
        </h2>
        <div
          class="file-info-wrap"
        >
          <div
            class="file-info-row"
          >
            <div
              class="file-info-item"
            >
              <span :title="infoFields.File.FileName" class="title info-value">{{ infoFields.File.FileName | stripExt }}</span>
              <span class="v-subheader">Name</span>
            </div>
            <div
              class="file-info-item"
            >
              <span class="title info-value">{{ infoFields.File.FileType | capitalize }}</span>
              <span class="v-subheader">Type</span>
            </div>
            <div
              class="file-info-item"
            >
              <span class="title info-value">{{ infoFields.File.FileSize | convertMB }}</span>
              <span class="v-subheader">Size</span>
            </div>
          </div>
          <div
            class="file-info-row"
          >
            <div
              class="file-info-item"
            >
              <span
                class="title info-value">
                {{ infoFields.Composite.ImageSize.replace('x', ' x ') }}
              </span>
              <span class="v-subheader">Dimension</span>
            </div>
             <div
              class="file-info-item"
            >
              <span class="title info-value">
                {{ infoFields.EXIF.DateTimeOriginal.split(' ')[0]  }}
              </span>
              <span class="v-subheader">Shot</span>
            </div>
            <div
              class="file-info-item"
            >
              <span class="title info-value">
                {{ infoFields.EXIF.Model }}
              </span>
              <span class="v-subheader">Shot with</span>
            </div>

          </div>
        </div>
      </v-col>
    </v-row>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
name: 'InfoPane',

computed: {
  ...mapGetters([
    'infoFields'
  ])
},

filters: {
  stripExt: (value) => {
    if (!value) return '';
    value = value.toString();
    return value.match(/\w+/i)[0]
  },

  convertMB: (value) => {
    if (!value.match(/kb/gi)) return value;
    return `${parseFloat(Math.round(value.match(/\d+/)[0]) / 1000).toFixed(1)} MB`
  }
}
}
</script>

<style>
.col-file {
  margin-bottom: 28px;
}
</style>