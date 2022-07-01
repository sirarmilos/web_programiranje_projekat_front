<template>

    <!-- template sa w3schools-a, za navbar -->
    <!-- vidi kako na link da vezes onclick metodu, nesto v-bind mozda ne znam-->
    <!-- https://forum.vuejs.org/t/how-to-call-a-function-by-click-on-some-class-in-href-tag/37181 --> 
    <div class="topnav">
        <a href="/menadzerNjegovRestoran">Moj restoran</a>
        <a href="/menadzerDodavanjeArtikla">Kreiraj novi artikal</a>
        <a class="active" href="/menadzerPorudzbine">Porudžbina</a>
        <a href="/menadzerPocetna" >Pregled podataka</a>
        <a href="/menadzerAzuriranjePodataka">Ažuriranje podataka</a>
        <a v-on:click="odlogovanje()">Izloguj se</a>
    </div>


    <div class="container-fluid w-100 pt-5 hv-100" style="background-color: #eee; border: 5px solid white;">
        
          <div class="table-responsive caption-top">
              <table class="table table-striped table-hover table-bordered border-secondary">
                <caption style="caption-side: top;"><b>Spisak svih porudzbina</b></caption>
                <thead>
                <tr>
                  <th>#</th>
                  <th>DatumVreme</th>
                  <th>Cena</th>
                  <th>Status</th>
                  <th>U pripremi</th>
                  <th>Ceka dostavljaca</th>
                </tr>
                </thead>

                <tbody>

                <tr v-for="porudzbina in listaPorudzbina" :key="listaPorudzbina.id">
                  <td>{{ porudzbina.Basic }}</td>
                  <td>{{ porudzbina.datumVreme }}</td>
                  <td>{{ porudzbina.cena }}</td>
                  <td>{{ porudzbina.status }}</td>
                  <td>
                    <button class="btn btn-outline-secondary col-sm-5 dugmeViseInformacija" v-on:click="dugmeUPripremi(porudzbina.id)" style="max-width:150px;">
                    <b> U pripremi </b>
                    </button>
                  </td>
                  <td>
                    <button class="btn btn-outline-secondary col-sm-5 dugmeViseInformacija" v-on:click="dugmeCekaDostavljaca(porudzbina.id)" style="max-width:150px;">
                    <b> Ceka dostavljaca </b>
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

      fetch('http://localhost:8081/api/porudzbina/MenadzerUrestoranu', {
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

    dugmeUPripremi : function(id) {

      fetch("http://localhost:8081/api/porudzbina/izmenaStatusaUPripremi/" + id, {
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

    dugmeCekaDostavljaca : function(id) {

          fetch("http://localhost:8081/api/porudzbina/izmenaStatusaCekaDostavljaca/" + id, {
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