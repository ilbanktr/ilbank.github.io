const users = {
    "amo": "123",
    "combat": "123456",
    "kullanici1": "k1000"
};

const balances = {
    "amo": 1000,
    "combat": 2000,
    "kullanici1": 500
};

const geographyQuestions = [
    { question: "Türkiye'nin başkenti neresidir?", answer: "1" },
    { question: "Dünyanın en büyük okyanusu hangisidir?", answer: "1" },
    { question: "Avrupa'nın en yüksek dağı hangisidir?", answer: "1" }
];

let currentUser = null;

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (users[username] && users[username] === password) {
        currentUser = username;
        document.getElementById('login').style.display = 'none';
        document.getElementById('account').style.display = 'block';
        document.getElementById('welcomeMessage').innerText = `Hoşgeldiniz, ${username}`;
        document.getElementById('balance').innerText = balances[username] + ' TL';
    } else {
        document.getElementById('loginMessage').innerText = 'Geçersiz kullanıcı adı veya şifre';
    }
});

function showDeposit() {
    document.getElementById('withdrawSection').style.display = 'none';
    document.getElementById('depositSection').style.display = 'block';
    const randomQuestion = geographyQuestions[Math.floor(Math.random() * geographyQuestions.length)];
    document.getElementById('question').innerText = randomQuestion.question;
    document.getElementById('answerMessage').innerText = '';
    document.getElementById('depositForm').style.display = 'none';
}

function showWithdraw() {
    document.getElementById('depositSection').style.display = 'none';
    document.getElementById('withdrawSection').style.display = 'block';
}

function checkAnswer() {
    const answer = document.getElementById('answer').value;
    const questionText = document.getElementById('question').innerText;
    const question = geographyQuestions.find(q => q.question === questionText);

    if (answer.toLowerCase() === question.answer.toLowerCase()) {
        document.getElementById('answerMessage').innerText = 'Doğru cevap!';
        document.getElementById('depositForm').style.display = 'block';
    } else {
        document.getElementById('answerMessage').innerText = 'Yanlış cevap, tekrar deneyin.';
        document.getElementById('depositForm').style.display = 'none';
    }
}

function deposit() {
    const amount = parseInt(document.getElementById('depositAmount').value);
    if (!isNaN(amount) && amount > 0) {
        balances[currentUser] += amount;
        document.getElementById('balance').innerText = balances[currentUser] + ' TL';
        document.getElementById('depositSound').play();
        alert(`${amount} TL yatırıldı. Yeni bakiye: ${balances[currentUser]} TL`);
        window.open('https://www.google.com', '_blank');
    } else {
        alert('Geçerli bir tutar giriniz.');
    }
}

function withdraw() {
    const amount = parseInt(document.getElementById('withdrawAmount').value);
    if (!isNaN(amount) && amount > 0 && amount <= balances[currentUser]) {
        balances[currentUser] -= amount;
        document.getElementById('balance').innerText = balances[currentUser] + ' TL';
        document.getElementById('withdrawSound').play();
        alert(`${amount} TL çekildi. Yeni bakiye: ${balances[currentUser]} TL`);
    } else if (amount > balances[currentUser]) {
        document.getElementById('insufficientFundsSound').play();
        alert('Yetersiz bakiye.');
    } else {
        alert('Geçerli bir tutar giriniz.');
    }
}
