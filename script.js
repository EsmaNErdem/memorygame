
const cards = document.querySelectorAll(".game-card");
let card1 = null;
let card2 = null;
let noClicking = false;
const startButton = document.querySelector("#start-button");
const start = document.querySelector('#start')
let currentScore =  0;
const scoreboard = document.getElementById('scoreboard');
let cardsFlipped = 0;
const finalScore = document.querySelector('#finalscore')
const savedScore = localStorage.getItem('score');
const bestscore = document.getElementById('bestscore')
const backPics = [
  "https://home.adelphi.edu/~al21902/pam.jpg",
  "https://cdn.costumewall.com/wp-content/uploads/2018/09/prison-mike.jpg",
  "https://www.looper.com/img/gallery/the-truth-about-mose-from-the-office/intro-1570201858.jpg",
  "https://riffmagazine.com/wp-content/uploads/2021/03/oscar_nunez_the_office_201117_gksftqychv-1024x768.jpeg",
  "https://i.blogs.es/662d1e/dwight-office/1366_2000.jpeg",
  "https://media.glamour.com/photos/56958114085ae0a850370230/master/pass/entertainment-2015-03-the-office-michael-scott-main.jpg",
  "https://qph.cf2.quoracdn.net/main-qimg-58f8230d316a10b5d78994c1e1c2b199-lq",
  "https://i0.wp.com/marvelousgeeksmedia.com/wp-content/uploads/2021/09/Screen-Shot-2021-09-07-at-8.58.27-AM.png?ssl=1",
  "https://www.indiewire.com/wp-content/uploads/2020/07/Screen-Shot-2020-07-06-at-10.39.06-AM.png",
  "https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters/large/800/Meredith-Palmer.The-Office.webp",
  "https://theofficeanalytics.files.wordpress.com/2017/10/31e7876d039c20872c65394bca137c1a_4410a99208ac7cde8b645383e2796784.jpg?w=1200",
  "https://preview.redd.it/0yjsuylgr8n21.jpg?width=640&crop=smart&auto=webp&s=a125a402c877079739b51aa6168252a29255ca0c",
  "https://cdn.costumewall.com/wp-content/uploads/2018/09/prison-mike.jpg",
  "https://www.looper.com/img/gallery/the-truth-about-mose-from-the-office/intro-1570201858.jpg",
  "https://riffmagazine.com/wp-content/uploads/2021/03/oscar_nunez_the_office_201117_gksftqychv-1024x768.jpeg",
  "https://i.blogs.es/662d1e/dwight-office/1366_2000.jpeg",
  "https://media.glamour.com/photos/56958114085ae0a850370230/master/pass/entertainment-2015-03-the-office-michael-scott-main.jpg",
  "https://qph.cf2.quoracdn.net/main-qimg-58f8230d316a10b5d78994c1e1c2b199-lq",
  "https://i0.wp.com/marvelousgeeksmedia.com/wp-content/uploads/2021/09/Screen-Shot-2021-09-07-at-8.58.27-AM.png?ssl=1",
  "https://www.indiewire.com/wp-content/uploads/2020/07/Screen-Shot-2020-07-06-at-10.39.06-AM.png",
  "https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters/large/800/Meredith-Palmer.The-Office.webp",
  "https://theofficeanalytics.files.wordpress.com/2017/10/31e7876d039c20872c65394bca137c1a_4410a99208ac7cde8b645383e2796784.jpg?w=1200",
  "https://preview.redd.it/0yjsuylgr8n21.jpg?width=640&crop=smart&auto=webp&s=a125a402c877079739b51aa6168252a29255ca0c",
  "https://home.adelphi.edu/~al21902/pam.jpg"
];

///setting the bestscore start screen
if(savedScore){
  bestscore.innerText = savedScore;
}

startButton.addEventListener('click', function(){
  start.classList.add("playing");
  currentScore = 0; 
})

//shuffling array of pics
// it is based on an algorithm called Fisher Yates 
function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

let shuffledPics = shuffle(backPics);

//assigning each pic to a a card
for (let i=0; i < shuffledPics.length; i++){
  cards[i].children[1].children[0].setAttribute('src', shuffledPics[i]);
};

//clicking and flipping
for (let card of cards) {
  card.addEventListener("click", handleCardClick);
}

function handleCardClick(e) {
  //keeping score
  currentScore = currentScore + 1; 
  scoreboard.innerText = currentScore;
  // we don't keep clicking on div with back class and keep adding flipped class to it. 
  if(e.target.tagName === "IMG") {return}
  // so we can limit only two cards being fliiped
  if (noClicking) return;

  let selectedCard = e.target.parentElement;
  //assigning card1 and card2
  if (!card1) {
    selectedCard.classList.add("flipped");
    card1 = card1 || selectedCard;
  }
  
  
  if (card1 !== selectedCard && !card2){
    selectedCard.classList.add("flipped");
    card2 = card2 || selectedCard
  }


  if (card1 && card2){
    noClicking = true;
    let img1 = card1.children[1].children[0].src;
    let img2 = card2.children[1].children[0].src;
    //if the cards are matching, removing click event listener and leaving them flipped
      if (img1 === img2){
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      card1 = null;
      card2 = null;
      noClicking = false;
      cardsFlipped = cardsFlipped + 2;
      } else {
        setTimeout(function() {
          card1.classList.remove("flipped");
          card2.classList.remove("flipped");
          card1 = null;
          card2 = null;
          noClicking = false;
        }, 1000);
      }
  }
  if (cardsFlipped === backPics.length){
    endGame();

  }

}

function endGame(){
  finalScore.innerText = currentScore;
  localStorage.setItem('score',currentScore);
  
  if (currentScore < savedScore){
    finalScore.innerText = currentScore + ' (NEW BEST SCORE)';
    localStorage.setItem('score',currentScore);
  }
  
  document.getElementById("end").classList.add("game-over");
}


