<template>
  <div>
    <div class="wrapper">
      <p>Preview:</p>
      <div class="grid" ref="scale">
        <div class="row" v-for="(row, r_idx) in 16" :key="r_idx">
          <div class="cell" v-for="(cell, c_idx) in 9" :key="c_idx"></div>
        </div>
        <vue-draggable-resizable
          v-if="model.audio"
          :w="model.width"
          :h="model.height"
          :x="model.x"
          :y="model.y"
          @dragging="onDrag"
          @resizing="onResize"
          :parent="true"
        >
          <audio v-if="model.controls" style="height: 40px;" controls muted>
            <source :src="model.audio" />
            Your browser does not support the audio element.
          </audio>
          <div class="play" v-else></div>
        </vue-draggable-resizable>
      </div>
    </div>
    <p>Audio:</p>
    <sb-asset-selector :uid="uid" field="audio"> </sb-asset-selector>
    <label class="uk-display-block uk-margin-top">
      <input class="uk-checkbox" type="checkbox" v-model="model.controls" />
      With Controls
    </label>
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
        plugin: 'draggable-resizable-audio',
        width: 200,
        height: 50,
        x: 0,
        y: 0,
        audio: '',
        controls: true
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

.play {
  display: block;
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 12px solid #2c3e50;
  margin: 10px auto 10px auto;
  position: relative;
  z-index: 1;
  transition: all 0.3s;
  left: 2px;
}
.play:before {
  content: '';
  position: absolute;
  top: -15px;
  left: -23px;
  bottom: -15px;
  right: -7px;
  border-radius: 50%;
  border: 2px solid #2c3e50;
  z-index: 2;
  transition: all 0.3s;
}
.play:after {
  content: '';
  opacity: 0;
  transition: opacity 0.6s;
}
.play:hover:before,
.play:focus:before {
  transform: scale(1.1);
}
.play.active {
  border-color: transparent;
}
.play.active:after {
  content: '';
  opacity: 1;
  width: 10px;
  height: 16px;
  background: #2c3e50;
  position: absolute;
  right: 1px;
  top: -8px;
  border-left: 4px solid #2c3e50;
  box-shadow: inset 6px 0 0 0 #f9f9f9;
}
</style>
