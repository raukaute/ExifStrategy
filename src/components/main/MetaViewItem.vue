<template >
  <tbody
  >
    <template
      v-for="(value, name, index) in filteredMetaData"
    >
      <tr
        v-if="Array.isArray(filteredMetaData)"
        :key="name"
      >
        <template
          v-for="(value, name) in value"
        >
          <td
            :key="name"
            class="text-left">
            <span>{{ name }}</span>
          </td>
          <td
            :key="value"
            class="text-left ellipsis">
            <span :title="value">{{ value || '-' }}</span>
          </td>
        </template>
      </tr>
      <template
        v-else
      >
        <div
          :key="index"
          class="meta-subsection"
          >
          <h4 >
            {{ name }}
          </h4>
        </div>
        <tr
          v-for="(obj) in value"
          :key="obj.id"
          class="data-row"
        >
          <template
            v-for="(value, name) in obj"
          >
            <td
              :key="name"
              class="text-left"
            >
              <span>{{ name }}</span>
            </td>
            <td
              :key="value"
              class="text-left ellipsis"
            >
              <span :title="value">
                {{ value || '-'}}
              </span>
            </td>
          </template>
        </tr>

      </template>
    </template>
  </tbody>
</template>

<script>
export default {
name: 'MetaViewItem',
props: ['filteredMetaData']
}
</script>

<style lang="scss">
.ellipsis {
    position: relative;
}
.ellipsis:before {
    content: '&nbsp;';
    visibility: hidden;
}
.ellipsis span {
    position: absolute;
    left: 16px;
    right: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.meta-subsection {
  width: max-content;
  padding: 1em 12px .75em;
  text-align: left;
  h4 {
    box-shadow: inset 0 -3px 0 0 #bdb;
  }
}
</style>

