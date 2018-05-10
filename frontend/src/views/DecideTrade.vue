<template>
    <div>
        <div class="flex align-center space-between">
            <div class="card">
            <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                <v-card-media :src="owner.productImg" height="200px"> </v-card-media>
                <v-card-title primary-title>
                    <div>
                    <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
                    <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
                     <img class="owner-img" :src="owner.userImg" height="200px">
                    </div>
                </v-card-title>
                <v-card-actions>
                    <!-- <v-btn flat color="orange">Share</v-btn>
                    <v-btn flat color="orange">Explore</v-btn> -->
                </v-card-actions>
                </v-card>
            </v-flex>
            </v-layout>
            </div>
            <div buttons class=" buttons  flex space-between flex-column">
            <button class="button">Trade</button>
            <button class="button">Decline</button>
            </div>
            <div class="card">
             <v-layout>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                <v-card-media :src="bidder.productImg" height="200px">   </v-card-media>
                
                <v-card-title primary-title>
                    <div>
                       
                    <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
                    <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
                         <img class="owner-img" :src="bidder.UserImg" height="200px">
                    </div>
                </v-card-title>
                <v-card-actions>
                    <!-- <v-btn flat color="orange">Share</v-btn>
                    <v-btn flat color="orange">Explore</v-btn> -->
                </v-card-actions>
                </v-card>
            </v-flex>
            </v-layout>
            </div>
        </div>

      
    </div>
</template>

<script>
export default {
    created(){
        const bidId = this.$route.params._id;
        let selectedProduct = this.$store.getters.getSelectedProduct;
        let currProduct =  this.$store.getters.getCurrProduct;
        let loggedInUser =  this.$store.getters.getLoggedInUser;

        this.transactionDetails = {

        }

        this.owner = {
            userImg: loggedInUser.img,
            productImg: currProduct.imgs[0]
        }
        this.bidder = {
            userImg: selectedProduct.bidderImg,
            productImg: selectedProduct.bidderProd.imgs[0]
        }
        console.log ('1' , this.owner.userImg )
        console.log ('2' , this.owner.productImg)
        console.log ('3' , this.bidder.userImg )
        console.log ('4' , this.bidder.productImg )
        
        // console.log ('idsStr' ,idsStr ); 
    },
    data (){
        return {
            owner:{},
            bidder:{},
            transactionDetails

            
            // products:[{
            //     title:'',
            //     imgs:['https://vuetifyjs.com/static/doc-images/cards/desert.jpg'
            //     ]
            // },{
            //    title:'',
            //     imgs:['http://assets.storaenso.com/se/buildingandliving/Product-Image-Library/Building-systems-by-Stora-Enso.jpg?RenditionID=8.jpg'
            //     ]  
            // }]
        }
    }

}
</script>


<style>
.buttons{
    height:100px;
}
.card {
    min-width:300px;
    width:300px;
    text-align: center;
}
.owner-img{
    border-radius:80%;
}

.button{
    width:100px;
}

</style>
