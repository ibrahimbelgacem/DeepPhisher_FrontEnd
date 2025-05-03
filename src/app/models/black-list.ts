export class BlackList {

    private id: number;
    private senderEmail: String;
    private senderName: String;
    private domain: String;
    private blockDate: Date;
    
    constructor(id: number, senderEmail: String, senderName: String, domain: String, blockDate: Date) {
        this.id = id;
        this.senderEmail = senderEmail;
        this.senderName = senderName;
        this.domain = domain;
        this.blockDate = blockDate;
    }
}
