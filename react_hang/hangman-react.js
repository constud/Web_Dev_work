/**
 * 
 * 
 Conor Fleming
 4/5/19
 hangman-react.js
 * 
 */
'use strict';

class Hangman extends React.Component{
	constructor(props)
	{
		super(props);
		this.state =
		{
			man_images: ["hang1.PNG","hang2.PNG","hang3.PNG","hang4.PNG","hang5.PNG","hang6.PNG","hang7.PNG","hang8.PNG"],
			guessed: "",
			guesses: 0,
			current_word: "",
			word:"",
			showWord:[],
			winCheck: 0,
		};
	}
	//function to start new game, fetch a word from the API and draw underscores for the letters of the word
	newGame(){
		fetch("https://api.datamuse.com/words?ml=farm&max=50")
		.then(res => res.json())
		.then(
			(result) => {
				this.setState({
					word: result[Math.floor(Math.random() * 50)].word
				});
				console.log(this.state.word);
				this.setState({winCheck: 0, guesses:0, guessed: "", showWord:[], current_word: this.state.word});
				var temp = this.state.word;
				var wordArray = [];
				for(var i = 0; i < temp.length; i++){
					if(temp[i] == "-"){
						wordArray[i] = " - ";
					}
					else{
						wordArray[i] = " _ ";
						this.setState({showWord: wordArray});
					}
				}
			},
			(error) => {
				this.setState({
					error
				});
			}
		)
	}

	//Function that allows user to try and guess the word
	guessWord(){
		var guess = prompt("Guess the word", "");
		if(guess == this.state.current_word){
			alert("You Won! Click 'New Game' to try again")
			this.set
			this.setState({guessed: "YOU WON!"})
		}
		else{
			alert("Sorry, that is not the word!")
			this.state.guesses++;
		}
	}

	//allows user to use keyboard and guess letters of word
	//upon correct guess underscores will change on the screen to the correct letter
	guessLetter(event){
		var correct = event.target.value;
		document.getElementById('input').value = "";
		this.setState({guessed: correct + this.state.guessed});
		var check = this.state.showWord;
		var checkWord = this.state.current_word.split("");
		var guessCheck = false;
		for(var i = 0; i < checkWord.length; i++){
			if(checkWord[i] == correct){
				guessCheck = true;
				check[i] = correct;
				this.state.winCheck++;
			}
			this.setState({showWord:check});
		}
		if(this.state.guesses < 7 && guessCheck == false){
			this.state.guesses++;
		}
		if(this.state.guesses == 7){
			this.setState({
				guessed: "GAME OVER! The word was: " + this.state.current_word
			});
		}
		if(this.state.winCheck == this.state.current_word.length && this.state.guesses < 7){
			alert("YOU WON!!!")
			this.setState({
				guessed: "YOU WON!! Another Game??"
			})
		}
	}

	//render function to display webpage
	render(){
	  return (
		<div className="hangman-react">
		<img id="man_images" src={this.state.man_images[this.state.guesses]}/>
		<div>
		<p id="react-btn-group">
	    	<button className="button" onClick={this.guessWord.bind(this)}> Guess Word </button>
      		<button className="button" onClick={this.newGame.bind(this)}> New Game </button>
      	</p>
		  </div>
		  <div>
			  <input type="text" id="input"
			  onKeyUp={this.guessLetter.bind(this)}/>
		  </div>
      		<div id="wordbox">
      			<p>{this.state.showWord.join("")}</p>
      		</div>
      		<div id="guessed">
      			<p>{this.state.guessed}</p>
      		</div>
      	</div>
		);
	}
}

ReactDOM.render(<Hangman />,document.getElementById('root'));
