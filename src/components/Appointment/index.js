import React from "react";

import "./styles.scss";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import Form from "components/Appointment/Form";
import { useVisualMode } from "hooks/useVisualMode";
  
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment (props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));

  }

  function deleteAppointment() {
    transition(DELETING);

    props
    .cancelInterview(props.id, transition, EMPTY, ERROR_DELETE)
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
          />
      )}

      { mode === CREATE && (
        <Form
          name={props.name}
          value={props.value}
          interviewers={[props.interviewers]}
          onSave={save}
          onCancel={back}
        />
      )}

      {mode === SAVING && (<Status message="Saving"/>)}
      {mode === DELETING && (<Status message="Deleting"/>)}

      {mode === CONFIRM && (
        <Confirm
          message="Are you sure you would like to delete?"
          onCancel={() => back()}
          onConfirm={deleteAppointment}
        />
      )}

      {mode === EDIT &&(
        <Form
          name={props.interview.student}
          interviewer={props.interview.interviewer}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back()}
        />
      )}
      
      {mode === ERROR_DELETE && (
        <Error message="Error Deleting Appointment" onClose={() => back()} />
      )}

      {mode === ERROR_SAVE && (
        <Error message="Error Saving Appointment" onClose={() => back()} />
      )}


    </article>
  )

}