<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th scope="col" colspan="3">Description / Quantity</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="localItems.length">
          <!-- food is the item in the array , i is the index number -->
          <!-- item is the prop in the component -->
          <!-- v-for now requires a key -->
          <!-- @remove is the method that the child component can emit a call. 
              if the child emits this method $emit('remove'). the deleteMethod 
              in the parent is called
          -->
          <!-- @show will make the data for the child element editible in the parent. 
              This shows how the object is passed by reference and as a result when 
              you edit it in the parent it also edits it in the child. The same can happen 
              vice versa. 
          -->
          <!-- the is attributes allow you to dynamically assign a component. Thus you don't have 
          to use if else statements to decide on what component to use.-->
          <tr
            v-for="(food, i) in localItems"
            :item="food"
            :key="food.name"
            @remove="deleteItem(i)"
            @show="fieldInput = food"
            :is="food.type"
          ></tr>
        </template>
      </tbody>
      <tfoot>
        <tr>
          <th scope="row">Total:</th>
          <td colspan="3" class="total">{{ total }}</td>
        </tr>
      </tfoot>
    </table>
    <!-- These fields are used to add or edit items to the inventory. 
        Creating a new item will create a new object, but when editing an item
        it'll just reference that actual object and you can edit it directly.
    -->
    <div class="new-item">
      <div>
        <label>Fruit Name: </label>
        <input type="text" v-model="fieldInput.name" />
      </div>
      <div>
        <label>Quantity: </label>
        <input type="number" v-model.number="fieldInput.quantity" />
      </div>
      <div>
        <label>Type: </label>
        <select v-model="fieldInput.type">
          <template v-for="(option, index) in options">
            <option
              :key="index"
              :value="option.value"
              v-if="option.value == fieldInput.type"
              selected="selected"
            >
              {{ option.text }}
            </option>
            <option :key="index" :value="option.value" v-else>
              {{ option.text }}
            </option>
          </template>
        </select>
      </div>
      <div v-if="fieldInput.type == 'pastry'">
        <label>Description: </label>
        <input type="text" v-model="fieldInput.description" />
      </div>
      <!-- When a new object is to be created for a new item it adds the item-->
      <button @click="addItem(fieldInput)" v-if="!containsItem(fieldInput)">
        Add Item
      </button>
      <!-- When editing an existing object no copy is necessary, this button
          is just there to allow the users to swithc back from editing to creating
          a new item
      -->
      <button @click="fieldInput = {}" v-else>Create New</button>
    </div>
  </div>
</template>

<script>
import Fruit from "./Fruit";
import Pastry from "./Pastry";
export default {
  name: "table-widget",
  components: { Fruit, Pastry },
  props: ["items"],
  data() {
    return {
      localItems: this.items,
      fieldInput: { type: "fruit" },
      options: [
        { text: "Fruit", value: "fruit" },
        { text: "Pastry", value: "pastry" },
      ],
    };
  },
  methods: {
    addItem: function (food) {
      // Pushes the object into the local Item Array
      this.localItems.push(food);
      // Points the fieldInput to a new empty object
      this.fieldInput = {};
    },
    deleteItem: function (i) {
      // Remove an object from array
      this.localItems.splice(i, 1);
    },
    showItem: function (i) {
      /* Points the fieldInput to the object in the array. You'll see 
       that you'll be able to edit the object directly in the array because it is 
       now referencing the same object.
      */
      this.fieldInput = i;
    },
    /* Just checking to see if the item being viewed is an existing item
     or a new item. So we can toggle the add and create new item buttons */
    containsItem: function (item) {
      var i;
      for (i = 0; i < this.localItems.length; i++) {
        if (this.localItems[i] === item) {
          return true;
        }
      }

      return false;
    },
  },
  /* Does a calculations of all the values of a specific column. 
    it does not have to be a separate component. 
  */
  computed: {
    total: function () {
      if (this.localItems.length < 1) {
        return 0;
      }
      return this.localItems
        .map((item) => item.quantity)
        .reduce(
          (AccumulateTotal, currentQuantity) =>
            parseInt(AccumulateTotal) + parseInt(currentQuantity)
        );
    },
  },
};
</script>

<style lang="stylus" scoped>
/* Just some CSS to make things easier to look at */
thead, tfoot {
  background-color: #3f87a6;
  color: #fff;
}

tbody {
  background-color: #e4f0f5;
}

caption {
  padding: 10px;
  caption-side: bottom;
}

table {
  border-collapse: collapse;
  border: 2px solid rgb(200, 200, 200);
  letter-spacing: 1px;
  font-family: sans-serif;
  font-size: 0.8rem;
  width: 500px;
}

div.new-item {
  margin: 10px 0px;
  padding: 10px;
  background-color: #F9F9F9;
}

div.new-item > div {
  margin: 10px;
}

div.new-item button {
  float: right;
}

td.total {
  text-align: right;
  padding-right: 20px;
}
</style>