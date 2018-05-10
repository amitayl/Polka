<template>
    <div>
        <div class="flex align-center space-between">

            <trade-card :user="owner"></trade-card>
            <div buttons class=" buttons  flex space-between flex-column">
            <button class="button">Trade</button>
            <button class="button">Decline</button>
            </div>
            <trade-card :user="bidder"></trade-card>
            <!-- <div class="card">
            
            </div> -->
        </div>

      
    </div>
</template>

<script>
import TradeCard from '@/cmps/trade/TradeCard'
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
            transactionDetails: ''

            
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
    },
    components : {
        TradeCard
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
