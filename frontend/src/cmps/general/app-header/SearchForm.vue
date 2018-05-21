<template>
    <section class="search-form flex align-center">
      <form class="search-form-form" @submit.prevent="searchProducts()">
        <select class="search-form-category" v-model="selectedCategory" @change="searchProducts()" @focus="selectedCategory=null">
          <option v-for="category in categories" 
                  :key="category.title" :value="category.value">{{category.title}}</option>
        </select>
        <input v-model="searchStr"
                ref="search"
                type="search" 
                class="search" 
                placeholder="Lets trade"/>
        <button v-if="!isMobile" type="submit"><v-icon class="search-icon">search</v-icon></button> 
        <v-icon 
          v-else 
          @click="$emit('closeSearch')"
          class="close-icon">close</v-icon> 
      </form>

    </section>
</template>

<script>
import { PRODUCT_ACTIONS, PRODUCT_MUTATIONS } from '@/store/ProductStore.js';

export default {
  props: {
    isMobile: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      selectedCategory: 'all',
      categories: [
        {
          title: 'all',
          value: 'all'
        },
        {
          title: 'art',
          value: 'art'
        },
        {
          title: 'electronics',
          value: 'electronics'
        },
        {
          title: 'fashion',
          value: 'fashion'
        },
        {
          title: 'home & Garden',
          value: 'home'
        },
        {
          title: 'music',
          value: 'music'
        },
        {
          title: 'sports',
          value: 'sport'
        }
      ],
      searchStr: null
    };
  },
  mounted() {
    this.$refs.search.focus();
  },
  methods: {
    searchProducts() {
      this.$store.commit({
        type: PRODUCT_MUTATIONS.SET_PRODUCTS,
        products: null
      });
      this.$router.push('/browseProducts');

      const inDescOrTitle = this.searchStr
        ? {
            $or: [
              { title: { $regex: `.*${this.searchStr}.*`, $options: 'i' } },
              { desc: { $regex: `.*${this.searchStr}.*`, $options: 'i' } }
            ]
          }
        : {};

      const ofCategory =
        this.selectedCategory !== 'all'
          ? {
              categories: { $in: [this.selectedCategory] }
            }
          : {};

      const queryObj = { $and: [inDescOrTitle, ofCategory] };
      this.$store.dispatch({
        type: PRODUCT_ACTIONS.SET_PRODUCTS,
        queryObj: JSON.stringify(queryObj)
      });
    }
  }
};
</script>

<style scoped>
form {
  display: flex;
  height: 40px;
  background-color: white;
  border-radius: 20px;
}
.search-form-category {
  width: 100px;
  padding: 0 10px;
  border: 1px solid lightgray;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
}
.search-form-category:hover {
  cursor: pointer;
}
.search {
  height: 100%;
  border: 1px solid gray;
  padding: 10px 15px;
  font-size: 1rem;
  min-width: 0;
}
.search::first-letter {
  text-transform: uppercase;
}
button[type='submit'] {
  border: 1px solid lightgray;
  width: 50px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
}
.search-icon {
  transform: rotateY(180deg);
}
.close-icon {
  border: 1px solid lightgray;
  width: 64px;
}
.close-icon:hover {
  cursor: pointer;
}
</style>
