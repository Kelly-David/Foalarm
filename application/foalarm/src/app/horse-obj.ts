import { Horse } from './horse';
export class HorseObj implements Horse {

    id?: string;
    photoURL?: string;
    displayName?: string;
    dueDate?: string;
    wearable?: string;
    camera?: string;
    owner?: string;
    state?: Boolean;
    alert?: Boolean;
    alarmId?: string;
    ownerUID?: string;
    isPublic?: boolean;

    constructor(
        id?: string,
        photoURL?: string,
        displayName?: string,
        dueDate?: string,
        wearable?: string,
        camera?: string,
        owner?: string,
        state?: Boolean,
        alert?: Boolean,
        alarmId?: string,
        ownerUID?: string,
        isPublic?: boolean) {

            this.id = id;
            this.photoURL = photoURL;
            this.displayName = displayName;
            this.dueDate = dueDate;
            this.wearable = wearable;
            this.camera = camera;
            this.owner = owner;
            this.state = state;
            this.alert = alert;
            this.alarmId = alarmId;
            this.ownerUID = ownerUID;
            this.isPublic = isPublic;
    }
}


