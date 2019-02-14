import _ from 'lodash';

export function getLargeImage() {
    return largeImages[_.random(0, largeImages.length)]
}

export function getSmallImage() {
    return smallImages[_.random(0, smallImages.length)]
}

const largeImages = [
    'static/images/avatar/large/ade.jpg',
    'static/images/avatar/large/chris.jpg',
    'static/images/avatar/large/christian.jpg',
    'static/images/avatar/large/daniel.jpg',
    'static/images/avatar/large/elliot.jpg',
    'static/images/avatar/large/elyse.png',
    'static/images/avatar/large/helen.jpg',
    'static/images/avatar/large/jenny.jpg',
    'static/images/avatar/large/joe.jpg',
    'static/images/avatar/large/justen.jpg',
    'static/images/avatar/large/kristy.png',
    'static/images/avatar/large/laura.jpg',
    'static/images/avatar/large/matt.jpg',
    'static/images/avatar/large/matthew.png',
    'static/images/avatar/large/molly.png',
    'static/images/avatar/large/nan.jpg',
    'static/images/avatar/large/nom.jpg',
    'static/images/avatar/large/patrick.png',
    'static/images/avatar/large/rachel.png',
    'static/images/avatar/large/steve.jpg',
    'static/images/avatar/large/stevie.jpg',
    'static/images/avatar/large/tom.jpg',
    'static/images/avatar/large/veronika.jpg',
    'static/images/avatar/large/zoe.jpg',
];

const smallImages = [
    'static/images/avatar/small/ade.jpg',
    'static/images/avatar/small/chris.jpg',
    'static/images/avatar/small/christian.jpg',
    'static/images/avatar/small/daniel.jpg',
    'static/images/avatar/small/elliot.jpg',
    'static/images/avatar/small/helen.jpg',
    'static/images/avatar/small/jenny.jpg',
    'static/images/avatar/small/joe.jpg',
    'static/images/avatar/small/justen.jpg',
    'static/images/avatar/small/laura.jpg',
    'static/images/avatar/small/lena.png',
    'static/images/avatar/small/lindsay.png',
    'static/images/avatar/small/mark.png',
    'static/images/avatar/small/matt.jpg',
    'static/images/avatar/small/matthew.png',
    'static/images/avatar/small/molly.png',
    'static/images/avatar/small/nan.jpg',
    'static/images/avatar/small/nom.jpg',
    'static/images/avatar/small/rachel.png',
    'static/images/avatar/small/steve.jpg',
    'static/images/avatar/small/stevie.jpg',
    'static/images/avatar/small/tom.jpg',
    'static/images/avatar/small/veronika.jpg',
    'static/images/avatar/small/zoe.jpg',
];