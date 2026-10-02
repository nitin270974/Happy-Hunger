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
 		const examSetPanel = document.getElementById("examSetPanel");
    if (examSetPanel) examSetPanel.style.display = "none";
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
function newExam()
{
    clearInterval(timerInterval);

    // Remove report-only mode
    document.body.classList.remove("report-mode");

    // Reset exam data
    questions.length = 0;
    currentQuestion = 0;
    currentScore = 0;
    answered = {};
    userAnswers = [];
    answerStatus = {};
    markedForReview = {};

    // Hide exam
    document.getElementById("examArea").style.display = "none";
	document.getElementById("reportSection").style.display = "none";
	

    // Hide report
    document.getElementById("ReportArea").style.display = "none";

    // Show test list
    document.getElementById("testArea").style.display = "block";

    // Show bottom navigation
    document.getElementById("navigation").style.display = "flex";

    // Clear report
    document.getElementById("ReportArea").innerHTML = "";

    // Scroll to top
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
function showReportCard() {
    // After submit/end exam, display only header + user info + report.
    currentScore = 0;
 
for (let i = 0; i < questions.length; i++)
{
if (userAnswers[i] === questions[i].CorrectAns)
{
currentScore++;
}
}

	examName=document.getElementById("selectedTestInfo").innerHTML; 
	document.body.classList.add("report-mode");
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
	
	const examSetPanel = document.getElementById("examSetPanel");
    if (examSetPanel) examSetPanel.style.display = "none";	
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
	reportSection
	document.getElementById("ReportArea").style.display = "block";
	document.getElementById("reportSection").style.display = "block";
	
}
function startTest(setNo)
{
    studentName = sessionStorage.getItem("examUserName") || "";
    const test = tests.find(t => t.setNo === setNo);
    if(!test) return;
    // Store selected test
    sessionStorage.setItem(
        "selectedTest",
        JSON.stringify(test)
    );
    // Display test information
    document.getElementById("selectedTestInfo").innerHTML = `
        <div class="selected-test-title">
            ${test.title}-${test.setNo} 
        </div>
        </div>
    `;
    // Load related questions
    loadSet(test.setNo);
}
function loadSet(setNo)
{
 
document.getElementById("testArea").style.display = "none";
document.getElementById("navigation").style.display = "none";
 /*document
        .getElementById("examSetPanel")
        .classList
        .remove("active");
*/
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
    
    document.getElementById("reviewArea").innerHTML = "";
    // Build right-side question numbers
    buildQuestionNavigator();
    // Show score
    updateScore();
    // IMPORTANT: Show Question 1
	    startTimer();
    showQuestion();
    // Start timer
}
function updateScore()
{
    //document.getElementById("score").innerHTML ="Score: " + currentScore + "/" + questions.length;
	
}
function selectAnswer(a, b)
{
    // Store selected answer
    userAnswers[currentQuestion] = a;
    answered[currentQuestion] = true;

    // Remove blue selection from all options
    const buttons = document.querySelectorAll("#options .option");

    buttons.forEach(btn => {
        btn.classList.remove("selected");
    });

    // Highlight currently selected option
    b.classList.add("selected");

    // Update status
    updateQuestionStatusBox();
    updateProgressBar();
    updateQuestionNavigator();
}
function showQuestion()
{
    // Check questions
    if (!questions || questions.length === 0) {
        return;
    }

    const q = questions[currentQuestion];

    // ================= PREVIOUS BUTTON =================
    const prevBtn = document.getElementById("prevBtn");

    if (prevBtn) {
        prevBtn.disabled = (currentQuestion === 0);
    }

    // ================= NEXT / SUBMIT BUTTON =================
    const nextBtn = document.getElementById("nextBtn");

    if (nextBtn)
    {
        nextBtn.disabled = false;

        if (currentQuestion === questions.length - 1)
        {
            nextBtn.innerHTML = "🏁 Submit Exam";
            nextBtn.style.backgroundColor = "#dc2626";
            nextBtn.style.color = "white";
            nextBtn.onclick = function()
            {
                endExam();
            };
        }
        else
        {
            nextBtn.innerHTML = "Next ➡";
            nextBtn.style.backgroundColor = "var(--primary)";
            nextBtn.style.color = "white";
            nextBtn.onclick = function()
            {
                nextQuestion();
            };
        }
    }

    // ================= DISPLAY QUESTION =================
    const questionBox = document.getElementById("question");

    questionBox.innerHTML =
        "Q" + (currentQuestion + 1) + ". " + q.Question;

    // ================= CLEAR OLD OPTIONS =================
    const optionsBox = document.getElementById("options");
    optionsBox.innerHTML = "";

    // ================= CREATE OPTIONS =================
    ["A", "B", "C", "D"].forEach(function(option)
    {
        const btn = document.createElement("button");

        btn.type = "button";
        btn.className = "option";

        btn.innerHTML =
            '<span class="option-circle">' +
            option +
            '</span>' +
            '<span class="option-text">' +
            q[option] +
            '</span>';

        // Restore user's stored answer
        if (userAnswers[currentQuestion] === option)
        {
            btn.classList.add("selected");
        }

        // User can select/change answer
        btn.onclick = function()
        {
            selectAnswer(option, btn);
        };

        optionsBox.appendChild(btn);
    });

    // ================= MARK FOR REVIEW =================
    const reviewCheckbox = document.getElementById("markForReview");

    if (reviewCheckbox)
    {
        reviewCheckbox.checked =
            markedForReview[currentQuestion] === true;
    }

    // ================= UPDATE SCREEN =================
    updateScore();
    updateQuestionStatusBox();
    updateQuestionNavigator();
    updateProgressBar();
}

function updateProgressBar()
{
    const totalQuestions = questions.length;
    if(totalQuestions === 0) return;
    let answeredCount = 0;
    for(let i = 0; i < totalQuestions; i++)
    {
        if(answered[i])
        {
            answeredCount++;
        }
    }
    const percentage =
        (answeredCount / totalQuestions) * 100;
    document.getElementById("questionProgressText").innerText =
        "Question " + (currentQuestion + 1) + " of " + totalQuestions;
    document.getElementById("completedText").innerText =
        Math.round(percentage) + "% Completed";
    document.getElementById("examProgress").style.width =
        percentage + "%";
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
function CorrectAnswer()
{
    let html = "<h2>Wrong Questions</h2>";
    questions.forEach((q,index) =>
    {
        if( userAnswers[index] && userAnswers[index] == q.CorrectAns )
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
function showCorrectAnswers()
{
    let html = '<div class="correct-answer-list">';

    questions.forEach((q, index) =>
    {
        html += `
            <span class="correct-answer-item">
                Q.${index + 1} <b>${q.CorrectAns}</b>
            </span>
        `;
    });

    html += '</div>';

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
    // Show starting time immediately
    updateTimerDisplay();
    timerInterval = setInterval(function()
    {
        // Reduce first, then display
        totalSeconds--;
        updateTimerDisplay();
        if(totalSeconds <= 0)
        {
            clearInterval(timerInterval);
            document.getElementById("timer").innerHTML =
                "⏰ TIME OVER";
            showReportCard();
        }
    }, 1000);
}
function updateTimerDisplay()
{
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    document.getElementById("timer").innerHTML =
        "🕒 " +
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0");
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
    const box = document.getElementById("question");
	//const box = document.getElementById("questionStatusBox");
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