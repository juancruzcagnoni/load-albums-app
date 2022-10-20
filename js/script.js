// Albums:
let albums = [];

// Load function:
const Load = () => {
    let name, author, code, nameSong, duration;
    let songs = [];
    let song  = [];

    name = RequestString("album's name:");
    author = RequestString("the author of the album:");
    code = RequestNumber();

    let album = [];
    album[0] = name;
    album[1] = author;
    album[2] = code;

    albums.push(album);
    
    do {
        song = [];

        nameSong = RequestString("song's name:");    
        duration = RequestDuration('the duration of the song, must be between 0 and 7200 seconds');

        song[0] = nameSong;
        song[1] = duration;

        songs.push(song);
    } while (confirm('Do you want to load another song?'));

    album.push(songs)
    console.log(albums);
};

// Show function:
const Show = () => {
    let html = '';
    let contDiscs = 0;
    let acumDuration = 0;

    for (let album of albums) {
        acumDuration = 0;
        contDiscs++;

        html += `
        <div class="album"><h3><span>Name of the album:</span> ${album[0]}, <span>author/band:</span> ${album[1]}</h3>
        <p><span>Numerical code of the album:</span> ${album[2]}
        <p>The album has ${album[3].length} songs.
        `;
        
        for (let song of album[3]) {
            if (song[1] > 180) {
                html += `<p><span>Song's name:</span> ${song[0]}, <span style="color:red;">song's duration: ${song[1]} seconds.</span></p>`
            } else {
                html += `<p><span>Song's name:</span> ${song[0]}, <span>song's duration:</span> ${song[1]} seconds.</p>`
            }
            acumDuration += song[1];
        }

        html += `<p>You <span>have loaded</span> ${contDiscs} albums.`
        html += `<p>The album has a <span>duration</span> of ${acumDuration} seconds in total.`
        html += `<p>The <span>average duration</span> of the disk is of ${acumDuration / album[3].length} seconds.</div>`
    }

    document.getElementById('info').innerHTML = html; 
};

// Functions:
const RequestString = (text) => {
    let data;

    do {
        data = prompt ('Enter ' + text);
    } while (!isNaN(data));
    
    return data;
};

const RequestNumber = () => {
    let number;
    let existentCode = false;

    do {
        existentCode = false;
        number = parseInt(prompt('Enter a numerical code between 1 and 999:'));
        for (let album of albums) {
            if (album[2] == number) {
                existentCode = true;
                alert('The numerical code already exist, please try with another one.')
            } 
        }
    } while (isNaN(number) || !(number > 1 && number < 999) || existentCode);

    return number;
};

const RequestDuration = (data) => {
    let dataDuration;

    do {
        dataDuration = parseInt(prompt('Enter ' + data));
    } while (isNaN(dataDuration) || !(dataDuration > 0 && dataDuration < 7200));

    return dataDuration;
};
