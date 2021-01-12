<template>
  <SfSelect
    v-model="selectedValue" 
    :label="label"
    :required="required"
    :valid="valid"
    :disabled="disabled"
    :error-message="errorMessage"
    :placeholder="placeholder"
    @input="alert(selectedValue)"
    style="max-width: 30rem; margin: 10px;"
  >
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
  data() {
    return { 
      label: "i",
      required: false,
      valid: true,
      disabled: false,
      errorMessage: "Color",
      placeholder: "select color",
    };
  },
};
</script>