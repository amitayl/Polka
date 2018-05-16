<template>
    <section class="flex align-center">
      <form @submit.prevent="searchProducts()">
          <select v-model="selectedCategory" @change="searchProducts()" @focus="selectedCategory=null">
            <option v-for="category in categories" 
                    :key="category.title" :value="category.value">{{category.title}}</option>
          </select>
          <input v-model="searchStr"
                  ref="search"
                  type="search" 
                  class="search" 
                  placeholder="Find some stuff"/>
          <button type="submit">🔎</button> 
      </form>
    </section>
</template>

<script>
import { PRODUCT_ACTIONS, PRODUCT_MUTATIONS } from '@/store/ProductStore.js';

export default {
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
              { title: { $regex: `.*${this.searchStr}.*` } },
              { desc: { $regex: `.*${this.searchStr}.*` } }
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
}
select {
  height: 100%;
  background: whitesmoke;
  padding: 0 10px;
}
.search {
  height: 100%;
  border: 1px solid gray;
  padding: 10px 15px;
  font-size: 1rem;
}
.search::first-letter {
  text-transform: uppercase;
}
button[type='submit'] {
  border: 1px solid lightgray;
  width: 50px;
}
</style>
