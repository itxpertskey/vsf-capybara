<template>
  <section id="home">
    <SfHero
      class="hero desktop-only"
      :slider-options="{
        animationDuration: 2000,
        rewindDuration: 2000
      }"
    >
     <router-link to="gardening/chainsaws/new-premium-range-from-feider-machines-home-pro-petrol-chainsaws">
        <SfHeroItem
            class="sf-hero-item--position-bg-top-left sf-hero-item--align-right"
            image="/assets/banner/png/banner-03.png"
         />
      </router-link>
      <SfHeroItem
        v-for="(hero, i) in heroes"
        :key="i"
        :image="hero.image"
        :class="hero.className"
      />
    </SfHero>
    <SfHero
      class="hero-tablet"
      :slider-options="{
        animationDuration: 2000,
        rewindDuration: 2000
      }"
    >
     <router-link to="gardening/chainsaws/new-premium-range-from-feider-machines-home-pro-petrol-chainsaws">
        <SfHeroItem
            class="sf-hero-item--position-bg-top-left sf-hero-item--align-right"
            image="/assets/banner/png/banner-03-responsive.png"
         />
      </router-link>
      <SfHeroItem
        v-for="(hero, i) in heroesResponsive"
        :key="i"
        :image="hero.image"
        :class="hero.className"
      />
    </SfHero>
    <MAssurance /> 
    <OCmsBlockHomeTemplate /> 
    <div class="product-slider">
      <div class="container">    
        <div class="slider-content">  
          <lazy-hydrate :trigger-hydration="!loading">
            <m-product-carousel :products="blockoneproduct" />
          </lazy-hydrate>
        </div> 
      </div>
    </div> 
    <OCmsBlockSwapText /> 
    <AAboutUs />
  </section>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import LazyHydrate from 'vue-lazy-hydration';
import { Logger } from '@vue-storefront/core/lib/logger';
import { isServer, onlineHelper } from '@vue-storefront/core/helpers'; 
import { checkWebpSupport } from 'theme/helpers'
import { ReviewModule } from '@vue-storefront/core/modules/review';
import { registerModule } from '@vue-storefront/core/lib/modules';
import { SfHero } from '@storefront-ui/vue';
import MProductCarousel from 'theme/components/molecules/m-product-carousel';
import MAssurance from 'theme/components/molecules/m-assurance';  
import OCmsBlockHomeTemplate from 'theme/components/organisms/o-cms-block-home-template';
import OCmsBlockSwapText from 'theme/components/organisms/o-cms-block-swap-text';
import AAboutUs from 'theme/components/atoms/a-about-us'; 

export default {
  name: 'Home',
  components: {
    LazyHydrate,
    SfHero, 
    MProductCarousel,
    AAboutUs,
    MAssurance,    
    OCmsBlockHomeTemplate,
    OCmsBlockSwapText
  }, 
  data () {
    return {
      loading: true,
      loadNewsletterPopup: false
    };
  },
  computed: {
    ...mapState({
      isWebpSupported: state => state.ui.isWebpSupported
    }),
    ...mapGetters({
      isLoggedIn: 'user/isLoggedIn',
      heroImages: 'promoted/getHeadImage',
      heroImagesResponsive: 'promoted/getHeadImageResponsive',   
      blockoneproduct: 'homepage/getBlockOneProducts',
    }),
    isOnline () {
      return onlineHelper.isOnline;
    }, 
    heroes () {
      return checkWebpSupport(this.heroImages, this.isWebpSupported)
    },
    heroesResponsive () {
      return checkWebpSupport(this.heroImagesResponsive, this.isWebpSupported)
    }
  },
  watch: {
    isLoggedIn () {
      const redirectObj = localStorage.getItem('redirect');
      if (redirectObj) this.$router.push(redirectObj);
      localStorage.removeItem('redirect');
    }
  },
  async asyncData ({ store, context }) {
    Logger.info('Calling asyncData in Home (theme)')();
    if (context) context.output.cacheTags.add(`home`)

    await Promise.all([
      store.dispatch('homepage/blockOneProducts'), 
      store.dispatch('promoted/updateHeadImage'),
      store.dispatch('promoted/updateHeadImageResponsive')
    ]);
  },
   beforeCreate () {
    registerModule(ReviewModule);
  },
  mounted () {
    if (!this.isLoggedIn && localStorage.getItem('redirect')) { this.$bus.$emit('modal-show', 'modal-signup'); }
  },
  beforeRouteEnter (to, from, next) {
    if (!isServer && !from.name) {
      next(vm => {
        vm.$store.dispatch('homepage/blockOneProducts').then(() => {
           vm.loading = false;
       });
      });
    } else {
      next();
    }
  },
  metaInfo () {
    return {
      title: this.$route.meta.title || this.$i18n.t('Home Page'),
      meta: this.$route.meta.description ? [{ vmid: 'description', name: 'description', content: this.$route.meta.description }] : []
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

#home {
  box-sizing: border-box;
  padding: 0;
}

.sf-hero-item {
  --hero-item-height: 25rem;
  height: initial;
}
.banner-grid {
  margin: var(--spacer-base) 0;
  @include for-desktop {
    margin: var(--spacer-2xl) 0;
  }
}
.section {
  @include for-desktop {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>