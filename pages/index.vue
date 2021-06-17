<template>
  <div>
    <div class="wrapper">
      <a @click.prevent="showParams" class="params"><svg ref="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M3.34 17a10.018 10.018 0 0 1-.978-2.326 3 3 0 0 0 .002-5.347A9.99 9.99 0 0 1 4.865 4.99a3 3 0 0 0 4.631-2.674 9.99 9.99 0 0 1 5.007.002 3 3 0 0 0 4.632 2.672c.579.59 1.093 1.261 1.525 2.01.433.749.757 1.53.978 2.326a3 3 0 0 0-.002 5.347 9.99 9.99 0 0 1-2.501 4.337 3 3 0 0 0-4.631 2.674 9.99 9.99 0 0 1-5.007-.002 3 3 0 0 0-4.632-2.672A10.018 10.018 0 0 1 3.34 17zm5.66.196a4.993 4.993 0 0 1 2.25 2.77c.499.047 1 .048 1.499.001A4.993 4.993 0 0 1 15 17.197a4.993 4.993 0 0 1 3.525-.565c.29-.408.54-.843.748-1.298A4.993 4.993 0 0 1 18 12c0-1.26.47-2.437 1.273-3.334a8.126 8.126 0 0 0-.75-1.298A4.993 4.993 0 0 1 15 6.804a4.993 4.993 0 0 1-2.25-2.77c-.499-.047-1-.048-1.499-.001A4.993 4.993 0 0 1 9 6.803a4.993 4.993 0 0 1-3.525.565 7.99 7.99 0 0 0-.748 1.298A4.993 4.993 0 0 1 6 12c0 1.26-.47 2.437-1.273 3.334a8.126 8.126 0 0 0 .75 1.298A4.993 4.993 0 0 1 9 17.196zM12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0-2a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/></svg></a>
      <a @click.prevent="reload" class="reload" :class="{ active: $fetchState.pending }"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M5.463 4.433A9.961 9.961 0 0 1 12 2c5.523 0 10 4.477 10 10 0 2.136-.67 4.116-1.81 5.74L17 12h3A8 8 0 0 0 6.46 6.228l-.997-1.795zm13.074 15.134A9.961 9.961 0 0 1 12 22C6.477 22 2 17.523 2 12c0-2.136.67-4.116 1.81-5.74L7 12H4a8 8 0 0 0 13.54 5.772l.997 1.795z"/></svg></a>
        <div class="container">
          <div class="row">
            <div class="twelve column">
              <h1>
                {{name}}
              </h1>
              <h5>{{humidity||'--'}}%</h5>
            </div>
          </div>
        </div>
        <div class="ground" :style="{backgroundColor: mudColor}">
          <svg class="plant" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" enable-background="new 0 0 64 64"><g fill="#83bf4f"><path d="M48.5,38.4c-8,0-10.1-6.6-10.1-6.6s2.1-8.3,10.1-8.3C54,23.5,63,31,63,31S54,38.4,48.5,38.4z"/><path d="M18,6.7c6.3,6.4,2.6,13.6,2.6,13.6s-7.7,4.4-14-2C2.3,13.9,1,1,1,1S13.7,2.3,18,6.7z"/></g><g fill="#75a843"><path d="m63 31c-5-1-10.1-1.6-15.1-1-4.9.5-9.9 2.3-13.2 5.7-1.7 1.7-2.9 3.7-3.5 5.9-.1.5-.2 1.1-.3 1.6-.1.6 0 1 0 1.7l.2 3.8.7 15.3h-5l.8-15.3.2-3.8c0-.6.1-1.4.2-2.1.1-.7.3-1.4.5-2.1.9-2.7 2.6-5 4.7-6.7 2.1-1.8 4.5-3 7-3.9 2.5-.8 5.1-1.2 7.7-1.3 5.1-.2 10.2.8 15.1 2.2"/><path d="m1 1c5.2 3.2 10 7.2 14.2 11.7 4.2 4.5 8 9.4 11.1 14.8 1.5 2.7 3 5.5 3.9 8.7.2.8.4 1.6.5 2.5l.1 2.4.2 4.6.8 18.3h-5l.8-18.4.2-4.6.1-1.1c0-.4 0-.8 0-1.1 0-.6-.1-1.3-.3-2-.6-2.8-1.8-5.6-3.2-8.3-2.7-5.4-6.2-10.4-10.1-15.1-3.8-4.7-8.2-8.9-13.3-12.4"/></g></svg>
        </div>
    </div>
        <button>1h</button>
    <button @click="chart3h">3h</button>
    <line-chart :chart-data="chartdata"></line-chart>

  </div>
</template>

<script>
export default {
  data() {
    return {
      humidity: null,
      project: null,
      history: [],
      token: null,
      intervalId: null,
      chartdata: {
        labels: [],
        datasets: []
      } ,
      colors: ['#5a4d44', '#543f2f', '#462e22', '#24191c'],
    }
  },
  mounted(){
    window.vue = this;

    this.intervalId = setInterval(()=>{
      this.$fetch();
    }, 2000);   
  },
  beforeDestroy () {
      clearInterval(this.intervalId);
  },
  computed: {
    mudColor() {
      if(this.$chroma) {
        return this.$chroma.scale(this.colors)(this.humidity/100).hex();
      }
    },
    name() {
      return this.project?.name || 'ePlant';
    }
  },
  async fetch() {
    let token = await this.getToken();
    if(token==null){
      await this.showParams();
      token = await this.getToken();
    }

    if(!this.project) {
      this.project = await this.$axios.$get(`/api/${token}/project`);
    }

    if(!this.history.length) {
      this.history = await this.$blynk.history(token);
      this.chartdata = 

      {
        labels: this.history.map(({date})=>date.toLocaleString()),
        datasets: [
          {
            data: this.history.map(({humidity})=>humidity),
            borderColor: '#1b95e0',
            label: 'Humidty',
          },
        ]
      } 
    }

    this.humidity = parseInt((await this.$axios.$get(`/api/${token}/get/V0`))[0]);
    this.chartdata = {
      ...this.chartdata,
      labels: [
        ...this.chartdata.labels,
        new Date().toLocaleString()
      ],
      datasets: [
          {
            ...this.chartdata.datasets[0],
            data: [
              ...this.chartdata.datasets[0].data,
              this.humidity
            ],
          },
        ]
    }
  },
  fetchOnServer: false,
  methods: {
    async showParams() {
      const {value:token} = await this.$swal({
        title: "Parameters",
        text: "Enter your Blynk Auth Token.",
        imageUrl: "data:image/svg+xml;utf8,"+this.$refs.icon.outerHTML,
        input: 'text',
        inputClass: "",
        inputValue: await this.getToken(),
        showCancelButton: true,
        buttonsStyling: false,
        inputValidator: this.verifyToken
      })

      if(token) {
        this.setToken(token);
        this.$fetch();
      }
    },
    async reload() {
      const token = await this.getToken();
      this.project = await this.$axios.$get(`/api/${token}/project`);
      await this.$fetch(true);
    },
    async getToken(update=false) {
      if(this.token==null || update) {
        this.token = await this.$localForage.getItem("token");
      }

      return this.token;
    },
    async setToken(token, update=true) {
      await this.$localForage.setItem("token", token);
      if(update) {
        this.token = token;
      }

      return token;
    },
    async verifyToken(token) {
      if(!token) return "The token can't be empty.";

      let project;
      try {
        project = await this.$axios.$get(`/api/${token}/project`);
      } catch (error) {
        return error.response.data;
      }
      
      return;
    },
    chart3h() {
      const data = this.history.filter(({date})=>{
        
      })
    }
  }
}
</script>

<style>
.container {
  text-align: center;
  min-height: 100vh;
  display: grid;
  place-content: center;
}
.swal2-confirm {
  margin-right: 1rem;
}
.wrapper {
  position: relative;
  height: 100vh;
  overflow: hidden;
  user-select:none;
}
.params {
  position: absolute;
  top: 2rem;
  right: 2rem;
  z-index: 1000;
}
.reload {
  position: absolute;
  top: 2rem;
  left: 2rem;
  z-index: 1000;
}

.reload.active svg {
  animation-name: spin;
  animation-duration: .5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear; 
}
.ground {
  width: 100vw;
  border-radius: 200vw;
  height: 100vw;
  position: absolute;
  top: 90vh;
  background-color: #5a4d44;
  transition: background-color 1s;
}
.plant {
  position: absolute;
  transform: translate(-50%, -100%);
  height: 10vh;
  left: 50vw;
}

@keyframes spin {
    from {
        transform:rotate(0deg);
    }
    to {
        transform:rotate(360deg);
    }
}
</style>