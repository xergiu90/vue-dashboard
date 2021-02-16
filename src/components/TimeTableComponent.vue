<template>
  <div>
    <a-table
        :columns="columns"
        :row-key="record => record.id"
        :data-source="data"
        :pagination="false"
    >
      <template slot="time" >
        Time
      </template>
    </a-table>
  </div>
</template>

<script>
export default {
  name: 'HomeComponent',
  props: {
    data: Array
  },
  computed: {
    columns() {
      const columns = [{
        title: '',
        dataIndex: 'time',
        width: '25%',
        scopedSlots: {customRender: 'time'},
      }, {
        title: 'Home',
        dataIndex: 'home',
        key: 'home',
        width: '25%',
        scopedSlots: {customRender: 'Home'},
      }, {
        title: 'Escalations',
        dataIndex: 'escalation',
        key: 'escalation',
        width: '25%',
        scopedSlots: {customRender: 'Escalation'},
      }, {
        title: 'Consultation',
        dataIndex: 'consultation',
        key: 'consultation',
        width: '25%',
        scopedSlots: {customRender: 'Consultation'},
      }
      ];
      return columns;
    }
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
