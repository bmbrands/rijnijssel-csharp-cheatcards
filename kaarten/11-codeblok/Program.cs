using System;

namespace VoorbeeldCodeblok
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int leeftijd = 20;

            // Alles tussen { en } hoort bij dit if-blok
            if (leeftijd >= 18)
            {
                Console.WriteLine("Volwassen");
                Console.WriteLine("Toegang toegestaan");
            }
        }
    }
}
