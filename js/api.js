const clashURL = 'https://api.clash.com';

export const getLeaderboard(clashID) {

	return fetch(clashURL + '/player_challenge_attempt/leaderboard/' + clashID).
		then((res) => res.json());
}

export const getActiveClashes() {
	return fetch(clashURL + '/challenge/active/').
		then((res) => res.json());
}

export const getCurrentClashes() {
	return fetch(clashURL + '/challenge/current/').
		then((res) => res.json());
}

export const getEndedClashes() {
	return fetch(clashURL + '/challenge/ended/').
		then((res) => res.json());
}

export const getPrizes(clashID) {
	return fetch(clashURL + '/challenge_prize/list/' + clashID).
		then((res) => res.json());
}

export getGameSettings(gameID) {
	return fetch(clashURL + '/game' + gameID).
		then((res) => res.json());
}