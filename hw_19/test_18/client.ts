import {BankAccount} from "./bankAccount";

type Currency = "USD" | "EUR" | "UAH";

export class Client {
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