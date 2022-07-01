<template>
    
    <table id="pregled">

          <tr>
            <th>Naziv </th>
            <th>Cena_po_artiklu </th>
            <th>Kolicina</th>
            
          </tr>

          <tr v-for="artikal in PregledPorudzbine.artikliZaPregledPorudzbineDtos" :key="artikal.id">
            <td>{{artikal.naziv }}</td>
            <td>{{artikal.cena}}</td>
            <td>{{artikal.kolicina}}</td>
            <button v-on:click="brisanje_artikla(artikal)">Ponisti </button>
            <button v-on:click="izmeni_kolicinu(artikal)">Izmeni kolicinu</button>
          </tr>
  
     </table>
</template>

<script>

export default {
  name: "KupacIzmenaKolicineView",

  data: function(){
    return{
        id:"",
        naziv:"",
        kolicina:"",
    };
  },
  mounted: function () {
        this.id = this.$route.query.id;
        this.naziv = this.$route.query.naziv;
        this.kolicina = this.$route.query.kolicina;
  },

  methods: {
      
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

      kreiraj_porudzbinu : function (){
        fetch('http://localhost:8081/api/porudzbina/kreiranjePorudzbine', {
        method: "POST",
        credentials: 'include',
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        //body: JSON.stringify(this.logovanjeSlanje),

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