import {BankAccount} from "./bankAccount";
import {Client} from "./client";

type Currency = "USD" | "EUR" | "UAH";

export class Bank {
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




