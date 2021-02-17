<template>
  <div class="m-modal-subscribe">
    <SfModal :visible="isVisible" @close="closeModal">
        <SfImage src="/assets/images/first-visit-bricoleur-Confirmation-img.png" class="capitools-offer-banner" />
        <div class="padding">
          <h3 class="text-center text-primary">Your request has been registered successfully. Please find your code below :</h3>
          <div class="coupon-code d-flex align-center">
              <h1>Welcome5%</h1>
               <span id="copy_code_text" @click.stop.prevent="copyVoucherCode">Click to copy code</span>  
          </div>
            <p>You will receive a voucher code to the entered email address.
               <input type="text" value="WELCOME5%" id="vocher_code" style="opacity:0">
            </p>  
        </div>
    </SfModal>
  </div>
</template>

<script>
import { SfModal } from '@storefront-ui/vue'; 
import { SfInput, SfButton, SfImage } from '@storefront-ui/vue';

export default {
  name: 'MModalSubscribe',
  components: { SfModal, SfInput, SfImage, SfButton },

  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    modalData: {
      type: Object,
      default: () => ({}),
      required: true
    }
  },
  methods: {
    closeModal () {
      this.$emit('close', this.modalData.name)
    },
    copyVoucherCode(){
      document.getElementById("copy_code_text").textContent="Copied!";
      var copyText = document.getElementById("vocher_code");
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      document.execCommand("copy");  
    }  
  }
};
</script>
