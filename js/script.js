/*
  - Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.
  - Dopo 30 secondi i numeri scompaiono e l'utente deve inserire, uno alla volta, i numeri che ha visto precedentemente, tramite il prompt().
  - Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.

  RAGIONAMENTO BASE
  1. creare un bottone nell'html che fà partire il gioco
  2. creare una funzione che ritorna numeri casuali da 1 a x
  3. renderizzare i numeri nell'html
  4. al momento in cui i numeri vengono renderizzati far partire il timer che dopo 30 secondi rimuove i numeri dall'html
    - una volta rimossi i nummeri far partire i prompt che domanderanno all'utente i numeri uno per volta (uno per prompt)
    - comparare i numeri inviati dall'utente con numeri creati randomicamente (quindi avremo bisogno di un array che contegga i numeri random)
    /////// versione possibile bonus//////
  4.1 dato che nel programma iniziale è richiesto di comparare i numeri cosi come sono scritti
    - comparare il primo numero inserito dall'utente solo con il primo elemento dell'array di numeri creato all'inizio
  4.2 in una versione successiva potremmo comparare i numeri inseriti dall'utente uno a uno con tutti quelli dell'array in maniera da verificare se i numeri sono corretti ma l'ordine è differente 
    - se il numero è  corretto ma la posizione è differente diamo un solo punto 
    - altrimenti se il numero è corretto e la posizione è uguale al indice dell'array daremo 2 punti
    - altrimenti nessun punto 
   ////////////// fine possibile bonus////////////// 
  5. dire all'utente quali numeri ha ricordato e per ogni numero riceverà un punto
    - stampare in pagina i numeri iniziali (ossia quelli randomici contenuti nell'array) e quelli inseriti dall'utente 
    - dare il colore rosso a quelli che non sono uguali
*/