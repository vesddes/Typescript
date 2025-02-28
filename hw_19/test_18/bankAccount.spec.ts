import { describe, beforeEach, expect, test } from '@jest/globals';
import { Client } from "./client";
import { BankAccount } from "./bankAccount";


describe("BankAccount", () => {
    let client: Client;
    let account: BankAccount;

    beforeEach(() => {
        client = new Client("John", "Doe");
        account = new BankAccount(client, 500, "UAH");
    });

    test("should deposit money", () => {
        account.deposit(100);
        expect(account.balance).toBe(600);
    });

    test("should withdraw money if balance is sufficient", () => {
        account.withdraw(200);
        expect(account.balance).toBe(300);
    });

    test("should not withdraw money if balance is insufficient", () => {
        account.withdraw(1000);
        expect(account.balance).toBe(500);
    });
});
