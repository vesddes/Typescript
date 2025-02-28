import { describe, beforeEach, expect, jest, test } from '@jest/globals';
import { Bank } from "./bank";


describe("Bank", () => {
    let bank: Bank;

    beforeEach(() => {
        bank = Bank.getInstance();
    });

    test("should create a client", () => {
        const client = bank.createClient("John", "Doe");
        expect(client.fullName).toBe("John Doe");
    });

    test("should create an account for a client", () => {
        const client = bank.createClient("Jane", "Doe");
        const account = bank.createAccount(client, 100, "USD");
        expect(account.balance).toBe(100);
        expect(account.currency).toBe("USD");
        expect(account.owner.fullName).toBe("Jane Doe");
    });

    test("should close an account", () => {
        const client = bank.createClient("Alice", "Smith");
        const account = bank.createAccount(client, 200, "EUR");
        bank.closeAccount(account.accountNumber);
        expect(bank["accounts"].has(account.accountNumber)).toBe(false);
    });
});
