<template>
  <section class="product-upload">
    <v-form ref="add-product-form" class="grey-form" @submit.prevent="addProduct()">

      <v-text-field
        v-model="product.title"
        :rules="rules.notEmpty"
        label="Title"
        autofocus
        required
      ></v-text-field>

      <v-text-field
        v-model="product.desc"
        :rules="rules.notEmpty"
        :textarea="true"
        label="Tell us about it"
        required
      ></v-text-field>

      <upload-img @uploadImg="addImg" :imgs="product.imgs"></upload-img>

      <categories-picker @selectedCategories="setSelectedCategories($event)"></categories-picker>

      <div class="flex">
        <v-spacer></v-spacer>
        <v-btn type="submit">upload</v-btn>
      </div>

    </v-form>
  </section>
</template>

<script>
// @ is an alias to /src
import UploadImg from '@/cmps/product-upload/UploadImg.vue';
import CategoriesPicker from '@/cmps/general/CategoriesPicker.vue';
import EventBusService, { EVENTS } from '../services/EventBusService.js';

export default {
  name: 'ProductUpload',
  created() {
    this.product.ownerId = this.$store.getters.getLoggedInUser._id;
  },
  data() {
    return {
      product: {
        title: '',
        desc: '',
        imgs: [],
        categories: [],
        ownerId: null,
      },
      rules: {
        notEmpty: [input => input.length > 0]
      }
    };
  },
  methods: {
    previewImage(event) {
      // Reference to the DOM input element
      let input = event.target;
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
        // create a new FileReader to read this image and convert to base64 format
        let reader = new FileReader();
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
    setSelectedCategories(categories) {
      this.product.categories = categories;
    },
    addProduct() {
      if (!validateForm(this)) return;

      this.$store
        .dispatch({ type: 'addProduct', product: this.product })
        .then(() => {
          this.$router.push('/browseProducts');
          EventBusService.$emit(EVENTS.DISPLAY_USER_MSG, {
            title: 'ever heard of',
            desc: 'a boy that traded up from a pin to a house?'
          });
        })
        .catch(err => console.log({ err }));

      function validateForm(that) {
        const isTxtInputsValid = that.$refs['add-product-form'].validate();
        if (!isTxtInputsValid) {
          EventBusService.$emit(EVENTS.DISPLAY_USER_MSG, {
            title: 'please fill out',
            desc: 'the text inputs in the form',
            success: false
          });
          return false;
        } else if (that.product.imgs.length < 1) {
          EventBusService.$emit(EVENTS.DISPLAY_USER_MSG, {
            title: 'please pick',
            desc: 'atleast one product picture',
            success: false
          });
          return false;
        } else if (that.product.categories.length < 1) {
          EventBusService.$emit(EVENTS.DISPLAY_USER_MSG, {
            title: 'please pick',
            desc: 'atleast one category that describes your product',
            success: false
          });
          return false;
        } else return true;
      }
    },
    addImg(urlPath) {
      this.product.imgs.push(urlPath);
    }
  },
  components: {
    UploadImg,
    CategoriesPicker
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
  width: 50%;
}
.file-upload-form,
.image-preview {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  padding: 20px;
}
img.preview {
  width: 200px;
  background-color: white;
  border: 1px solid #ddd;
  padding: 5px;
}
</style>