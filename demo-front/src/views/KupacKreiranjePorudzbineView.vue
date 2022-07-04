<template>

    <div class="topnav">
        <a href="/kupacRestorani">Restorani</a>
        <a href="/kupacPorudzbine">Porudžbina</a>
        <a href="/kupacPocetna" >Pregled podataka</a>
        <a href="/kupacAzuriranjePodataka">Ažuriranje podataka</a>
        <a v-on:click="odlogovanje()" style="color:white;">Izloguj se</a>
        <a class="active" href="/kupackreiranjePorudzbine"><font-awesome-icon icon="fa-solid fa-cart-shopping" /></a>
    </div>

    <div class="container-fluid w-100 pt-5 hv-100" style="background-color: #eee; border: 5px solid white;">

        <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
          <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
          </symbol>
        </svg>

        <div id="prozorGreski" class="pb-3" hidden>

          <div class="alert alert-danger d-flex align-items-center w-50 centriranje" role="alert" style="min-width:200px; max-width:440px;">
          <svg class="bi flex-shrink-0 me-2 text-center" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
            <div>
              {{porukaGreske}}
            </div>
          </div>

        </div>

      <div id="daLiJePrazno">

        <div class="table-responsive caption-top col-md-10" style="margin: 0 auto; display:block;">
          <table class="table table-striped table-hover table-bordered border-secondary">
            <caption style="caption-side: top;"><b> Vasa porudzbina </b></caption>

            <thead>
            <tr class="text-center">
              <th>#</th>
              <th>Naziv</th>
              <th>Cena po artiklu</th>
              <th>Kolicina</th>
              <th>Unesite novu kolicinu</th>
              <th>Izmeni kolicinu</th>
              <th>Brisanje artikla</th>
            </tr>
            </thead>

            <tbody>
            <tr class="text-center" v-for="artikal in PregledPorudzbine.artikliZaPregledPorudzbineDtos" :key="artikal.id">
              <td>{{artikal.Basic}}</td>
              <td>{{artikal.naziv }}</td>
              <td>{{artikal.cena}}</td>
              <td>{{artikal.kolicina}}</td>
              <td><input class="form-control" type="number" v-bind:id="artikal.id" v-on:input="azurirajVrednostKolicine(artikal)" placeholder="Unesite novu kolicinu"/></td>
              <td>
                <button class="btn btn-outline-secondary col-sm-5" v-on:click="izmeni_kolicinu(artikal)" style="max-width:200px; min-width: 160px;">
                  <b>Izmeni kolicinu</b>
                </button>
              </td>
              <td>
                <button class="btn btn-outline-secondary col-sm-5" v-on:click="brisanje_artikla(artikal)" style="min-width:100px; max-width:150px;">
                  <b>Ponisti</b>
                </button>
              </td>
            </tr>
            </tbody>

          </table>

        </div>

        <div class="pt-5 pb-2 col-md-12 text-center" style="margin: 0 auto; display: block;">
          <h3> Ukupna cena porudzbine iznosi: {{this.PregledPorudzbine.ukupnaCena}} </h3>
        </div>
        <br/>

        <div class="pt-3 pb-2 col-md-12 text-center" style="margin: 0 auto; display: block;">
          <h3> Cena sa popustom iznosi: {{this.PregledPorudzbine.cena_sa_popustom}} </h3>
        </div>
        <br/>

        <div class="pt-2 pb-5 col-md-12 text-center" style="margin: 0 auto; display: block;">
        <button class="btn btn-outline-secondary col-sm-5 mb-3" v-on:click="kreiraj_porudzbinu()" style="max-width:150px;"><h4> NARUCI </h4></button>
        </div>
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
import axios from "axios"
export default {
  name: "KupacKreiranjePorudzbineView",

  data: function(){
    return{
      PregledPorudzbine:{

      },
      porukaGreske : "",
            Slanje:{
        id:"",
        kolicina:"",
      },
    };
  },

  mounted: function () {

      axios
        .get("http://localhost:8081/api/porudzbina/pregledPorudzbine",
        {
          withCredentials: true
        })
        .then((res) => {
          this.PregledPorudzbine = res.data;
        }).
        catch((err) => {
          document.getElementById("daLiJePrazno").hidden = true;
          this.porukaGreske = err.request.response;
          document.getElementById("prozorGreski").hidden = false;
        });


     /* fetch('http://localhost:8081/api/porudzbina/pregledPorudzbine', {
        method: "GET",
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      })
        .then(response => response.json())
        .then(data => {console.log("Success:", data); this.PregledPorudzbine = data})

        .catch((error) => {
          console.error("Error:", error);
        });*/
  },


  methods: {

        azurirajVrednostKolicine : function(artikal) {
          /*artikal.kolicina =  document.getElementById(artikal.id).value
          console.log(artikal.kolicina + "  " + artikal.id);
          document.getElementById(artikal.id).getAttribute("value");
          console.log(document.getElementById(artikal.id).getAttribute("value"))*/
        },

        izmeni_kolicinu : function(artikal){

        this.Slanje.id = artikal.id;
        this.Slanje.kolicina = document.getElementById(artikal.id).value;
      axios
        .post("http://localhost:8081/api/porudzbina/dodajArtikal", this.Slanje,
        {
          withCredentials: true
        }).then((res) => {
          window.location.reload();
        })
        .catch((err) => {
          this.porukaGreske = err.request.response;
          document.getElementById(artikal.id).focus();
          document.getElementById("prozorGreski").hidden = false;
          setTimeout(() => {
            document.getElementById("prozorGreski").hidden = true;
          }, 2500);
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

      },

      kreiraj_porudzbinu : function (){
        fetch('http://localhost:8081/api/porudzbina/kreiranjePorudzbine', {
        method: "POST",
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      })
        .then(response => response.json())
        .then(data => {
          this.$router.push("/kupacPorudzbine");
        })
        .catch((error) => {
          this.$router.push("/kupacPorudzbine");
          console.log("Error:", error);
        });
      },


      /*brisanje_artikla: function(artikal) {
      axios
        .delete("http://localhost:8081/api/porudzbina/obrisiArtikal"+ artikal.id,
        {
          withCredentials: true
        })
        .then((res) => {
          window.location.reload();
        }).
        catch((err) => {
        });
      },*/

      brisanje_artikla: function(artikal) {
        console.log(artikal.id);
        fetch("http://localhost:8081/api/porudzbina/obrisiArtikal/" + artikal.id, {
        method: "DELETE",
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      }).then((res) => {
        if (res.ok) {
          alert("Uspesno ste izbacili proizvod iz korpe.");
          window.location.reload();
        }
      }).catch((error) => {
          console.error("Error:", error);
        });
    },
  }
};

</script>

<style>


</style>