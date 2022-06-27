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
        <input v-model="slanje.ime" v-on:input="pretraga()" id="poljeIme" type="text" name="poljeIme"/>

        <br/>

        <label for="poljePrezime"> Prezime: </label>
        <input v-model="slanje.prezime" v-on:input="pretraga()" id="poljePrezime" type="text" name="poljePrezime"/>

        <br/>

        <label for="poljeKorisnickoIme"> Korisničko ime: </label>
        <input v-model="slanje.korisnickoIme" v-on:input="pretraga()" id="poljeKorisnickoIme" type="text" name="poljeKorisnickoIme"/>

        <br/>

    <!--</form>-->

    <table id="restorani">

        <tr>
          <th>Korisničko ime</th>
          <th>Ime</th>
          <th>Lozinka</th>
          <th>Prezime</th>
          <th>Pol</th>
          <th>Datum rođenja</th>
          <th>Uloga</th>
        </tr>

        <tr v-for="korisnik in korisnici" :key="korisnik.id">
          <td>{{ korisnik.korisnickoIme }}</td>
          <td>{{ korisnik.lozinka }}</td>
          <td>{{ korisnik.ime }}</td>
          <td>{{ korisnik.prezime }}</td>
          <td>{{ korisnik.pol }}</td>
          <td>{{ korisnik.datumRodjenja }}</td>
          <td>{{ korisnik.korisnickaUloga }}</td>
        </tr>

    </table>

    <!-- ovde sam stao-->

</template>

<script>

export default {
  name: "AdminPrikazSvihKorisnikaView",

  data: function () {
    return {
      korisnici: [],
      slanje:{
        ime: "",
        prezime: "",
        korisnickoIme: "",
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

      fetch('http://localhost:8081/api/admin/pregled_svih_korisnika' /*+ localStorage.name*/, {
        method: "GET",
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        //body: JSON.stringify(this.logovanjeSlanje),

      })
        .then(response => response.json())
        .then(data => {console.log("Success:", data); this.korisnici = data})
        .catch((error) => {
          console.error("Error:", error);
        });
  //}
  },

  methods: {

    pretraga : function() {

      fetch("http://localhost:8081/api/admin/pretraga_korisnika" /*+ this.slanje*/, {
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

          this.korisnici = data;
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