<template>

    <!-- template sa w3schools-a, za navbar -->
    <!-- vidi kako na link da vezes onclick metodu, nesto v-bind mozda ne znam-->
    <!-- https://forum.vuejs.org/t/how-to-call-a-function-by-click-on-some-class-in-href-tag/37181 --> 
    <div class="topnav">
        <a href="/adminPocetna" >Pregled podataka</a>
        <a href="/adminAzuriranjePodataka">Ažuriranje podataka</a>
        <a href="/adminKreiranjeNovogDostavljaca">Kreiranje dostavljača</a>
        <a href="/adminKreiranjeNovogRestoranaIMenadzera">Kreiraj novi restoran i menadžera</a>
        <a class="active" href="/adminPrikazSvihKorisnika">Prikaz svih korisnika</a>
        <a href="/adminRestorani">Restorani</a>
        <a v-on:click="odlogovanje()">Izloguj se</a>
    </div>

<!-- PRETRAGA JOS NE RADI, TREBA JE PROMENITI, U REAL TIME DA RADI KADA SE ISKUCA NOVO SLOVO, TAKODJE ADRESA SE NE PRIKAZUJE, VIDI DA LI TREBA NOVI DTO-->

    <p>
        Parametri za pretragu
    </p>

    <!-- namesti mozda dogadjaj v-on:change = "..." da radi tu pretragu -->
    <!-- https://forum.vuejs.org/t/how-to-trigger-an-onchange-event/11081/4 -->

    <!-- https://v2.vuejs.org/v2/cookbook/form-validation.html?redirect=true -->
    <!-- https://vuejs.org/guide/essentials/forms.html -->
    <!--<form method="post">-->

        <label for="poljeIme"> Ime: </label>
        <input v-model="slanje.naziv" v-on:input="pretraga()" id="poljeIme" type="text" name="poljeIme"/>

        <br/>

        <label for="poljePrezime"> Prezime: </label>
        <input v-model="slanje.tip" v-on:input="pretraga()" id="poljePrezime" type="text" name="poljePrezime"/>

        <br/>

        <label for="poljeKorisnickoIme"> Korisnicko ime: </label>
        <input v-model="slanje.adresa" v-on:input="pretraga()" id="poljeKorisnickoIme" type="text" name="poljeKorisnickoIme"/>

        <br/>

    <!--</form>-->

    <table id="restorani">

        <tr>
          <th>Korisničko ime</th>
          <th>Ime</th>
          <th>Prezime</th>
          <th>Pol</th>
          <th>Datum rođenja</th>
        </tr>

        <tr v-for="restoran in restorani" :key="restoran.id">
          <td>{{ restoran.naziv }}</td>
          <td>{{ restoran.tip }}</td>
        </tr>

    </table>

    <!-- ovde sam stao-->

</template>

<script>

export default {
  name: "AdminPrikazSvihKorisnikaView",

  data: function () {
    return {
      restorani: [],
      slanje:{
        naziv: "",
        tip: "",
        adresa: "",
      }
    };
  },
  mounted: function () {

    //if(localStorage.name === "kkkk")
    //{
    //primer axios poziva
    /*axios
      .get("http://localhost:8081/api/korisnik/pregled_podataka")
      .then((res) => {
        
        this.korisnik = res.data;

      })
      .catch((err) =>{
        //console.log(err)
      })*/

      fetch('http://localhost:8081/api/restoran/prikaz_restorana' /*+ localStorage.name*/, {
        method: "GET",
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        //body: JSON.stringify(this.logovanjeSlanje),

      })
        .then(response => response.json())
        .then(data => {console.log("Success:", data); this.restorani = data})
        .catch((error) => {
          console.error("Error:", error);
        });
  //}
  },

  methods: {

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

          //var proizvodi = JSON.stringify(data);
          //var proizvodi = [{naziv, tip}];
          var proizvodi = new Array(JSON.stringify(data)); // lista proizvoda
          //this.restorani = JSON.stringify(data);
          var pomocna = {};
          for(var i = 1; i < 2; i++)
          {
            console.log(pomocna); // naziv:proizvodi[i].naziv
            //pomocna.naziv = proizvodi[naziv];
            //pomocna[1] = {tip: proizvodi[id : i].naziv, adresa:"c"};
            //this.restorani.push({naziv:"a", tip:"b", adresa:"c"});
          }
          this.restorani = pomocna;
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
        //body: JSON.stringify(this.korisnik),
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

/*deleteEmployee: function (id) {
      fetch("http://localhost:8081/api/employees/" + id, {
        method: "PUT",
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(this.korisnik),
      }).then((res) => {
        if (res.ok) {
          window.location.reload();
        }
      });
    },*/



  },


};

</script>

<style>

.topnav {
  background-color: #333;
  overflow: hidden;
}

/* Style the links inside the navigation bar */
.topnav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

/* Change the color of links on hover */
.topnav a:hover {
  background-color: #ddd;
  color: black;
}

/* Add a color to the active/current link */
.topnav a.active {
  background-color: #04AA6D;
  color: white;
}

</style>