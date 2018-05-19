<template>
  <section class="product-details" v-if="product">

    <!-- <div >  -->
      <!-- <div class="primary-img"  -->
           <!-- :style="{'backgroundImage': `url(${product.imgs[this.selectedImgIdx]})`}"></div> -->
      <!-- <div class="small-img-container flex">
          <img v-for="(img, idx) in product.imgs" 
               :key="img" :src="img" 
               class="small-img"
               :class="{selected: selectedImgIdx === idx}"
               @click="selectedImgIdx = idx">
=======
  <section v-if="product" class="contain flex space-between product-details">

    <div class="product-imgs flex flex-column"> 
      <div class="primary-img product-img" 
       :style="{'backgroundImage': `url(${product.imgs[0]})`}"></div>
      <div class="small-imgs flex space-between">
          <img v-for="(img, idx) in product.imgs" v-if="idx !== 0" 
               :key="img" :src="img" class="product-img small-img">
>>>>>>> 55fab736001a5c772d07a9f8c9327f458b0b2fc6
      </div>
    </div> -->

    <v-carousel class="product-imgs" hide-controls :hide-delimiters="product.imgs.length === 1">
      <v-carousel-item v-for="(img ,idx) in product.imgs" :src="img" :key="idx"></v-carousel-item>
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

            <div class="user-menu-icon" 
                 :style="{ 'backgroundImage': `url(${product.owner.img})` }">
            </div>

          </router-link>
          <h2 class="user-name title ml-2">{{product.owner.nickName}}</h2>
        </div>
        <h3 class="title">{{product.owner.desc}}</h3>
      </div>

    </div>
    
    <div class="btn-container">
      <v-btn v-if="!loggedInUser" 
             @click.native="showModal = true">
              Login to bid
      </v-btn>
      <v-btn v-else-if="!isViewerAlsoOwner" 
             @click="toBid()"> 
              Bid Now
      </v-btn>
      <v-btn v-else-if="!editMode" @click.native="editMode= true">edit</v-btn>
      <v-btn v-else @click.native="updateProductDetails()">save</v-btn>
    </div>

    <modal v-show="showModal" @hideModal="showModal = false">
      <login></login>
    </modal>

  </section>
</template>

<script>
import { PRODUCT_ACTIONS } from '../store/ProductStore.js';
import ProductService from '@/services/ProductService.js';
import BidService from '@/services/BidService.js';
import EventBusService, { EVENTS } from '@/services/EventBusService.js';
import Modal from '@/cmps/general/Modal.vue';
import Login from '@/cmps/LoginRegister/Login.vue';

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
      if (this.loggedInUser) {
        this.showModal = false;
        this.isViewerAlsoOwner = this.product.owner._id === this.loggedInUser._id;
      }
    }
  },
  components: {
    Modal,
    Login
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
.btn-container {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 20px;
  background-color: rgba(0,0,0,.2);
}
.btn {
  margin: 0;
  width: 100%;
  background: white;
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