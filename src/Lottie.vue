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
          <lottie
            v-if="model.path"
            renderer="svg"
            :loop="model.loop"
            :autoplay="model.autoplay"
            :path="model.path"
            @getLottieInstance="getLottieInstance"
          />
        </vue-draggable-resizable>
      </div>
    </div>
    <p>Lottie Source:</p>
    <sb-asset-selector :uid="uid" field="path"> </sb-asset-selector>
    <div v-if="model.path">
      <p>Speed:</p>
      <vue-slider
        :contained="true"
        :min="1"
        :max="20"
        v-model="model.speed"
        :tooltip-formatter="value => value / 10"
        @change="speedChange"
      />
    </div>
  </div>
</template>

<script>
import Lottie from 'vue-lottie-web';

export default {
  components: { Lottie },
  mixins: [window.Storyblok.plugin],
  data() {
    return {
      lottieInstance: ''
    };
  },
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
        plugin: 'draggable-resizable-lottie',
        width: 80,
        height: 80,
        x: 0,
        y: 0,
        loop: true,
        autoplay: true,
        speed: 10,
        // path:
        //   'https://assets9.lottiefiles.com/datafiles/MUp3wlMDGtoK5FK/data.json'
        path: ''
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
    speedChange(value) {
      if (!this.lottieInstance) {
        return;
      }
      this.lottieInstance.setSpeed(value / 10);
    },
    onWindwoResize() {
      const scale = (window.innerWidth - 20) / 290;
      if (scale <= 1) {
        return;
      }
      this.$refs.scale.style.transform = `scale(${scale})`;
      this.$refs.scale.style.marginBottom = `${164 * (scale - 1)}px`;
    },
    getLottieInstance(lottieInstance) {
      this.lottieInstance = lottieInstance;
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
