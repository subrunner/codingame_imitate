class PrefixCode extends Game {

  id = "prefixCode";
  title = "Prefix Code";
  description = "Decode a prefix code encoded message";
  synopsis = `Don Carlone, Boss der Klein Hinterbrühler Kaugummi-Mafia, sitzt mal wieder hinter Gittern.
  <p>Damit die Famiglia weiterläuft während er im Knast sitzt, 
    hat er schon lange einen ganz cleveren Weg gefunden um trotzdem Kontakt
    zu halten. Er verschlüsselt die Nachricht mit einem binären Präfix-Code, und hängt dann die Bytes hinten
    an eine Bild-Datei an. Dann postet er die Bilder in einem öffentlichen Forum, wo wiederum die Famiglia
    die Bilder herunterladen und dann entschlüsseln können.
  <p>Du bist gerade erst neu in die Kaugummi-Mafia eingestiegen, als Peppone, rechte Hand von Don Carlone, ganz
    bleich verkündet: "Ich hab aus Versehen das Decodierungs-Programm gelöscht!"
  <p>Die Bytes hat er noch aus der Bilddatei holen können, aber jetzt ist keiner dazu in der Lage sie zu
    entschlüsseln...`;
  successMessage = "Jetzt kannst du die Nachrichten vom Boss lesen! Bloß nicht die Schlüssel verschmeißen...";
  codeTemplate = `/**
* Auto-generated code below aims at helping you parse
* the standard input according to the problem statement.
**/
 
const n = parseInt( await readline());
for (let i = 0; i < n; i++) {
     var line = await readline();
     var spaceIndex = line.indexOf(' ');
     const b = line.substring(0, spaceIndex);
     const c = line.substring(spaceIndex + 1);
}
const s = await readline();
 
// Write an answer using console.log()
// To debug: console.debug('Debug messages...');
 
console.log('abracadabra');`;
  rules = `
  <p>Given a fixed set of characters, a <b>code</b> is a table that gives the encoding to use for each character.

  <p>A <b>prefix code</b> is a code with the prefix property, which is that there is no character with an 
  encoding that is a prefix (initial segment) of the encoding of another character.
  
  
  <p>Your goal is to decode an encoded string using the given prefix code, or say that is not possible.
  
  <p><b>Example of encoding:</b><br>
  Given the string "<span class="var">abracadabra</span>" and the prefix code:
  
  <br><span class="var">a</span> -> <span class="num">1</span>
  <br><span class="var">b</span> -> <span class="num">001</span>
  <br><span class="var">c</span> -> <span class="num">011</span>
  <br><span class="var">d</span> -> <span class="num">010</span>
  <br><span class="var">r</span> -> <span class="num">000</span>
  
  <p>The resulting encoding is: <span class="num">10010001011101010010001</span>
  
  <p>Thus, if your are given the code above and the input <span class="num">10010001011101010010001</span>,
    you should output the string "abracadabra".
  
  <p>With the same prefix code, if the input is <span class="num">0000</span>, 
    then you should tell that there is an error at index 3. Indeed, the first three characters of this 
    input can be decoded to give an '<span class="var">r</span>', but that leaves <span class="num">0</span>,
     which cannot be decoded.
  
  <p>External Link: <a href="https://en.wikipedia.org/wiki/Prefix_code">https://en.wikipedia.org/wiki/Prefix_code</a>
  `;
  input = `
  <p><b>Line 1:</b> A single integer <span class="var">N</span> representing the number of 
    association in the prefix-code table.

  <p><b>Next <span class="var">N</span> lines:</b>
   A binary code <span class="var">Bi</span> and a letter <span class="var">Ci</span>, 
    which tells that letter <span class="var">Ci</span> will be encoded by <span class="var">Bi</span>.

  <p><b>Next line:</b> The binary code <span class="var">S</span> of an encoded string.

  <p><b>Constraints:</b><br>
  0 ≤ <span class="var">N</span>, <span class="var">C</span> ≤ 127<br>
  <span class="var">S</span> and the binary codes <span class="var">Bi</span> have a length less that or equal to 5000.
  <p><b>Example:</b><br><span class="console">
  5<br>
1 a<br>
001 b<br>
000 r<br>
011 c<br>
010 d<br>
10010001011101010010001<br>
</span>
  `;
  output = `
  <p> If it is not possible to decode the encoded string, print 
    <span class="console">DECODE FAIL AT INDEX i</span> with <span class="var">i</span>
     the first index in the encoded string where 
    the decoding fails (index starts from 0).
  <p> Otherwise print the decoded string.
  <p><b>Example:</b><br><span class="console">
  abracadabra
</span>
  `;
  skills = ["String manipulation"];

  readlineSleep = 50;

  /**
   * the CODE.SKILLLEVEL level
   */
  skillLevel = 1;

  testcases = [{
    name: "abracadabra",
    input: `5
1 a
001 b
000 r
011 c
010 d
10010001011101010010001`.split("\n"),
    output: "abracadabra"
  }, {
    name: "Hello World!",
    input: `9
011  
0011 !
0010 r
0001 d
0000 e
111 W
110 H
10 l
010 o
1100000101001001111101000101000010110011`.split("\n"),
    output: "Hello World !"
  }, {
    name: "Extra bit at the end",
    input: `18
11  
1001 a
000011 b
000010 c
0011 d
011 e
000001 f
00101 h
000000 I
00100 i
10111 l
1000 n
00011 o
10110 r
010 t
10101 v
00010 x
10100 :
0000001000101011001101110010000111110100110110001001010110100111000011001000101110010101101000101011110111000001111000110000011101000101011110111000000010000110011011001111010011000100101`
      .split("\n"),
    output: "DECODE FAIL AT INDEX 186"
  }, {
    name: "Missing first character",
    input:
      `14
101  
0000 a
0111 c
01001 d
11 e
0110 i
0101 l
00111 m
00110 n
00101 p
100 r
00100 t
00011 v
00010 :
0100000110000110000010101100100111101000101010101111010010110011001110110111001010111000010000000111001001110011`
        .split("\n"),
    output: "DECODE FAIL AT INDEX 0"
  }, {
    name: "Poor Table",
    input:
      `23
0000000001 A
0000000100 b
0000000111 g
0000001101 n
0000000000  
0000000011 !
0000000110 e
0000001001 k
0000001100 m
0000001111 p
0000000101 d
0000010101 w
0000010001 s
0000010100 v
0000010000 r
0000010011 u
0000010110 y
0000010010 t
0000000010 a
0000001000 h
0000001011 l
0000001110 o
0000001010 ,
00000000010000000000000001010000000001100000010000000001011000000000000000001111000000111000000011100000010000000000000000000100100000000010000000010000000010110000000110000000101000000000000000000010000000110100000101100000010101000000001000000101100000001010000000000000000101100000001110000001001100000100000000000000000000111100000100000000001110000000011100000100000000000010000000110000000000000000010001000000100000000011100000010011000000101100000001010000000000000001010100000011100000010000000000100100000000000000000011`
        .split("\n"),
    output: "A very poor table, anyway, your program should work !"
  }, {
    name: "No Table!",
    input:
      `0
01111100001010000001011010000011111100000011111011100101010000010100`
        .split("\n"),
    output: "DECODE FAIL AT INDEX 0"
  }, {
    name: "Lonely Character",
    input:
      `1
0 z
000000000000000`
        .split("\n"),
    output: "zzzzzzzzzzzzzzz"
  }, {
    name: "Syllable substitution",
    input:
      `8
100 the
101  
110 s
111 ing
0001 e
0100 r
011 t
0101 h
100101110111000101001011101111101011001010110101111`
        .split("\n"),
    output: "the singer sings the thing"
  }];

  releasetests = [{
    name: "Lonely Character 2",
    input: [
      "2",
      "000000001 b",
      "100 c",
      "000000001000000001000000001"
    ],
    output: "bbb"
  }, {
    name: "4 letter words",
    input: `10
100 s
110 t
101 u
111 k
0001 h
0000 i
0011 f
0010 c
0100  
0101 e
00010101001011101001100001000010001000000100010010000010000110`.split("\n"),
    output: "heck this is shit"
  }, {
    name: "FAIL!",
    input: `10
100 s
110 t
101 u
111 k
0001 h
0000 i
0011 f
0010 c
0100  
0101 e
000101010010111010011001100001000010001000000100010010000010000110`.split("\n"),
    output: "DECODE FAIL AT INDEX 22"
  }]

  // CSS file to load
  cssFile = "";

  /**
   * returns the desired input
   */
  readline = () => {
    let tc = CODE.C.testcase,
      inp = tc.input;

    if (this.numReadline >= inp.length)
      throw new Error("There are no more lines to read!");

    return inp[this.numReadline++];
  }

  /**
   * makes all preparations to run the chosen testcase
   */
  prepareTestcase = () => {
    // fetch the testcase
    //let testcase = CODE.C.testcase;
    this.numReadline = 0;
  }

  /**
   * Initializes the game with everything needed. Use updateGame for actually rendering the current state.
   * @param {HTMLElement} elPlayingfield the game HTML element for rendering the game output
   */
  initGameArea = () => {
    // do nothing...
  }

  /**
   * Updates the game area with the current state of things
   * @param {boolean} isNewTestcase true: this is a new testcase, some UI resetting might be necessary. #prepareTestcase has been called beforehand.
   */
  updateGameArea = () => {
    // we have no gamearea
  }

  /**
   * Function that gets called as soon as a console.log (= written user input) gets called. do NOT put it to display!
   * @param {array} args the arguments that the user passed
   */
  consolelog = function (args) {
    Game.assertMatches(args[0], CODE.C.testcase.output);
    CODE.success("Erfolgreich decodiert!");
  }

}
CODE.GAMES.add(new PrefixCode());