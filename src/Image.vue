<template>
  <div>
    <div class="wrapper">
      <p>Preview:</p>
      <div class="grid" ref="scale">
        <div class="row" v-for="(row, r_idx) in 16" :key="r_idx">
          <div class="cell" v-for="(cell, c_idx) in 9" :key="c_idx"></div>
        </div>
        <vue-draggable-resizable
          v-if="model.image"
          :w="model.width"
          :h="model.height"
          :x="model.x"
          :y="model.y"
          @dragging="onDrag"
          @resizing="onResize"
          :parent="true"
        >
          <img
            :style="{ width: model.width + 'px' }"
            :src="model.image"
            class="uploaded-image"
          />
        </vue-draggable-resizable>
      </div>
    </div>
    <p>Image:</p>
    <sb-asset-selector :uid="uid" field="image"> </sb-asset-selector>
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
  provide() {
    return {
      plugin: this
    };
  },
  methods: {
    initWith() {
      return {
        // needs to be equal to your storyblok plugin name
        plugin: 'draggable-resizable-image',
        width: 160,
        height: 40,
        x: 0,
        y: 0,
        image: ''
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
.uploaded-image {
  height: auto;
  display: block;
  margin: 0;
}
</style>
