import {BankAccount} from "./bankAccount";

interface ICommand {
    execute(): void;
    undo(): void;
}



export class DepositCommand implements ICommand {
    constructor(private account: BankAccount, private amount: number) {}

    execute(): void {
        this.account.deposit(this.amount);
    }

    undo(): void {
        this.account.withdraw(this.amount);
    }
}

export class WithdrawCommand implements ICommand {
    constructor(private account: BankAccount, private amount: number) {}

    execute(): void {
        this.account.withdraw(this.amount);
    }

    undo(): void {
        this.account.deposit(this.amount);
    }
}

export class TransactionQueue {
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