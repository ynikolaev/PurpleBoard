import { Component, OnInit } from '@angular/core';
import { ContactsComponent } from '../routes/contacts/contacts.component';

@Component({
    selector: 'footer-app',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
    ngOnInit() {
        console.log("OnInit Footer loaded");
    }
}