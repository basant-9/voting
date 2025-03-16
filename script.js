const votes = JSON.parse(localStorage.getItem("votes")) || {
    "Sharks": 0,
    "Legends": 0,
    "Victorians": 0,
    "Speed-Runners": 0,
    "Generation-Boom": 0,
    "Yassin": 0,
    "Debug-Divas": 0,
    "Ne3ma": 0,
    "MIP": 0,
    "KVN": 0,
    "Autiscope": 0
};

const teams = Object.keys(votes);
let selectedTeams = [];

function renderTeams() {
    const teamsContainer = document.getElementById("teamsContainer");
    teamsContainer.innerHTML = "";

    const sortedTeams = teams.slice().sort((a, b) => votes[b] - votes[a]);

    sortedTeams.forEach(team => {
        const teamDiv = document.createElement("div");
        teamDiv.classList.add("team-row");
        teamDiv.innerHTML = `
            <span class="team-name">${team}</span>
            <span class="vote-count">${votes[team]} votes</span>
            <button class="vote-button" onclick="toggleVote('${team}')">Vote</button>
        `;
        teamsContainer.appendChild(teamDiv);
    });

    updateVoteButtons();
}

function toggleVote(team) {
    if (selectedTeams.includes(team)) {
        selectedTeams = selectedTeams.filter(t => t !== team);
    } else {
        if (selectedTeams.length >= 2) {
            alert("You can only vote for two teams");
            return;
        }
        selectedTeams.push(team);
    }
    updateVoteButtons();
}

function updateVoteButtons() {
    document.querySelectorAll(".vote-button").forEach(button => {
        const team = button.getAttribute("onclick").match(/'([^']+)'/)[1];
        button.classList.toggle("selected", selectedTeams.includes(team));
    });
}

document.getElementById("submitVote").addEventListener("click", function() {
    if (selectedTeams.length !== 2) {
        alert(" select two teams");
        return;
    }

    selectedTeams.forEach(team => votes[team]++);

    localStorage.setItem("votes", JSON.stringify(votes));

    renderTeams();

    selectedTeams = [];
    updateVoteButtons();
});

renderTeams();