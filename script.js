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

const secretCode = "SCRAPYARD-ALEXANDRIA25!"; 

if (!localStorage.getItem("accessGranted")) {
    let userCode = prompt("Enter the code to vote:");
    if (userCode !== secretCode) {
        document.body.innerHTML = "<h2 style='color: black; text-align: center;'>Access Denied</h2>";
        throw new Error("Access Denied");
    }
    localStorage.setItem("accessGranted", "true");
}
const hasVoted = localStorage.getItem("hasVoted");

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
            <button class="vote-button" onclick="toggleVote('${team}')" ${hasVoted ? "disabled" : ""}>Vote</button>
        `;
        teamsContainer.appendChild(teamDiv);
    });

    updateVoteButtons();
}

function toggleVote(team) {
    if (hasVoted) {
        alert("You have already voted");
        return;
    }

    if (selectedTeams.includes(team)) {
        selectedTeams = selectedTeams.filter(t => t !== team);
    } else {
        if (selectedTeams.length >= 2) {
            alert(" only vote for two teams");
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

        if (hasVoted) {
            button.disabled = true;
        }
    });

    if (hasVoted) {
        document.getElementById("submitVote").disabled = true;
    }
}

document.getElementById("submitVote").addEventListener("click", function() {
    if (hasVoted) {
        alert("You have already voted");
        return;
    }

    if (selectedTeams.length !== 2) {
        alert("select exactly two teams");
        return;
    }

    selectedTeams.forEach(team => votes[team]++);

    localStorage.setItem("votes", JSON.stringify(votes));
    localStorage.setItem("hasVoted", "true");

    renderTeams();
    updateVoteButtons();
});

renderTeams();