<template>

    <!-- template sa w3schools-a, za navbar -->
    <!-- vidi kako na link da vezes onclick metodu, nesto v-bind mozda ne znam-->
    <!-- https://forum.vuejs.org/t/how-to-call-a-function-by-click-on-some-class-in-href-tag/37181 --> 
    <div class="topnav">
        <a href="/kupacPocetna" >Pregled podataka</a>
        <a href="/kupacAzuriranjePodataka">Ažuriranje podataka</a>
        <a href="/kupacRestorani">Restorani</a>
        <a class="active" href="/kupacPorudzbine">Porudžbina</a>
        <a v-on:click="odlogovanje()">Izloguj se</a>
    </div>
    
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
      
    <p>Ukupna cena porudzbine iznosi: {{this.PregledPorudzbine.ukupnaCena}}<br>
    Cena sa popustom iznosi: {{this.PregledPorudzbine.cena_sa_popustom}}
    </p>
    <button v-on:click="kreiraj_porudzbinu()">NARUCI</button>
    

    <!-- napravi neku kao korpu gde mogu da se dodaju artikli, i brisu i na kraju se napravi porudzbina kad se klikne ovo dugme ispod, kao korpa neka-->

    <!-- ispod ima dugme koje kad se klikne napravi se ta porudzbina-->

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
        //body: JSON.stringify(this.logovanjeSlanje),

      })
        .then(response => response.json())
        .then(data => {console.log("Success:", data); this.PregledPorudzbine = data})

        .catch((error) => {
          console.error("Error:", error);
        });
  },


  methods: {
        izmeni_kolicinu : function(artikal){
          this.$router.push("/kupacIzmenaKolicine?id=" + artikal);
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


</style>