function simuliereVerzoegerung(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}



async function addiereNachVerzoegerung(a, b, ms) {
    await simuliereVerzoegerung(ms);
    const ergebnis = a + b;
    console.log('Ergebnis: ', ergebnis);
}

addiereNachVerzoegerung(7, 3, 2000)

