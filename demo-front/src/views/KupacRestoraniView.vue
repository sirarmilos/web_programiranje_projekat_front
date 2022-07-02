<template>

    <!-- template sa w3schools-a, za navbar -->
    <!-- vidi kako na link da vezes onclick metodu, nesto v-bind mozda ne znam-->
    <!-- https://forum.vuejs.org/t/how-to-call-a-function-by-click-on-some-class-in-href-tag/37181 --> 
    <div class="topnav">
        <a class="active" href="/kupacRestorani">Restorani</a>
        <a href="/kupacPorudzbine">Porudžbina</a>
        <a href="/kupacPocetna" >Pregled podataka</a>
        <a href="/kupacAzuriranjePodataka">Ažuriranje podataka</a>
        <a v-on:click="odlogovanje()" style="color:white;">Izloguj se</a>
        <a href="/kupackreiranjePorudzbine"><font-awesome-icon icon="fa-solid fa-cart-shopping" /></a>
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

      </div>

      <div class="table-responsive caption-top col-md-10" style="margin: 0 auto; display:block;">
        <table class="table table-striped table-hover table-bordered border-secondary"> <!-- vidi da li treba border-secondary ili je bolje bez toga table-borderless-->

          <caption style="caption-side: top;"><b>Spisak svih restorana</b></caption>
          <thead>
            <tr class="text-center">
              <th>#</th>
              <th>Naziv restorana</th>
              <th>Tip restorana</th>
              <th>Adresa restorana</th>
              <th>Više informacija</th>
            </tr>
          </thead>

          <tbody>
          <tr v-for="restoran in restorani" :key="restoran.id" >
            <td>{{ restoran.basicBrojac}}</td>
            <td>{{ restoran.naziv }}</td>
            <td>{{ restoran.tip }}</td>
            <td>{{ restoran.adresa }}</td>
            <td>
              <button class="btn btn-outline-secondary col-sm-5 dugmeViseInformacija" v-on:click="viseInformacija(restoran)" style="max-width:150px;margin: 0 auto; display:block;">
                <b>Više informacija</b>
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
  name: "KupacRestoraniView",

  data: function () {
    return {
      restorani: [],
      slanje:{
        id: "",
        naziv: "",
        tip: "",
        adresa: "",
      }
    };
  },

  mounted: function () {

      fetch('http://localhost:8081/api/restoran/prikaz_restorana' /*+ localStorage.name*/, {
        method: "GET",
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      })
        .then(response => response.json())
        .then(data => {console.log("Success:", data); this.restorani = data})
        .catch((error) => {
          console.error("Error:", error);
        });
  },

  methods: {

    viseInformacija : function(restoran) {
      this.$router.push("/kupacDetaljanPrikazRestorana?id=" + restoran.id);
    },

    pretraga : function() {

      fetch("http://localhost:8081/api/restoran/pretraga" /*+ this.slanje*/, {
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
          console.log("Success:", data);
          console.log(JSON.stringify(data));

          this.restorani = data;

          //var proizvodi = JSON.stringify(data);
          //var proizvodi = [{naziv, tip}];
         /* var p = JSON.stringify(data).split('}');
          var proizvodi = new Array(p[0],p[1]); // lista proizvoda
          //this.restorani = JSON.stringify(data);
          var pomocna = {};
          console.log(proizvodi);
          console.log(proizvodi[0]);
          for(var i = 1; i < 2; i++)
          {
            //console.log(pomocna); // naziv:proizvodi[i].naziv
            //console.log(pomocna);
            //pomocna.naziv = proizvodi[naziv];
            //pomocna[1] = {tip: proizvodi[id : i].naziv, adresa:"c"};
            //this.restorani.push({naziv:"a", tip:"b", adresa:"c"});
          }
          this.restorani = pomocna;*/
          //this.restorani = [{naziv:"a", tip:"b", adresa:"c"}];
          //proizvodi.push(data.)
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
          console.log("Success : " + data);
          this.$ses;
          this.$router.push("/");
        })
        .catch((err) => {
          console.log("Error : " + err);
          alert(err);
        });

      }
      
  },

};

</script>

<style>

table
{
    counter-reset: rowNumber;
}

table tr > td:first-child
{
    counter-increment: rowNumber;
}

table tr td:first-child::before
{
    content: counter(rowNumber);
    min-width: 1em;
    margin-right: 0.5em;
}
</style>