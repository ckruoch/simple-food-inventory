import Vue from "vue";
import TableWidget from "./components/TableWidget";

Vue.component("table-widget", TableWidget);
const app = new Vue({
  el: "#app"
});
