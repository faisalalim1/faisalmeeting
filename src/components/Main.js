import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function Main() {
  const [date, setDate] = useState(new Date());
  const [starttime, setStarttime] = useState("");
  const [finishtime, setFinishtime] = useState("");
  const [final, setFinal] = useState([]);
  const [filteredList, setFilteredList] = useState([]);



  const handleSubmit = (e) => {

    const time1 = starttime;
    const time2 = finishtime;

    const [hours1, minutes1] = time1.split(":");

    const [hours2, minutes2] = time2.split(":");
    const newdate = new Date(date).toLocaleDateString();
    const [day, month, year] = newdate.split("/");
    console.log(newdate);
    const date1 = new Date(year, +month, +day, +hours1, +minutes1).getTime();
    const date2 = new Date(year, +month, +day, +hours2, +minutes2).getTime();
    console.log(date1, date2);

    let payload = {
      date: newdate,
      dateSec: new Date(date).getTime(),
      starttime,
      date1,
      finishtime,
      date2,
      employeeId: Math.random(0.8) * 20,
    };
    // setFinal([...final, payload]);
    setFinal((final)=>{
        const updatelist = [...final,payload]
        return updatelist
    })
    console.log(new Date(starttime).getTime());
    console.log(final, starttime);
    console.log(filteredList);
  };
  const handleFilter=()=>{
    if(final.length>1){

        const updatedArray = final.sort((a, b) => a.dateSec - b.dateSec);
        let filter = [];
        for (var i = 0; i < updatedArray.length -1; i++) {
          for (var j = i + 1; j < updatedArray.length; j++) {
            if (
              updatedArray[i].dateSec === updatedArray[j].dateSec &&
              updatedArray[i].date1 === updatedArray[j].date1 &&
              updatedArray[i].date2 > updatedArray[j].date1
            ) {
              updatedArray[j].dateSec = 0;
             // updatedArray[j].date1=null;
            }
          }
        }
        for(var k=0;k<updatedArray.length;k++){

            if (updatedArray[k].dateSec !== 0) {
              filter.push(updatedArray[i]);
            }
        }
        // console.log(filter);
        setFinal(filter);
    }
  console.log(final)
}
  return (
    <div className="app">
      <div>
        <h1 className="header">React Schedule Meeting</h1>
        <div className="calendar-container">
          <Calendar onChange={setDate} value={date} name="date" />
        </div>
        <div className="text-center">Selected date: {date.toDateString()}</div>

        <input
          type="time"
          onChange={(e) => {
            setStarttime(e.target.value);
          }}
          name="starttime"
        />

        <input
          type="time"
          onChange={(e) => {
            setFinishtime(e.target.value);
          }}
          name="finishtime"
        />

        <h1>{date + "" + starttime + " " + finishtime}</h1>
        <button onClick={(e)=>handleSubmit(e)}>submit</button>
        <button onClick={handleFilter}>filter</button>
      </div>
      
      

      <div>
        {final.map((e) => {
          <h2>{e.starttime}</h2>;
        })}
      </div>
    </div>
  );
}

export default Main;
