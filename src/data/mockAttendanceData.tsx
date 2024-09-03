const AttendanceData = [
    {
      "id": "attendance-1",
      "personType": "student",
      "name": "Ali Ahmed",
      "date": "2024-08-01",
      "day": "Thursday",
      "lateness": {
        "duration": "15 minutes",
        "arrivalTime": "08:15 AM",
        "reason": "Traffic jam",
        "justified": true
      },
      "absence": {
        "reason": null,
        "justified": null
      }
    },
    {
      "id": "attendance-2",
      "personType": "student",
      "name": "Sara Mohammed",
      "date": "2024-08-01",
      "day": "Thursday",
      "lateness": {
        "duration": "30 minutes",
        "arrivalTime": "08:30 AM",
        "reason": "Medical appointment",
        "justified": true
      },
      "absence": {
        "reason": null,
        "justified": null
      }
    },
    {
      "id": "attendance-3",
      "personType": "teacher",
      "name": "Dr. Ahmed El-Sayed",
      "date": "2024-08-02",
      "day": "Friday",
      "lateness": {
        "duration": null,
        "arrivalTime": null,
        "reason": null,
        "justified": null
      },
      "absence": {
        "reason": "Family emergency",
        "justified": true
      }
    },
    {
      "id": "attendance-4",
      "personType": "teacher",
      "name": "Ms. Layla Khaled",
      "date": "2024-08-02",
      "day": "Friday",
      "lateness": {
        "duration": null,
        "arrivalTime": null,
        "reason": null,
        "justified": null
      },
      "absence": {
        "reason": null,
        "justified": false
      }
    },
    {
      "id": "attendance-5",
      "personType": "student",
      "name": "Mohamed Youssef",
      "date": "2024-08-03",
      "day": "Saturday",
      "lateness": {
        "duration": "10 minutes",
        "arrivalTime": "08:10 AM",
        "reason": "Overslept",
        "justified": false
      },
      "absence": {
        "reason": null,
        "justified": null
      }
    }
  ]

  export default AttendanceData;