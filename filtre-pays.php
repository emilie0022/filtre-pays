<?php
/*
Plugin Name: Filtre Pays
Description: Plugin pour afficher les destinations par pays via l'API REST de WordPress.
Author: Emilie Desmarais
*/

function charger_scripts_filtre_pays() {
    wp_enqueue_script(
        'filtre-pays-js',
        plugin_dir_url(__FILE__) . 'js/filtre-pays.js',
        ['jquery'],
        filemtime(plugin_dir_path(__FILE__) . 'js/filtre-pays.js'),
        true
    );

    wp_enqueue_style(
        'filtre-pays-css',
        plugin_dir_url(__FILE__) . 'style.css',
        [],
        filemtime(plugin_dir_path(__FILE__) . 'style.css')
    );
}
add_action('wp_enqueue_scripts', 'charger_scripts_filtre_pays');

function generer_boutons_pays() {
    $countries = ["France", "États-Unis", "Canada", "Argentine", "Chili", "Belgique", "Maroc", "Mexique", "Japon", "Italie", "Islande", "Chine", "Grèce", "Suisse"];
    $output = "<div class='filtre-pays-boutons'>";
    foreach ($countries as $country) {
        $output .= "<button class='filtre-pays-bouton' data-country='" . esc_attr($country) . "'>$country</button>";
    }
    $output .= "</div><div id='resultats-destinations'></div>";
    return $output;
}
add_shortcode('filtre_pays', 'generer_boutons_pays');
