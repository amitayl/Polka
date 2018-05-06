<template>
  <div class="transaction">
    <h1 >Transaction</h1>
    <button @click="upload">yosi</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cloudinary: {
        uploadPreset: 'nakw5bte',
        apiKey: '628837165216168',
        cloudName: 'df35vgajg'
      },
      thumb: {
        url:
          'https://media.istockphoto.com/photos/stop-staring-now-picture-id472857244'
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
    upload() {
      const formData = new FormData();
      formData.append('file', 'a');
      formData.append('upload_preset', this.cloudinary.uploadPreset);
      formData.append('tags', 'gs-vue,gs-vue-uploaded');
      // For debug purpose only
      // Inspects the content of formData
      for (let pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }

      axios
        .post(this.clUrl, formData)
        .then(res => {
          // this.thumbs.unshift({
          //   url: res.data.secure_url
          // });
          console.log('res', res.data);
        })
        .catch(err => {
          console.error('err', err);
        });
    }
  }
};
</script>


