import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

let init = {
  date: new Date().toLocaleDateString(),
  startTime: "",
  finishTime:""
}
function Main() {
  const [meet, setMeet] = useState(init);
  const [final, setFinal] = useState([]);

  const handelChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target)
    setMeet({ ...meet, [name]: value });
 }

   console.log(meet,"/n")
  const handleSubmit = () => {

    const time1 = meet.startTime;
    const time2 = meet.finishTime;

    const [hours1, minutes1] = time1.split(":");

    const [hours2, minutes2] = time2.split(":");
    const newdate = new Date(meet.date).toLocaleDateString();
    const [day, month, year] = newdate.split("/");
    console.log(newdate);
    const date1 = new Date(year, +month, +day, +hours1, +minutes1).getTime();
    const date2 = new Date(year, +month, +day, +hours2, +minutes2).getTime();
    console.log(date1, date2);

    let payload = {
      date: newdate,
      dateSec: new Date(meet.date).getTime(),
      startTime:meet.startTime,
      date1,
      finishTime:meet.finishTime,
      date2,
      employeeId: Math.random(0.8) * 20,
    };
    setFinal([...final, payload]);
    // setFinal((final)=>{
    //     const updatelist = [...final,payload]
    //     return updatelist
    // })
 
  };
  const handleFilter=()=>{
    if(final.length>1){

        const updatedArray = final.sort((a, b) => a.dateSec - b.dateSec);
        let filter = [];
        for (var i = 0; i < updatedArray.length -1; i++) {
          for (var j = i + 1; j < updatedArray.length; j++) {
            if (
              updatedArray[i].dateSec === updatedArray[j].dateSec &&
             ( updatedArray[i].date1 === updatedArray[j].date1 ||
              updatedArray[i].date2 > updatedArray[j].date1)
            ) {
              updatedArray[j].dateSec = 0;
             // updatedArray[j].date1=null;
            }
          }
        }
        for(var k=0;k<updatedArray.length;k++){

            if (updatedArray[k].dateSec !== 0) {
              filter.push(updatedArray[k]);
            }
        }
        console.log(filter);
        setFinal(filter);
    }
  }
  console.log(final)
  return (
    <div className="app">
      <div>
        <h1 className="header">React Schedule Meeting</h1>
        <div className="calendar-container">
          {/* <Calendar onChange={handelChange} value={meet.date} name="date" /> */}
          <input type="date" id="birthday" name="date" value={meet.date} onChange={handelChange}></input>
        </div>
        <div className="text-center">Selected date: {meet.date}</div>

        <input
          type="time"
          onChange={handelChange}
          name="startTime"
          value={meet.startTime}
        />

        <input
          type="time"
          onChange={handelChange}
          name="finishTime"
          value={meet.finishTime}
        />

        <h1>{meet.date + "" + meet.startTime + " " + meet.finishTime}</h1>
        <button onClick={handleSubmit}>submit</button>
        <button onClick={handleFilter}>filter</button>
      </div>
      
      

      <div>
        {final.map((e,i) => {
          return<div key={i}>
          <span>{e.startTime}</span>{" "};
          <span>{e.finishTime}</span>{" "};
            <span>{e.date}</span>{" "};
            <span>{ e.employeeId}E</span>
          </div>
        })}
      </div>
    </div>
  );
}

export default Main;
