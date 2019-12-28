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
    activeTicket: {},
    pageTitle: 'Dashboard',
    closedToday: '5',
    closedWeek: '20',
    closedMonth: '100',
    //API Data
    tickets: [],
    projects: [],
    stats:[],
    //End API Data
    loadingTickets: true,
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
        text: 'Problem',
        value: 'problem'
      },
      {
        text: 'Age',
        value: 'age'
      }
    ],
    selected: []
  },
  methods: {
    pageChange(page) {
      vm.currentPage = page
      vm.pageTitle = page
    },
    hideTicket() {
      vm.showTicket = false
    },
    togglePaging() {
      vm.inPaging = !vm.inPaging
    },
    openTicket(num) {
      vm.showTicket = true
      axios
        .get('http://localhost:5000/api/tickets/' + num.ticketNumber)
        .then(response => {
          vm.activeTicket = response.data
        })
    },
    postTicket(num) {
      axios
        .put('http://localhost:5000/api/tickets/' + num, vm.activeTicket)
        .then(this.hideTicket())
    },
    getTickets(){
      axios
      .get('http://localhost:5000/api/tickets')
      .then(response => {
        vm.tickets = response.data
        vm.loadingTickets = false
      })
    }
  },
  mounted() {
    axios
      .get('http://localhost:5000/api/tickets')
      .then(response => {
        vm.tickets = response.data
        vm.loadingTickets = false
      })
      axios
      .get('http://localhost:5000/api/stats/numClosed')
      .then(response => {
        vm.stats = response.data
      })
  }
})