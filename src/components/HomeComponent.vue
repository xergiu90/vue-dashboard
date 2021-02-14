<template>
  <div>
    <a-table
        :columns="columns"
        :row-key="record => record.id"
        :data-source="dataSearch"
        :pagination="pagination"
        @change="handleTableChange"
    >
      <div
          slot="filterDropdown"
          slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
          style="padding: 8px"
      >
        <a-input
            v-ant-ref="c => (searchInput = c)"
            :placeholder="`Search ${column.dataIndex}`"
            :value="selectedKeys[0]"
            style="width: 188px; margin-bottom: 8px; display: block;"
            @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
            @pressEnter="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
        />
        <a-button
            type="primary"
            icon="search"
            size="small"
            style="width: 90px; margin-right: 8px"
            @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
        >
          Search
        </a-button>
        <a-button size="small" style="width: 90px" @click="() => handleReset(clearFilters)">
          Reset
        </a-button>
      </div>
      <a-icon
          slot="filterIcon"
          slot-scope="filtered"
          type="search"
          :style="{ color: filtered ? '#108ee9' : undefined }"
      />
      <template slot="customRender" slot-scope="text, record, index, column">
      <span v-if="searchText && searchedColumn === column.dataIndex">
        <template
            v-for="(fragment, i) in text
            .toString()
            .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
        >
          <mark
              v-if="fragment.toLowerCase() === searchText.toLowerCase()"
              :key="i"
              class="highlight"
          >{{ fragment }}</mark>
          <template v-else>{{ fragment }}</template>
        </template>
      </span>
        <template v-else>
          {{ text }}
        </template>

      </template>
      <template slot="actions">
        <a-button>Open Consultations</a-button>
      </template>
    </a-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'HomeComponent',
  props: {
    msg: String
  },
  data() {
    return {
      data: [],
      dataSearch: [],
      countryFilter: [],
      nameFilter: [],
      consulationFilter: [],
      dateFilter: [],
      timeLeftFilter: [],
      pagination: {},
      searchText: '',
      searchInput: null,
      searchedColumn: '',
      sortedInfo: null,
    }
  },
  mounted() {
    this.getData();
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
        onFilter: (value, record) => record.country.indexOf(value) === 0 || record.country
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase()),
        width: '16%',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'filterIcon',
          customRender: 'customRender',
        },
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.focus();
            }, 0);
          }
        },
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
    getJsonData: function (csv) {
      let rows = csv.split(/\r?\n/);
      console.log(rows[0]);
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
                // console.log(hours)
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


          return map;
        }, {});
      });
    },
    getData: function () {
      let {sortedInfo} = this;
      this.sortedInfo = sortedInfo || {};
      return axios
          .get('interview-consultations.csv', {baseURL: window.location.origin}).then(response => {
            this.data = this.getJsonData(response.data).filter(item => item.id);
            this.dataSearch = this.data;
            this.setFilters(this.data);
          })
          .catch(error => {
            console.log(error)
          })
          .finally(() => console.log(this.data));
    },
    handleTableChange(pagination, filters, sorter) {
      this.pagination= pagination;
      this.sortedInfo = sorter;
    },
    // handleSearch(value) {
    //   console.log(value)
    //   let searchTerms= value[0].split(" ");
    //   searchTerms.forEach( string => {
    //     this.search(string);
    //     console.log(this.search(string));
    //   });
    //
    //   console.log(value);
    // },
    handleSearch(selectedKeys, confirm, dataIndex) {
      confirm();
      this.searchText = selectedKeys[0];
      this.searchedColumn = dataIndex;
    },
    handleReset(clearFilters) {
      clearFilters();
      this.searchText = '';
    },
    setFilters(data) {
      data.forEach(
          item => {
            if (this.countryFilter.filter(function (e) {
              return e.value === item.country
            }).length === 0) {
              this.countryFilter.push({text: item.country, value: item.country});
            }

            if (this.nameFilter.filter(function (e) {
              return e.value === item.name
            }).length === 0) {
              this.nameFilter.push({text: item.name, value: item.name});
            }

            if (this.consulationFilter.filter(function (e) {
              return e.value === item.consultType
            }).length === 0) {
              this.consulationFilter.push({text: item.consultType, value: item.consultType});
            }

            if (this.dateFilter.filter(function (e) {
              return e.value === item.consultationDate
            }).length === 0) {
              this.dateFilter.push({text: item.consultationDate, value: item.consultationDate});
            }


            if (this.timeLeftFilter.filter(function (e) {
              return e.value === item.timeLeft
            }).length === 0) {
              this.timeLeftFilter.push({text: item.timeLeft, value: item.timeLeft});
            }

          }
      );
    },
    search(input) {
      // return Object.keys(this.dataSearch).filter(key => {
      //   return this.dataSearch[key].name.includes(input)
      // })
      //     .map(foundKey => ({...obj[foundKey], key: foundKey }))


      //we test if searchString is empty in that case we just return the original data
      if (typeof input !== 'string' || input.length === 0) {
        this.dataSearch = this.data;
        return true;
      }

      //we make search string lower case
      let searchLower = input.toLowerCase();
      let filtered = this.dataSearch.filter(item => {
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
