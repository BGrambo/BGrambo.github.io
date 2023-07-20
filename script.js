function randomBoolean(max) {
    return Math.floor(Math.random() * max);
}

const octalValues = new Map([
    ['RWX',7],
    ['RW-',6],
    ['R-X',5],
    ['R--',4],
    ['-WX',3],
    ['-W-',2],
    ['--X',1],
    ['---',0]
])

function calculateOctalValue(permissions){
    let octet1 = octalValues.get(permissions.slice(0,3));
    let octet2 = octalValues.get(permissions.slice(3,6));
    let octet3 = octalValues.get(permissions.slice(6,9));
    return parseInt(octet1.toString() + octet2.toString() + octet3.toString())
}

function generatePermissions(){
    let permissions = ''
    for (let i = 1; i < 10; i += 1) {
        let boolean = randomBoolean(2)
        if (boolean === 1) {
            if (i === 1 || i === 4 || i === 7){
                permissions += 'R'
            }
            else if (i === 2 || i === 5 || i === 8){
                permissions += 'W'
            }
            else if (i === 3 || i === 6 || i === 9){
                permissions += 'X'
            }
        }
        else {
            permissions += '\-'
        }
    }
    document.getElementById('question').innerText = permissions
}

function validateAnswer() {

    let question = calculateOctalValue(document.getElementById('question').innerText);
    let answer = parseInt(document.getElementById('answer').value);
    let result = document.getElementById('question')

    //console.log(question)
    //console.log(answer)

    if (question === answer) {
        result.innerText = 'Correct!'
        //console.log('Correct!')
        document.getElementById('question').setAttribute('class','correct hop')
        setTimeout(function () {
            document.getElementById('answer').value = ''
            document.getElementById('question').setAttribute('class',' ')
            generatePermissions()
        },2000)
    }
    else {
        result.innerText = 'Incorrect!'
        //console.log('Incorrect!')
        document.getElementById('question').setAttribute('class','incorrect shake')
        setTimeout(function () {
            document.getElementById('answer').value = ''
            document.getElementById('question').setAttribute('class',' ')
            generatePermissions()
        },2000)
    }

}

document.getElementById("answer").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        validateAnswer();
    }
});

generatePermissions()