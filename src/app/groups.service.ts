import {Injectable} from '@angular/core';

export interface Group {
    id: number;
    title: string;
    expanded: boolean;
    items: string[];
}

function randomIntBetween(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

@Injectable({
    providedIn: 'root'
})
export class GroupsService {
    private groups: Group[];

    constructor() {
        this.groups = [];
        for (let g = 0; g < 50; g++) {
            const group: Group = {
                id: g + 1,
                title: `Group # ${g + 1}`,
                expanded: false,
                items: []
            };

            const nbItems = randomIntBetween(10, 100);
            for (let i = 0; i < nbItems; i++) {
                group.items.push(`Item # ${i + 1}`);
            }

            this.groups.push(group);
        }
    }

    getGroups(): Group[] {
        return this.groups;
    }
}
