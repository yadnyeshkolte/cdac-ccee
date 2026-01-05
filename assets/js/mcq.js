document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('mcq-container');
    const submitBtn = document.getElementById('submit-btn');
    const resultContainer = document.getElementById('result-container');
    const scoreSpan = document.getElementById('score');
    const totalSpan = document.getElementById('total-questions');
    const correctSpan = document.getElementById('correct-count');
    const incorrectSpan = document.getElementById('incorrect-count');
    const dataScript = document.getElementById('mcq-data');

    let questions = [];
    let answeredQuestions = new Set(); // Track which questions have been answered
    let correctCount = 0;
    let incorrectCount = 0;

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

    // Function to format code with proper indentation and syntax highlighting
    function formatCodeInText(text) {
        // Check if text contains code (backticks)
        if (!text.includes('`')) {
            return text;
        }

        // Split text into parts (regular text and code)
        const parts = [];
        let currentIndex = 0;
        const codeRegex = /`([^`]+)`/g;
        let match;

        while ((match = codeRegex.exec(text)) !== null) {
            // Add text before code
            if (match.index > currentIndex) {
                parts.push({ type: 'text', content: text.substring(currentIndex, match.index) });
            }

            // Check if this looks like a multi-statement code block (function definition, etc.)
            const code = match[1];
            const isMultiStatement = code.includes('{') || code.includes(';') ||
                code.length > 60 || code.includes('if') ||
                code.includes('for') || code.includes('while');

            if (isMultiStatement) {
                parts.push({ type: 'codeblock', content: code });
            } else {
                parts.push({ type: 'inline', content: code });
            }

            currentIndex = match.index + match[0].length;
        }

        // Add remaining text
        if (currentIndex < text.length) {
            parts.push({ type: 'text', content: text.substring(currentIndex) });
        }

        // Build HTML
        let html = '';
        for (const part of parts) {
            if (part.type === 'text') {
                html += part.content;
            } else if (part.type === 'inline') {
                html += `<code>${escapeHtml(part.content)}</code>`;
            } else if (part.type === 'codeblock') {
                const formatted = formatCodeBlock(part.content);
                const highlighted = highlightCode(formatted);
                html += `<pre class="mcq-code-block"><code class="language-java">${highlighted}</code></pre>`;
            }
        }

        return html;
    }

    // Escape HTML special characters
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Format code block with proper indentation
    function formatCodeBlock(code) {
        // Step 1: Normalize whitespace
        let formatted = code.replace(/\s+/g, ' ').trim();

        // Step 2: Add newlines after ALL semicolons (we'll handle for-loops specially)
        // First, protect for-loop semicolons by replacing them temporarily
        formatted = formatted.replace(/for\s*\([^)]+\)/g, match => match.replace(/;/g, '§'));

        // Now add newlines after all remaining semicolons
        formatted = formatted.replace(/;/g, ';\n');

        // Restore for-loop semicolons
        formatted = formatted.replace(/§/g, ';');

        // Step 3: Add newlines around braces
        formatted = formatted
            // Newline after opening brace
            .replace(/\{\s*/g, ' {\n')
            // Newline before closing brace  
            .replace(/\s*\}/g, '\n}')
            // Newline after closing brace (unless followed by else/catch/finally)
            .replace(/\}(?!\s*(else|catch|finally))/g, '}\n');

        // Step 4: Handle else/else if properly
        formatted = formatted
            .replace(/\}\s*else\s+if/g, '} else if')
            .replace(/\}\s*else\s*\{/g, '} else {')
            .replace(/\belse\s*\{/g, 'else {');

        // Step 5: Clean up - remove empty lines and excessive spaces
        formatted = formatted
            .replace(/\n\s*\n/g, '\n')
            .replace(/^\s+|\s+$/gm, '')
            .trim();

        // Step 6: Apply indentation
        const lines = formatted.split('\n');
        let indent = 0;
        const indentedLines = [];

        for (let line of lines) {
            line = line.trim();
            if (!line) continue;

            // Count braces to determine indent change
            const openBraces = (line.match(/\{/g) || []).length;
            const closeBraces = (line.match(/\}/g) || []).length;

            // Decrease indent BEFORE adding line if it starts with }
            if (line.startsWith('}') || line.startsWith('} else')) {
                indent = Math.max(0, indent - closeBraces);
                indentedLines.push('    '.repeat(indent) + line);
                indent += openBraces;
            } else {
                indentedLines.push('    '.repeat(indent) + line);
                indent += openBraces - closeBraces;
            }

            indent = Math.max(0, indent);
        }

        return indentedLines.join('\n');
    }

    // Apply syntax highlighting using Prism
    function highlightCode(code) {
        if (typeof Prism !== 'undefined' && Prism.highlight) {
            try {
                return Prism.highlight(code, Prism.languages.java || Prism.languages.clike, 'java');
            } catch (e) {
                return escapeHtml(code);
            }
        }
        return escapeHtml(code);
    }


    // Create progress indicator
    const progressContainer = document.createElement('div');
    progressContainer.id = 'progress-container';
    progressContainer.style.cssText = `
        position: sticky;
        top: 70px;
        z-index: 100;
        background: rgba(26, 26, 46, 0.95);
        backdrop-filter: blur(10px);
        padding: 1rem;
        border-radius: 12px;
        margin-bottom: 1.5rem;
        border: 1px solid rgba(99, 102, 241, 0.2);
    `;

    const progressText = document.createElement('div');
    progressText.id = 'progress-text';
    progressText.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
    `;
    progressText.innerHTML = `
        <span>Progress: <strong id="answered-count">0</strong>/${questions.length}</span>
        <span style="color: #4ade80;">✓ <span id="live-correct">0</span></span>
        <span style="color: #fb7185;">✗ <span id="live-incorrect">0</span></span>
    `;

    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        height: 6px;
        background: rgba(99, 102, 241, 0.2);
        border-radius: 3px;
        overflow: hidden;
    `;

    const progressFill = document.createElement('div');
    progressFill.id = 'progress-fill';
    progressFill.style.cssText = `
        height: 100%;
        width: 0%;
        background: linear-gradient(90deg, #6366f1, #8b5cf6);
        border-radius: 3px;
        transition: width 0.3s ease;
    `;

    progressBar.appendChild(progressFill);
    progressContainer.appendChild(progressText);
    progressContainer.appendChild(progressBar);
    container.parentNode.insertBefore(progressContainer, container);

    // Function to update progress
    function updateProgress() {
        const answeredCount = document.getElementById('answered-count');
        const liveCorrect = document.getElementById('live-correct');
        const liveIncorrect = document.getElementById('live-incorrect');
        const progressFill = document.getElementById('progress-fill');

        answeredCount.textContent = answeredQuestions.size;
        liveCorrect.textContent = correctCount;
        liveIncorrect.textContent = incorrectCount;
        progressFill.style.width = `${(answeredQuestions.size / questions.length) * 100}%`;

        // Update submit button text
        submitBtn.textContent = `📊 See Final Results (${answeredQuestions.size}/${questions.length} answered)`;

        // Check if all questions are answered
        if (answeredQuestions.size === questions.length) {
            showFinalResults();
        }
    }

    // Function to show final results
    function showFinalResults() {
        scoreSpan.textContent = correctCount;
        correctSpan.textContent = correctCount;
        incorrectSpan.textContent = incorrectCount;
        resultContainer.style.display = 'block';

        // Scroll to results smoothly
        setTimeout(() => {
            resultContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);

        // Update button state
        submitBtn.disabled = true;
        submitBtn.textContent = "✓ Test Completed!";
        submitBtn.style.background = 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)';
        submitBtn.style.boxShadow = '0 4px 15px rgba(34, 197, 94, 0.3)';
        submitBtn.style.cursor = 'default';
    }

    // Function to evaluate a single question
    function evaluateQuestion(index, selectedValue) {
        const q = questions[index];
        const feedbackDiv = document.getElementById(`feedback-${index}`);
        const questionBlock = feedbackDiv.parentElement;

        feedbackDiv.style.display = 'block';
        answeredQuestions.add(index);

        // Disable all options for this question
        const questionInputs = document.querySelectorAll(`input[name="question-${index}"]`);
        questionInputs.forEach(input => {
            input.disabled = true;
            const label = input.parentElement;
            label.style.cursor = 'not-allowed';

            // Highlight correct answer
            if (parseInt(input.value) === q.answer) {
                label.style.background = 'rgba(34, 197, 94, 0.15)';
                label.style.border = '1px solid rgba(34, 197, 94, 0.4)';
                label.style.borderRadius = '8px';
                label.style.padding = '0.5rem';
                label.style.margin = '-0.5rem';
            }

            // Highlight wrong selection
            if (parseInt(input.value) === selectedValue && selectedValue !== q.answer) {
                label.style.background = 'rgba(244, 63, 94, 0.15)';
                label.style.border = '1px solid rgba(244, 63, 94, 0.4)';
                label.style.borderRadius = '8px';
                label.style.padding = '0.5rem';
                label.style.margin = '-0.5rem';
            }
        });

        if (selectedValue === q.answer) {
            correctCount++;
            feedbackDiv.textContent = '✓ Correct! Well done!';
            feedbackDiv.style.background = 'rgba(34, 197, 94, 0.15)';
            feedbackDiv.style.color = '#4ade80';
            feedbackDiv.style.border = '1px solid rgba(34, 197, 94, 0.3)';
            questionBlock.style.borderLeft = '4px solid #4ade80';
        } else {
            incorrectCount++;
            feedbackDiv.innerHTML = `✗ Incorrect. <span style="color: #a5a5b8;">The correct answer is: </span><strong style="color: #4ade80;">${String.fromCharCode(65 + q.answer)}. ${q.options[q.answer]}</strong>`;
            feedbackDiv.style.background = 'rgba(244, 63, 94, 0.15)';
            feedbackDiv.style.color = '#fb7185';
            feedbackDiv.style.border = '1px solid rgba(244, 63, 94, 0.3)';
            questionBlock.style.borderLeft = '4px solid #fb7185';
        }

        updateProgress();
    }

    // Render questions with modern styling and markdown support
    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-block';
        questionDiv.style.animation = `fadeIn 0.5s ease-out ${index * 0.05}s both`;
        questionDiv.style.transition = 'border-left 0.3s ease';

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
            flex-shrink: 0;
        `;
        qNumber.textContent = index + 1;

        const qTitle = document.createElement('h3');
        qTitle.style.display = 'flex';
        qTitle.style.alignItems = 'flex-start';

        // Create question text span with markdown support
        const qText = document.createElement('span');
        qText.className = 'mcq-question-text';
        // Use our custom formatter for proper code block display
        qText.innerHTML = formatCodeInText(q.question);

        qTitle.appendChild(qNumber);
        qTitle.appendChild(qText);
        questionDiv.appendChild(qTitle);

        const optionsDiv = document.createElement('div');
        optionsDiv.style.marginTop = '1rem';

        q.options.forEach((opt, optIndex) => {
            const wrapper = document.createElement('div');
            wrapper.style.marginBottom = '0.5rem';

            const label = document.createElement('label');
            label.style.transition = 'all 0.2s ease';

            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `question-${index}`;
            input.value = optIndex;

            // Add instant evaluation on selection
            input.addEventListener('change', function () {
                if (!answeredQuestions.has(index)) {
                    evaluateQuestion(index, optIndex);
                }
            });

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
                flex-shrink: 0;
            `;
            optionLetter.textContent = String.fromCharCode(65 + optIndex); // A, B, C, D

            // Create option text span with markdown support
            const optText = document.createElement('span');
            optText.className = 'mcq-option-text';
            // Use our custom formatter for consistent code display
            optText.innerHTML = formatCodeInText(opt);

            label.appendChild(input);
            label.appendChild(optionLetter);
            label.appendChild(optText);
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

    // Update initial button text
    submitBtn.textContent = `📊 See Final Results (0/${questions.length} answered)`;

    // Submit button now shows results for any unanswered questions too
    submitBtn.addEventListener('click', function () {
        // Evaluate any unanswered questions as skipped
        questions.forEach((q, index) => {
            if (!answeredQuestions.has(index)) {
                const feedbackDiv = document.getElementById(`feedback-${index}`);
                const questionBlock = feedbackDiv.parentElement;

                feedbackDiv.style.display = 'block';
                answeredQuestions.add(index);
                incorrectCount++;

                feedbackDiv.innerHTML = `⊘ Skipped. <span style="color: #a5a5b8;">The correct answer is: </span><strong style="color: #4ade80;">${String.fromCharCode(65 + q.answer)}. ${q.options[q.answer]}</strong>`;
                feedbackDiv.style.background = 'rgba(245, 158, 11, 0.15)';
                feedbackDiv.style.color = '#fbbf24';
                feedbackDiv.style.border = '1px solid rgba(245, 158, 11, 0.3)';
                questionBlock.style.borderLeft = '4px solid #fbbf24';

                // Disable and highlight correct answer
                const questionInputs = document.querySelectorAll(`input[name="question-${index}"]`);
                questionInputs.forEach(input => {
                    input.disabled = true;
                    const label = input.parentElement;
                    label.style.cursor = 'not-allowed';

                    if (parseInt(input.value) === q.answer) {
                        label.style.background = 'rgba(34, 197, 94, 0.15)';
                        label.style.border = '1px solid rgba(34, 197, 94, 0.4)';
                        label.style.borderRadius = '8px';
                        label.style.padding = '0.5rem';
                        label.style.margin = '-0.5rem';
                    }
                });
            }
        });

        showFinalResults();
    });
});
