<template>
  <section 
    class="product-details"
    :class="{'flex': !product, 'flex-center': !product}">

    <template v-if="product">
      <v-carousel 
        class="product-imgs" 
        hide-controls 
        :hide-delimiters="product.imgs.length === 1">

        <v-carousel-item 
          v-for="(img ,idx) in product.imgs" 
          :src="img" 
          :key="idx">
        </v-carousel-item>
      </v-carousel>
        
      <div class="non-part-imgs">
        <div class="product-desc-container">

          <template v-if="editMode">
            <v-form>
              <v-text-field
                v-model="product.title"
                label="Title"
                autofocus
              ></v-text-field>

              <v-text-field
                v-model="product.desc"
                textarea
                label="Description"
              ></v-text-field>
            </v-form>
          </template>

          <template v-else>
            <h1 class="display-1 mb-2">{{product.title}}</h1>
            <h4 class="title mb-4">{{product.desc}}</h4> 
          </template>

          <h4 class="title">
            <v-icon :size="40">location_on</v-icon>  
            {{product.owner.loc.name}}
          </h4>
        </div>

        <hr class="mt-4 mb-4"/>

        <div class="owner-desc-container">
          <div class="owner-profile-name-container flex align-center mb-2">
            <router-link :to="'/profile/'+product.owner._id">

              <div 
                class="user-icon" 
                :style="{ 'backgroundImage': `url(${product.owner.img})` }">
              </div>

            </router-link>
            <h2 class="user-name title ml-2 mr-3">{{product.owner.nickName}}</h2>

            <star-rating 
              v-if="product.owner.avgReviewRating"
              :rating="product.owner.avgReviewRating"
              :show-rating="false" 
              :star-size="25" 
              read-only>
            </star-rating>
          </div>
          <h3 class="title mb-3">{{product.owner.desc}}</h3>

          <hr class="mt-4 mb-4"/>

          <h3 class="title mb-1">Things I like:</h3>
          <categories-picker 
            :display="product.owner.desiredCategories"
            :small="true">
          </categories-picker>
          
        </div>

      </div>
      
      <div class="btn-container">

        <v-btn 
          v-if="!loggedInUser" 
          color="indigo lighten-3"
          @click.native="showModal = true">
          Login to bid
        </v-btn>

        <v-btn 
          v-else-if="!isViewerAlsoOwner" 
          color="indigo lighten-3"
          @click="toBid()"> 
          Bid Now
        </v-btn>

        <v-btn 
          v-else-if="!editMode" 
          color="indigo lighten-3"
          @click.native="editMode= true">
          edit
        </v-btn>

        <v-btn 
          v-else 
          color="indigo lighten-3"
          @click.native="updateProductDetails()">
          save
        </v-btn>
      </div>

      <modal v-show="showModal" @hideModal="showModal = false">
        <login></login>
      </modal>
    </template>

    <img 
      v-else
      class="loading-gif" 
      src="@/assets/gifs/loading3.gif" 
      alt="indigo gif"/>

  </section>
</template>

<script>
import { PRODUCT_ACTIONS } from '../store/ProductStore.js';
import ProductService from '@/services/ProductService.js';
import BidService from '@/services/BidService.js';
import EventBusService, { EVENTS } from '@/services/EventBusService.js';
import Modal from '@/cmps/general/Modal.vue';
import Login from '@/cmps/LoginRegister/Login.vue';
import CategoriesPicker from '@/cmps/general/CategoriesPicker.vue';
import StarRating from 'vue-star-rating';

export default {
  created() {
    const productId = this.$route.params._id;

    this.$store
      .dispatch({ type: PRODUCT_ACTIONS.GET_PRODUCT_BY_ID, productId })
      .then(product => {
        this.product = product;

        if (this.loggedInUser) {
          this.isViewerAlsoOwner = this.product.owner._id === this.loggedInUser._id;
        }
        if (!this.isViewerAlsoOwner) {
          ProductService.incrementViews(productId)
        }
      });
  },
  data() {
    return {
      product: null,
      isViewerAlsoOwner: null,
      selectedImgIdx: 0,
      showModal: false,
      editMode: false
    };
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.getLoggedInUser;
    }
  },
  methods: {
    moveTo(path) {
      this.$router.push(path);
    },
    toBid() {
      this.$router.push(`/bid/${this.$route.params._id}`);
    },
    updateProductDetails() {
      ProductService.updateProductDetails(this.product)
        .then(()=> {
          EventBusService.$emit(EVENTS.DISPLAY_USER_MSG, {
            title: 'Update Saved',
            desc: 'thank you for putting the effot',
          })
        })
        .catch(() => {
          EventBusService.$emit(EVENTS.DISPLAY_USER_MSG, {
            title: 'houston we have a problem',
            desc: 'sorry but your update didn\'t stick',
            success: false
          });
        });
        
      this.editMode = false;
    }
  },
  watch: {
    loggedInUser() {
      if (this.loggedInUser && this.product) {
        this.showModal = false;
        this.isViewerAlsoOwner = this.product.owner._id === this.loggedInUser._id;
      }
    }
  },
  components: {
    Modal,
    Login,
    CategoriesPicker,
    StarRating
  }
};
</script>

<style scoped>
.product-details {
  display: flex;
  flex-direction: column;
  text-align: left;
}
.product-imgs {
  height: 300px;
}
.primary-img {
  border-bottom: 1px solid lightgray;
  width: 100%;
  height: 300px;
  background-size: cover;
  background-position: center;
}
.user-icon {
  height: 48px;
  width: 48px;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
}
.non-part-imgs {
  flex-grow: 1;
  margin: 10px;
}
.user-name {
  text-transform: capitalize;
}
.categories-picker {
  justify-content: flex-start;
}
.btn-container {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 20px;
  background-color: rgba(0,0,0,.1);
}
.btn {
  margin: 0;
  width: 100%;
  background: white;
}
.product-details .loading-gif {
  height: 70px;
  width: 70px;
}
@media (min-width: 750px) {
  .product-details {
    flex-direction: row;
    height: calc(100vh - 104px);
    margin: 20px;
  }

  .product-imgs {
    margin-right: 20px;
    min-width: 300px;
    max-width: 500px;
    height: inherit;
  }

  .btn-container {
    width: initial;
    right: 20px;
    bottom: 20px;
  }
}
</style>