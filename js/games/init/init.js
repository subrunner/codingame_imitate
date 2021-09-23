class Init extends Game {
  title="Einführung";
  description="Erste Begegnung mit dem Codingame Interface";
  synopsis="Aller Anfang ist schwer.<p>Dieses 'Spiel' ist nicht so sehr ein Spiel als eine Gelegenheit sich mit den Grundlagen des Interfaces und dem Ablauf vertraut zu machen.";
  successMessage = "Hervorragend! Du hast die erste Hürde gemeistert und kannst nun zu echten Aufgaben weiter gehen!<p>Mein Vorschlag: Thor - Find the Light";
  rules = `<p>Input muss eingelesen werden, und dann an den Output zurück gegeben werden.
  <p>Die Aufgabe ist Sourcecode so zu schreiben dass zuerst alle Testcases bestanden werden (Fälle, wo Debug- und Fehlermeldungen angezeigt werden), und danach dann der Release-Test (hier ist nur noch ein pass/fail sichtbar, aber nicht mehr warum).
  <p>Die <b>Testcases</b> sind unter dem Sourcecode-Fenster zu finden, und können einzeln abgespielt werden. Zu empfehlen: Testcases der Reihe nach zu checken, da sie in der Schwierigkeit aufeinander aufbauen. <b>Play all Testcases</b> spielt alle Testcases der Reihe nach ab und stoppt beim ersten Fehlschlag.
  <p>Sobald alle Testcases bestanden sind, wird der Button <b>Release</b> sichtbar. Hiermit wird der Code gegen unbekannte Testcases abgeschickt. Sobald hier auch alles bestanden ist, ist diese Aufgabe gemeistert.
  <p><b>Tldr;</b>: den Input 1:1 in den Output übergeben`;
  input = "<p>Ein String <span class='var'>input</span>. Mit <span class='console'>await readline()</span> einlesen.";
  output = "<p>Der String, der als Input geliefert wurde. <span class='console'>console.log(input)</span><p>Andere Outputs werden ignoriert.";
  

  constructor(){
    super("init");
  }

  initGameArea = ()=>{};
  updateGameArea = () => {};
}

CODE .GAMES.add(new Init());