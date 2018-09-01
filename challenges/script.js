/*****************************
* CODING CHALLENGE
*/

/*
Remember the tip calculator challenge? Let's create a more advanced version using everything we learned!

This time, John and his family went to 5 different restaurants. The bills were $124, $48, $268, $180 and $42.
John likes to tip 20% of the bill when the bill is less than $50, 15% when the bill is between $50 and $200, and 10% if the bill is more than $200.

Implement a tip calculator using objects and loops:
1. Create an object with an array for the bill values
2. Add a method to calculate the tip
3. This method should include a loop to iterate over all the paid bills and do the tip calculations
4. As an output, create 1) a new array containing all tips, and 2) an array containing final paid amounts (bill + tip). HINT: Start with two empty arrays [] as properties and then fill them up in the loop.


EXTRA AFTER FINISHING: Mark's family also went on a holiday, going to 4 different restaurants. The bills were $77, $375, $110, and $45.
Mark likes to tip 20% of the bill when the bill is less than $100, 10% when the bill is between $100 and $300, and 25% if the bill is more than $300 (different than John).

5. Implement the same functionality as before, this time using Mark's tipping rules
6. Create a function (not a method) to calculate the average of a given array of tips. HINT: Loop over the array, and in each iteration store the current sum in a variable (starting from 0). After you have the sum of the array, divide it by the number of elements in it (that's how you calculate the average)
7. Calculate the average tip for each family
8. Log to the console which family paid the highest tips on average

GOOD LUCK 😀
*/

var john = {
    fullName: 'John Smith',
    bills: [124, 48, 268, 180, 42],
    calcTip: function() {
        this.tipArr = [];
        this.finalBill = [];
        for (var i = 0; i < this.bills.length; i++) {
            if (this.bills[i] < 50) {
                this.tipArr.push(this.bills[i] * 0.2);
            } else if (this.bills[i] >= 50 && this.bills[i] < 200) {
                this.tipArr.push(this.bills[i] * 0.15);
            } else {
                this.tipArr.push(this.bills[i] * 0.1);
            }
            this.finalBill.push(this.tipArr[i] + this.bills[i]);
        }
    }
}

var mark = {
    fullName: 'Mark Miller',
    bills: [77, 475, 110, 45],
    calcTip: function() {
        this.tipArr = [];
        this.finalBill = [];
        for (var i = 0; i < this.bills.length; i++) {
            if (this.bills[i] < 50) {
                this.tipArr.push(this.bills[i] * 0.2);
            } else if (this.bills[i] >= 50 && this.bills[i] < 200) {
                this.tipArr.push(this.bills[i] * 0.15);
            } else {
                this.tipArr.push(this.bills[i] * 0.1);
            }
            this.finalBill.push(this.tipArr[i] + this.bills[i]);
        }
    }
}

john.calcTip();
mark.calcTip();

function avgTips(tips) {
    var temp = 0;
    for (var i = 0; i < tips.length; i++) {
        temp += tips[i];
    }
    return temp / tips.length;
}

console.log(john);
console.log(mark);

if (avgTips(john.tipArr) > avgTips(mark.tipArr)) {
    console.log('John\'s family paid the highest tip');
} else {
    console.log('Mark\'s family paid the highest tip');
}

/////////////////////////////
// CODING CHALLENGE


/*
--- Let's build a fun quiz game in the console! ---

1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)

2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).

5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.

6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).

7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).
*/

(function() {
    function Questions(question, answer, correctAnswer) {
        this.question = question;
        this.answer = answer;
        this.correctAnswer = correctAnswer;
    }

    Questions.prototype.displayRandQuestion = function() {
        console.log(this.question);

        for (var i = 0; i < this.answer.length; i++) {
            console.log(i + ': ' + this.answer[i]);
        }
    };

    Questions.prototype.checkUserAnswer = function(userInput) {
        if (userInput === this.correctAnswer) {
            console.log('Correct Answer!!');
        } else {
            console.log('Incorrect Answer!!');
        }
    };

    var questionOne = new Questions(
        'Who was the Avatar before Aang?',
        ['Avatar Kyoshi', 'Katara', 'Sokka', 'Avatar Roku'],
        'Avatar Roku'
    );
    var questionTwo = new Questions(
        'Who is the young Earthbender the gang meets?',
        ['Toph', 'Suki', 'Zuko', 'Sokka'],
        'Toph'
    );
    var questionThree = new Questions(
        'Who is Zuko\'s father?',
        ['Fire Lord Ozai', 'Aang', 'Sokka', 'The Blue Spirit'],
        'Fire Lord Ozai'
    );
    var questionFour = new Questions(
        'Who of the following is trying to capture Aang?',
        ['Katara', 'Fire Lord Ozai', 'Zuko & Azula', 'Sokka'],
        'Zuko & Azula'
    );

    var allQuestions = [questionOne, questionTwo, questionThree, questionFour];
    var pickQuestion = Math.floor(Math.random() * 3);
    var questionIs = allQuestions[pickQuestion]

    questionIs.displayRandQuestion();
    var flag = true;

    var userInput = prompt('Pick an answer.');
    if (userInput >= questionIs.answer.length) {
        while (flag) {
            userInput = prompt('Please pick a valid option');
            if (userInput < questionIs.answer.length) {
                flag = false;
            }
        }
    }

    var finalAnswer = questionIs.answer[userInput];
    questionIs.checkUserAnswer(finalAnswer);
})();



/*
--- Expert level ---

8. After you display the result, display the next random question, so that the game never ends (Hint: write a function for this and call it right after displaying the result)

9. Be careful: after Task 8, the game literally never ends. So include the option to quit the game if the user writes 'exit' instead of the answer. In this case, DON'T call the function from task 8.

10. Track the user's score to make the game more fun! So each time an answer is correct, add 1 point to the score (Hint: I'm going to use the power of closures for this, but you don't have to, just do this with the tools you feel more comfortable at this point).

11. Display the score in the console. Use yet another method for this.
*/


(function() {
    var score = 0;

    function Questions(question, answer, correctAnswer) {
        this.question = question;
        this.answer = answer;
        this.correctAnswer = correctAnswer;
    }

    Questions.prototype.displayRandQuestion = function() {
        console.log(this.question);

        for (var i = 0; i < this.answer.length; i++) {
            console.log(i + ': ' + this.answer[i]);
        }
    };

    Questions.prototype.checkUserAnswer = function(userInput) {
        if (userInput === this.correctAnswer) {
            score++;
            console.log('Correct Answer!!');
        } else {
            console.log('Incorrect Answer!!');
        }
    };

    var questionOne = new Questions(
        'Who was the Avatar before Aang?',
        ['Avatar Kyoshi', 'Katara', 'Sokka', 'Avatar Roku'],
        'Avatar Roku'
    );
    var questionTwo = new Questions(
        'Who is the young Earthbender the gang meets?',
        ['Toph', 'Suki', 'Zuko', 'Sokka'],
        'Toph'
    );
    var questionThree = new Questions(
        'Who is Zuko\'s father?',
        ['Fire Lord Ozai', 'Aang', 'Sokka', 'The Blue Spirit'],
        'Fire Lord Ozai'
    );
    var questionFour = new Questions(
        'Who of the following is trying to capture Aang?',
        ['Katara', 'Fire Lord Ozai', 'Zuko & Azula', 'Sokka'],
        'Zuko & Azula'
    );

    var flag = true;

    while (flag) {
        var allQuestions = [questionOne, questionTwo, questionThree, questionFour];
        var pickQuestion = Math.floor(Math.random() * 3);
        var questionIs = allQuestions[pickQuestion]

        questionIs.displayRandQuestion();
        var userInputflag = true;

        var userInput = prompt('Pick an answer!! (Type \'q\' to exit the game)');
        if (userInput === 'q') {
            console.log('====== Final Score is: ' + score + ' ======');
            break;
        }
        if (userInput >= questionIs.answer.length) {
            while (userInputflag) {
                userInput = prompt('Please pick a valid option');
                if (userInput < questionIs.answer.length) {
                    userInputflag = false;
                }
            }
        }

        var finalAnswer = questionIs.answer[userInput];
        questionIs.checkUserAnswer(finalAnswer);
        console.log('====== Your Current Score is: ' + score + ' ======');
    }
})();

/////////////////////////////////
// CODING CHALLENGE

/*

Suppose that you're working in a small town administration, and you're in charge of two town elements:
1. Parks
2. Streets

It's a very small town, so right now there are only 3 parks and 4 streets. All parks and streets have a name and a build year.

At an end-of-year meeting, your boss wants a final report with the following:
1. Tree density of each park in the town (forumla: number of trees/park area)
2. Average age of each town's park (forumla: sum of all ages/number of parks)
3. The name of the park that has more than 1000 trees
4. Total and average length of the town's streets
5. Size classification of all streets: tiny/small/normal/big/huge. If the size is unknown, the default is normal

All the report data should be printed to the console.

HINT: Use some of the ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring, etc.

*/

class Elements {
    constructor(name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    }
}

class Park extends Elements {
    constructor(name, buildYear, totalTree, area) {
        super(name, buildYear);
        this.totalTree = totalTree;
        this.area = area;
    }

    treeDensity() {
        const treeDensity = this.totalTree / this.area;
        console.log(`${this.name} has a tree density of ${treeDensity} trees per square km.`);
    }
}

class Street extends Elements {
    constructor(name, buildYear, length, size = 3) {
        super(name, buildYear);
        this.length = length;
        this.size = size;
    }

    streetClassification() {
        const street = new Map();
        street.set(1, 'tiny');
        street.set(2, 'small');
        street.set(3, 'normal');
        street.set(4, 'big');
        street.set(5, 'huge');
        console.log(`${this.name}, build in ${this.buildYear}, is a ${street.get(this.size)} street.`);
    }
}

function calcAvg(value) {
    let avg = 0;
    for (let i of value) {
        avg += i;
    }
    return [avg, avg / value.length];
}

const allParks = [new Park('Green Park', 1987, 215, 0.2),
                 new Park('National Park', 1894, 3541, 2.9),
                 new Park('Oak Park', 1953, 949, 0.4)];

const allStreets = [new Street('Ocean Avenue', 1999, 1.1, 4),
                   new Street('Evergreen Street', 2008, 2.7, 2),
                   new Street('4th Street', 2015, 0.8),
                   new Street('Sunset Boulevard', 1982, 2.5, 5)];


function parkReport(value) {
    const ages  = allParks.map(value => new Date().getFullYear() - value.buildYear);
    const [avg, average] = calcAvg(ages);
    console.log(`Our ${value.length} parks have an average of ${average} years`);

    value.forEach(element => {
        element.treeDensity();
    });

    value.forEach(element => {
        if (element.totalTree >= 1000) {
            console.log(`${element.name} has more than 1000 trees`);
        } 
    });
}

function streetReport(value) {
    var len  = allStreets.map(value => value.length);
    const [avg, average] = calcAvg(len);
    console.log(`Our ${value.length} streets have a total length of ${avg} km, with an average of ${average} km.`);

    allStreets.forEach(value => {
        value.streetClassification()
    });
}

parkReport(allParks);
streetReport(allStreets);