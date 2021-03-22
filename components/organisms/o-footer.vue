<template>
  <footer id="footer" class="o-footer">
    <div class="container">
        <div class="d-flex footer-overlay justify-between">
          <MFooterNewsletterSection />
          <AFooterPaymentSection />
          <AFooterSocialMediaSection />
        </div>
        <SfFooter :column="4" :multiple="true">
          <SfFooterColumn
            v-for="linkGroup in links"
            :key="linkGroup.name"
            :title="$t(linkGroup.name)"
          >
            <SfList>
               <SfListItem v-for="link in linkGroup.children" :key="link.name">
                <template v-if="link.name === 'Logout'">
                  <div v-if="isLoggedIn"> 
                     <router-link v-if="link.link" v-on:click.native="changeActivePage" :to="localizedRoute(link.link)" exact>
                        <SfMenuItem class="sf-footer__menu-item" :label="$t(link.name)" />
                     </router-link>
                    <SfMenuItem
                        v-else-if="link.clickHandler"
                        class="sf-footer__menu-item"
                        :label="$t(link.name)"
                        @click="link.clickHandler"
                    />
                  </div>
                  <div v-else> 
                     <router-link v-on:click.native="goToAccount" :to="{ path: $route.currentRoute}" exact>
                       <SfMenuItem class="sf-footer__menu-item" label="Login" />
                    </router-link> 
                  </div>
                </template>
                <template v-else>
                  <div v-if="link.name === 'My orders' || link.name === 'My adresses' || link.name === 'My personal information'">
                    <router-link v-on:click.native="goToAccount" :to="{ path: $route.currentRoute}" exact>
                       <SfMenuItem class="sf-footer__menu-item" :label="$t(link.name)" />
                    </router-link>
                  </div>
                  <div v-else>
                    <router-link v-if="link.link" :to="localizedRoute(link.link)" exact>
                     <SfMenuItem class="sf-footer__menu-item" :label="$t(link.name)" />
                    </router-link>
                    <SfMenuItem
                      v-else-if="link.clickHandler"
                      class="sf-footer__menu-item"
                      :label="$t(link.name)"
                      @click="link.clickHandler"
                    />
                  </div>
                </template>
              </SfListItem>
            </SfList>
          </SfFooterColumn>
        </SfFooter>
      
    </div>
    <ABackToTop bottom="20px" right="20px" visibleoffset="200" class="desktop-only" />
    <div class="copyrights text-center">
      <p>
        <span>&copy;1999  -</span>{{currentDate.getFullYear()}}<span> All Rights Reserved. Third party trademarks are hereby acknowledged.</span>
      </p>
    </div>
  </footer>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ABackToTop from 'theme/components/atoms/a-back-to-top';
import { SfFooter, SfList, SfMenuItem , SfButton } from '@storefront-ui/vue';
import { ModalList } from 'theme/store/ui/modals'
import config from 'config';
import { currentStoreView } from '@vue-storefront/core/lib/multistore';
import get from 'lodash-es/get';
import AFooterPaymentSection from 'theme/components/atoms/a-footer-payment-section';
import AFooterSocialMediaSection from 'theme/components/atoms/a-footer-social-media-section';
import AFooterTrustpilotSection from 'theme/components/atoms/a-footer-trustpilot-section';
import MFooterNewsletterSection from 'theme/components/molecules/m-footer-newsletter-section';

export default {
  name: 'OFooter',
  components: {
    ABackToTop,
    SfFooter,
    SfList,
    SfMenuItem,
    SfButton,
    AFooterPaymentSection,
    AFooterSocialMediaSection,
    AFooterTrustpilotSection,
    MFooterNewsletterSection
  },
  data () {
    return {
      seeMoreLink:"#",
      social: ['facebook', 'pinterest', 'twitter', 'youtube'],
      currentDate: new Date
    };
  },
  computed: {
    ...mapGetters('user', ['isLoggedIn']),
    multistoreEnabled () {
      return get(config, 'storeViews.multistore', false);
    },
    getVersionInfo () {
      return `v${process.env.__APPVERSION__} ${process.env.__BUILDTIME__}`;
    },
    currentLanguage () {
      const { i18n = config.i18n } = currentStoreView();
      return `${i18n.defaultCountry} / ${i18n.defaultLanguage} / ${i18n.currencyCode}`;
    },
    links () {
      return {
        about: {
          name: 'About Us',
          children: [
            { name: 'Who We Are', link: '/pages/about-us' },
            { name: 'Our Brands & Partners', link: '/pages/capitools-brands-and-partners' },
            { name: 'Deals & Promos', link: '/pages/deals-promos' },
            { name: 'Our Best Sellers', link: '/pages/our-best-sellers' },
            { name: 'New product', link: '/pages/new-products' },
            { name: 'Contact Us', link: '/pages/contact-capitools' },
            { name: 'Our Community', link: '/pages/our-community' }
          ]
        }, 
        product: {
          name: 'The Products',
          children: [
            { name: 'Water Pumps', link: '/water-pumps' },
            { name: 'Generators', link: '/generators' },
            { name: 'DIY Tools', link: '/power-tools' },
            { name: 'Garden Hand Tools', link: '/garden-hand-tools' }, 
            { name: 'Accessories', link: '/pages/accessories' },
            { name: 'Spare Parts', link: '/pages/spare-parts' },
            { name: 'Protective Equipment', link: '/pages/protective-equipment' }
          ]
        }, 
        help: { 
          name: 'Help & Services',
          children: [
            { name: 'FAQ (Frequently Asked Questions)', link: '/pages/f-a-q-frequently-asked-questions' },
            { name: 'Service & Customer Care', link: '/pages/capitools-service-and-customer-care' },
            { name: 'Mantenance & Troubleshooting', link: '/pages/maintenance-and-troubleshooting' },
            { name: 'Payment', link: '/pages/payment-info' },
            { name: 'Delivery', link: '/pages/delivery' },
            { name: 'Return & Refund Policy', link: '/pages/returns-and-refunds-policy' },
            { name: 'Swap Europe Network Warranty', link: '/pages/swap-europe-network-warranty' }
          ]
        }, 
        legal: {
          name: 'Legal Information',
          children: [
            { name: 'Terms & Conditions', link: '/pages/capitools-uk-terms-conditions' },
            { name: 'Cookie notice information', link: '/pages/privacy' },
            { name: 'Data Protection', link: '/pages/data-protection' },
            { name: 'Cyber Security', link: '/pages/cyber-security' },
            { name: 'Legal Information', link: '/pages/legal-information' }
          ]
        }
      };
    }
  },
  methods: {
    changeActivePage () {
        this.logout();
        return;
    },
    goToAccount () {
      if (this.isLoggedIn) {
        this.$router.push(this.localizedRoute('/my-account'))
      } else {
        this.openModal({ name: ModalList.Auth, payload: 'login' })
      }
    },
    async logout () {
      await this.$store.dispatch('user/logout', {});
      this.$router.push(this.localizedRoute('/'));
    },
    ...mapActions('ui', {
      openModal: 'openModal'
    }),
    showLanguageSwitcher () {
      this.openModal({ name: ModalList.LanguageSwitcher })
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@storefront-ui/shared/styles/helpers/breakpoints";

.o-footer {
  .sf-footer {
    --footer-width: auto;
    --footer-padding : 0px;
  }
}

</style>
