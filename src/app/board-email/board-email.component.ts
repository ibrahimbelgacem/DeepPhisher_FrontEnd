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
  searchQuery: string = '';
  loading: boolean = false;  // <-- nouvel indicateur

  constructor(private emailService: EmailService) {}

  ngOnInit(): void {
    this.loadEmails();
  }

  loadEmails(): void {
    this.loading = true;  // début du chargement
    console.log("Chargement des emails...");

    this.emailService.fetchMails().subscribe({
      next: emails => {
        this.emails = emails;
        this.filteredEmails = [...emails];
        console.log("Emails reçus:", emails);
        this.loading = false;  // fin du chargement
      },
      error: err => {
        console.error('Erreur lors du chargement des emails:', err);
        this.loading = false;  // fin du chargement même en cas d'erreur
      }
    });
  }

  onSearch(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredEmails = this.emails.filter(email => {
      const sender = email.sender?.toLowerCase() || '';
      const subject = email.subject?.toLowerCase() || '';
      return sender.includes(query) || subject.includes(query);
    });
  }
}
