document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('mcq-container');
    const submitBtn = document.getElementById('submit-btn');
    const resultContainer = document.getElementById('result-container');
    const scoreSpan = document.getElementById('score');
    const totalSpan = document.getElementById('total-questions');
    const correctSpan = document.getElementById('correct-count');
    const incorrectSpan = document.getElementById('incorrect-count');
    const dataScript = document.getElementById('mcq-data');

    let questions = [];

    if (dataScript) {
        try {
            questions = JSON.parse(dataScript.textContent);
        } catch (e) {
            console.error("Failed to parse MCQ JSON data:", e);
            container.innerHTML = '<p class="text-red-500">Error loading questions.</p>';
            submitBtn.style.display = 'none';
            return;
        }
    } else {
        console.warn("No MCQ data script found on page.");
    }

    if (questions.length === 0) {
        container.innerHTML = '<p>No questions available for this test.</p>';
        submitBtn.style.display = 'none';
        return;
    }

    totalSpan.textContent = questions.length;

    // Render questions
    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-block';
        questionDiv.style.marginBottom = '20px';
        questionDiv.style.padding = '15px';
        questionDiv.style.border = '1px solid #ddd';
        questionDiv.style.borderRadius = '5px';

        const qTitle = document.createElement('h3');
        qTitle.textContent = `${index + 1}. ${q.question}`;
        qTitle.style.fontSize = '1.1em';
        questionDiv.appendChild(qTitle);

        const optionsDiv = document.createElement('div');
        q.options.forEach((opt, optIndex) => {
            const wrapper = document.createElement('div');
            wrapper.style.marginBottom = '5px';

            const label = document.createElement('label');
            label.style.cursor = 'pointer';
            label.style.display = 'flex';
            label.style.alignItems = 'center';

            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `question-${index}`;
            input.value = optIndex;
            input.style.marginRight = '10px';

            label.appendChild(input);
            label.appendChild(document.createTextNode(opt));
            wrapper.appendChild(label);
            optionsDiv.appendChild(wrapper);
        });
        questionDiv.appendChild(optionsDiv);

        // Feedback div (hidden initially)
        const feedbackDiv = document.createElement('div');
        feedbackDiv.id = `feedback-${index}`;
        feedbackDiv.style.marginTop = '10px';
        feedbackDiv.style.fontWeight = 'bold';
        feedbackDiv.style.display = 'none';
        questionDiv.appendChild(feedbackDiv);

        container.appendChild(questionDiv);
    });

    submitBtn.addEventListener('click', function() {
        let correctCount = 0;
        let incorrectCount = 0;

        questions.forEach((q, index) => {
            const selected = document.querySelector(`input[name="question-${index}"]:checked`);
            const feedbackDiv = document.getElementById(`feedback-${index}`);
            feedbackDiv.style.display = 'block';

            if (selected) {
                const selectedValue = parseInt(selected.value);
                if (selectedValue === q.answer) {
                    correctCount++;
                    feedbackDiv.textContent = 'Correct!';
                    feedbackDiv.className = 'text-green-700'; // Utility class if avail, else inline
                    feedbackDiv.style.color = 'green';
                } else {
                    incorrectCount++;
                    feedbackDiv.textContent = `Incorrect. Correct answer: ${q.options[q.answer]}`;
                    feedbackDiv.style.color = 'red';
                }
            } else {
                incorrectCount++; // Treat unanswered as incorrect
                feedbackDiv.textContent = `Skipped. Correct answer: ${q.options[q.answer]}`;
                feedbackDiv.style.color = 'orange';
            }
        });

        scoreSpan.textContent = correctCount;
        correctSpan.textContent = correctCount;
        incorrectSpan.textContent = incorrectCount;
        resultContainer.style.display = 'block';

        // Scroll to results
        resultContainer.scrollIntoView({ behavior: 'smooth' });

        // Disable button
        submitBtn.disabled = true;
        submitBtn.textContent = "Test Submitted";
        submitBtn.style.backgroundColor = '#343a40';
        submitBtn.style.color = '#ced4da';
        submitBtn.style.borderColor = '#343a40';

        // Disable inputs
        const allInputs = document.querySelectorAll('input[type="radio"]');
        allInputs.forEach(input => input.disabled = true);
    });
});
