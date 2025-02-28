import {Client} from "./client";

interface IBankAccount {
    readonly accountNumber: string;
    readonly balance: number;
    owner: Client;
    deposit(amount: number): void;
    withdraw(amount: number): void;
}

type Currency = "USD" | "EUR" | "UAH";

export class BankAccount implements IBankAccount {
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