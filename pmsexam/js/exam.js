let currentQuestion = 0;
let currentScore = 0;
let currentSet=0;
let answered = {};
let userAnswers = [];
let markedForReview = {};

let questions = [];

let studentName = "";
let examName="Test ";
// Timer in minutes
let examMinutes = 100;
// Timer variables
let totalSeconds = examMinutes * 60;
let timerInterval;
let ExamTime = {
    1 : 30,
    2 : 45,
    3 : 60,
    4 : 90,
    5 : 120
};
const QUESTION_SETS = {
	 1: typeof  SET1 !== "undefined" ?  SET1 : [],
	 2: typeof  SET2 !== "undefined" ?  SET2 : [],
	 3: typeof  SET3 !== "undefined" ?  SET3 : [],
	 4: typeof  SET4 !== "undefined" ?  SET4 : [],
	 5: typeof  SET5 !== "undefined" ?  SET5 : [],
	 6: typeof  SET6 !== "undefined" ?  SET6 : [],
	 7: typeof  SET7 !== "undefined" ?  SET7 : [],
	 8: typeof  SET8 !== "undefined" ?  SET8 : [],
	 9: typeof  SET9 !== "undefined" ?  SET9 : [],
    10: typeof SET10 !== "undefined" ? SET10 : [],
	11: typeof SET11 !== "undefined" ? SET11 : [],
	12: typeof SET12 !== "undefined" ? SET12 : [],
	13: typeof SET13 !== "undefined" ? SET13 : [],
	14: typeof SET14 !== "undefined" ? SET14 : [],
	15: typeof SET15 !== "undefined" ? SET15 : [],
	16: typeof SET16 !== "undefined" ? SET16 : [],
	17: typeof SET17 !== "undefined" ? SET17 : [],
	18: typeof SET18 !== "undefined" ? SET18 : [],
	19: typeof SET19 !== "undefined" ? SET19 : [],
	20: typeof SET20 !== "undefined" ? SET20 : []

	
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
	
	
	// Show set selection
	document.getElementById("examSetPanel").style.display = "flex";
 	// Mobile only: show hamburger
	if(window.innerWidth < 768)
	{
		document.getElementById("menuBtn").style.display = "block";
 		document.getElementById("examSetPanel").style.display = "none";
	}
    document.getElementById("studentPanel").style.display = "none";
	document.getElementById("examSetPanel").style.display = "block";
   // startExam();
}
function endExam()
{
    document.getElementById("endExamModal").style.display = "flex";
}
function closeModal()
{
    document.getElementById("endExamModal")
            .style.display = "none";
}
function confirmEndExam()
{
    document.getElementById("endExamModal")
            .style.display = "none";
    clearInterval(timerInterval);
    showReportCard();
}
function newExam() {
    questions.length = 0;
    currentQuestion = 0;
    currentScore = 0;
    answered = {};
    userAnswers = [];
    document.getElementById("examArea").style.display = "none";
	document.getElementById("ReportArea").style.display = "none";
	
    document.getElementById("examSetPanel").style.display = "flex";
    //document.getElementById("examArea").innerHTML = originalExamHTML;
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
	document.getElementById("examArea").style.display = "none";
		
    document.getElementById("ReportArea").innerHTML =
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
    <div class="score-content">
        <h2>${percentage}%</h2>
        <p>PASSING SCORE</p>
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
            <button onclick="newExam()">
                🔄 New Exam
            </button>
        </div>
    </div>
    </div>
    `;
	
	document.getElementById("ReportArea").style.display = "block";
}
function loadSet(setNo)
{
    document
        .getElementById("examSetPanel")
        .classList
        .remove("active");

    // Reset exam data
    currentQuestion = 0;
    currentScore = 0;
    answered = {};
    userAnswers = [];
    answerStatus = {};
	
	
markedForReview = {};



    currentSet = setNo;

    // Clear old questions
    questions.length = 0;

    // Check set first
    if (!QUESTION_SETS[setNo] || QUESTION_SETS[setNo].length === 0)
    {
        document.getElementById("messageArea").innerHTML = `
            <div style="
                text-align:center;
                padding:50px;
                font-size:32px;
                color:#0077b6;
                font-weight:bold;
            ">
                🚀 COMING SOON 🚀
                <br><br>
                <span style="font-size:20px;color:#666;">
                    Question Set ${setNo} is not available yet.
                </span>
            </div>
        `;

        document.getElementById("examArea").style.display = "none";

        return;
    }

    // Remove old message
    document.getElementById("messageArea").innerHTML = "";

    // Load questions
    questions.push(...QUESTION_SETS[setNo]);

    // Randomize questions
    /*for(let i = questions.length - 1; i > 0; i--)
    {
        const j = Math.floor(Math.random() * (i + 1));

        [questions[i], questions[j]] =
        [questions[j], questions[i]];
    }*/

    // Reset to first question
    currentQuestion = 0;

    // Exam time
    examMinutes = Math.ceil(questions.length / 2);
	examMinutes = 200;
    // Show exam area
    document.getElementById("examArea").style.display = "block";

    // Clear previous display
    document.getElementById("question").innerHTML = "";
    document.getElementById("options").innerHTML = "";
    document.getElementById("explanation").innerHTML = "";
    document.getElementById("reviewArea").innerHTML = "";

    // Build right-side question numbers
    buildQuestionNavigator();

    // Show score
    updateScore();

    // IMPORTANT: Show Question 1
    showQuestion();

    // Start timer
    startTimer();
}

function updateScore()
{
    //document.getElementById("score").innerHTML ="Score: " + currentScore + "/" + questions.length;
	
}
function selectAnswer(a,b)
{
    if(answered[currentQuestion]) return;
    answered[currentQuestion] = true;
    userAnswers[currentQuestion] = a;
    let q = questions[currentQuestion];
    if(a === q.CorrectAns)
    {
        currentScore++;
        answerStatus[currentQuestion] = "correct";
        b.classList.add("correct");
    }
    else
    {
        answerStatus[currentQuestion] = "wrong";
        b.classList.add("wrong");
        document.querySelectorAll('.option').forEach(x=>{
            if(x.innerText.startsWith(q.CorrectAns + '.'))
            {
                x.classList.add("correct");
            }
        });
    }
    document.querySelectorAll('.option').forEach(x=>{
        x.disabled = true;
    });
	updateQuestionStatusBox();
    updateScore();
}
function showQuestion()
{
    let q = questions[currentQuestion];
    document.getElementById("question").innerHTML =
        "Q" + (currentQuestion + 1) + ". " + q.Question;
    document.getElementById("options").innerHTML = "";
    document.getElementById("explanation").innerHTML = "";
    ["A","B","C","D"].forEach(option =>
    {
        let btn = document.createElement("button");
        btn.className = "option";
        btn.innerHTML = option + ". " + q[option];
        btn.onclick = function()
        {
            selectAnswer(option, btn);
        };
        document.getElementById("options")
                .appendChild(btn);
    });
    // Restore previous answer state
    if(answered[currentQuestion])
    {
        let buttons =
            document.querySelectorAll(".option");
        buttons.forEach(btn =>
        {
            btn.disabled = true;
            let option =
                btn.innerText.charAt(0);
            if(option === q.CorrectAns)
            {
                btn.classList.add("correct");
            }
            if(
                answerStatus[currentQuestion] === "wrong" &&
                option === userAnswers[currentQuestion]
            )
            {
                btn.classList.add("wrong");
            }
        });
        document.getElementById("explanation").innerHTML =
            "<b>Correct:</b> " +
            q.CorrectAns +
            "<br><b>Explanation:</b> " +
            q.Explanation;
    }
	
	
	const reviewCheckbox =
    document.getElementById("markForReview");

if(reviewCheckbox)
{
    reviewCheckbox.checked =
        markedForReview[currentQuestion] === true;
}



    updateScore();
	updateQuestionStatusBox();
	updateQuestionNavigator();
}
function nextQuestion() {
    if(currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        alert("Exam Finished!\n\nScore: " +currentScore +"/" + questions.length );
		//showReportCard();
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
                <p style="color:red">Your Answer: ${userAnswers[index]}</p>
				<p><span style="color:green;font-weight:bold;">Correct Answer:</span>${q.CorrectAns}(${q[q.CorrectAns]})</p>
                <p><span style="color:black;font-weight:bold;">Explanation:</span>${q.Explanation}</p>
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
function openPDF(pdfFile)
{
    document.getElementById("pdfFrame").src = pdfFile;
}
function startTimer()
{
    clearInterval(timerInterval);
    totalSeconds = examMinutes * 60;
    timerInterval = setInterval(function()
    {
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        document.getElementById("timer").innerHTML =
            "⏳ Time Left : " +
            String(minutes).padStart(2,"0") +
            ":" +
            String(seconds).padStart(2,"0");
        if(totalSeconds <= 0)
        {
            clearInterval(timerInterval);
            document.getElementById("timer").innerHTML =
                "⏰ TIME OVER";
            setTimeout(function()
            {
                showReportCard();
            },1000);
            return;
        }
        totalSeconds--;
    },1000);
}
function toggleMenu()
{
    document
        .getElementById("examSetPanel")
        .classList
        .toggle("active");
}
function buildQuestionNavigator()
{
    const navigator =
        document.getElementById("questionNavigator");
    navigator.innerHTML = "";
    for(let i = 0; i < questions.length; i++)
    {
        let btn = document.createElement("button");
        btn.type = "button";
        btn.className = "question-number";
        btn.innerText = i + 1;
        btn.onclick = function()
        {
            goToQuestion(i);
        };
        navigator.appendChild(btn);
    }
    updateQuestionNavigator();
}
function goToQuestion(index)
{
    if(index < 0 || index >= questions.length)
        return;
    currentQuestion = index;
    showQuestion();
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
function updateQuestionNavigator()
{
    const buttons =
        document.querySelectorAll(
            "#questionNavigator .question-number"
        );

    buttons.forEach((btn, index) =>
    {
        btn.classList.remove(
            "current",
            "answered",
            "review"
        );

        // Answered
        if(answered[index])
        {
            btn.classList.add("answered");
        }

        // Marked for Review
        if(markedForReview[index])
        {
            btn.classList.add("review");
        }

        // Current Question
        if(index === currentQuestion)
        {
            btn.classList.add("current");
        }
    });
}


function updateQuestionStatusBox()
{
    const box = document.getElementById("questionStatusBox");

    if(!box) return;

    box.classList.remove("answered", "review");

    // Marked for Review gets priority
    if(markedForReview[currentQuestion])
    {
        box.classList.add("review");
    }
    else if(answered[currentQuestion])
    {
        box.classList.add("answered");
    }
}
function toggleMarkForReview()
{
    const checkbox = document.getElementById("markForReview");

    markedForReview[currentQuestion] = checkbox.checked;

    updateQuestionNavigator();
    updateQuestionStatusBox();
}
