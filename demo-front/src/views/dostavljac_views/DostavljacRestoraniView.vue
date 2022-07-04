<template>

    <div class="topnav">
        <a href="/dostavljacPorudzbine">Porudžbina</a>
        <a class="active" href="/dostavljacRestorani">Restorani</a>
        <a href="/dostavljacPocetna" >Pregled podataka</a>
        <a href="/dostavljacAzuriranjePodataka">Ažuriranje podataka</a>
        <a v-on:click="odlogovanje()" style="color:white;">Izloguj se</a>
    </div>

    <div class="container-fluid w-100 p-3 hv-100" style="background-color: #eee; border: 5px solid white;">

          <div>
          <h1 class="page-header text-left pt-5 pb-5"> Parametri za pretragu </h1>

            <div class="mb-2 row">
              <label for="poljeNazivRestorana" class="col-sm-2 col-form-label"> Naziv restorana: </label>
              <div class="col-sm-4">
                <input v-model="slanje.naziv" v-on:input="pretraga()" id="poljeNazivRestorana" type="text" class="form-control" name="poljeNazivRestorana" required="required"/>
              </div>
            </div>
            <br/>

            <div class="mb-2 row">
              <label for="poljeTipRestorana" class="col-sm-2 col-form-label"> Tip restorana: </label>
              <div class="col-sm-4">
                <input v-model="slanje.tip" v-on:input="pretraga()" id="poljeTipRestorana" type="text" class="form-control" name="poljeTipRestorana" required="required"/>
              </div>
            </div>
            <br/>

            <div class="mb-2 row">
              <label for="poljeAdresaRestorana" class="col-sm-2 col-form-label"> Adresa restorana: </label>
              <div class="col-sm-4">
                <input v-model="slanje.adresa" v-on:input="pretraga()" id="poljeAdresaRestorana" type="text" class="form-control" name="poljeAdresaRestorana" required="required"/>
              </div>
            </div>
            <br/>

            <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
            <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </symbol>
          </svg>

          <div id="prozorGreski" hidden>

            <div class="alert alert-danger d-flex align-items-center w-25 centriranje" role="alert" style="max-width:260px; min-width:260px">
            <svg class="bi flex-shrink-0 me-2 text-center" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
              <div>
                {{porukaGreske}}
              </div>
            </div>

          </div>

          </div>

          <div class="table-responsive caption-top col-md-10" style="margin: 0 auto; display:block;">
            <table id="tabela1" class="table table-striped table-hover table-bordered border-secondary">

              <caption style="caption-side: top;"><b>Spisak svih restorana</b></caption>
              <thead>
                <tr class="text-center">
                  <th>#</th>
                  <th>Naziv restorana</th>
                  <th>Tip restorana</th>
                  <th>Adresa restorana</th>
                  <th>Geografska sirina</th>
                  <th>Geografska duzina</th>
                </tr>
              </thead>

              <tbody>
              <tr class="text-center" v-for="restoran in restorani" :key="restoran.id">
                <td>{{ restoran.basicBrojac}}</td>
                <td>{{ restoran.naziv }}</td>
                <td>{{ restoran.tip }}</td>
                <td>{{ restoran.adresa }}</td>
                <td>{{ restoran.gSirina }}</td>
                <td>{{ restoran.gDuzina }}</td>
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
            <a href="/dostavaZaCasDostavljac"> DostavaZaCas.com </a>
          </div>

        </footer>
  
</template>

<script>

export default {
  name: "DostavljacRestoraniView",

  data: function () {
    return {
      restorani: [],
      slanje:{
        naziv: "",
        tip: "",
        adresa: "",
        gSirina: "",
        gDuzina: "",
      },
      porukaGreske : "",
    };
  },

  mounted: function () {

        fetch('http://localhost:8081/api/dostavljac/prikaz_restorana', { 
        method: "GET",
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      })
        .then(response => response.json())
        .then(data => {
          this.restorani = data;
          })
        .catch((error) => {
          console.error("Error:", error);
        });
  },

  methods: {

    pretraga : function() {

        fetch("http://localhost:8081/api/restoran/dostavljac_pretraga", {
        method: "POST",
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(this.slanje),
      }).then(response => response.json())
        .then(data => 
        {
          document.getElementById("prozorGreski").hidden = true;
          document.getElementById("tabela1").hidden = false;
          if(data.Restorani === "Ne postoji trazeni restoran.")
          {
            document.getElementById("tabela1").hidden = true;
            this.porukaGreske = "Trazeni restoran ne postoji";
            document.getElementById("prozorGreski").hidden = false;
          }

          this.restorani = data;

          })
        .catch((error) => {
          console.error("Error:", error);
      });

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
          this.$router.push("/");
        })
        .catch((err) => {
          console.log("Error : " + err);
        });

      }

  },

};

</script>

<style>


</style>