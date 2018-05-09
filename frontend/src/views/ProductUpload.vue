<template>
  <section class="product-upload">
    <form @submit.prevent="addProduct">
    <div class="field is-horizontal">
  <div class="field-label is-normal">
    <label class="label">Item title</label>
  </div>
  <div class="field-body">
    <div class="field">
      <div class="control">
        <input class="input" v-model="product.title" type="text" placeholder="Add your product title" required>
        <upload-img @uploadImg="addImg"></upload-img>
          <div v-if="product.imgs">
          <img :src="product.imgs[0]" height="100" width="100">
          <img :src="product.imgs[1]" height="100" width="100">
          <img :src="product.imgs[2]" height="100" width="100">
          <img :src="product.imgs[3]" height="100" width="100">
          <img :src="product.imgs[4]" height="100" width="100">
          </div>
      </div>
    </div>
  </div>
</div>

<div class="field is-horizontal">
  <div class="field-label is-normal">
    <label class="label">Categories</label>
  </div>
  <div class="field-body">
    <div class="field is-narrow">
      <div class="control">
          <input type="checkbox"  value="toys" v-model="product.categories" >
          <label for="toys"> Toys </label>
          <input type="checkbox"  value="car" v-model="product.categories">
          <label for="car"> Car related </label>
          <input type="checkbox"  value="vintage" v-model="product.categories">
          <label for="vintage"> Vintage items</label>
      </div>
      </div>
    </div>
  </div>

<div class="field is-horizontal">
  <div class="field-label is-normal">
    <label class="label">Description</label>
  </div>
  <div class="field-body">
    <div class="field is-narrow">
      <div class="control">
        <textarea v-model="product.desc" required class="textarea" placeholder="Add a few details about your item"></textarea>
      </div>
    </div>
  </div>
</div>

<div class="field is-horizontal">
  <div class="field-label is-normal">
    <label class="label">In exchange for:</label>
  </div>
  <div class="field-body">
    <div class="field is-narrow">
      <div class="control">
         <input type="checkbox" value="electronics" v-model="product.desiredSwapCategories">
          <label for="electronics"> Electronics </label>
          <input type="checkbox" value="car" v-model="product.desiredSwapCategories">
          <label for="car"> Car related </label>
          <input type="checkbox" value="vintage" v-model="product.desiredSwapCategories">
          <label for="vintage"> Vintage items</label>
      </div>
    </div>
  </div>
</div>

<div class="field is-horizontal">
  <div class="field-label is-normal">
    <label class="label">Trade location:</label>
  </div>
  <div class="field-body">
    <div class="field is-narrow">
      <div class="control">
        <div class="select is-fullwidth">
          <select required v-model="product.location">
            <option disabled value="">Please select location</option>
            <option>Tel aviv</option>
            <option>Haifa</option>
            <option>Ramat Gan</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="field is-horizontal">
  <div class="field-label">
    <!-- Left empty for spacing -->
  </div>
  <div class="field-body">
    <div class="field">
      <div class="control">
        <button type="submit" class="button is-primary">
          Upload Product
        </button>
      </div>
    </div>
  </div>
</div>
</form>
  </section>
</template>

<script>
// @ is an alias to /src
import UploadImg from "@/cmps/product-upload/UploadImg";

export default {
  name: "ProductUpload",
  created() {
    this.product.ownerId = this.$store.getters.getLoggedInUser._id;
  },
  data() {
    return {
      product: {
        createdAt: null,
        title: "Sample product title",
        imgs: [],
        categories: ["toys"],
        desiredSwapCategories: ["vintage"],
        desc: "Sample description for a product",
        ownerId: null,
        bidIds: [],
        location: "Haifa",
        isLive: true
      }
    };
  },

  methods: {
    previewImage(event) {
      // Reference to the DOM input element
      var input = event.target;
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
        // create a new FileReader to read this image and convert to base64 format
        var reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = e => {
          // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
          // Read image as base64 and set to imageData
          this.imageData = e.target.result;
        };
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0]);
      }
    },

    onFileChanged(ev) {
      this.product.imgs.push(ev.target.value);
    },
    // previewImage: function(event) {
    //   // Reference to the DOM input element
    //   var input = event.target;
    //   // Ensure that you have a file before attempting to read it
    //   if (input.files && input.files[0]) {
    //     // create a new FileReader to read this image and convert to base64 format
    //     var reader = new FileReader();
    //     // Define a callback function to run, when FileReader finishes its job
    //     reader.onload = e => {
    //       // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
    //       // Read image as base64 and set to imageData
    //       this.imageData = e.target.result;

    //       console.log('this.imageData', e.target.result);
    //     };
    //     // Start the reader job - read file as a data url (base64 format)
    //     reader.readAsDataURL(input.files[0]);
    //   }
    // },

    // onFileChanged(ev) {
    //   console.log(ev);
    //   console.log(ev.target.value);
    //   this.product.imgs.push(ev.target.value);
    // },
    addProduct() {
      this.product.createdAt = Date.now();

      this.$store
        .dispatch({ type: "addProduct", product: this.product })
        .then(_ => this.$router.push("/"))
        .catch(err => console.log({ err }));
    },
    addImg(urlPath) {
      this.product.imgs.push(urlPath);
      console.log("img uploaded");
    }
  },
  components: {
    UploadImg
  }
};
</script>

<style scoped>
body {
  margin: 0 auto;
}

.control {
  width: 500px;
}

.input {
  width:50%;
}

.md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }

.file-upload-form,
.image-preview {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  padding: 20px;
}
img.preview {
  width: 200px;
  background-color: white;
  border: 1px solid #ddd;
  padding: 5px;
}
</style>

