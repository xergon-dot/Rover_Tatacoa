#define IN A0
int valor;


void setup() {
Serial.begin(9600);
pinMode(IN,INPUT);
}

void loop() {
  valor=analogRead(IN);
  Serial.println(valor);
  delay(50);

}
