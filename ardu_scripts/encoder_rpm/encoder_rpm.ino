////// Parameters // Variables ///////////////////////////////////////////////////
int encoder_pin = 2;            // The encoder pin is connected  // Pin 2, donde se conecta el encoder    
float rpm = 0;                     // rpm reading // Revoluciones por minuto calculadas.
int CANAL_A = 2;
int CANAL_B = 3;
float velocity = 0;              // Velocity // Velocidad en [Km/h]
volatile float pulses = 0;       // Number of pulses in one second // Número de pulsos leidos por el Arduino en un segundo
unsigned long timeold = 0;       // Time // Tiempo
unsigned int pulsesperturn = 17;  // The number of pulses per motor revolution, depends od the encoder!! // Número de pulsos por vuelta del motor, por canal = 8.
unsigned int wheel_diameter = 11*25.4;// Diámetro de la rueda pequeña[mm]
int ratio = 25;                  // Relación de transmisión de los engranajes i = 25:1                 // Relación de transmisión de los engranajes i = 120:1    
/////////////////////////// Function // Función que cuenta los pulsos buenos ///////////////////////////////////////////
 void counter(){
  if (digitalRead(CANAL_A) == HIGH) {
    if (digitalRead(CANAL_B) == LOW) {
      pulses++;
    } else {
      pulses--;
    }
  } else {
    if (digitalRead(CANAL_B) == LOW) {
      pulses--;
    } else {
      pulses++;
    }
    }
 }// Suma el pulso bueno que entra.
//// Arduino configuration /////////////////////////////////////////////////////////
void setup(){
   Serial.begin(9600); // Configuración del puerto serie
   pinMode(encoder_pin, INPUT); // Use status Pin to flash along with interrupts // Configuración del pin nº2
   pinMode(CANAL_A, INPUT);
   pinMode(CANAL_B, INPUT);
   
   attachInterrupt(0, counter, RISING); // Interrupt 0 is digital pin 2, so that is where the IR detector is connected. Triggers on FALLING (change from HIGH to LOW) // Configuración de la interrupción 0, donde esta conectado el encoder HC-020K.
   // parameters Initialize // Inicialización de los parametros
   pulses = 0;
   rpm = 0;
   timeold = 0;
   Serial.println("");
   Serial.print("            MOTOR       ");Serial.print("MOTOR       ");Serial.print("WHEEL       "); Serial.println("WHEEL");
   Serial.print("Seconds     ");Serial.print("Pulses      ");Serial.print("RPM         ");Serial.print("RPM         ");Serial.println("Velocity[Km/h]");
 }
////  Main programe // Programa principal ///////////////////////////////////////////////////////////////////////
 void loop(){
   if (millis() - timeold >= 1000){  // Uptade every one second, this will be equal to reading frecuency (Hz). // Se actualiza cada segundo
      noInterrupts(); //Don't process interrupts during calculations // Desconectamos la interrupción para que no actué en esta parte del programa.
      rpm = 60 * pulses / pulsesperturn * 1000 / (millis() - timeold) ; // Note that this would be 60*1000/(millis() - timeold)*pulses if the interrupt. happened once per revolution // Calculamos las revoluciones por minuto
      //Ojo con la fórmula de arriba, la variable rpm tiene que ser tipo float porque salen decimales en medio de la operación.
      velocity = rpm/ratio * 3.1416 * wheel_diameter * 60 / 1000000; // Cálculo de la velocidad de la rueda en [Km/h]
      Serial.print(millis()/1000); Serial.print("          "); // Write it out to serial port RPM = 39 pulses // Se envia al puerto serie el valor de tiempo, de las rpm y los pulsos.
      Serial.print(pulses,0); Serial.print("         ");
      Serial.print(rpm,0); Serial.print("         ");
      Serial.print(rpm/ratio,1); Serial.print("           ");
      Serial.println(velocity,2);
      pulses = 0;  // Inicializamos los pulsos.
      timeold = millis(); // Almacenamos el tiempo actual.
      interrupts(); // Restart the interrupt processing // Reiniciamos la interrupción
   }
  }
