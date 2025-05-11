import { OrderItem } from './OrderItem';

export class Order {
    id: number;
    customerName: string;
    status: string;
    items: OrderItem[];
}

export const Orders: Order[] = [
    {
        id: 1,
        customerName: 'Alice Smith',
        status: 'Pending',
        items: [ { id: 1, menuItemId: 12, amount: 3 }, { id: 2, menuItemId: 7, amount: 1 } ]
    },
    {
        id: 2,
        customerName: 'Bob Johnson',
        status: 'Completed',
        items: [ { id: 3, menuItemId: 35, amount: 2 }, { id: 4, menuItemId: 1, amount: 4 } ]
    },
    {
        id: 3,
        customerName: 'Catherine Brown',
        status: 'In Progress',
        items: [ { id: 5, menuItemId: 27, amount: 1 } ]
    },
    {
        id: 4,
        customerName: 'David Wilson',
        status: 'Pending',
        items: [ { id: 6, menuItemId: 18, amount: 2 }, { id: 7, menuItemId: 22, amount: 3 }, { id: 8, menuItemId: 5, amount: 2 } ]
    },
    {
        id: 5,
        customerName: 'Emma Taylor',
        status: 'Completed',
        items: [ { id: 9, menuItemId: 9, amount: 1 }, { id: 10, menuItemId: 43, amount: 2 } ]
    },
    {
        id: 6,
        customerName: 'Frank Harris',
        status: 'Pending',
        items: [ { id: 11, menuItemId: 6, amount: 5 } ]
    },
    {
        id: 7,
        customerName: 'Grace White',
        status: 'In Progress',
        items: [ { id: 12, menuItemId: 14, amount: 4 }, { id: 13, menuItemId: 33, amount: 2 } ]
    },
    {
        id: 8,
        customerName: 'Henry Martin',
        status: 'Pending',
        items: [ { id: 14, menuItemId: 28, amount: 1 }, { id: 15, menuItemId: 48, amount: 3 } ]
    },
    {
        id: 9,
        customerName: 'Isabella Clark',
        status: 'Completed',
        items: [ { id: 16, menuItemId: 50, amount: 2 }, { id: 17, menuItemId: 4, amount: 5 } ]
    },
    {
        id: 10,
        customerName: 'Jack Lewis',
        status: 'In Progress',
        items: [ { id: 18, menuItemId: 15, amount: 1 }, { id: 19, menuItemId: 2, amount: 3 } ]
    },
    {
        id: 11,
        customerName: 'Karen Scott',
        status: 'Pending',
        items: [
            { id: 20, menuItemId: 8, amount: 2 }
        ]
    },
    {
        id: 12,
        customerName: 'Liam Hall',
        status: 'Completed',
        items: [
            { id: 21, menuItemId: 16, amount: 1 },
            { id: 22, menuItemId: 24, amount: 3 }
        ]
    },
    {
        id: 13,
        customerName: 'Mia Green',
        status: 'In Progress',
        items: [
            { id: 23, menuItemId: 30, amount: 4 },
            { id: 24, menuItemId: 11, amount: 2 }
        ]
    },
    {
        id: 14,
        customerName: 'Nathan Baker',
        status: 'Pending',
        items: [
            { id: 25, menuItemId: 17, amount: 2 },
            { id: 26, menuItemId: 46, amount: 1 }
        ]
    },
    {
        id: 15,
        customerName: 'Olivia Adams',
        status: 'Completed',
        items: [
            { id: 27, menuItemId: 19, amount: 3 },
            { id: 28, menuItemId: 6, amount: 1 }
        ]
    },
    {
        id: 16,
        customerName: 'Paul Turner',
        status: 'In Progress',
        items: [
            { id: 29, menuItemId: 31, amount: 1 }
        ]
    },
    {
        id: 17,
        customerName: 'Quinn Campbell',
        status: 'Pending',
        items: [
            { id: 30, menuItemId: 12, amount: 2 },
            { id: 31, menuItemId: 21, amount: 3 }
        ]
    },
    {
        id: 18,
        customerName: 'Rachel Parker',
        status: 'Completed',
        items: [
            { id: 32, menuItemId: 40, amount: 2 }
        ]
    },
    {
        id: 19,
        customerName: 'Samuel Evans',
        status: 'Pending',
        items: [
            { id: 33, menuItemId: 3, amount: 2 },
            { id: 34, menuItemId: 9, amount: 2 }
        ]
    },
    {
        id: 20,
        customerName: 'Tina Murphy',
        status: 'In Progress',
        items: [
            { id: 35, menuItemId: 34, amount: 3 },
            { id: 36, menuItemId: 13, amount: 1 }
        ]
    },
    {
        id: 21,
        customerName: 'Ursula Jenkins',
        status: 'Pending',
        items: [
            { id: 37, menuItemId: 26, amount: 2 },
            { id: 38, menuItemId: 5, amount: 1 }
        ]
    },
    {
        id: 22,
        customerName: 'Victor Rivera',
        status: 'Completed',
        items: [
            { id: 39, menuItemId: 7, amount: 4 }
        ]
    },
    {
        id: 23,
        customerName: 'Wendy Coleman',
        status: 'In Progress',
        items: [
            { id: 40, menuItemId: 38, amount: 3 },
            { id: 41, menuItemId: 20, amount: 2 }
        ]
    },
    {
        id: 24,
        customerName: 'Xander Price',
        status: 'Pending',
        items: [
            { id: 42, menuItemId: 10, amount: 1 }
        ]
    },
    {
        id: 25,
        customerName: 'Yvonne Sanders',
        status: 'Completed',
        items: [
            { id: 43, menuItemId: 2, amount: 2 },
            { id: 44, menuItemId: 18, amount: 1 }
        ]
    },
    {
        id: 26,
        customerName: 'Zachary Bell',
        status: 'In Progress',
        items: [
            { id: 45, menuItemId: 25, amount: 3 }
        ]
    },
    {
        id: 27,
        customerName: 'Amanda Ward',
        status: 'Pending',
        items: [
            { id: 46, menuItemId: 44, amount: 1 },
            { id: 47, menuItemId: 3, amount: 2 }
        ]
    },
    {
        id: 28,
        customerName: 'Brandon Hughes',
        status: 'Completed',
        items: [
            { id: 48, menuItemId: 29, amount: 2 }
        ]
    },
    {
        id: 29,
        customerName: 'Charlotte Cox',
        status: 'In Progress',
        items: [
            { id: 49, menuItemId: 47, amount: 1 },
            { id: 50, menuItemId: 36, amount: 3 }
        ]
    },
    {
        id: 30,
        customerName: 'Dylan Foster',
        status: 'Pending',
        items: [
            { id: 51, menuItemId: 32, amount: 2 },
            { id: 52, menuItemId: 11, amount: 1 }
        ]
    },
    {
        id: 31,
        customerName: 'Elena Morris',
        status: 'Completed',
        items: [
            { id: 53, menuItemId: 13, amount: 2 },
            { id: 54, menuItemId: 9, amount: 3 }
        ]
    },
    {
        id: 32,
        customerName: 'Felix Richardson',
        status: 'In Progress',
        items: [
            { id: 55, menuItemId: 23, amount: 1 }
        ]
    },
    {
        id: 33,
        customerName: 'Gina Lopez',
        status: 'Pending',
        items: [
            { id: 56, menuItemId: 19, amount: 2 },
            { id: 57, menuItemId: 32, amount: 1 }
        ]
    },
    {
        id: 34,
        customerName: 'Harry Reed',
        status: 'Completed',
        items: [
            { id: 58, menuItemId: 41, amount: 2 }
        ]
    },
    {
        id: 35,
        customerName: 'Ivy Perry',
        status: 'In Progress',
        items: [
            { id: 59, menuItemId: 35, amount: 3 },
            { id: 60, menuItemId: 16, amount: 2 }
        ]
    },
    {
        id: 36,
        customerName: 'Jackie Morgan',
        status: 'Pending',
        items: [
            { id: 61, menuItemId: 28, amount: 1 },
            { id: 62, menuItemId: 37, amount: 3 }
        ]
    },
    {
        id: 37,
        customerName: 'Kevin Griffin',
        status: 'Completed',
        items: [
            { id: 63, menuItemId: 14, amount: 2 }
        ]
    },
    {
        id: 38,
        customerName: 'Lily King',
        status: 'In Progress',
        items: [
            { id: 64, menuItemId: 5, amount: 1 },
            { id: 65, menuItemId: 22, amount: 2 }
        ]
    },
    {
        id: 39,
        customerName: 'Mason Bell',
        status: 'Pending',
        items: [
            { id: 66, menuItemId: 43, amount: 1 },
            { id: 67, menuItemId: 8, amount: 3 }
        ]
    },
    {
        id: 40,
        customerName: 'Nina Foster',
        status: 'Completed',
        items: [
            { id: 68, menuItemId: 29, amount: 4 }
        ]
    },
    {
        id: 41,
        customerName: 'Oscar Hill',
        status: 'In Progress',
        items: [
            { id: 69, menuItemId: 18, amount: 2 },
            { id: 70, menuItemId: 25, amount: 1 }
        ]
    },
    {
        id: 42,
        customerName: 'Paige Davis',
        status: 'Pending',
        items: [
            { id: 71, menuItemId: 6, amount: 3 },
            { id: 72, menuItemId: 30, amount: 2 }
        ]
    },
    {
        id: 43,
        customerName: 'Quincy Thomas',
        status: 'Completed',
        items: [
            { id: 73, menuItemId: 12, amount: 2 },
            { id: 74, menuItemId: 8, amount: 4 }
        ]
    },
    {
        id: 44,
        customerName: 'Rita Anderson',
        status: 'In Progress',
        items: [
            { id: 75, menuItemId: 24, amount: 1 },
            { id: 76, menuItemId: 39, amount: 2 }
        ]
    },
    {
        id: 45,
        customerName: 'Steve Evans',
        status: 'Pending',
        items: [
            { id: 77, menuItemId: 32, amount: 3 },
            { id: 78, menuItemId: 41, amount: 1 }
        ]
    },
    {
        id: 46,
        customerName: 'Tanya Wilson',
        status: 'Completed',
        items: [
            { id: 79, menuItemId: 21, amount: 2 },
            { id: 80, menuItemId: 11, amount: 1 }
        ]
    },
    {
        id: 47,
        customerName: 'Uriah Scott',
        status: 'In Progress',
        items: [
            { id: 81, menuItemId: 19, amount: 2 },
            { id: 82, menuItemId: 5, amount: 1 }
        ]
    },
    {
        id: 48,
        customerName: 'Vera Clark',
        status: 'Pending',
        items: [
            { id: 83, menuItemId: 36, amount: 1 },
            { id: 84, menuItemId: 8, amount: 2 }
        ]
    },
    {
        id: 49,
        customerName: 'Walter Lee',
        status: 'Completed',
        items: [
            { id: 85, menuItemId: 9, amount: 2 }
        ]
    },
    {
        id: 50,
        customerName: 'Xena James',
        status: 'In Progress',
        items: [
            { id: 86, menuItemId: 23, amount: 3 },
            { id: 87, menuItemId: 12, amount: 2 }
        ]
    },
];
