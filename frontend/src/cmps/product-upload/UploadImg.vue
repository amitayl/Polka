
<template>
<section class="upload-img">
    <div class="file flex relative">
      <label class="file-label">
        <button @click.prevent class="upload-img-btn" :class="{disabled: imgs.length===3}" 
                :disabled="loadingImg || imgs.length === 3">
          <v-icon v-if="!loadingImg" :size="50">add</v-icon>
          <img v-else src="@/assets/gifs/loading1.gif" alt="loading gif">
        </button>
        <input :disabled="loadingImg || imgs.length === 3" 
                class="above-btn" type="file" accept="image/*" required
                @change="upload($event.target.files)"/>
      </label>
      <div class="overlay-catcher" v-for="imgSrc in imgs" :key="imgSrc">
        <div class="img" :class="{round: round}" 
             :style="{'backgroundImage': `url(${imgSrc})`}"></div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
export default {
  props: ['imgs', 'round'],
  data() {
    return {
      cloudinary: {
        uploadPreset: 'yezwubfp',
        apiKey: '142484333591595',
        cloudName: 'amielsosa'
      },
      loadingImg: false,
      thumb: {
        url: ''
      },
      thumbs: []
    };
  },
  computed: {
    clUrl() {
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
      this.loadingImg = true;
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
        // this.uploadImgCount++;
        this.loadingImg = false;
      });
    }
  }
};
</script>

<style scoped>
.file {
  box-sizing: content-box;
  height: 70px;
}
.file div,
.file button {
  border-radius: 5px;
}
.file-label {
  display: inline-block;
  height: 100%;
}
.file-label:hover {
  cursor: pointer;
}
.above-btn {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  height: 100%;
  width: 70px;
}
.above-btn:hover {
  cursor: pointer;
}
input:hover {
  cursor: pointer;
}
.upload-img-btn {
  box-shadow: inset 0 0 0 5px #3b4855;
  background: lightgray;
  height: 100%;
  width: 70px;
}
.upload-img-btn:hover {
  background-color: rgb(179, 169, 169);
}
.upload-img-btn.disabled {
  cursor: no-drop;
  background-color: lightgray;
  box-shadow: inset 0 0 0 5px gray;
}
.upload-img-btn.disabled i {
  color: gray;
  cursor: initial;
}
.upload-img-btn img {
  height: 70%;
  width: 70%;
}
.overlay-catcher {
  position: relative;
  margin-left: 10px;
}
div.img {
  height: 70px;
  width: 70px;
  background-size: cover;
  background-position: center;
}
div.img.round {
  border-radius: 50%;
}
div.img::after {
  content: '';
  position: absolute;
  z-index: 3;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  color: rgba(207, 213, 250, 0.4);
}
</style>
