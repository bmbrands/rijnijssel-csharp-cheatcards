using System;

namespace VoorbeeldSwitch
{
    internal class Program
    {
        static void Main(string[] args)
        {
            int keuze = 2;

            switch (keuze)
            {
                case 1:
                    Console.WriteLine("Maandag");
                    break;
                case 2:
                    Console.WriteLine("Dinsdag");
                    break;
                default:
                    Console.WriteLine("Ongeldige keuze");
                    break;
            }
        }
    }
}
