// frontend/src/components/DataComponent.vue
<template>
  <div>
    <ul>
      <li v-for="item in items" :key="item._id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      items: []
    };
  },
  async mounted() {
    const response = await axios.get('http://localhost:3000/data');
    this.items = response.data;
  }
}
</script>
