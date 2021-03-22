export function getAppointmentsForDay(state, day) {
  
  let filteredDays = state.days.filter(d => d.name === day)[0];
  if(!filteredDays){
    return [];
  }

  let result = [];
  for(const id of filteredDays.appointments){
    const appointmentObj = state.appointments[id];
    result.push(appointmentObj);
  }

  return result;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewer = state.interviewers[interview.interviewer];
  return {
    student: interview.student,
    interviewer: interviewer
  }
}

export function getInterviewersForDay(state, day) {
  
  let filteredDays = state.days.filter(d => d.name === day)[0];
  if(!filteredDays){
    return [];
  }

  let result = [];

  for(const id of filteredDays.interviewers){
    const interviewersObj = state.interviewers[id];
    result.push(interviewersObj);
  }

  return result;

}