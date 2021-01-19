import VueDraggableResizable from 'vue-draggable-resizable';
import 'vue-draggable-resizable/dist/VueDraggableResizable.css';
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/antd.css';

import Text from './Text.vue';
import Image from './Image.vue';
import Audio from './Audio.vue';
import Lottie from './Lottie.vue';

let targetPlugin;
switch (process.env.VUE_APP_PLUGIN) {
  case 'image':
    targetPlugin = Image;
    break;
  case 'audio':
    targetPlugin = Audio;
    break;
  case 'lottie':
    targetPlugin = Lottie;
    break;
  default:
    targetPlugin = Text;
    break;
}

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
