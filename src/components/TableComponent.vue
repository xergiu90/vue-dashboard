<template>
  <div>
    <a-input
        :placeholder="`Search...`"
        style="width: 100%; margin-bottom: 8px; padding: 20px; display: block;"
        @change="e => handleSearch(e.target.value ? [e.target.value] : [])"
        @pressEnter="e => handleSearch(e.target.value)"
    />
    <a-table
        :columns="columns"
        :row-key="record => record.id"
        :data-source="dataSearch"
        :pagination="pagination"
        @change="handleTableChange"
    >
      <template slot="actions" slot-scope="text, record">
        <a-button v-on:click='redirectConsultation(record)'>Open Consultations</a-button>
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
  data() {
    return {
      dataSearch: [],
      countryFilter: [],
      nameFilter: [],
      consulationFilter: [],
      dateFilter: [],
      timeLeftFilter: [],
      pagination: {},
      sortedInfo: null,
    }
  },
  mounted() {
    this.compileData(this.data);
  },
  computed: {
    columns() {
      let {sortedInfo} = this;
      sortedInfo = sortedInfo || {};
      const columns = [{
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.localeCompare(b.name),
        sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
        filters: this.nameFilter,
        onFilter: (value, record) => record.name.indexOf(value) === 0,
        width: '16%',
        scopedSlots: {customRender: 'Name'},
      }, {
        title: 'Consult Type',
        dataIndex: 'consultType',
        key: 'consultType',
        sorter: (a, b) => a.consultType.localeCompare(b.consultType),
        sortOrder: sortedInfo.columnKey === 'consultType' && sortedInfo.order,
        filters: this.consulationFilter,
        onFilter: (value, record) => record.consultType.indexOf(value) === 0,
        width: '16%',
        scopedSlots: {customRender: 'consultType'},
      }, {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
        sorter: (a, b) => a.country.localeCompare(b.country),
        sortOrder: sortedInfo.columnKey === 'country' && sortedInfo.order,
        filters: this.countryFilter,
        onFilter: (value, record) => record.country.indexOf(value) === 0,
        width: '16%',
        scopedSlots: {customRender: 'country'},
      }, {
        title: 'Consultation Date',
        dataIndex: 'consultationDate',
        key: 'consultationDate',
        sorter: (a, b) => new Date(b.consultationDate) - new Date(a.consultationDate),
        sortOrder: sortedInfo.columnKey === 'consultationDate' && sortedInfo.order,
        filters: this.dateFilter,
        onFilter: (value, record) => record.consultationDate.indexOf(value) === 0,
        width: '17.5%',
        scopedSlots: {customRender: 'consultationDate'},
      }, {
        title: 'Time Left',
        dataIndex: 'timeLeft',
        key: 'timeLeft',
        sorter: (a, b) => a.timeLeft.localeCompare(b.timeLeft),
        sortOrder: sortedInfo.columnKey === 'timeLeft' && sortedInfo.order,
        filters: this.timeLeftFilter,
        onFilter: (value, record) => record.timeLeft.indexOf(value) === 0,
        width: '16%',
        scopedSlots: {customRender: 'timeLeft'},
      }, {
        title: 'Actions',
        dataIndex: 'actions',
        width: '16%',
        scopedSlots: {customRender: 'actions'},
      }
      ];
      return columns;
    },
  },
  methods: {
    compileData: function (data) {
      let {sortedInfo} = this;
      this.sortedInfo = sortedInfo || {};
      this.dataSearch = data;
      this.setFilters(data);

    },
    handleTableChange(pagination, filters, sorter) {
      this.pagination = pagination
      this.sortedInfo = sorter;
    },
    handleSearch(value) {
      if(value[0]){
        let searchTerms= value[0].split(" ");
        searchTerms.forEach( (string, index) => {
            if( index > 0) {
              this.dataSearch= this.search(this.dataSearch, string);
            } else {
              this.dataSearch= this.search(this.data, string);
            }

        });
      } else {
        this.dataSearch= this.data;
      }
    },
    setFilters(data){
      data.forEach(
          item => {
            if (this.countryFilter.filter(function(e) { return e.value === item.country }).length === 0) {
              this.countryFilter.push({text: item.country, value: item.country});
            }

            if (this.nameFilter.filter(function(e) { return e.value === item.name }).length === 0) {
              this.nameFilter.push({text: item.name, value: item.name});
            }

            if (this.consulationFilter.filter(function(e) { return e.value === item.consultType }).length === 0) {
              this.consulationFilter.push({text: item.consultType, value: item.consultType});
            }

            if (this.dateFilter.filter(function(e) { return e.value === item.consultationDate }).length === 0) {
              this.dateFilter.push({text: item.consultationDate, value: item.consultationDate});
            }


            if (this.timeLeftFilter.filter(function(e) { return e.value === item.timeLeft }).length === 0) {
              this.timeLeftFilter.push({text: item.timeLeft, value: item.timeLeft});
            }

          }
      );
    },
    search(data, input) {
        let searchLower = input.toLowerCase();
        let filtered =  data.filter(item => {
          if (item.name.toLowerCase().includes(searchLower)) {
            return true;
          }

          if (item.consultType.toLowerCase().includes(searchLower)) {
            return true;
          }

          if (item.consultType.toLowerCase().includes(searchLower)) {
            return true;
          }

          if (item.country.toLowerCase().includes(searchLower)) {
            return true;
          }

          if (item.consultationDate.toLowerCase().includes(searchLower)) {
            return true;
          }

          if (item.timeLeft.toLowerCase().includes(searchLower)) {
            return true;
          }

          return false;
        })

        return filtered;
    },
    redirectConsultation(data) {
      this.$store.dispatch({
        type: 'setConsultationData',
        data: data
      });
      this.$router.push({ name: 'Consultation' })
    }
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
