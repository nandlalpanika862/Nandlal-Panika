document.addEventListener('DOMContentLoaded', () => {
    const articleForm = document.getElementById('article-form');
    const articleOutputDiv = document.getElementById('generated-article-output');

    // Helper function to generate placeholder text
    function generatePlaceholderText(numWords, seedKeyword = '') {
        const loremIpsumWords = "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum".split(" ");
        let text = [];
        if (seedKeyword) {
            text.push(seedKeyword.charAt(0).toUpperCase() + seedKeyword.slice(1)); // Start with the keyword
        }
        for (let i = text.length; i < numWords; i++) {
            text.push(loremIpsumWords[Math.floor(Math.random() * loremIpsumWords.length)]);
        }
        let output = text.join(" ");
        // Ensure it ends with a period and is roughly the right length.
        if (output.length > 0 && !['.', '!', '?'].includes(output.charAt(output.length - 1))) {
            output += '.';
        }
        return output;
    }


    if (articleForm) {
        articleForm.addEventListener('submit', (event) => {
            event.preventDefault();

            // Get values from input fields
            const promptText = document.getElementById('prompt').value.trim();
            const primaryKeywords = document.getElementById('primary-keywords').value.trim();
            const secondaryKeywords = document.getElementById('secondary-keywords').value.trim();
            const wordCount = parseInt(document.getElementById('word-count').value) || 1000;

            articleOutputDiv.innerHTML = '<p class="generating-message">Generating your enhanced article structure...</p>';

            // --- 1. Title Generation ---
            let title = `Your Comprehensive Guide to ${primaryKeywords || 'the Main Topic'}`;
            if (promptText.length > 10 && !primaryKeywords) { // Use prompt if no primary keyword and prompt is somewhat descriptive
                title = promptText.split(' ').slice(0, 8).join(' ') + "..."; // First 8 words of prompt
            }
            if (title.length > 70) title = title.substring(0, 67) + "..."; // Aim for ~60-70 chars

            // --- 2. Meta Description Generation ---
            let metaDescription = `Discover everything you need to know about ${primaryKeywords || 'this important subject'}. ${promptText.substring(0, 155 - (primaryKeywords ? primaryKeywords.length : 25) - 25 )}`;
            if (metaDescription.length > 160) metaDescription = metaDescription.substring(0, 157) + "...";

            // --- 3. URL Slug Generation ---
            let slug = title.toLowerCase()
                            .replace(/\s+/g, '-')         // Replace spaces with -
                            .replace(/[^\w-]+/g, '')    // Remove all non-word chars
                            .replace(/--+/g, '-')       // Replace multiple - with single -
                            .replace(/^-+/, '')          // Trim - from start of text
                            .replace(/-+$/, '');         // Trim - from end of text
            if (slug.length > 50) slug = slug.substring(0, 50);


            let articleHTML = `<div class="seo-preview-output">
                                <h3>SEO Preview</h3>
                                <p><strong>Title:</strong> ${title}</p>
                                <div class="meta-description-preview"><strong>Meta Description:</strong> ${metaDescription}</div>
                                <div class="slug-preview"><strong>Slug:</strong> /${slug}</div>
                               </div>`;
            
            articleHTML += `<div class="generated-article-content"><h3>Generated Article Draft</h3>`;

            // --- Main Article H1 (using the generated title) ---
            articleHTML += `<h1>${title}</h1>`;

            // --- 4. Introduction (100-150 words) ---
            articleHTML += `<p class="introduction">This post dives deep into the topic of "${promptText || 'your specified subject'}". We will explore the key aspects of ${primaryKeywords || 'this area'}, including insights into ${secondaryKeywords || 'related concepts'}. Our goal is to provide a comprehensive overview to help you understand its importance and potential applications. ${generatePlaceholderText(80, primaryKeywords)}</p>`;
            articleHTML += `<p>${generatePlaceholderText(60, secondaryKeywords)}</p>`;

            // --- 5. Body ---
            articleHTML += `<h2>Understanding ${primaryKeywords || 'the Core Subject'} in Depth</h2>`;
            articleHTML += `<p>${generatePlaceholderText(100, primaryKeywords)}</p>`;
            articleHTML += `<p>${generatePlaceholderText(120)}</p>`;

            articleHTML += `<h3>Key Benefits of ${secondaryKeywords || primaryKeywords}</h3>`;
            articleHTML += `<ul>
                                <li>Benefit 1: ${generatePlaceholderText(10, secondaryKeywords)}.</li>
                                <li>Benefit 2: ${generatePlaceholderText(12)}.</li>
                                <li>Benefit 3: ${generatePlaceholderText(15, primaryKeywords)}.</li>
                            </ul>`;
            articleHTML += `<p>${generatePlaceholderText(80)}</p>`;

            articleHTML += `<h2>Exploring Applications of ${primaryKeywords}</h2>`;
            articleHTML += `<p>${generatePlaceholderText(100, secondaryKeywords)}</p>`;
            
            // --- 6. Image Optimization Placeholder ---
            articleHTML += `<div class="image-placeholder">
                                <h4>Image Placeholder & Optimization Tip</h4>
                                <p><strong>Visual Content Suggestion:</strong> Include a relevant, high-quality image here that visually represents ${primaryKeywords || 'the main topic'}.</p>
                                <p><strong>Alt Text Example:</strong> "A clear visual explaining ${primaryKeywords || 'the core concept discussed'}"</p>
                                <p><em>(Remember to use descriptive alt text for accessibility and SEO, and optimize image file sizes.)</em></p>
                            </div>`;
            
            articleHTML += `<p>${generatePlaceholderText(100)}</p>`;

            articleHTML += `<h3>Further Considerations for ${secondaryKeywords || 'Advanced Users'}</h3>`;
            articleHTML += `<p>${generatePlaceholderText(150, secondaryKeywords)}</p>`;

            // --- 7. Conclusion (approx 100 words) ---
            articleHTML += `<h2 class="conclusion-heading">Conclusion</h2>`;
            articleHTML += `<p class="conclusion">In summary, ${primaryKeywords || 'this topic'} offers a wealth of insights and opportunities. We've touched upon its fundamental aspects, key benefits, and potential applications, including how ${secondaryKeywords || 'related factors'} play a role. ${generatePlaceholderText(50, primaryKeywords)} We encourage you to share your thoughts, questions, or experiences in the comments below. Your engagement helps us all learn more!</p>`;
            
            articleHTML += `</div>`; // End .generated-article-content

            // Simulate a delay for "generation" then display
            articleOutputDiv.classList.remove('visible'); // Reset animation state

            setTimeout(() => {
                articleOutputDiv.innerHTML = articleHTML;
                // Timeout to allow DOM update before adding class for animation
                setTimeout(() => { 
                    articleOutputDiv.classList.add('visible');
                }, 50); 
            }, 1000); // 1 second delay for "generating" message
        });
    } else {
        console.error('Article form not found!');
    }

    // --- Intersection Observer for Scroll Animations ---
    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up-element'); // Use the slide-up animation
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    };

    const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll, .tool-card');
    elementsToAnimate.forEach(el => {
        scrollObserver.observe(el);
    });
    // --- End Intersection Observer ---


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

    // --- Plagiarism Checker (Placeholder) ---
    const plagiarismCheckBtn = document.getElementById('plagiarism-check-btn');
    const plagiarismResultDiv = document.getElementById('plagiarism-result');
    // const plagiarismTextInput = document.getElementById('plagiarism-text'); // Not strictly needed for placeholder logic

    if (plagiarismCheckBtn && plagiarismResultDiv) {
        plagiarismCheckBtn.addEventListener('click', (event) => {
            event.preventDefault(); // Good practice if it were in a form

            plagiarismResultDiv.innerHTML = `
                <h4>About Plagiarism Detection:</h4>
                <p><strong>How Real Plagiarism Checkers Work:</strong> Genuine plagiarism detection involves comparing submitted text against vast databases of web pages, academic papers, books, and other sources.</p>
                <p><strong>Complexity:</strong> This requires significant backend infrastructure, powerful algorithms, and access to these extensive databases.</p>
                <p><strong>Frontend Limitation:</strong> A feature like this cannot be fully implemented in a browser-only (frontend) application like this demo tool.</p>
                <p><strong>Tip:</strong> For reliable plagiarism checking, please use dedicated services online that have the necessary resources. This tool is for demonstration purposes only.</p>
            `;
            
            // Optional: Change button text
            // plagiarismCheckBtn.textContent = 'Information Displayed';
        });
    } else {
        console.error('Plagiarism Checker elements not found!');
    }
    // --- End Plagiarism Checker ---

    // --- SEO Audit Tool (Placeholder) ---
    const seoAuditBtn = document.getElementById('seo-audit-btn');
    const seoAuditResultDiv = document.getElementById('seo-audit-result');
    // const seoUrlInput = document.getElementById('seo-url-input'); // Not strictly needed for placeholder

    if (seoAuditBtn && seoAuditResultDiv) {
        seoAuditBtn.addEventListener('click', (event) => {
            event.preventDefault();

            seoAuditResultDiv.innerHTML = `
                <h4>Understanding SEO Audits:</h4>
                <p><strong>What is an SEO Audit?:</strong> An SEO audit is a process of evaluating a website's search engine friendliness. It covers various aspects to identify areas for improvement to increase organic visibility.</p>
                
                <p><strong>Key Elements Typically Checked (Examples):</strong></p>
                <ul class="info-list">
                    <li><strong>On-page SEO:</strong> Meta tags (title, description), header tags, keyword density, content quality, internal linking, image optimization.</li>
                    <li><strong>Off-page SEO:</strong> Backlink profile (quality and quantity of links from other sites).</li>
                    <li><strong>Technical SEO:</strong> Site speed, mobile-friendliness, site architecture, XML sitemap, robots.txt, crawlability, indexing status.</li>
                </ul>
                
                <p><strong>Complexity & Tools:</strong> Comprehensive SEO audits require specialized tools and often access to paid APIs or backend processing to gather and analyze all this data.</p>
                <p><strong>Frontend Limitation:</strong> This tool provides conceptual information. For a real audit, consider using dedicated online SEO audit services.</p>
            `;
        });
    } else {
        console.error('SEO Audit Tool elements not found!');
    }
    // --- End SEO Audit Tool ---

    // --- YouTube AI Tool (Placeholder) ---
    const youtubeAiBtn = document.getElementById('youtube-ai-btn');
    const youtubeAiResultDiv = document.getElementById('youtube-ai-result');
    // const youtubeUrlInput = document.getElementById('youtube-url-input'); // Not strictly needed

    if (youtubeAiBtn && youtubeAiResultDiv) {
        youtubeAiBtn.addEventListener('click', (event) => {
            event.preventDefault();

            youtubeAiResultDiv.innerHTML = `
                <h4>Understanding YouTube AI Analysis:</h4>
                <p><strong>What is YouTube AI Analysis?:</strong> AI can be used to analyze YouTube video content for various insights, such as understanding topics, sentiment, engagement drivers, or even generating summaries.</p>
                
                <p><strong>Potential AI Capabilities (Examples):</strong></p>
                <ul class="info-list">
                    <li><strong>Transcript Analysis:</strong> Processing video transcripts for keywords, topics, and sentiment.</li>
                    <li><strong>Content Summarization:</strong> Generating brief summaries or highlights.</li>
                    <li><strong>Comment Analysis:</strong> Analyzing comments for public sentiment and common questions.</li>
                    <li><strong>Trend Identification:</strong> Identifying trending topics or video styles (requires large-scale data analysis).</li>
                </ul>
                
                <p><strong>Complexity & Technology:</strong> These capabilities rely on advanced AI models (Natural Language Processing, Machine Learning) and significant computational resources, often via specialized APIs or backend systems.</p>
                <p><strong>Frontend Limitation:</strong> This tool is a conceptual placeholder. Real YouTube AI analysis tools are typically sophisticated services.</p>
            `;
        });
    } else {
        console.error('YouTube AI Tool elements not found!');
    }
    // --- End YouTube AI Tool ---

    // --- Keyword Research Tool (Placeholder) ---
    const keywordResearchBtn = document.getElementById('keyword-research-btn');
    const keywordResearchResultDiv = document.getElementById('keyword-research-result');
    // const keywordInput = document.getElementById('keyword-input'); // Not strictly needed for placeholder

    if (keywordResearchBtn && keywordResearchResultDiv) {
        keywordResearchBtn.addEventListener('click', (event) => {
            event.preventDefault();

            keywordResearchResultDiv.innerHTML = `
                <h4>Understanding Keyword Research:</h4>
                <p><strong>What is Keyword Research?:</strong> Keyword research is the process of finding and analyzing terms that people enter into search engines. The goal is to identify keywords that are relevant to your content and have good potential for attracting traffic.</p>
                
                <p><strong>Key Data Points in Keyword Research (Examples):</strong></p>
                <ul class="info-list">
                    <li><strong>Search Volume:</strong> The number of times a keyword is searched, usually per month.</li>
                    <li><strong>Keyword Difficulty:</strong> An estimate of how hard it is to rank for a keyword.</li>
                    <li><strong>Related Keywords:</strong> Other terms and phrases related to the seed keyword.</li>
                    <li><strong>Search Intent:</strong> Understanding what users are trying to accomplish with their search (e.g., find information, buy a product).</li>
                </ul>
                
                <p><strong>Complexity & Data Sources:</strong> Effective keyword research relies on access to large databases of search query data and sophisticated analytical tools. These are typically provided by specialized SEO platforms.</p>
                <p><strong>Frontend Limitation:</strong> This tool is a conceptual placeholder. For actual keyword research, professional SEO tools are recommended.</p>
            `;
        });
    } else {
        console.error('Keyword Research Tool elements not found!');
    }
    // --- End Keyword Research Tool ---

    // --- WordPad - Online Text Editor ---
    const wordpadTextarea = document.getElementById('wordpad-textarea');
    const wordpadStatsDiv = document.getElementById('wordpad-stats');
    const wordpadClearBtn = document.getElementById('wordpad-clear-btn');
    const wordpadCopyBtn = document.getElementById('wordpad-copy-btn');

    function updateWordpadStats() {
        if (!wordpadTextarea || !wordpadStatsDiv) return;

        const text = wordpadTextarea.value;
        const charCount = text.length;
        const wordCount = text.split(/\s+/).filter(Boolean).length;
        const lineCount = text ? text.split('\n').length : 0;

        wordpadStatsDiv.textContent = `Chars: ${charCount} | Words: ${wordCount} | Lines: ${lineCount}`;
    }

    if (wordpadTextarea) {
        wordpadTextarea.addEventListener('input', updateWordpadStats);
        // Initial stats update in case there's pre-filled text (though placeholder won't trigger this)
        updateWordpadStats(); 
    }

    if (wordpadClearBtn) {
        wordpadClearBtn.addEventListener('click', () => {
            if (wordpadTextarea) {
                wordpadTextarea.value = '';
                updateWordpadStats(); // Update stats after clearing
            }
        });
    }

    if (wordpadCopyBtn) {
        wordpadCopyBtn.addEventListener('click', () => {
            if (wordpadTextarea && wordpadTextarea.value) {
                navigator.clipboard.writeText(wordpadTextarea.value)
                    .then(() => {
                        wordpadCopyBtn.textContent = 'Copied!';
                        setTimeout(() => {
                            wordpadCopyBtn.textContent = 'Copy Text';
                        }, 1500);
                    })
                    .catch(err => {
                        console.error('Failed to copy text: ', err);
                        wordpadStatsDiv.textContent = 'Error: Could not copy text.'; // Show error in stats
                        setTimeout(() => {
                            updateWordpadStats(); // Revert stats div after a delay
                        }, 2000);
                    });
            } else {
                wordpadCopyBtn.textContent = 'Nothing to Copy';
                 setTimeout(() => {
                            wordpadCopyBtn.textContent = 'Copy Text';
                        }, 1500);
            }
        });
    }
    
    if (!wordpadTextarea || !wordpadStatsDiv || !wordpadClearBtn || !wordpadCopyBtn) {
        console.error('Some WordPad elements might be missing!');
    }
    // --- End WordPad - Online Text Editor ---

    // --- GST Calculator ---
    const gstAmountInput = document.getElementById('gst-amount');
    const gstRateInput = document.getElementById('gst-rate');
    const gstCalculateBtn = document.getElementById('gst-calculate-btn');
    const gstResultDiv = document.getElementById('gst-result');

    if (gstCalculateBtn) {
        gstCalculateBtn.addEventListener('click', () => {
            const amount = parseFloat(gstAmountInput.value);
            const rate = parseFloat(gstRateInput.value);

            if (isNaN(amount) || amount < 0 || isNaN(rate) || rate < 0 || rate > 100) {
                gstResultDiv.innerHTML = '<p class="error">Please enter valid positive numbers. Rate should be between 0 and 100.</p>';
                return;
            }

            const gstAmount = (amount * rate) / 100;
            const totalAmount = amount + gstAmount;

            // Format as currency or fixed decimal points
            const formatNumber = (num) => num.toFixed(2);

            gstResultDiv.innerHTML = `
                <p>Original Amount: <strong>${formatNumber(amount)}</strong></p>
                <p>GST Rate: <strong>${rate}%</strong></p>
                <hr class="tool-hr">
                <p>GST Amount: <strong>${formatNumber(gstAmount)}</strong></p>
                <p class="total-amount">Total Amount (incl. GST): <strong>${formatNumber(totalAmount)}</strong></p>
            `;
        });
    } else {
        console.error('GST Calculator elements not found!');
    }
    // --- End GST Calculator ---

    // --- Loan Calculator (EMI) ---
    const loanPrincipalInput = document.getElementById('loan-principal');
    const loanRateInput = document.getElementById('loan-rate');
    const loanTenureYearsInput = document.getElementById('loan-tenure-years');
    const loanCalculateBtn = document.getElementById('loan-calculate-btn');
    const loanResultDiv = document.getElementById('loan-result');

    if (loanCalculateBtn) {
        loanCalculateBtn.addEventListener('click', () => {
            const principal = parseFloat(loanPrincipalInput.value);
            const annualRate = parseFloat(loanRateInput.value);
            const tenureYears = parseFloat(loanTenureYearsInput.value);

            if (isNaN(principal) || principal <= 0 ||
                isNaN(annualRate) || annualRate < 0 || // Allow 0 rate
                isNaN(tenureYears) || tenureYears <= 0) {
                loanResultDiv.innerHTML = '<p class="error">Please enter valid positive numbers for all fields.</p>';
                return;
            }

            const monthlyRate = annualRate / (12 * 100);
            const tenureMonths = tenureYears * 12;

            let emi;
            if (monthlyRate === 0) {
                emi = principal / tenureMonths;
            } else {
                const powerTerm = Math.pow(1 + monthlyRate, tenureMonths);
                emi = (principal * monthlyRate * powerTerm) / (powerTerm - 1);
            }

            const totalAmountPayable = emi * tenureMonths;
            const totalInterestPayable = totalAmountPayable - principal;

            const formatCurrency = (num) => num.toFixed(2); // Using toFixed(2) for now, Intl.NumberFormat can be used too

            loanResultDiv.innerHTML = `
                <p>Monthly EMI: <strong>${formatCurrency(emi)}</strong></p>
                <hr class="tool-hr">
                <p>Total Interest Payable: <strong>${formatCurrency(totalInterestPayable)}</strong></p>
                <p class="total-amount">Total Amount Payable: <strong>${formatCurrency(totalAmountPayable)}</strong></p>
            `;
        });
    } else {
        console.error('Loan Calculator elements not found!');
    }
    // --- End Loan Calculator (EMI) ---

    // --- Discount Calculator ---
    const discountOriginalPriceInput = document.getElementById('discount-original-price');
    const discountPercentageInput = document.getElementById('discount-percentage-input');
    const discountCalculateBtn = document.getElementById('discount-calculate-btn');
    const discountResultDiv = document.getElementById('discount-result');

    if (discountCalculateBtn) {
        discountCalculateBtn.addEventListener('click', () => {
            const originalPrice = parseFloat(discountOriginalPriceInput.value);
            const discountPercentage = parseFloat(discountPercentageInput.value);

            if (isNaN(originalPrice) || originalPrice < 0 ||
                isNaN(discountPercentage) || discountPercentage < 0 || discountPercentage > 100) {
                discountResultDiv.innerHTML = '<p class="error">Please enter a valid original price and a discount percentage between 0 and 100.</p>';
                return;
            }

            const amountSaved = (originalPrice * discountPercentage) / 100;
            const finalPrice = originalPrice - amountSaved;

            const formatCurrency = (num) => num.toFixed(2);

            discountResultDiv.innerHTML = `
                <p>Original Price: <strong>${formatCurrency(originalPrice)}</strong></p>
                <p>Discount: <strong>${discountPercentage}%</strong></p>
                <hr class="tool-hr">
                <p>Amount Saved: <strong>${formatCurrency(amountSaved)}</strong></p>
                <p class="total-amount">Final Price: <strong>${formatCurrency(finalPrice)}</strong></p>
            `;
        });
    } else {
        console.error('Discount Calculator elements not found!');
    }
    // --- End Discount Calculator ---
});
