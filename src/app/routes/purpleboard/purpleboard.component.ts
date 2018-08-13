import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MomentModule } from 'ngx-moment';
import { DatePipe } from '@angular/common';
import { Board, PurpleboardService } from '../../_services/purpleboard.service';
import { BoardDetails, UpdateTime } from '../../_services/_intefaces/interfaces';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../../_services/authentication.service';
import { trigger, state, style, animate, transition, keyframes, group, query, stagger, animateChild } from '@angular/animations';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    templateUrl: './purpleboard.component.html',
    styleUrls: ['./purpleboard.component.css'],
    animations: [
        trigger('dialogAnimation', [
            state('inactive', style({
                transform: 'scale(1)',
                opacity: 0
            })),
            state('active', style({
                transform: 'scale(2)'
            })),
            transition('inactive => active', animate('200ms ease-in')),
            transition('active => inactive', animate('200ms ease-out'))
        ]),
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

                query(':enter', stagger('0.15s', [
                    animate('0.6s 0.5s ease-in', keyframes([
                        style({ opacity: 0, transform: 'translateX(-75%)', offset: 0 }),
                        style({ opacity: .5, transform: 'translateX(-35px)', offset: 0.3 }),
                        style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 }),
                    ]))]), { optional: true }),
                query(':leave', stagger('150ms', [
                    animate('0.4s 0.5s ease-out', keyframes([
                        style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
                        style({ opacity: .5, transform: 'translateX(-35px)', offset: 0.3 }),
                        style({ opacity: 0, transform: 'translateX(-100%)', offset: 1.0 }),
                    ]))]), { optional: true })
            ])
        ]),
        trigger('alertHeader', [
            transition(':enter', [
                style({ transform: 'scale(0.5)', opacity: 0 }),
                animate('500ms cubic-bezier(.42, 0, 1, 1)',
                    style({ transform: 'scale(1)', opacity: 1 }))
            ]),
            transition(':leave', [
                style({ transform: 'scale(1)', opacity: 1 }),
                animate('500ms cubic-bezier(.42, 0, 1, 1)',
                    style({ transform: 'scale(0.5)', opacity: 0 }))
            ])
        ])
    ]
})

export class PurpleBoardComponent implements OnInit {
    //Alert
    private _success = new Subject<string>();
    public alertType: String = "success";
    staticAlertClosed = false;
    successMessage: string;
    dateAlert = Date.now();
    public state = 'inactive';
    //Editor
    public openEditor: Boolean = false;
    public ifEmpty: Boolean = false;
    //Forms
    public ifBoardEdit: Boolean = false;
    private boardForm = this.fb.group({
        title: ['', [Validators.required, Validators.maxLength(20)]],
        description: ['', [Validators.required, Validators.maxLength(180)]]
    });
    private editBoardForm = this.fb.group({
        title: ['', [Validators.required, Validators.maxLength(20)]],
        description: ['', [Validators.required, Validators.maxLength(180)]]
    });
    //Handlers
    public boards: BoardDetails[] = [];
    //Interfaces
    private boardInfo: BoardDetails = {
        _id: '',
        title: '',
        description: '',
        lastUploaded: Date.now(),
        owner_id: ''
    };
    public today: Number = Date.now();

    constructor(private auth: AuthenticationService, private boardService: PurpleboardService, private route: ActivatedRoute, private fb: FormBuilder) {
        //console.log(this.today);
    }

    ngOnInit(): void {
        window.scrollTo(0, 0);
        //alert settings
        setTimeout(() => this.staticAlertClosed = true, 20000);
        this._success.subscribe((message) => this.successMessage = message);
        this._success.pipe(
            debounceTime(5000) //Discard emitted values that take less than the specified time between output
        ).subscribe(() => this.successMessage = null);

        console.log(this.auth.isLoggedIn());
        this.getBoards();
    }

    getBoards() {
        this.boardService.getAllBoards(String(this.auth.getId())).subscribe((boards) => {
            this.boards = boards["boards"];
            setTimeout(this.checkBoardsExist(), 3000);
            console.log(this.boards);
        }, (err) => {
            console.error(err);
        });
    }

    onSubmit() {
        this.openEditor = false;
        if (this.boardForm.valid) {
            this.boardInfo = this.boardForm.value;
            this.boardInfo.lastUploaded = Date.now();
            this.boardInfo.owner_id = String(this.auth.getId());
            this.boardService.addBoard(this.boardInfo).subscribe((boards) => {
                if (boards["success"]) {
                    console.log("success");
                    this.boardInfo = boards["boards"];
                    this.boards.unshift(new Board(this.boardInfo._id, this.boardInfo.title, this.boardInfo.description, this.boardInfo.lastUploaded, this.boardInfo.owner_id));
                    this.changeSuccessMessage(`Board "${this.boardInfo.title}" was added successfully!`, `success`);
                }
            }, (err) => {
                console.error(err);
            });
            console.log("New Board Added!");
            this.boardForm.reset();
            this.ifEmpty = false;
        } else {
            this.changeSuccessMessage(`Data is invalid. Title no more than 20char. Description no more than 180char`, `danger`);
        }
    }

    editBoard(boardIndex, boardId, title, description) {
        //alert(title);
        if (this.editBoardForm.valid) {
            this.boardInfo = this.editBoardForm.value;
            this.boardInfo._id = boardId;
            if (this.boardInfo.title === title && this.boardInfo.description === description) {
                this.changeSuccessMessage(`You haven't changed the text value!`, `warning`);
            } else {
                this.boardService.updateBoard(this.boardInfo, boardId).subscribe((result) => {
                    if (result["success"] === true) {
                        this.boards[boardIndex]["title"] = String(this.boardInfo.title);
                        this.boards[boardIndex]["description"] = String(this.boardInfo.description);
                        this.changeSuccessMessage(`Item was changed successfully!`, `success`);
                    } else {
                        this.changeSuccessMessage(`Item wasn't changed!`, `warning`);
                    }
                })
            }
        } else {
            this.changeSuccessMessage(`You must enter value to submit changes!`, `danger`);
        }
    }

    removeBoard(index, id, title) {
        this.boardService.removeBoard(id).subscribe((result) => {
            if (result["success"] = true) {
                this.boards.splice(index, 1);
                this.changeSuccessMessage(`Board "${title}" was deleted successfully!`, `success`);
                setTimeout(this.checkBoardsExist(), 3000);
            } else {
                this.changeSuccessMessage(`Board "${title}" was not deleted!`, `danger`);
            }
        }, (err) => {
            console.error(err);
        });
    }

    checkBoardsExist() {
        if (!this.boards || this.boards.length == 0) {
            this.ifEmpty = true;
        } else {
            this.ifEmpty = false;
        }
    }

    editBoardState(text, id, description) {
        //alert(id);
        this.editBoardForm.setValue({ title: text, description: description });
        this.ifBoardEdit = this.ifBoardEdit === false ? true : false;
    }

    //Set alet message
    public changeSuccessMessage(message, type) {
        this.alertType = type;
        this._success.next(`${message}`);
    }

    toggleState() {
        this.state = this.state === 'active' ? 'inactive' : 'active';
    }
}