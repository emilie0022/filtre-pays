document.addEventListener("DOMContentLoaded", () => {
  const boutons = document.querySelectorAll(".filtre-pays-bouton");
  const resultatsContainer = document.getElementById("resultats-destinations");

  boutons.forEach((bouton) => {
    bouton.addEventListener("click", () => {
      const country = bouton.getAttribute("data-country");

      // Requête API REST
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
                                <h3 class="titre-destination">${post.title.rendered}</h3>
                                <div class="description-destination" style="display: none;">
                                    ${post.excerpt.rendered}
                                </div>
                            </div>
                        `
              )
              .join("");

            // Ajouter l'effet d'accordéon
            document.querySelectorAll(".titre-destination").forEach((titre) => {
              titre.addEventListener("click", () => {
                const description = titre.nextElementSibling;
                description.style.display =
                  description.style.display === "block" ? "none" : "block";
              });
            });
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
