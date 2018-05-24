<template>
  <section class="home">
    <section class="page-header">
      <div class="search-bar">
        <h2 class="page-headline">Polka Barter</h2>
        <p class="page-ampersant">STOP BUYING.</p>
        <h3 class="page-subtitle">START TRADING.</h3>
        <search-form :hideCategories="true"></search-form>
      </div>
    </section>

    <!-- <h2 class="home-section-headline display-1">why polka?</h2> -->

      <section>
        <v-layout
          column
          wrap
          class="my-5"
          align-center
        >
          <v-flex xs12 sm4 class="my-3">
            <div class="text-xs-center">
              <h2 class="headline">Why Polka?</h2>
              <!-- <span class="subheading">
                Stop buying start trading
              </span> -->
            </div>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">attach_money</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Save Money</div>
                    </v-card-title>
                    <v-card-text>
                      With Polka you can stop buying things you don't need, and just trade the stuff you already have. 
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">local_florist</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">Help The Enviorment</div>
                    </v-card-title>
                    <v-card-text>
                      You are helping to reduce waste and your carbon footprint. There’s NO money, NO waste, and NO carbon emissions.
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">mood</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Meet Awesome New People</div>
                    </v-card-title>
                    <v-card-text>
                      You would also have fun searching and trying to make a deal, and will likely meet a few awesome people along the way!
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

    <!-- <ul class="qualities margin-sides">
      <li 
        v-for="(quality, idx) in qualities" 
        :key="idx"
        class="quality flex flex-column 
        justify-center align-center elevation-2">
        <v-icon class="quality-icon" :size="100">{{quality.icon}}</v-icon>
        <h3 class="quality-headline">{{quality.txt}}</h3>
      </li>
    </ul> -->
    
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
  background-image: url('https://vuetifyjs.com/themes/parallax-starter/assets/hero.jpeg');
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
  color: #64b5f6;
  text-shadow: -1px 1px 1px darkslategrey, -2px 2px 1px darkslategrey,
    -3px 3px 1px darkslategrey, -4px 4px 1px darkslategrey,
    -5px 5px 1px darkslategrey, -6px 6px 1px darkslategrey,
    -7px 7px 1px darkslategrey, -8px 8px 1px darkslategrey,
    -9px 9px 1px darkslategrey;
}
.page-ampersant {
  color: #64b5f6;
  font-size: 30px;
  font-weight: bold;
  text-shadow: -1px 1px 1px darkslategrey, -2px 2px 1px darkslategrey,
    -3px 3px 1px darkslategrey;
  margin: 10px 0;
}
.page-subtitle {
  padding: 0 20px;
  color: #64b5f6;
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
  background-color: #64b5f6;
}
</style>