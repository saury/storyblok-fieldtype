import VueDraggableResizable from 'vue-draggable-resizable';
import 'vue-draggable-resizable/dist/VueDraggableResizable.css';
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/antd.css';

import Text from './Text.vue';
import Image from './Image.vue';

const targetPlugin = process.env.VUE_APP_PLUGIN === 'image' ? Image : Text;

if (process.env.NODE_ENV == 'development') {
  window.Fieldtype = targetPlugin;
  let customComp = window.Storyblok.vue.extend(window.Fieldtype);
  window.Storyblok.vue.component('custom-plugin', customComp);

  window.StoryblokPluginRegistered = true;
} else {
  let init = targetPlugin.methods.initWith();
  window.storyblok.field_types[init.plugin] = targetPlugin;
}

window.Storyblok.vue.component(
  'vue-draggable-resizable',
  VueDraggableResizable
);
window.Storyblok.vue.component('vue-slider', VueSlider);
