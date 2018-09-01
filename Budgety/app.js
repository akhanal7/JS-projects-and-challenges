var budgeController = (function() {
    /* Example: **(insertAdjacentHTML)**
    var x = 10;

    var add = function(a) {
        return a + x;
    }

    return {
        test: function(b) {
            console.log(add(b));
        }
    };
    */
    var Income  = function(description, value, id) {
        this.description = description;
        this.value = value;
        this.id = id;
    }

    var Expense  = function(description, value, id) {
        this.description = description;
        this.value = value;
        this.id = id;
        this.percentage = -1;
    }

    Expense.prototype.calcPercentage = function(totalIncome) {
        if (totalIncome > 0) {
            this.percentage = (this.value / totalIncome) * 100;
        } else {
            this.percentage = -1;
        }
    };

    Expense.prototype.getPercentage = function() {
        return this.percentage;
    };

    var store = {
        data: {
            income: [],
            expense: []
        },
        total: {
            income: 0,
            expense: 0
        },
        totalBudget: 0,
        percentage: -1
    };

    var calculateTotal =  function(type) {
        var sum = 0;
        store.data[type].forEach(function(curr) {
            sum += curr.value;
        });
        store.total[type] = sum;
    }

    return {
        addItems: function(type, desc, value) {
            var dataLength, userInput;

            dataLength = store.data[type].length;
            if (dataLength > 0) {
                id = store.data[type][dataLength - 1].id + 1;
            } else {
                id = 0;
            }

            if (type === 'income') {
                userInput = new Income(desc, value, id);
            } else {
                userInput = new Expense(desc, value, id);
            }
            store.data[type].push(userInput);
            return userInput;
        },

        deleteItems: function(type, id) {
            var ids, index;

            ids = store.data[type].map(function(current) {
                return current.id;
            });

            index = ids.indexOf(id);

            if (index !== -1) {
                store.data[type].splice(index, 1);
            }
        },

        calculateBudget: function() {
            calculateTotal('income');
            calculateTotal('expense');

            store.totalBudget = store.total.income - store.total.expense;
            if (store.total.income > 0) {
                store.percentage = Math.round((store.total.expense / store.total.income) * 100);
            } else {
                store.percentage = -1;
            }
        },

        calculatePercentages: function() {
            store.data.expense.forEach(element => {
                element.calcPercentage(store.total.income);
            });
        },

        getPercentages: function() {
            var per = store.data.expense.map(value => {
                return value.getPercentage();
            });

            return per;
        },

        getBudget: function() {
            return {
                totalValue: store.totalBudget,
                incomeValue: store.total.income,
                expenseValue: store.total.expense,
                percentage: store.percentage
            };
        },
    };

})();

var UIController = (function() {
    var DOM = {
        addType: '.add__type',
        addDescription: '.add__description',
        addValue: '.add__value',
        addButton: '.add__btn',
        addIncome: '.income__list',
        addExpense: '.expenses__list',
        addDate: '.budget__title--month',
        budgeValue: '.budget__value',
        budgeIncomeValue: '.budget__income--value',
        budgeExpenseValue: '.budget__expenses--value',
        expensePercentage: '.budget__expenses--percentage',
        deleteItem: '.container', // Event delegation
        percentagesExpense: '.item__percentage'
    };
    var monthList = [
        'January', 
        'February', 
        'March', 
        'April', 
        'May', 
        'June', 
        'July', 
        'August', 
        'September', 
        'October', 
        'November', 
        'December'
    ];
    var formatNumber =  function(number, type) {
        number = Math.abs(number);
        number = number.toFixed(2);
        
        var numberSplit = number.split('.');
        var int = numberSplit[0];
        var dec = numberSplit[1];

        if (int.length > 3) { // subste(index, car) - starting index and car - how many characters we want
            int = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        } 

        return (type === 'expense' ? '-' : '+') + ' ' + int + '.' + dec;
    }

    return {
        getInput: function() {
            return {
                type: document.querySelector(DOM.addType).value,
                desc: document.querySelector(DOM.addDescription).value,
                value: parseFloat(document.querySelector(DOM.addValue).value)
            }
        },

        getDOM: function() {
            return DOM;
        },

        addListItem: function(inpObject, type) {
            var html, newHTML, typeDOM;
            if (type === 'income') {
                typeDOM = document.querySelector(DOM.addIncome);
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else {
                typeDOM = document.querySelector(DOM.addExpense);
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            newHTML = html.replace('%id%', inpObject.id, type);
            newHTML = newHTML.replace('%description%', inpObject.description, type);
            newHTML = newHTML.replace('%value%', formatNumber(inpObject.value, type));

            typeDOM.insertAdjacentHTML('beforeend', newHTML);
        },

        removeListItem: function(item) {
            var itemID = document.getElementById(item);
            itemID.parentNode.removeChild(itemID);
        },

        getMonth: function() {
            var month, today;
            today = new Date();
            month = monthList[today.getMonth()];
            year = today.getFullYear();
    
            document.querySelector(DOM.addDate).textContent = month + ' ' + year;
        },

        clearInputFields: function() {
            var fields = document.querySelectorAll(DOM.addDescription + ', ' + DOM.addValue);
            var fieldsArray = Array.prototype.slice.call(fields);
            
            // fieldsArray.forEach(function(curr, index, array) {
            //     curr.value = '';
            // });

            // OR

            fieldsArray.forEach(element => {
                element.value = '';
            });

            fieldsArray[0].focus();
        },

        displayBudget: function(obj) {
            var type;
            obj.totalValue > 0 ? type = 'income' : type = 'expense';

            document.querySelector(DOM.budgeValue).textContent = formatNumber(obj.totalValue, type);
            document.querySelector(DOM.budgeIncomeValue).textContent = formatNumber(obj.incomeValue, 'income');
            document.querySelector(DOM.budgeExpenseValue).textContent = formatNumber(obj.expenseValue, 'expense');

            if (obj.percentage > 0) {
                document.querySelector(DOM.expensePercentage).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOM.expensePercentage).textContent = '----';
            }
        },

        displayPercentages: function(precentages) {
 
            var fields = document.querySelectorAll(DOM.percentagesExpense);
            
            for (var i = 0; i < fields.length; i++) {
                if (precentages[i] > 0) {
                    fields[i].textContent = Math.round(precentages[i]) + '%';
                } else {
                    fields[i].textContent = '---';
                }
            }
        },

        changeFocus: function() {
            var selectedType = document.querySelectorAll(DOM.addType + ', ' + DOM.addDescription + ', ' + DOM.addValue);

            for (var i = 0; i < selectedType.length; i++) {
                selectedType[i].classList.toggle('red-focus');
            }

            document.querySelector(DOM.addButton).classList.toggle('red');
        }
    };
})();

var controller = (function(budgeController, UIController) {
    var DOMStrings = UIController.getDOM();

    var evenntListeners = function() {
        document.querySelector(DOMStrings.addButton).addEventListener('click', addItem);
    
        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                addItem();
            }
        });

        document.querySelector(DOMStrings.deleteItem).addEventListener('click', deleteItem);

        document.querySelector(DOMStrings.addType).addEventListener('change', UIController.changeFocus);
    };

    var updatePercentage = function() {
        budgeController.calculatePercentages();
        var percentages = budgeController.getPercentages();
        UIController.displayPercentages(percentages);
        
    };

    var updateBudget = function() {
        budgeController.calculateBudget();
        var totalObj = budgeController.getBudget();
        UIController.displayBudget(totalObj);
    };

    var addItem = function() {
        var input = UIController.getInput();
        if (input.desc !== '' && input.value !== '' && input.value > 0) {
            var newItem = budgeController.addItems(input.type, input.desc, input.value);
            UIController.addListItem(newItem, input.type);

            UIController.clearInputFields();
            updateBudget();
            updatePercentage();
        }
    };

    // Event Degelation
    var deleteItem = function(event) {
        var itemID, splitString;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if (itemID) {
            splitString = itemID.split('-');
            budgeController.deleteItems(splitString[0], parseInt(splitString[1]));
            UIController.removeListItem(itemID);
            updateBudget();
            updatePercentage();
        }
    };

    return {
        init: function() {
            evenntListeners();
            UIController.getMonth();
            UIController.displayBudget({
                totalValue: 0,
                incomeValue: 0,
                expenseValue: 0,
                percentage: -1
            });
        }
    };
    
})(budgeController, UIController);

controller.init();