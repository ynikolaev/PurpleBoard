import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators'; //Observable route parameters
import { Observable } from 'rxjs';
import { pageAnimation } from '../../_animations/slideanimation/slideanimation.component';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BoardDetails, CardDetails, Card, PurpleboardService, UpdateTime } from '../../_services/purpleboard.service';
import { trigger, state, style, animate, transition, keyframes, group, query, stagger, animateChild } from '@angular/animations';

@Component({
    templateUrl: './purpleboard-detail.component.html',
    styleUrls: ['./purpleboard-detail.component.css'],
    animations: [
        trigger('listAnimation', [
            transition('* => *', [

                query(':enter', style({ opacity: 0 }), { optional: true }),

                query(':enter', stagger('300ms', [
                    animate('1s ease-in', keyframes([
                        style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
                        style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
                        style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 }),
                    ]))]), { optional: true })
            ])
        ]),
        trigger('errorHeader', [
            transition(':enter', [
                style({ transform: 'scale(0.5)', opacity: 0 }),  // initial
                animate('500ms cubic-bezier(.42, 0, 1, 1)',
                    style({ transform: 'scale(1)', opacity: 1 }))  // final
            ])
        ])
    ]
})

export class PurpleBoardDetailComponent implements OnInit {
    public boards: BoardDetails[] = [];
    public cards: CardDetails[] = [];
    public board_id: String;
    public ifEmpty: Boolean = true;
    public today: Number = Date.now();
    private cardForm = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        label: ['', Validators.required]
    });
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private boardService: PurpleboardService,
        private fb: FormBuilder
    ) { }

    private boardInfo: BoardDetails = {
        _id: '',
        title: '',
        description: '',
        lastUploaded: Date.now(),
        owner_id: ''
    };

    private timeUpdate: UpdateTime = {
        _id: '',
        time: Date.now()
    };

    private cardInfo: CardDetails = {
        _id: '',
        name: '',
        description: '',
        label: '',
        board_id: ''
    };

    ngOnInit(): void {
        window.scrollTo(0, 0);
        //take the parameter from URL
        this.route.params.subscribe(params => {
            //console.log(params) //log the entire params object
            //console.log(String(params['id'])); //log the value of id
            this.boardInfo._id = String(params['id']);
            this.board_id = String(params['id']);
            //console.log("Params pb-detail: "+this.board_id);
        });
        this.boardService.getBoard(String(this.board_id)).subscribe((boards) => {
            this.boards = boards["boards"];
            console.log(this.boards);
        }, (err) => {
            console.error(err);
        });
        this.boardService.getCards(String(this.board_id)).subscribe((cards) => {
            this.cards = cards["cards"];
            console.log(this.cards);
            console.log(this.cards.length);
            if (this.cards.length == 0) {
                this.ifEmpty = true;
            } else {
                this.ifEmpty = false;
            }
            console.log(this.ifEmpty);
        }, (err) => {
            console.error(err);
        });
    }

    onSubmit() {
        if (this.cardForm.valid) {
            this.cardInfo = this.cardForm.value;
            this.cardInfo.board_id = this.board_id;
            this.boardService.addCard(this.cardInfo).subscribe((cards) => {
                if (cards["success"]) {
                    //console.log(cards.length);
                    this.cardInfo = cards["cards"];
                    this.cards.unshift(new Card(this.cardInfo._id, this.cardInfo.name, this.cardInfo.description, this.cardInfo.label, this.cardInfo.board_id));
                }
            }, (err) => {
                console.error(err);
            });
            this.timeUpdate._id = this.board_id;
            this.boardService.updateTime(this.timeUpdate).subscribe((result) => {
                if (result["success"]) {
                    console.log("Board time updated");
                }
            }, (err) => {
                console.error(err);
            });
            console.log("New Card Added!");
            this.cardForm.reset();
            this.ifEmpty = false;
        }
    }

    gotoBoards() {
        this.router.navigateByUrl('/boards');
    }
}