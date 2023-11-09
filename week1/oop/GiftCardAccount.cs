namespace Oop;
public class GiftCardAccount : BankAccount
{
  public GiftCardAccount(string name, decimal initialBalance, decimal monthlyDeposit = 0) : base(name, initialBalance)
    => _monthlyDeposit = monthlyDeposit;
  public override void PerformMonthEndTransactions()
  {
      if (_monthlyDeposit != 0)
      {
          MakeDeposit(_monthlyDeposit, DateTime.Now, "Add monthly deposit");
      }
  }
  private readonly decimal _monthlyDeposit = 0m;
}
