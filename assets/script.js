var league = document.getElementById('leagueGames')
var odds = document.getElementById('odds')
var premierLeagueLi = document.getElementById('premierLeague')
var laLigaLi = document.getElementById('laLiga')
var bundesligaLi = document.getElementById('bundesliga')
var serieaLi = document.getElementById('serie-a')
var league1Li = document.getElementById('league-1')
var mlsLi = document.getElementById('mls')
var league2Li = document.getElementById('league-2')
var apiKey = "a6d86e4be11611d0c6bdb1424a24eefe"
var myHeaders = new Headers();

myHeaders.append("x-rapidapi-key", apiKey);
myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

var requestOptions = {
    method: 'GET',
    headers: myHeaders
};

function getLeague(leagueId) {
    league.innerHTML = ''

    fetch(`https://v3.football.api-sports.io/fixtures?league=${leagueId}&next=10`, requestOptions).then(function (response) {
        return response.json();
    })

        .then(function (data) {
            var results = data.response
            console.log(results)

            for (var i = 0; i < results.length; i++) {

                var matchCard = document.createElement('div');
                matchCard.className += 'matchCard';
                league.appendChild(matchCard);

                var teamNames = document.createElement('h3')
                teamNames.textContent = results[i].teams.home.name + " vs " + results[i].teams.away.name
                teamNames.className += "matches";
                matchCard.append(teamNames)

                var matchDay = document.createElement("p")
                var matchDate = dayjs(results[i].fixture.date)
                matchDay.textContent = matchDate.format('MMMM D, YYYY h:mm A')
                matchDay.className += "matchDay";
                matchCard.append(matchDay)

                var homeTeamLogo = document.createElement('img')
                homeTeamLogo.src = results[i].teams.home.logo
                homeTeamLogo.className += "homeLogo"
                matchCard.append(homeTeamLogo)

                var awayTeamLogo = document.createElement('img')
                awayTeamLogo.src = results[i].teams.away.logo
                awayTeamLogo.className += "awayLogo"
                matchCard.append(awayTeamLogo)
            }
        })
}
premierLeagueLi.addEventListener('click', function (event) {
    event.preventDefault()
    getLeague(39)
    getOdds('soccer_epl')
})
laLigaLi.addEventListener('click', function (event) {
    event.preventDefault()
    getLeague(140)
    getOdds('soccer_spain_la_liga')

})
bundesligaLi.addEventListener('click', function (event) {
    event.preventDefault()
    getLeague(78)
    getOdds('soccer_germany_bundesliga')

})
serieaLi.addEventListener('click', function (event) {
    event.preventDefault()
    getLeague(135)
    getOdds('soccer_italy_serie_a')
})
league1Li.addEventListener('click', function (event) {
    event.preventDefault()
    getLeague(61)
    getOdds('soccer_france_ligue_one')
})
mlsLi.addEventListener('click', function (event) {
    event.preventDefault()
    getLeague(253)
    getOdds('soccer_usa_mls')
})
league2Li.addEventListener('click', function (event) {
    event.preventDefault()
    getLeague(62)
    getOdds('soccer_france_ligue_two')
})

function getOdds(oddId) {
    odds.innerHTML = ''
    fetch(`https://api.the-odds-api.com/v4/sports/${oddId}/odds?apiKey=34b3c99bfd37616194e6d4c0a3604a37&regions=us&markets=h2h`)

        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)

            for (var i = 0; i < 10; i++) {

                var oddsCard = document.createElement('div');
                oddsCard.className += 'oddsCard';
                odds.appendChild(oddsCard);


                console.log(data[i]?.bookmakers[0].markets[0].outcomes[0].name)
                console.log(data[i]?.bookmakers[0].markets[0].outcomes[0].price)
                console.log(data[i]?.bookmakers[0].markets[0].outcomes[1].name)
                console.log(data[i]?.bookmakers[0].markets[0].outcomes[1].price)
                console.log(data[i]?.bookmakers[0].markets[0].outcomes[2]?.name)
                console.log(data[i]?.bookmakers[0].markets[0].outcomes[2]?.price)

                var homeTeamName = document.createElement('h4')
                homeTeamName.textContent = data[i]?.bookmakers[0].markets[0].outcomes[0].name ?? "No Bookmaker"
                homeTeamName.className += "homeTeam"
                oddsCard.append(homeTeamName)

                var homeTeamOdds = document.createElement('p')
                homeTeamOdds.textContent = data[i]?.bookmakers[0].markets[0].outcomes[0].price ?? "No Bookmaker"
                homeTeamOdds.className += "homeTeamOdds"
                oddsCard.append(homeTeamOdds)

                var awayTeamName = document.createElement('h4')
                awayTeamName.textContent = data[i]?.bookmakers[0].markets[0].outcomes[1].name ?? "No Bookmaker"
                awayTeamName.className += "awayTeam"
                oddsCard.append(awayTeamName)

                var awayTeamOdds = document.createElement('p')
                awayTeamOdds.textContent = data[i]?.bookmakers[0].markets[0].outcomes[1].price ?? "No Bookmaker"
                awayTeamOdds.className += "awayTeamOdds"
                oddsCard.append(awayTeamOdds)

                var drawName = document.createElement('h4')
                drawName.textContent = data[i]?.bookmakers[0].markets[0].outcomes[2]?.name ?? "No Draw Odds"
                drawName.className += "drawTeam"
                oddsCard.append(drawName)

                var drawOdds = document.createElement('p')
                drawOdds.textContent = data[i]?.bookmakers[0].markets[0].outcomes[2]?.price ?? "No Draw Odds"
                drawOdds.className += "drawOdds"
                oddsCard.append(drawOdds)
            }
        })
}


