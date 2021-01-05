<template>
  <div class="top-bar d-flex justify-between">
    <ul class="d-flex" id="md_top_comfort_links">
      <li>
        <a href="/pages/our-promise" class="md-opjjpmhoiojifppkkcdabiobhakljdgm_doc"
          >Our Promise</a
        >
      </li>
      <li>
        <a href="/pages/delivery" class="md-opjjpmhoiojifppkkcdabiobhakljdgm_doc"
          >Free Delivery</a
        >
      </li>
      <li>
        <a href="/pages/expert-advice" class="md-opjjpmhoiojifppkkcdabiobhakljdgm_doc"
          >Expert Advice</a
        >
      </li>
      <li class="last">
        <a href="/pages/returns" class="md-opjjpmhoiojifppkkcdabiobhakljdgm_doc"
          >30 Day Returns</a
        >
      </li>
    </ul>
    <ul class="d-flex creadential-menu">
      <li>
            <SfButton class="sf-button--text" @click.native="goToAccount">
              {{ $t("SIGN IN") }}
            </SfButton> 
              Or
            <SfButton class="sf-button--text" @click.native="switchElem('register')">
              {{ $t("REGISTER") }}
            </SfButton>
        </li>
         <li>
            <a href="/pages/capitools-service-and-customer-care">
             Help
            </a>
        </li>
        <li>
          <a>
             <SfIcon
              icon="heart_fill"
              color="white"
              size="16px"
            />
          </a>
        </li>
        <li>
          <a>
             <SfIcon
              icon="more"
              color="white"
              size="16px"
            />
          </a>
        </li>
    </ul>
  </div>
</template>

<script>
import { SfIcon, SfButton } from '@storefront-ui/vue';
import { mapGetters, mapActions } from 'vuex';
import { ModalList } from 'theme/store/ui/modals'
export default { 
  components: { SfIcon, SfButton },
  computed: {
    ...mapGetters('user', ['isLoggedIn'])
  },
  methods: {
    ...mapActions('ui', {
      openModal: 'openModal'
    }),
    goToAccount () {
      this.openModal({ name: ModalList.Auth, payload: 'login' })
    },
    switchElem (to) { 
      this.openModal({ name: ModalList.Auth, payload: to })
    },
  }
};
</script>

<style lang="scss" scoped>
.top-bar {
  background-color: var(--_c-green-primary);
  ul {
    padding: 3px 30px;
    margin: 0;
    list-style: none;
    
    @media screen and (max-width: 480px) {
      padding: 5px;
    }
    li {
      margin: 0 10px;
      color: var(--c-white);
      text-transform: uppercase;
      font-size: 12px;
      @media screen and (max-width: 480px) {
        margin: 6px;
        font-size: 11px;
      }
      a, button {
        color: var(--c-white);
        font-size: 12px;
        text-transform: uppercase;
        text-decoration: none;
        @media screen and (max-width: 480px) {
          font-size: 11px;
        }
        &:hover {
          text-decoration: underline;
        }
      }
      button{
        margin: 0 5px;
      }
    }
  }
}
</style>