document.addEventListener("DOMContentLoaded", function (event) {

    console.log("DOM ready !")

    const form = document.getElementById("formAW");

    event.preventDefault();

    document.getElementById("submit").onclick = function (event) {
        validationform();
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        console.log("submitted")

        var myModal = new bootstrap.Modal(document.getElementById('myModal'), focus)
        var nom = document.getElementById("nom").value;
        var prenom = document.getElementById("prenom").value;
        var mail = document.getElementById("mail").value;
        var adresse = document.getElementById("adresse").value;
        var date = checkbirthdate(document.getElementById("date").value);
        const img = `<img style ='width:300px;'src = 'https://maps.googleapis.com/maps/api/staticmap?markers=${adresse}&zoom=14&size=400x300&scale=2&key=AIzaSyAkmvI9DazzG9p77IShsz_Di7-5Qn7zkcg'/>`;
        
        document.getElementById("modal-core-msg").innerHTML ="";
        document.getElementById("modal-error-msg").innerHTML ="";

        if ((nom && prenom && date && adresse && mail) != "") {
            console.log("if true")
            myModal.show();
            document.getElementById("modal-title").innerHTML = "Bienvenue " + prenom;

            document.getElementById("modal-core-msg").innerHTML += `Vous êtes nés le ${date} et vous habitez à l 'adresse suivante : <br> <a class='link' href='http://maps.google.com/maps?'> <br> ${img} <br> ${adresse} </a>`;
            document.getElementById("btn-close").onclick = function closeModal() {
                console.log("closing")
                myModal.hide();
            }
        } else {
            console.log("if false")
            myModal.show();
            document.getElementById("modal-error-msg").innerHTML = "Tout les champs sont obligtoires.";
            document.getElementById("btn-close").onclick = function closeModal() {
                console.log("closing")
                myModal.hide();
            }
        }
    });

    function checkbirthdate(date) {
        var m = new Date();
        var dateString =
            m.getUTCFullYear() +
            ("0" + (m.getUTCMonth() + 1)).slice(-2) +
            ("0" + m.getUTCDate()).slice(-2);
        date = date.replace("-", "").replace("-", "").trim();
        console.log(dateString + " " + date)
        if (dateString < date) {
            return "";
        } else {
            return document.getElementById("date").value;
        }
    }

    function validationform() {
        console.log('validation')
        var nom = document.getElementById("nom").value;
        var prenom = document.getElementById("prenom").value;

        document.getElementById("error").innerHTML = "";

        var listItemError = [];

        for (let item of document.querySelectorAll(".inputAW")) {
            if (item.value.length < 5) {
                listItemError.push(item.name);
                console.log(listItemError);
            }
            if (item.name == "mail" && validateEmail(item.value) == false) {
                document.getElementById("error").innerHTML +=
                    "l'Adresse mail n'est pas au bon format.<br/>";
                document.getElementById("error").classList.add("display");
                document.getElementById("resultat").classList.remove("display");
            }
            if(item.name == "date"){
                var strdate = checkbirthdate(item.value);
                if(strdate == ""){
                    document.getElementById("error").innerHTML +=
                    "Vous devez saisir une date valide.<br/>";
                document.getElementById("error").classList.add("display");
                document.getElementById("resultat").classList.remove("display");
                }
            }
        }

        if (listItemError.length > 0) {
            document.getElementById("error").innerHTML +=
                "Ces champs doivent avoir au moins 5 caractères:";
            document.getElementById("error").innerHTML += "<ul>";

            for (let itemError of listItemError) {
                document.getElementById("error").innerHTML +=
                    `<li>${itemError}</li>`;
            }
            document.getElementById("error").innerHTML += "</ul>";
        }

        if (document.getElementById("error").innerHTML == "") {
            document.getElementById("error").classList.remove("display");
        }
    }

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      }

})
