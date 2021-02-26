<template>
  <div class="m-modal-subscribe">
    <SfModal :visible="isVisible" @close="closeModal">
       <SfImage src="/assets/images/first-visit-bricoleur-img.png" class="capitools-offer-banner" />
       <div class="text-center padding">
          <h1 class="text-center">First time ordering with Capitools ?</h1>
          <SfImage src="/assets/images/capitools-off-image.png" class="capitools-offer" />
          <p>By continuing you have read and understand the Privacy Policy and the Cookies Policy so you agree to receive 
            personalised marketing communication from Capitools by email. *Offer applicable for orders below £500.</p>
          <form @submit.prevent="subscribeExtend" class="form">
            <div class="align-start">
              <template>
                <SfInput
                v-model="email"
                name="email"  
                :valid="!$v.email.$error"
                :placeholder="placeholder"
                :error-message="
                  !$v.email.required
                    ? $t('Field is required.')
                    : $t('Please provide valid e-mail address.')
                "
                class="form__element"
              /> 
              <SfButton class="btn-primary">
                {{ $t("Subscribe") }}
              </SfButton>
              </template>
            </div>
          </form>  
       </div>
    </SfModal>
  </div>
</template>

<script>
import { mapActions } from 'vuex'; 
import { SfModal } from '@storefront-ui/vue'; 
import { SfInput, SfButton, SfImage } from '@storefront-ui/vue';
import i18n from '@vue-storefront/i18n'; 
import Subscribe from '@vue-storefront/core/modules/newsletter/mixins/Subscribe'
import { required, email } from 'vuelidate/lib/validators';
import { ModalList } from 'theme/store/ui/modals'

export default {
  name: 'MModalSubscribe',
  mixins: [Subscribe],
  components: { SfModal, SfInput, SfImage, SfButton },
    data() {
    return {
      value: "",
      type: "email",
      name: "Enter your email",
      errorMessage: "Required.",
      valid: true,
      placeholder: "Enter your email",
      email: ''
    };
  },
  methods: {
    ...mapActions('ui', {
      openModal: 'openModal',
      closeModal: 'closeModal'
    }),
    subscribeExtend () {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.$store.dispatch('notification/spawnNotification', {
          type: 'danger',
          message: this.$t('Please fix the validation errors'),
          action1: { label: this.$t('OK') }
        });
        return;
      }
      this.$store.dispatch('newsletter/status',this.email).then((res) => {  
        if(res){
            this.OnAlreadySubscribed();
        }
        else{
          this.subscribe(this.onSuccesfulSubmission)
        } 
      }) 
    },
    onSuccesfulSubmission (isSubscribed) {
      if (isSubscribed) {
        this.showThankYouModal();
        this.$store.dispatch('notification/spawnNotification', {
          type: 'success',
          message: i18n.t('You have been successfully subscribed to our newsletter!'),
          action1: { label: i18n.t('OK') }
        })
      } 
    },
    OnAlreadySubscribed () {
      this.$store.dispatch('notification/spawnNotification', {
        type: 'danger',
        message: i18n.t('You are already subscribed'),
        action1: { label: i18n.t('OK') }
      });
    },
    showThankYouModal(){
      this.closeModal({ name: ModalList.Subscribe });
      this.openModal({ name: ModalList.ThankYou });
    },
    closeModal () {
      this.$emit('close', this.modalData.name)
    }
  }, 
   validations: {
    email: {
      required,
      email
    }
  },
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
  }
};
</script>
