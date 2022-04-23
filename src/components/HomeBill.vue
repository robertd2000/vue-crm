<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

        <p v-for="currency of currencies" :key="currency" class="currency-line">
          <span>
            {{ getCurrency(currency) }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['rates'],
  data() {
    return {
      currencies: ['RUB', 'USD', 'EUR'],
    }
  },
  computed: {
    base() {
      return (
        this.$store.getters.info.bill / (this.rates['RUB'] / this.rates['EUR'])
      )
    },
  },
  methods: {
    getCurrency(currency) {
      return this.currencyFilter(
        Math.floor(this.base * this.rates[currency]),
        currency
      )
    },
    currencyFilter(value, currency = 'RUB') {
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency,
      }).format(value)
    },
  },
}
</script>

<style></style>
