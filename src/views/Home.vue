<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <loader v-if="loading" />

    <div v-else class="row">
      <home-bill :rates="currency.rates" />
      <home-currency :rates="currency.rates" :date="currency.date" />
    </div>
  </div>
</template>

<script>
import HomeBill from '../components/HomeBill.vue'
import HomeCurrency from '../components/HomeCurrency.vue'
// @ is an alias to /src

export default {
  data() {
    return {
      loading: true,
      currency: null,
    }
  },
  async mounted() {
    this.currency = await this.$store.dispatch('fetchCurrency')
    this.loading = false
  },
  methods: {
    async refresh() {
      this.loading = true
      this.currency = await this.$store.dispatch('fetchCurrency')
      this.loading = false
    },
  },
  components: { HomeBill, HomeCurrency },
  name: 'Home',
}
</script>
