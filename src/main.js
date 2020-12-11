import Plugin from './Plugin.vue';
import VueDraggableResizable from 'vue-draggable-resizable';
import 'vue-draggable-resizable/dist/VueDraggableResizable.css';
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/antd.css';

if (process.env.NODE_ENV == 'development') {
  window.Fieldtype = Plugin;
  let customComp = window.Storyblok.vue.extend(window.Fieldtype);
  window.Storyblok.vue.component('custom-plugin', customComp);

  window.StoryblokPluginRegistered = true;
} else {
  let init = Plugin.methods.initWith();
  window.storyblok.field_types[init.plugin] = Plugin;
}

window.Storyblok.vue.component(
  'vue-draggable-resizable',
  VueDraggableResizable
);
window.Storyblok.vue.component('vue-slider', VueSlider);
