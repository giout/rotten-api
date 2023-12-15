"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderMedia = void 0;
const orderMedia = (list, param) => {
    if (param === 'topscore')
        return list.sort((a, b) => (b.criticScore + b.publicScore) - (a.criticScore + a.publicScore));
    if (param === 'lowscore')
        return list.sort((a, b) => (a.criticScore + a.publicScore) - (b.criticScore + b.publicScore));
    if (param === 'new')
        return list.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    if (param === 'old')
        return list.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    return list;
};
exports.orderMedia = orderMedia;
