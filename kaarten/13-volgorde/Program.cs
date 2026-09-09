using System;

namespace VoorbeeldVolgorde
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int leeftijd = 16;
            bool heeftKaart = true;
            bool isLid = false;

            // Eerst && , dan || : && bindt sterker dan ||
            bool toegang = isLid || leeftijd >= 18 && heeftKaart;

            // Met haakjes bepaal je zelf de volgorde
            bool metHaakjes = (isLid || leeftijd >= 18) && heeftKaart;

            Console.WriteLine(toegang);
            Console.WriteLine(metHaakjes);
        }
    }
}
