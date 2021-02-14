<template>
  <div class="home">
    <HomeComponent :data=data />
  </div>
</template>

<script>
// @ is an alias to /src
import HomeComponent from '@/components/HomeComponent.vue';
import axios from "axios";

export default {
  name: 'Home',
  components: {
    HomeComponent
  },
  data() {
    return {
      data: []
    }
  },
  async mounted() {
    this.getData();
  },
  methods:{
    getData: function (){
      return axios
          .get('interview-consultations.csv', {baseURL: window.location.origin}).then(response => {
            this.data = this.getJsonData(response.data).filter(item => item.id);

          })
          .catch(error => {
            console.log(error)
          })
          .finally(() => console.log(this.data));
    },
    getJsonData: function (csv) {
      let rows = csv.split(/\r?\n/);
      rows.shift();
      return rows.map(function (row) {
        let complex = false;
        return row.split(",").reduce(function (map, val, i) {

          if (val.startsWith("\""))
            complex = true;


          switch (i) {
            case 0:
              map['id'] = val;
              break;
            case 1:
              map['name'] = val;
              break;
            case 2:
              map['name'] = map['name'] + " " + val;
              break;
            case 3:
              map['consultType'] = val;
              break;
            case 4:
              map['country'] = val;
              break;
            case 5:
              if (complex) {
                map['country'] = map['country'] + val;
              } else {
                map['country'] = map['country'] + ", " + val;
              }
              break;
            case 6:
              if (complex) {
                map['country'] = map['country'] + ", " + val;
              } else {
                map['consultationDate'] = val;
                let dateAppointment = new Date(val);
                let date = new Date();

                const milliseconds = Math.abs(date - dateAppointment);
                const hours = milliseconds / 36e5;
                if (hours > 8) {
                  map['timeLeft'] = '0 hours';
                } else {
                  map['timeLeft'] = hours.toFixed(2) + ' hours';
                }
              }
              break;
            case 7:{
              map['consultationDate'] = val;
              let dateAppointment = new Date(val);
              let date = new Date();

              const milliseconds = Math.abs(date - dateAppointment);
              const hours = milliseconds / 36e5;
              if (hours > 8) {
                map['timeLeft'] = '0 hours';
              } else {
                map['timeLeft'] = hours.toFixed(2) + ' hours';
              }
              break;
            }
          }
          return map;
        }, {});
      });
    }
  }

}
</script>
