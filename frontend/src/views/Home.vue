<template>
  <section class="home">
    <section class="page-header">
      <div class="search-bar">
        <h2 class="page-headline">Polka Barter</h2>
        <p class="page-ampersant">STOP BUYING. </p>
        <h3 class="page-subtitle">START TRADING.</h3>
        <search-form :hideCategories="true"></search-form>
      </div>
    </section>

    <h2 class="home-section-headline display-1">why polka?</h2>

    <ul class="qualities margin-sides">
      <li 
        v-for="(quality, idx) in qualities" 
        :key="idx"
        class="quality flex flex-column 
        justify-center align-center elevation-2">
        <v-icon class="quality-icon" :size="100">{{quality.icon}}</v-icon>
        <h3 class="quality-headline">{{quality.txt}}</h3>
      </li>
    </ul>
    
    <h2 class="home-section-headline display-1">Latest trades</h2>

    <!-- <v-carousel v-if="featuredProducts" class="featured-products" hide-controls hide-delimiters>
      <v-carousel-item v-for="(product, idx) in featuredProducts" :src="product.imgs[0]" :key="idx">
        <div class="curr-product-details">
          <h3 class="curr-product-title">{{product.title}}</h3>
          <h4 class="curr-product-desc">{{product.desc.substr(0, 70)}}<span v-if="product.desc.length > 70">...</span></h4>
        </div>
      </v-carousel-item>
    </v-carousel> -->

    <v-carousel class="featured-products" hide-controls hide-delimiters>
      <v-carousel-item v-for="(product, idx) in recentTrades" :src="product.img" :key="idx">
      </v-carousel-item>
    </v-carousel>

    <footer>
      Made with
      <v-icon>favorite</v-icon>
      by Polka
    </footer>
  
  </section>
</template>

<script>
import SearchForm from '../cmps/general/app-header/SearchForm.vue';
import ProductService from '@/services/ProductService.js';

export default {
  props: {
    isMobile: {
      type: Boolean,
      required: true
    }
  },
  created() {
    // const sortBy = { viewCount: -1 };
    // ProductService.query({}, {}, undefined, sortBy, 3).then(products => {
    //   products;
    //   this.featuredProducts = products;
    // });
  },
  data() {
    return {
      qualities: [
        {
          icon: 'attach_money',
          txt: 'Save Money'
        },
        {
          icon: 'local_florist',
          txt: 'Go Green'
        },
        {
          icon: 'tag_faces',
          txt: 'Meet Awesome People'
        }
      ],
      featuredProducts: null,
      recentTrades: [
        {
        img: "../imgs/carousel/slide1.jpg"
      },
        {
        img: "../imgs/carousel/slide2.jpg"
      },
        {
        img: "../imgs/carousel/slide3.jpg"
      },
      ]
    };
  },
  components: {
    SearchForm
  }
};
</script>

<style scoped>
/* local helper */
.margin-sides {
  margin-left: 5vw;
  margin-right: 5vw;
}
.page-header {
  background-image: url('https://designroast.org/wp-content/uploads/2014/02/pattern-subtlepatterns.png');
  background-size: cover;
  background-position: center;
}
.search-bar {
  padding: 30px 20px;
}
@media (min-width: 900px) {
  .search-bar {
    padding: 50px 0;
  }
}
.page-headline {
  font-size: 60px;
  font-weight: bold;
  color: #4db6ac;
  text-shadow: -1px 1px 1px darkslategrey, -2px 2px 1px darkslategrey,
    -3px 3px 1px darkslategrey, -4px 4px 1px darkslategrey,
    -5px 5px 1px darkslategrey, -6px 6px 1px darkslategrey,
    -7px 7px 1px darkslategrey, -8px 8px 1px darkslategrey,
    -9px 9px 1px darkslategrey;
}
.page-ampersant {
  color: #4db6ac;
  font-size: 30px;
  font-weight: bold;
  text-shadow: -1px 1px 1px darkslategrey, -2px 2px 1px darkslategrey,
    -3px 3px 1px darkslategrey;
  margin: 10px 0;
}
.page-subtitle {
  padding: 0 20px;
  color: #4db6ac;
  font-style: italic;
  font-size: 30px;
  text-shadow: -1px 1px 1px darkslategrey, -2px 2px 1px darkslategrey,
    -3px 3px 1px darkslategrey;
  margin-bottom: 30px;
}
.search-form {
  justify-content: center;
  margin: 0 auto;
  border-radius: 20px;
  width: 90%;
  max-width: 400px;
}
.home .search-form-form {
  margin: 20px 0;
}
@media (min-width: 900px) {
  .page-headline {
    font-size: 80px;
  }
  .page-ampersant {
    font-size: 50px;
    margin: 20px 0;
  }
  .page-subtitle {
    font-size: 40px;
    margin-bottom: 60px;
  }
  .search-form {
    transform: scale(1.3);
  }
  .home .search-form-form {
    flex-direction: initial;
    margin: initial;
  }
}
.home .search-form-category {
  display: none;
}
.home-section-headline {
  text-transform: capitalize;
  margin-top: 40px;
  margin-bottom: 30px;
}
.qualities {
  list-style-type: none;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(1, 200px);
  grid-gap: 40px;
}
.quality {
  color: darkslategrey;
  height: 200px;
}
.quality-icon {
  margin-bottom: 10px;
}
.quality-headline {
  font-size: 20px;
  font-weight: bold;
}
.featured-products {
  margin: 0 auto;
  height: 200px;
  width: 90%;
  max-width: 800px;
}
.curr-product-details {
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: left;
  background-color: rgba(255, 255, 255, 0.6);
  padding: 10px 20px;
}
.curr-product-title {
  font-size: 20px;
}
.curr-product-desc {
  font-family: monospace;
  font-size: 14px;
}
@media (min-width: 450px) {
  .qualities {
    grid-template-columns: repeat(2, 1fr);
  }
  .featured-products {
    height: 300px;
  }
}

@media (min-width: 750px) {
  .qualities {
    grid-template-columns: repeat(3, 1fr);
  }
  .featured-products {
    height: 400px;
  }
}
footer {
  margin-top: 30px;
  padding: 10px 0;
  background-color: #4db6ac;
}
</style>