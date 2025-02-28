import { describe, beforeEach, expect, jest, test } from '@jest/globals';
import { Client } from "./client";
import { BankAccount } from "./bankAccount";
import { TransactionQueue, DepositCommand, WithdrawCommand } from "./transactionQueue";


describe("TransactionQueue", () => {
    let account: BankAccount;
    let queue: TransactionQueue;

    beforeEach(() => {
        const client = new Client("Mike", "Johnson");
        account = new BankAccount(client, 500, "USD");
        queue = new TransactionQueue();
    });

    test("should process deposit transactions", () => {
        const deposit = new DepositCommand(account, 100);
        queue.addTransaction(deposit);
        queue.processTransactions();
        expect(account.balance).toBe(600);
    });

    test("should rollback last transaction", () => {
        const deposit = new DepositCommand(account, 100);
        queue.addTransaction(deposit);
        queue.processTransactions();
        queue.rollbackTransaction();
        expect(account.balance).toBe(500);
    });

    test("should process withdrawal transactions", () => {
        const withdraw = new WithdrawCommand(account, 200);
        queue.addTransaction(withdraw);
        queue.processTransactions();
        expect(account.balance).toBe(300);
    });

    test("should not withdraw money if insufficient funds", () => {
        const withdraw = new WithdrawCommand(account, 600);
        queue.addTransaction(withdraw);
        queue.processTransactions();
        expect(account.balance).toBe(500);
    });

    test("should rollback last withdrawal", () => {
        const withdraw = new WithdrawCommand(account, 100);
        queue.addTransaction(withdraw);
        queue.processTransactions();
        queue.rollbackTransaction();
        expect(account.balance).toBe(500);
    });
});