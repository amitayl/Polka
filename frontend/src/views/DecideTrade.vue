<template>
    <div class="container">
        <div class="flex align-center space-between">

            <trade-card v-if="owner" :user="owner"></trade-card>
            <div buttons class=" buttons  flex space-between flex-column">
            <v-btn v-once @click="acceptTransaction">Trade</v-btn>

            <v-btn>Decline</v-btn>
            </div>
            <trade-card v-if="bidder" :user="bidder"></trade-card>
            <!-- <div class="card">
            
            </div> -->
        </div>
    </div>
</template>

<script>
import TransactionService from '@/services/TransactionService'
import TradeCard from '@/cmps/trade/TradeCard'
export default {
    created(){
        const bidId = this.$route.params._id;
        let selectedProduct = this.$store.getters.getSelectedProduct;
        console.log ('selectedProduct' , selectedProduct);
        let currProduct =  this.$store.getters.getCurrProduct;
        console.log ('currProduct' , currProduct);

        let loggedInUser =  this.$store.getters.getLoggedInUser;
        console.log ('loggedInUser' , loggedInUser);


        

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
            transactionDetails: ''
        }
    },
    methods :{
        acceptTransaction(){
            this.switchImgs()
            setTimeout( _ => this.$router.push ('/transaction/'), 3000);
        },
        switchImgs(){
            let tempImg = this.owner.productImg;
            this.owner.productImg = this.bidder.productImg;
            this.bidder.productImg = tempImg
        }
    },
    
    components : {
        TradeCard
    }

}
</script>


<style scoped>
.buttons{
    height:100px;
}

.button{
    width:100px;
}

</style>
