module.exports = (input: string): number => {
    const rows = input.split('\n').map(row => row.replace('\r', '').split('   ').map(Number));
    const distances = [];

    const leftCol = rows.map(row => row[0]).sort((a, b) => a - b);
    const rightCol = rows.map(row => row[1]).sort((a,b ) => a - b);

    for (let x = 0; x < rows.length; x++){
        distances.push(Math.abs(leftCol[x] - rightCol[x]))
    }

    return distances.reduce((acc, curr) => acc + curr, 0);
}