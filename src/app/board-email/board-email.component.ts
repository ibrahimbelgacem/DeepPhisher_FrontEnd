import { Component, OnInit } from '@angular/core';
import { EmailService } from '../_services/email.service';

@Component({
  selector: 'app-emails',
  templateUrl: './board-email.component.html',
  styleUrls: ['./board-email.component.css']
})
export class EmailsComponent implements OnInit {
  emails: any[] = [];
  filteredEmails: any[] = [];

  // Pour la recherche
  searchQuery: string = '';

  constructor(private emailService: EmailService) {}

  ngOnInit(): void {
    this.loadEmails();
  }

  loadEmails(): void {
    console.log("Chargement des emails...");

    const request = {
      email: "mayssejelliti@gmail.com",
      password: "yfai vxhz qwej kkvx"
    };

    this.emailService.fetchMails(request).subscribe({
      next: emails => {
        this.emails = emails;
        this.filteredEmails = [...emails];
        console.log("Emails reçus:", emails);
      },
      error: err => {
        console.error('Erreur lors du chargement des emails:', err);
      }
    });
  }

  // Méthode pour filtrer les emails
  onSearch(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredEmails = this.emails.filter(email => {
      const sender = email.sender?.toLowerCase() || '';
      const subject = email.subject?.toLowerCase() || '';
      return sender.includes(query) || subject.includes(query);
    });
  }
}
