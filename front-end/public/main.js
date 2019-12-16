var vm = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    props: {
        source: String,
      },
    data: {
        items: [
          { title: 'Dashboard', icon: 'mdi-home' },
          { title: 'Profile', icon: 'mdi-account' },
          { title: 'Settings', icon: 'mdi-settings'}
        ],
        drawer: false,
        dark:false,
        inPaging: true,
        currentPage: 'Dashboard',
        showTicket:true,
        ticketNum: '1234',
        pageTitle: 'Dashboard',
        closedToday: '5',
        closedWeek: '20',
        closedMonth: '100',
        tickets:[
          {
            ticketNum: '1234',
            caller: 'Chase Carter',
            problem: 'problem #1'
          },
          {
            ticketNum: '1235',
            caller: 'Carter Chase',
            problem: 'problem #2'
          }
        ],
        projects: [

        ],
        tickets7days: [

        ],
        headers: [
          {
            text: 'Ticket Number',
            align: 'left',
            value: 'ticketNum'
          },
          {
            text: 'Caller',
            value: 'caller'
          },
          {
            text: 'Problem',
            value: 'problem'
          }
        ]
      },
    methods: {
      pageChange(page){
        vm.currentPage = page
        vm.pageTitle = page
      },
      hideTicket(){
        vm.showTicket = false
      },
      togglePaging(){
        vm.inPaging = !vm.inPaging
      }
    } 
  })