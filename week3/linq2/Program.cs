// Create a data source by using a collection initializer.
List<Student> students = new List<Student>();

students.Add(new Student { First = "Svetlana", Last = "Omelchenko", ID = 111, Scores = new List<int> { 97, 92, 81, 60 } });
students.Add(new Student { First = "Claire", Last = "O'Donnell", ID = 112, Scores = new List<int> { 75, 84, 91, 39 } });
students.Add(new Student { First = "Sven", Last = "Mortensen", ID = 113, Scores = new List<int> { 88, 94, 65, 91 } });
students.Add(new Student { First = "Cesar", Last = "Garcia", ID = 114, Scores = new List<int> { 97, 89, 85, 82 } });
students.Add(new Student { First = "Debra", Last = "Garcia", ID = 115, Scores = new List<int> { 35, 72, 91, 70 } });
students.Add(new Student { First = "Fadi", Last = "Fakhouri", ID = 116, Scores = new List<int> { 99, 86, 90, 94 } });
students.Add(new Student { First = "Hanying", Last = "Feng", ID = 117, Scores = new List<int> { 93, 92, 80, 87 } });
students.Add(new Student { First = "Hugo", Last = "Garcia", ID = 118, Scores = new List<int> { 92, 90, 83, 78 } });
students.Add(new Student { First = "Lance", Last = "Tucker", ID = 119, Scores = new List<int> { 68, 79, 88, 92 } });
students.Add(new Student { First = "Terry", Last = "Adams", ID = 120, Scores = new List<int> { 99, 82, 81, 79 } });
students.Add(new Student { First = "Eugene", Last = "Zabokritski", ID = 121, Scores = new List<int> { 96, 85, 91, 60 } });
students.Add(new Student { First = "Michael", Last = "Tucker", ID = 122, Scores = new List<int> { 94, 92, 91, 91 } });

// Create the query.
IEnumerable<Student> studentQuery =
    from student in students
    where student.Scores[0] > 90
    orderby student.Scores[0] descending
    select student;

// Execute the query.
foreach (Student student in studentQuery)
{
  Console.WriteLine("{0} {1} {2}", student.Last, student.First, student.Scores[0]);
}

var studentQuery2 =
    from student in students
    group student by student.Last[0] into studentGroup
    orderby studentGroup.Key
    select studentGroup;

foreach (var studentGroup in studentQuery2)
{
  Console.WriteLine(studentGroup.Key);
  foreach (Student student in studentGroup)
  {
    Console.WriteLine("   {0}, {1}",
              student.Last, student.First);
  }
}

// studentQuery5 is an IEnumerable<string>
// This query returns those students whose
// first test score was higher than their
// average score.
var studentQuery5 =
    from student in students
    let totalScore = student.Scores[0] + student.Scores[1] +
        student.Scores[2] + student.Scores[3]
    where totalScore / 4 < student.Scores[0]
    select student.Last + " " + student.First;

foreach (string s in studentQuery5)
{
  Console.WriteLine(s);
}

var studentQuery6 =
    from student in students
    let totalScore = student.Scores[0] + student.Scores[1] +
        student.Scores[2] + student.Scores[3]
    select totalScore;

double averageScore = studentQuery6.Average();
Console.WriteLine("Class average score = {0}", averageScore / 4);

IEnumerable<string> studentQuery7 =
    from student in students
    where student.Last == "Garcia"
    select student.First;

Console.WriteLine("The Garcias in the class are:");
foreach (string s in studentQuery7)
{
  Console.WriteLine(s);
}

var studentQuery8 =
    from student in students
    let x = student.Scores[0] + student.Scores[1] +
        student.Scores[2] + student.Scores[3]
    where x > averageScore
    select new { id = student.ID, score = x };

foreach (var item in studentQuery8)
{
  Console.WriteLine("Student ID: {0}, Score: {1}", item.id, item.score / 4);
}

public class Student
{
  public string First { get; set; }
  public string Last { get; set; }
  public int ID { get; set; }
  public List<int> Scores;
}