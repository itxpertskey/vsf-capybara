<template>
  <SfSelect label="i" valid value=""  style="max-width: 30rem; margin: 10px;">
    <SfSelectOption value=""> 
      <li> <a href="/pages/our-promise">Our Promise</a> </li>
    </SfSelectOption>
    <SfSelectOption value=""> 
      <li>  <a href="/pages/delivery"> Free Delivery</a> </li>
    </SfSelectOption>
    <SfSelectOption value=""> 
      <li> <a href="/pages/expert-advice">Expert Advice</a> </li>
    </SfSelectOption>
    <SfSelectOption value=""> 
      <li class="last"> <a href="/pages/returns">30 Day Returns</a> </li>
    </SfSelectOption>
    <SfSelectOption value=""> 
      <li> <a href="/pages/capitools-service-and-customer-care">Help</a> </li>
    </SfSelectOption> 
  </SfSelect>
</template>
<script>
import { SfSelect } from "@storefront-ui/vue";
import { SfProductOption } from "@storefront-ui/vue";
export default {
  components: {
    SfSelect,
    SfProductOption,
  },
};
</script>