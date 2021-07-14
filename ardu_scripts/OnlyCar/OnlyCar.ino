int in=A0;

void avanzar(int vel) {
  analogWrite(5, 255);
  analogWrite(6, 255);
  digitalWrite(7, 0);
  digitalWrite(4, 0);
}
void setup() {
  // put your setup code here, to run once:
  for (int i = 4; i <= 7; i++) {
    pinMode(i, OUTPUT);
  }
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  int vel;
  vel=map(pulseIn(in,HIGH),993,1987,0,200);

  Serial.println(pulseIn(in,HIGH));
  delay(50);
  avanzar(vel);
}
