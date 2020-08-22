const limitTitle = (title) => {
    let newTitle = "";
    if(title.length < 25) {
        return title;
    }
    for(let i = 0; i < 32; i++) {
        newTitle += title.charAt(i);
    }
    return newTitle + '...';
}

console.log(limitTitle('Portable Charger RAVPower 80W AC Outlet Power Bank 20000mAh 30W PD USB C Laptop Charger External Battery Pack for MacBook Pro Dell iPad Pro Nintendo Switch iPhone Samsung(USB C Charger Not Included)'));