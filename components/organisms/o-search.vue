<template>
  <div class="o-search">
    <SfSearchBar
      v-model="search"
      :placeholder="$t('Type what you are looking for...')"
      class="sf-header__search"
      @input="startSearch"
      @click.native="$store.commit('ui/setSearchpanel', true)"
    />
    <component
      v-if="isSearchPanelVisible"
      :is="searchPanelAsyncComponent"
      :search="search"
      :page-size="size"
      :products="products"
      :read-more="readMore"
      @see-more="seeMore"
      @close="$store.commit('ui/setSearchpanel', false)"
      @reload="reloadComponent()"
    />
  </div>
</template>

<script>
import { SfSearchBar } from '@storefront-ui/vue';
import { mapState, mapGetters } from 'vuex';
import SearchPanelMixin from '@vue-storefront/core/compatibility/components/blocks/SearchPanel/SearchPanel';
import ALoadingSpinner from 'theme/components/atoms/a-loading-spinner';
import ALoadingError from 'theme/components/atoms/a-loading-error';
import { Logger } from '@vue-storefront/core/lib/logger'
import { quickSearchByQuery } from '@vue-storefront/core/lib/search'
import { SearchQuery } from 'storefront-query-builder'

const SearchPanel = () =>
  import(/* webpackChunkName: "vsf-search-panel" */ 'theme/components/organisms/o-search-panel');

export default {
  name: 'OSearch',
  components: {
    SfSearchBar
  },
  data () {
    return {
      size: 6,
      searchPanelAsyncComponent: () => ({
        component: SearchPanel(),
        loading: ALoadingSpinner,
        error: ALoadingError,
        timeout: 3000
      })
    }
  },
  mixins: [SearchPanelMixin],
  computed: {
    ...mapGetters('user', ['isLoggedIn']),
    ...mapState({
      isSearchPanelVisible: state => state.ui.searchpanel
    })
  },
  methods: {
    startSearch () {
      if (this.search.length >= 3) {
        this.makeSearch();
      }
    },
    reloadComponent () {
      this.searchPanelAsyncComponent = () => ({
        component: SearchPanel(),
        loading: ALoadingSpinner,
        error: ALoadingError,
        timeout: 3000
      });
    },
     async makeSearch () { 
      this.$store.commit('ui/setCustomLoader', true);
      if (this.search !== '' && this.search !== undefined) {
         let startValue = 0;
        this.start = startValue
        this.readMore = true
        try {
          let searchQuery = new SearchQuery();
          searchQuery     = searchQuery
          .setSearchText(this.search)
          .applyFilter({ key: 'visibility', value: { 'in': [3, 4] } })
          .applyFilter({ key: 'status', value: { 'in': [0, 1] } })
          const searchResult = await quickSearchByQuery
          ({
              entityType : "product",
              query      :  searchQuery,
              start      : this.start,
              size       : this.size
          }); 
          this.products = searchResult.items
          this.start = startValue + this.size
          this.emptyResults = searchResult.items.length < 1
        } catch (err) {
          Logger.error(err, 'components-search from o-search')()
        }
      } else {
        this.products = []
        this.emptyResults = 0
      }
      this.$store.commit('ui/setCustomLoader', false);
    },
    async seeMore () {
      this.$store.commit('ui/setCustomLoader', true);
      if (this.search !== '' && this.search !== undefined) {
        let startValue = this.start;
        try {
          let searchQuery = new SearchQuery();
          searchQuery     = searchQuery
            .setSearchText(this.search)
            .applyFilter({ key: 'visibility', value: { 'in': [3, 4] } })
            .applyFilter({ key: 'status', value: { 'in': [0, 1] } })
          const searchResult = await quickSearchByQuery
          ({
              entityType : "product",
              query      : searchQuery,
              start      : startValue,
              size       : this.size
          });  
          let page = Math.floor(searchResult.total / this.size)
          let exceeed = searchResult.total - this.size * page
          if (startValue === searchResult.total - exceeed) {
            this.readMore = false
          }
          this.products = this.products.concat(searchResult.items)
          this.start = startValue + this.size
          this.emptyResults = this.products.length < 1
        } catch (err) {
           Logger.error(err, 'components-search from o-search')()
        }
      } else {
        this.products = []
        this.emptyResults = 0
      }
      this.$store.commit('ui/setCustomLoader', false);
    }
  }
};
</script>
