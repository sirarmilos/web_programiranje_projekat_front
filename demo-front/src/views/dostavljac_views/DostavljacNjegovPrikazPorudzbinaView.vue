<template>

    <!-- template sa w3schools-a, za navbar -->
    <!-- vidi kako na link da vezes onclick metodu, nesto v-bind mozda ne znam-->
    <!-- https://forum.vuejs.org/t/how-to-call-a-function-by-click-on-some-class-in-href-tag/37181 --> 
    <div class="topnav">
        <a class="active" href="/dostavljacPorudzbine">Porudžbina</a>
        <a href="/dostavljacRestorani">Restorani</a>
        <a href="/dostavljacPocetna" >Pregled podataka</a>
        <a href="/dostavljacAzuriranjePodataka">Ažuriranje podataka</a>
        <a v-on:click="odlogovanje()">Izloguj se</a>
    </div>


    <div class="container-fluid w-100 pt-5 hv-100" style="background-color: #eee; border: 5px solid white;">
        
          <div class="table-responsive caption-top">
              <table class="table table-striped table-hover table-bordered border-secondary">
                <caption style="caption-side: top;"><b>Spisak svih porudzbina</b></caption>
                <thead>
                <tr>
                  <th>DatumVreme</th>
                  <th>Cena</th>
                  <th>Status</th>
                  <th>U transportu</th>
                  <th>Dostavljen</th>
                </tr>
                </thead>

                <tbody>

                <tr v-for="porudzbina in listaPorudzbina" :key="listaPorudzbina.id">
                  <td>{{ porudzbina.datumVreme }}</td>
                  <td>{{ porudzbina.cena }}</td>
                  <td>{{ porudzbina.status }}</td>
                  <td>
                    <button class="btn btn-outline-secondary col-sm-5 dugmeViseInformacija" v-on:click="dugmeTransport(porudzbina.id)" style="max-width:150px;">
                    <b> U transportu </b>
                    </button>
                  </td>
                  <td>
                    <button class="btn btn-outline-secondary col-sm-5 dugmeViseInformacija" v-on:click="dugmeDostavljena(porudzbina.id)" style="max-width:150px;">
                    <b> Dostavljen </b>
                    </button>
                  </td>
                </tr>
                </tbody>

              </table>
          </div>
        
        </div>

        <footer class="page-footer font-small blue pt-4">

          <div class="container-fluid text-center text-md-left">

              <div class="col-md-12 mt-md-0 mt-3">

                <h5 class="text-uppercase">O nama</h5>
                <p>Dostava za cas je za sekund kod Vas. Brza i jeftina dostava hrane na teritoriji celog Novog Sada.</p>

              </div>

          </div>

          <div class="footer-copyright text-center py-3">© 2022 Copyright:
            <a href="/"> DostavaZaCas.com </a>
          </div>

        </footer>

</template>

<script>

export default {
  name: "DostavljacNjegovPrikazPorudzbinaView",

  data: function () {
    return {
      listaPorudzbina:{
      },
    };
  },
  mounted: function () {

      fetch('http://localhost:8081/api/porudzbina/dobaviZaDostavljaca', {
        method: "GET",
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log("Success:", data);
          this.listaPorudzbina = data
          })
        .catch((error) => {
          console.error("Error:", error);
        });
  },

  methods: {

    dugmeTransport : function(id) {

      fetch("http://localhost:8081/api/porudzbina/izmenaStatusaUTransportu/" + id, {
          method: "PUT",
          credentials: 'include',
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
        })
          .then((response) => response.json)
          .then((data) => {
            console.log("Success : " + data);
            window.location.reload();
          })
          .catch((err) => {
            console.log("Error : " + err);
            alert(err);
          });

    },

    dugmeDostavljena : function(id) {

          fetch("http://localhost:8081/api/porudzbina/izmenaStatusaDostavljena/" + id, {
          method: "PUT",
          credentials: 'include',
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
        })
          .then((response) => response.json)
          .then((data) => {
            console.log("Success : " + data);
            window.location.reload();
          })
          .catch((err) => {
            console.log("Error : " + err);
            alert(err);
          });

    },

    viseInformacija : function(porudzbina) {
      this.$router.push("/kupacPregledPojedinacnePorudzbine/?id=" + porudzbina.id);
    },

    odlogovanje : function () {
      fetch("http://localhost:8081/api/odlogovanje", {
        method: "POST",
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      })
        .then((response) => response.json)
        .then((data) => {
          console.log("Success : " + data);
          this.$ses;
          this.$router.push("/");
        })
        .catch((err) => {
          console.log("Error : " + err);
          alert(err);
        });

      }

  }

};

</script>

<style>

</style>