<template>
  <section class="product-upload">
    {{ product }}
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
          <!-- <input class="file-input" type="file" @change="onFileChanged"> -->
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
  </section>
</template>

<script>
// @ is an alias to /src

export default {
  name: "ProductUpload",

  data() {
    return {
      product: {
        createdAt: null,
        imgs: [],
        categories: [],
        //TODO change to plural
        desiredSwapCategories: [],
        desc: "",
        ownerId: "null",
        bidIds: [],
        location: "",
        isLive: true
      }
    };
  },
  methods: {
    addProduct() {
      this.product.createdAt = Date.now();
      this.$store.dispatch({ type: "addProduct", product: this.product })
      .then( _ => this.$router.push("/"))
      .catch(err => console.log({err}))
    }
  }
};
</script>

<style scoped>

</style>

