var keyboardGuess = [];
var length = 0;
var matching= 0;
var newWord = "";
var inProgress = [];
var counter = 0;

function newGame() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function()
	{
		if(this.readyState == 4 && this.status == 200)
		{
			keyboardGuess = []; //clear arrays
			inProgress = [];
			let response = this.responseText;
			let datamuse = JSON.parse(response);
			newWord = datamuse[Math.floor(Math.random() * datamuse.length)].word;
			console.log(newWord);
			document.getElementById("playerGuess").innerHTML = " ";
			newWord = newWord.split(" ");

			for (var i = 0; i < newWord.length; i++) {
				inProgress[i] = newWord[i];
			}
			for (var i = 0; i < newWord.length; i++) {
				inProgress[i] = " _ ";
			}
			newWord = newWord.join(" ");
			document.getElementById("keyboardGuess").innerHTML = keyboardGuess.join(" ");
			document.getElementById("playerGuess").innerHTML = inProgress.join(" ");
			hangView();
		}
	}
	const url='https://api.datamuse.com/words?ml=ocean&max=30';
	xmlhttp.open("GET", url);
	xmlhttp.send();
}


function guessLetter(event) {
    matching = 0;
    var guess = event.key || event.keyCode;
    document.getElementById("keyboardGuess").innerHTML = keyboardGuess.join("");

    for (var i = 0; i < newWord.length; i++) {
      if (newWord[i] == keyGuess) {
        inProgress[i] = keyGuess;
        document.getElementById("playerGuess").innerHTML =
         inProgress.join("");
      }
      else{
      	counter++;
      	hangView();
      }
    }
    for (var i = 0; i < newWordlength; i++) {
      if (newWord[i] == inProgress[i]) {
        matching++;
      }
      if (matching == length) {
        alert("You Won! Click 'New Game' to try again")
      }
  }

}

function hangView() {
	var image = document.getElementById('Hang_id')
	switch(counter){
		case(0):
			image.src = 'hang1.PNG';
			break;
		case(1):
			image.src = 'hang2.PNG';
			break;
		case(2):
			image.src = 'hang3.PNG';
			break;
		case(3):
			image.src = 'hang4.PNG';
			break;
		case(4):
			image.src = 'hang5.PNG';
			break;
		case(5):
			image.src = 'hang6.PNG';
			break;
		case(6):
			image.src = 'hang7.PNG';
			break;
		case(7):
			image.src = 'hang8.PNG';
			alert("You've run out of tries, Try a new game!");
			document.getElementById("playerGuess").innerHTML = "The correct answer was " + newWord;
			break;
		default:
			image.src = 'hang1.PNG';
		}
	//document.getElementById("output-image").innerHTML = image;
}


function guessWord() {
    var guess = prompt("Guess the word", "");
    if (guess == newWord) {
      document.getElementById("playerGuess").innerHTML = newWord;
      alert("You Won! Click 'New Game' to try again")
    } else {
    	counter++;
      alert("Sorry, that is not the word!");
    }
}

