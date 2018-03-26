/*
 * Variable declaration
 */
let arr_obj = [];
let arr_cards = [];

/*
 * Create a list that holds all of your cards
 */
 /**
 * @description the object Card constructor.
 * @constructor
 * @param {icon} string - the name that will be invoked to create the font-awesome class name.
 * @param {attr} int - the reference of data-attribute.
 */
 function Card(icon, attr) {
   this.icon = icon;
   this.attr = attr;
 };

 /**
 * @description the function that create the array that holds the cards.
 * @constructor
 * @param {array} array - the array that contain the font-awesome class name.
 * @param {attr} int - the reference of data-attribute .
 */
 function makeObj (array){
     for (let i=0; i<array.length; i++){
         arr_obj[i]= new Card;
         arr_obj[i].icon = array[i];
         arr_obj[i].attr = i+1;
     }
 }

 const arr_classi = ['camera-retro', 'audio-description', 'adjust', 'asterisk', 'binoculars', 'at', 'american-sign-language-interpreting', 'bicycle'];

 makeObj(arr_classi);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

 /**
 * @description the function that take the Card object created and push them twice into the array to create the pairs.
 * @constructor
 * @param {array} array - the array that contain the single Card object.
 */
 function make_cards_array(array){
     for (card of array) {
         arr_cards.push(card);
         arr_cards.push(card);
     }
 }
 make_cards_array(arr_obj);

 /**
 * @description the function that shuffle the elements of the array that we give it.
 * @constructor
 * @param {array} array - the array that contain the Card objects.
 */
 // Shuffle function from http://stackoverflow.com/a/2450976
 function shuffle(array) {
     var currentIndex = array.length, temporaryValue, randomIndex;

     while (currentIndex !== 0) {
         randomIndex = Math.floor(Math.random() * currentIndex);
         currentIndex -= 1;
         temporaryValue = array[currentIndex];
         array[currentIndex] = array[randomIndex];
         array[randomIndex] = temporaryValue;
     }

     return array;
 }

 let arr2 = shuffle(arr_cards);

 function drawer(array){
     let deck = document.querySelector('.deck');
     let writer = '';
     for(let i=0; i<array.length; i++){
         writer +='<li class="card" data-card="'+array[i].attr+'"><div class="item animated face"><i class="fa fa-'+array[i].icon+'"></i></div><div class="item cover"></div></li>';
     }
     //console.log(writer);
     deck.insertAdjacentHTML('afterbegin', writer);
 }

 drawer(arr2);

 const cards = document.querySelectorAll('.card');
 console.log (cards);
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 let openCard = [];
 let matchedCard = [];
 for ( const card of cards){
     card.addEventListener('click', function(e){
         if(!(this.classList.contains('match'))){
             if(!(this.classList.contains('open'))){
                 //console.log('non contiene matched');
                 //console.log('was close');
                 this.classList.add('picked');
                 this.classList.add('open');
                 openCard.push(this);
                 //console.log(openCard);
                 if(openCard.length===2){
                     if(openCard[0].getAttribute('data-card')===openCard[1].getAttribute('data-card')) {
                         //console.log('match');
                         for (const card of openCard) {
                             card.classList.remove('picked');

                             card.classList.add('match');
                             let items = card.children;
                             items[0].classList.add('matchBgColor');
                             matchedCard.push(this);
                         }
                         openCard = [];
                     } else {
                            for (const card of openCard){
                                let items = card.children;
                                 items[0].classList.add('shake');
                                 items[0].classList.add('unmatchBgColor');
                            }
                             //console.log('unmatched');
                             closeAll();
                     }

                     if(matchedCard.length === 16) {
                         console.log('winner');
                     }
                 }
             }
         }
         //let closeCard;
         function closeAll() {
        let closeCard = setTimeout(close, 1000);
         }

         function close() {
             //console.log('is in close');
             //console.log(openCard);
             for (const card of openCard){
                 card.classList.remove('picked');
                 card.classList.remove('open');
                 let items = card.children;
                 items[0].classList.remove('shake');
                 items[0].classList.remove('unmatchBgColor');
             };
             openCard = [];
         }
 });
 }
