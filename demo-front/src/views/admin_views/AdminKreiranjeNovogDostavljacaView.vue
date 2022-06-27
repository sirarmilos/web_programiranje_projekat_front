<template>

    <!-- template sa w3schools-a, za navbar -->
    <!-- vidi kako na link da vezes onclick metodu, nesto v-bind mozda ne znam-->
    <!-- https://forum.vuejs.org/t/how-to-call-a-function-by-click-on-some-class-in-href-tag/37181 --> 
    <div class="topnav">
        <a href="/adminPocetna" >Pregled podataka</a>
        <a href="/adminAzuriranjePodataka">Ažuriranje podataka</a>
        <a class="active" href="/adminKreiranjeNovogDostavljaca">Kreiranje dostavljača</a>
        <a href="/adminKreiranjeNovogRestoranaIMenadzera">Kreiraj novi restoran i menadžera</a>
        <a href="/adminPrikazSvihKorisnika">Prikaz svih korisnika</a>
        <a href="/adminRestorani">Restorani</a>
        <a v-on:click="odlogovanje()">Izloguj se</a>
    </div>

        <p> Unesite podatke o dostavljaču </p>
        <label for="korisnickoIme"> Korisnicko ime: </label>
        <input v-model="Dostavljac.korisnickoIme" id="korisnickoIme" type="text" name="korisnickoIme" required="required"/>
        <br/>

        <label for="lozinka"> Lozinika: </label>
        <input v-model="Dostavljac.lozinka" id="lozinka" type="text" name="lozinka" required="required"/>
        <br/>

        <label for="ime"> Ime: </label>
        <input v-model="Dostavljac.ime" id="ime" type="text" name="ime" required="required"/>
        <br/>

        <label for="prezime"> Prezime: </label>
        <input v-model="Dostavljac.prezime" id="prezime" type="text" name="prezime" required="required"/>
        <br/>

        <button v-on:click="dodajNovogDostavljaca()">

            Izvrši dodavanje

        </button>


    <!-- sve podatke prikazi o jednom restoranu, vidi preko Postman-a sve podatke koji dolaze-->

</template>

<script>

export default {
  name: "AdminKreiranjeNovogDostavljacaView",

   data: function () {
    return {
      Dostavljac: {
        korisnickoIme: "",
        lozinka: "",
        ime: "",
        prezime: "",
      },
    };
  },

  methods: {

    dodajNovogDostavljaca : function(){

      fetch("http://localhost:8081/api/admin/kreiraj_dostavljaca", {
        method: "POST",
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(this.Dostavljac),
      })
        .then((response) => response.json)
        .then((data) => {
          console.log(this.Dostavljac);
          console.log("Success : " + data);
          console.log(JSON.stringify(this.Dostavljac));
          console.log(JSON.stringify(data));
          this.$router.push("/adminPrikazSvihKorisnika");
        })
        .catch((err) => {
          console.log(response);
          console.log("Error : " + err);
          alert(err);
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

      },

  }

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