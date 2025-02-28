import { describe, beforeEach, expect, jest, test } from '@jest/globals';
import { Client } from "./client";
import { BankAccount } from "./bankAccount";


describe("Client", () => {
    let client: Client;

    beforeEach(() => {
        client = new Client("Anna", "Smith");
    });

    test("should return full name", () => {
        expect(client.fullName).toBe("Anna Smith");
    });

    test("should add and retrieve accounts", () => {
        const account1 = new BankAccount(client, 100, "USD");
        const account2 = new BankAccount(client, 200, "EUR");
        client.addAccount(account1);
        client.addAccount(account2);
        expect(client.getAccountsByCurrency("USD")).toContain(account1);
        expect(client.getAccountsByCurrency("EUR")).toContain(account2);
    });
});