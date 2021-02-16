<template>
  <div class="consultation">
    <CardComponent :data=data />
  </div>
</template>


<script>
import CardComponent from '@/components/CardComponent.vue';

export default {
  name: 'Consultation',
  components: {
    CardComponent
  },
  data() {
    return {
      data: {},
      time: 0
    }
  },
  mounted() {
    this.getData();
  },
  created(){
    this.trackTime();
  },
  destroyed() {
    this.$store.dispatch({
      type: 'setTime',
      data: {screen: 'consultation', time: this.time}
    });
  },
  methods: {
    getData: function () {
      if(this.$store.getters.consult.id) {
        this.data = this.$store.getters.consult;
      } else {
        this.$router.push({ name: 'Home' });
      }
    },
    trackTime() {
      setInterval(() => {
        this.time++;
      }, 1000);
    }
  }
}
</script>
