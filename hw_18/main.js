var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Bank = /** @class */ (function () {
    function Bank() {
        this.accounts = new Map();
        this.clients = new Map();
    }
    Bank.getInstance = function () {
        if (!Bank.instance) {
            Bank.instance = new Bank();
        }
        return Bank.instance;
    };
    Bank.prototype.createClient = function (firstName, lastName) {
        var client = new Client(firstName, lastName);
        this.clients.set(client.fullName, client);
        return client;
    };
    Bank.prototype.createAccount = function (client, initialBalance, currency) {
        var account = new BankAccount(client, initialBalance, currency);
        client.addAccount(account);
        this.accounts.set(account.accountNumber, account);
        return account;
    };
    Bank.prototype.closeAccount = function (accountNumber) {
        this.accounts.delete(accountNumber);
    };
    return Bank;
}());
var BankManager = /** @class */ (function () {
    function BankManager() {
        this.bank = Bank.getInstance();
    }
    BankManager.prototype.createClientAccount = function (firstName, lastName, balance, currency) {
        var client = this.bank.createClient(firstName, lastName);
        return this.bank.createAccount(client, balance, currency);
    };
    return BankManager;
}());
var BankAccount = /** @class */ (function () {
    function BankAccount(owner, balance, currency) {
        this.accountNumber = this.generateAccountNumber();
        this._balance = balance;
        this._owner = owner;
        this._currency = currency;
    }
    Object.defineProperty(BankAccount.prototype, "balance", {
        get: function () {
            return this._balance;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BankAccount.prototype, "owner", {
        get: function () {
            return this._owner;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BankAccount.prototype, "currency", {
        get: function () {
            return this._currency;
        },
        enumerable: false,
        configurable: true
    });
    BankAccount.prototype.deposit = function (amount) {
        this._balance += amount;
        console.info("Deposit: ".concat(amount, " ").concat(this.currency, ". New Balance: ").concat(this.balance, " ").concat(this.currency));
    };
    BankAccount.prototype.withdraw = function (amount) {
        if (amount > this._balance) {
            console.warn("Insufficient funds");
            return;
        }
        this._balance -= amount;
        console.info("Withdraw: ".concat(amount, " ").concat(this.currency, ". New Balance: ").concat(this.balance, " ").concat(this.currency));
    };
    BankAccount.prototype.generateAccountNumber = function () {
        return "ACC-".concat(Math.floor(Math.random() * 10000));
    };
    return BankAccount;
}());
var Client = /** @class */ (function () {
    function Client(firstName, lastName) {
        this.accounts = new Map();
        this.firstName = firstName;
        this.lastName = lastName;
    }
    Object.defineProperty(Client.prototype, "fullName", {
        get: function () {
            return "".concat(this.firstName, " ").concat(this.lastName);
        },
        enumerable: false,
        configurable: true
    });
    Client.prototype.addAccount = function (account) {
        this.accounts.set(account.accountNumber, account);
    };
    Client.prototype.getAccountsByCurrency = function (currency) {
        return Array.from(this.accounts.values()).filter(function (acc) { return acc.currency === currency; });
    };
    return Client;
}());
var DepositCommand = /** @class */ (function () {
    function DepositCommand(account, amount) {
        this.account = account;
        this.amount = amount;
    }
    DepositCommand.prototype.execute = function () {
        this.account.deposit(this.amount);
    };
    DepositCommand.prototype.undo = function () {
        this.account.withdraw(this.amount);
    };
    return DepositCommand;
}());
var WithdrawCommand = /** @class */ (function () {
    function WithdrawCommand(account, amount) {
        this.account = account;
        this.amount = amount;
    }
    WithdrawCommand.prototype.execute = function () {
        this.account.withdraw(this.amount);
    };
    WithdrawCommand.prototype.undo = function () {
        this.account.deposit(this.amount);
    };
    return WithdrawCommand;
}());
var TransactionQueue = /** @class */ (function () {
    function TransactionQueue() {
        this.queue = [];
        this.history = [];
    }
    TransactionQueue.prototype.addTransaction = function (command) {
        this.queue.push(command);
    };
    TransactionQueue.prototype.processTransactions = function () {
        while (this.queue.length > 0) {
            var command = this.queue.shift();
            command === null || command === void 0 ? void 0 : command.execute();
            if (command)
                this.history.push(command);
        }
    };
    TransactionQueue.prototype.rollbackTransaction = function () {
        var command = this.history.pop();
        command === null || command === void 0 ? void 0 : command.undo();
    };
    TransactionQueue.prototype.repeatLastTransaction = function () {
        var command = this.history[this.history.length - 1];
        command === null || command === void 0 ? void 0 : command.execute();
    };
    TransactionQueue.prototype.getTransactionHistory = function () {
        return __spreadArray([], this.history, true);
    };
    return TransactionQueue;
}());
