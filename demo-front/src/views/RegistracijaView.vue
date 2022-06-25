<template>

    <h2> Nemate nalog? Napravite ga, brzo i jednostavno!.</h2>

    <!-- ovde kod form treba i kao action sta vraca, ali to mozda ipak dole u fetchu kad odredjujem ko je taj koji se uloguje-->

    <form method="post">

        <label for="poljeKorisnickoIme"> Korisničko ime: </label>
        <input id="poljeKorisnickoIme" type="text" name="korisnickoIme" required="required"/>

        <br/>

        <label for="poljeLozinka"> Lozinka: </label>
        <input id="poljeLozinka" type="password" name="lozinka" required="required"/>

        <br/>

        <label for="poljeIme"> Ime: </label>
        <input id="poljeIme" type="text" name="ime" required="required"/>

        <br/>

        <label for="poljePrezime"> Prezime: </label>
        <input id="poljePrezime" type="text" name="prezime" required="required"/>

        <br/>

        <button>
            Registrujte se
        </button>

    </form>

</template>

<script>

export default {
  name: "RegistracijaView",
};

</script>

<style>

</style>