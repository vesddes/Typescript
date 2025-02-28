export interface ITodo {
    readonly id: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly requiresConfirmation: boolean;
    title: string;
    content: string;
    isCompleted: boolean;
    edit(title: string, content: string): void;
    toggleComplete(): void;
    getInfo(): object;
}