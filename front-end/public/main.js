var vm = new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  data: {
    items: [{
        title: 'Dashboard',
        icon: 'mdi-home'
      },
      {
        title: 'Profile',
        icon: 'mdi-account'
      },
      {
        title: 'Settings',
        icon: 'mdi-settings'
      }
    ],
    drawer: false,
    dark: false,
    inPaging: true,
    currentPage: 'Dashboard',
    showTicket: false,
    loading: false,
    activeTicket: {},
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    //API Data
    tickets: [],
    projects: [],
    stats: [],
    //End API Data
    tickets7days: [],
    headers: [{
        text: 'Ticket Number',
        align: 'left',
        value: 'ticketNumber'
      },
      {
        text: 'Contact',
        value: 'callerName'
      },
      {
        text: 'Subject',
        value: 'subject'
      },
      {
        text: 'Age',
        value: 'age'
      }
    ],
    selected: []
  },
  methods: {
    //input is an iso timestamp and the output is a data and time string
    getTimestamp(da) {
      if (da === null) {
        return ''
      }
      date = new Date(da)
      st = 'AM'
      hour = date.getHours()
      if (hour >= 12) {
        st = 'PM'
      }
      if (hour > 12) {
        hour -= 12
      }
      str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() + 1) + " " + hour + ":" + date.getMinutes() + " " + st
      return str
    },
    //changes visible containers for 'page' selection
    pageChange(page) {
      vm.currentPage = page
    },
    //hides ticket dialog
    hideTicket() {
      vm.showTicket = false
    },
    togglePaging() {
      vm.inPaging = !vm.inPaging
    },
    //opens ticket dialog and loads given ticket number data to activeTicket
    openTicket(num) {
      vm.loading = true
      axios
        .get('http://localhost:5000/api/tickets/' + num.ticketNumber)
        .then(response => {
          vm.activeTicket = response.data
          vm.loading = false
          vm.showTicket = true
        })
    },
    //puts ctiveTicket to given ticket number, if no ticket number it will post which creates another ticket with incremented ticket number
    postTicket(num) {
      if (typeof num !== 'undefined') {
        axios
          .put('http://localhost:5000/api/tickets/' + num, vm.activeTicket)
          .then(() => {
            this.hideTicket()
            this.loadData()
          })
      } else {
        axios
          .post('http://localhost:5000/api/tickets/', vm.activeTicket)
          .then(() => {
            this.hideTicket()
            this.loadData()
          })
      }
    },
    createTicket() {
      vm.activeTicket = {}
      vm.showTicket = true
    },
    loadData() {
      axios
        .get('http://localhost:5000/api/tickets?project=false')
        .then(response => {
          vm.tickets = response.data
        })
      axios
        .get('http://localhost:5000/api/stats/numClosed')
        .then(response => {
          vm.stats = response.data
        })
      axios
        .get('http://localhost:5000/api/tickets?project=true')
        .then(response => {
          vm.projects = response.data
        })
    }
  },
  mounted() {
    this.loadData()
  }
})