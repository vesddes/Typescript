import {BankAccount} from "./bankAccount";
import {Bank} from "./bank";

type Currency = "USD" | "EUR" | "UAH";

export class BankManager {
    private bank = Bank.getInstance();

    public createClientAccount(firstName: string, lastName: string, balance: number, currency: Currency): BankAccount {
        const client = this.bank.createClient(firstName, lastName);
        return this.bank.createAccount(client, balance, currency);
    }
}