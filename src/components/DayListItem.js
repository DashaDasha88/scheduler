import React from "react";

import "./DayListItem.scss";
import classnames from "classnames";

export default function DayListItem(props) {

  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0 
  });

  function formatSpots(props) {
    return props.spots === 0 ? "no spots remaining"
         : (props.spots === 1 ? "1 spot remaining"
         : `${props.spots} spots remaining`)
  }

  return (
    <li 
      className={dayClass}
      onClick={() => props.setDay(props.name)}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props)}</h3>
    </li>
  );

}