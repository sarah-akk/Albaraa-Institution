export const classSchedules = [
    {
      class: "10",
      section: "A",
      schedule: [
        { day: "Saturday", startTime: "08:00", endTime: "09:00", subject: "Math", teacher: "Mr. Ahmed" },
        { day: "Saturday", startTime: "09:15", endTime: "10:15", subject: "English", teacher: "Ms. Sara" },
        { day: "Sunday", startTime: "10:00", endTime: "11:00", subject: "Physics", teacher: "Mr. Ali" },
        { day: "Sunday", startTime: "11:15", endTime: "12:15", subject: "Biology", teacher: "Ms. Noor" },
        { day: "Monday", startTime: "08:00", endTime: "09:00", subject: "Chemistry", teacher: "Mr. Ahmed" },
        { day: "Monday", startTime: "09:15", endTime: "10:15", subject: "Math", teacher: "Ms. Sara" },
        { day: "Tuesday", startTime: "10:00", endTime: "11:00", subject: "History", teacher: "Mr. Ali" },
        { day: "Tuesday", startTime: "11:15", endTime: "12:15", subject: "Geography", teacher: "Ms. Noor" },
        { day: "Wednesday", startTime: "08:00", endTime: "09:00", subject: "Math", teacher: "Mr. Ahmed" },
        { day: "Wednesday", startTime: "09:15", endTime: "10:15", subject: "Physics", teacher: "Ms. Sara" },
        { day: "Thursday", startTime: "10:00", endTime: "11:00", subject: "Biology", teacher: "Mr. Ali" },
        { day: "Thursday", startTime: "11:15", endTime: "12:15", subject: "Chemistry", teacher: "Ms. Noor" }
      ],
    },
    {
      class: "11",
      section: "B",
      schedule: [
        { day: "Saturday", startTime: "08:00", endTime: "09:00", subject: "English", teacher: "Ms. Sara" },
        { day: "Saturday", startTime: "09:15", endTime: "10:15", subject: "Math", teacher: "Mr. Ahmed" },
        { day: "Sunday", startTime: "10:00", endTime: "11:00", subject: "Biology", teacher: "Ms. Noor" },
        { day: "Sunday", startTime: "11:15", endTime: "12:15", subject: "Chemistry", teacher: "Mr. Ali" },
        { day: "Monday", startTime: "08:00", endTime: "09:00", subject: "History", teacher: "Mr. Ali" },
        { day: "Monday", startTime: "09:15", endTime: "10:15", subject: "Geography", teacher: "Ms. Noor" },
        { day: "Tuesday", startTime: "10:00", endTime: "11:00", subject: "Math", teacher: "Mr. Ahmed" },
        { day: "Tuesday", startTime: "11:15", endTime: "12:15", subject: "Physics", teacher: "Ms. Sara" },
        { day: "Wednesday", startTime: "08:00", endTime: "09:00", subject: "Biology", teacher: "Mr. Ali" },
        { day: "Wednesday", startTime: "09:15", endTime: "10:15", subject: "History", teacher: "Ms. Noor" },
        { day: "Thursday", startTime: "10:00", endTime: "11:00", subject: "Chemistry", teacher: "Mr. Ahmed" },
        { day: "Thursday", startTime: "11:15", endTime: "12:15", subject: "English", teacher: "Ms. Sara" }
      ],
    },
  ];
  
  


  export const teacherSchedules = [
    {
      teacher: "Mr. Ahmed",
      schedule: [
        { day: "Saturday", startTime: "08:00", endTime: "09:00", subject: "Math", class: "10", section: "A" },
        { day: "Saturday", startTime: "09:15", endTime: "10:15", subject: "Math", class: "11", section: "B" },
        { day: "Sunday", startTime: "10:00", endTime: "11:00", subject: "Physics", class: "10", section: "A" },
        { day: "Sunday", startTime: "11:15", endTime: "12:15", subject: "Chemistry", class: "11", section: "B" },
        { day: "Monday", startTime: "08:00", endTime: "09:00", subject: "Chemistry", class: "10", section: "A" },
        { day: "Monday", startTime: "09:15", endTime: "10:15", subject: "Math", class: "11", section: "B" },
        { day: "Tuesday", startTime: "10:00", endTime: "11:00", subject: "History", class: "10", section: "A" },
        { day: "Tuesday", startTime: "11:15", endTime: "12:15", subject: "Geography", class: "11", section: "B" },
        { day: "Wednesday", startTime: "08:00", endTime: "09:00", subject: "Math", class: "10", section: "A" },
        { day: "Wednesday", startTime: "09:15", endTime: "10:15", subject: "Biology", class: "11", section: "B" },
        { day: "Thursday", startTime: "10:00", endTime: "11:00", subject: "Chemistry", class: "10", section: "A" },
        { day: "Thursday", startTime: "11:15", endTime: "12:15", subject: "Physics", class: "11", section: "B" }
      ],
    },
    {
      teacher: "Ms. Sara",
      schedule: [
        { day: "Saturday", startTime: "08:00", endTime: "09:00", subject: "English", class: "10", section: "A" },
        { day: "Saturday", startTime: "09:15", endTime: "10:15", subject: "Math", class: "11", section: "B" },
        { day: "Sunday", startTime: "10:00", endTime: "11:00", subject: "Biology", class: "11", section: "B" },
        { day: "Sunday", startTime: "11:15", endTime: "12:15", subject: "Chemistry", class: "10", section: "A" },
        { day: "Monday", startTime: "08:00", endTime: "09:00", subject: "History", class: "10", section: "A" },
        { day: "Monday", startTime: "09:15", endTime: "10:15", subject: "Math", class: "11", section: "B" },
        { day: "Tuesday", startTime: "10:00", endTime: "11:00", subject: "Geography", class: "10", section: "A" },
        { day: "Tuesday", startTime: "11:15", endTime: "12:15", subject: "Physics", class: "11", section: "B" },
        { day: "Wednesday", startTime: "08:00", endTime: "09:00", subject: "Math", class: "10", section: "A" },
        { day: "Wednesday", startTime: "09:15", endTime: "10:15", subject: "History", class: "11", section: "B" },
        { day: "Thursday", startTime: "10:00", endTime: "11:00", subject: "English", class: "10", section: "A" },
        { day: "Thursday", startTime: "11:15", endTime: "12:15", subject: "Biology", class: "11", section: "B" }
      ],
    },
    {
      teacher: "Ms. Noor",
      schedule: [
        { day: "Saturday", startTime: "08:00", endTime: "09:00", subject: "Biology", class: "10", section: "A" },
        { day: "Saturday", startTime: "09:15", endTime: "10:15", subject: "Chemistry", class: "11", section: "B" },
        { day: "Sunday", startTime: "10:00", endTime: "11:00", subject: "English", class: "11", section: "B" },
        { day: "Sunday", startTime: "11:15", endTime: "12:15", subject: "Math", class: "10", section: "A" },
        { day: "Monday", startTime: "08:00", endTime: "09:00", subject: "Geography", class: "10", section: "A" },
        { day: "Monday", startTime: "09:15", endTime: "10:15", subject: "Physics", class: "11", section: "B" },
        { day: "Tuesday", startTime: "10:00", endTime: "11:00", subject: "History", class: "10", section: "A" },
        { day: "Tuesday", startTime: "11:15", endTime: "12:15", subject: "Geography", class: "11", section: "B" },
        { day: "Wednesday", startTime: "08:00", endTime: "09:00", subject: "Biology", class: "10", section: "A" },
        { day: "Wednesday", startTime: "09:15", endTime: "10:15", subject: "Chemistry", class: "11", section: "B" },
        { day: "Thursday", startTime: "10:00", endTime: "11:00", subject: "Physics", class: "10", section: "A" },
        { day: "Thursday", startTime: "11:15", endTime: "12:15", subject: "English", class: "11", section: "B" }
      ],
    },
  ];
  