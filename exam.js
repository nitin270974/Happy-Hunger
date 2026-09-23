let currentQuestion = 0;
let currentScore = 0;
let currentSet=0;
let answered = {};
let userAnswers = [];
let questions = [];
let studentName = "";
let examName="Test ";
const QUESTION_SETS = {
    1: typeof SET1 !== "undefined" ? SET1 : [],
    2: typeof SET2 !== "undefined" ? SET2 : [],
    3: typeof SET3 !== "undefined" ? SET3 : [],
    4: typeof SET4 !== "undefined" ? SET4 : [],
    5: typeof SET5 !== "undefined" ? SET5 : [],
    6: typeof SET6 !== "undefined" ? SET6 : [],
    7: typeof SET7 !== "undefined" ? SET7 : [],
    8: typeof SET8 !== "undefined" ? SET8 : [],
    9: typeof SET9 !== "undefined" ? SET9 : [],
    10: typeof SET10 !== "undefined" ? SET10 : []
};

function startSelectedExam() {
    studentName =
        document.getElementById("studentName")
        .value
        .trim();

    if(studentName === "") {
        alert("Please Enter Student Name");
        return;
    }
    document.getElementById("studentPanel").style.display = "none";
	document.getElementById("examSetPanel").style.display = "block";
    startExam();
}
function endExam() {
    let confirmEnd =
       confirm("Are you sure you want to end the exam?");
    if(confirmEnd) {
		
        showReportCard();
    }
}

function showReportCard() {
    let attempted = 0;
    for(let i=0;i<questions.length;i++) {
        if(userAnswers[i]) {
            attempted++;
        }
    }
    let notAnswered =questions.length - attempted;
    let wrong =attempted - currentScore;
    let percentage =((currentScore / questions.length)*100).toFixed(2);
    let result = percentage >= 50 ? "PASS ✅" : "FAIL ❌";
	let examDate =  new Date().toLocaleString();
	let resultColor = percentage >= 50 ? "#16a34a" : "#dc2626";
	
	document.getElementById("examSetPanel").style.display = "none";
		
    document.getElementById("examArea").innerHTML =
    `
	
    <div class="reportCard">
		<div class="report-card">
        <div class="report-header">
            <h1>🏆 ${examName} Exam Report Card</h1>
            <p>${examDate}</p>
        </div>



<div class="student-info">
            <div>
                <span>Student Name</span>
                <strong>${studentName}</strong>
            </div>
            <div>
                <span>Question Set</span>
                <strong>SET-${currentSet}</strong>
            </div>
        </div>

		
		
        <div class="score-circle">
            <div>
                <h2>${percentage}%</h2>
                <p>Score</p>
            </div>
        </div>
        <div class="result-box"
            style="background:${resultColor}">
            ${result}
        </div>

        <div class="stats-grid">
            <div class="stat-card">
                <h3>${questions.length}</h3>
                <p>Total Questions</p>
            </div>
            <div class="stat-card">
                <h3>${attempted}</h3>
                <p>Attempted</p>
            </div>
            <div class="stat-card">
                <h3>${currentScore}</h3>
                <p>Correct</p>
            </div>
            <div class="stat-card">
                <h3>${wrong}</h3>
                <p>Wrong</p>
            </div>
            <div class="stat-card">
                <h3>${notAnswered}</h3>
                <p>Skipped</p>
            </div>
        </div>


        <div class="actions">
            <button onclick="window.print()">
                🖨 Print Report Card
            </button>
            <button onclick="location.reload()">
                🔄 New Exam
            </button>
        </div>
    </div>
    </div>
    `;
}

function loadSet(setNo) {
	currentSet=setNo;
    questions.length = 0;
    questions.push(...QUESTION_SETS[setNo]);
    for(let i = questions.length - 1; i > 0; i--)
    {
        const j =Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] =  [questions[j], questions[i]];
    }
    currentQuestion = 0;
    currentScore = 0;
    answered = {};
    userAnswers = [];
	document.getElementById("examArea").style.display = "block";
    updateScore();
    showQuestion();
}
function updateScore()
{
    document.getElementById("score").innerHTML ="Score: " + currentScore + "/" + questions.length;
}
function showQuestion()
{
    let q = questions[currentQuestion];
    document.getElementById("question").innerHTML = "Q" + (currentQuestion + 1) + ". " + q.Question;
    document.getElementById("options").innerHTML = "";
    document.getElementById("explanation").innerHTML = "";

    ["A","B","C","D"].forEach(option =>
    {
        let btn =  document.createElement("button");
        btn.className = "option";
        btn.innerHTML = option + ". " + q[option];
        btn.onclick = function()
        {
            selectAnswer(option,btn);
        };
        document
            .getElementById("options")
            .appendChild(btn);
    });
    updateScore();
}
function selectAnswer(answer, button)
{
    if(answered[currentQuestion])
        return;
    answered[currentQuestion] = true;
    userAnswers[currentQuestion] =  answer;
    let q = questions[currentQuestion];

    document
        .querySelectorAll(".option")
        .forEach(btn => { btn.disabled = true; });

    if(answer === q.CorrectAns)
    {
        currentScore++;
        button.classList.add("correct");
    }
    else
    {
        button.classList.add("wrong");
        document
            .querySelectorAll(".option")
            .forEach(btn =>
            {
                if(
                    btn.innerText.startsWith(q.CorrectAns + ".")
                )
                {
                    btn.classList.add("correct");
                }
            });
    }
    updateScore();
    document.getElementById("explanation").innerHTML = "<b>Correct Answer:</b> " + q.CorrectAns + "<br><b>Explanation:</b> " + q.Explanation;
}

function nextQuestion() {

    if(currentQuestion < questions.length - 1) {

        currentQuestion++;
        showQuestion();

    } else {

        alert("Exam Finished!\n\nScore: " +currentScore +"/" + questions.length );
		showReportCard();
    }
}



function prevQuestion()
{
    if(currentQuestion > 0)
    {
        currentQuestion--;
        showQuestion();
    }
}
function reviewWrongQuestions()
{
    let html = "<h2>Wrong Questions</h2>";
    questions.forEach((q,index) =>
    {
        if( userAnswers[index] && userAnswers[index] !== q.CorrectAns )
        {
            html += `
            <div>
                <h4>Q${index+1}. ${q.Question}</h4>
                <p style="color:red">
                    Your Answer:
                    ${userAnswers[index]}
                </p>
                <p style="color:green">
                    Correct Answer:
                    ${q.CorrectAns}
                </p>
                <p>
                    ${q.Explanation}
                </p>
                <hr>
            </div>`;
        }
    });
    document.getElementById("reviewArea").innerHTML = html;
}

function reviewSkippedQuestions()
{
    let html ="<h2>Not Answered Questions</h2>";
    questions.forEach((q,index) =>
    {
        if(!userAnswers[index])
        {
            html += `
            <div>
                <h4>Q${index+1}. ${q.Question}</h4>
                <p style="color:orange">
                    Not Answered
                </p>
                <p style="color:green">
                    Correct Answer:
                    ${q.CorrectAns}
                </p>
                <p>
                    ${q.Explanation}
                </p>
                <hr>
            </div>`;
        }
    });
    document.getElementById("reviewArea").innerHTML = html;
}
function reviewMistakes()
{
    let html ="<h2>Questions To Revise</h2>";
    questions.forEach(
        (q,index) =>
    {
        if(
            !userAnswers[index] ||
            userAnswers[index] !==
            q.CorrectAns
        )
        {
            html += `
            <div>
                <h4>Q${index+1}. ${q.Question}</h4>
                <p>
                    Your Answer:
                    ${
                        userAnswers[index]
                        || "Not Answered"
                    }
                </p>
                <p>
                    Correct Answer:
                    ${q.CorrectAns}
                </p>
                <p>
                    ${q.Explanation}
                </p>
                <hr>
            </div>`;
        }
    });
    document.getElementById("reviewArea").innerHTML = html;
}