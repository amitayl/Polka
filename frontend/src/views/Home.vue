<template>

 <div id="app">
   <v-app light>
    <v-toolbar class="white">
      <!-- <v-toolbar-title class="green"></v-toolbar-title> -->
    </v-toolbar>
    <v-content>
      <section>
        
        <v-carousel>
          <v-carousel-item v-for="(item,i) in items" :src="item.src" :key="i"></v-carousel-item>
          
          <div class="search-bar">
             <h1 class="black--text mb-2 display-1 text-xs-center"> 
               STOP BUYING.</h1>
      <v-btn
              class="blue lighten-2 mt-5"
              dark
              large
              href="/#/browseProducts"
            >
              Start Trading!
            </v-btn>
    </div>
            <!-- <img src="https://www.blimer.com/img/barter_icon_bgwhite_400px.png" alt="Vuetify.js" height="50"> -->
           
            
          <!-- </v-layout> -->
        </v-carousel>
      </section>

      <section>
        <v-layout
          column
          wrap
          class="my-5"
          align-center
        >
          <v-flex xs12 sm4 class="my-3">
            <div class="text-xs-center">
              <h2 class="headline">Why should i use Polka?</h2>
              <span class="subheading">
                Polka offers a new, fun, and mindful way to get all that you desire 🙂 . It’s a way for you to get value out of your stuff and your many talents, all the while you are helping to reduce waste and your carbon footprint. There’s NO money, NO waste, and NO carbon emissions. You’ll also have fun searching and trying to make a deal, and will likely meet a few awesome people along the way!
              </span>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">monetization_on</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Save Money</div>
                    </v-card-title>
                    <v-card-text>
                      Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. 
                      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                      Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti. 
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2">nature</v-icon>
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">Help The Enviorment</div>
                    </v-card-title>
                    <v-card-text>
                      Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. 
                      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                      Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti. 
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
                      Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare. 
                      Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
                      Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt. Suspendisse potenti. 
                    </v-card-text>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

    <div class="best-sellers">
      <h1>Best Sellers:</h1>
      <div class="tile is-ancestor">
  <div class="tile is-4">
    <article class="tile is-child notification">
          <p class="title">Middle tile</p>
          <p class="subtitle">With an image</p>
          <figure class="image is-square">
            <img src="">
          </figure>
        </article>
  </div>
  <div class="tile is-4">
    <article class="tile is-child notification">
          <p class="title">Middle tile</p>
          <p class="subtitle">With an image</p>
          <figure class="image is-square">
            <img src="">
          </figure>
        </article>
  </div>
  <div class="tile is-4">
    <article class="tile is-child notification">
          <p class="title">Middle tile</p>
          <p class="subtitle">With an image</p>
          <figure class="image is-square">
            <img src="">
          </figure>
        </article>
  </div>
  
          </div>
      </div>

    <div class="categories">
      <br>
      <h1>Categories:</h1>
      <div class="tile is-ancestor">
  <div class="tile is-4 is-mobile">
    <article class="tile is-child notification">
          <p class="title">Middle tile</p>
          <p class="subtitle">With an image</p>
          <figure class="image is-square">
            <img src="">
          </figure>
        </article>
  </div>
  <div class="tile is-4 is-mobile">
    <article class="tile is-child notification">
          <p class="title">Middle tile</p>
          <p class="subtitle">With an image</p>
          <figure class="image is-square">
            <img src="">
          </figure>
        </article>
  </div>
  <div class="tile is-4 is-mobile">
    <article class="tile is-child notification">
          <p class="title">Middle tile</p>
          <p class="subtitle">With an image</p>
          <figure class="image is-square">
            <img src="">
          </figure>
        </article>
  </div>
  
          </div>
      </div>

      <v-footer class="blue darken-2">
        <v-layout row wrap align-center>
          <v-flex xs12>
            <div class="white--text ml-3">
              Made with
              <v-icon class="red--text">favorite</v-icon>
              by <a class="white--text" href="https://vuetifyjs.com" target="_blank">Polka</a>
             
            </div>
          </v-flex>
        </v-layout>
      </v-footer>
    </v-content>
  </v-app>
  
 </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          src: './imgs/carousel/slide1.jpg'
        },
        {
          src: './imgs/carousel/slide2.jpg'
        },
        {
          src: './imgs/carousel/slide3.jpg'
        },
        {
          src: './imgs/carousel/slide4.jpg'
        }
      ]
    };
  }
};
</script>

<style>
.carousel {
  height: 400px;
}

.content h1 {
  font-weight: 600;
}

.black--text {
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: white;
}

.carousel__controls {
  display: none;
}

.toolbar {
  display: none;
}

/* .invisible {
  background-color: yellow;
} */

.margin-bottom[data-v-02522b51] {
  margin-bottom: 0px;
}

.home-picture {
  width: 100%;
  height: 20%;
}

.home-img {
  height: 100vh;
  background-image: url('../../public/imgs/Teddy2.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}
.main-title {
  color: rgb(140, 199, 140);
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 6rem;
}
.search-bar {
  width: 400px;
  height: 180px;
  position: absolute;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
}

form {
  /* padding-top: 5px; */
  border-radius: 20px;
  /* outline: 0; */
  float: left;
  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  -webkit-border-radius: 4px;
  border-radius: 20px;
}

form > .textbox {
  /* outline: 0; */
  height: 42px;
  width: 300px;
  font-size: 20px;
  line-height: 42px;
  padding: 0 16px;
  background-color: rgba(255, 255, 255, 0.8);
  color: #212121;
  border: 0;
  float: left;
  -webkit-border-radius: 4px 0 0 4px;
  border-radius: 10px 0px 0px 10px;
}

form > .textbox:focus {
  /* outline: 0; */
  background-color: #fff;
}

form > .button {
  /* outline: 0; */
  background: none;
  background-color: rgba(38, 50, 56, 0.8);
  float: left;
  height: 42px;
  width: 60px;
  padding: 0 10px;
  text-align: center;
  line-height: 42px;
  border: 0;
  color: #fff;
  font: normal normal normal 14px/1 FontAwesome;
  font-size: 16px;
  text-rendering: auto;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  -webkit-transition: background-color 0.4s ease;
  transition: background-color 0.4s ease;
  -webkit-border-radius: 0 4px 4px 0;
  border-radius: 0 4px 4px 0;
}

form > .button:hover {
  background-color: rgba(0, 150, 136, 0.8);
}

button:hover {
  background-color: rgb(26, 139, 87);
}

button:focus {
  /* outline: 0; */
}
</style>
