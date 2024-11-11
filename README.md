Skysense

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

    [x] search-bar -> input con il parametro di ricerca (es: "New York")
    [x]Current Weather -> - componente che mostrerà le condizioni  **Attuali** del meteo.
                         - store.js reactive : prende i dati dallo store tramite una funzione getter.
                         - Contenuto:
                            • Mostra la temperatura attuale.
                            • Descrizione del tempo (es. pioggia, sole).
                            • Umidità e altre variabili (visibilità, pressione, ecc.).

    [x]Hourly Forecast -> - componente che mostrerà le condizioni  **Orarie** del meteo.
                          - store.js reactive : prende i dati dallo store tramite una funzione getter.
                          Contenuto:
                            • Una lista delle previsioni con le temperature e le condizioni meteo orarie.
                            • Icone per il meteo (sole, nuvoloso, pioggia, ecc.).
                            • Visualizzazione di un diagramma con chart.js.

    [x]Daily Forecast -> - componente che mostrerà le condizioni  **Giornaliere** del meteo.
                          - store.js reactive : prende i dati dallo store tramite una funzione getter.
                          Contenuto:
                            • Nome del Giorno.
                            • Icone per il meteo (sole, nuvoloso, pioggia, ecc.).
                            • Temperature Celsius.
                            • Formato slide scorrevoli su tablet e mobile



    [x]LoadingSpinner -> • Mostra un'animazione di caricamento mentre i dati meteo vengono recuperati dall'API.
                        • Contenuto: Icona o animazione di caricamento.
                        • Utilizzo: Usato nei componenti WeatherDisplay.vue e WeatherForecast.vue quando l'app sta caricando i dati.

    []xErrorMessage -> • Ruolo: Visualizza un messaggio di errore in caso di problemi con l'API o il caricamento dei dati.
                      • Contenuto: Messaggio di errore personalizzato e pulsante di retry.

•task da svolgere:

[] nome della città nel componente currentWeather