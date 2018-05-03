<template>
<section>
  <div class="home">
    <div class="home-img">
      

    <!-- <img class="home-picture" src="../imgs/manyStuff.jpg"> -->
    
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
  <pre><h1 class=" main-title title ">My Barter.
  </h1></pre>
   <div class="search-bar">
                    <form id="form"  onsubmit="return false">
                        <input type="text"  class="textbox " placeholder="search" autofocus>
                        <button class="button" title="search" type="submit" >
                        <i class="fas fa-search"></i>
                        </button>
                    </form>

                    
                </div>  
                </div>  
                
<hr>
                <div class="columns is-mobile">
  <div class="column">
    <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="title">Vintage artisian toy</p>
          <p class="subtitle">rare, in mint condition</p>
          <figure class="image is-4by3">
            <img src="https://i.pinimg.com/736x/31/91/31/319131518bd0368601556584660403c4--antique-toys-vintage-toys.jpg">
          </figure>
        </article>
      </div>
  </div>
  <div class="column is-mobile">
    <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="title">Ford focus</p>
          <p class="subtitle">in great condition</p>
          <figure class="image is-4by3">
            <img src="http://media.liveauctiongroup.net/i/33811/29498993_2.jpg?v=8D58B9FA7F47530">
          </figure>
        </article>
      </div>
  </div>
  <div class="column">
    <div class="tile is-parent">
        <article class="tile is-child box">
          <p class="title">Alladin lamp</p>
          <p class="subtitle">just rub it</p>
          <figure class="image is-4by3">
            <img src="https://ae01.alicdn.com/kf/HTB1QLCZIVXXXXcNXpXXq6xXFXXX2/Antique-Arts-Craft-Aladdin-Lamp-Home-Decoration-SMALL-Size-from-Arabian-Nights-Story-Vintage-Home-Decoration.jpg">
          </figure>
        </article>
      </div>
  </div>
</div>
</section>


</template>

<script>
// @ is an alias to /src


export default {
  
}
</script>
<style>
.home-picture{
  width:100%;
  height:20%;
}

.home-img{
  position:relative;
  width:100%;
  height:700px;
background-image: url("../imgs/Teddy2.jpg");
background-repeat: no-repeat;
    background-size: cover;
}
.main-title{
  color:rgb(140, 199, 140);
  position: absolute;
  top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
  font-size: 6rem;
}
.search-bar{
  width:400px;
  height:180px;
  position: absolute;
  top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);

}


form {
    /* padding-top: 5px; */
    border-radius:20px;
    outline: 0;
    float: left;
    -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    -webkit-border-radius: 4px;
    border-radius: 20px;
  }
  
  form > .textbox {
    outline: 0;
    height: 42px;
    width: 300px;
    font-size:20px;
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
    outline: 0;
    background-color: #FFF;
  }
  
  form > .button {
    outline: 0;
    background: none;
    background-color: rgba(38, 50, 56, 0.8);
    float: left;
    height: 42px;
    width: 60px;
    padding:0 10px;
    text-align: center;
    line-height: 42px;
    border: 0;
    color: #FFF;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: 16px;
    text-rendering: auto;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    -webkit-transition: background-color .4s ease;
    transition: background-color .4s ease;
    -webkit-border-radius: 0 4px 4px 0;
    border-radius: 0 4px 4px 0;
  }

  
  
  form > .button:hover {
    background-color: rgba(0, 150, 136, 0.8);
  }



button:hover{
    background-color: rgb(26, 139, 87);
}



button:focus{
    outline:0;
}
</style>
