<template>
  <div>
      <VueSlickCarousel v-bind="settings" ref="carousel">
        <div v-for="(product, i) in carouselProducts" :key="i">
          <SfProductCard
              :key="product.id"  
              :image="product.image" 
              :link="product.link"
            >
             <template slot="title">
                <h3 class="sf-product-card__title">
                  {{ product.title }}
                </h3>
                <p class="reference">
                    Ref : {{ product.sku }}
                </p>
                <div class="a-product-rating" @click="$emit('click')">
                  <div class="product__rating">
                    <SfRating :score="getSingleProductRatingCount(product.id)" :max="product.rating.max" />
                    <span class="product__count">({{ getSingleProductReviewCount(product.id) }}) Customer reviews</span>
                  </div>
                </div>
                <div class="d-flex align-start justify-between">
                    <SfPrice
                      class="sf-product-card__price"
                      :regular="product.price.regular"
                      :special="product.price.special" 
                    />   
                </div>
              </template>
              <template slot="price">
                <SfLink class="sf-button a-add-to-cart sf-button--full-width sf-add-to-cart__button" :link="product.link">
                  More Info
                </SfLink> 
              </template>
            </SfProductCard>
          </div> 
      </VueSlickCarousel>
      <div class="controls d-flex">
      <button @click="showPrevious">
         <SfIcon
            icon="arrow_left"
            size="xs"
            class="sf-header__icon icon-size sf-header__icon--is-active"  
          />
      </button>
      <button @click="showNext">
        <SfIcon
            icon="arrow_right"
            size="xs"
            class="sf-header__icon icon-size sf-header__icon--is-active"
          />
      </button>
      </div>
    </div>
</template>
<script>
import { SfProductCard , SfCarousel , SfRating , SfPrice , SfButton , SfLink, SfIcon } from '@storefront-ui/vue';
import { htmlDecode } from '@vue-storefront/core/filters';
import config from 'config';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import { formatProductLink } from '@vue-storefront/core/modules/url/helpers';
import { productThumbnailPath } from '@vue-storefront/core/helpers';
import { prepareCategoryProduct } from 'theme/helpers';
import AProductRating from 'theme/components/atoms/a-product-rating';
import AAddToCart from 'theme/components/atoms/a-add-to-cart';
import get from 'lodash-es/get'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
  
export default {
  name: 'MProductCarousel',
  components: {
    SfCarousel,
    SfProductCard,
    SfRating,
    SfPrice,
    SfButton,
    SfIcon,
    SfLink,
    AProductRating,
    AAddToCart,
    VueSlickCarousel
  },
  data () {
    return {
      placeholder: '/assets/placeholder.jpg',
      settings: 
      {
        dots:false, 
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        swipeToSlide:true,
        arrows:true,
        initialSlide: 0,
        infinite: false,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: false
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
      },
     
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
    showNext() {
      this.$refs.carousel.next()
    },
    showPrevious() {
      this.$refs.carousel.prev()
    },
  }
};
</script>
