import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [{
    id: '1',
    deliveryDays: 7,
    priceCents: 0
}, {
    id: '2',
    deliveryDays: 3,
    priceCents: 499
}, {
    id: '3',
    deliveryDays: 1,
    priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId) {
    let deliveryOption;

    deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionId) {
            deliveryOption = option;
        }
    });

    return deliveryOption || deliveryOptions[0];
}

export function calculateDeliveryDate(deliveryOption) {
    const today = dayjs('2025-03-07');
    let daysToAdd = deliveryOption.deliveryDays; 

    let deliveryDate = today.add(
        daysToAdd,
        'days'
    );

    while (daysToAdd !== 0) {
        deliveryDate = deliveryDate.add(1, 'day');
        if (!isWeekend(deliveryDate)) {
            daysToAdd--;
        }
    };

    const dateString = deliveryDate.format(
        'dddd, MMMM, D'
    );

    return dateString;
}

function isWeekend(deliveryDate) {
    const day = deliveryDate.format('dddd');
    return day === 'Saturday' || day === 'Sunday';
}