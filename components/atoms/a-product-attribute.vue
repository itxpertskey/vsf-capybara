<template> 
  <SfProperty
    class="a-product-attribute"
    :name="getAttributeName()"
    :value="value | htmlDecode"
  />
</template>

<script>
import { SfProperty } from '@storefront-ui/vue';
import { ProductAttribute } from '@vue-storefront/core/modules/catalog/components/ProductAttribute';

export default {
  name: 'AProductAttribute',
  mixins: [ProductAttribute],
  components: {
    SfProperty
  }, 
  methods: {
    getAttributeName(){
      let attributename = this.label;
      if(attributename.charAt(0) === '+')
      {
        attributename = attributename.substring(1);
      }
      return attributename;
    }
  }
};
</script>
