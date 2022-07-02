<template>

    <!-- template sa w3schools-a, za navbar -->
    <!-- vidi kako na link da vezes onclick metodu, nesto v-bind mozda ne znam-->
    <!-- https://forum.vuejs.org/t/how-to-call-a-function-by-click-on-some-class-in-href-tag/37181 --> 
    <div class="topnav">
        <a href="/kupacRestorani">Restorani</a>
        <a href="/kupacPorudzbine">Porudžbina</a>
        <a href="/kupacPocetna" >Pregled podataka</a>
        <a href="/kupacAzuriranjePodataka">Ažuriranje podataka</a>
        <a v-on:click="odlogovanje()" style="color:white;">Izloguj se</a>
        <a class="active" href="/kupackreiranjePorudzbine"><font-awesome-icon icon="fa-solid fa-cart-shopping" /></a>
    </div>


    <div class="container-fluid w-100 pt-5 hv-100" style="background-color: #eee; border: 5px solid white;">

      <div>

        <!-- sada ovde trebaju da idu artikli i slike, ali posto ih nema, za sad ce ici samo tabela -->

        <div class="table-responsive caption-top col-md-10" style="margin: 0 auto; display:block;">
          <table class="table table-striped table-hover table-bordered border-secondary">
            <caption style="caption-side: top;"><b> Vasa porudzbina </b></caption>

            <thead>
            <tr class="text-center">
              <th>#</th>
              <th>Naziv</th>
              <th>Cena po artiklu</th>
              <th>Kolicina</th>
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
              <td>
                <button class="btn btn-outline-secondary col-sm-5" v-on:click="izmeni_kolicinu(artikal)" style="max-width:200px; min-width: 160px;">
                  <b>Izmeni kolicinu</b>
                </button>
              </td>
              <td>
                <button class="btn btn-outline-secondary col-sm-5" v-on:click="brisanje_artikla(artikal)" style="max-width:150px;">
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

export default {
  name: "KupacKreiranjePorudzbineView",

  data: function(){
    return{
      PregledPorudzbine:{

      },
      
    };
  },

  mounted: function () {

      fetch('http://localhost:8081/api/porudzbina/pregledPorudzbine', {
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
        });
  },


  methods: {
        izmeni_kolicinu : function(artikal){
          this.$router.push("/kupacDetaljanPrikazRestorana?id=" + localStorage.cuvanje);
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
        .then(data => {window.location.reload();
        console.log("Success:", data);
        this.$router.push("/kupacPorudzbine");
        })
        .catch((error) => {
          this.$router.push("/kupacPorudzbine");
          console.error("Error:", error);
          
        });
      },

      brisanje_artikla: function(artikal) {
        // vodi racuna ono dto brisanje tri odjednom, da se obrisu i lokacija, i restoran i menadzer zaduzen za taj restoran
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