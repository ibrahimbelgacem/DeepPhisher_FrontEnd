export class Email {
  id: number;
  sender: string;
  subject: string;
  body: string;           // Ajouté
  classification: string;  // Renommé de 'classe' à 'classification'
  
  constructor(id: number, sender: string, subject: string, body: string, classification: string) {
    this.id = id;
    this.sender = sender;
    this.subject = subject;
    this.body = body;
    this.classification = classification;
  }
}