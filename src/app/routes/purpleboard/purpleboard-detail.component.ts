import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators'; //Observable route parameters
import { Observable } from 'rxjs';
import { pageAnimation } from '../../_animations/slideanimation/slideanimation.component';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Item, Card, PurpleboardService } from '../../_services/purpleboard.service';
import { BoardDetails, CardDetails, UpdateTime, ItemDetails } from '../../_services/_intefaces/interfaces';
import { trigger, state, style, animate, transition, keyframes, group, query, stagger, animateChild } from '@angular/animations';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    templateUrl: './purpleboard-detail.component.html',
    styleUrls: ['./purpleboard-detail.component.css'],
    animations: [
        trigger('boardAnimation', [
            state('inactive', style({
                transform: 'scale(1)'
            })),
            state('active', style({
                transform: 'scale(1)'
            })),
            transition('inactive => active', animate('100ms ease-in')),
            transition('active => inactive', animate('100ms ease-out'))
        ]),
        trigger('listAnimation', [
            transition('* => *', [

                query(':enter', style({ opacity: 0 }), { optional: true }),

                query(':enter', stagger('0.3s', [
                    animate('0.6s 0.5s ease-in', keyframes([
                        style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
                        style({ opacity: .5, transform: 'translateY(-35px)', offset: 0.5 }),
                        style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 }),
                    ]))]), { optional: true }),
                query(':leave', stagger('200ms', [
                    animate('0.6s 0.5s ease-out', keyframes([
                        style({ opacity: 1, transform: 'translateY(0)', offset: 0 }),
                        style({ opacity: .5, transform: 'translateY(-35px)', offset: 0.3 }),
                        style({ opacity: 0, transform: 'translateY(-75%)', offset: 1.0 }),
                    ]))]), { optional: true })
            ])
        ]),
        trigger('itemAnimation', [
            transition('* => *', [

                query(':enter', style({ opacity: 0 }), { optional: true }),

                query(':enter', stagger('200ms', [
                    animate('500ms ease-in', keyframes([
                        style({ opacity: 0, transform: 'translateX(-75%)', offset: 0 }),
                        style({ opacity: .5, transform: 'translateX(-15px)', offset: 0.6 }),
                        style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 }),
                    ]))]), { optional: true }),
                query(':leave', stagger('200ms', [
                    animate('500ms ease-out', keyframes([
                        style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
                        style({ opacity: .5, transform: 'translateX(-15px)', offset: 0.6 }),
                        style({ opacity: 0, transform: 'translateX(-75%)', offset: 1.0 }),
                    ]))]), { optional: true })
            ])
        ]),
        trigger('alertHeader', [
            transition(':enter', [
                style({ transform: 'scale(0.5)', opacity: 0 }),  // initial
                animate('500ms cubic-bezier(.42, 0, 1, 1)',
                    style({ transform: 'scale(1)', opacity: 1 }))  // final
            ]),
            transition(':leave', [
                style({ transform: 'scale(1)', opacity: 1 }),  // initial
                animate('500ms cubic-bezier(.42, 0, 1, 1)',
                    style({ transform: 'scale(0.5)', opacity: 0 }))  // final
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
    //Alert
    private _success = new Subject<string>();
    staticAlertClosed = false;
    successMessage: String;
    dateAlert = Date.now();
    public alertType: String = "success";
    //Hover on card items
    public hover: Boolean;
    //Content handlers
    public boards: BoardDetails[] = [];
    public cards: CardDetails[] = [];
    public items: ItemDetails[] = [];
    //Base Variables
    public board_id: String;
    public ifEmpty: Boolean = true;
    public openEditor: Boolean = false;
    public ifItemEdit: Boolean = false;
    public ifCardEdit: Boolean = false;
    public state = 'inactive';
    public today: Number = Date.now();
    //Forms
    private cardForm = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        label: ['', Validators.required]
    });
    private itemForm = this.fb.group({
        text: ['', Validators.required],
        label: [''],
        assigned_user: [''],
        card_id: ['']
    });
    private editItemForm = this.fb.group({
        text: ['', Validators.required]
    });
    private editCardForm = this.fb.group({
        name: ['', Validators.required]
    });
    //Interfaces
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
    public itemInfo: ItemDetails = {
        _id: '',
        text: '',
        label: 'yellow',
        assigned_user: '',
        card_id: ''
    };
    private cardInfo: CardDetails = {
        _id: '',
        name: '',
        description: '',
        label: '',
        board_id: '',
        items: [{
            editable: false
        }]
    };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private boardService: PurpleboardService,
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {
        window.scrollTo(0, 0);
        //alert settings
        setTimeout(() => this.staticAlertClosed = true, 20000);
        this._success.subscribe((message) => this.successMessage = message);
        this._success.pipe(
            debounceTime(5000) //Discard emitted values that take less than the specified time between output
        ).subscribe(() => this.successMessage = null);

        //take the parameter from URL
        this.route.params.subscribe(params => {
            //console.log(params) //log the entire params object
            //console.log(String(params['id'])); //log the value of id
            this.boardInfo._id = String(params['id']);
            this.board_id = String(params['id']);
        });
        this.getBoard(this.board_id);
    }

    public getBoard(board_id: String) {
        this.boardService.getBoard(String(board_id)).subscribe((boards) => {
            this.boards = boards["boards"];
            //console.log(this.boards);
            this.getCards(board_id);
        }, (err) => {
            console.error(err);
        });
    }

    public getCards(board_id: String) {
        this.boardService.getCards(String(board_id)).subscribe((cards) => {
            this.cards = cards["cards"];
            setTimeout(this.checkCardsExist(), 2000);
        }, (err) => {
            console.error(err);
        });
    }

    cardSubmit() {
        this.openEditor = false;
        if (this.cardForm.valid) {
            this.cardInfo = this.cardForm.value;
            this.cardInfo.board_id = this.board_id;
            this.boardService.addCard(this.cardInfo).subscribe((cards) => {
                if (cards["success"]) {
                    //console.log(cards.length);
                    this.cardInfo = cards["cards"];
                    this.cards.unshift(new Card(this.cardInfo._id, this.cardInfo.name, this.cardInfo.description, this.cardInfo.label, this.cardInfo.board_id, this.cardInfo.items));
                    this.changeSuccessMessage("Card was added successfully!", `success`);
                }
            }, (err) => {
                console.error(err);
            });
            this.updateBoardTime();
            console.log("New Card Added!");
            this.cardForm.reset();
            // put away no cards warning
            this.ifEmpty = false;
        } else {
            this.changeSuccessMessage(`Form is invalid!`, `danger`);
        }
    }

    itemSubmit(card_index, card: any) {
        console.log(card_index);
        console.log(card);
        this.openEditor = false;
        if (this.itemForm.valid) {
            this.itemInfo = this.itemForm.value;
            this.itemInfo.card_id = card._id;
            console.log(this.itemInfo);
            this.boardService.addItem(this.itemInfo).subscribe((items) => {
                if (items["success"] === true) {
                    //alert(JSON.stringify(items["item"]));
                    this.itemInfo = items["item"];
                    console.log("Added");
                    this.cards[card_index]["items"].unshift(new Item(this.itemInfo._id, this.itemInfo.text, this.itemInfo.label, this.itemInfo.assigned_user, this.itemInfo.card_id, false));
                    this.itemForm.reset();
                    this.updateBoardTime();
                    this.changeSuccessMessage("Item was added successfully!", `success`);
                }
            }, (err) => {
                console.error(err);
                this.changeSuccessMessage("Item was not added!", `danger`);
            });
        } else {
            this.changeSuccessMessage(`Form is invalid!`, `danger`);
        }
    }

    goThroughCards() {
        for (let key in this.cards) {
            //console.log(this.cards[key]);
            for (let key2 in this.cards[key]["items"]) {
                console.log(this.cards[key]["items"][key2]);
                //this.itemInfo = card[key]["items"][key2];
                //console.log(this.itemInfo);
                //this.items.unshift(new Item(this.itemInfo._id, this.itemInfo.text, this.itemInfo.label, //this.itemInfo.assigned_user, this.itemInfo.card_id));
            }
        }
    }

    editItem(itemIndex, cardIndex, cardId, itemId, text) {
        //alert(text);
        if (this.editItemForm.valid) {
            this.itemInfo = this.editItemForm.value;
            this.itemInfo.card_id = cardId;
            if (this.itemInfo.text === text) {
                this.changeSuccessMessage(`You haven't changed the text value!`, `warning`);
            } else {
                this.boardService.updateItem(this.itemInfo, itemId).subscribe((result) => {
                    if (result["success"] === true) {
                        this.cards[cardIndex]["items"][itemIndex]["text"] = String(this.itemInfo.text);
                        this.changeSuccessMessage(`Item was changed successfully!`, `success`);
                        this.updateBoardTime();
                    } else {
                        this.changeSuccessMessage(`Item wasn't changed!`, `warning`);
                    }
                })
            }
        } else {
            this.changeSuccessMessage(`You must enter value to submit changes!`, `danger`);
        }
    }

    editCard(cardIndex, cardId, name) {
        //alert(text);
        if (this.editCardForm.valid) {
            this.cardInfo = this.editCardForm.value;
            this.cardInfo._id = cardId;
            if (this.cardInfo.name === name) {
                this.changeSuccessMessage(`You haven't changed card title value!`, `warning`);
            } else {
                this.boardService.updateCard(this.cardInfo, cardId).subscribe((result) => {
                    if (result["success"] === true) {
                        this.cards[cardIndex]["name"] = String(this.cardInfo.name);
                        this.changeSuccessMessage(`Card title has been changed successfully!`, `success`);
                        this.updateBoardTime();
                    } else {
                        this.changeSuccessMessage(`Card title has not been changed!`, `danger`);
                    }
                });
            }
        } else {
            this.changeSuccessMessage(`You must enter value to submit changes!`, `danger`);
        }
    }

    removeItem(itemIndex, cardIndex, cardId, itemId) {
        //alert("Card Index: " + cardIndex + " Item Index: " + itemIndex + " Card Id: " + cardId + " Item Id: " + itemId);
        this.cards[cardIndex]["items"].splice(itemIndex, 1);
        this.boardService.removeItem(cardId, itemId).subscribe((result) => {
            //alert(this.cards[cardIndex]["items"]);
            this.updateBoardTime();
            this.changeSuccessMessage(`Item was deleted successfully!`, `success`);
        }, (err) => {
            console.error(err);
            this.changeSuccessMessage(`Item wasn't deleted!`, `danger`);
        });
    }

    removeCard(cardIndex, cardId, name) {
        //alert("Card Index: " + cardIndex + " Card Id: " + cardId);
        this.cards.splice(cardIndex, 1);
        this.boardService.removeCard(cardId).subscribe((result) => {
            if (result["success"] === true) {
                this.updateBoardTime();
                this.checkCardsExist();
                this.changeSuccessMessage(`Card "${name}" was deleted successfully!`, `success`);
            } else {
                this.changeSuccessMessage(`Card "${name}" wasn't deleted!`, `danger`);
            }
        }, (err) => {
            console.error(err);
        });
    }

    updateBoardTime() {
        this.timeUpdate._id = this.board_id;
        this.boardService.updateTime(this.timeUpdate).subscribe((result) => {
            if (result["success"]) {
                console.log("Board time updated");
            }
        }, (err) => {
            console.error(err);
        });
    }

    checkCardsExist() {
        if (!this.cards || this.cards.length == 0) {
            this.ifEmpty = true;
            this.changeSuccessMessage("No Cards found in the Database", `warning`);
        } else {
            this.ifEmpty = false;
        }
    }

    //Set alet message
    public changeSuccessMessage(message, type) {
        this.alertType = type;
        this._success.next(`${message}`);
    }

    toggleState() {
        this.state = this.state === 'active' ? 'inactive' : 'active';
    }

    editItemState(text, id) {
        //alert(id);
        this.editItemForm.setValue({ text: text });
        this.ifItemEdit = this.ifItemEdit === false ? true : false;
    }

    editCardState(text, id) {
        //alert(id);
        this.editCardForm.setValue({ name: text });
        this.ifCardEdit = this.ifCardEdit === false ? true : false;
    }

    gotoBoards() {
        this.router.navigateByUrl('/boards');
    }
}