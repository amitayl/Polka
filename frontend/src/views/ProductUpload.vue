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
        <input class="input is-danger" v-model="product.title" type="text" placeholder="Add your product title">
          <div class="file">
           <label class="file-label">
          <input class="file-input" type="file" @change="onFileChanged($event)">
          <span class="file-cta">
        <span class="file-icon">
           <i class="fas fa-upload"></i>
        </span>
           <span class="file-label">
           Upload an image
      </span>
    </span>
  </label>
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
          <input type="checkbox"  value="toys" v-model="product.categories">
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
    <div class="field">
      <div class="control">
        <textarea class="textarea" placeholder="Add a few details about your item"></textarea>
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
          <select v-model="product.location">
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
          <div>
              <div class="file-upload-form">
                  Upload an image file:
                  <input type="file" @change="previewImage" accept="image/*">
              </div>
              <div class="image-preview" v-if="imageData.length > 0">
                  <img class="preview" :src="imageData">
              </div>
          </div>

  </section>
</template>

<script>
// @ is an alias to /src

export default {
  name: "ProductUpload",
  created() {
    this.product.ownerId = this.$store.getters.getLoggedInUser._id;
  },
  data() {
    return {
      imageData: "  // we will store base64 format of image in this string",
      product: {
        createdAt: null,
        title: "hey",
        imgs: [],
        categories: [],
        desiredSwapCategories: [],
        desc: "fdsfa",
        ownerId: null,
        bidIds: [],
        location: "haifa",
        isLive: true
      }
    };
  },

  methods: {
    previewImage: function(event) {
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

          console.log ('this.imageData' , e.target.result);
        };
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0]);
      }
    },

    onFileChanged(ev) {
      console.log(ev);
      console.log(ev.target.value);
      this.product.imgs.push(ev.target.value);
    },
    addProduct() {
      this.product.createdAt = Date.now();
      console.log(this.product);
      this.$store
        .dispatch({ type: "addProduct", product: this.product })
        .then(_ => this.$router.push("/"))
        .catch(err => console.log({ err }));
    }
  }
};
</script>

<style scoped>
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

