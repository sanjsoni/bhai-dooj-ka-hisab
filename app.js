(function () {
  'use strict';

  const state = {
    mode: 'behna',
    herName: 'Behna',
    hisName: 'Bhai',
    plannedAmount: null,
    currentQuestionIndex: 0,
    answers: [],
    calculatedResult: null
  };

  const QUESTIONS_BEHNA = [
    {
      title: "Kya tumhara bhai tumhara koi kaam karta hai?",
      options: [
        { text: "Haan, bina bole paani ka glass le aata hai (rarest species)", score: 1 },
        { text: "3 baar bolne ke baad 1 chhota mota kaam karta hai", score: 2 },
        { text: "Sirf tab karta hai jab usko mujhse koi setting karwani ho", score: 3 },
        { text: "Usko bolo toh bolta hai 'Tu meri naukar hai kya?' 🙄", score: 4 }
      ]
    },
    {
      title: "Tumne Mummy ke saamne bhai ko kitni baar bachaya?",
      options: [
        { text: "Kabhi nahi, main toh khud Mummy ko chugli karti hoon 😇", score: 1 },
        { text: "1-2 baar jab usne mujhe chocolate ki rishwat di thi", score: 2 },
        { text: "Hazaar baar! Meri wajah se woh abhi tak ghar mein reh raha hai", score: 3 },
        { text: "Infinite times! FBI agent ki tarah uske saare kaand chhipaye hain 🤫", score: 4 }
      ]
    },
    {
      title: "Bhai ne tumhari kitni chocolates/snacks chura ke khayi hain?",
      options: [
        { text: "Pooch ke leta hai aur share bhi karta hai pyara bhai", score: 1 },
        { text: "Aadhi dairy milk chori hui hai bas, chalta hai", score: 2 },
        { text: "Fridge mein empty wrapper chhod deta hai taaki dard zyada ho", score: 3 },
        { text: "Mera naam likha hua dabba bhi gayab kar diya! Dacoit hai pura 🍫", score: 4 }
      ]
    },
    {
      title: "Bhai ki salary/pocket money ka haal?",
      options: [
        { text: "Struggler (Mummy se ₹50 mangta hai petrol ke liye)", score: 1 },
        { text: "Theek-thaak (Weekend pe cafe chala jata hai aaram se)", score: 2 },
        { text: "Mast kamata hai (Swiggy Gourmet aur sneakers chal rahe hain)", score: 3 },
        { text: "Bhai toh Ambani hai (Roz delivery aati hai, crypto ki baatein karta hai) 🤑", score: 4 }
      ]
    },
    {
      title: "Bhai ne last birthday pe gift diya tha?",
      options: [
        { text: "Haan, exact jo maine wishlist mein daala tha!", score: 1 },
        { text: "Ek sasta sa headphone jo mostly khud hi use karta hai", score: 2 },
        { text: "Sirf 'HBD pagli' ka WhatsApp sticker bheja tha 12:05 pe", score: 3 },
        { text: "'Mera aashirwaad hi tumhara sabse bada gift hai' bol ke nikal gaya 💀", score: 4 }
      ]
    },
    {
      title: "Fights me kaun pehle sorry bolta hai?",
      options: [
        { text: "Woh khud 5 minute mein cute ban ke sorry bol deta hai", score: 1 },
        { text: "Mummy aake dono ko daant ke sulah karwati hain", score: 2 },
        { text: "Sorry nahi bolta, bas aake bolega 'kuch khaoogi?'", score: 3 },
        { text: "Ego itna bada hai ki agle janam mein bhi sorry nahi bolega! 🥊", score: 4 }
      ]
    },
    {
      title: "Bhai ne tumhare naam pe kitni baar bahane banaye?",
      options: [
        { text: "Kabhi nahi, shareef aur loyal bhai hai", score: 1 },
        { text: "'Behen ko coaching drop karne gaya tha' bolke dosto se mila", score: 2 },
        { text: "Late aane se leke paise kharchne tak, har cheez mein mera naam!", score: 3 },
        { text: "'Behen ki tabiyat kharab hai' bola jabki main mast reels dekh rahi thi! 🚨", score: 4 }
      ]
    }
  ];

  const QUESTIONS_BHAI = [
    {
      title: "Behna tumhare liye garma garm chai bnati h ya nhi?",
      options: [
        { text: "Haan, bina bole adrak wali kadak chai bana deti hai ❤️", score: 1 },
        { text: "Jab uska mood accha ho tabhi naseeb hoti hai", score: 2 },
        { text: "Bana toh deti hai par saath mein 10 taane muft deti hai", score: 3 },
        { text: "'Gas pe paani chadh gaya hai, khud jaake patti daal le' bolti hai ☕", score: 4 }
      ]
    },
    {
      title: "Behna ne kitni baar Papa se complaint kri hai?",
      options: [
        { text: "Zero times! She is my solid crime partner", score: 1 },
        { text: "Chhoti moti baaton pe threatening deti hai bas", score: 2 },
        { text: "Jab remote nahi diya tab seedha Papa ke paas FIR darj karwai", score: 3 },
        { text: "Full CBI chargesheet tayyar rehti hai uski har hafte! ⚖️", score: 4 }
      ]
    },
    {
      title: "Behna ki kitni chocolates/snacks chura ke khayi hain?",
      options: [
        { text: "Maine kabhi haath nahi lagaya, kasam se innocent hoon", score: 1 },
        { text: "Bas ek bite lene gaya tha... par poora piece khatam ho gaya", score: 2 },
        { text: "Chori karke bol diya 'chuhha kha gaya hoga shayad'", score: 3 },
        { text: "Wrapper fridge mein wapas rakh diya taaki suspense bane! Peak evil 😈", score: 4 }
      ]
    },
    {
      title: "Tumhari salary/pocket money ka haal?",
      options: [
        { text: "Struggler (Month end pe account mein ₹14.50 bachte hain)", score: 1 },
        { text: "Theek-thaak (EMI katne ke baad daal-roti chal rahi hai)", score: 2 },
        { text: "Mast kamata hoon (Weekend parties aur doston pe udaane ke paise hain)", score: 3 },
        { text: "Main toh Ambani hoon (Par behna ke saamne garib banne ki acting karta hoon) 🤑", score: 4 }
      ]
    },
    {
      title: "Last birthday pe behna ko gift diya tha?",
      options: [
        { text: "Haan bhai, proper branded gift aur treats bhi diye the", score: 1 },
        { text: "Zomato se cake aur pastry order kar di thi last minute pe", score: 2 },
        { text: "'Agle mahine pakka dunga' bola tha, tab se date extend ho rahi hai", score: 3 },
        { text: "12:01 AM pe Insta story laga ke so gaya, zero kharcha 🎂", score: 4 }
      ]
    },
    {
      title: "Fights me pehle sorry kaun bolta hai?",
      options: [
        { text: "Main hi bada dil dikha ke sorry bol deta hoon", score: 1 },
        { text: "Reels share karke baat shuru karne ki ninja technique lagata hoon", score: 2 },
        { text: "Jab tak bhookh na lage aur khana na mangna pade tab tak silent treatment!", score: 3 },
        { text: "Sorry meri dictionary mein nahi hai, chahe teesra vishwayuddh ho jaye! 🥊", score: 4 }
      ]
    },
    {
      title: "Behna ke naam pe kitni baar bahane banaye?",
      options: [
        { text: "Never. Saccha aur sanskari bhai hoon", score: 1 },
        { text: "'Behen ko station drop karne ja raha hoon' bolke dosto se mila", score: 2 },
        { text: "'Behen ka college project submit karwana hai' bolke weekend trip mar li", score: 3 },
        { text: "Mera poora existence behna ke jhoothe bahano ke sahare chal raha hai! 🏃‍♂️💨", score: 4 }
      ]
    }
  ];

  const LOADING_MSGS_BEHNA = [
    "Bhai ki purani chori ki list scan ho rahi hai...",
    "Zomato vs Shagun budget calculate kiya ja raha hai...",
    "Bhai ke jhoothe bahano ka forensic audit chal raha hai...",
    "Bhai ke wallet pe surgical strike ki tayyari...",
    "Final Shagun rashi sanction ho rahi hai..."
  ];

  const LOADING_MSGS_BHAI = [
    "Tumhari conscience se consult kiya ja raha hai...",
    "Behna ki purani yaadein aur balidaan load ho rahe hain...",
    "Tumhare bank account ka dard measure ho raha hai...",
    "Mummy ke taano ka risk assessment jari hai...",
    "Bhagwan se tumhare liye forgiveness calculate ho rahi hai..."
  ];

  const TIERS = {
    low: {
      name: "Kanjoos Bhai",
      amounts: [51, 101, 151, 201, 251],
      roastsBehna: [
        "Isse zyada toh auto wale bhaiya chutta chhod dete hain. Par chalo, bhai ka dil ₹50 ka hi sahi.",
        "Bhai ne yeh shagun dene se pehle 4 baar calculator khol ke apna bank balance dekha hoga.",
        "Itne mein toh ek plate momos aur extra mayo bhi mushkil se aayegi. Bhai ka hisaab audit karne ki zaroorat hai!",
        "Yeh wahi bhai hai jo doston ke cafe bill pe ₹2000 bina soche de deta hai, par behen ke time garibi ka rona rota hai.",
        "Itna kam shagun? Bhai ko bolo agle janam mein shagun installment mein transfer kare."
      ],
      roastsBhai: [
        "Bhai tumhari conscience ne tumhara pol khol diya. Itna shagun toh rickshaw wala bhi tip mein expect nahi karta.",
        "Doston ke saath pub mein 'bhai tera bill dega' bolte ho, aur behna ke time ₹101 ka lifafa dhoondte ho? Sharam karo!",
        "Behna agar yeh amount dekh legi toh agle 1 saal tak ghar mein tumhe paani bhi nahi milega.",
        "Kanjoosi ki bhi limit hoti hai bhai! Kam se kam ek chocolate ka dabba toh add kar dete.",
        "Tumhare account mein paisa hai ya nahi, behna ko toh full vasooli chahiye. Yeh hisaab reject ho jayega!"
      ]
    },
    medium: {
      name: "Theek-thaak Bhai",
      amounts: [501, 751, 1100],
      roastsBehna: [
        "Average score, average shagun! Na zyada khush kar sakta hai na behen ro sakti hai. Safe game khel raha hai bhai.",
        "Mummy ke taano se bachne ke liye exact calculated amount nikala hai. Smart, par pakda gaya!",
        "Theek-thaak shagun mila hai, par snacks chori karne ka tax abhi bhi baaki hai.",
        "Bhai soch raha hoga ki usne ehsaan kar diya, par isse tumhara ek online order bhi poora nahi aayega.",
        "Yeh shagun nahi, bhai ka guilt-settlement token hai. Agli ladai tak kaam chal jayega."
      ],
      roastsBhai: [
        "Tumne safe exit li hai. Na Mummy gusse mein aayengi, na behna treat mangegi. Decent brother energy.",
        "Chai peene ka aur snacks churane ka chhota sa fine lag gaya hai. Pay karo aur shanti se jiyo.",
        "Behna bolegi 'bas itna hi?', tum bolna 'inflation chal raha hai pagli'. Baat sambhal sakti hai.",
        "Theek-thaak score hai, par agar behna ne purana secret khol diya toh yeh amount 5x ho sakta hai.",
        "Yeh amount safe hai, par agle hafte behna se koi extra favour expect mat karna."
      ]
    },
    high: {
      name: "Shaandar Bhai",
      amounts: [2100, 3100, 5100],
      roastsBehna: [
        "Wah! Bhai ke andar ka sanskari beta aur pyara bhai aaj jaag gaya hai. Screenshot le lo, yeh chamatkaar roz nahi hota!",
        "Lagta hai bhai ki appraisal ho gayi hai ya phir Mummy ne Papa ke saamne daant lagayi hai. Vasooli safal rahi!",
        "Itna shagun dekh ke lag raha hai bhai ne koi bada kaand kiya hai jo abhi tak reveal nahi hua hai. Pata lagao!",
        "Shabash! Bhai ne saabit kar diya ki behen ke nakhre jhelna mehenga zaroor hai, par affordable hai.",
        "Behna jeet gayi! Bhai ka wallet officially empty, par behen ki shopping cart fully loaded!"
      ],
      roastsBhai: [
        "Honest confession ka fal mehenga pad gaya bhai! Par behna khush ho jayegi, Mummy gale laga lengi.",
        "Tumne maana ki tumne kaand kiye hain, aur ab uska penalty bharne ka waqt aa gaya hai. Shaandar bhai!",
        "Pocket pe jhatka zaroor lagega, par behna ki smile aur WhatsApp story pe tumhari taareef guaranteed hai.",
        "Bhai banne ka swaad hi alag hai jab wallet khali ho aur behna bolegi 'mera bhai best hai'!",
        "GPay ready rakho. Yeh amount dekh ke behna seedha QR code bhejegi."
      ]
    },
    max: {
      name: "Legend Bhai",
      amounts: [11000, 21000, 51000],
      roastsBehna: [
        "KBC ke hotseat pe baithe ho kya?! Bhai ne toh kidney bechne ki naubat la di! Respect legend bhai!",
        "Ambani ko competition dene nikla hai bhai! Jaldi se GPay / cash transfer karwa lo isse pehle nasha utar jaye!",
        "Itna shagun mila hai ki ab agle 5 saal tak bhai tumse paani ka glass mangne ka haqdaar ban gaya hai.",
        "Bhai ne saare paap ek hi jhatke mein dhone ka faisla kiya hai. Ganga snaan se bhi mehenga hisaab nikla yeh!",
        "Yeh Bhai of the Decade award ka haqdaar hai! (Ya phir isko tumhara koi bohot bada secret pata chalne ka darr hai)."
      ],
      roastsBhai: [
        "Bhai tumhare paap itne bhari the ki hisaab seedha lakhon mein pahunch gaya! Par dil bohot bada hai tumhara.",
        "Mummy proud, behna super proud, aur tumhara bank manager sadme mein! True Legend Bhai!",
        "Tumne jo secret dabaye hain na, unka compensation yahi banta hai. Chupchap transfer karo aur hero bano.",
        "Ambani mode activated! Behna ko abhi screenshot bhejo aur bolo 'Khoon pasine ki kamai tumpe kurbaan'.",
        "Legendary bhai status unlocked! Agle 1 saal tak behna tumhe 'bhaiya ji' bol ke bula sakti hai."
      ]
    }
  };

  const MANDATORY_EXTRAS = [
    "+ 3 pending apologies aur 1 chocolate (Dairy Milk Silk)",
    "+ ek naya fast charger (original wala, jo chori kiya tha wapas)",
    "+ agle 6 mahine tak bina nakhre TV remote ka supreme control",
    "+ agle 1 saal tak late night Maggi bana ke dene ka lifetime bond",
    "+ Mummy ke saamne agle 5 kaand mein full alibi guarantee",
    "+ Swiggy/Zomato ka OTP bina sawal pooche share karne ka wada",
    "+ Doston ke saamne behen ki tareef karne ka legal affidavit"
  ];

  const screens = {
    landing: document.getElementById('screenLanding'),
    setup: document.getElementById('screenSetup'),
    question: document.getElementById('screenQuestion'),
    loading: document.getElementById('screenLoading'),
    result: document.getElementById('screenResult')
  };

  const btnModeBehna = document.getElementById('btnModeBehna');
  const btnModeBhai = document.getElementById('btnModeBhai');
  const btnBackToLanding = document.getElementById('btnBackToLanding');
  const setupHeaderBadge = document.getElementById('setupHeaderBadge');
  const setupTitle = document.getElementById('setupTitle');
  const setupSubtitle = document.getElementById('setupSubtitle');
  const inputHerName = document.getElementById('inputHerName');
  const inputHisName = document.getElementById('inputHisName');
  const bhaiPlannedSection = document.getElementById('bhaiPlannedSection');
  const inputPlannedAmount = document.getElementById('inputPlannedAmount');
  const amountChips = document.querySelectorAll('.amount-chip');
  const btnStartQuestions = document.getElementById('btnStartQuestions');

  const questionStepText = document.getElementById('questionStepText');
  const questionModeBadge = document.getElementById('questionModeBadge');
  const progressBarFill = document.getElementById('progressBarFill');
  const questionTitle = document.getElementById('questionTitle');
  const optionsContainer = document.getElementById('optionsContainer');
  const btnPrevQuestion = document.getElementById('btnPrevQuestion');

  const loadingDynamicMsg = document.getElementById('loadingDynamicMsg');

  const resultModePill = document.getElementById('resultModePill');
  const resultTierBadge = document.getElementById('resultTierBadge');
  const resultHeadline = document.getElementById('resultHeadline');
  const resultAmountDisplay = document.getElementById('resultAmountDisplay');
  const lifafaHerName = document.getElementById('lifafaHerName');
  const lifafaHisName = document.getElementById('lifafaHisName');
  const lifafaAmount = document.getElementById('lifafaAmount');
  const stampSerial = document.getElementById('stampSerial');
  const rubberStamp = document.getElementById('rubberStamp');
  const bhaiComparisonBox = document.getElementById('bhaiComparisonBox');
  const comparisonText = document.getElementById('comparisonText');
  const resultRoastText = document.getElementById('resultRoastText');
  const resultExtrasText = document.getElementById('resultExtrasText');
  const btnWhatsAppShare = document.getElementById('btnWhatsAppShare');
  const btnWhatsAppText = document.getElementById('btnWhatsAppText');
  const btnDownloadCard = document.getElementById('btnDownloadCard');
  const btnShareNative = document.getElementById('btnShareNative');
  const btnRestartApp = document.getElementById('btnRestartApp');
  const toastContainer = document.getElementById('toastContainer');
  const storyCardCanvas = document.getElementById('storyCardCanvas');

  function showScreen(screenKey) {
    Object.keys(screens).forEach(key => {
      if (key === screenKey) {
        screens[key].classList.add('screen-active');
      } else {
        screens[key].classList.remove('screen-active');
      }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function showToast(message) {
    if (!toastContainer) return;
    toastContainer.textContent = message;
    toastContainer.classList.add('toast-visible');
    setTimeout(() => {
      toastContainer.classList.remove('toast-visible');
    }, 2800);
  }

  function setMode(mode) {
    state.mode = mode;
    state.answers = [];
    state.currentQuestionIndex = 0;

    if (mode === 'behna') {
      setupHeaderBadge.textContent = "🌸 Behna Mode";
      setupHeaderBadge.className = "tag-pill";
      setupTitle.textContent = "Pehchaan Patra Bharo";
      setupSubtitle.textContent = "Bhai ke naam ka shagun invoice banne wala hai!";
      bhaiPlannedSection.classList.add('hidden');
    } else {
      setupHeaderBadge.textContent = "🔥 Bhai Mode";
      setupHeaderBadge.className = "tag-pill tag-pill-gold";
      setupTitle.textContent = "Bhai Confession Form";
      setupSubtitle.textContent = "Apne paap confess karo taaki official audit shuru ho!";
      bhaiPlannedSection.classList.remove('hidden');
    }

    showScreen('setup');
  }

  btnModeBehna.addEventListener('click', () => setMode('behna'));
  btnModeBhai.addEventListener('click', () => setMode('bhai'));

  btnBackToLanding.addEventListener('click', () => {
    showScreen('landing');
  });

  amountChips.forEach(chip => {
    chip.addEventListener('click', () => {
      amountChips.forEach(c => c.classList.remove('chip-selected'));
      chip.classList.add('chip-selected');
      const val = chip.getAttribute('data-val');
      inputPlannedAmount.value = val;
    });
  });

  inputPlannedAmount.addEventListener('input', () => {
    amountChips.forEach(c => c.classList.remove('chip-selected'));
  });

  btnStartQuestions.addEventListener('click', () => {
    const herVal = inputHerName.value.trim();
    const hisVal = inputHisName.value.trim();

    state.herName = herVal ? herVal : 'Behna';
    state.hisName = hisVal ? hisVal : 'Bhai';

    if (state.mode === 'bhai') {
      const planned = parseInt(inputPlannedAmount.value, 10);
      state.plannedAmount = (!isNaN(planned) && planned > 0) ? planned : null;
    } else {
      state.plannedAmount = null;
    }

    state.currentQuestionIndex = 0;
    state.answers = [];
    renderQuestion();
    showScreen('question');
  });

  function getActiveQuestions() {
    return state.mode === 'behna' ? QUESTIONS_BEHNA : QUESTIONS_BHAI;
  }

  function renderQuestion() {
    const questions = getActiveQuestions();
    const qIndex = state.currentQuestionIndex;
    const q = questions[qIndex];

    const totalQ = questions.length;
    questionStepText.textContent = `Sawaal ${qIndex + 1} / ${totalQ}`;
    questionModeBadge.textContent = state.mode === 'behna' ? '🌸 Behna Mode' : '🔥 Bhai Mode';
    
    const pct = ((qIndex + 1) / totalQ) * 100;
    progressBarFill.style.width = `${pct}%`;

    questionTitle.textContent = q.title;

    optionsContainer.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];

    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'option-btn';
      btn.setAttribute('role', 'radio');
      btn.setAttribute('aria-checked', state.answers[qIndex] === opt.score ? 'true' : 'false');

      if (state.answers[qIndex] === opt.score) {
        btn.classList.add('selected');
      }

      btn.innerHTML = `
        <span class="option-key">${letters[idx]}</span>
        <span class="option-label">${opt.text}</span>
      `;

      btn.addEventListener('click', () => {
        handleOptionSelect(opt.score);
      });

      optionsContainer.appendChild(btn);
    });

    btnPrevQuestion.style.visibility = qIndex === 0 ? 'hidden' : 'visible';
  }

  function handleOptionSelect(score) {
    const qIndex = state.currentQuestionIndex;
    state.answers[qIndex] = score;

    const questions = getActiveQuestions();
    if (qIndex + 1 < questions.length) {
      state.currentQuestionIndex++;
      setTimeout(() => {
        renderQuestion();
      }, 150);
    } else {
      triggerLoadingSequence();
    }
  }

  btnPrevQuestion.addEventListener('click', () => {
    if (state.currentQuestionIndex > 0) {
      state.currentQuestionIndex--;
      renderQuestion();
    }
  });

  function triggerLoadingSequence() {
    showScreen('loading');

    const messages = state.mode === 'behna' ? LOADING_MSGS_BEHNA : LOADING_MSGS_BHAI;
    let msgIndex = 0;
    loadingDynamicMsg.textContent = messages[msgIndex];

    const interval = setInterval(() => {
      msgIndex++;
      if (msgIndex < messages.length) {
        loadingDynamicMsg.textContent = messages[msgIndex];
      }
    }, 450);

    setTimeout(() => {
      clearInterval(interval);
      calculateAndShowResult();
    }, 2200);
  }

  function calculateAndShowResult() {
    const totalScore = state.answers.reduce((acc, curr) => acc + (curr || 2), 0);

    let tierKey = 'medium';
    if (totalScore <= 11) {
      tierKey = 'low';
    } else if (totalScore <= 17) {
      tierKey = 'medium';
    } else if (totalScore <= 23) {
      tierKey = 'high';
    } else {
      tierKey = 'max';
    }

    const tierInfo = TIERS[tierKey];
    const amountsPool = tierInfo.amounts;
    const finalAmount = amountsPool[Math.floor(Math.random() * amountsPool.length)];

    const roasts = state.mode === 'behna' ? tierInfo.roastsBehna : tierInfo.roastsBhai;
    const roast = roasts[Math.floor(Math.random() * roasts.length)];
    const extra = MANDATORY_EXTRAS[Math.floor(Math.random() * MANDATORY_EXTRAS.length)];

    let comparison = null;
    if (state.mode === 'bhai' && state.plannedAmount !== null) {
      const planned = state.plannedAmount;
      const official = finalAmount;
      if (planned < official * 0.65) {
        comparison = {
          type: 'much_lower',
          badge: 'Pakde Gaye! 🚨',
          text: `Tum ₹${planned.toLocaleString('en-IN')} dene wale the. Hisaab ₹${official.toLocaleString('en-IN')} bol raha hai! ${state.herName} ko pata chal gaya toh Diwali ki mithai bhi gale mein atak jayegi... chupchap badha do!`
        };
      } else if (planned > official * 1.25) {
        comparison = {
          type: 'higher',
          badge: 'Maha Daani 👑',
          text: `Tum ₹${planned.toLocaleString('en-IN')} dene wale the jabki hisaab ₹${official.toLocaleString('en-IN')} tha! Tum already maha-generous ho. ${state.herName} ko lucky feel karna chahiye (par screenshot mat bhejna warna aadat bigad jayegi)!`
        };
      } else {
        comparison = {
          type: 'close',
          badge: 'Sahi Plan 🌟',
          text: `Tum ₹${planned.toLocaleString('en-IN')} dene wale the aur hisaab ₹${official.toLocaleString('en-IN')} aaya. Tumhara plan bilkul sahi hai, bhai. Mummy proud, behna khush!`
        };
      }
    }

    state.calculatedResult = {
      score: totalScore,
      tierKey: tierKey,
      tierName: tierInfo.name,
      amount: finalAmount,
      roast: roast,
      extra: extra,
      comparison: comparison
    };

    displayResultUI();
    showScreen('result');
    triggerConfetti();
  }

  function displayResultUI() {
    const res = state.calculatedResult;
    const behna = state.herName;
    const bhai = state.hisName;

    if (state.mode === 'behna') {
      resultModePill.textContent = "🌸 Behna Recovery Order";
      resultHeadline.textContent = `${bhai} owes ${behna}`;
    } else {
      resultModePill.textContent = "🧾 Bhai Confession Receipt";
      resultHeadline.textContent = `Official hisaab ke hisaab se, ${bhai} ko ${behna} ko dena chahiye:`;
    }

    resultTierBadge.textContent = res.tierName;

    animateCountUp(res.amount);

    if (lifafaHerName) lifafaHerName.textContent = behna;
    if (lifafaHisName) lifafaHisName.textContent = bhai;
    if (lifafaAmount) lifafaAmount.textContent = `₹${res.amount.toLocaleString('en-IN')}`;
    if (stampSerial) stampSerial.textContent = `NO. BD-${Math.floor(1000 + Math.random() * 9000)}-SHAGUN`;

    if (rubberStamp) {
      rubberStamp.classList.remove('animate-stamp');
      void rubberStamp.offsetWidth;
      rubberStamp.classList.add('animate-stamp');
    }

    if (res.comparison) {
      bhaiComparisonBox.classList.remove('hidden');
      const badgeElem = document.getElementById('comparisonBadge');
      if (badgeElem) badgeElem.textContent = res.comparison.badge;
      comparisonText.textContent = res.comparison.text;
    } else {
      bhaiComparisonBox.classList.add('hidden');
    }

    resultRoastText.textContent = `"${res.roast}"`;
    resultExtrasText.textContent = res.extra;

    setupWhatsAppShare(res);
  }

  function animateCountUp(targetAmount) {
    const duration = 1200;
    const startTime = performance.now();
    const startVal = 0;

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(startVal + (targetAmount - startVal) * easeProgress);

      resultAmountDisplay.textContent = currentVal.toLocaleString('en-IN');

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        resultAmountDisplay.textContent = targetAmount.toLocaleString('en-IN');
      }
    }

    requestAnimationFrame(update);
  }

  function setupWhatsAppShare(res) {
    const behna = state.herName;
    const bhai = state.hisName;
    const amountStr = `₹${res.amount.toLocaleString('en-IN')}`;
    const siteUrl = window.location.href.split('?')[0];

    let message = "";
    if (state.mode === 'behna') {
      btnWhatsAppText.textContent = `Bhai (${bhai}) ko Bhejo 📲`;
      message = `Sun ${bhai}! 🪔\nMaine Bhai Dooj Ka Hisaab nikala hai. Saare kaand jodne ke baad tu mujhe official shagun ${amountStr} (${res.tierName}) owe karta hai! 💸\n\n"${res.roast}"\n\nJaldi GPay kar warna Mummy ko saare raaz pata chal jayenge! 🤫\nApna hisaab yahan check kar: ${siteUrl}`;
    } else {
      btnWhatsAppText.textContent = `Behna (${behna}) ko Bhejo 📲`;
      message = `Dearest ${behna}! 🪔\nMaine 'Bhai Dooj Ka Hisaab' pe honesty ke saath confession kiya hai... Official audit ke hisaab se mujhe tumhe ${amountStr} (${res.tierName}) shagun dena chahiye 😅\n\n"${res.roast}"\n\nVerdict: Main shagun tayyar rakhta hoon!\nTum bhi check karo: ${siteUrl}`;
    }

    const encoded = encodeURIComponent(message);
    btnWhatsAppShare.href = `https://api.whatsapp.com/send?text=${encoded}`;
  }

  btnShareNative.addEventListener('click', async () => {
    const res = state.calculatedResult;
    const shareData = {
      title: 'Bhai Dooj Ka Hisaab 🪔',
      text: `${state.hisName} owes ${state.herName} ₹${res.amount.toLocaleString('en-IN')} (${res.tierName})! Apna shagun hisaab yahan nikalo:`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== 'AbortError') {
          copyLinkToClipboard();
        }
      }
    } else {
      copyLinkToClipboard();
    }
  });

  function copyLinkToClipboard() {
    const url = window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(() => {
        showToast("Link copy ho gaya! WhatsApp pe doston ko bhejo 🚀");
      }).catch(() => {
        showToast("Link share nahi ho paya.");
      });
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = url;
      textArea.style.position = "fixed";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        showToast("Link copy ho gaya! 🚀");
      } catch (e) {
        showToast("Link copy failed.");
      }
      document.body.removeChild(textArea);
    }
  }

  btnRestartApp.addEventListener('click', () => {
    state.currentQuestionIndex = 0;
    state.answers = [];
    state.calculatedResult = null;
    showScreen('landing');
  });

  btnDownloadCard.addEventListener('click', () => {
    generateAndDownloadStoryCard();
  });

  function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    let curY = y;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, curY);
        line = words[n] + ' ';
        curY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, curY);
    return curY + lineHeight;
  }

  function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    if (fill) ctx.fill();
    if (stroke) ctx.stroke();
  }

  function generateAndDownloadStoryCard() {
    if (!state.calculatedResult) return;
    const res = state.calculatedResult;
    const canvas = storyCardCanvas;
    const ctx = canvas.getContext('2d');

    const W = 1080;
    const H = 1920;
    canvas.width = W;
    canvas.height = H;

    const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
    bgGrad.addColorStop(0, '#380612');
    bgGrad.addColorStop(0.3, '#1c0309');
    bgGrad.addColorStop(0.7, '#120206');
    bgGrad.addColorStop(1, '#2c050e');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    const topGlow = ctx.createRadialGradient(W / 2, 280, 50, W / 2, 280, 550);
    topGlow.addColorStop(0, 'rgba(245, 158, 11, 0.28)');
    topGlow.addColorStop(0.6, 'rgba(220, 38, 38, 0.12)');
    topGlow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = topGlow;
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 6;
    roundRect(ctx, 40, 40, W - 80, H - 80, 36, false, true);

    ctx.strokeStyle = 'rgba(254, 240, 138, 0.4)';
    ctx.lineWidth = 2;
    ctx.setLineDash([12, 10]);
    roundRect(ctx, 60, 60, W - 120, H - 120, 26, false, true);
    ctx.setLineDash([]);

    ctx.font = '48px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🪔', 90, 90);
    ctx.fillText('🪔', W - 90, 90);
    ctx.fillText('🪔', 90, H - 90);
    ctx.fillText('🪔', W - 90, H - 90);

    ctx.fillStyle = 'rgba(245, 158, 11, 0.2)';
    roundRect(ctx, W / 2 - 250, 140, 500, 54, 27, true, false);
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    roundRect(ctx, W / 2 - 250, 140, 500, 54, 27, false, true);

    ctx.font = 'bold 24px Outfit, sans-serif';
    ctx.fillStyle = '#fef08a';
    ctx.textAlign = 'center';
    const headerTitle = state.mode === 'behna'
      ? '✨ OFFICIAL SHAGUN RECOVERY BILL ✨'
      : '✨ OFFICIAL CONFESSION & PENALTY RECEIPT ✨';
    ctx.fillText(headerTitle, W / 2, 168);

    ctx.font = 'bold 64px Rozha One, serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Bhai Dooj Ka Hisaab', W / 2, 255);

    ctx.font = '500 28px Outfit, sans-serif';
    ctx.fillStyle = '#fcd34d';
    const subDept = state.mode === 'behna'
      ? 'Sister Council • Shagun Vasooli Audit'
      : 'Confession Cell • Conscience Clearance Receipt';
    ctx.fillText(subDept, W / 2, 305);

    ctx.fillStyle = 'rgba(20, 3, 7, 0.85)';
    roundRect(ctx, 110, 355, W - 220, 130, 24, true, false);
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.35)';
    ctx.lineWidth = 2;
    roundRect(ctx, 110, 355, W - 220, 130, 24, false, true);

    ctx.textAlign = 'left';
    ctx.font = 'bold 24px Outfit, sans-serif';
    ctx.fillStyle = '#fca5a5';
    ctx.fillText('ISSUED BY:', 140, 400);
    ctx.fillText('DEFECTIVE BHAI:', 580, 400);

    ctx.font = '800 34px Outfit, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`🌸 ${state.herName}`, 140, 445);
    ctx.fillText(`🔥 ${state.hisName}`, 580, 445);

    const lifafaGrad = ctx.createLinearGradient(110, 520, W - 110, 940);
    lifafaGrad.addColorStop(0, '#880820');
    lifafaGrad.addColorStop(1, '#4a0815');
    ctx.fillStyle = lifafaGrad;
    roundRect(ctx, 110, 520, W - 220, 420, 32, true, false);

    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 4;
    roundRect(ctx, 110, 520, W - 220, 420, 32, false, true);

    ctx.textAlign = 'center';
    ctx.font = 'bold 26px Outfit, sans-serif';
    ctx.fillStyle = '#fef08a';
    ctx.fillText('TOTAL OFFICIAL SHAGUN DUE', W / 2, 575);

    ctx.font = '900 115px Outfit, sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`₹${res.amount.toLocaleString('en-IN')}`, W / 2, 700);

    ctx.fillStyle = '#f59e0b';
    roundRect(ctx, W / 2 - 200, 750, 400, 60, 30, true, false);
    ctx.font = 'bold 30px Outfit, sans-serif';
    ctx.fillStyle = '#120307';
    ctx.fillText(`⭐ ${res.tierName} ⭐`, W / 2, 792);

    ctx.font = '600 24px Outfit, sans-serif';
    ctx.fillStyle = '#fed7aa';
    ctx.fillText('100% Shubh Shagun Verified • Non-Refundable', W / 2, 865);

    ctx.save();
    ctx.translate(W - 250, 580);
    ctx.rotate(-0.16);
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3.5;
    ctx.setLineDash([8, 6]);
    roundRect(ctx, -145, -50, 290, 100, 14, false, true);
    ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(220, 38, 38, 0.25)';
    roundRect(ctx, -145, -50, 290, 100, 14, true, false);

    ctx.textAlign = 'center';
    ctx.font = 'bold 15px Outfit, sans-serif';
    ctx.fillStyle = '#fca5a5';
    ctx.fillText('★ ★ ★', 0, -25);

    ctx.font = 'bold 26px Rozha One, serif';
    ctx.fillStyle = '#ff4d4d';
    ctx.fillText('BEHNA KA SHAGUN', 0, 4);

    ctx.font = 'bold 13px Outfit, sans-serif';
    ctx.fillStyle = '#fca5a5';
    ctx.fillText('OFFICIALLY SANCTIONED', 0, 28);
    ctx.restore();

    let nextY = 980;

    if (res.comparison) {
      ctx.fillStyle = 'rgba(245, 158, 11, 0.14)';
      roundRect(ctx, 110, nextY, W - 220, 160, 20, true, false);
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      roundRect(ctx, 110, nextY, W - 220, 160, 20, false, true);

      ctx.textAlign = 'left';
      ctx.font = 'bold 22px Outfit, sans-serif';
      ctx.fillStyle = '#fef08a';
      ctx.fillText(`⚖️ ${res.comparison.badge}`, 140, nextY + 40);

      ctx.font = '500 24px Outfit, sans-serif';
      ctx.fillStyle = '#ffffff';
      wrapText(ctx, res.comparison.text, 140, nextY + 78, W - 280, 32);

      nextY += 190;
    }

    ctx.fillStyle = 'rgba(20, 3, 7, 0.9)';
    roundRect(ctx, 110, nextY, W - 220, 250, 24, true, false);
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.5)';
    ctx.lineWidth = 2;
    roundRect(ctx, 110, nextY, W - 220, 250, 24, false, true);

    ctx.textAlign = 'left';
    ctx.font = 'bold 24px Outfit, sans-serif';
    ctx.fillStyle = '#f87171';
    ctx.fillText('🔥 OFFICIAL ROAST VERDICT:', 140, nextY + 45);

    ctx.font = 'italic 500 28px Outfit, sans-serif';
    ctx.fillStyle = '#fffbeb';
    wrapText(ctx, `"${res.roast}"`, 140, nextY + 95, W - 280, 40);

    nextY += 280;

    ctx.fillStyle = 'rgba(245, 158, 11, 0.1)';
    roundRect(ctx, 110, nextY, W - 220, 130, 20, true, false);
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.3)';
    ctx.lineWidth = 2;
    roundRect(ctx, 110, nextY, W - 220, 130, 20, false, true);

    ctx.textAlign = 'left';
    ctx.font = 'bold 22px Outfit, sans-serif';
    ctx.fillStyle = '#fcd34d';
    ctx.fillText('🎁 MANDATORY EXTRAS:', 140, nextY + 42);

    ctx.font = 'bold 25px Outfit, sans-serif';
    ctx.fillStyle = '#fef08a';
    wrapText(ctx, res.extra, 140, nextY + 84, W - 280, 34);

    ctx.save();
    ctx.translate(W - 240, H - 320);
    ctx.rotate(-0.14);
    ctx.strokeStyle = '#dc2626';
    ctx.lineWidth = 4;
    roundRect(ctx, -100, -45, 200, 90, 12, false, true);
    ctx.fillStyle = 'rgba(220, 38, 38, 0.15)';
    roundRect(ctx, -100, -45, 200, 90, 12, true, false);
    ctx.textAlign = 'center';
    ctx.font = 'bold 20px Outfit, sans-serif';
    ctx.fillStyle = '#ef4444';
    ctx.fillText('APPROVED', 0, -12);
    ctx.fillText('VASOOLI MANDATE', 0, 18);
    ctx.restore();

    ctx.textAlign = 'center';
    ctx.font = 'bold 26px Outfit, sans-serif';
    ctx.fillStyle = '#fcd34d';
    ctx.fillText('Calculate yours at: shagundedo.vercel.app', W / 2, H - 150);

    ctx.font = '500 22px Outfit, sans-serif';
    ctx.fillStyle = 'rgba(254, 215, 170, 0.7)';
    ctx.fillText('Made with ❤️ by Sanjay • Share on Instagram Story', W / 2, H - 110);

    try {
      const dataUrl = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `bhai-dooj-hisaab-${state.hisName.toLowerCase()}.png`;
      downloadLink.href = dataUrl;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      showToast("Story card download ho gaya! 📸");
    } catch (err) {
      showToast("Card generate karne mein issue aaya.");
    }
  }

  function triggerConfetti() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#f59e0b', '#dc2626', '#fef08a', '#fbbf24', '#ffffff', '#ea580c'];
    const particleCount = 75;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 200,
        y: canvas.height * 0.4,
        vx: (Math.random() - 0.5) * 16,
        vy: -Math.random() * 14 - 4,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        alpha: 1,
        gravity: 0.4
      });
    }

    let animationFrameId;
    const startTime = performance.now();

    function renderConfetti(currentTime) {
      const elapsed = currentTime - startTime;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let activeCount = 0;
      particles.forEach(p => {
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.alpha -= 0.008;

        if (p.alpha > 0 && p.y < canvas.height) {
          activeCount++;
          ctx.save();
          ctx.globalAlpha = Math.max(p.alpha, 0);
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
          ctx.restore();
        }
      });

      if (activeCount > 0 && elapsed < 3500) {
        animationFrameId = requestAnimationFrame(renderConfetti);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animationFrameId);
      }
    }

    requestAnimationFrame(renderConfetti);
  }

  document.addEventListener('keydown', (e) => {
    if (screens.question.classList.contains('screen-active')) {
      const keyMap = { '1': 0, '2': 1, '3': 2, '4': 3, 'a': 0, 'b': 1, 'c': 2, 'd': 3 };
      const selectedIdx = keyMap[e.key.toLowerCase()];
      if (selectedIdx !== undefined) {
        const btns = optionsContainer.querySelectorAll('.option-btn');
        if (btns[selectedIdx]) {
          btns[selectedIdx].click();
        }
      }
    }
  });

})();
