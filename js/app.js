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

 let openCard = [];
 let matchedCard = [];
 for ( const card of cards){
     card.addEventListener('click', startTimer);
     card.addEventListener('click', move);
     card.addEventListener('click', function(e){
         if(!(this.classList.contains('match'))){
             if(!(this.classList.contains('open'))){
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
                             items[0].classList.add('jackInTheBox');
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
                         stopTimer()
                         show_panel();
                     }
                 }
             }
         }
        function closeAll() {
        let closeCard = setTimeout(close, 500);
         }

         function show_panel(){
             document.querySelector('.modal-container').classList.add('show');
            document.querySelector('.close-panel').addEventListener('click', function(){
                document.querySelector('.modal-container').classList.remove('show');
            });
            get_score();
         }

         function close() {
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

 /*
  * Timer and Moves
  */

 let t=1,
 m = 0,
 s=-1,
 time,
 moved=0,
 count=0;

 function startTimer(){
     time = setInterval(function(){
         //console.log(t);
         if(t%60 === 0){
             m++;
             document.getElementById('timerM').innerHTML = m;
         };
         timer();
     }, 1000);
     for(card of cards){
         card.removeEventListener('click', startTimer);
     }
 }

 function timer() {
     if(t<60){
         s = t;
     } else {
         s = t - 60*m;
     }
     document.getElementById('timerS').innerHTML = s;
     t++;
 }

 function move(){
     count++;
     //console.log(count);
     if(count === 2){
         count = 0;
         moved ++;
         document.querySelector('#moved').innerHTML = moved;
     }
 }

 function get_star(star){
     console.log(star);
     let num_star='';
     star.innerHTML = '';
     switch(true){
         case (t>=0 && t<=36):
             for(let i=0; i<3;i++){
                 num_star += '<li><i class="fa fa-star"></i></li>';
             }
             star.insertAdjacentHTML('afterbegin', num_star);
             break;
         case (t>36 && t<=54):
             for(let i=0; i<2;i++){
                 num_star += '<li><i class="fa fa-star"></i></li>';
             }
             num_star += '<li><i class="fa fa-star-o"></i></li>';
             star.insertAdjacentHTML('afterbegin', num_star);
             break;
         case (t>54 && t<=78):
             num_star += '<li><i class="fa fa-star"></i></li>';
             for(let i=0; i<2;i++){
                 num_star += '<li><i class="fa fa-star-o"></i></li>';
             }
             star.insertAdjacentHTML('afterbegin', num_star);
             break;
         default:
             for(let i=0; i<3;i++){
                 num_star += '<li><i class="fa fa-star-o"></i></li>';
             }
             star.insertAdjacentHTML('afterbegin', num_star);
     }
 }

 function stopTimer() {
     let star1 = document.querySelector('.score-star');
     console.log('stopped');
     get_star(star1);
     clearInterval(time);
 }

 function get_score(){
     debugger;
     let star2 = document.querySelector('.modal-stars');
     get_star(star2);
 }
