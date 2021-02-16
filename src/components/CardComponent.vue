<template>
  <div>
    <a-card :title="data.name" :bordered="true">
      <div>Consultation Type: {{data.consultType}}</div>
      <div>Country: {{data.country}}</div>
      <div>Consultation Date: {{data.consultationDate}}</div>

      <div>
        <a-button type="primary" v-on:click="prescribe()">Prescribe</a-button>
        <a-button type="danger" v-on:click="showModal()">Escalate</a-button>
      </div>
      <a-modal v-model="visible" title="Reason" @ok="escalate()">
        <a-textarea
            v-model="value"
            placeholder="Enter escalation reason"
            :auto-size="{ minRows: 3, maxRows: 5 }"
        />
      </a-modal>
    </a-card>
  </div>
</template>

<script>
export default {
  name: 'CardComponent',
  props: {
    data: Object
  },
  data() {
    return {
      appointmentsData: [],
      visible: false,
      value: ''
    }
  },
  mounted() {
    this.appointmentsData = this.$store.getters.appointments;
  },
  computed: {
  },
  methods: {
    escalate: function () {
      this.visible = false;
      let appointmentIndex = this.appointmentsData.findIndex((obj => obj.id === this.data.id));
      this.appointmentsData[appointmentIndex].isEscalated= true;
      this.$store.dispatch({
        type: 'setConsultations',
        data: this.appointmentsData
      })
      this.$router.back();
    },
    prescribe: function () {
      this.$router.back();
    },
    showModal() {
      this.visible = true;
    }
  }
}
</script>
<style scoped>
div {
  padding-top: 20px;
}

::v-deep .ant-card-body {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
}

::v-deep .ant-modal-content {
  height: 225px;
}

button {
  margin: 10px;
}
</style>
