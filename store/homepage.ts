import { quickSearchByQuery } from '@vue-storefront/core/lib/search';
import { SearchQuery } from 'storefront-query-builder'
import config from 'config'

export const homepageStore = {
  namespaced: true,
  state: { 
    our_best_deals_products: []
  },
  actions: {
    async ourBestDealsProducts({ commit, dispatch }) {
      let searchQuery    = new SearchQuery();
      searchQuery        = searchQuery.applyFilter({ key: 'category_ids', value: { 'in': config.ourBestDeals.id } }) // Our Best Deals Category ID
      const searchResult = await quickSearchByQuery
      ({
          entityType : 'product',
          query      :  searchQuery,
          size       :  8,
          sort       : 'created_at:desc'
      }); 
      commit('SET_OURBESTDEALSPRODUCTS', searchResult.items)
    } 
  },
  mutations: {
    SET_OURBESTDEALSPRODUCTS(state, products) {
      state.our_best_deals_products = products
    } 
  },
  getters: {
    getOurBestDealsProducts(state) {
      return state.our_best_deals_products
    } 
  }
}
