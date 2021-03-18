import React, { Fragment } from "react";

import "./styles.scss";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

export default function Appointment (props) {

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {props.interview ? (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onEdit={props.onEdit}
        onDelete={props.onDelete}
      />
      ) : (
      <Empty onAdd={props.onAdd} />
      )}
    </article>
  )

}