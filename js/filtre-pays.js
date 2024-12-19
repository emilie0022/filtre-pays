document.addEventListener("DOMContentLoaded", () => {
  const boutons = document.querySelectorAll(".filtre-pays-bouton");
  const resultatsContainer = document.getElementById("resultats-destinations");

  boutons.forEach((bouton) => {
    bouton.addEventListener("click", () => {
      const country = bouton.getAttribute("data-country");

      fetch(
        `${filtrePaysData.restUrl}?search=${encodeURIComponent(
          country
        )}&per_page=30`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Erreur : ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          if (data.length > 0) {
            resultatsContainer.innerHTML = data
              .map(
                (post) => `
                  <div class="destination">
                    <h3>${post.title.rendered}</h3>
                  </div>
                `
              )
              .join("");
          } else {
            resultatsContainer.innerHTML =
              "<p>Aucune destination trouvée pour ce pays.</p>";
          }
        })
        .catch((error) => {
          console.error(error);
          resultatsContainer.innerHTML =
            "<p>Erreur lors de la récupération des données.</p>";
        });
    });
  });
});
