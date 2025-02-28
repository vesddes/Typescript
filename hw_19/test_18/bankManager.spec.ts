import { describe, beforeEach, expect, test } from '@jest/globals';
import { BankManager } from "./bankManager";
import { Bank } from "./bank";
import { BankAccount } from "./bankAccount";
import { Client } from "./client";

describe("BankManager", () => {
    let manager: BankManager;
    let bank: Bank;

    beforeEach(() => {
        bank = Bank.getInstance();
        manager = new BankManager();
    });

    test("should create a client and account", () => {
        const account = manager.createClientAccount("Alice", "Smith", 1000, "USD");

        expect(account).toBeInstanceOf(BankAccount);
        expect(account.owner).toBeInstanceOf(Client);
        expect(account.owner.fullName).toBe("Alice Smith");
        expect(account.balance).toBe(1000);
        expect(account.currency).toBe("USD");
    });

    test("should assign the account to the correct client", () => {
        const account = manager.createClientAccount("Bob", "Brown", 500, "EUR");

        expect(account.owner.fullName).toBe("Bob Brown");
        expect(account.owner.getAccountsByCurrency("EUR")).toContain(account);
    });
});
