function sendMail() {
    if (!checkEmail()) {
        return; // Beende die Funktion, wenn die E-Mail ungültig ist
    }
    showLoading();

    var params = {
        subject: document.getElementById("subject").value,
        from_name: document.getElementById("name").value,
        email_id: document.getElementById("email_id").value,
        message: document.getElementById("message").value
    }
    emailjs.send("service_wbn54kh", "template_bem4krd", params).then(function (res) {
        hideLoading();
        showOverlay();
    }).catch(function (error) {
        hideLoading();
        console.error("Error:", error);
        showOverlayFailed()
    });
}


// Zeige das Overlay nach erfolgreicher E-Mail
function showOverlay() {

    var messageBox = document.getElementById('overlay-message');
    var message = document.getElementById('messageSuccess');
    var overlay = document.getElementById('overlay');

    overlay.style.display = 'flex';

    setTimeout(function() {
        overlay.style.background = 'rgba(0, 0, 0, 0.63)';
        messageBox.style.opacity = '1';
        message.style.opacity = '1';
    }, 10);

    // Verstecke das Overlay nach 3 Sekunden
    setTimeout(function() {
        clearFormInputs();
        hideOverlay();
    }, 3000);

    return false;
}

// Zeige das Overlay nach fehlgeschlagener E-Mail
function showOverlayFailed() {

    var messageBox = document.getElementById('overlay-message-failed');
    var message = document.getElementById('messageFailed');
    var overlay = document.getElementById('overlay-two');

    overlay.style.display = 'flex';

    setTimeout(function() {
        overlay.style.background = 'rgba(0, 0, 0, 0.63)';
        messageBox.style.opacity = '1';
        message.style.opacity = '1';
    }, 10);

    // Verstecke das Overlay nach 3 Sekunden
    setTimeout(function() {
        hideOverlayFailed();
    }, 3000);

    return false;
}

// Entferne das Overlay nach erfolgreicher E-Mail wieder
function hideOverlay() {
    var overlay = document.getElementById('overlay');
    var messageBox = document.getElementById('overlay-message');
    var message = document.getElementById('messageSuccess');

    // Lasse das Overlay langsam verschwinden
    overlay.style.background = 'rgba(0, 0, 0, 0)'; // Hintergrund wird transparent
    messageBox.style.opacity = '0'; // Nachrichtenbox wird unsichtbar
    message.style.opacity = '0'; // Nachricht wird unsichtbar

    // Verstecke das Overlay nach einer Verzögerung
    setTimeout(function() {
        overlay.style.display = 'none';
    }, 1000); // Änderung hier auf 1 Sekunde (1000 Millisekunden)
}

function hideOverlayFailed() {
    var overlay = document.getElementById('overlay-two');
    var messageBox = document.getElementById('overlay-message-failed');
    var message = document.getElementById('messageFailed');

    // Lasse das Overlay langsam verschwinden
    overlay.style.background = 'rgba(0, 0, 0, 0)'; // Hintergrund wird transparent
    messageBox.style.opacity = '0'; // Nachrichtenbox wird unsichtbar
    message.style.opacity = '0'; // Nachricht wird unsichtbar

    // Verstecke das Overlay nach einer Verzögerung
    setTimeout(function() {
        overlay.style.display = 'none';
    }, 1000); // Änderung hier auf 1 Sekunde (1000 Millisekunden)
}

function clearFormInputs() {
    document.getElementById('name').value = '';
    document.getElementById('email_id').value = '';
    document.getElementById('subject').value = '';
    document.getElementById('message').value = '';
    updateCount();
    checkForm();
}

// Counter für Anzahl 
function updateCount() {
    var textarea = document.getElementById("message");
    var maxLength = 1000;
    var currentLength = textarea.value.length;
    var remainingChars = maxLength - currentLength;

    document.getElementById("charCount").textContent = remainingChars + "/" + maxLength; // Anzeige der verbleibenden Zeichen
}

// Prüfen, ob alle Inputs gemacht wurden, dann Button aktiviert
function checkForm() {
    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email_id").value.trim();
    var subject = document.getElementById("subject").value.trim();
    var message = document.getElementById("message").value.trim();

    var filledFields = [name, email, subject, message].filter(Boolean).length;

    var btnSend = document.getElementById("submitButton");
    btnSend.classList.remove("one-field", "two-fields", "three-fields", "four-fields");
    
    console.log(filledFields);
    switch (filledFields) {
        case 0:
            document.querySelector(".btnSend").textContent = "0% ausgefüllt";
            break;
        case 1:
            btnSend.classList.add("one-field");
            document.querySelector(".btnSend").textContent = "25% ausgefüllt";
            break;
        case 2:
            btnSend.classList.add("two-fields");
            document.querySelector(".btnSend").textContent = "50% ausgefüllt";
            break;
        case 3:
            btnSend.classList.add("three-fields");
            document.querySelector(".btnSend").textContent = "75% ausgefüllt";
            break;
        case 4:
            btnSend.classList.add("four-fields");
            document.querySelector(".btnSend").textContent = "ABSENDEN";
            break;
    }

    if (name !== "" && email !== "" && subject !== "" && message !== "") {
        document.getElementById("submitButton").disabled = false; // Button aktivieren
        var btnSend = document.getElementsByClassName("btnSend")[0];
        btnSend.style.backgroundColor = "#CC9693";
    } else {
        document.getElementById("submitButton").disabled = true; // Button deaktivieren
        var btnSend = document.getElementsByClassName("btnSend")[0];
        btnSend.style.backgroundColor = "#B1B1B1";
    }
}

// Funktion, um das Ladeoverlay auszublenden
function showLoading() {
    document.getElementById("loadingOverlay").style.display = "flex";
}

// Funktion, um das Ladeoverlay auszublenden
function hideLoading() {
    document.getElementById("loadingOverlay").style.display = "none";
}

function checkEmail() {
    var email = document.getElementById("email_id").value;
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        alert("Bitte gib eine gültige E-Mail-Adresse ein.");
        return false; // Beende die Funktion, wenn die E-Mail ungültig ist
    }
    return true;
}

// Warten bis das DOM vollständig geladen ist
document.addEventListener("DOMContentLoaded", function() {
    // Funktion für das Artworks-Karussell
    function initArtworksCarousel() {
        const radios = document.querySelectorAll('input[name="carousel-artworks"]');
        let currentIndex = 0;

        const carouselContainer = document.querySelector('#artworks .carousel-images');
        const hammer = new Hammer(carouselContainer);

        hammer.on('swipeleft', function() {
            currentIndex = (currentIndex + 1) % radios.length;
            radios[currentIndex].checked = true;
        });

        hammer.on('swiperight', function() {
            currentIndex = (currentIndex - 1 + radios.length) % radios.length;
            radios[currentIndex].checked = true;
        });
    }

    // Funktion für das Custom Sneaker-Karussell
    function initCustomSneakerCarousel() {
        const radios = document.querySelectorAll('input[name="carousel-custom-sneaker"]');
        let currentIndex = 0;

        const carouselContainer = document.querySelector('#custom-sneaker .carousel-images');
        const hammer = new Hammer(carouselContainer);

        hammer.on('swipeleft', function() {
            currentIndex = (currentIndex + 1) % radios.length;
            radios[currentIndex].checked = true;
        });

        hammer.on('swiperight', function() {
            currentIndex = (currentIndex - 1 + radios.length) % radios.length;
            radios[currentIndex].checked = true;
        });
    }

    // Funktion für das Digital Art-Karussell
    function initDigitalArtCarousel() {
        const radios = document.querySelectorAll('input[name="carousel-digital-art"]');
        let currentIndex = 0;

        const carouselContainer = document.querySelector('#digital-art .carousel-images');
        const hammer = new Hammer(carouselContainer);

        hammer.on('swipeleft', function() {
            currentIndex = (currentIndex + 1) % radios.length;
            radios[currentIndex].checked = true;
        });

        hammer.on('swiperight', function() {
            currentIndex = (currentIndex - 1 + radios.length) % radios.length;
            radios[currentIndex].checked = true;
        });
    }

    // Alle Karussells initialisieren
    initArtworksCarousel();
    initCustomSneakerCarousel();
    initDigitalArtCarousel();
});
