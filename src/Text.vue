<template>
  <div>
    <div class="wrapper">
      <p>Preview:</p>
      <div class="grid" ref="scale">
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
          :style="{ fontSize: model.size + 'px', lineHeight: model.lh / 10 }"
        >
          <span v-html="model.text"></span>
        </vue-draggable-resizable>
      </div>
    </div>
    <p>Text:</p>
    <input class="uk-width-1-1" v-model="model.text" />
    <p>Font Size:</p>
    <vue-slider :contained="true" :min="1" v-model="model.size" />
    <p>Line Height:</p>
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
  mounted() {
    this.onWindwoResize();
    this.$nextTick(() => {
      window.addEventListener('resize', this.onWindwoResize);
    });
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onWindwoResize);
  },
  methods: {
    initWith() {
      return {
        // needs to be equal to your storyblok plugin name
        plugin: 'draggable-resizable-text',
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
    },
    onWindwoResize() {
      const scale = (window.innerWidth - 20) / 290;
      if (scale <= 1) {
        return;
      }
      this.$refs.scale.style.transform = `scale(${scale})`;
      this.$refs.scale.style.marginBottom = `${164 * (scale - 1)}px`;
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
  transform-origin: left top;
}
.cell {
  width: 18px;
  height: 18px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  background: #fff;
}
</style>
