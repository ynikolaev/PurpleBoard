import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MomentModule } from 'ngx-moment';
import { DatePipe } from '@angular/common';
import { Board, PurpleboardService, BoardDetails, UpdateTime } from '../../_services/purpleboard.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../../_services/authentication.service';
import { trigger, state, style, animate, transition, keyframes, group, query, stagger, animateChild } from '@angular/animations';

@Component({
    templateUrl: './purpleboard.component.html',
    styleUrls: ['./purpleboard.component.css'],
    animations: [
        trigger('errorHeader', [
            transition(':enter', [
                style({ transform: 'scale(0.5)', opacity: 0 }),  // initial
                animate('500ms cubic-bezier(.42, 0, 1, 1)',
                    style({ transform: 'scale(1)', opacity: 1 }))  // final
            ])
        ]),
        trigger('boardAnimation', [
            transition('* => *', [

                query(':enter', style({ transform: 'scale(0.5)', opacity: 0 }), { optional: true }),

                query(':enter', stagger('150ms', [
                    animate('400ms ease-in', keyframes([
                        style({ opacity: 0, transform: 'translateX(-75%)', offset: 0 }),
                        style({ opacity: .5, transform: 'translateX(-35px)', offset: 0.3 }),
                        style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 }),
                    ]))]), { optional: true }),
                query(':leave', stagger('150ms', [
                    animate('400ms ease-out', keyframes([
                        style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
                        style({ opacity: .5, transform: 'translateX(-35px)', offset: 0.3 }),
                        style({ opacity: 0, transform: 'translateX(-100%)', offset: 1.0 }),
                    ]))]), { optional: true })
            ])
        ])
    ]
})

export class PurpleBoardComponent implements OnInit {
    public boards: BoardDetails[] = [];
    private boardInfo: BoardDetails = {
        _id: '',
        title: '',
        description: '',
        lastUploaded: Date.now(),
        owner_id: ''
    };
    private boardForm = this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required]
    });
    private selectedId: number;
    public switchstate: String;
    public today: Number = Date.now();
    public ifEmpty: Boolean = true;


    constructor(private auth: AuthenticationService, private boardService: PurpleboardService, private route: ActivatedRoute, private fb: FormBuilder) {
        console.log(this.today);
    }
    remove(index) {
        console.log("Deleted");
        if (!this.boards.length) {
            return;
        } else if (this.boards.length == 1) {
            this.ifEmpty = true;
            console.log("Empty");
        }
        console.log(this.boards.length);
        this.boards.splice(index, 1);
    }
    ngOnInit(): void {
        window.scrollTo(0, 0);
        console.log(this.auth.isLoggedIn());
        this.boardService.getAllBoards(String(this.auth.getId())).subscribe((boards) => {
            this.boards = boards["boards"];
            if (this.boards.length == 0) {
                this.ifEmpty = true;
            } else {
                this.ifEmpty = false;
            }
            console.log(this.boards);
        }, (err) => {
            console.error(err);
        });
    }

    onSubmit() {
        if (this.boardForm.valid) {
            this.boardInfo = this.boardForm.value;
            this.boardInfo.lastUploaded = Date.now();
            this.boardInfo.owner_id = String(this.auth.getId());
            this.boardService.addBoard(this.boardInfo).subscribe((boards) => {
                if (boards["success"]) {
                    console.log("success");
                    this.boardInfo = boards["boards"];
                    this.boards.unshift(new Board(this.boardInfo._id, this.boardInfo.title, this.boardInfo.description, this.boardInfo.lastUploaded, this.boardInfo.owner_id));
                }
            }, (err) => {
                console.error(err);
            });
            console.log("New Board Added!");
            this.boardForm.reset();
            this.ifEmpty = false;
        }
    }

    addBoardAnimation() {
        this.switchstate = "change";
    }
}