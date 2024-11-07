Wheater-app

L'applicativo ha come obiettivo quello di poter fornire informazioni relative al tempo climatico tramite dopo un input, con il nome della città da parte dell'utente.
lo sviluppo dell'applicativo è suddivisio in fasi, la prima fase prevede delle feature base.
Fase 1: 

    •Temperatura attuale
    •Probabilità di pioggia
    •Condizioni generali (sole, nuvoloso, piovoso, ecc.)
    •Velocità e direzione del vento
    •Umidità e copertura nuvolosa

[x]ottimizzazione dell'area di sviluppo

    [x]rimozione dei file inutili
    [x]comprensione del weirframe e dell'interazione dei componenti

[]creazione dei componenti base utili:

    [x]header/search-bar -> input con il parametro di ricerca (es: "Milano")
    [x]weather-display -> - componente che mostrerà le condizioni  **Attuali** del meteo.
                         - Props: Riceve i dati meteo attuali dall'API.
                         - Contenuto:
                            • Mostra la temperatura attuale.
                            • Descrizione del tempo (es. pioggia, sole).
                            • Umidità e altre variabili (visibilità, pressione, ecc.).

    [x]weather-forecast -> - componente che mostrerà le condizioni  **Nell'avvenire** del meteo.
                          - Props: Riceve i dati meteo futuri dall'API.
                          Contenuto:
                            • Una lista delle previsioni con le temperature e le condizioni meteo orarie/giornaliere.
                            • Icone per il meteo (sole, nuvoloso, pioggia, ecc.).
                            • Visualizzazione in tabella o in formato carta (cards).

    []search-bar -> • Permette agli utenti di cercare una città specifica per visualizzare il meteo.
                    • Contenuto: Campo di input per cercare città e pulsante di invio.
                    • Eventi: Emissione di un evento @search con il nome della città.

    []LoadingSpinner -> • Mostra un'animazione di caricamento mentre i dati meteo vengono recuperati dall'API.
                        • Contenuto: Icona o animazione di caricamento.
                        • Utilizzo: Usato nei componenti WeatherDisplay.vue e WeatherForecast.vue quando l'app sta caricando i dati.

    []ErrorMessage -> • Ruolo: Visualizza un messaggio di errore in caso di problemi con l'API o il caricamento dei dati.
                      • Contenuto: Messaggio di errore personalizzato e pulsante di retry.


il layout iniziale dell applicativo Weather-App sarà composto da un header contenente
un campo di ricerca e un pulsante di ricerca, e un contenuto principale che mostra le specifiche sul tempo, all'interno di un container suddiviso 
in 2 colonne.