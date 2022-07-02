<template>

    <!-- template sa w3schools-a, za navbar -->
    <!-- vidi kako na link da vezes onclick metodu, nesto v-bind mozda ne znam-->
    <!-- https://forum.vuejs.org/t/how-to-call-a-function-by-click-on-some-class-in-href-tag/37181 --> 
    <div class="topnav">
        <a href="/kupacRestorani">Restorani</a>
        <a class="active" href="/kupacPorudzbine">Porudžbina</a>
        <a href="/kupacPocetna" >Pregled podataka</a>
        <a href="/kupacAzuriranjePodataka">Ažuriranje podataka</a>
        <a v-on:click="odlogovanje()" style="color:white;" >Izloguj se</a>
        <a href="/kupackreiranjePorudzbine"><font-awesome-icon icon="fa-solid fa-cart-shopping" /></a>
    </div>

    <div class="container-fluid w-100 pt-5 hv-100 pb-4" style="background-color: #eee; border: 5px solid white;">
    
      <div class="table-responsive caption-top col-md-10" style="margin: 0 auto; display:block;">
          <table class="table table-striped table-hover table-bordered border-secondary">
            <caption style="caption-side: top;"><b>Spisak svih porudzbina</b></caption>
            <thead>
            <tr class="text-center">
              <th>#</th>
              <th>DatumVreme</th>
              <th>Cena</th>
              <th>Status</th>
              <th>Vise informacija</th>
            </tr>
            </thead>

            <tbody>

            <tr class="text-center" v-for="porudzbina in listaPorudzbina" :key="listaPorudzbina.id">
              <td>{{ porudzbina.Basic }}</td>
              <td>{{ porudzbina.datumVreme }}</td>
              <td>{{ porudzbina.cena }}</td>
              <td>{{ porudzbina.status }}</td>
              <td>
                <button class="btn btn-outline-secondary col-sm-5 dugmeViseInformacija" v-on:click="viseInformacija(porudzbina)" style="max-width:150px; margin: 0 auto; display:block;">
                 <b> Vise informacija </b>
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
  name: "KupacPorudzbineView",

  data: function () {
    return {
      listaPorudzbina:{
        id: "",
        datumVreme: "",
        cena: "",
        status: "",
        kupacKorisnickoIme: "",
        restoranId: "",
      },
    };
  },
  
  mounted: function () {

      fetch('http://localhost:8081/api/porudzbina/dobaviSve' /*+ localStorage.name*/, {
        method: "GET",
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      })
        .then(response => response.json())
        .then(data => {
          this.listaPorudzbina = data;
          for(var i = 0; i < this.listaPorudzbina.length; i++)
          {
            console.log("poz");
            if(this.listaPorudzbina[i].status === "Obrada")
            {
              this.listaPorudzbina[i].status = "Obrada";
            }
            if(this.listaPorudzbina[i].status === "UPripremi")
            {
              this.listaPorudzbina[i].status = "U pripremi";
            }
            if(this.listaPorudzbina[i].status === "CekaDostavljaca")
            {
              this.listaPorudzbina[i].status = "Ceka dostavljaca";
            }
            if(this.listaPorudzbina[i].status === "UTransportu")
            {
              this.listaPorudzbina[i].status = "U transportu";
            }
            if(this.listaPorudzbina[i].status === "Dostavljena")
            {
              this.listaPorudzbina[i].status = "Dostavljena";
            }
            
          }
          
          })
        .catch((error) => {
          console.error("Error:", error);
        });
  },

  methods: {

    /*posaljiKomentar : function(porudzbina) {

      fetch('http://localhost:8081/api/nadji_restoran_po_id_porudzbini/' + porudzbina.id , {
        method: "GET",
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      })
        .then(response => response.json())
        .then(data => {
          //console.log("Success:", data);
          this.slanje.restoran_id = data;
          })
        .catch((error) => {
          console.error("Error:", error);
        });

    },

    proba : function(porudzbina, pom1, pom2)
    {

       if(porudzbina.status == "Dostavljena")
      {
        //this.slanje.restoran_id = 2;//;//porudzbina.restoranId;
        this.slanje.korisnickoIme = localStorage.name//"deki1976";//porudzbina.kupacKorisnickoIme;
        this.slanje.ocena = pom2;//"Lose";
        this.slanje.tekstKomentara = pom1;//"SUPER";
        //console.log(this.slanje.restoran_id);

        fetch("http://localhost:8081/api/dodavanje_komentara", {
        method: "POST",
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(this.slanje),
      })
        .then((response) => response.json)
        .then((data) => {
          console.log("Success : " + data);
          //console.log(this.slanje);
        })
        .catch((err) => {
          console.log("Error : " + err);
          alert(err);
        });

      }
      else
      {
        alert("Ne mozete da posaljete komentar zato sto vasa porudzbina nije dostavljena.");
      }



    },*/

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