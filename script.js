document.addEventListener('DOMContentLoaded', () => {
    const articleForm = document.getElementById('article-form');
    const articleOutputDiv = document.getElementById('generated-article-output');

    if (articleForm) {
        articleForm.addEventListener('submit', (event) => {
            event.preventDefault();

            // Get values from input fields
            const prompt = document.getElementById('prompt').value;
            const primaryKeywords = document.getElementById('primary-keywords').value;
            const secondaryKeywords = document.getElementById('secondary-keywords').value; // Though not used in placeholder, good to fetch
            const wordCount = document.getElementById('word-count').value; // Same as above

            // Clear previous content
            articleOutputDiv.innerHTML = '<p>Generating your article...</p>';

            // Basic Article Structure Generation (Placeholder Content)
            let articleHTML = '';

            // 1. Catchy Title
            articleHTML += `<h1>Your Awesome Article on ${primaryKeywords || 'Your Topic'}</h1>`;

            // 2. Introduction
            articleHTML += `<p class="introduction">This article will discuss "${prompt || 'the specified topic'}" in detail, focusing on ${primaryKeywords || 'key aspects'}. It aims to provide comprehensive insights for an approximate length of ${wordCount} words.</p>`;

            // 3. Body Section
            articleHTML += `<h2>Understanding ${primaryKeywords || 'the Core Subject'}</h2>`;
            articleHTML += `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>`;
            
            articleHTML += `<h3>Key Aspects of ${secondaryKeywords || primaryKeywords || 'This Topic'}</h3>`;
            articleHTML += `<ul><li>Relevant point one, perhaps related to ${secondaryKeywords || 'a secondary concept'}.</li><li>Another important detail.</li><li>Further exploration of the subject.</li></ul>`;
            articleHTML += `<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>`;

            articleHTML += `<h2>Further Details and Analysis</h2>`;
            articleHTML += `<p>Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Nulla facilisi. Cras fermentum odio eu feugiat pretium.</p>`;

            // 4. Conclusion
            articleHTML += `<p class="conclusion">In summary, ${primaryKeywords || 'this subject'} is very important and offers much to consider. We hope this guide, focusing on "${prompt || 'your query'}", was helpful! Please share and comment.</p>`;

            // Simulate a delay for "generation" then display
            setTimeout(() => {
                articleOutputDiv.innerHTML = articleHTML;
            }, 1000); // 1 second delay
        });
    } else {
        console.error('Article form not found!');
    }

    // --- Love Calculator ---
    const loveName1Input = document.getElementById('love-name1');
    const loveName2Input = document.getElementById('love-name2');
    const calculateLoveButton = document.getElementById('calculate-love');
    const loveResultDiv = document.getElementById('love-result');

    if (calculateLoveButton) {
        calculateLoveButton.addEventListener('click', () => {
            const name1 = loveName1Input.value.trim();
            const name2 = loveName2Input.value.trim();

            if (!name1 || !name2) {
                loveResultDiv.innerHTML = '<p class="error">Please enter both names.</p>';
                return;
            }

            // Simple "love calculation" algorithm
            let combinedNames = (name1 + name2).toLowerCase();
            let sum = 0;
            for (let i = 0; i < combinedNames.length; i++) {
                sum += combinedNames.charCodeAt(i);
            }
            
            const lovePercentage = (sum % 101); // Ensure result is 0-100

            // Fun messages based on percentage
            let message = "";
            if (lovePercentage > 90) {
                message = "Wow! A match made in heaven! <span class='love-heart'>💖</span>";
            } else if (lovePercentage > 70) {
                message = "Looking very promising! <span class='love-heart'>💕</span>";
            } else if (lovePercentage > 50) {
                message = "There's a good chance! <span class='love-heart'>😊</span>";
            } else if (lovePercentage > 30) {
                message = "Hmm, maybe with some effort? <span class='love-heart'>🤔</span>";
            } else {
                message = "Looks like a friendship zone... <span class='love-heart'>😅</span>";
            }

            loveResultDiv.innerHTML = `<p>The love compatibility between <strong>${name1}</strong> and <strong>${name2}</strong> is:</p>
                                     <p class="love-percentage">${lovePercentage}%</p>
                                     <p>${message}</p>`;
        });
    } else {
        console.error('Love Calculator button not found!');
    }
    // --- End Love Calculator ---

    // --- Age Calculator ---
    const ageDobInput = document.getElementById('age-dob');
    const calculateAgeButton = document.getElementById('calculate-age');
    const ageResultDiv = document.getElementById('age-result');

    if (calculateAgeButton) {
        calculateAgeButton.addEventListener('click', () => {
            const dobString = ageDobInput.value;
            if (!dobString) {
                ageResultDiv.innerHTML = '<p class="error">Please select your date of birth.</p>';
                return;
            }

            const dob = new Date(dobString);
            const today = new Date();

            if (dob > today) {
                ageResultDiv.innerHTML = '<p class="error">Date of birth cannot be in the future.</p>';
                return;
            }

            let years = today.getFullYear() - dob.getFullYear();
            let months = today.getMonth() - dob.getMonth();
            let days = today.getDate() - dob.getDate();

            if (months < 0 || (months === 0 && days < 0)) {
                years--;
                months += 12; // Add 12 to months if negative
            }
            
            if (days < 0) {
                // Borrow days from the previous month
                const prevMonthLastDay = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
                days += prevMonthLastDay;
                months--;
                if (months < 0) { // Adjust if months became negative after borrowing
                    months += 12;
                    // years--; // Year adjustment already handled
                }
            }

            let resultHTML = `<p>You are:</p>`;
            resultHTML += `<p class="age-detail"><strong>${years}</strong> year${years !== 1 ? 's' : ''}</p>`;
            if (months > 0 || days > 0 || years === 0) { // Show months and days if not just years, or if age is 0 years
                 resultHTML += `<p class="age-detail"><strong>${months}</strong> month${months !== 1 ? 's' : ''}</p>`;
                 resultHTML += `<p class="age-detail"><strong>${days}</strong> day${days !== 1 ? 's' : ''} old</p>`;
            } else {
                 resultHTML += `<p class="age-detail">old</p>`;
            }


            ageResultDiv.innerHTML = resultHTML;
        });
    } else {
        console.error('Age Calculator button not found!');
    }
    // --- End Age Calculator ---

    // --- Voice to Text Converter ---
    const vttStartBtn = document.getElementById('vtt-start-btn');
    const vttOutputTextarea = document.getElementById('vtt-output');
    const vttStatusDiv = document.getElementById('vtt-status');

    if (vttStartBtn && vttOutputTextarea && vttStatusDiv) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = false; // Process single utterances
            recognition.lang = 'en-US';
            recognition.interimResults = false; // Get final results

            vttStartBtn.addEventListener('click', () => {
                vttStatusDiv.textContent = 'Listening...';
                vttStartBtn.textContent = 'Listening...';
                vttStartBtn.disabled = true;
                recognition.start();
            });

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                vttOutputTextarea.value += (vttOutputTextarea.value ? '\n' : '') + transcript + '.'; // Add a period for sentence structure
                vttStatusDiv.textContent = 'Speech recognized. Click "Start Listening" for more.';
            };

            recognition.onerror = (event) => {
                let errorMessage = 'An error occurred during recognition.';
                if (event.error === 'no-speech') {
                    errorMessage = 'No speech was detected. Please try again.';
                } else if (event.error === 'audio-capture') {
                    errorMessage = 'Audio capture failed. Ensure microphone is enabled.';
                } else if (event.error === 'not-allowed') {
                    errorMessage = 'Microphone access denied. Please allow microphone access.';
                }
                vttStatusDiv.textContent = `Error: ${errorMessage}`;
                console.error('Speech recognition error:', event.error, event.message);
            };

            recognition.onend = () => {
                vttStartBtn.textContent = 'Start Listening';
                vttStartBtn.disabled = false;
                // vttStatusDiv.textContent = 'Click "Start Listening" to speak.'; // Or keep last status
            };

        } else {
            vttStatusDiv.textContent = 'Sorry, your browser does not support Voice to Text.';
            vttOutputTextarea.placeholder = 'Voice to Text is not supported in your browser.';
            vttStartBtn.disabled = true;
            vttStartBtn.textContent = 'Not Supported';
        }
    } else {
        console.error('Voice to Text Converter elements not found!');
    }
    // --- End Voice to Text Converter ---

    // --- Salary Calculator ---
    const salaryHourlyRateInput = document.getElementById('salary-hourly-rate');
    const salaryHoursWeekInput = document.getElementById('salary-hours-week');
    const salaryCalculateBtn = document.getElementById('salary-calculate-btn');
    const salaryResultDiv = document.getElementById('salary-result');

    if (salaryCalculateBtn) {
        salaryCalculateBtn.addEventListener('click', () => {
            const hourlyRate = parseFloat(salaryHourlyRateInput.value);
            const hoursPerWeek = parseFloat(salaryHoursWeekInput.value);

            if (isNaN(hourlyRate) || hourlyRate <= 0 || isNaN(hoursPerWeek) || hoursPerWeek <= 0) {
                salaryResultDiv.innerHTML = '<p class="error">Please enter valid positive numbers for hourly rate and hours per week.</p>';
                return;
            }

            const weeklyPay = hourlyRate * hoursPerWeek;
            const monthlyPay = (weeklyPay * 52) / 12; // Approximate
            const annualPay = weeklyPay * 52;

            // Format as currency (e.g., $1,234.56)
            const formatCurrency = (amount) => {
                return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
            };

            salaryResultDiv.innerHTML = `
                <p>Based on an hourly rate of <strong>${formatCurrency(hourlyRate)}</strong> and <strong>${hoursPerWeek}</strong> hours per week:</p>
                <ul class="salary-details">
                    <li>Weekly Pay: <strong>${formatCurrency(weeklyPay)}</strong></li>
                    <li>Monthly Pay (approx.): <strong>${formatCurrency(monthlyPay)}</strong></li>
                    <li>Annual Pay: <strong>${formatCurrency(annualPay)}</strong></li>
                </ul>
            `;
        });
    } else {
        console.error('Salary Calculator elements not found!');
    }
    // --- End Salary Calculator ---
});
