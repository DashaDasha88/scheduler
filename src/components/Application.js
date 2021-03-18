import React, { useState, useEffect } from "react";
import axios from "axios";

import DayList from "components/DayList.js";
import "components/Application.scss";
import Appointment from "components/Appointment/index";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "3pm",
    interview: {
      student: "Archie Cohen",
      interviewer: {
        id: 1,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 4,
    time: "4pm",
    interview: {
      student: "Maria Boucher",
      interviewer: {
        id: 1,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
];

export default function Application(props) {

  const [days, setDay] = useState([]);

  useEffect (() => {
  
    const url = 'http://localhost:8001/api/days';
  
    axios.get(url).then(response => {
    console.log(response.data);
    });

  }, [])

  const schedule = appointments.map((appointment) => {
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={appointment.interview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
          <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
          />
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
          <DayList
          days={days}
          // day={day}
          setDay={setDay}
          />
          </nav>
          <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
          />
      </section>
      <section className="schedule"> 
      {schedule}
      <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
