/**
TODO:
- Implement game_model class so that question and answer can be executed accordingly
- Implement feature to time out answer
- Complete main function
- Fix the generate question function to deal with insufficient trails
- sudo code for how questions.js would be used in the main controller
if player presses q
	question.main(game_model, player.get_ID() will activate
	aqs = question.main(game_model, player.get_ID()
	if (typeof aqs == false) {
		inform user that there trail did not meet the minimum criteria in order to generate a question
	} else {
		answer = aqs[0]
		question = aqs[1]
		score = aqs[2]
		start a timer
		trigger view && prompt user for an answer question  <this function will be created by david>
		while (waiting for answer) {
			countdown timer
			if (answer is given) {
				answer_consequence(game_model, player_ID, answer, question, score)
				break;
			}
			if (coundown < 0) {
				player.change_score(-1 * score)
				break;
			}
		}
		// all of this assumes that when the game_model is updated, that the view for the player is adjusted
			accordingly
	}
**/

function main(game_model, player_ID) {
	// the main function is called, and an answer, question, and score is generate
	return generate_question(game_model, player_ID)
}

// Determines whether a sufficient player_trail has been made
function sufficient_trail(game_model, player_ID) {
	// look to the right of the player, if that character is an empty space then that means player is at end of word
	// if the player is in the middle of a word, it will not be factored in
	// adjust the player trail that is considered so that partially completed words throughout the entire thing are discarded

	// for each character, we're going to want to do a spread left and right plus a check to see if suffient highlighting exists
}

// Converts list of char_ID's into a trail
function convert_trail_to_sentence(game_model, player_trail) {
	sentence = '';
	for (i = 0; i < player_trail.length; i++) {
		var char_ID = player_trail[i];
		sentence += game_model.get_char(char_ID);
	};
	return sentence;
};

// Generates a question, answer, and score
function generate_question(game_model, player_ID, question_select) {
	if (typeof question_select === undefined) ? question_select: random_q();

	// player_trail contains a list of pointers
	var player_trail = game_model.get_player(player_ID).get_trail()

	var words = [];
	for (i = 0; i < player_trail.length; i++) {
		var word_id = player_trail[i];
		words.append(game_model.get_word(word_id)); // assumes the existence of a game_model class and get_word function
	};

	var answer_index = question_select(words);
	
	var answer = words[answer_index]
	var question = '';
	for (i = 0; i < words.length; i++) {
		if (i == answer_index) {
			question += "_" * words[answer_index].length;
			continue;
		}
		question += words[i];
	}

	var score = score_question(words);

	return [question, answer, score];
}

// Randomly select a word
function random_q(words) {
	in random_index = Math.floor(Math.random() * words.length);
	return random_index;
}

// Takes in an answer to a question. Returns true if answer is correct
function answer_question(correct_answer, user_answer) {
	return correct_answer.toLowerCase() == user_answer.toLowerCase();
}

// Determines a sentences score value
function score_question(question) {
	points = 0;
	points += question.length * WORD_POINTS;
	return points;
}

// Alters the game_board data based off whether the player answers question correctly or not
function answer_consequence(game_model, player_ID, answer, question, score) {
	var player = game_model.get_player(player_ID);
	var player_trail = player.get_trail();

	// answer was correct
	if (answer_question(answer, question)) {
		for (i = 0; i < player_trail.length; i++) {
			var char_ID = player_trail[i];
			game_model.capture_char(char_ID, player_ID); // assumes existence of capture_char and game_model
		};
		player.change_score(score);
		player.change_trail(player.get_loc());
	// player's answer of question was incorrect
	}; else {
		for (i = 0; i < player_trail.length; i++) {
			var char_ID = player_trail[i];
			game_model.reset_char(char_ID);
		}
		player.change_score(-1 * score); // question score is deducted from player's current score
		player.change_trail(player.get_loc()); // trail head reset to player's current location
	}
}