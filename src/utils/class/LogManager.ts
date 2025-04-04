import { TimeOnScreenLogType } from "../../types/logs_type/TimeOnScreenLogType";

export class ScreenLogManager {

    private static instance: ScreenLogManager;

    private logs: TimeOnScreenLogType[] = [];

    private constructor() { }

    static getInstance() {
        if (!this.instance) {
            this.instance = new ScreenLogManager();
        }

        return this.instance;
    }

    public addLog(log: TimeOnScreenLogType) {
        this.logs.push(log);
    }

    public getLogs() {
        return this.logs;
    }
}

