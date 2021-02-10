<template>
  <SfCarousel
    class="m-product-carousel"
    :settings="{
      animationDuration: 3000,
      rewindDuration: 3000
    }"
  >
    <SfCarouselItem v-for="(product, i) in carouselProducts" :key="i" itemscope itemtype="https://schema.org/Product">
      <SfProductCard 
         :link="product.link"
        :wishlist-icon="false"
        :image="product.image"
        link-tag="router-link" itemprop="image" 
      >

          <template #title>
            <meta itemprop="image" :content="product.image">
            <meta itemprop="name" :content="product.title">
            <meta itemprop="priceCurrency" :content="$store.state.storeView.i18n.currencyCode">
            <meta itemprop="price" :content="product.price.regular">
            <meta itemprop="availability" :content="availability(product)">
            <meta itemprop="url" :content="product.link">
            <meta itemprop="ratingValue" :content="getSingleProductRatingCount(product.id)">
            <h3 itemprop="name" class="sf-product-card__title">
                 {{ product.title }}
            </h3>
            <p itemprop="sku" class="reference">
                Ref : {{ product.sku }}
            </p>
            <div class="a-product-rating" @click="$emit('click')" itemprop="reviewRating" itemscope itemtype="https://schema.org/Rating">
              <div class="product__rating">
                <SfRating :score="getSingleProductRatingCount(product.id)" :max="product.rating.max" />
                <span class="product__count" itemprop="ratingValue">({{ getSingleProductReviewCount(product.id) }}) Customer reviews</span>
              </div>
            </div>
             <div class="d-flex align-start justify-between" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
                <SfPrice itemprop="price"
                  class="sf-product-card__price"
                  :regular="product.price.regular"
                  :special="product.price.special"  
                />  
                <!-- <p class="stock" v-if="product.is_in_stock">In stock</p>
                <p class="out-of-stock" v-else>Out of stock</p>  -->
             </div>
          </template> 
          <template #price>
             
                <SfLink class="sf-button a-add-to-cart sf-button--full-width sf-add-to-cart__button" :link="product.link">
                  More Info
                </SfLink>
           
         <!--    <AAddToCart
              class="sf-add-to-cart__button"
              :qty="qty"
              :product="product.obj_product"
              :disabled="isProductDisabled(product)"
            />  -->
          </template>
          <template #image>
            <div class="sf-image sf-product-card__image sf-image--has-size" data-loaded="true" style="--_image-width:216;--_image-height:326;">
              <img width="216" height="326" alt="product image" style="" :src="getImagePath(product)" @error="$event.target.src=placeholder"/> 
            </div> 
          </template> 
       </SfProductCard>
    </SfCarouselItem>
  </SfCarousel>
</template>
<script>
import { SfProductCard , SfCarousel , SfRating , SfPrice , SfButton , SfLink } from '@storefront-ui/vue';
import { htmlDecode } from '@vue-storefront/core/filters';
import config from 'config';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import { formatProductLink } from '@vue-storefront/core/modules/url/helpers';
import { productThumbnailPath } from '@vue-storefront/core/helpers';
import { prepareCategoryProduct } from 'theme/helpers';
import AProductRating from 'theme/components/atoms/a-product-rating';
import AAddToCart from 'theme/components/atoms/a-add-to-cart';
import get from 'lodash-es/get'

export default {
  name: 'MProductCarousel',
  components: {
    SfCarousel,
    SfProductCard,
    SfRating,
    SfPrice,
    SfButton,
    SfLink,
    AProductRating,
    AAddToCart
  },
  data () {
    return {
      placeholder: '/assets/placeholder.jpg'
    };
  },
  props: {
    products: {
      type: Array,
      default: () => []
    },
    reviews: {
      type: Array,
      default: () => []
    },
    qty: {
      type: Number,
      default: 1
    }
  },
  computed: {
    carouselProducts () {
      return this.products.map(prepareCategoryProduct);
    }
  },
  methods: {  
    isProductDisabled ( product ) {
      return product.is_in_stock ? false : true ;
    },
        availability (product) {
      return product.is_in_stock ? 'InStock' : 'OutOfStock'
    },
    getSingleProductReviewCount(product_Id){
       const reviewCountCollection = get(this.$store.state.review, 'review_count_collection',[])
       if( reviewCountCollection != null ){
         for (let iLoop = 0; iLoop < reviewCountCollection.length; iLoop++) {
           if( reviewCountCollection[iLoop].product_Id == product_Id ){
                return +reviewCountCollection[iLoop].review_Count;  
              } 
            }
       } 
       return 0;
    },
     getSingleProductRatingCount(product_Id){
       const reviewCountCollection = get(this.$store.state.review, 'review_count_collection',[])
       if( reviewCountCollection != null ){
         for (let iLoop = 0; iLoop < reviewCountCollection.length; iLoop++) {
           if( reviewCountCollection[iLoop].product_Id == product_Id ){
                return +reviewCountCollection[iLoop].rating_Count;  
              } 
            }
       } 
       return 0;
    },
    getImagePath(product){
     const resizeIndex = product.image.indexOf('resize');
      if(resizeIndex > 0 ){
        const imagepath = product.image;
        if(imagepath.charAt(product.image.indexOf('resize') + 6) == "/"){
          return product.image;
        }
        else{
          return [imagepath.slice(0, resizeIndex+6), "/", imagepath.slice(resizeIndex+6)].join('');
        }
      }
      return product.image;
    }
  }
};
</script>
