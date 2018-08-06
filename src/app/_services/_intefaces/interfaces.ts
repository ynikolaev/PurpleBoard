export interface BoardDetails {
    _id: String,
    title: String;
    description: String;
    lastUploaded: Number;
    owner_id: String
}

export interface CardDetails {
    _id: String,
    name: String;
    description: String;
    label: String;
    board_id: String;
    items:[{}];
}

export interface ItemDetails {
    _id: String,
    text: String;
    label: String;
    assigned_user: String;
    card_id: String;
}

export interface UpdateTime {
    _id: String,
    time: Number
}