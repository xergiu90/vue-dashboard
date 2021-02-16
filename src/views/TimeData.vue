<template>
  <div class="time">
    <TimeTableComponent :data=data />
  </div>
</template>


<script>
import TimeTableComponent from "@/components/TimeTableComponent";

export default {
  name: 'Consultation',
  components: {
    TimeTableComponent
  },
  data() {
    return {
      data: [],
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData: function () {
      const tempObj=  Object.assign({}, this.$store.getters.getTimeData);
      this.data = [this.formatData(tempObj)];
    },
    formatData(data) {
      data.consultation= data.consultation + ' s';
      data.home= data.home + ' s';
      data.escalation= data.escalation + ' s';

      return data;
    }
  }
}
</script>
