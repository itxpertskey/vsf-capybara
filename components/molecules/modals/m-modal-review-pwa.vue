<template>
  <div class="m-modal-review modal-content">
    <SfModal :visible="isVisible" @close="closeModal"> 
      <iframe :src="setReviewUrl" title="Capitools">
      </iframe> 
    </SfModal>
  </div>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators';
import { SfModal, SfInput, SfButton } from '@storefront-ui/vue';

export default {
  name: 'MModalReview',
  components: { SfModal, SfInput, SfButton },
  data () {
    return {
      formData: {
        name: '',
        email: '',
        summary: '',
        review: ''
      },
      reviewUrl : ''
    }
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false,
      required: true
    },
    modalData: {
      type: Object,
      default: () => ({}),
      required: true
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.user.current;
    },
    setReviewUrl(){
      return "https://www.capitools.co.uk/review/product/list/id/"+this.modalData.payload+"/pwa/pwa-review#review-form";
    }
  },
  mounted () {
    this.fillInUserData()
  },
  methods: {
    closeModal () {
      this.$emit('close', this.modalData.name)
    },
    clearReviewForm () {
      this.formData.name = '';
      this.formData.email = '';
      this.formData.summary = '';
      this.formData.review = '';
      this.$v.$reset();
    },
    fillInUserData () {
      if (this.currentUser) {
        this.formData.name = this.currentUser.firstname;
        this.formData.email = this.currentUser.email;
      }
    },
    async submit () {
      this.$v.$touch();
      if (this.$v.$invalid) return
      const isReviewCreated = await this.$store.dispatch('review/add', {
        product_id: this.modalData.payload,
        title: this.formData.summary,
        detail: this.formData.review,
        nickname: this.formData.name,
        review_entity: 'product',
        customer_id: this.currentUser ? this.currentUser.id : null
      });

      if (isReviewCreated) {
        this.$store.dispatch('notification/spawnNotification', {
          type: 'success',
          message: this.$t('You submitted your review for moderation.'),
          action1: { label: this.$t('OK') }
        });
        this.clearReviewForm()
        this.closeModal()
        return;
      }

      this.$store.dispatch('notification/spawnNotification', {
        type: 'danger',
        message: this.$t('Something went wrong. Try again in a few seconds.'),
        action1: { label: this.$t('OK') }
      });
    }
  },
  validations: {
    formData: {
      name: {
        minLength: minLength(2),
        required
      },
      email: {
        required,
        email
      },
      summary: {
        required
      },
      review: {
        required
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.form {
  width: 100%;
  &__element {
    margin: var(--spacer-base) 0;
  }
  &__submit {
    margin: var(--spacer-xl) 0 0 0;
  }
}
</style>
