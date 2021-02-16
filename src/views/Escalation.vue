<template>
  <div class="escalations">
    <TableComponent :data=data v-if="data.length"/>
    <div class="no-data" v-else>
      No data!
    </div>
  </div>
</template>

<script>
import TableComponent from '@/components/TableComponent.vue';

export default {
  name: 'Home',
  components: {
    TableComponent
  },
  data() {
    return {
      data: [],
      time: 0
    }
  },
  mounted() {
    this.getData();
  },
  created() {
    this.trackTime();
  },
  destroyed() {
    this.$store.dispatch({
      type: 'setTime',
      data: {screen: 'escalation', time: this.time}
    });
  },
  methods: {
    getData: function () {
      this.data = this.$store.getters.escalations;
    },
    checkActivity(){
      this.$store.dispatch({
        type: 'refresh'
      });
    },
    trackTime() {
      setInterval(() => {
        this.time++;
      }, 1000);
    }
  }
}
</script>
<style>
.no-data {
  font-size: 40px;
  width: 100%;
  text-align: center;
  padding: 20px;
}
</style>
