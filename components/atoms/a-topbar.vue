<template>
  <div class="top-bar d-flex justify-between">
    <p class="text_upper">We are specialized in DIY and gardening tools</p>
    <ul class="d-flex" id="md_top_comfort_links">
      <li>
        <a
          href="/pages/our-promise"
          class="md-opjjpmhoiojifppkkcdabiobhakljdgm_doc">
          Our Promise
          </a>
      </li>
      <li>
        <a
          href="/pages/delivery"
          class="md-opjjpmhoiojifppkkcdabiobhakljdgm_doc">
          Free Delivery
          </a>
      </li>
      <li>
        <a
          href="/pages/expert-advice"
          class="md-opjjpmhoiojifppkkcdabiobhakljdgm_doc">
          Expert Advice
          </a>
      </li>
      <li class="last">
        <a href="/pages/returns" class="md-opjjpmhoiojifppkkcdabiobhakljdgm_doc">
        30 Day Returns
        </a>
      </li> 
      <li>
        <a href="/pages/capitools-service-and-customer-care"> Help </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { SfIcon, SfButton } from "@storefront-ui/vue";
import { mapGetters, mapActions } from "vuex";
import { ModalList } from "theme/store/ui/modals";
export default {
  components: { SfIcon, SfButton },
  computed: {
    ...mapGetters("user", ["isLoggedIn"]),
  },
  methods: {
    ...mapActions("ui", {
      openModal: "openModal",
    }),
    goToAccount() {
      this.openModal({ name: ModalList.Auth, payload: "login" });
    },
    switchElem(to) {
      this.openModal({ name: ModalList.Auth, payload: to });
    },
  },
};
</script>

<style lang="scss" scoped>
.top-bar {
  background-color: var(--_c-gray-accent);
  @media screen and (max-width: 820px) {
    flex-direction: column;
  }
  p {
    margin: 0;
    font-size: 13px;
    padding: 5px 30px;
  }
  ul {
    padding: 5px 30px;
    margin: 0;
    list-style: none;
    @media screen and (max-width: 820px) {
      padding: 5px 15px;
    }
    @media screen and (max-width: 480px) {
      padding: 5px;
      justify-content: center;
    }
    li {
      margin: 0 10px;
      color: var(--c-white);
      font-size: 13px;
      @media screen and (max-width: 480px) {
        margin: 0 6px;
        font-size: 11px;
      }
      a,
      button {
        color: var(--_c-dark-secondary);
        font-size: 13px;
        text-decoration: none;
        text-transform: none;
        @media screen and (max-width: 480px) {
          font-size: 11px;
        }
        &:hover {
          text-decoration: none;
          color: var(--_c-green-primary);
        }
      }
      button {
        margin: 0 5px;
      }
    }
  }
}
</style>