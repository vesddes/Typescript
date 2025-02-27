type Currency = "USD" | "EUR" | "UAH";

class Bank {
    private static instance: Bank;
    private accounts = new Map<string, BankAccount>();
    private clients = new Map<string, Client>();

    private constructor() {}

    public static getInstance(): Bank {
        if (!Bank.instance) {
            Bank.instance = new Bank();
        }
        return Bank.instance;
    }

    public createClient(firstName: string, lastName: string): Client {
        const client = new Client(firstName, lastName);
        this.clients.set(client.fullName, client);
        return client;
    }

    public createAccount(client: Client, initialBalance: number, currency: Currency): BankAccount {
        const account = new BankAccount(client, initialBalance, currency);
        client.addAccount(account);
        this.accounts.set(account.accountNumber, account);
        return account;
    }

    public closeAccount(accountNumber: string): void {
        this.accounts.delete(accountNumber);
    }
}

class BankManager {
    private bank = Bank.getInstance();

    public createClientAccount(firstName: string, lastName: string, balance: number, currency: Currency): BankAccount {
        const client = this.bank.createClient(firstName, lastName);
        return this.bank.createAccount(client, balance, currency);
    }
}

class BankAccount implements IBankAccount {
    private _balance: number;
    private _owner: Client;
    private _currency: Currency;

    public readonly accountNumber = this.generateAccountNumber();

    public get balance(): number {
        return this._balance;
    }

    public get owner(): Client {
        return this._owner;
    }

    public get currency(): Currency {
        return this._currency;
    }

    constructor(owner: Client, balance: number, currency: Currency) {
        this._balance = balance;
        this._owner = owner;
        this._currency = currency;
    }

    public deposit(amount: number): void {
        this._balance += amount;
        console.info(`Deposit: ${amount} ${this.currency}. New Balance: ${this.balance} ${this.currency}`);
    }

    public withdraw(amount: number): void {
        if (amount > this._balance) {
            console.warn("Insufficient funds");
            return;
        }
        this._balance -= amount;
        console.info(`Withdraw: ${amount} ${this.currency}. New Balance: ${this.balance} ${this.currency}`);
    }

    private generateAccountNumber(): string {
        return `ACC-${Math.floor(Math.random() * 10000)}`;
    }
}

class Client {
    private readonly firstName: string;
    private readonly lastName: string;
    private readonly accounts = new Map<string, BankAccount>();

    public get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    constructor(firstName: string, lastName: string) {
        this.firstName = firstName;
        this.lastName = lastName;
    }

    public addAccount(account: BankAccount): void {
        this.accounts.set(account.accountNumber, account);
    }

    public getAccountsByCurrency(currency: Currency): BankAccount[] {
        return Array.from(this.accounts.values()).filter(acc => acc.currency === currency);
    }
}

interface ICommand {
    execute(): void;
    undo(): void;
}

class DepositCommand implements ICommand {
    constructor(private account: BankAccount, private amount: number) {}

    execute(): void {
        this.account.deposit(this.amount);
    }

    undo(): void {
        this.account.withdraw(this.amount);
    }
}

class WithdrawCommand implements ICommand {
    constructor(private account: BankAccount, private amount: number) {}

    execute(): void {
        this.account.withdraw(this.amount);
    }

    undo(): void {
        this.account.deposit(this.amount);
    }
}

class TransactionQueue {
    private queue: ICommand[] = [];
    private history: ICommand[] = [];

    public addTransaction(command: ICommand): void {
        this.queue.push(command);
    }

    public processTransactions(): void {
        while (this.queue.length > 0) {
            const command = this.queue.shift();
            command?.execute();
            if (command) this.history.push(command);
        }
    }

    public rollbackTransaction(): void {
        const command = this.history.pop();
        command?.undo();
    }

    public repeatLastTransaction(): void {
        const command = this.history[this.history.length - 1];
        command?.execute();
    }

    public getTransactionHistory(): ICommand[] {
        return [...this.history];
    }
}
