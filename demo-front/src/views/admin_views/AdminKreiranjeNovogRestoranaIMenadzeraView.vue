<template>

    <!-- template sa w3schools-a, za navbar -->
    <!-- vidi kako na link da vezes onclick metodu, nesto v-bind mozda ne znam-->
    <!-- https://forum.vuejs.org/t/how-to-call-a-function-by-click-on-some-class-in-href-tag/37181 --> 
    <div class="topnav">
        <a href="/adminPocetna" >Pregled podataka</a>
        <a href="/adminAzuriranjePodataka">Ažuriranje podataka</a>
        <a href="/adminKreiranjeNovogDostavljaca">Kreiranje dostavljača</a>
        <a href="/adminKreiranjeNovogRestoranaIMenadzera">Kreiraj novi restoran i menadžera</a>
        <a href="/adminPrikazSvihKorisnika">Prikaz svih korisnika</a>
        <a class="active" href="/adminRestorani">Restorani</a>
        <a v-on:click="odlogovanje()">Izloguj se</a>
    </div>

        <p> Unesite podatke o menadzeru </p>
        <label for="korisnickoIme"> Korisnicko ime: </label>
        <input id="korisnickoIme" type="text" name="korisnickoIme" required="required"/>
        <br/>

        <label for="lozinka"> Lozinika: </label>
        <input id="lozinka" type="text" name="lozinka" required="required"/>
        <br/>

        <label for="ime"> Ime: </label>
        <input id="ime" type="text" name="ime" required="required"/>
        <br/>

        <label for="prezime"> Prezime: </label>
        <input id="prezime" type="text" name="prezime" required="required"/>
        <br/>
        
        <p> Unesite podatke o restoranu </p>

        <label for="nazivRestorana"> Naziv restorana: </label>
        <input id="nazivRestorana" type="text" name="nazivRestorana" required="required"/>
        <br/>

        <label for="tipRestorana"> Tip restorana: </label>
        <input id="tipRestorana" type="text" name="tipRestorana" required="required"/>
        <br/>
        
        <p> Unesite podatke o lokaciji restorana </p>

        <label for="adresaGDuzina"> Adresa restorana - geografskaDuzina: </label>
        <input id="adresaGDuzina" type="text" name="adresaGDuzina" required="required"/>
        <br/>

        <label for="adresaGSirina"> Adresa restorana - geografskaSirina: </label>
        <input id="adresaGSirina" type="text" name="adresaGSirina" required="required"/>
        <br/>
        
        <label for="adresa"> Adresa: </label>
        <input id="adresa" type="text" name="adresa" required="required"/>
        <br/>

        <button v-on:click="dodajNoviRestoranINjegovogMenadzera()">

            Izvrši dodavanje

        </button>


    <!-- sve podatke prikazi o jednom restoranu, vidi preko Postman-a sve podatke koji dolaze-->

</template>

<script>

export default {
  name: "AdminKreiranjeNovogRestoranaIMenadzeraView",

   data: function () {
    return {
      PrikaziIzabraniRestoranDto: {
        restoran:{
          naziv: "",
          tip: "",
        },
        lokacija:{
          adresa: "",
          geografskaDuzina: "",
          geografskaSirina: "",
        },
        listaArtikala:{
          naziv: "",
          cena: "",
          kolicina: "",
          tip: "",
          opis: "",
        },
        listaKomentara:{
          ocena: "",
          tekstKomentara: "",
        },
      },
    };
  },

  methods: {

    dodajNoviRestoranINjegovogMenadzera : function(){



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