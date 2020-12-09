<template>
  <div>
    <div class="grid">
      <div class="row" v-for="(row, r_idx) in 16" :key="r_idx">
        <div class="cell" v-for="(cell, c_idx) in 9" :key="c_idx"></div>
      </div>
    </div>
    <div>
      column start: <input class="uk-width-1-1" v-model="model.c_start" />
    </div>
    <div>row start: <input class="uk-width-1-1" v-model="model.r_start" /></div>
    <div>row end: <input class="uk-width-1-1" v-model="model.r_end" /></div>
    <div>column end: <input class="uk-width-1-1" v-model="model.c_end" /></div>
    <div>
      image uploader
      <input type="file" class="uk-width-1-1" />
    </div>
  </div>
</template>

<script>
export default {
  mixins: [window.Storyblok.plugin],
  methods: {
    initWith() {
      return {
        // needs to be equal to your storyblok plugin name
        plugin: 'grid-test',
        title: '',
        description: '',
        row: 16,
        column: 9
      };
    },
    pluginCreated() {
      // eslint-disable-next-line
      console.log(
        'View source and customize: https://github.com/storyblok/storyblok-fieldtype'
      );
    }
  },
  watch: {
    model: {
      handler: function(value) {
        this.$emit('changed-model', value);
      },
      deep: true
    }
  }
};
</script>

<style>
.grid {
  display: flex;
}
.cell {
  width: 12px;
  height: 12px;
  margin: 2px;
  background: #ddd;
}
</style>
