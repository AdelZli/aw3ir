document.addEventListener("DOMContentLoaded", function (event) {

    console.log("DOM ready !")
 
    const form = document.getElementById("formAW");

    event.preventDefault();

    document.getElementById("submit").onclick = function (event) {
        
        validationform();
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        console.log("Soumission du formulaire")

        var myModal = new bootstrap.Modal(document.getElementById('myModal'), focus)
        var name = document.getElementById("name").value;
        var firstname = document.getElementById("firstname").value;
        var mail = document.getElementById("mail").value;
        var adresse = document.getElementById("adresse").value;
        var date = checkbirthdate(document.getElementById("date").value);
        var formattedDate = date.slice(date.length-2,date.length)+"/"+date.slice(date.length-5,date.length-3)+"/"+date.slice(0,4);
        const img = `<img style ='width:300px;'src = 'https://maps.googleapis.com/maps/api/staticmap?markers=${adresse}&zoom=14&size=400x300&scale=2&key=AIzaSyAkmvI9DazzG9p77IShsz_Di7-5Qn7zkcg'/>`;
        
        document.getElementById("modal-core-msg").innerHTML ="";
        document.getElementById("modal-error-msg").innerHTML ="";

        //on verifie si toutes les conditions sont respectés avant d'afficher le modal
        if ((name && firstname && date && adresse && mail) != "" && validateEmail(mail) && validationform()) {
            myModal.show();

            contactStore.add(name,firstname,date,adresse,mail);
            var contactList = contactStore.getList();
            for(var index in contactList){
                console.log(contactList[index].name);
              }
            
            document.querySelector("table tbody").innerHTML +=
  '<tr><td>'+name+'</td><td>'+firstname+'</td>'+'<td>'+formattedDate+'</td>'+'<td>'+`<a href="https://maps.google.com/?q=${adresse}">`+adresse+'</a></td>'+'<td>'+`<a href="${mail}">`+mail+'</a></td></tr>';


            document.getElementById("modal-title").innerHTML = "Bienvenue " + firstname;

            document.getElementById("modal-core-msg").innerHTML += `Vous êtes nés le ${formattedDate} et vous habitez à l 'adresse suivante : <br> <a class='link' href='http://maps.google.com/maps?'> <br> ${img} <br> ${adresse} </a>`;
            document.getElementById("btn-close").onclick = function closeModal() {
                console.log("closing")
                myModal.hide();
            }
        } else {
            myModal.show();
            document.getElementById("modal-error-msg").innerHTML = "Les champs que vous avez saisies sont invalides.";
            document.getElementById("btn-close").onclick = function closeModal() {
                console.log("closing")
                myModal.hide();
            }
        }
    });

    //vérification que la date est bien conforme
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
        var name = document.getElementById("name").value;
        var firstname = document.getElementById("firstname").value;

        document.getElementById("error").innerHTML = "";

        var listItemError = [];

        for (let item of document.querySelectorAll(".inputAW")) {

            if (item.value.length < 5) {
                listItemError.push(item.name);
                console.log(listItemError);
            }

            if (item.name == "mail" && validateEmail(item.value) == false) {
                document.getElementById("error").innerHTML +=
                    "l'adresse mail n'est pas au bon format.<br/>";
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
        //si la liste d'erreur n'est pas nulle alors on revoit true pour valider la saisie
        if (listItemError.length > 0) {
            document.getElementById("error").innerHTML +=
                "Ces champs doivent avoir au moins 5 caractères:";
            document.getElementById("error").innerHTML += "<ul>";

            for (let itemError of listItemError) {
                document.getElementById("error").innerHTML +=
                    `<li>${itemError}</li>`;
            }
            document.getElementById("error").innerHTML += "</ul>";
            return false;
        }

        if (document.getElementById("error").innerHTML == "") {
            document.getElementById("error").classList.remove("display");
        }
        else{
            document.getElementById("Bravo! le formulaire est validé")

        }
        return true;

    }

    //on verifie que l'email a bien le pattern suivant : email@example.fr
    function validateEmail(mail) {
        const re =
            /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
        return re.test(String(mail).toLowerCase());
    }

})
