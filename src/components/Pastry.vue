<template>
  <tr>
    <th scope="row" @click="$emit('show')">{{ pastry.name }}</th>
    <td>{{ pastry.description }}</td>
    <td>{{ pastry.quantity }}</td>
    <td class="delete" @click="$emit('remove')">Delete</td>
  </tr>
</template>
<script>
export default {
  name: "pastry",
  props: ["item"],
  data() {
    return {
      pastry: this.item,
    };
  },
};
</script>

<style scoped>
td,
th {
  border: 1px solid rgb(190, 190, 190);
  padding: 5px 10px;
}

td {
  text-align: center;
}

td.delete,
th {
  text-decoration: underline;
}
</style>
