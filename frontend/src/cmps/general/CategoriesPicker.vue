<template>
  <section class="categories-picker flex">
      <label v-for="category in categories" 
             :key="category.title">
          {{category.title}}
          <div class="category-img" 

               :style="{backgroundImage: 'url(' + getImgUrl(category.img) + ')'}"></div>
          <input type="checkbox" :value="category.value" v-model="selectedCategories">
      </label>
  </section>
</template>

<script>
export default {
  data() {
    return {
      selectedCategories: [],
      categories: [
        {
          title: 'art',
          img: 'art.svg',
          imgSelected: 'art-white.svg',
          value: 'art'
        },
        {
          title: 'electronics',
          img: 'computer.svg',
          imgSelected: 'computer-white.svg',
          value: 'electronics'
        },
        {
          title: 'fashion',
          img: 'fashion.svg',
          imgSelected: 'fashion-white.svg',
          value: 'fashion'
        },
        {
          title: 'home & Garden',
          img: 'home.svg',
          imgSelected: 'home-white.svg',
          value: 'home'
        },
        {
          title: 'music',
          img: 'music.svg',
          imgSelected: 'music-white.svg',
          value: 'music'
        },
        {
          title: 'sports',
          img: 'sports.svg',
          imgSelected: 'sports-white.svg',
          value: 'sport'
        }
      ]
    };
  },
  watch: {
    selectedCategories() {
      this.$emit('selectedCategories', this.selectedCategories);
    }
  },
  methods: {
    getImgUrl(img) {
      return '/assets/imgs/' + img;
    }
  }
};
</script>

<style scoped>
.category-img {
  height: 70px;
  width: 70px;
  background-size: cover;
}
</style>
