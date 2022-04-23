<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <div class="row">
        <category-create @created="addNewCategory" />
        <category-edit />
      </div>
    </section>
  </div>
</template>

<script>
import CategoryEdit from '../components/CategoryEdit.vue'
import CategoryCreate from '../components/CategoryCreate.vue'

export default {
  components: { CategoryEdit, CategoryCreate },
  name: 'categories',
  data() {
    return {
      categories: [],
    }
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
    },
  },
}
</script>
