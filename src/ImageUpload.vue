<template>
  <div class="uk-placeholder uk-margin-bottom-remove uk-margin-top-remove">
    <div v-if="value" class="uk-flex uk-flex-middle uk-margin-small-bottom">
      <img :src="previewImage" class="image" />
      <input :value="value" class="uk-form-small uk-flex-item-auto" />
      <a :href="value" class="image__btn" target="_blank">
        <i class="uk-icon-search" />
      </a>
      <a class="image__btn" @click.prevent="$emit('input', '')">
        <i class="uk-icon-close" />
      </a>
    </div>
    <hr v-if="value" />
    <label class="uk-form-file uk-button uk-button-small uk-button-primary">
      <span class="util__nobreak">
        <i class="uk-icon-upload" /> Upload new
      </span>
      <input
        class="upload-select"
        accept="image/x-png,image/png,image/gif,image/jpeg,image/svg+xml"
        type="file"
        @change="uploadImage"
      />
    </label>
  </div>
</template>

<script>
import upload from './utils/upload';

export default {
  // Because we need some of the
  // properties set in the base
  // `Plugin` component, we can use
  // provide / inject to easily get
  // access to those.
  inject: ['plugin'],
  props: {
    value: {
      type: String,
      required: true,
      default: ''
    }
  },
  computed: {
    previewImage() {
      return this.value.replace(
        'a.storyblok.com',
        'img2.storyblok.com/160x90/filters:fill(auto,0)'
      );
    }
  },
  methods: {
    async uploadImage(e) {
      try {
        // eslint-disable-next-line
        console.log(this.plugin);
        const data = await upload({
          accessToken: this.plugin.options.accessToken,
          client: this.plugin.api.client,
          file: e.target.files[0],
          spaceId: this.plugin.spaceId
        });
        this.$emit('input', data.pretty_url);
      } catch (error) {
        throw error;
      }
    }
  }
};
</script>
