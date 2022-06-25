<template>

    <!-- template sa w3schools-a, za navbar -->
    <!-- vidi kako na link da vezes onclick metodu, nesto v-bind mozda ne znam-->
    <!-- https://forum.vuejs.org/t/how-to-call-a-function-by-click-on-some-class-in-href-tag/37181 --> 
    <div class="topnav">
        <a class="active" href="#home" >Pregled podataka</a>
        <a href="#news">Ažuriranje podataka</a>
        <a href="#contact">Restorani</a>
        <a href="#about">Porudžbina</a>
        <a href="#about">Izloguj se</a>
    </div>

    <p>
        Vaš profil
    </p>

    <!-- treba jos logika da se odradi-->

    <!--<form method="get"> --><!-- get jer ovde samo prihvatamo podatke u polja, ne menjamo i šaljemo-->

        <label for="poljeKorisnickoIme"> Korisničko ime: </label>
       <!--<input  id="poljeKorisnickoIme" type="text" name="korisnickoIme" required="required" readonly/>
        --> 
        <p> {{korisnik.korisnickoIme}} </p>
        <br/>

        <label for="poljeLozinka"> Lozinka: </label>
        <input id="poljeLozinka" type="password" name="lozinka" required="required" readonly/>

        <p> {{korisnik.lozinka}} </p>

        <br/>

        <label for="poljeIme"> Ime: </label>
        <input id="poljeIme" type="text" name="ime" required="required" readonly/>

        <p> {{korisnik.ime}} </p>

        <br/>

        <label for="poljePrezime"> Prezime: </label>
        <input id="poljePrezime" type="text" name="prezime" required="required" readonly/>

        <p> {{korisnik.prezime}} </p>

        <br/>

        <br/>

        <label for="poljePol"> Pol: </label>
        <input id="poljePol" type="text" name="pol" required="required" readonly/>

        <p> {{korisnik.pol}} </p> 

        <br/>

        <br/>

        <label for="pojePrezime"> Datum rođenja: </label>
        <input id="poljeDatumRodjenja" type="text" name="datumRodjenja" required="required" readonly/>

        <p> {{korisnik.datumRodjenja}} </p>

        <br/>

    <!--</form>-->

</template>

<script>

export default {
  name: "KupacPocetnaView",

  data: function () {
    return {
      korisnik: {},
    };
  },
  mounted: function () {

    //if(localStorage.name === "kkkk")
    //{
    //primer axios poziva
    axios
      .get("http://localhost:8081/api/korisnik/pregled_podataka")
      .then((res) => {
        
        this.korisnik = res.data;

      })
      .catch((err) =>{
        //console.log(err)
      })

      /*fetch('http://localhost:8081/api/korisnik/pregled_podataka/' + localStorage.name, {
        credentials: 'include',
      })
        .then(response => response.json())
        .then(data => {console.log("Success:", data); this.korisnik = data})
        .catch((error) => {
          console.error("Error:", error);
        });*/
  //}
  },

  /*methods: {
    addEmployee: function() {
      this.$router.push("/add-employee");
    },
    seeMore: function (employee) {
      this.$router.push("/employee?id=" + employee.id);
    },
    deleteEmployee: function (id) {
      fetch("http://localhost:8081/api/employees/" + id, {
        method: "DELETE",
      }).then((res) => {
        if (res.ok) {
          window.location.reload();
        }
      });
    },
  },*/












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