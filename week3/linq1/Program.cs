using LinqFaroShuffle;

class Program
{
  public static void Main(string[] args)
  {
    var suits = Suits();
    var ranks = Ranks();

    if ((suits is null) || (ranks is null))
      return;

    var startingDeck = (from s in suits.LogQuery("Suit Generation")
                        from r in ranks.LogQuery("Value Generation")
                        select new { Suit = s, Rank = r })
                        .LogQuery("Starting Deck")
                        .ToArray();

    foreach (var c in startingDeck)
    {
      Console.WriteLine(c);
    }

    Console.WriteLine();

    var times = 0;
    var shuffle = startingDeck;

    do
    {
      /*
      shuffle = shuffle.Take(26)
          .LogQuery("Top Half")
          .InterleaveSequenceWith(shuffle.Skip(26).LogQuery("Bottom Half"))
          .LogQuery("Shuffle")
          .ToArray();
      */

      shuffle = shuffle.Skip(26)
          .LogQuery("Bottom Half")
          .InterleaveSequenceWith(shuffle.Take(26).LogQuery("Top Half"))
          .LogQuery("Shuffle")
          .ToArray();

      foreach (var c in shuffle)
      {
        Console.WriteLine(c);
      }

      times++;
    } while (!startingDeck.SequenceEquals(shuffle));

    Console.WriteLine(times);
  }

  static IEnumerable<string> Suits()
  {
    yield return "clubs";
    yield return "diamonds";
    yield return "hearts";
    yield return "spades";
  }

  static IEnumerable<string> Ranks()
  {
    yield return "two";
    yield return "three";
    yield return "four";
    yield return "five";
    yield return "six";
    yield return "seven";
    yield return "eight";
    yield return "nine";
    yield return "ten";
    yield return "jack";
    yield return "queen";
    yield return "king";
    yield return "ace";
  }
}