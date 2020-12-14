<template>
  <div>
    <div class="wrapper">
      <div class="title">Preview:</div>
      <div class="grid">
        <div class="row" v-for="(row, r_idx) in 16" :key="r_idx">
          <div class="cell" v-for="(cell, c_idx) in 9" :key="c_idx"></div>
        </div>
        <vue-draggable-resizable
          :w="model.width"
          :h="model.height"
          :x="model.x"
          :y="model.y"
          @dragging="onDrag"
          @resizing="onResize"
          :parent="true"
        >
          <span
            :style="{ fontSize: model.size + 'px', lineHeight: model.lh / 10 }"
            v-html="model.text"
          ></span>
        </vue-draggable-resizable>
      </div>
    </div>
    <div>Text: <input class="uk-width-1-1" v-model="model.text" /></div>
    <p>
      Font Size:
    </p>
    <vue-slider :contained="true" :min="1" v-model="model.size" />
    <p>
      Line Height:
    </p>
    <vue-slider
      :contained="true"
      :min="1"
      :max="50"
      v-model="model.lh"
      :tooltip-formatter="value => value / 10"
    />
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
        text: 'Input your text',
        width: 160,
        height: 40,
        x: 0,
        y: 0,
        size: 24,
        lh: 18
      };
    },
    onResize: function(x, y, width, height) {
      this.model.x = x;
      this.model.y = y;
      this.model.width = width;
      this.model.height = height;
    },
    onDrag: function(x, y) {
      this.model.x = x;
      this.model.y = y;
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
  display: inline-flex;
  border: 1px solid #ccc;
  position: relative;
}
.cell {
  width: 18px;
  height: 18px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  background: #fff;
}
</style>
