<template>
    <section class="product-preview">
      <v-layout style="height: 100%">
        <v-flex>
          <v-card width="100%">
            <div>
              <v-card-media
                height="200px"
                :src="product.imgs[0]">
              </v-card-media>
              <v-card-title>
                <div class="width-100">
                  <div class="card-txt-header">
                    <h3 class="title headline">{{product.title}}</h3>
                    <span class="caption">
                      {{product.distanceInKM.toFixed(1)}} Km
                    </span>
                  </div>

                  <p class="desc">{{product.desc}}</p>
                </div>
              </v-card-title>
            </div>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn v-if="!loggedInUser" flat color="orange">more details</v-btn>
              <v-btn v-else-if="!isLoggedInUserProduct(product.ownerId)" 
                     @click.stop="moveTo('/bid/'+product._id)" flat color="orange">bid now</v-btn>
              <v-btn v-else flat color="orange">edit now</v-btn>        
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </section>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.getLoggedInUser;
    }
  },
  methods: {
    isLoggedInUserProduct(ownerId) {
      return this.loggedInUser._id === ownerId;
    },
    moveTo(path) {
      this.$router.push(path);
    }
  }
};
</script>

<style scoped>
.product-preview {
  border: 1px solid lightgray;
  height: 100%;
  max-height: 100%;
  text-align: left;
  transition: box-shadow 0.3s;
}

.product-preview:hover {
  cursor: pointer;
  box-shadow: 2px 2px 15px lightgray;
}

.product-preview:last-of-type {
  margin-right: 0;
}

.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-txt-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.product-preview img {
  width: 100%;
  height: 200px;
  background-size: cover;
  background-position: center;
}
.info-container {
  padding: 10px 20px;
}
.info-heading-container {
  margin-bottom: 10px;
}
.title {
  width: 140px;
  height: 42px;
  overflow: hidden;
}
.desc {
  max-height: 50px;
  overflow: hidden;
  margin-bottom: 0;
}
</style>
