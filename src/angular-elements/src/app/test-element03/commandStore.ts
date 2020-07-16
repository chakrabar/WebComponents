export class CommandStore {
    constructor(
        public increment: (amount: number) => void,
        public decrement: (amount: number) => void,
    ) { }
}