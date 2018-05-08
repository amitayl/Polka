
<template>
  <div class="field-body">
    <div class="field">
      <div class="control">
        <div class="file">
          <label class="file-label">
            <input type="file" accept="image/*" class="form-control" 
              v-on:change="upload($event.target.files)" required/>
          </label>
        </div>
      </div>
    </div>
  </div> 
</template>

<script>
import axios from 'axios';
export default {
  data: function() {
    return {
      cloudinary: {
        uploadPreset: 'yezwubfp',
        apiKey: '142484333591595',
        cloudName: 'amielsosa'
      },
      thumb: {
        url: ''
      },
      thumbs: []
    };
  },
  computed: {
    clUrl: function() {
      return `https://api.cloudinary.com/v1_1/${
        this.cloudinary.cloudName
      }/upload`;
    }
  },
  methods: {
    addThumb() {
      this.thumbs.unshift(this.thumb);
    },
    upload(file) {
      const formData = new FormData();
      formData.append('file', file[0]);
      formData.append('upload_preset', this.cloudinary.uploadPreset);
      formData.append('tags', 'gs-vue,gs-vue-uploaded');
      // For debug purpose only
      // Inspects the content of formData
      // for (var pair of formData.entries()) {
      //   console.log(pair[0] + ', ' + pair[1]);
      // }
      axios.post(this.clUrl, formData).then(res => {
        this.$emit('uploadImg', res.data.secure_url);
        this.thumbs.unshift({
          url: res.data.secure_url
        });
      });
    }
  }
};
</script>

<style>

</style>
