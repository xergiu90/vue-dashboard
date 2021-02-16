<template>
  <div class="home">
    <TableComponent :data=data v-if="data.length"/>
    <div class="no-data" v-else>
      No data!
    </div>
  </div>
</template>

<script>
import TableComponent from '@/components/TableComponent.vue';
import axios from "axios";

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
  created() {
    this.getData();
    this.trackTime();
  },
  destroyed() {
    this.$store.dispatch({
      type: 'setTime',
      data: {screen: 'home', time: this.time}
    });
  },
  methods:{
    getData: function () {
      if(!this.$store.state.appointmentData.length) {
        axios.get('interview-consultations.csv', {baseURL: window.location.origin}).then(response => {
          this.$store.dispatch({
            type: 'setConsultations',
            data: this.getJsonData(response.data).filter(item => item.id)
          });

          this.data = this.$store.getters.consultations;
        })
            .catch(error => {
              console.log(error)
            })
      }

      this.data = this.$store.getters.consultations;

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
            case 7: {
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
          map['isEscalated'] = false;

          return map;
        }, {});
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
<style scoped>
.home {
  height: 100%;
}

.no-data {
  font-size: 40px;
  width: 100%;
  text-align: center;
  padding: 20px;
}
</style>
