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
            container.innerHTML = '<div class="callout-important"><strong>Error:</strong> Failed to load questions.</div>';
            submitBtn.style.display = 'none';
            return;
        }
    } else {
        console.warn("No MCQ data script found on page.");
    }

    if (questions.length === 0) {
        container.innerHTML = '<div class="callout-note"><strong>📝 Note:</strong> No questions available for this test.</div>';
        submitBtn.style.display = 'none';
        return;
    }

    totalSpan.textContent = questions.length;

    // Render questions with modern styling
    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-block';
        questionDiv.style.animation = `fadeIn 0.5s ease-out ${index * 0.1}s both`;

        const qNumber = document.createElement('span');
        qNumber.style.cssText = `
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 28px;
            height: 28px;
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            color: white;
            border-radius: 50%;
            font-size: 0.85rem;
            font-weight: 600;
            margin-right: 10px;
        `;
        qNumber.textContent = index + 1;

        const qTitle = document.createElement('h3');
        qTitle.style.display = 'flex';
        qTitle.style.alignItems = 'center';
        qTitle.appendChild(qNumber);
        qTitle.appendChild(document.createTextNode(q.question));
        questionDiv.appendChild(qTitle);

        const optionsDiv = document.createElement('div');
        optionsDiv.style.marginTop = '1rem';
        
        q.options.forEach((opt, optIndex) => {
            const wrapper = document.createElement('div');
            wrapper.style.marginBottom = '0.5rem';

            const label = document.createElement('label');

            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `question-${index}`;
            input.value = optIndex;

            const optionLetter = document.createElement('span');
            optionLetter.style.cssText = `
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 24px;
                height: 24px;
                background: rgba(99, 102, 241, 0.1);
                color: #818cf8;
                border-radius: 6px;
                font-size: 0.8rem;
                font-weight: 600;
                margin-right: 10px;
            `;
            optionLetter.textContent = String.fromCharCode(65 + optIndex); // A, B, C, D

            label.appendChild(input);
            label.appendChild(optionLetter);
            label.appendChild(document.createTextNode(opt));
            wrapper.appendChild(label);
            optionsDiv.appendChild(wrapper);
        });
        questionDiv.appendChild(optionsDiv);

        // Feedback div (hidden initially)
        const feedbackDiv = document.createElement('div');
        feedbackDiv.id = `feedback-${index}`;
        feedbackDiv.style.cssText = `
            margin-top: 1rem;
            padding: 0.75rem 1rem;
            border-radius: 10px;
            font-weight: 500;
            display: none;
            animation: fadeIn 0.3s ease-out;
        `;
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
                    feedbackDiv.textContent = '✓ Correct!';
                    feedbackDiv.style.background = 'rgba(34, 197, 94, 0.15)';
                    feedbackDiv.style.color = '#4ade80';
                    feedbackDiv.style.border = '1px solid rgba(34, 197, 94, 0.3)';
                } else {
                    incorrectCount++;
                    feedbackDiv.innerHTML = `✗ Incorrect. <span style="color: #a5a5b8;">Correct: </span><strong>${q.options[q.answer]}</strong>`;
                    feedbackDiv.style.background = 'rgba(244, 63, 94, 0.15)';
                    feedbackDiv.style.color = '#fb7185';
                    feedbackDiv.style.border = '1px solid rgba(244, 63, 94, 0.3)';
                }
            } else {
                incorrectCount++; // Treat unanswered as incorrect
                feedbackDiv.innerHTML = `⊘ Skipped. <span style="color: #a5a5b8;">Correct: </span><strong>${q.options[q.answer]}</strong>`;
                feedbackDiv.style.background = 'rgba(245, 158, 11, 0.15)';
                feedbackDiv.style.color = '#fbbf24';
                feedbackDiv.style.border = '1px solid rgba(245, 158, 11, 0.3)';
            }
        });

        scoreSpan.textContent = correctCount;
        correctSpan.textContent = correctCount;
        incorrectSpan.textContent = incorrectCount;
        resultContainer.style.display = 'block';

        // Scroll to results smoothly
        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Update button state
        submitBtn.disabled = true;
        submitBtn.textContent = "✓ Test Submitted";
        submitBtn.style.background = 'linear-gradient(135deg, #374151 0%, #1f2937 100%)';
        submitBtn.style.boxShadow = 'none';
        submitBtn.style.cursor = 'not-allowed';

        // Disable all inputs
        const allInputs = document.querySelectorAll('input[type="radio"]');
        allInputs.forEach(input => {
            input.disabled = true;
            input.parentElement.style.cursor = 'not-allowed';
            input.parentElement.style.opacity = '0.7';
        });
    });
});
